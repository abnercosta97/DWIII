import { Router } from "express";
import ProductController from "../controllers/ProductController";

const router = Router();

router.post("/", ProductController.create);
router.get("/", ProductController.list);
router.delete("/", ProductController.delete);
router.put("/", ProductController.update);

export default router;
