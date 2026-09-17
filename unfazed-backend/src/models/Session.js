import mongoose from "mongoose";

const SessionSchema = new mongoose.Schema(
  {
    therapist_id: { type: mongoose.Schema.Types.ObjectId, ref: "Therapist", required: true },
    client_id: { type: mongoose.Schema.Types.ObjectId, ref: "Client", required: true },
    sessionType: {
      type: String,
      enum: ["discovery", "individual", "couple", "child"],
      default: "individual",
    },
    date: { type: String, required: true }, // "YYYY-MM-DD"
    startTime: { type: String, required: true }, // "10:00"
    endTime: { type: String, required: true }, // "10:50"
    status: {
      type: String,
      enum: ["scheduled", "completed", "cancelled", "no_show"],
      default: "scheduled",
    },
    meetingLink: { type: String, default: "" },
    notesCount: { type: Number, default: 0 },
    paymentStatus: { type: String, enum: ["pending", "paid", "refunded"], default: "paid" },
    amount: { type: Number, default: 1500 },
  },
  { timestamps: true }
);

export default mongoose.model("Session", SessionSchema);
