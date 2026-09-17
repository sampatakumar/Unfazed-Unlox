import mongoose from "mongoose";

const SubscriptionTierConfigSchema = new mongoose.Schema(
  {
    tierKey: {
      type: String,
      required: true,
      unique: true,
      enum: ["free", "starter", "pro", "enterprise"],
      default: "starter",
    },
    tierName: { type: String, required: true },
    maxActiveClients: { type: Number, default: 25 },
    allowedNoteTemplates: [{ type: String }], // e.g. ["freeform", "soap", "dap"]
    analyticsDepth: {
      type: String,
      enum: ["basic", "advanced", "custom"],
      default: "basic",
    },
    hasCustomBrandedSlug: { type: Boolean, default: true },
    hasWhatsAppNotifications: { type: Boolean, default: false },
  },
  { timestamps: true }
);

export default mongoose.model("SubscriptionTierConfig", SubscriptionTierConfigSchema);
