import React, { useState } from "react";
import useEntitlement from "../../hooks/useEntitlement";
import { Lock, Eye, Save, Sparkles, FileText, CheckCircle2 } from "lucide-react";

export const NoteEditor = ({ sessionId, clientId, onSaveNote, onTriggerUpgrade }) => {
  const { checkEntitlement } = useEntitlement();
  const [noteType, setNoteType] = useState("private"); // 'private' vs 'shared'
  const [templateFormat, setTemplateFormat] = useState("soap"); // 'freeform', 'soap', 'dap'
  
  const [soapData, setSoapData] = useState({
    subjective: "Client reports elevated anxiety during team presentations. Sleep quality poor.",
    objective: "Posture tense, fidgeting hands, speech rate accelerated.",
    assessment: "CBT pattern shows catastrophizing cognitive distortion.",
    plan: "Implement progressive muscle relaxation and thought logs before next session.",
  });

  const [freeform, setFreeform] = useState("");
  const [savedMsg, setSavedMsg] = useState(false);

  const handleTemplateChange = (fmt) => {
    if (fmt === "soap") {
      const allowed = checkEntitlement("use_soap_notes");
      if (!allowed) return;
    }
    if (fmt === "dap") {
      const allowed = checkEntitlement("use_dap_notes");
      if (!allowed) return;
    }
    setTemplateFormat(fmt);
  };

  const handleSave = () => {
    if (onSaveNote) {
      onSaveNote({
        sessionId,
        clientId,
        type: noteType,
        templateFormat,
        soap: soapData,
        freeformContent: freeform,
      });
    }
    setSavedMsg(true);
    setTimeout(() => setSavedMsg(false), 2500);
  };

  return (
    <div className="bg-white rounded-3xl p-6 border border-gray-100 shadow-sm space-y-5">
      {/* Top Controls */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 pb-4 border-b border-gray-100">
        <div>
          <h3 className="text-lg font-bold text-gray-900 flex items-center gap-2">
            <FileText className="w-5 h-5 text-teal-600" />
            <span>Clinical Documentation Editor</span>
          </h3>
          <p className="text-xs text-gray-500">
            {noteType === "private"
              ? "🔒 PRIVATE NOTE — Enforced API isolation (Therapist Only)"
              : "👁️ SHARED NOTE — Visible to client in Client Portal"}
          </p>
        </div>

        {/* Private vs Shared Toggle */}
        <div className="flex bg-gray-100 p-1 rounded-2xl">
          <button
            onClick={() => setNoteType("private")}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-semibold transition ${
              noteType === "private" ? "bg-white text-gray-900 shadow-xs" : "text-gray-500 hover:text-gray-700"
            }`}
          >
            <Lock className="w-3.5 h-3.5 text-amber-600" />
            <span>Private Note</span>
          </button>
          <button
            onClick={() => setNoteType("shared")}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-semibold transition ${
              noteType === "shared" ? "bg-white text-teal-800 shadow-xs" : "text-gray-500 hover:text-gray-700"
            }`}
          >
            <Eye className="w-3.5 h-3.5 text-teal-600" />
            <span>Shared Takeaways</span>
          </button>
        </div>
      </div>

      {/* Template Selectors */}
      <div className="flex gap-2">
        <button
          onClick={() => handleTemplateChange("soap")}
          className={`px-3 py-1.5 rounded-xl text-xs font-semibold border transition ${
            templateFormat === "soap"
              ? "bg-teal-700 text-white border-teal-700"
              : "bg-gray-50 text-gray-700 border-gray-200 hover:bg-gray-100"
          }`}
        >
          SOAP Template
        </button>
        <button
          onClick={() => handleTemplateChange("freeform")}
          className={`px-3 py-1.5 rounded-xl text-xs font-semibold border transition ${
            templateFormat === "freeform"
              ? "bg-teal-700 text-white border-teal-700"
              : "bg-gray-50 text-gray-700 border-gray-200 hover:bg-gray-100"
          }`}
        >
          Freeform Notes
        </button>
      </div>

      {/* Editor Body */}
      {templateFormat === "soap" ? (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-1">
              Subjective (S)
            </label>
            <textarea
              rows={3}
              value={soapData.subjective}
              onChange={(e) => setSoapData({ ...soapData, subjective: e.target.value })}
              className="w-full p-3 bg-gray-50 border border-gray-200 rounded-xl text-xs focus:outline-none focus:border-teal-600"
              placeholder="Client's self-reported feelings & history..."
            />
          </div>

          <div>
            <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-1">
              Objective (O)
            </label>
            <textarea
              rows={3}
              value={soapData.objective}
              onChange={(e) => setSoapData({ ...soapData, objective: e.target.value })}
              className="w-full p-3 bg-gray-50 border border-gray-200 rounded-xl text-xs focus:outline-none focus:border-teal-600"
              placeholder="Therapist's clinical observations & behavior..."
            />
          </div>

          <div>
            <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-1">
              Assessment (A)
            </label>
            <textarea
              rows={3}
              value={soapData.assessment}
              onChange={(e) => setSoapData({ ...soapData, assessment: e.target.value })}
              className="w-full p-3 bg-gray-50 border border-gray-200 rounded-xl text-xs focus:outline-none focus:border-teal-600"
              placeholder="Clinical evaluation & progress tracking..."
            />
          </div>

          <div>
            <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-1">
              Plan (P)
            </label>
            <textarea
              rows={3}
              value={soapData.plan}
              onChange={(e) => setSoapData({ ...soapData, plan: e.target.value })}
              className="w-full p-3 bg-gray-50 border border-gray-200 rounded-xl text-xs focus:outline-none focus:border-teal-600"
              placeholder="Homework, interventions & next session goals..."
            />
          </div>
        </div>
      ) : (
        <div>
          <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-1">
            Freeform Session Notes
          </label>
          <textarea
            rows={6}
            value={freeform}
            onChange={(e) => setFreeform(e.target.value)}
            className="w-full p-3 bg-gray-50 border border-gray-200 rounded-xl text-xs focus:outline-none focus:border-teal-600"
            placeholder="Type comprehensive notes or client shared takeaways..."
          />
        </div>
      )}

      {/* Bottom Save Action */}
      <div className="flex justify-between items-center pt-2">
        {savedMsg ? (
          <span className="text-xs text-emerald-600 font-semibold flex items-center gap-1">
            <CheckCircle2 className="w-4 h-4" /> Note Saved Successfully
          </span>
        ) : (
          <span className="text-xs text-gray-400">
            {noteType === "private" ? "Confidential file stored in encrypted vault." : "Will sync to Client Portal."}
          </span>
        )}

        <button
          onClick={handleSave}
          className="px-5 py-2.5 bg-teal-700 hover:bg-teal-800 text-white font-semibold text-xs rounded-xl shadow-md flex items-center gap-2 transition"
        >
          <Save className="w-4 h-4" />
          <span>Save Clinical Note</span>
        </button>
      </div>
    </div>
  );
};

export default NoteEditor;
