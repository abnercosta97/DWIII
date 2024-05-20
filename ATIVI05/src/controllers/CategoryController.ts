import { Request, Response } from "express";
import Category from "../models/Category";

class CategoryController {
  public async create(req: Request, res: Response): Promise<void> {
    const { name } = req.body;
    try {
      const response = await Category.create({ name });
      res.send(response);
    } catch (e: any) {
      if (e.errors.name) {
        res.status(400).send({ message: e.errors.name.message });
      } else {
        res.status(400).send({ message: e.message });
      }
    }
  }
}

export default new CategoryController();
