import { Router } from "express";
import SpentController from "../controllers/SpentController";

const router = Router();

router.post("/", SpentController.create);
router.get("/", SpentController.list);
router.delete("/", SpentController.delete);
router.put("/", SpentController.update);

export default router;
