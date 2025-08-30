import express from "express";
import { registerUser, loginUser, getProfile } from "../controllers/authController.js";
import { authenticate } from "../middlewares/authMiddlewares.js";

const router = express.Router();

router.post("/register", registerUser);
router.post("/login", loginUser);
router.get("/profile", authenticate, getProfile);

export default router;
