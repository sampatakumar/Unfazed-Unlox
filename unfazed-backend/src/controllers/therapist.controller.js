import TherapistModel from "../models/therapist.model.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

const registerTherapist = async (req, res) => {
    try {
        const {
            name,
            slug,
            email,
            password,
            specialization,
            experience,
            languages,
            availability
        } = req.body;

        // Validate required fields
        if (!name || !slug || !email || !password) {
            return res.status(400).json({
                message: "Name, slug, email and password are required"
            });
        }

        // Validate JWT secret
        if (!process.env.JWT_SECRET) {
            console.error("JWT_SECRET is not configured");

            return res.status(500).json({
                message: "Server configuration error"
            });
        }

        // Normalize values
        const normalizedEmail = email.trim().toLowerCase();
        const normalizedSlug = slug.trim().toLowerCase();

        // Check if therapist already exists
        const existingTherapist = await TherapistModel.findOne({
            $or: [
                { email: normalizedEmail },
                { slug: normalizedSlug }
            ]
        });

        if (existingTherapist) {
            return res.status(409).json({
                message: "Therapist with this email or slug already exists"
            });
        }

        // Hash password
        const hashedPassword = await bcrypt.hash(password, 12);

        // Create therapist
        const therapist = await TherapistModel.create({
            name: name.trim(),
            slug: normalizedSlug,
            email: normalizedEmail,
            password: hashedPassword,
            specialization,
            experience,
            languages,
            availability
        });

        // Generate JWT
        const token = jwt.sign(
            {
                id: therapist._id.toString(),
                role: "therapist"
            },
            process.env.JWT_SECRET,
            {
                expiresIn: "1h"
            }
        );

        // Remove password from response
        const therapistResponse = therapist.toObject();
        delete therapistResponse.password;

        return res.status(201).json({
            message: "Therapist registered successfully",
            token,
            therapist: therapistResponse
        });

    } catch (error) {
        console.error("Register therapist error:", error);

        // MongoDB duplicate key error
        if (error.code === 11000) {
            return res.status(409).json({
                message: "Email or slug already exists"
            });
        }

        return res.status(500).json({
            message: "Internal server error"
        });
    }
};

const loginTherapist = async (req, res) => {
    try {
        const { email, password } = req.body;

        // Validate required fields
        if (!email || !password) {
            return res.status(400).json({
                message: "Email and password are required"
            });
        }

        // Normalize email
        const normalizedEmail = email.trim().toLowerCase();

        // Find therapist by email
        const therapist = await TherapistModel.findOne({ email: normalizedEmail });

        if (!therapist) {
            return res.status(401).json({
                message: "Invalid email or password"
            });
        }

        // Compare passwords
        const isPasswordValid = await bcrypt.compare(password, therapist.password);

        if (!isPasswordValid) {
            return res.status(401).json({
                message: "Invalid email or password"
            });
        }

        // Generate JWT
        const token = jwt.sign(
            {
                id: therapist._id.toString(),
                role: "therapist"
            },
            process.env.JWT_SECRET,
            {
                expiresIn: "1h"
            }
        );

        // Remove password from response
        const therapistResponse = therapist.toObject();
        delete therapistResponse.password;

        return res.status(200).json({
            message: "Login successful",
            token,
            therapist: therapistResponse
        });

    } catch (error) {
        console.error("Login therapist error:", error);
        return res.status(500).json({
            message: "Internal server error"
        });
    }
};

export default {
    registerTherapist,
    loginTherapist
};