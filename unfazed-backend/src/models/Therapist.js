import mongoose from "mongoose";

const TherapistSchema = new mongoose.Schema(
  {
    name: { type: String, required: true, trim: true },
    email: { type: String, required: true, unique: true, lowercase: true, trim: true },
    password_hash: { type: String, required: true },
    slug: { type: String, required: true, unique: true, lowercase: true, trim: true },
    title: { type: String, default: "Clinical Psychologist" },
    rciNumber: { type: String, default: "RCI-A10982" },
    experienceYears: { type: Number, default: 5 },
    gender: { type: String, enum: ["Female", "Male", "Other"], default: "Female" },
    bio: {
      type: String,
      default: "Empathetic, evidence-based therapist specializing in cognitive behavioral therapy, anxiety, and relationship dynamics.",
    },
    qualifications: [{ type: String }],
    specializations: [{ type: String }],
    languages: [{ type: String }],
    profileImage: { type: String, default: "" },
    sessionPriceIndividual: { type: Number, default: 1500 },
    sessionPriceCouple: { type: Number, default: 2500 },
    discoveryCallPrice: { type: Number, default: 0 },
    subscriptionTier: { type: String, enum: ["free", "starter", "pro", "enterprise"], default: "starter" },
    rating: { type: Number, default: 4.9 },
    reviewsCount: { type: Number, default: 34 },
    isVerified: { type: Boolean, default: true },
  },
  { timestamps: true }
);

export default mongoose.model("Therapist", TherapistSchema);
