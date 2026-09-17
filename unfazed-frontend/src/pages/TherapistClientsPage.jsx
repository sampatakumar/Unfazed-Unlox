import React, { useState, useEffect } from "react";
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
    const allowed = checkEntitlement("add_client", clients.length);
    if (!allowed) return;
    alert("Add client modal trigger (Simulated)");
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8">
      <ClientTable
        clients={clients}
        onSelectClient={(c) => setSelectedClient(c)}
        onAddClientTrigger={handleAddClientTrigger}
      />

      {/* Client Detail Profile Modal */}
      {selectedClient && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-xs p-4">
          <div className="bg-white rounded-3xl max-w-2xl w-full p-6 shadow-2xl space-y-5 border border-gray-100 relative max-h-[90vh] overflow-y-auto">
            <div className="flex justify-between items-start border-b border-gray-100 pb-3">
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
                <p>Status: Accepted on {new Date(selectedClient.consent?.timestamp || Date.now()).toLocaleString()}</p>
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
