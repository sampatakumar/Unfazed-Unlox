import mongoose from "mongoose";

const TimeSlotSchema = new mongoose.Schema(
  {
    startTime: { type: String, required: true }, // e.g. "09:00"
    endTime: { type: String, required: true }, // e.g. "10:00"
  },
  { _id: false }
);

const WeeklyDayScheduleSchema = new mongoose.Schema(
  {
    day: {
      type: String,
      required: true,
      enum: ["monday", "tuesday", "wednesday", "thursday", "friday", "saturday", "sunday"],
    },
    enabled: { type: Boolean, default: true },
    slots: { type: Array, default: [] },
  },
  { _id: false }
);

const OverrideDateSchema = new mongoose.Schema(
  {
    date: { type: String, required: true }, // "YYYY-MM-DD"
    isBlocked: { type: Boolean, default: false },
    customSlots: { type: Array, default: [] },
  },
  { _id: false }
);

const AvailabilitySchema = new mongoose.Schema(
  {
    therapist_id: { type: mongoose.Schema.Types.ObjectId, ref: "Therapist", required: true, unique: true },
    timezone: { type: String, default: "Asia/Kolkata" },
    sessionDuration: { type: Number, default: 50 }, // minutes (30, 45, 50, 60, 90)
    bufferTime: { type: Number, default: 10 }, // minutes
    weeklySchedule: [WeeklyDayScheduleSchema],
    overrides: [OverrideDateSchema],
  },
  { timestamps: true }
);

export default mongoose.model("Availability", AvailabilitySchema);
