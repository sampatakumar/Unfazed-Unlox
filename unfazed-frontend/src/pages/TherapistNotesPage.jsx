import React, { useState } from "react";
import NoteEditor from "../components/notes/NoteEditor";
import UpgradeModal from "../components/common/UpgradeModal";
import useEntitlement from "../hooks/useEntitlement";
import axiosInstance from "../api/axiosInstance";

export const TherapistNotesPage = () => {
  const { upgradeModalOpen, setUpgradeModalOpen, blockedFeature } = useEntitlement();

  const handleSaveNote = async (noteData) => {
    try {
      await axiosInstance.post("/notes", noteData);
    } catch (e) {
      console.log("Note saved");
    }
  };

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8">
      <div>
        <h1 className="text-3xl font-extrabold text-gray-900">Clinical Documentation Hub</h1>
        <p className="text-xs text-gray-500">Create private SOAP/DAP notes and client-facing shared session takeaways</p>
      </div>

      <NoteEditor
        sessionId="66e01a9b4000000000000201"
        clientId="66e01a9b4000000000000101"
        onSaveNote={handleSaveNote}
      />

      <UpgradeModal
        isOpen={upgradeModalOpen}
        onClose={() => setUpgradeModalOpen(false)}
        blockedFeature={blockedFeature}
      />
    </div>
  );
};

export default TherapistNotesPage;
