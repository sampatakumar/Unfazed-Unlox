import React from "react";
import { Link } from "react-router-dom";
import { Palette, Smile, ArrowRight, BookOpen } from "lucide-react";

export const ServiceChildPage = () => {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-12">
      <div className="bg-amber-900 text-white rounded-3xl p-10 space-y-4">
        <span className="px-3 py-1 bg-amber-800 text-amber-200 text-xs font-semibold rounded-full uppercase tracking-wider">
          Child & Adolescent Wellness
        </span>
        <h1 className="text-4xl font-extrabold">Child Therapy Services & Art-Based Care</h1>
        <p className="text-amber-100 text-sm max-w-2xl leading-relaxed">
          Transforming young lives through expressive art therapy, emotional regulation, mindfulness techniques, and parent consultation.
        </p>
        <Link
          to="/therapists"
          className="inline-flex items-center gap-2 px-6 py-3 bg-white text-amber-900 font-bold text-sm rounded-xl hover:bg-amber-50 transition"
        >
          <span>Find a Child Specialist</span>
          <ArrowRight className="w-4 h-4" />
        </Link>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        <div className="bg-white p-6 rounded-3xl border border-gray-100 shadow-sm space-y-3">
          <Palette className="w-6 h-6 text-amber-600" />
          <h3 className="font-bold text-gray-900 text-lg">Art & Play Therapy</h3>
          <p className="text-xs text-gray-600 leading-relaxed">
            Creative expression mediums allowing children to articulate emotions without verbal pressure.
          </p>
        </div>

        <div className="bg-white p-6 rounded-3xl border border-gray-100 shadow-sm space-y-3">
          <Smile className="w-6 h-6 text-amber-600" />
          <h3 className="font-bold text-gray-900 text-lg">ADHD & Academic Stress</h3>
          <p className="text-xs text-gray-600 leading-relaxed">
            Behavioral management strategies for attention challenges, exam anxiety, and peer interactions.
          </p>
        </div>

        <div className="bg-white p-6 rounded-3xl border border-gray-100 shadow-sm space-y-3">
          <BookOpen className="w-6 h-6 text-amber-600" />
          <h3 className="font-bold text-gray-900 text-lg">Parenting Consultation</h3>
          <p className="text-xs text-gray-600 leading-relaxed">
            Joint parent guidance sessions to foster healthy home boundaries and supportive emotional environments.
          </p>
        </div>
      </div>
    </div>
  );
};

export default ServiceChildPage;
