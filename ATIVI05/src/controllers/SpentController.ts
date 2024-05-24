import { Request, Response } from "express";
import Spent from "../models/Spent";
import Product from "../models/Product";
import User from "../models/User";

class SpentController {
  public async create(req: Request, res: Response): Promise<void> {
    const { product, datetime, value } = req.body;
    const { id: user } = res.locals;
    try {
      const response = await Spent.create({ user, product, datetime, value });
      res.send(response);
    } catch (e: any) {
      res.send({ message: e.message });
    }
  }

  public async list(_: Request, res: Response): Promise<void> {
    try {
      const spents = await Spent.find({})
        .select("product user datetime value")
        .populate("product", "name")
        .populate("user", "mail")
        .sort({ datetime: -1 })
        .exec();

      const response = spents.map((spent) => ({
        id: spent._id,
        productName: (spent.product as any).name,
        userMail: (spent.user as any).mail,
        datetime: spent.datetime,
        value: spent.value,
      }));

      res.send(response);
    } catch (e: any) {
      res.send({ message: e.message });
    }
  }

  public async delete(req: Request, res: Response): Promise<void> {
    const { id } = req.body;
    try {
      const response = await Spent.findByIdAndDelete(id);
      if (response) {
        res.json(response);
      } else {
        res.json({ message: "Registro inexistente" });
      }
    } catch (e: any) {
      res.send({ message: e.message });
    }
  }

  public async update(req: Request, res: Response): Promise<void> {
    const { id, user, product, datetime, value } = req.body;
    try {
      const response = await Spent.findByIdAndUpdate(
        id,
        { user, product, datetime, value },
        {
          new: true,
          runValidators: true,
        }
      );
      if (response) {
        res.json(response);
      } else {
        res.json({ message: "Registro inexistente" });
      }
    } catch (e: any) {
      res.send({ message: e.message });
    }
  }
}

export default new SpentController();
