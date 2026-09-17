import React, { useState } from "react";
import ChatWindow from "../components/chat/ChatWindow";
import { Calendar, Video, FileText, MessageSquare, ShieldCheck, CheckCircle2 } from "lucide-react";

export const ClientPortalPage = () => {
  const [activeTab, setActiveTab] = useState("sessions"); // 'sessions', 'notes', 'chat'

  const sharedNotes = [
    {
      _id: "sn1",
      date: "Sep 2, 2026",
      therapist: "Dr. Ashmita Singh",
      takeaway: "Practice progressive muscle relaxation 10 mins every evening. Record thought logs whenever panic spikes occur.",
    },
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8">
      {/* Header */}
      <div className="bg-white rounded-3xl p-6 sm:p-8 border border-gray-100 shadow-sm flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
        <div>
          <span className="px-3 py-1 bg-teal-50 text-teal-800 text-xs font-semibold rounded-full uppercase">
            Client Self-Service Portal
          </span>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-gray-900 mt-2">Welcome, Rohan Verma</h1>
          <p className="text-xs text-gray-500">Therapist: Dr. Ashmita Singh (Senior Clinical Psychologist)</p>
        </div>

        <div className="flex bg-gray-100 p-1.5 rounded-2xl text-xs font-semibold">
          <button
            onClick={() => setActiveTab("sessions")}
            className={`px-4 py-2 rounded-xl transition ${activeTab === "sessions" ? "bg-white text-teal-800 shadow-xs" : "text-gray-600"}`}
          >
            📅 Upcoming Sessions
          </button>
          <button
            onClick={() => setActiveTab("notes")}
            className={`px-4 py-2 rounded-xl transition ${activeTab === "notes" ? "bg-white text-teal-800 shadow-xs" : "text-gray-600"}`}
          >
            📝 Shared Takeaways
          </button>
          <button
            onClick={() => setActiveTab("chat")}
            className={`px-4 py-2 rounded-xl transition ${activeTab === "chat" ? "bg-white text-teal-800 shadow-xs" : "text-gray-600"}`}
          >
            💬 Real-Time Chat
          </button>
        </div>
      </div>

      {/* Tab Contents */}
      {activeTab === "sessions" && (
        <div className="bg-white rounded-3xl p-6 border border-gray-100 shadow-sm space-y-4">
          <h3 className="font-bold text-gray-900 text-lg">Your Booked Sessions</h3>
          <div className="p-5 bg-teal-50/60 rounded-2xl border border-teal-100 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
            <div>
              <span className="inline-block px-2.5 py-0.5 bg-teal-100 text-teal-800 text-[10px] font-bold rounded uppercase mb-1">
                Confirmed & Paid
              </span>
              <h4 className="font-bold text-gray-900 text-base">Individual Therapy Session (50 Mins)</h4>
              <p className="text-xs text-gray-600">Today at 2:00 PM (Asia/Kolkata IST)</p>
            </div>

            <a
              href="https://meet.google.com/unz-demo-room"
              target="_blank"
              rel="noreferrer"
              className="px-5 py-3 bg-teal-700 hover:bg-teal-800 text-white font-semibold text-xs rounded-xl shadow-md transition flex items-center gap-2"
            >
              <Video className="w-4 h-4" />
              <span>Join Encrypted Video Call</span>
            </a>
          </div>
        </div>
      )}

      {activeTab === "notes" && (
        <div className="bg-white rounded-3xl p-6 border border-gray-100 shadow-sm space-y-4">
          <div className="flex items-center justify-between border-b border-gray-100 pb-3">
            <div>
              <h3 className="font-bold text-gray-900 text-lg">Shared Session Takeaways</h3>
              <p className="text-xs text-gray-500">🔒 Enforced API Isolation: Private clinical notes remain confidential</p>
            </div>
          </div>

          <div className="space-y-3">
            {sharedNotes.map((n) => (
              <div key={n._id} className="p-4 bg-gray-50 rounded-2xl border border-gray-100 space-y-2 text-xs">
                <div className="flex justify-between font-semibold text-gray-700">
                  <span>Session Date: {n.date}</span>
                  <span>Therapist: {n.therapist}</span>
                </div>
                <p className="text-gray-800 leading-relaxed bg-white p-3 rounded-xl border border-gray-200">
                  {n.takeaway}
                </p>
              </div>
            ))}
          </div>
        </div>
      )}

      {activeTab === "chat" && (
        <ChatWindow roomId="room_rohan_ashmita" currentUserName="Client (Rohan)" />
      )}
    </div>
  );
};

export default ClientPortalPage;
