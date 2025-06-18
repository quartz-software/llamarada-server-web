import { Op } from "sequelize";
import { sequelize } from "../models/";
import IsEqual from "../utils/is-equal";
import { NextFunction, Request, Response } from "express";
import { Habitacion } from "../types/db/habitacion";
import { ReservaModel } from "../models/reserva/model";
import { LimitParamsSchema } from "../schemas/common/param-limit";
import { ParamDateSchema } from "../schemas/common/param-date";
import { HabitacionModel } from "../models/habitacion/model";
import { ImagenHabitacionModel } from "../models/imagen-habitacion/model";
import { IdParamsSchema } from "../schemas/common/param-id";
import {
  ReservaCreateSchema,
  ReservaUpdateSchema,
} from "../schemas/models/reserva";
import { ReservaHabitacionModel } from "../models/reserva-habitacion/model";
import { ReservaHabitacion } from "../types/db/reserva-habitacion";

const calculateTotalPrice = async (
  rooms: Habitacion[],
  checkIn: string,
  checkOut: string,
  tarifa: number
) => {
  const numOfDays =
    Math.floor(new Date(checkOut).getTime() - new Date(checkIn).getTime()) /
    (1000 * 3600 * 24) +
    1;
  const totalPrice = rooms.reduce(
    (total, room) => total + room.tarifas![0].precio * numOfDays,
    0
  );
  return totalPrice;
};

const validateBooking = async (
  nAdults: number,
  nChild: number,
  checkIn: string,
  checkOut: string,
  selectedRooms: Habitacion[]
) => {
  // Validar si la fecha de checkIn es mayor a checkOut
  if (new Date(checkIn) > new Date(checkOut)) {
    throw new Error(
      "La fecha de entrada no puede ser mayor a la fecha de salida."
    );
  }

  // Validar si el número de niños es mayor o igual a adultos * 2
  if (nChild >= nAdults * 2) {
    throw new Error(
      "El número de niños no puede ser mayor o igual al número de adultos * 2."
    );
  }

  console.log(selectedRooms);

  // Validar si el número total de personas supera la capacidad de las habitaciones seleccionadas
  const totalCapacity = selectedRooms.reduce(
    (total, room) => total + room.capacidad,
    0
  );
  console.log(totalCapacity);
  if (nAdults + nChild > totalCapacity) {
    throw new Error(
      "El número total de personas supera la capacidad de las habitaciones seleccionadas."
    );
  }

  // Validar si hay reservas pendientes en las fechas seleccionadas
  const conflictingReservations = await ReservaModel.findAll({
    where: {
      checkIn: { $lte: new Date(checkOut) },
      checkOut: { $gte: new Date(checkIn) },
      // TODO
      idEstado: 1,
    },
    include: {
      model: HabitacionModel,
      as: "habitaciones",
      where: { id: selectedRooms.map((room) => room.id) },
    },
  });

  if (conflictingReservations.length > 0) {
    throw new Error(
      "Hay reservas pendientes para las habitaciones seleccionadas en esas fechas."
    );
  }
};

