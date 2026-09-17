import mongoose from "mongoose";

const SessionNoteSchema = new mongoose.Schema(
  {
    session_id: { type: mongoose.Schema.Types.ObjectId, ref: "Session", required: true },
    therapist_id: { type: mongoose.Schema.Types.ObjectId, ref: "Therapist", required: true },
    client_id: { type: mongoose.Schema.Types.ObjectId, ref: "Client", required: true },
    type: { type: String, enum: ["private", "shared"], default: "private", required: true },
    templateFormat: { type: String, enum: ["freeform", "soap", "dap"], default: "soap" },
    soap: {
      subjective: { type: String, default: "" },
      objective: { type: String, default: "" },
      assessment: { type: String, default: "" },
      plan: { type: String, default: "" },
    },
    freeformContent: { type: String, default: "" },
  },
  { timestamps: true }
);

export default mongoose.model("SessionNote", SessionNoteSchema);
