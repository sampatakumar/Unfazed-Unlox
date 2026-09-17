import mongoose from "mongoose";

const PackageSchema = new mongoose.Schema(
  {
    therapist_id: { type: mongoose.Schema.Types.ObjectId, ref: "Therapist" },
    title: { type: String, required: true }, // e.g. "3-Session Healing Bundle"
    sessionCount: { type: Number, required: true }, // 3, 6, 12
    priceTotal: { type: Number, required: true },
    pricePerSession: { type: Number, required: true },
    expiryDays: { type: Number, default: 90 },
    discountPercentage: { type: Number, default: 15 },
  },
  { timestamps: true }
);

export default mongoose.model("Package", PackageSchema);
