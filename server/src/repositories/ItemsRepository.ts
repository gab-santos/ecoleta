import knex from "../database/connection";

export interface ItemsInterface {
  id: number;
  title: string;
  image: string;
}

class ItemsRepository {
  async index() {
    return await knex("items").select("*");
  }

  async join(id: number) {
    return await knex("items")
      // Todos os items que estão associados com um ponto
      .join("pointItems", "items.id", "=", "pointItems.itemId")
      // E desses items apenas o que estão associados com o ponto especifico
      .where("pointItems.pointId", id)
      .select("items.title");
  }
}

export default new ItemsRepository();
