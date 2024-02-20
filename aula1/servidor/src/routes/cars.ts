import { Router } from "express";
import controller from "../controllers/CarController";

const routes = Router();

routes.get("/VW", controller.VW);
routes.get("/FIAT", controller.FIAT);

export default routes;
