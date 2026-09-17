import React, { useState } from "react";
import { Search, Filter, ShieldCheck, User, Calendar, Tag, FileText, ChevronRight } from "lucide-react";

export const ClientTable = ({ clients, onSelectClient, onAddClientTrigger }) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedTag, setSelectedTag] = useState("All");

  const filteredClients = (clients || []).filter((c) => {
    const matchesSearch = c.name.toLowerCase().includes(searchTerm.toLowerCase()) || c.email.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesTag = selectedTag === "All" || (c.tags && c.tags.includes(selectedTag));
    return matchesSearch && matchesTag;
  });

  return (
    <div className="bg-white rounded-3xl border border-gray-100 shadow-sm overflow-hidden">
      {/* Header & Filter Controls */}
      <div className="p-6 border-b border-gray-100 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h3 className="text-lg font-bold text-gray-900">Client CRM & Intake Roster</h3>
          <p className="text-xs text-gray-500">Manage clients, digital consent audit logs, and therapy history</p>
        </div>

        <div className="flex items-center gap-3 w-full sm:w-auto">
          {/* Search bar */}
          <div className="relative flex-1 sm:w-64">
            <Search className="w-4 h-4 text-gray-400 absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Search by client name or email..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-9 pr-4 py-2 bg-gray-50 border border-gray-200 rounded-xl text-xs focus:outline-none focus:border-teal-600"
            />
          </div>

          <button
            onClick={onAddClientTrigger}
            className="px-4 py-2 bg-teal-700 hover:bg-teal-800 text-white text-xs font-semibold rounded-xl transition shadow-md shrink-0"
          >
            + Add Client
          </button>
        </div>
      </div>

      {/* Table */}
      <div className="overflow-x-auto">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-gray-50/70 border-b border-gray-100 text-xs text-gray-500 font-semibold uppercase tracking-wider">
              <th className="py-3.5 px-6">Client Name</th>
              <th className="py-3.5 px-6">Status</th>
              <th className="py-3.5 px-6">Presenting Concern & Tags</th>
              <th className="py-3.5 px-6">Consent Audit</th>
              <th className="py-3.5 px-6 text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100 text-sm">
            {filteredClients.map((client) => (
              <tr key={client._id} className="hover:bg-teal-50/30 transition">
                <td className="py-4 px-6">
                  <div className="flex items-center gap-3">
                    <div className="w-9 h-9 rounded-full bg-teal-100 text-teal-800 font-bold flex items-center justify-center text-xs">
                      {client.name.charAt(0)}
                    </div>
                    <div>
                      <div className="font-semibold text-gray-900">{client.name}</div>
                      <div className="text-xs text-gray-500">{client.email} | {client.phone}</div>
                    </div>
                  </div>
                </td>
                <td className="py-4 px-6">
                  <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium bg-emerald-50 text-emerald-700 border border-emerald-200">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-500"></span>
                    Active
                  </span>
                </td>
                <td className="py-4 px-6">
                  <div className="space-y-1">
                    <div className="text-xs text-gray-700 truncate max-w-xs">
                      {client.intake?.presentingConcern || "General Consultation"}
                    </div>
                    <div className="flex flex-wrap gap-1">
                      {(client.tags || ["Anxiety"]).map((t) => (
                        <span key={t} className="px-2 py-0.5 bg-gray-100 text-gray-600 rounded text-[10px] font-medium">
                          {t}
                        </span>
                      ))}
                    </div>
                  </div>
                </td>
                <td className="py-4 px-6">
                  <div className="flex items-center gap-1.5 text-xs text-emerald-700 font-medium">
                    <ShieldCheck className="w-4 h-4 text-emerald-600" />
                    <span>Signed: {client.consent?.timestamp ? new Date(client.consent.timestamp).toLocaleDateString("en-IN") : "Verified"}</span>
                  </div>
                </td>
                <td className="py-4 px-6 text-right">
                  <button
                    onClick={() => onSelectClient(client)}
                    className="px-3 py-1.5 text-xs font-semibold text-teal-800 bg-teal-50 hover:bg-teal-100 rounded-lg transition inline-flex items-center gap-1"
                  >
                    <span>View CRM Profile</span>
                    <ChevronRight className="w-3.5 h-3.5" />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ClientTable;
