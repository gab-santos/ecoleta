import { Request, Response } from "express";
import ItemsRepository, {
  ItemsInterface,
} from "../repositories/ItemsRepository";
import Serialize from "../utils/serialize";

class ItemsController {
  async index(request: Request, response: Response) {
    try {
      const items: ItemsInterface[] = await ItemsRepository.index();

      const serializedItems = Serialize.array<ItemsInterface>(items);

      return response.status(200).json(serializedItems);
      //
    } catch (err) {
      return response.status(400).json({
        message: "Error listing items. Try again!",
        error: err,
      });
    }
  }
}

export default new ItemsController();
