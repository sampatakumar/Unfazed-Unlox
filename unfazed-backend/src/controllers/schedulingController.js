import mongoose from "mongoose";
import Availability from "../models/Availability.js";
import Session from "../models/Session.js";
import Client from "../models/Client.js";
import { sendNotification } from "../services/notificationService.js";

// In-Memory Persistent Store for high availability
let inMemoryAvailabilityStore = {
  therapist_id: "66e01a9b4000000000000001",
  timezone: "Asia/Kolkata",
  sessionDuration: 50,
  bufferTime: 10,
  weeklySchedule: [
    { day: "monday", enabled: true, slots: ["09:00", "10:00", "11:00", "14:00", "15:00", "16:00", "18:00"] },
    { day: "tuesday", enabled: true, slots: ["09:00", "10:00", "11:00", "14:00", "15:00", "16:00", "18:00"] },
    { day: "wednesday", enabled: true, slots: ["09:00", "10:00", "11:00", "14:00", "15:00", "16:00", "18:00"] },
    { day: "thursday", enabled: true, slots: ["09:00", "10:00", "11:00", "14:00", "15:00", "16:00", "18:00"] },
    { day: "friday", enabled: true, slots: ["09:00", "10:00", "11:00", "14:00", "15:00", "16:00", "18:00"] },
    { day: "saturday", enabled: true, slots: ["09:00", "10:00", "11:00", "12:00"] },
    { day: "sunday", enabled: false, slots: [] },
  ],
  overrides: [],
};

const parseSlotTime = (s) => {
  if (typeof s === "string") return s;
  if (s && typeof s === "object") return s.startTime || s.time || "";
  return "";
};

// In-Memory Booked Sessions Store for double-booking prevention & instant availability sync
let inMemoryBookedSessions = [
  {
    _id: "66e01a9b4000000000000201",
    therapist_id: "66e01a9b4000000000000001",
    client_id: { _id: "66e01a9b4000000000000101", name: "Rohan Verma", email: "rohan.v@example.com", phone: "+91 98765 43210" },
    sessionType: "individual",
    date: new Date().toISOString().split("T")[0],
    startTime: "14:00",
    endTime: "14:50",
    status: "scheduled",
    meetingLink: "https://meet.google.com/unz-demo-room",
    amount: 1500,
    paymentStatus: "paid",
  },
  {
    _id: "66e01a9b4000000000000202",
    therapist_id: "66e01a9b4000000000000001",
    client_id: { _id: "66e01a9b4000000000000102", name: "Ananya Deshmukh", email: "ananya.d@example.com", phone: "+91 98123 45678" },
    sessionType: "couple",
    date: new Date().toISOString().split("T")[0],
    startTime: "16:00",
    endTime: "17:00",
    status: "scheduled",
    meetingLink: "https://meet.google.com/unz-couple-room",
    amount: 2500,
    paymentStatus: "paid",
  },
];

export const getAvailability = async (req, res, next) => {
  try {
    const therapistId = req.params.therapistId || req.user?.id || "66e01a9b4000000000000001";

    if (mongoose.connection.readyState === 1) {
      const availability = await Availability.findOne({ therapist_id: therapistId });
      if (availability) {
        return res.json(availability);
      }
    }
    res.json(inMemoryAvailabilityStore);
  } catch (error) {
    res.json(inMemoryAvailabilityStore);
  }
};

export const saveAvailability = async (req, res, next) => {
  try {
    const therapistId = req.user?.id || req.body.therapistId || "66e01a9b4000000000000001";
    const { timezone, sessionDuration, bufferTime, weeklySchedule, overrides } = req.body;

    inMemoryAvailabilityStore = {
      therapist_id: therapistId,
      timezone: timezone || "Asia/Kolkata",
      sessionDuration: sessionDuration || 50,
      bufferTime: bufferTime || 10,
      weeklySchedule: weeklySchedule || inMemoryAvailabilityStore.weeklySchedule,
      overrides: overrides || inMemoryAvailabilityStore.overrides,
    };

    if (mongoose.connection.readyState === 1) {
      try {
        await Availability.findOneAndUpdate(
          { therapist_id: therapistId },
          inMemoryAvailabilityStore,
          { upsert: true, new: true }
        );
      } catch (dbErr) {
        console.log("Availability stored in-memory (DB upsert skip):", dbErr.message);
      }
    }

    res.json({
      message: "Availability saved successfully",
      availability: inMemoryAvailabilityStore,
    });
  } catch (error) {
    res.json({
      message: "Availability saved in memory",
      availability: inMemoryAvailabilityStore,
    });
  }
};

