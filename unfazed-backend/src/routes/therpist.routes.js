import express from "express";
const router = express.Router();
import therapistController from "../controllers/therapist.controller.js";


router.post("/register", therapistController.registerTherapist);
router.post("/login", therapistController.loginTherapist);

export default router;