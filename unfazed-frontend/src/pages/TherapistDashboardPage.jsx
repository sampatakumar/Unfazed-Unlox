import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import axiosInstance from "../api/axiosInstance";
import {
  Calendar,
  Users,
  FileText,
  TrendingUp,
  ExternalLink,
  MessageSquare,
  Clock,
  Sparkles,
  CheckCircle,
} from "lucide-react";

export const TherapistDashboardPage = () => {
  const { user } = useAuth();
  const [sessions, setSessions] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchSessions = async () => {
      try {
        const res = await axiosInstance.get("/scheduling/sessions");
        setSessions(res.data || []);
      } catch (e) {
        console.error(e);
      } finally {
        setLoading(false);
      }
    };
    fetchSessions();
  }, []);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8">
      {/* Top Banner */}
      <div className="bg-white rounded-3xl p-6 sm:p-8 border border-gray-100 shadow-sm flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
        <div className="space-y-1">
          <div className="flex items-center gap-2">
            <h1 className="text-2xl sm:text-3xl font-extrabold text-gray-900">
              Welcome back, {user?.name || "Dr. Ashmita Singh"}
            </h1>
            <span className="px-2.5 py-0.5 bg-teal-100 text-teal-800 text-xs font-bold rounded-full uppercase">
              {user?.subscriptionTier || "PRO"} TIER
            </span>
          </div>
          <p className="text-xs text-gray-500">
            Practice Hub • Branded Profile:{" "}
            <a
              href={`http://localhost:5173/${user?.slug || "ashmita-singh"}`}
              target="_blank"
              rel="noreferrer"
              className="text-teal-700 font-bold hover:underline inline-flex items-center gap-1"
            >
              <span>unfazed.in/{user?.slug || "ashmita-singh"}</span>
              <ExternalLink className="w-3 h-3" />
            </a>
          </p>
        </div>

        {/* Quick Nav Pills */}
        <div className="flex flex-wrap gap-2">
          <Link to="/therapist/schedule" className="px-4 py-2 bg-gray-100 hover:bg-gray-200 text-gray-800 font-semibold text-xs rounded-xl transition">
            📅 Schedule
          </Link>
          <Link to="/therapist/clients" className="px-4 py-2 bg-gray-100 hover:bg-gray-200 text-gray-800 font-semibold text-xs rounded-xl transition">
            👥 Client CRM
          </Link>
          <Link to="/therapist/notes" className="px-4 py-2 bg-gray-100 hover:bg-gray-200 text-gray-800 font-semibold text-xs rounded-xl transition">
            📝 Clinical Notes
          </Link>
          <Link to="/therapist/analytics" className="px-4 py-2 bg-teal-700 hover:bg-teal-800 text-white font-semibold text-xs rounded-xl shadow-md transition">
            📈 Analytics
          </Link>
        </div>
      </div>

      {/* Overview Cards Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
        <div className="bg-white p-5 rounded-3xl border border-gray-100 shadow-xs space-y-2">
          <div className="flex justify-between items-center text-xs text-gray-500 font-medium">
            <span>Sessions Today</span>
            <Calendar className="w-4 h-4 text-teal-600" />
          </div>
          <div className="text-2xl font-bold text-gray-900">4 Appointments</div>
          <div className="text-[11px] text-teal-700 font-medium">Next: 2:00 PM (Rohan V.)</div>
        </div>

        <div className="bg-white p-5 rounded-3xl border border-gray-100 shadow-xs space-y-2">
          <div className="flex justify-between items-center text-xs text-gray-500 font-medium">
            <span>Active Clients</span>
            <Users className="w-4 h-4 text-teal-600" />
          </div>
          <div className="text-2xl font-bold text-gray-900">28 Active</div>
          <div className="text-[11px] text-gray-500">Tier Cap: 100 Clients</div>
        </div>

        <div className="bg-white p-5 rounded-3xl border border-gray-100 shadow-xs space-y-2">
          <div className="flex justify-between items-center text-xs text-gray-500 font-medium">
            <span>Clinical Notes Pending</span>
            <FileText className="w-4 h-4 text-teal-600" />
          </div>
          <div className="text-2xl font-bold text-gray-900">2 Notes</div>
          <div className="text-[11px] text-amber-600 font-medium">SOAP Templates Ready</div>
        </div>

        <div className="bg-white p-5 rounded-3xl border border-gray-100 shadow-xs space-y-2">
          <div className="flex justify-between items-center text-xs text-gray-500 font-medium">
            <span>Sep Earnings</span>
            <TrendingUp className="w-4 h-4 text-teal-600" />
          </div>
          <div className="text-2xl font-bold text-gray-900">₹75,600</div>
          <div className="text-[11px] text-emerald-600 font-medium">Payouts Processed</div>
        </div>
      </div>

      {/* Appointments Roster & Quick Actions */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        <div className="lg:col-span-8 bg-white rounded-3xl p-6 border border-gray-100 shadow-sm space-y-4">
          <div className="flex justify-between items-center pb-3 border-b border-gray-100">
            <h3 className="font-bold text-gray-900 text-base">Upcoming Appointments Today</h3>
            <Link to="/therapist/schedule" className="text-xs text-teal-700 font-bold hover:underline">
              View Calendar
            </Link>
          </div>

          <div className="space-y-3">
            {sessions.map((s) => (
              <div key={s._id} className="p-4 bg-gray-50/70 rounded-2xl border border-gray-100 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-teal-100 text-teal-800 font-bold flex items-center justify-center text-xs">
                    {s.client_id?.name ? s.client_id.name.charAt(0) : "C"}
                  </div>
                  <div>
                    <div className="font-bold text-gray-900 text-sm">{s.client_id?.name || "Client"}</div>
                    <div className="text-xs text-gray-500">
                      {s.sessionType ? s.sessionType.toUpperCase() : "1-ON-1"} • {s.date} at {s.startTime}
                    </div>
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <a
                    href={s.meetingLink || "#"}
                    target="_blank"
                    rel="noreferrer"
                    className="px-3.5 py-2 bg-teal-700 hover:bg-teal-800 text-white font-semibold text-xs rounded-xl shadow-xs transition"
                  >
                    Join Video Room
                  </a>
                  <Link
                    to="/therapist/notes"
                    className="px-3.5 py-2 bg-white text-gray-700 hover:bg-gray-100 font-semibold text-xs rounded-xl border border-gray-200 transition"
                  >
                    Add SOAP Note
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Right Portal Quick Links */}
        <div className="lg:col-span-4 bg-white rounded-3xl p-6 border border-gray-100 shadow-sm space-y-4">
          <h3 className="font-bold text-gray-900 text-base">Practice Hub Shortcuts</h3>
          <ul className="space-y-3 text-xs">
            <li>
              <Link to="/therapist/schedule" className="flex items-center justify-between p-3 bg-gray-50 hover:bg-teal-50 rounded-2xl transition group">
                <span className="font-semibold text-gray-800 group-hover:text-teal-900">Weekly Availability Schedule</span>
                <span className="text-gray-400">→</span>
              </Link>
            </li>
            <li>
              <Link to="/therapist/clients" className="flex items-center justify-between p-3 bg-gray-50 hover:bg-teal-50 rounded-2xl transition group">
                <span className="font-semibold text-gray-800 group-hover:text-teal-900">Client CRM & Consent Logs</span>
                <span className="text-gray-400">→</span>
              </Link>
            </li>
            <li>
              <Link to="/therapist/notes" className="flex items-center justify-between p-3 bg-gray-50 hover:bg-teal-50 rounded-2xl transition group">
                <span className="font-semibold text-gray-800 group-hover:text-teal-900">TipTap SOAP / DAP Notes Editor</span>
                <span className="text-gray-400">→</span>
              </Link>
            </li>
            <li>
              <Link to="/therapist/analytics" className="flex items-center justify-between p-3 bg-gray-50 hover:bg-teal-50 rounded-2xl transition group">
                <span className="font-semibold text-gray-800 group-hover:text-teal-900">MongoDB Aggregation Analytics</span>
                <span className="text-gray-400">→</span>
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default TherapistDashboardPage;
