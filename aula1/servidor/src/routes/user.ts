import { Router } from "express";
import controller from "../controllers/UserController";

const routes = Router();

routes.post("/", controller.create);

export default routes;
