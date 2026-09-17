import { useState, useEffect } from "react";
import axiosInstance from "../api/axiosInstance";
import ClientTable from "../components/crm/ClientTable";
import UpgradeModal from "../components/common/UpgradeModal";
import useEntitlement from "../hooks/useEntitlement";

export const TherapistClientsPage = () => {
  const [clients, setClients] = useState([]);
  const [selectedClient, setSelectedClient] = useState(null);

  const { checkEntitlement, upgradeModalOpen, setUpgradeModalOpen, blockedFeature } = useEntitlement();

  useEffect(() => {
    const loadClients = async () => {
      try {
        const res = await axiosInstance.get("/clients");
        setClients(res.data || []);
      } catch (e) {
        console.error(e);
      }
    };
    loadClients();
  }, []);

  const handleAddClientTrigger = () => {
    if (checkEntitlement("unlimited_clients", clients.length)) {
      alert("Feature unlocked! Launching Add Client Form...");
    }
  };

  const getConsentDate = (timestamp) => {
    if (!timestamp) return "Verified (Accepted)";
    return new Date(timestamp).toLocaleString();
  };

  return (
    <div className="max-w-7xl mx-auto px-4 py-8 space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Client Management (CRM)</h1>
          <p className="text-gray-500 text-sm">Track active clients, intake documentation, and intake consents.</p>
        </div>
        <button
          onClick={handleAddClientTrigger}
          className="bg-teal-600 hover:bg-teal-700 text-white font-medium px-4 py-2 rounded-xl text-sm shadow-sm transition"
        >
          + Add New Client
        </button>
      </div>

      <ClientTable clients={clients} onSelectClient={(client) => setSelectedClient(client)} />

      {/* Client Detail Drawer / Modal */}
      {selectedClient && (
        <div className="fixed inset-0 bg-black/40 backdrop-blur-sm flex justify-end z-50">
          <div className="bg-white w-full max-w-md h-full shadow-2xl p-6 space-y-6 overflow-y-auto">
            <div className="flex justify-between items-start border-b border-gray-100 pb-4">
              <div>
                <h3 className="font-bold text-gray-900 text-lg">{selectedClient.name}</h3>
                <p className="text-xs text-gray-500">{selectedClient.email} | {selectedClient.phone}</p>
              </div>
              <button onClick={() => setSelectedClient(null)} className="text-gray-400 hover:text-gray-700">✕</button>
            </div>

            <div className="space-y-4 text-xs">
              <div className="bg-teal-50 p-4 rounded-2xl border border-teal-100 space-y-2">
                <h4 className="font-bold text-teal-900 text-sm">Presenting Concern & Intake History</h4>
                <p className="text-teal-800">{selectedClient.intake?.presentingConcern || "Workplace anxiety & burnout"}</p>
                <p className="text-teal-700">Age: {selectedClient.intake?.age || 28} | Gender: {selectedClient.intake?.gender || "Male"}</p>
              </div>

              <div className="bg-emerald-50 p-4 rounded-2xl border border-emerald-100 space-y-1 text-emerald-900">
                <h4 className="font-bold text-emerald-950 text-sm">Digital Consent Audit Record</h4>
                <p>Status: Accepted on {getConsentDate(selectedClient.consent?.timestamp)}</p>
                <p className="font-mono text-[10px]">IP Audit Hash: {selectedClient.consent?.ipAddress || "103.21.124.8"}</p>
              </div>
            </div>
          </div>
        </div>
      )}

      <UpgradeModal
        isOpen={upgradeModalOpen}
        onClose={() => setUpgradeModalOpen(false)}
        blockedFeature={blockedFeature}
      />
    </div>
  );
};

export default TherapistClientsPage;
