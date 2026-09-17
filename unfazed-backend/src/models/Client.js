import mongoose from "mongoose";

const ClientSchema = new mongoose.Schema(
  {
    name: { type: String, required: true, trim: true },
    email: { type: String, required: true, trim: true },
    phone: { type: String, required: true, trim: true },
    therapist_id: { type: mongoose.Schema.Types.ObjectId, ref: "Therapist", required: true },
    status: { type: String, enum: ["active", "inactive", "leads"], default: "active" },
    tags: [{ type: String }],
    lastSessionDate: { type: Date },
    intake: {
      age: { type: Number },
      gender: { type: String },
      presentingConcern: { type: String },
      medicalHistory: { type: String },
      emergencyContact: { type: String },
    },
    consent: {
      accepted: { type: Boolean, default: false },
      timestamp: { type: Date },
      ipAddress: { type: String },
    },
  },
  { timestamps: true }
);

export default mongoose.model("Client", ClientSchema);
