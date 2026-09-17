import mongoose from "mongoose";

const therapistSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    slug: {
        type: String,
        required: true,
        unique: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    specialization: {
        type: String,
        required: true
    },
    experience: {
        type: Number
    },
    languages: {
        type: [String]
    },
    availability: {
        type: [String]
    }
}, { timestamps: true });

const TherapistModel = mongoose.model("Therapist", therapistSchema);

export default TherapistModel;