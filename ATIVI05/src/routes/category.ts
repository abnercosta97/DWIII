import { Router } from "express";
import controller from "../controllers/CategoryController";

const router = Router();

router.post("/", controller.create);
router.get("/", controller.list);
router.delete("/", controller.delete);
router.put("/", controller.update);

export default router;
