import express from "express";
import { registerTherapist, loginTherapist, getMe } from "../controllers/authController.js";
import { authenticateToken } from "../middleware/authMiddleware.js";

const router = express.Router();

router.post("/register", registerTherapist);
router.post("/login", loginTherapist);
router.get("/me", authenticateToken, getMe);

export default router;