const ReservaController = {
  get: {
    "/": async (req: Request, res: Response, next: NextFunction) => {
      try {
        const query = { pid: req.query.pid, q: req.query.q };
        const validateParams = LimitParamsSchema.safeParse(query);
        if (!validateParams.success) {
          next({ status: 400, message: "" });
          return;
        }
        const limit = {
          pid: 0,
          q: 10,
        };
        limit.pid = validateParams.data.pid ?? limit.pid;
        limit.q = validateParams.data.q ?? limit.q;

        const reservas = await ReservaModel.findAll({
          limit: limit.q,
          offset: limit.pid * limit.q,
        });
        res.status(200).json(reservas);
      } catch (error) {
        next(error);
      }
    },
    "/rooms": async (req: Request, res: Response, next: NextFunction) => {
      try {
        const validateDateParams = ParamDateSchema.safeParse(req.query);
        const today = new Date();
        const start = validateDateParams.data?.startDate
          ? new Date(validateDateParams.data?.startDate)
          : today;
        const end = validateDateParams.data?.endDate
          ? new Date(validateDateParams.data?.endDate)
          : today;

        if (start > end) {
          next({ status: 400, message: "" });
          return;
        }

        const adjustedEnd = new Date(end);
        adjustedEnd.setDate(adjustedEnd.getDate() + 1);

        const rooms = await HabitacionModel.findAll({
          order: [["id", "ASC"]],
          include: { model: ImagenHabitacionModel, as: "imagenes" },
          where: {
            id: {
              [Op.notIn]: sequelize.literal(`
                (
                  SELECT DISTINCT "idReserva"
                  FROM "reserva-habitacion" AS br
                  JOIN "reserva" AS b
                  ON br."idReserva" = b."id"
                  WHERE b."checkIn" < '${adjustedEnd.toISOString()}'
                  AND b."checkOut" > '${start.toISOString()}'
                  AND (
                    (b."checkIn" BETWEEN '${start.toISOString()}' AND '${adjustedEnd.toISOString()}') OR
                    (b."checkOut" BETWEEN '${start.toISOString()}' AND '${adjustedEnd.toISOString()}') OR
                    (b."checkIn" <= '${start.toISOString()}' AND b."checkOut" >= '${adjustedEnd.toISOString()}')
                  )
                )
              `),
            },
          },
        });

        res.status(200).json(rooms);
      } catch (error) {
        next(error);
      }
    },
    "/:id": async (req: Request, res: Response, next: NextFunction) => {
      try {
        const validateId = IdParamsSchema.safeParse(Number(req.params.id));
        if (!validateId.success) {
          next({ status: 400, message: "" });
          return;
        }
        const booking = await ReservaModel.findByPk(validateId.data);
        if (!booking) {
          next({ status: 404, message: "" });
          return;
        }
        res.status(200).json(booking);
      } catch (e) {
        res.status(500).send();
      }
    },
  },

  post: {
    "/": async (req: Request, res: Response, next: NextFunction) => {
      try {
        if (!(req as any).user) {
          next({ status: 401, message: "" });
          return;
        }

        if (
          !IsEqual((req as any).user.rol, "client", "recepcionist", "admin")
        ) {
          next({ status: 403, message: "" });
          return;
        }

        const validate = ReservaCreateSchema.safeParse(req.body);
        if (!validate.success) {
          next({ status: 400, message: "" });
          return;
        }

        const selectedRooms = await HabitacionModel.findAll({
          where: { id: 1 },
        });

        if (!selectedRooms || selectedRooms.length === 0) {
          next({ status: 400, message: "" });
          return;
        }

        await validateBooking(
          validate.data.numAdultos,
          validate.data.numNinos,
          validate.data.checkIn.toISOString(),
          validate.data.checkOut.toISOString(),
          selectedRooms
        );

        const totalPrice = await calculateTotalPrice(
          selectedRooms,
          validate.data.checkIn.toISOString(),
          validate.data.checkOut.toISOString(),
          10
        );

        const booking = await ReservaModel.create({
          idCliente: (req as any).user.id,
          idEmpleado: 2,
          origenReserva: (req as any).user.rol === "client" ? "web" : "system",
          checkIn: validate.data.checkIn,
          checkOut: validate.data.checkOut,
          numNinos: validate.data.numNinos,
          numAdultos: validate.data.numAdultos,
          idEstado: 1,
          precioTotal: totalPrice,
        });

        const bookingRooms = selectedRooms.map(
          (room): ReservaHabitacion => ({
            idReserva: booking.id,
            idHabitacion: room.id,
          })
        );

        await ReservaHabitacionModel.bulkCreate(bookingRooms);

        res.status(200).json(booking);
      } catch (error) {
        next(error);
      }
    },

    "/accept/:id": async (req: Request, res: Response, next: NextFunction) => {
      try {
        const validateId = IdParamsSchema.safeParse(Number(req.params.id));
        const { action } = req.body;

        if (!(req as any).user) {
          next({ status: 401, message: "" });
          return;
        }
        if (
          !validateId.success ||
          (action !== "accept" && action !== "reject")
        ) {
          next({ status: 400, message: "" });
          return;
        }

        const booking = await ReservaModel.findOne({
          where: { id: validateId.data },
          include: { as: "habitaciones", model: HabitacionModel },
        });
        if (!booking) {
          next({ status: 404, message: "" });
          return;
        }
        if (booking.idCliente !== validateId.data) {
          next({ status: 403, message: "" });
          return;
        }

        if (action === "accept") booking.idEstado = 2; // confirmed
        else if (action === "reject") booking.idEstado = 3; // rejected
        await booking.save();
        res.status(200).json(booking);
      } catch (e) {
        console.log(e);
        next(e);
      }
    },
  },

  put: {
    "/:id": async (req: Request, res: Response, next: NextFunction) => {
      try {
        const validateId = IdParamsSchema.safeParse(req.params.id);
        const validate = ReservaUpdateSchema.safeParse(req.body);
        if (!validateId.success || !validate.success) {
          next({ status: 400, message: "" });
          return;
        }
        await ReservaModel.update(validate.data, {
          where: { id: validateId.data },
        });
        res.status(200).send();
      } catch (error) {
        next(error);
      }
    },
  },

  delete: {
    "/:id": async (req: Request, res: Response, next: NextFunction) => {
      try {
        const validateId = IdParamsSchema.safeParse(req.params.id);
        if (!validateId.success) {
          next({ status: 400, message: "" });
          return;
        }
        await ReservaModel.destroy({ where: { id: validateId.data } });
        res.status(200).send();
      } catch (error) {
        next(error);
      }
    },
  },
};

export default ReservaController;
