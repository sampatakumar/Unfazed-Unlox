import express from "express";
import {
  getAvailability,
  saveAvailability,
  getSlotsForDate,
  bookSession,
  getTherapistSessions,
} from "../controllers/schedulingController.js";
import { authenticateToken } from "../middleware/authMiddleware.js";

const router = express.Router();

router.get("/availability", getAvailability);
router.post("/availability", authenticateToken, saveAvailability);
router.get("/slots", getSlotsForDate);
router.post("/book", bookSession);
router.get("/sessions", authenticateToken, getTherapistSessions);

export default router;
