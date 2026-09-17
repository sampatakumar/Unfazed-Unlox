import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import Therapist from "../models/Therapist.js";
import generateSlug from "../utils/generateSlug.js";

export const registerTherapist = async (req, res, next) => {
  try {
    const { name, email, password, title, specializations, languages } = req.body;

    if (!name || !email || !password) {
      return res.status(400).json({ error: "Name, email and password are required." });
    }

    const existing = await Therapist.findOne({ email });
    if (existing) {
      return res.status(400).json({ error: "Email is already registered." });
    }

    const salt = await bcrypt.genSalt(10);
    const password_hash = await bcrypt.hash(password, salt);
    let slug = generateSlug(name);

    // Uniqueness check for slug
    const slugExist = await Therapist.findOne({ slug });
    if (slugExist) {
      slug = `${slug}-${Date.now().toString().slice(-4)}`;
    }

    const therapist = await Therapist.create({
      name,
      email,
      password_hash,
      slug,
      title: title || "Licensed Clinical Psychologist",
      specializations: specializations || ["Anxiety", "Depression", "CBT"],
      languages: languages || ["English", "Hindi"],
    });

    const token = jwt.sign(
      { id: therapist._id, email: therapist.email, role: "therapist" },
      process.env.JWT_SECRET || "your_jwt_secret_key",
      { expiresIn: "7d" }
    );

    res.status(201).json({
      message: "Therapist registered successfully",
      token,
      therapist: {
        id: therapist._id,
        name: therapist.name,
        email: therapist.email,
        slug: therapist.slug,
        subscriptionTier: therapist.subscriptionTier,
      },
    });
  } catch (error) {
    next(error);
  }
};

export const loginTherapist = async (req, res, next) => {
  try {
    const { email, password } = req.body;

    const therapist = await Therapist.findOne({ email });
    if (!therapist) {
      return res.status(401).json({ error: "Invalid email or password" });
    }

    const match = await bcrypt.compare(password, therapist.password_hash);
    if (!match) {
      return res.status(401).json({ error: "Invalid email or password" });
    }

    const token = jwt.sign(
      { id: therapist._id, email: therapist.email, role: "therapist" },
      process.env.JWT_SECRET || "your_jwt_secret_key",
      { expiresIn: "7d" }
    );

    res.json({
      message: "Login successful",
      token,
      therapist: {
        id: therapist._id,
        name: therapist.name,
        email: therapist.email,
        slug: therapist.slug,
        subscriptionTier: therapist.subscriptionTier,
      },
    });
  } catch (error) {
    next(error);
  }
};

export const getMe = async (req, res, next) => {
  try {
    const therapistId = req.user?.id;
    const therapist = await Therapist.findById(therapistId).select("-password_hash");
    if (!therapist) {
      return res.status(404).json({ error: "Therapist not found" });
    }
    res.json(therapist);
  } catch (error) {
    next(error);
  }
};