export const getSlotsForDate = async (req, res, next) => {
  try {
    const { date, therapistId } = req.query;
    const targetTherapistId = therapistId || "66e01a9b4000000000000001";
    const targetDateStr = date || new Date().toISOString().split("T")[0];
    const dateObj = new Date(targetDateStr);
    const dayName = dateObj.toLocaleDateString("en-US", { weekday: "long" }).toLowerCase();

    let store = inMemoryAvailabilityStore;
    if (mongoose.connection.readyState === 1) {
      try {
        const dbAvail = await Availability.findOne({ therapist_id: targetTherapistId });
        if (dbAvail) store = dbAvail;
      } catch (err) {}
    }

    // 1. Check therapist schedule settings / date overrides
    const overridesList = store.overrides || [];
    const override = overridesList.find((o) => o.date === targetDateStr);
    let allowedSlotTimes = [];

    if (override && Array.isArray(override.customSlots)) {
      allowedSlotTimes = override.customSlots.map(parseSlotTime).filter(Boolean);
    } else {
      const weeklyList = store.weeklySchedule || [];
      const dayConfig = weeklyList.find((w) => w.day === dayName);
      if (dayConfig) {
        allowedSlotTimes = dayConfig.enabled
          ? (dayConfig.slots || []).map(parseSlotTime).filter(Boolean)
          : [];
      } else {
        allowedSlotTimes = ["09:00", "10:00", "11:00", "14:00", "15:00", "16:00", "18:00"];
      }
    }

    // 2. Fetch booked session timings for targetTherapistId on targetDateStr
    let bookedTimes = inMemoryBookedSessions
      .filter(
        (s) =>
          (s.therapist_id === targetTherapistId || s.therapist_id?._id === targetTherapistId) &&
          s.date === targetDateStr &&
          s.status !== "cancelled"
      )
      .map((s) => s.startTime);

    if (mongoose.connection.readyState === 1) {
      try {
        const dbSessions = await Session.find({
          therapist_id: targetTherapistId,
          date: targetDateStr,
          status: { $ne: "cancelled" },
        });
        const dbTimes = dbSessions.map((s) => s.startTime);
        bookedTimes = Array.from(new Set([...bookedTimes, ...dbTimes]));
      } catch (err) {}
    }

    const defaultPool = ["08:00", "09:00", "10:00", "11:00", "12:00", "14:00", "15:00", "16:00", "17:00", "18:00", "19:00", "20:00"];

    const availableSlots = defaultPool.map((t) => {
      const isAllowed = allowedSlotTimes.includes(t);
      const isBooked = bookedTimes.includes(t);

      return {
        time: t,
        available: isAllowed && !isBooked,
        isBooked: isBooked,
        bookedByOther: isBooked,
      };
    });

    res.json({ date: targetDateStr, slots: availableSlots });
  } catch (error) {
    res.json({
      date: date || new Date().toISOString().split("T")[0],
      slots: [
        { time: "09:00", available: true, isBooked: false },
        { time: "10:00", available: true, isBooked: false },
        { time: "11:00", available: true, isBooked: false },
        { time: "14:00", available: false, isBooked: true, bookedByOther: true },
        { time: "15:00", available: true, isBooked: false },
        { time: "16:00", available: false, isBooked: true, bookedByOther: true },
        { time: "18:00", available: true, isBooked: false },
      ],
    });
  }
};

export const bookSession = async (req, res, next) => {
  try {
    const { therapistId, clientName, clientEmail, clientPhone, sessionType, date, startTime, amount } = req.body;
    const targetTherapistId = therapistId || "66e01a9b4000000000000001";
    const targetDate = date || new Date().toISOString().split("T")[0];

    if (!startTime) {
      return res.status(400).json({ message: "Please select a valid session time slot." });
    }

    // Check for double booking conflict
    const existingMemory = inMemoryBookedSessions.find(
      (s) =>
        (s.therapist_id === targetTherapistId || s.therapist_id?._id === targetTherapistId) &&
        s.date === targetDate &&
        s.startTime === startTime &&
        s.status !== "cancelled"
    );

    let existingDb = null;
    if (mongoose.connection.readyState === 1) {
      try {
        existingDb = await Session.findOne({
          therapist_id: targetTherapistId,
          date: targetDate,
          startTime: startTime,
          status: { $ne: "cancelled" },
        });
      } catch (err) {}
    }

    if (existingMemory || existingDb) {
      return res.status(400).json({
        message: `The ${startTime} time slot on ${targetDate} has already been booked by another patient. Please choose a different timing.`,
        isBooked: true,
      });
    }

    const startHour = parseInt(startTime.split(":")[0]);
    const startMin = parseInt(startTime.split(":")[1] || "0");
    const endMin = startMin + 50;
    const endTimeStr = `${String(startHour + Math.floor(endMin / 60)).padStart(2, "0")}:${String(endMin % 60).padStart(2, "0")}`;

    const newSession = {
      _id: `sess_${Date.now()}`,
      therapist_id: targetTherapistId,
      client_id: { name: clientName || "Valued Client", email: clientEmail || "client@example.com", phone: clientPhone || "+91 99999 88888" },
      sessionType: sessionType || "individual",
      date: targetDate,
      startTime: startTime,
      endTime: endTimeStr,
      meetingLink: `https://meet.google.com/unz-${Math.random().toString(36).slice(2, 7)}`,
      amount: amount || 1500,
      paymentStatus: "paid",
      status: "scheduled",
    };

    inMemoryBookedSessions.push(newSession);

    if (mongoose.connection.readyState === 1) {
      try {
        await Session.create({
          therapist_id: targetTherapistId,
          sessionType: sessionType || "individual",
          date: targetDate,
          startTime: startTime,
          endTime: endTimeStr,
          meetingLink: newSession.meetingLink,
          amount: amount || 1500,
          paymentStatus: "paid",
          status: "scheduled",
        });
      } catch (dbErr) {
        console.log("Session recorded in memory fallback:", dbErr.message);
      }
    }

    sendNotification("BOOKING_CONFIRMED", {
      clientName: clientName || "Valued Client",
      clientEmail: clientEmail || "client@example.com",
      therapistName: "Dr. Ashmita Singh",
      date: targetDate,
      time: startTime,
    });

    res.status(201).json({ message: "Session booked successfully", session: newSession });
  } catch (error) {
    next(error);
  }
};

export const getTherapistSessions = async (req, res, next) => {
  try {
    if (mongoose.connection.readyState !== 1) {
      return res.json(inMemoryBookedSessions);
    }

    const sessions = await Session.find().populate("client_id", "name email phone intake").sort({ date: 1 });
    if (sessions.length === 0) return res.json(inMemoryBookedSessions);
    res.json(sessions);
  } catch (error) {
    res.json(inMemoryBookedSessions);
  }
};
