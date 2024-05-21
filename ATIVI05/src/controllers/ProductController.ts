import { Request, Response } from "express";
import Product from "../models/Product";

class ProductController {
  public async create(req: Request, res: Response): Promise<void> {
    const { name, category } = req.body;
    try {
      const response = await Product.create({ name, category });
      res.send(response);
    } catch (e: any) {
      if (e.code === 11000) {
        res.send({ message: `O nome ${name} já está cadastrado` });
      } else if (e.errors?.name) {
        res.send({ message: e.errors.name.message });
      } else if (e.errors?.category) {
        res.send({ message: e.errors.category.message });
      } else {
        res.send({ message: e.message });
      }
    }
  }

  public async list(_: Request, res: Response): Promise<void> {
    try {
      const products = await Product.find({})
        .select("name category")
        .populate("category", "name")
        .sort({ name: 1 })
        .exec(); // Ensure the query is executed

      const response = products.map((product) => ({
        id: product._id,
        name: product.name,
        categoria: (product.category as any).name, // TypeScript workaround
      }));

      res.send(response);
    } catch (e: any) {
      res.send({ message: e.message });
    }
  }

  public async delete(req: Request, res: Response): Promise<void> {
    const { id } = req.body;
    const response = await Product.findByIdAndDelete(id);
    if (response) {
      res.json(response);
    } else {
      res.json({ message: "Registro inexistente" });
    }
  }

  public async update(req: Request, res: Response): Promise<void> {
    const { id, name, category } = req.body;
    try {
      const response = await Product.findByIdAndUpdate(
        id,
        { name, category },
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
      if (e.code === 11000) {
        res.send({ message: `O nome ${name} já está em uso` });
      } else if (e.errors?.name) {
        res.send({ message: e.errors.name.message });
      } else if (e.errors?.category) {
        res.send({ message: e.errors.category.message });
      } else {
        res.send({ message: e });
      }
    }
  }
}

export default new ProductController();
