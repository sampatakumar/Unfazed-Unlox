import React, { useState, useEffect } from "react";
import SlotPicker from "../components/scheduling/SlotPicker";
import axiosInstance from "../api/axiosInstance";
import { Clock, Calendar, CheckCircle2, Save, Sparkles, Plus, Trash2 } from "lucide-react";

export const TherapistSchedulePage = () => {
  const [duration, setDuration] = useState(50);
  const [buffer, setBuffer] = useState(10);
  const [saved, setSaved] = useState(false);
  const [allOverrides, setAllOverrides] = useState([]);
  const [selectedTimings, setSelectedTimings] = useState({
    date: new Date().toISOString().split("T")[0],
    slots: ["09:00", "10:00", "14:00", "16:00", "18:00"],
  });

  // Weekly Recurring Schedule State (Monday through Sunday)
  const [weeklyMatrix, setWeeklyMatrix] = useState([
    { day: "monday", enabled: true, slots: ["09:00", "10:00", "11:00", "14:00", "15:00", "16:00", "18:00"] },
    { day: "tuesday", enabled: true, slots: ["09:00", "10:00", "11:00", "14:00", "15:00", "16:00", "18:00"] },
    { day: "wednesday", enabled: true, slots: ["09:00", "10:00", "11:00", "14:00", "15:00", "16:00", "18:00"] },
    { day: "thursday", enabled: true, slots: ["09:00", "10:00", "11:00", "14:00", "15:00", "16:00", "18:00"] },
    { day: "friday", enabled: true, slots: ["09:00", "10:00", "11:00", "14:00", "15:00", "16:00", "18:00"] },
    { day: "saturday", enabled: true, slots: ["09:00", "10:00", "11:00", "12:00"] },
    { day: "sunday", enabled: false, slots: [] },
  ]);

  // Load saved schedule on mount
  useEffect(() => {
    const fetchSchedule = async () => {
      // Check localStorage first
      const cached = localStorage.getItem("unfazed_therapist_schedule");
      if (cached) {
        try {
          const parsed = JSON.parse(cached);
          if (parsed.sessionDuration) setDuration(parsed.sessionDuration);
          if (parsed.bufferTime) setBuffer(parsed.bufferTime);
          if (parsed.weeklySchedule) setWeeklyMatrix(parsed.weeklySchedule);
          if (parsed.overrides) setAllOverrides(parsed.overrides);
        } catch (err) {}
      }

      try {
        const res = await axiosInstance.get("/scheduling/availability");
        if (res.data) {
          if (res.data.sessionDuration) setDuration(res.data.sessionDuration);
          if (res.data.bufferTime) setBuffer(res.data.bufferTime);
          if (res.data.weeklySchedule && res.data.weeklySchedule.length > 0) {
            setWeeklyMatrix(res.data.weeklySchedule);
          }
          if (res.data.overrides) setAllOverrides(res.data.overrides);
          localStorage.setItem("unfazed_therapist_schedule", JSON.stringify(res.data));
        }
      } catch (err) {
        console.log("Using cached/default schedule", err);
      }
    };

    fetchSchedule();
  }, []);

  const timeOptions = ["08:00", "09:00", "10:00", "11:00", "12:00", "14:00", "15:00", "16:00", "17:00", "18:00", "19:00", "20:00"];

  const toggleDaySlot = (dayName, time) => {
    setWeeklyMatrix((prev) =>
      prev.map((item) => {
        if (item.day === dayName) {
          const hasTime = item.slots.includes(time);
          const updatedSlots = hasTime
            ? item.slots.filter((t) => t !== time)
            : [...item.slots, time].sort();
          return { ...item, slots: updatedSlots };
        }
        return item;
      })
    );
  };

  const toggleDayEnabled = (dayName) => {
    setWeeklyMatrix((prev) =>
      prev.map((item) => (item.day === dayName ? { ...item, enabled: !item.enabled } : item))
    );
  };

  const handleSaveSchedule = async () => {
    let updatedOverrides = [...allOverrides];
    if (selectedTimings && selectedTimings.date) {
      const existingIdx = updatedOverrides.findIndex((o) => o.date === selectedTimings.date);
      const newOverride = {
        date: selectedTimings.date,
        customSlots: (selectedTimings.slots || []).map((s) => ({ startTime: s, endTime: s })),
      };
      if (existingIdx >= 0) {
        updatedOverrides[existingIdx] = newOverride;
      } else {
        updatedOverrides.push(newOverride);
      }
    }

    const payload = {
      sessionDuration: duration,
      bufferTime: buffer,
      weeklySchedule: weeklyMatrix,
      overrides: updatedOverrides,
    };

    setAllOverrides(updatedOverrides);
    localStorage.setItem("unfazed_therapist_schedule", JSON.stringify(payload));

    try {
      await axiosInstance.post("/scheduling/availability", payload);
    } catch (e) {
      console.log("Saved schedule state locally");
    }
    setSaved(true);
    setTimeout(() => setSaved(false), 2500);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 bg-white p-6 rounded-3xl border border-gray-100 shadow-sm">
        <div>
          <div className="flex items-center gap-2">
            <h1 className="text-2xl sm:text-3xl font-extrabold text-gray-900">Schedule & Multiple Timings Manager</h1>
            <span className="px-3 py-1 bg-teal-50 text-teal-800 text-xs font-bold rounded-full">
              Multi-Slot Enabled
            </span>
          </div>
          <p className="text-xs text-gray-500 mt-1">
            Configure multiple available time slots for any day or setup weekly recurring availability templates
          </p>
        </div>

        <button
          onClick={handleSaveSchedule}
          className="px-6 py-3 bg-teal-700 hover:bg-teal-800 text-white font-semibold text-xs rounded-xl shadow-lg shadow-teal-700/20 flex items-center gap-2 transition cursor-pointer shrink-0"
        >
          <Save className="w-4 h-4" />
          <span>{saved ? "All Schedules Saved!" : "Save Availability Settings"}</span>
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Left Column: Interactive Multi-Slot Date Picker (Therapist Mode) */}
        <div className="lg:col-span-7 space-y-6">
          <div className="flex items-center justify-between">
            <h3 className="font-bold text-gray-900 text-lg">1. Manage Timings for Specific Dates</h3>
            <span className="text-xs text-teal-700 font-semibold bg-teal-50 px-3 py-1 rounded-full">
              Therapist Multi-Select Mode
            </span>
          </div>

          <SlotPicker
            therapistId="66e01a9b4000000000000001"
            isMultiSelect={true}
            onSelectSlot={(data) => {
              if (data) {
                setSelectedTimings(data);
              }
            }}
          />
        </div>

        {/* Right Column: Weekly Recurring Schedule Matrix */}
        <div className="lg:col-span-5 space-y-6">
          {/* Duration & Buffer Settings */}
          <div className="bg-white p-6 rounded-3xl border border-gray-100 shadow-sm space-y-4">
            <h3 className="font-bold text-gray-900 text-base border-b border-gray-100 pb-3">
              Session & Buffer Parameters
            </h3>

            <div className="grid grid-cols-2 gap-3 text-xs">
              <div>
                <label className="block text-gray-700 font-semibold mb-1">Session Duration</label>
                <select
                  value={duration}
                  onChange={(e) => setDuration(Number(e.target.value))}
                  className="w-full p-2.5 bg-gray-50 border border-gray-200 rounded-xl font-bold"
                >
                  <option value={30}>30 Mins</option>
                  <option value={45}>45 Mins</option>
                  <option value={50}>50 Mins (Standard)</option>
                  <option value={60}>60 Mins (Couples)</option>
                </select>
              </div>

              <div>
                <label className="block text-gray-700 font-semibold mb-1">Buffer Between Sessions</label>
                <select
                  value={buffer}
                  onChange={(e) => setBuffer(Number(e.target.value))}
                  className="w-full p-2.5 bg-gray-50 border border-gray-200 rounded-xl font-bold"
                >
                  <option value={5}>5 Mins</option>
                  <option value={10}>10 Mins</option>
                  <option value={15}>15 Mins</option>
                </select>
              </div>
            </div>
          </div>

          {/* Weekly Recurring Multi-Slot Days Matrix */}
          <div className="bg-white p-6 rounded-3xl border border-gray-100 shadow-sm space-y-5">
            <div className="flex justify-between items-center border-b border-gray-100 pb-3">
              <div>
                <h3 className="font-bold text-gray-900 text-base">2. Weekly Recurring Days & Slots</h3>
                <p className="text-[11px] text-gray-500">Toggle multiple timings per day for weekly repeat</p>
              </div>
            </div>

            <div className="space-y-4 text-xs">
              {weeklyMatrix.map((item) => (
                <div
                  key={item.day}
                  className={`p-3.5 rounded-2xl border transition ${
                    item.enabled ? "bg-gray-50/70 border-gray-200" : "bg-gray-100/60 border-gray-100 opacity-60"
                  }`}
                >
                  <div className="flex items-center justify-between mb-2">
                    <label className="flex items-center gap-2 cursor-pointer">
                      <input
                        type="checkbox"
                        checked={item.enabled}
                        onChange={() => toggleDayEnabled(item.day)}
                        className="rounded text-teal-600 focus:ring-teal-500"
                      />
                      <span className="font-bold uppercase tracking-wider text-gray-900">{item.day}</span>
                    </label>

                    <span className="text-[10px] text-teal-700 font-semibold">
                      {item.enabled ? `${item.slots.length} timings active` : "Day Off"}
                    </span>
                  </div>

                  {item.enabled && (
                    <div className="flex flex-wrap gap-1.5 pt-1">
                      {timeOptions.map((t) => {
                        const isSelected = item.slots.includes(t);
                        return (
                          <button
                            key={t}
                            type="button"
                            onClick={() => toggleDaySlot(item.day, t)}
                            className={`px-2.5 py-1 rounded-lg text-[11px] font-semibold transition ${
                              isSelected
                                ? "bg-teal-700 text-white shadow-xs"
                                : "bg-white text-gray-600 border border-gray-200 hover:border-teal-500"
                            }`}
                          >
                            {t}
                          </button>
                        );
                      })}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TherapistSchedulePage;
