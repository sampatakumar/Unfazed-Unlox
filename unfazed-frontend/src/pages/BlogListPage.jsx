import React, { useState } from "react";
import { Link } from "react-router-dom";
import { BookOpen, Clock, ChevronRight, Search } from "lucide-react";

export const BlogListPage = () => {
  const [searchTerm, setSearchTerm] = useState("");

  const articles = [
    {
      slug: "postpartum-depression-guide-new-mothers-india",
      title: "Postpartum Depression Guide for New Mothers in India",
      category: "Parenting & Maternal Health",
      readTime: "6 min read",
      snippet: "Understanding emotional swings, hormonal shifts, social pressure, and seeking compassionate support after childbirth.",
    },
    {
      slug: "toxic-relationship-signs-red-flags-recovery",
      title: "Toxic Relationship Signs: Red Flags & Recovery Steps",
      category: "Relationships",
      readTime: "8 min read",
      snippet: "Identifying subtle emotional manipulation, gaslighting, setting firm personal boundaries, and beginning the healing journey.",
    },
    {
      slug: "managing-in-law-stress-boundaries-indian-families",
      title: "Managing In-Law Stress & Setting Healthy Boundaries in Indian Families",
      category: "Family & Couples",
      readTime: "7 min read",
      snippet: "Practical clinical strategies for couples navigating joint-family dynamics, expectations, and respectful boundary setting.",
    },
    {
      slug: "generalized-anxiety-disorder-symptoms-management-india",
      title: "Generalized Anxiety Disorder: Symptoms & CBT Management",
      category: "Anxiety & Mental Health",
      readTime: "5 min read",
      snippet: "Recognizing early physical and cognitive symptoms of GAD and applying evidence-based cognitive restructuring techniques.",
    },
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-10">
      <div className="text-center max-w-2xl mx-auto space-y-3">
        <span className="px-3 py-1 bg-teal-50 text-teal-800 text-xs font-semibold rounded-full uppercase tracking-wider">
          Unfazed Mental Wellness Publication
        </span>
        <h1 className="text-3xl font-extrabold text-gray-900">Insights, Articles & Practical Therapy Tips</h1>
        <p className="text-sm text-gray-600">Expert psychological advice written by certified therapists to guide your everyday mental wellness.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {articles.map((art) => (
          <div key={art.slug} className="bg-white p-7 rounded-3xl border border-gray-100 shadow-sm space-y-4 hover:shadow-lg transition flex flex-col justify-between">
            <div className="space-y-3">
              <div className="flex items-center justify-between text-xs">
                <span className="px-2.5 py-1 bg-teal-50 text-teal-800 rounded-md font-semibold">{art.category}</span>
                <span className="text-gray-400 flex items-center gap-1"><Clock className="w-3.5 h-3.5" /> {art.readTime}</span>
              </div>
              <h3 className="text-xl font-bold text-gray-900 leading-snug">{art.title}</h3>
              <p className="text-xs text-gray-600 leading-relaxed">{art.snippet}</p>
            </div>

            <Link
              to={`/blog/Article/${art.slug}`}
              className="inline-flex items-center gap-1.5 text-xs font-bold text-teal-700 hover:text-teal-900 pt-2"
            >
              <span>Read Full Article</span>
              <ChevronRight className="w-4 h-4" />
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
};

export default BlogListPage;
