import React from "react";
import { useParams, Link } from "react-router-dom";
import { ArrowLeft, Clock, Share2, Heart } from "lucide-react";

export const BlogDetailPage = () => {
  const { slug } = useParams();

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-8">
      <Link to="/blog" className="inline-flex items-center gap-1 text-xs font-semibold text-teal-700 hover:underline">
        <ArrowLeft className="w-4 h-4" />
        <span>Back to All Articles</span>
      </Link>

      <div className="space-y-4">
        <span className="px-3 py-1 bg-teal-50 text-teal-800 text-xs font-semibold rounded-full uppercase tracking-wider">
          Clinical Guidance & Wellness
        </span>
        <h1 className="text-3xl sm:text-4xl font-extrabold text-gray-900 leading-tight">
          {slug ? slug.replace(/-/g, " ").toUpperCase() : "MENTAL WELLNESS GUIDE"}
        </h1>
        <div className="flex items-center gap-4 text-xs text-gray-500 pb-4 border-b border-gray-100">
          <span>By Clinical Team at Unfazed</span>
          <span>•</span>
          <span className="flex items-center gap-1"><Clock className="w-3.5 h-3.5" /> 6 Min Read</span>
          <span>•</span>
          <span>Published on Unfazed Journal</span>
        </div>
      </div>

      <div className="prose prose-teal max-w-none text-sm text-gray-700 space-y-4 leading-relaxed bg-white p-8 rounded-3xl border border-gray-100 shadow-sm">
        <p className="font-semibold text-gray-900 text-base">
          Mental health challenges are far more common than most people realize in India. Recognizing symptoms early is the single most effective step toward reclaiming peace of mind.
        </p>

        <h3 className="text-lg font-bold text-gray-900 pt-2">Key Takeaways & Cognitive Interventions</h3>
        <ul className="list-disc pl-5 space-y-2 text-xs">
          <li><strong>Identify Triggers:</strong> Keep a daily thought log noting situations that cause panic or anxiety spikes.</li>
          <li><strong>Practice 4-7-8 Breathing:</strong> Inhale for 4 seconds, hold for 7 seconds, exhale slowly for 8 seconds.</li>
          <li><strong>Set Professional Boundaries:</strong> Communicate limits respectfully without internalized guilt.</li>
        </ul>

        <div className="p-6 bg-teal-50 rounded-2xl border border-teal-100 space-y-2 mt-6">
          <h4 className="font-bold text-teal-950 text-sm">Ready to Speak with a Psychologist?</h4>
          <p className="text-xs text-teal-800">
            Book a confidential 1-on-1 online therapy session with certified psychologists today.
          </p>
          <Link
            to="/therapists"
            className="inline-block mt-2 px-5 py-2.5 bg-teal-700 hover:bg-teal-800 text-white font-semibold text-xs rounded-xl shadow-md"
          >
            Find a Therapist Now
          </Link>
        </div>
      </div>
    </div>
  );
};

export default BlogDetailPage;
