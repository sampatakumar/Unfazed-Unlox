import React from "react";
import { Link } from "react-router-dom";
import { Users, Heart, ArrowRight, MessageCircle } from "lucide-react";

export const ServiceCouplePage = () => {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-12">
      <div className="bg-gradient-to-r from-rose-950 via-rose-900 to-teal-900 text-white rounded-3xl p-10 space-y-4">
        <span className="px-3 py-1 bg-rose-800 text-rose-200 text-xs font-semibold rounded-full uppercase tracking-wider">
          Relationship & Marriage Counselling
        </span>
        <h1 className="text-4xl font-extrabold">Couple Therapy Services & Confidential Dual Intake</h1>
        <p className="text-rose-100 text-sm max-w-2xl leading-relaxed">
          Rebuild intimacy, improve constructive communication, resolve in-law friction, and navigate relationship milestones with professional guidance.
        </p>
        <Link
          to="/therapists?concern=Couple"
          className="inline-flex items-center gap-2 px-6 py-3 bg-white text-rose-900 font-bold text-sm rounded-xl hover:bg-rose-50 transition"
        >
          <span>Book Couple Session (60 Mins)</span>
          <ArrowRight className="w-4 h-4" />
        </Link>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="bg-white p-8 rounded-3xl border border-gray-100 shadow-sm space-y-3">
          <MessageCircle className="w-6 h-6 text-rose-600" />
          <h3 className="font-bold text-gray-900 text-lg">24/7 Chat & Follow-Up Support</h3>
          <p className="text-xs text-gray-600 leading-relaxed">
            Stay connected with shared reflection prompts and exercises between formal therapy sessions.
          </p>
        </div>

        <div className="bg-white p-8 rounded-3xl border border-gray-100 shadow-sm space-y-3">
          <Heart className="w-6 h-6 text-rose-600" />
          <h3 className="font-bold text-gray-900 text-lg">Gottman & Emotionally Focused Therapy (EFT)</h3>
          <p className="text-xs text-gray-600 leading-relaxed">
            Evidence-based relationship frameworks designed to de-escalate recurring arguments and rebuild emotional safety.
          </p>
        </div>
      </div>
    </div>
  );
};

export default ServiceCouplePage;
