import { Request, Response } from "express";
import User from "../models/User";
import { tokenize } from "../middleware";

class UserController {
  public async login(req: Request, res: Response): Promise<void> {
    const { mail, password } = req.body;

    if (!mail || !password) {
      res.status(401).json({ erro: "Forneça o e-mail e senha" });
    } else {
      try {
        const user = await User.findOne({ mail, password });
        if (user) {
          res.json({ ...user.toObject(), token: tokenize(user.toObject()) });
        } else {
          res.json({ erro: "Dados de login não conferem" });
        }
      } catch (e: any) {
        res.status(500).json({ erro: e.message });
      }
    }
  }

  public async create(req: Request, res: Response): Promise<void> {
    const { mail, password, profile } = req.body;

    try {
      const newUser = new User({ mail, password, profile });
      const response = await newUser.save();
      const userObject = response.toObject();
      res.json({ ...userObject, token: tokenize(userObject) });
    } catch (e: any) {
      if (e.code === 11000) {
        res.json({ erro: `O e-mail ${mail} já está cadastrado` });
      } else {
        res.json({ erro: e.message });
      }
    }
  }

  public async list(_: Request, res: Response): Promise<void> {
    try {
      const users = await User.find({}, {}, { sort: { mail: 1 } });
      res.json(users);
    } catch (e: any) {
      res.status(500).json({ erro: e.message });
    }
  }

  public async delete(req: Request, res: Response): Promise<void> {
    const { id } = req.body;

    try {
      const response = await User.findByIdAndDelete(id).exec();
      if (response) {
        res.json(response);
      } else {
        res.json({ erro: `Usuário não localizado` });
      }
    } catch (e: any) {
      res.status(500).json({ erro: e.message });
    }
  }

  public async updateMail(req: Request, res: Response): Promise<void> {
    const { mail } = req.body;
    const { id } = req.body;

    try {
      const response = await User.findByIdAndUpdate(
        id,
        { mail },
        { new: true, runValidators: true, context: "query" }
      ).exec();
      if (response) {
        res.json(response);
      } else {
        res.json({ erro: "Usuário não localizado" });
      }
    } catch (e: any) {
      if (e.code === 11000) {
        res.json({ erro: `O e-mail ${mail} já está em uso` });
      } else {
        res.json({ erro: e.message });
      }
    }
  }

  public async updatePassword(req: Request, res: Response): Promise<void> {
    const { password } = req.body;
    const { id } = req.body;

    try {
      const response = await User.findByIdAndUpdate(
        id,
        { password },
        { new: true, runValidators: true, context: "query" }
      ).exec();
      if (response) {
        res.json(response);
      } else {
        res.json({ erro: "Usuário não localizado" });
      }
    } catch (e: any) {
      res.json({ erro: e.message });
    }
  }

  public async updateProfile(req: Request, res: Response): Promise<void> {
    const { id, profile } = req.body;
    if (profile === "adm" || profile === "user") {
      try {
        const response = await User.findByIdAndUpdate(
          id,
          { profile },
          { new: true, runValidators: true, context: "query" }
        ).exec();
        if (response) {
          res.json(response);
        } else {
          res.json({ erro: "Usuário não localizado" });
        }
      } catch (e: any) {
        res.json({ erro: e.message });
      }
    } else {
      res.json({ erro: `Perfil inexistente` });
    }
  }
}

export default new UserController();
