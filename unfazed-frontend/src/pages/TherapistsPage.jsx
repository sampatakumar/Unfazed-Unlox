import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import axiosInstance from "../api/axiosInstance";
import { Star, Search, ShieldCheck, Filter, ArrowRight, CheckCircle2, HelpCircle } from "lucide-react";

export const TherapistsPage = () => {
  const navigate = useNavigate();

  const [concernFilter, setConcernFilter] = useState("Any concern");
  const [languageFilter, setLanguageFilter] = useState("Any language");
  const [genderFilter, setGenderFilter] = useState("Any");
  const [availabilityFilter, setAvailabilityFilter] = useState("Any time");
  const [maxPrice, setMaxPrice] = useState(2500);

  const fallbackTherapists = [
    {
      _id: "66e01a9b4000000000000001",
      name: "Ashmita",
      slug: "ashmita",
      title: "Teen Therapy (For Relationship)",
      experienceYears: 4,
      gender: "Female",
      languages: ["English", "Hindi"],
      sessionPriceIndividual: 1350,
      imageUrl: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&q=80&w=400",
      rating: 4.9,
      reviewsCount: 48,
    },
    {
      _id: "66e01a9b4000000000000002",
      name: "Samskriti",
      slug: "samskriti",
      title: "Discovery Call (20 mins)",
      experienceYears: 3,
      gender: "Female",
      languages: ["English", "Hindi"],
      sessionPriceIndividual: 1350,
      imageUrl: "https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&q=80&w=400",
      rating: 4.9,
      reviewsCount: 36,
    },
    {
      _id: "66e01a9b4000000000000003",
      name: "Aadya",
      slug: "aadya",
      title: "Individual Therapy (1 on 1)",
      experienceYears: 4,
      gender: "Female",
      languages: ["English", "Hindi"],
      sessionPriceIndividual: 1350,
      imageUrl: "https://images.unsplash.com/photo-1567532939604-b6b5b0db2604?auto=format&fit=crop&q=80&w=400",
      rating: 4.9,
      reviewsCount: 42,
    },
    {
      _id: "66e01a9b4000000000000004",
      name: "Simran",
      slug: "simran",
      title: "Discovery Call (20 mins)",
      experienceYears: 5,
      gender: "Female",
      languages: ["English", "Hindi", "Bengali"],
      sessionPriceIndividual: 1350,
      imageUrl: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&q=80&w=400",
      rating: 4.9,
      reviewsCount: 51,
    },
    {
      _id: "66e01a9b4000000000000005",
      name: "pavitra",
      slug: "pavitra",
      title: "Individual Therapy (1 on 1)",
      experienceYears: 6,
      gender: "Female",
      languages: ["English", "Hindi", "Tamil"],
      sessionPriceIndividual: 1350,
      imageUrl: "https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?auto=format&fit=crop&q=80&w=400",
      rating: 4.8,
      reviewsCount: 39,
    },
    {
      _id: "66e01a9b4000000000000006",
      name: "Vanshika",
      slug: "vanshika",
      title: "Couples Therapy",
      experienceYears: 5,
      gender: "Female",
      languages: ["English", "Hindi"],
      sessionPriceIndividual: 2500,
      imageUrl: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=400",
      rating: 4.9,
      reviewsCount: 44,
    },
    {
      _id: "66e01a9b4000000000000007",
      name: "Atul",
      slug: "atul",
      title: "Individual Therapy (1 on 1)",
      experienceYears: 6,
      gender: "Male",
      languages: ["English", "Hindi"],
      sessionPriceIndividual: 1350,
      imageUrl: "https://images.unsplash.com/photo-1622253692010-333f2da6031d?auto=format&fit=crop&q=80&w=400",
      rating: 4.8,
      reviewsCount: 33,
    },
    {
      _id: "66e01a9b4000000000000008",
      name: "Ms. Vani",
      slug: "vani",
      title: "Child & Adolescent Therapy",
      experienceYears: 4,
      gender: "Female",
      languages: ["English", "Hindi", "Telugu"],
      sessionPriceIndividual: 1350,
      imageUrl: "https://images.unsplash.com/photo-1594744803329-e58b31de8bf5?auto=format&fit=crop&q=80&w=400",
      rating: 4.9,
      reviewsCount: 29,
    },
  ];

  const concernsList = [
    "Any concern",
    "Anxiety & panic",
    "Depression",
    "Relationships",
    "Trauma & PTSD",
    "Burnout",
    "Grief & loss",
    "LGBTQ+ affirming",
    "Teen Therapy",
  ];

  const languagesList = ["Any language", "Hindi", "English", "Bengali", "Tamil", "Telugu"];
  const gendersList = ["Any", "Woman", "Man"];
  const availabilitiesList = ["Any time", "Mornings", "Evenings", "Weekends"];

  // Filter logic
  const filteredTherapists = fallbackTherapists.filter((t) => {
    if (genderFilter !== "Any") {
      if (genderFilter === "Woman" && t.gender !== "Female") return false;
      if (genderFilter === "Man" && t.gender !== "Male") return false;
    }
    if (languageFilter !== "Any language") {
      if (!t.languages.includes(languageFilter)) return false;
    }
    if (t.sessionPriceIndividual > maxPrice) return false;
    return true;
  });

  const handleTherapistClick = (slug) => {
    // DIRECT REQUIREMENT: Always navigate to profile page of that therapist
    navigate(`/therapist/${slug || "ashmita"}`);
  };

  return (
    <div className="bg-white min-h-screen space-y-12">
      {/* 1. Dark Top Hero Banner matching unfazed.in screenshot */}
      <section className="bg-black text-white py-14 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto text-center space-y-6">
          <div className="inline-block px-3.5 py-1 rounded-full bg-gray-900 border border-gray-800 text-xs font-bold uppercase tracking-wider text-[#E56A38]">
            4 VERIFIED THERAPISTS — ALL CERTIFIED
          </div>

          <h1 className="text-4xl sm:text-5xl font-black tracking-tight leading-tight">
            Find the therapist who <br />
            <span className="text-[#E56A38]">gets your pattern.</span>
          </h1>

          <p className="text-xs sm:text-sm text-gray-400 max-w-2xl mx-auto leading-relaxed">
            Not just any therapist — the one matched to your specific concern, language, and schedule. Take 60 seconds to find yours or browse below.
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 max-w-xl mx-auto pt-2">
            <div className="bg-gradient-to-r from-orange-600 to-[#E56A38] text-white p-4 rounded-2xl flex items-center justify-between cursor-pointer hover:opacity-95 transition shadow-lg">
              <div className="text-left">
                <span className="font-bold text-sm block">Find my match</span>
                <span className="text-[10px] text-orange-100">9 question quiz • 60 seconds</span>
              </div>
              <ArrowRight className="w-5 h-5 text-white shrink-0" />
            </div>

            <div className="bg-gray-900 border border-gray-800 text-white p-4 rounded-2xl flex items-center justify-between cursor-pointer hover:bg-gray-800 transition">
              <div className="text-left">
                <span className="font-bold text-sm block">Browse all therapists</span>
                <span className="text-[10px] text-gray-400">Filter by concern, language & more</span>
              </div>
              <Search className="w-5 h-5 text-gray-400 shrink-0" />
            </div>
          </div>

          <div className="flex flex-wrap justify-center items-center gap-6 text-[11px] text-gray-400 font-medium pt-4 border-t border-gray-900">
            <span>⭐ 4.9/5 rating</span>
            <span>🔒 100% confidential</span>
            <span>🔄 Switch therapist for free</span>
            <span>💳 From Rs 1350/session</span>
          </div>
        </div>
      </section>

      {/* 2. Black Stats Bar */}
      <section className="bg-[#111111] text-white py-6 border-b border-gray-900">
        <div className="max-w-6xl mx-auto px-4 grid grid-cols-3 sm:grid-cols-6 gap-4 text-center">
          <div>
            <div className="text-xl sm:text-2xl font-black text-amber-400">4.9★</div>
            <div className="text-[10px] text-gray-400 uppercase font-medium">Average Rating</div>
          </div>
          <div>
            <div className="text-xl sm:text-2xl font-black text-[#E56A38]">8,000+</div>
            <div className="text-[10px] text-gray-400 uppercase font-medium">Clients Helped</div>
          </div>
          <div>
            <div className="text-xl sm:text-2xl font-black text-white">60%</div>
            <div className="text-[10px] text-gray-400 uppercase font-medium">Stay 6+ Months</div>
          </div>
          <div>
            <div className="text-xl sm:text-2xl font-black text-emerald-400">100%</div>
            <div className="text-[10px] text-gray-400 uppercase font-medium">Certified Therapists</div>
          </div>
          <div>
            <div className="text-xl sm:text-2xl font-black text-[#E56A38]">₹299</div>
            <div className="text-[10px] text-gray-400 uppercase font-medium">Sessions From</div>
          </div>
          <div>
            <div className="text-xl sm:text-2xl font-black text-white">Free</div>
            <div className="text-[10px] text-gray-400 uppercase font-medium">Switches</div>
          </div>
        </div>
      </section>

      {/* 3. Main Catalog (Sidebar Filter + 3-Column Cards Grid) */}
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-6 space-y-8">
        <div className="text-center space-y-2">
          <span className="text-[11px] font-bold text-[#E56A38] uppercase tracking-wider">OUR THERAPISTS</span>
          <h2 className="text-3xl font-black text-gray-900">
            Meet Your <span className="text-[#E56A38]">Therapists</span>
          </h2>
          <p className="text-xs text-gray-500 max-w-xl mx-auto">
            Browse certified therapists across specializations and choose the therapist whose approach, experience, and availability fit your journey.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Left Sidebar Filters matching screenshot */}
          <div className="lg:col-span-4 bg-gray-50/90 p-5 rounded-3xl border border-gray-200/80 space-y-6">
            <div className="border-b border-gray-200 pb-3">
              <h3 className="font-extrabold text-sm text-gray-900">Filter by what matters most to you.</h3>
            </div>

            {/* Concern Filters */}
            <div className="space-y-2">
              <span className="text-[10px] font-bold text-gray-500 uppercase tracking-wider block">HOW DO YOU FEEL RIGHT NOW?</span>
              <div className="flex flex-wrap gap-1.5">
                {concernsList.map((c) => (
                  <button
                    key={c}
                    type="button"
                    onClick={() => setConcernFilter(c)}
                    className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition cursor-pointer ${
                      concernFilter === c
                        ? "bg-[#E56A38] text-white shadow-xs"
                        : "bg-white text-gray-700 border border-gray-200 hover:border-[#E56A38]"
                    }`}
                  >
                    {c}
                  </button>
                ))}
              </div>
            </div>

            {/* Preferred Language */}
            <div className="space-y-2">
              <span className="text-[10px] font-bold text-gray-500 uppercase tracking-wider block">PREFERRED LANGUAGE</span>
              <div className="flex flex-wrap gap-1.5">
                {languagesList.map((lang) => (
                  <button
                    key={lang}
                    type="button"
                    onClick={() => setLanguageFilter(lang)}
                    className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition cursor-pointer ${
                      languageFilter === lang
                        ? "bg-[#E56A38] text-white shadow-xs"
                        : "bg-white text-gray-700 border border-gray-200 hover:border-[#E56A38]"
                    }`}
                  >
                    {lang}
                  </button>
                ))}
              </div>
            </div>

            {/* Therapist Gender */}
            <div className="space-y-2">
              <span className="text-[10px] font-bold text-gray-500 uppercase tracking-wider block">THERAPIST GENDER</span>
              <div className="flex gap-2">
                {gendersList.map((g) => (
                  <button
                    key={g}
                    type="button"
                    onClick={() => setGenderFilter(g)}
                    className={`flex-1 py-1.5 rounded-lg text-xs font-semibold transition cursor-pointer text-center ${
                      genderFilter === g
                        ? "bg-[#E56A38] text-white shadow-xs"
                        : "bg-white text-gray-700 border border-gray-200 hover:border-[#E56A38]"
                    }`}
                  >
                    {g}
                  </button>
                ))}
              </div>
            </div>

            {/* Availability */}
            <div className="space-y-2">
              <span className="text-[10px] font-bold text-gray-500 uppercase tracking-wider block">AVAILABILITY</span>
              <div className="flex flex-wrap gap-1.5">
                {availabilitiesList.map((a) => (
                  <button
                    key={a}
                    type="button"
                    onClick={() => setAvailabilityFilter(a)}
                    className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition cursor-pointer ${
                      availabilityFilter === a
                        ? "bg-[#E56A38] text-white shadow-xs"
                        : "bg-white text-gray-700 border border-gray-200 hover:border-[#E56A38]"
                    }`}
                  >
                    {a}
                  </button>
                ))}
              </div>
            </div>

            {/* Max Price Slider */}
            <div className="space-y-2">
              <div className="flex justify-between text-xs font-bold text-gray-700">
                <span>MAX PRICE PER SESSION</span>
                <span className="text-[#E56A38]">₹{maxPrice}</span>
              </div>
              <input
                type="range"
                min="999"
                max="3000"
                step="100"
                value={maxPrice}
                onChange={(e) => setMaxPrice(Number(e.target.value))}
                className="w-full accent-[#E56A38] cursor-pointer"
              />
              <div className="flex justify-between text-[10px] text-gray-400 font-medium">
                <span>₹999</span>
                <span>₹3,000+</span>
              </div>
            </div>

            {/* Matching Quiz Sidebar Banner */}
            <div className="bg-amber-50 border border-amber-200 rounded-2xl p-4 space-y-2 text-center">
              <h4 className="font-extrabold text-gray-900 text-xs">Not sure who to pick?</h4>
              <p className="text-[11px] text-gray-600">Get matched with a therapist in under 2 minutes.</p>
              <button
                onClick={() => alert("Starting 60-second matching quiz...")}
                className="w-full py-2 bg-[#E56A38] hover:bg-[#d45826] text-white font-bold text-xs rounded-xl shadow-xs transition cursor-pointer"
              >
                Take the matching quiz →
              </button>
            </div>
          </div>

          {/* Right Therapists Cards Grid (3 Columns) */}
          <div className="lg:col-span-8 space-y-6">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredTherapists.map((t) => (
                <div
                  key={t._id || t.slug}
                  onClick={() => handleTherapistClick(t.slug)}
                  className="bg-white rounded-3xl border border-orange-200/80 shadow-md overflow-hidden flex flex-col justify-between cursor-pointer hover:shadow-2xl hover:border-[#E56A38] transition transform hover:-translate-y-1 group relative"
                >
                  {/* Photo Container with View Profile Badge */}
                  <div className="relative overflow-hidden bg-gradient-to-b from-orange-400 to-[#E56A38]">
                    <img
                      src={t.imageUrl}
                      alt={t.name}
                      className="w-full h-56 object-cover object-top transition duration-300 group-hover:scale-105"
                    />

                    {/* View Profile Badge top right */}
                    <div className="absolute top-3 right-3 bg-[#E56A38] text-white text-[10px] font-bold px-2.5 py-1 rounded-full shadow-md">
                      View Profile
                    </div>

                    {/* Bottom overlay with info */}
                    <div className="absolute bottom-0 inset-x-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent p-3 text-white">
                      <h3 className="font-extrabold text-base leading-tight text-white">{t.name}</h3>
                      <p className="text-[11px] text-orange-200 line-clamp-1 font-medium">{t.title}</p>
                      <div className="flex items-center justify-between text-[10px] text-gray-200 mt-1">
                        <span>{t.experienceYears} years experience</span>
                        <span className="text-amber-400 font-bold flex items-center gap-0.5">
                          {"★".repeat(5)} {t.rating}
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Bottom Button Action */}
                  <div className="p-3 bg-white text-center">
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        handleTherapistClick(t.slug);
                      }}
                      className="w-full py-2.5 bg-white border border-[#E56A38] text-[#E56A38] group-hover:bg-[#E56A38] group-hover:text-white font-bold text-xs rounded-xl shadow-xs transition cursor-pointer"
                    >
                      Book a Session
                    </button>
                  </div>
                </div>
              ))}
            </div>

            {/* Bottom Callout Banner */}
            <div className="p-4 bg-gray-50 border border-gray-200 rounded-2xl text-center text-xs text-gray-600">
              <span>Not sure who to pick? Take our 60-second matching quiz — tell us what's on your mind and we'll match you with 3 therapists for free.</span>
            </div>
          </div>
        </div>
      </div>

      {/* 4. Dark CTA Banner */}
      <section className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 pb-12">
        <div className="bg-black text-white rounded-3xl p-10 sm:p-14 text-center space-y-5">
          <h2 className="text-3xl sm:text-4xl font-black tracking-tight">
            Your pain has a <span className="text-[#E56A38]">pattern</span>. <br /> Break it.
          </h2>
          <p className="text-xs sm:text-sm text-gray-400 max-w-md mx-auto">
            Before it costs you another relationship. Another year. Another version of yourself you can't get back. Connect with RCI clinical psychologists today.
          </p>
          <button
            onClick={() => navigate("/therapist/ashmita")}
            className="px-8 py-3 bg-[#E56A38] hover:bg-[#d45826] text-white font-bold text-xs rounded-xl shadow-xl transition cursor-pointer"
          >
            Get Started
          </button>
        </div>
      </section>
    </div>
  );
};

export default TherapistsPage;
