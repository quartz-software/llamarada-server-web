import { Request, Response } from "express";
import AdditionalService from "../models/additional-service";
export default {
  async findAll(req: Request, res: Response) {
    try {
      const addServices = await AdditionalService.findAll({
        order: [["id", "ASC"]],
      });
      res.status(200).json(addServices);
    } catch (e) {
      res.status(500).send();
    }
  },
  async findOne(req: Request, res: Response) {
    try {
      const id = req.params.id;
      if (!id) return res.status(400).send();

      const addService = await AdditionalService.findByPk(id);
      if (!addService) return res.status(404).send();

      res.status(200).json(addService);
    } catch (e) {
      res.status(500).send();
    }
  },
  async create(req: Request, res: Response) {
    try {
      const body = req.body;
      const addService = await AdditionalService.create(body);
      res.status(201).json(addService);
    } catch (e) {
      res.status(500).send();
    }
  },
  async update(req: Request, res: Response) {
    try {
      const id = req.params.id;
      if (!id) {
        res.status(400).send();
        return;
      }
      const body = req.body;
      if (!body) {
        res.status(404).send();
        return;
      }
      await AdditionalService.update(body, { where: { id } });
      res.status(200).send();
    } catch (e) {
      res.status(500).send();
    }
  },
  async delete(req: Request, res: Response) {
    try {
      const id = req.params.id;
      if (!id) {
        res.status(400).send();
        return;
      }
      await AdditionalService.destroy({ where: { id } });
      res.status(200).send();
    } catch (e) {
      res.status(500).send();
    }
  },
};
