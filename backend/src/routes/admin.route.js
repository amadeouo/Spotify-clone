import { Router } from "express";
import { getAdmin } from "../controller/admin.controller.js";
import { protectRoute, requireAdmin } from "../middleware/auth.middleware";

const router = Router();

router.get("/", protectRoute, requireAdmin, createSong);

export default router;