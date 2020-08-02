import { Request, Response } from "express";
import knex from "../database/connection";
import fs from "fs";
import path from "path";

import PointsRepository, {
  PointInterface,
} from "../repositories/PointsRepository";
import PointItemsRepository from "../repositories/PointItemsRepository";
import ItemsRepository from "../repositories/ItemsRepository";
import Serielize from "../utils/serialize";

class PointsController {
  async index(request: Request, response: Response) {
    // city, uf, items (Query Params)
    try {
      const { city, uf, items } = request.query;

      const parsedItems = String(items)
        .split(",")
        .map((item) => Number(item.trim()));

      const points = await PointsRepository.filter(
        String(city),
        String(uf),
        parsedItems
      );

      const serializedPoints = Serielize.array<PointInterface>(points);

      return response.status(200).json(serializedPoints);
      //
    } catch (err) {
      return response.status(400).json({
        message: "Error listing points. Try Again!",
        error: err,
      });
    }
  }

  async show(request: Request, response: Response) {
    try {
      const { id } = request.params;

      const point = await PointsRepository.show(Number(id));

      if (!point)
        return response.status(404).json({ message: "Point not found!" });

      const items = await ItemsRepository.join(Number(id));

      const serializedPoint = Serielize.object<PointInterface>(point);

      return response.status(200).json({ point: serializedPoint, items });
      //
    } catch (err) {
      return response.status(400).json({
        message: "Error listing point. Try agrain!",
        error: err,
      });
    }
  }

  async create(request: Request, response: Response) {
    const trx = await knex.transaction();
    try {
      const {
        name,
        email,
        whatsapp,
        latitude,
        longitude,
        uf,
        city,
        items,
      } = request.body;

      const point = {
        image: request.file.filename,
        name,
        email,
        whatsapp,
        latitude,
        longitude,
        uf,
        city,
      };

      const pointId = await PointsRepository.create(point, trx);

      await PointItemsRepository.create(items, pointId, trx);

      await trx.commit();

      const serializedPoint = Serielize.object<PointInterface>(point);

      return response.status(201).json({ id: pointId, ...serializedPoint });

      //
    } catch (err) {
      await trx.rollback();
      fs.unlinkSync(
        path.resolve(__dirname, "..", "..", "uploads", request.file.filename)
      );
      return response.status(400).json({
        message: "Error creating point. Try again!",
        error: err,
      });
    }
  }
}

export default new PointsController();
