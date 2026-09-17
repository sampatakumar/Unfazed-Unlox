import { useState } from "react";
import { useAuth } from "../context/AuthContext";

export const useEntitlement = () => {
  const { user } = useAuth();
  const [upgradeModalOpen, setUpgradeModalOpen] = useState(false);
  const [blockedFeature, setBlockedFeature] = useState(null);

  const tier = user?.subscriptionTier || "starter";

  const checkEntitlement = (featureKey, currentCount = 0) => {
    if (featureKey === "add_client") {
      const maxClients = tier === "free" ? 5 : tier === "starter" ? 25 : 1000;
      if (currentCount >= maxClients) {
        setBlockedFeature({
          key: featureKey,
          title: "Active Client Limit Reached",
          reason: `Your ${tier.toUpperCase()} plan is capped at ${maxClients} active clients. Upgrade to PRO to manage unlimited clients.`,
        });
        setUpgradeModalOpen(true);
        return false;
      }
    }

    if (featureKey === "use_soap_notes") {
      if (tier === "free") {
        setBlockedFeature({
          key: featureKey,
          title: "SOAP Clinical Notes Required Upgrade",
          reason: "Structured SOAP/DAP templates are available on Starter and PRO tiers.",
        });
        setUpgradeModalOpen(true);
        return false;
      }
    }

    if (featureKey === "view_advanced_analytics") {
      if (tier === "free" || tier === "starter") {
        setBlockedFeature({
          key: featureKey,
          title: "Advanced Revenue & No-Show Analytics",
          reason: "MongoDB-backed revenue trends & no-show pipeline metrics require PRO tier.",
        });
        setUpgradeModalOpen(true);
        return false;
      }
    }

    return true;
  };

  return {
    tier,
    checkEntitlement,
    upgradeModalOpen,
    setUpgradeModalOpen,
    blockedFeature,
  };
};

export default useEntitlement;
