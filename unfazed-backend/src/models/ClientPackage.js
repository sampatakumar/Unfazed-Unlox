import mongoose from "mongoose";

const ClientPackageSchema = new mongoose.Schema(
  {
    client_id: { type: mongoose.Schema.Types.ObjectId, ref: "Client", required: true },
    package_id: { type: mongoose.Schema.Types.ObjectId, ref: "Package", required: true },
    totalSessions: { type: Number, required: true },
    remainingSessions: { type: Number, required: true },
    purchaseDate: { type: Date, default: Date.now },
    expiryDate: { type: Date, required: true },
    status: { type: String, enum: ["active", "exhausted", "expired"], default: "active" },
  },
  { timestamps: true }
);

export default mongoose.model("ClientPackage", ClientPackageSchema);
