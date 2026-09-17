import { canAccess } from "../services/entitlementService.js";

export const requireEntitlement = (featureKey) => {
  return async (req, res, next) => {
    const therapistId = req.user?.id || req.headers["x-therapist-id"] || "66e01a9b4000000000000001";
    
    const result = await canAccess(therapistId, featureKey);
    if (!result.allowed) {
      return res.status(403).json({
        error: "Feature Gated by Entitlement Tier",
        featureKey,
        reason: result.reason,
        upgradeRequired: result.upgradeRequired || true,
      });
    }

    next();
  };
};

export default requireEntitlement;
