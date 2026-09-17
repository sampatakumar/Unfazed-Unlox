import express from "express";
import { getAnalyticsDashboard } from "../controllers/analyticsController.js";
import { authenticateToken } from "../middleware/authMiddleware.js";
import { requireEntitlement } from "../middleware/entitlementMiddleware.js";

const router = express.Router();

router.get("/dashboard", authenticateToken, requireEntitlement("view_advanced_analytics"), getAnalyticsDashboard);

export default router;
