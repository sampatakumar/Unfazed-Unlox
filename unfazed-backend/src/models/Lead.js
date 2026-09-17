import mongoose from "mongoose";

const LeadSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    email: { type: String, required: true },
    companyName: { type: String, required: true },
    teamSize: { type: String, default: "50-200" },
    phone: { type: String, required: true },
    message: { type: String, default: "" },
    status: { type: String, enum: ["new", "contacted", "qualified", "closed"], default: "new" },
  },
  { timestamps: true }
);

export default mongoose.model("Lead", LeadSchema);
