import { Transaction } from "knex";
import knex from "../database/connection";

class PointItemsRepository {
  async create(items: string, pointId: number, trx?: Transaction) {
    const bd = trx || knex;

    const pointItems = items
      .split(",")
      .map((itemId: string) => Number(itemId.trim()))
      .map((itemId: number) => {
        return { pointId, itemId };
      });

    await bd("pointItems").insert(pointItems);
  }
}

export default new PointItemsRepository();
