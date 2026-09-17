import express from "express";
import {
  getAllTherapists,
  getTherapistBySlug,
  updateTherapistProfile,
} from "../controllers/therapistController.js";
import { authenticateToken } from "../middleware/authMiddleware.js";

const router = express.Router();

router.get("/", getAllTherapists);
router.get("/slug/:slug", getTherapistBySlug);
router.put("/profile", authenticateToken, updateTherapistProfile);

export default router;
