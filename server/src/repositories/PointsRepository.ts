import { Transaction } from "knex";
import knex from "../database/connection";

export interface PointInterface {
  image: string;
  name: string;
  email: string;
  whatsapp: string;
  latitude: number;
  longitude: number;
  city: string;
  uf: string;
}

class PointRepository {
  async show(id: number) {
    return await knex("points").where("id", id).first();
  }

  async create(point: PointInterface, trx?: Transaction) {
    const bd = trx || knex;

    const insertedId = await bd("points").insert(point);

    return insertedId[0];
  }

  async filter(city: string, uf: string, items: Array<number>) {
    return await knex("points")
      .join("pointItems", "points.id", "=", "pointItems.pointId")
      .whereIn("pointItems.itemId", items)
      .where("city", city)
      .where("uf", uf)
      .distinct()
      .select("points.*");
  }
}

export default new PointRepository();
