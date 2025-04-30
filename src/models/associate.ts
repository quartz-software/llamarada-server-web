import AdditionalService from "./additional-service";
import Booking from "./Booking";
import BookingRoom from "./BookingRoom";
import Client from "./Client";
import Employee from "./employee";
import Payment from "./Payment";
import PaymentDetail from "./PaymentDetail";
import Room from "./room";
import RoomAvailability from "./RoomAvailability";
import RoomImage from "./RoomImage";
import RoomPromotion from "./RoomPromotion";
import RoomRoomPromotion from "./RoomRoomPromotion";
import RoomRate from "./RoomRate";
import RoomRoomRate from "./RoomRoomRate";
import Service from "./service";
import ServiceRoom from "./ServiceRoom";
import Stock from "./stock";
import StockModification from "./StockModification";
import Task from "./Task";
import User from "./User";

function associate() {
  // Payment: bookingId
  Booking.hasOne(Payment, {
    foreignKey: "bookingId",
    as: "payment",
  });
  Payment.belongsTo(Booking, {
    foreignKey: "bookingId",
    as: "booking",
  });

  // PaymentDetail: paymentId
  Payment.hasMany(PaymentDetail, {
    foreignKey: "paymentId",
    as: "payment_details",
  });
  PaymentDetail.belongsTo(Payment, {
    foreignKey: "paymentId",
    as: "payment",
  });

  // RoomPromotion: roomId
  Room.belongsToMany(RoomPromotion, {
    through: RoomRoomPromotion,
    foreignKey: "roomId",
    otherKey: "roomPromotionId",
    as: "room_promotions",
  });
  RoomPromotion.belongsToMany(Room, {
    through: RoomRoomPromotion,
    foreignKey: "roomPromotionId",
    otherKey: "roomId",
    as: "rooms",
  });

  // RoomRate: roomId
  Room.belongsToMany(RoomRate, {
    through: RoomRoomRate,
    foreignKey: "roomId",
    otherKey: "roomRateId",
    as: "room_rates",
  });
  RoomRate.belongsToMany(Room, {
    through: RoomRoomRate,
    foreignKey: "roomRateId",
    otherKey: "roomId",
    as: "rooms",
  });

  // RoomAvailability: roomId
  Room.hasMany(RoomAvailability, {
    foreignKey: "roomId",
    as: "room_availabilities",
  });
  RoomAvailability.belongsTo(Room, {
    foreignKey: "roomId",
    as: "room",
  });
  //Booking: employeeId
  Employee.hasMany(Booking, {
    foreignKey: "employeeId",
    as: "bookings",
  });
  Booking.belongsTo(Employee, {
    foreignKey: "employeeId",
    as: "employee",
  });

  //Booking: clientId
  Client.hasMany(Booking, {
    foreignKey: "clientId",
    as: "bookings",
  });
  Booking.belongsTo(Client, {
    foreignKey: "clientId",
    as: "client",
  });

  // Employee: userId
  User.hasOne(Employee, {
    foreignKey: "userId",
    as: "employee",
  });
  Employee.belongsTo(User, {
    foreignKey: "userId",
    as: "user",
  });

  // Employee: userId
  User.hasOne(Client, {
    foreignKey: "userId",
    as: "client",
  });
  Client.belongsTo(User, {
    foreignKey: "userId",
    as: "user",
  });

  // AdditionalService: serviceId
  Service.hasMany(AdditionalService, {
    foreignKey: "serviceId",
    as: "additional_services",
  });
  AdditionalService.belongsTo(Service, {
    foreignKey: "serviceId",
    as: "service",
  });
  // AdditionalService: bookingId
  Booking.hasMany(AdditionalService, {
    foreignKey: "bookingId",
    as: "additional_services",
  });
  AdditionalService.belongsTo(Booking, {
    foreignKey: "bookingId",
    as: "booking",
  });

  // BookingRoom: bookingId
  Booking.belongsToMany(Room, {
    through: BookingRoom,
    foreignKey: "bookingId",
    otherKey: "roomId",
    as: "rooms",
  });
  Room.belongsToMany(Booking, {
    through: BookingRoom,
    foreignKey: "roomId",
    otherKey: "bookingId",
    as: "bookings",
  });
  // RoomImage: roomId
  Room.hasMany(RoomImage, {
    foreignKey: "roomId",
    as: "images",
  });
  RoomImage.belongsTo(Room, {
    foreignKey: "roomId",
    as: "room",
  });

  // ServiceRoom: roomId
  Room.belongsToMany(Service, {
    foreignKey: "roomId",
    otherKey: "serviceId",
    through: ServiceRoom,
    as: "services",
  });
  Service.belongsToMany(Room, {
    foreignKey: "serviceId",
    otherKey: "roomId",
    through: ServiceRoom,
    as: "rooms",
  });

  //Modification-stock: stockId
  Stock.hasMany(StockModification, {
    foreignKey: "stockId",
    as: "stock_modifications",
  });
  StockModification.belongsTo(Stock, {
    foreignKey: "stockId",
    as: "stock",
  });

  //Modification-stock: employeeId
  Employee.hasMany(StockModification, {
    foreignKey: "employeeId",
    as: "stock_modifications",
  });
  StockModification.belongsTo(Employee, {
    foreignKey: "employeeId",
    as: "employee",
  });

  //Task: employeeId
  Employee.hasMany(Task, {
    foreignKey: "employeeId",
    as: "tasks",
  });
  Task.belongsTo(Employee, {
    foreignKey: "employeeId",
    as: "employee",
  });

  //Task: additionalServiceId
  AdditionalService.hasOne(Task, {
    foreignKey: "additionalServiceId",
    as: "additional_service",
  });
  Task.belongsTo(AdditionalService, {
    foreignKey: "additionalServiceId",
    as: "task",
  });
}

associate();
export { associate };
export default associate;
