import React from "react";
import { Heart, ShieldCheck, Award, Users } from "lucide-react";

export const AboutPage = () => {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-12">
      <div className="text-center max-w-3xl mx-auto space-y-4">
        <span className="px-3 py-1 bg-teal-50 text-teal-800 text-xs font-semibold rounded-full uppercase tracking-wider">
          About Unfazed
        </span>
        <h1 className="text-4xl font-extrabold text-gray-900">Democratizing Mental Healthcare in India</h1>
        <p className="text-sm text-gray-600 leading-relaxed">
          Unfazed was founded with a single mission: to eliminate stigma around therapy and provide every individual with immediate, affordable, and 100% private access to certified psychologists.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        <div className="bg-white p-7 rounded-3xl border border-gray-100 shadow-sm space-y-3 text-center">
          <Heart className="w-8 h-8 text-teal-600 mx-auto" />
          <h3 className="font-bold text-gray-900 text-lg">Empathy & Care</h3>
          <p className="text-xs text-gray-600 leading-relaxed">Warm, judgment-free clinical environment for all individuals and couples.</p>
        </div>

        <div className="bg-white p-7 rounded-3xl border border-gray-100 shadow-sm space-y-3 text-center">
          <Award className="w-8 h-8 text-teal-600 mx-auto" />
          <h3 className="font-bold text-gray-900 text-lg">RCI Certified Professionals</h3>
          <p className="text-xs text-gray-600 leading-relaxed">Every practitioner undergoes rigorous credential verification and background screening.</p>
        </div>

        <div className="bg-white p-7 rounded-3xl border border-gray-100 shadow-sm space-y-3 text-center">
          <ShieldCheck className="w-8 h-8 text-teal-600 mx-auto" />
          <h3 className="font-bold text-gray-900 text-lg">Absolute Confidentiality</h3>
          <p className="text-xs text-gray-600 leading-relaxed">Strict adherence to clinical privacy standards and encrypted video rooms.</p>
        </div>
      </div>
    </div>
  );
};

export default AboutPage;
