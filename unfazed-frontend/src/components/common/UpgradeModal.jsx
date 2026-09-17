import React from "react";
import { Sparkles, CheckCircle, X, ShieldAlert } from "lucide-react";

export const UpgradeModal = ({ isOpen, onClose, blockedFeature }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-xs p-4">
      <div className="bg-white rounded-3xl max-w-lg w-full p-6 shadow-2xl border border-gray-100 relative animate-in fade-in zoom-in-95 duration-200">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 p-2 rounded-full hover:bg-gray-100"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="w-12 h-12 rounded-2xl bg-amber-100 text-amber-700 flex items-center justify-center mb-4">
          <ShieldAlert className="w-6 h-6" />
        </div>

        <span className="inline-block px-3 py-1 bg-amber-50 text-amber-800 text-xs font-semibold rounded-full mb-2">
          ENTITLEMENT TIER GATE
        </span>

        <h3 className="text-xl font-bold text-gray-900 mb-2">
          {blockedFeature?.title || "Feature Gated by Entitlement Tier"}
        </h3>

        <p className="text-sm text-gray-600 mb-6 leading-relaxed">
          {blockedFeature?.reason || "This feature requires a higher practice tier subscription."}
        </p>

        <div className="bg-gradient-to-r from-teal-900 to-teal-800 text-white rounded-2xl p-5 mb-6 space-y-3">
          <div className="flex items-center gap-2 font-semibold text-teal-200">
            <Sparkles className="w-5 h-5 text-amber-400" />
            <span>Unlock Unfazed PRO Practice Hub</span>
          </div>
          <ul className="space-y-2 text-xs text-teal-100">
            <li className="flex items-center gap-2">
              <CheckCircle className="w-4 h-4 text-teal-300" />
              <span>Unlimited Active Clients in CRM</span>
            </li>
            <li className="flex items-center gap-2">
              <CheckCircle className="w-4 h-4 text-teal-300" />
              <span>SOAP & DAP Structured Clinical Templates</span>
            </li>
            <li className="flex items-center gap-2">
              <CheckCircle className="w-4 h-4 text-teal-300" />
              <span>MongoDB Aggregated Revenue & No-Show Analytics</span>
            </li>
          </ul>
        </div>

        <div className="flex gap-3">
          <button
            onClick={onClose}
            className="flex-1 py-3 text-sm font-medium text-gray-700 hover:bg-gray-100 rounded-xl transition"
          >
            Cancel
          </button>
          <button
            onClick={() => {
              alert("Upgraded to Unfazed PRO Tier (Simulated)");
              onClose();
            }}
            className="flex-1 py-3 text-sm font-semibold text-white bg-teal-700 hover:bg-teal-800 rounded-xl shadow-lg shadow-teal-700/20 transition"
          >
            Upgrade to PRO (₹2,999/mo)
          </button>
        </div>
      </div>
    </div>
  );
};

export default UpgradeModal;
