import express from "express";
import { getTherapistNotes, getClientSharedNotes, saveNote } from "../controllers/noteController.js";
import { authenticateToken } from "../middleware/authMiddleware.js";

const router = express.Router();

router.get("/therapist", authenticateToken, getTherapistNotes);
router.get("/shared/:clientId", getClientSharedNotes);
router.post("/", authenticateToken, saveNote);

export default router;
