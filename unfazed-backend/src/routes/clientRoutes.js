import express from "express";
import { getTherapistClients, createClientIntake, getClientById } from "../controllers/clientController.js";
import { authenticateToken } from "../middleware/authMiddleware.js";
import { requireEntitlement } from "../middleware/entitlementMiddleware.js";

const router = express.Router();

router.get("/", authenticateToken, getTherapistClients);
router.post("/", authenticateToken, requireEntitlement("add_client"), createClientIntake);
router.get("/:id", authenticateToken, getClientById);

export default router;
