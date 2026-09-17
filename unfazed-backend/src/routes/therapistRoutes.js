import express from "express";
import {
  getAllTherapists,
  getTherapistBySlug,
  updateTherapistProfile,
  getTherapistReviews,
  addTherapistReview,
} from "../controllers/therapistController.js";
import { authenticateToken } from "../middleware/authMiddleware.js";

const router = express.Router();

router.get("/", getAllTherapists);
router.get("/slug/:slug", getTherapistBySlug);
router.get("/:therapistId/reviews", getTherapistReviews);
router.post("/:therapistId/reviews", addTherapistReview);
router.put("/profile", authenticateToken, updateTherapistProfile);

export default router;

