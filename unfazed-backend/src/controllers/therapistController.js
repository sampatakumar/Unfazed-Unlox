import mongoose from "mongoose";
import Therapist from "../models/Therapist.js";

const demoTherapists = [
  {
    _id: "66e01a9b4000000000000001",
    name: "Dr. Ashmita Singh",
    slug: "ashmita-singh",
    title: "Senior Clinical Psychologist (RCI Reg.)",
    experienceYears: 8,
    gender: "Female",
    bio: "Specializing in CBT, Schema Therapy, and Anxiety management with over 8 years of clinical experience.",
    qualifications: ["M.Phil Clinical Psychology", "Ph.D. Psychology"],
    specializations: ["Anxiety", "Depression", "CBT", "Burnout"],
    languages: ["English", "Hindi"],
    sessionPriceIndividual: 1500,
    sessionPriceCouple: 2500,
    discoveryCallPrice: 0,
    rating: 4.9,
    reviewsCount: 48,
    subscriptionTier: "pro",
  },
  {
    _id: "66e01a9b4000000000000002",
    name: "Sanskriti Sharma",
    slug: "sanskriti",
    title: "Counseling Psychologist & Relationship Expert",
    experienceYears: 6,
    gender: "Female",
    bio: "Warm, empathetic therapist guiding individuals and couples through grief, trauma, and communication blocks.",
    qualifications: ["M.Sc. Counseling Psychology"],
    specializations: ["Couple Therapy", "Relationship Issues", "Self-Esteem"],
    languages: ["English", "Hindi", "Hinglish"],
    sessionPriceIndividual: 1400,
    sessionPriceCouple: 2200,
    discoveryCallPrice: 0,
    rating: 4.8,
    reviewsCount: 32,
    subscriptionTier: "starter",
  },
  {
    _id: "66e01a9b4000000000000003",
    name: "Dileep Kumar",
    slug: "healwithdileep",
    title: "Child & Adolescent Specialist",
    experienceYears: 7,
    gender: "Male",
    bio: "Art-based therapy, mindfulness, and behavioral intervention for teens, young adults, and families.",
    qualifications: ["M.A. Applied Psychology", "Art Therapy Certified"],
    specializations: ["Child Therapy", "ADHD", "Academic Stress"],
    languages: ["English", "Hindi", "Malayalam"],
    sessionPriceIndividual: 1600,
    sessionPriceCouple: 2600,
    discoveryCallPrice: 0,
    rating: 4.95,
    reviewsCount: 54,
    subscriptionTier: "pro",
  },
];

// Get all public therapists for /therapists catalog
export const getAllTherapists = async (req, res, next) => {
  try {
    const { concern, language, gender } = req.query;

    if (mongoose.connection.readyState !== 1) {
      let filtered = [...demoTherapists];
      if (concern && concern !== "All") {
        filtered = filtered.filter((t) =>
          t.specializations.some((s) => s.toLowerCase().includes(concern.toLowerCase()))
        );
      }
      if (language && language !== "All") {
        filtered = filtered.filter((t) =>
          t.languages.some((l) => l.toLowerCase().includes(language.toLowerCase()))
        );
      }
      if (gender && gender !== "All") {
        filtered = filtered.filter((t) => t.gender.toLowerCase() === gender.toLowerCase());
      }
      return res.json(filtered);
    }

    const filter = {};
    if (concern && concern !== "All") {
      filter.specializations = { $in: [new RegExp(concern, "i")] };
    }
    if (language && language !== "All") {
      filter.languages = { $in: [new RegExp(language, "i")] };
    }
    if (gender && gender !== "All") {
      filter.gender = gender;
    }

    const therapists = await Therapist.find(filter).select("-password_hash");
    if (therapists.length === 0) {
      return res.json(demoTherapists);
    }
    res.json(therapists);
  } catch (error) {
    res.json(demoTherapists);
  }
};

// Get therapist by public branded slug (e.g. /:slug)
export const getTherapistBySlug = async (req, res, next) => {
  try {
    const { slug } = req.params;

    if (mongoose.connection.readyState !== 1) {
      const found = demoTherapists.find((t) => t.slug === slug) || demoTherapists[0];
      return res.json(found);
    }

    const therapist = await Therapist.findOne({ slug }).select("-password_hash");
    if (!therapist) {
      const found = demoTherapists.find((t) => t.slug === slug) || demoTherapists[0];
      return res.json(found);
    }
    res.json(therapist);
  } catch (error) {
    res.json(demoTherapists[0]);
  }
};

// Update therapist profile (authenticated)
export const updateTherapistProfile = async (req, res, next) => {
  try {
    const therapistId = req.user?.id || req.params.id;
    const updates = req.body;
    delete updates.password_hash;

    if (mongoose.connection.readyState !== 1) {
      return res.json({ ...demoTherapists[0], ...updates });
    }

    const therapist = await Therapist.findByIdAndUpdate(therapistId, updates, { new: true }).select("-password_hash");
    res.json(therapist);
  } catch (error) {
    next(error);
  }
};
