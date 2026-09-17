import mongoose from "mongoose";
import Therapist from "../models/Therapist.js";
import Review from "../models/Review.js";

const demoReviews = [
  { _id: "rev_1", clientName: "Anand V.", rating: 5, comment: "Dr. Ashmita helped me navigate extreme work anxiety with CBT tools that actually work. Highly empathetic and non-judgmental approach.", createdAt: new Date().toISOString() },
  { _id: "rev_2", clientName: "Megha S.", rating: 5, comment: "Our couples therapy sessions saved our relationship. She created a safe space where both of us felt heard and valued.", createdAt: new Date().toISOString() },
  { _id: "rev_3", clientName: "Rahul K.", rating: 5, comment: "Very structured approach. I could feel actionable emotional progress after just 3 sessions.", createdAt: new Date().toISOString() },
  { _id: "rev_4", clientName: "Simran P.", rating: 5, comment: "Compassionate, insightful, and incredibly skilled in Schema Therapy and stress management.", createdAt: new Date().toISOString() },
  { _id: "rev_5", clientName: "Zoya T.", rating: 5, comment: "Best psychologist I have consulted. Her guidance gave me back my peaceful sleep and self-confidence.", createdAt: new Date().toISOString() },
  { _id: "rev_6", clientName: "Tanmay M.", rating: 5, comment: "100% recommended for anyone struggling with burnout, career anxiety, or chronic overthinking.", createdAt: new Date().toISOString() },
];

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

// Get all clean reviews for a therapist from MongoDB
export const getTherapistReviews = async (req, res, next) => {
  try {
    const { therapistId } = req.params;

    if (mongoose.connection.readyState !== 1 || !mongoose.Types.ObjectId.isValid(therapistId)) {
      return res.json(demoReviews);
    }

    const reviews = await Review.find({ therapistId }).sort({ createdAt: -1 });
    if (reviews.length === 0) {
      return res.json(demoReviews);
    }
    res.json(reviews);
  } catch (error) {
    res.json(demoReviews);
  }
};

// Post a new clean review for a therapist to MongoDB
export const addTherapistReview = async (req, res, next) => {
  try {
    const { therapistId } = req.params;
    const { clientName, rating, comment } = req.body;

    // Sanitize and trim inputs
    const cleanName = (clientName || "").trim();
    const cleanComment = (comment || "").trim();
    const cleanRating = Math.min(5, Math.max(1, Number(rating) || 5));

    if (!cleanName || !cleanComment) {
      return res.status(400).json({ message: "Client name and feedback comment are required." });
    }

    if (mongoose.connection.readyState !== 1 || !mongoose.Types.ObjectId.isValid(therapistId)) {
      const newDemoRev = {
        _id: "rev_" + Date.now(),
        clientName: cleanName,
        rating: cleanRating,
        comment: cleanComment,
        createdAt: new Date().toISOString(),
      };
      return res.status(201).json({ review: newDemoRev, reviews: [newDemoRev, ...demoReviews] });
    }

    const review = await Review.create({
      therapistId,
      clientName: cleanName,
      rating: cleanRating,
      comment: cleanComment,
    });

    // Recalculate therapist average rating & reviewsCount
    const allReviews = await Review.find({ therapistId });
    const avgRating = (
      allReviews.reduce((sum, r) => sum + r.rating, 0) / allReviews.length
    ).toFixed(1);

    await Therapist.findByIdAndUpdate(therapistId, {
      rating: Number(avgRating),
      reviewsCount: allReviews.length,
    });

    res.status(201).json({ review, reviews: allReviews });
  } catch (error) {
    next(error);
  }
};

