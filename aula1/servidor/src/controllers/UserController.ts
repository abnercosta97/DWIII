import { Request, Response } from "express";
import {User} from "../models"

class UserController{
    async create(req:Request, res:Response){
        const {mail,password} = req.body;

        const document = new User({mail,password});
        res.json(document)
    }
}

export default new UserController();