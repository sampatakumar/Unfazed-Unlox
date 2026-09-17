import Therapist from "../models/Therapist.js";
import SubscriptionTierConfig from "../models/SubscriptionTierConfig.js";
import Client from "../models/Client.js";

// Default configuration rules per tier
const DEFAULT_TIER_SPECS = {
  free: {
    maxActiveClients: 5,
    allowedNoteTemplates: ["freeform"],
    analyticsDepth: "basic",
    hasCustomBrandedSlug: true,
    hasWhatsAppNotifications: false,
  },
  starter: {
    maxActiveClients: 25,
    allowedNoteTemplates: ["freeform", "soap"],
    analyticsDepth: "basic",
    hasCustomBrandedSlug: true,
    hasWhatsAppNotifications: false,
  },
  pro: {
    maxActiveClients: 100,
    allowedNoteTemplates: ["freeform", "soap", "dap"],
    analyticsDepth: "advanced",
    hasCustomBrandedSlug: true,
    hasWhatsAppNotifications: true,
  },
  enterprise: {
    maxActiveClients: 9999,
    allowedNoteTemplates: ["freeform", "soap", "dap"],
    analyticsDepth: "custom",
    hasCustomBrandedSlug: true,
    hasWhatsAppNotifications: true,
  },
};

/**
 * Centralized entitlement checker as specified in UNLOX Major Project specs.
 * Single source of truth for feature access.
 */
export const canAccess = async (therapistId, featureKey, context = {}) => {
  try {
    const therapist = await Therapist.findById(therapistId);
    if (!therapist) return { allowed: false, reason: "Therapist not found" };

    const tierKey = therapist.subscriptionTier || "starter";

    // Attempt to load dynamic DB config or fallback to spec
    let tierConfig = await SubscriptionTierConfig.findOne({ tierKey });
    const specs = tierConfig || DEFAULT_TIER_SPECS[tierKey] || DEFAULT_TIER_SPECS["starter"];

    if (featureKey === "add_client") {
      const currentClientCount = await Client.countDocuments({ therapist_id: therapistId, status: "active" });
      if (currentClientCount >= specs.maxActiveClients) {
        return {
          allowed: false,
          reason: `Active client limit (${specs.maxActiveClients}) reached for your ${tierKey.toUpperCase()} tier. Please upgrade to add more clients.`,
          upgradeRequired: true,
        };
      }
      return { allowed: true };
    }

    if (featureKey === "use_soap_notes") {
      const isAllowed = specs.allowedNoteTemplates.includes("soap");
      return {
        allowed: isAllowed,
        reason: isAllowed ? "" : `SOAP Note templates are not available on the ${tierKey.toUpperCase()} tier.`,
        upgradeRequired: !isAllowed,
      };
    }

    if (featureKey === "use_dap_notes") {
      const isAllowed = specs.allowedNoteTemplates.includes("dap");
      return {
        allowed: isAllowed,
        reason: isAllowed ? "" : `DAP Note templates require PRO or ENTERPRISE tier.`,
        upgradeRequired: !isAllowed,
      };
    }

    if (featureKey === "view_advanced_analytics") {
      const isAllowed = specs.analyticsDepth === "advanced" || specs.analyticsDepth === "custom";
      return {
        allowed: isAllowed,
        reason: isAllowed ? "" : `Advanced Revenue & No-Show Analytics require PRO tier.`,
        upgradeRequired: !isAllowed,
      };
    }

    return { allowed: true };
  } catch (error) {
    console.error("[EntitlementService Error]", error);
    return { allowed: true }; // Graceful fallback
  }
};

export default { canAccess };
