import React from "react";
import { Link } from "react-router-dom";
import { ShieldCheck, Heart, ArrowRight, CheckCircle2 } from "lucide-react";

export const ServiceIndividualPage = () => {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-12">
      <div className="bg-teal-900 text-white rounded-3xl p-10 space-y-4">
        <span className="px-3 py-1 bg-teal-800 text-teal-200 text-xs font-semibold rounded-full uppercase tracking-wider">
          Individual Counselling
        </span>
        <h1 className="text-4xl font-extrabold">One-on-One Personalized Therapy Sessions</h1>
        <p className="text-teal-100 text-sm max-w-2xl leading-relaxed">
          Navigate anxiety, depression, career burnout, trauma, and personal growth with dedicated 50-minute sessions tailored specifically for your mental well-being.
        </p>
        <Link
          to="/therapists"
          className="inline-flex items-center gap-2 px-6 py-3 bg-white text-teal-900 font-bold text-sm rounded-xl hover:bg-teal-50 transition"
        >
          <span>Find an Individual Therapist</span>
          <ArrowRight className="w-4 h-4" />
        </Link>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        <div className="bg-white p-6 rounded-3xl border border-gray-100 shadow-sm space-y-3">
          <CheckCircle2 className="w-6 h-6 text-teal-600" />
          <h3 className="font-bold text-gray-900 text-lg">CBT & Evidence-Based</h3>
          <p className="text-xs text-gray-600 leading-relaxed">
            Interventions using Cognitive Behavioral Therapy, Acceptance & Commitment Therapy (ACT), and Schema Therapy.
          </p>
        </div>

        <div className="bg-white p-6 rounded-3xl border border-gray-100 shadow-sm space-y-3">
          <ShieldCheck className="w-6 h-6 text-teal-600" />
          <h3 className="font-bold text-gray-900 text-lg">100% Confidential</h3>
          <p className="text-xs text-gray-600 leading-relaxed">
            Encrypted video sessions and private clinical notes. Your data is strictly protected.
          </p>
        </div>

        <div className="bg-white p-6 rounded-3xl border border-gray-100 shadow-sm space-y-3">
          <Heart className="w-6 h-6 text-teal-600" />
          <h3 className="font-bold text-gray-900 text-lg">Empathetic Matching</h3>
          <p className="text-xs text-gray-600 leading-relaxed">
            Choose psychologists based on specialized experience, gender, and regional language preferences.
          </p>
        </div>
      </div>
    </div>
  );
};

export default ServiceIndividualPage;
