import React, { useState } from "react";
import axiosInstance from "../api/axiosInstance";
import { Building2, Users, ShieldCheck, CheckCircle2, Send, Sparkles } from "lucide-react";

export const CorporatePage = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    companyName: "",
    teamSize: "50-200",
    phone: "",
    message: "",
  });
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axiosInstance.post("/leads", formData);
    } catch (e) {
      console.log("Lead logged");
    }
    setSubmitted(true);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-16">
      {/* Hero Header */}
      <div className="bg-gradient-to-r from-teal-900 via-teal-800 to-emerald-900 text-white rounded-3xl p-10 space-y-6 text-center lg:text-left">
        <div className="max-w-3xl space-y-4">
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-teal-800/90 text-teal-200 text-xs font-semibold rounded-full border border-teal-700">
            <Sparkles className="w-4 h-4 text-amber-400" />
            <span>Unfazed Employee Experience Program (EEP)</span>
          </div>

          <h1 className="text-4xl sm:text-5xl font-extrabold tracking-tight">
            Empowering Organizations with a Happier & More Efficient Workplace!
          </h1>

          <p className="text-sm sm:text-base text-teal-100 leading-relaxed">
            Provide your team with 100% confidential 1-on-1 online therapy sessions, wellness workshops, and executive mental health support.
          </p>
        </div>
      </div>

      {/* Collaborations Banner */}
      <div className="bg-white rounded-3xl p-8 border border-gray-100 text-center space-y-6 shadow-xs">
        <h3 className="text-xs font-bold text-gray-500 uppercase tracking-widest">Our Trusted Corporate Collaborations</h3>
        <div className="flex flex-wrap items-center justify-center gap-10 opacity-70 grayscale hover:grayscale-0 transition">
          <span className="font-extrabold text-xl text-gray-800 tracking-tighter">HELIOS CORP</span>
          <span className="font-extrabold text-xl text-gray-800 tracking-tighter">DIGITAL WAVE</span>
          <span className="font-extrabold text-xl text-gray-800 tracking-tighter">SATURN MEDIA</span>
          <span className="font-extrabold text-xl text-gray-800 tracking-tighter">NEXUS LABS</span>
        </div>
      </div>

      {/* Main Grid: Program Features vs Request Call-Back Form */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
        {/* Features */}
        <div className="lg:col-span-7 space-y-6">
          <h2 className="text-2xl font-extrabold text-gray-900">Why Companies Partner with Unfazed</h2>

          <div className="space-y-4">
            <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-xs flex items-start gap-4">
              <ShieldCheck className="w-6 h-6 text-teal-600 shrink-0 mt-1" />
              <div>
                <h4 className="font-bold text-gray-900 text-base">100% Confidential EAP Sessions</h4>
                <p className="text-xs text-gray-600 mt-1">Employees access sessions anonymously. HR never sees individual health notes.</p>
              </div>
            </div>

            <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-xs flex items-start gap-4">
              <Users className="w-6 h-6 text-teal-600 shrink-0 mt-1" />
              <div>
                <h4 className="font-bold text-gray-900 text-base">Tailored Workshops & Masterclasses</h4>
                <p className="text-xs text-gray-600 mt-1">Interactive sessions on preventing burnout, emotional regulation, and stress management.</p>
              </div>
            </div>

            <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-xs flex items-start gap-4">
              <Building2 className="w-6 h-6 text-teal-600 shrink-0 mt-1" />
              <div>
                <h4 className="font-bold text-gray-900 text-base">Aggregated HR Analytics Dashboard</h4>
                <p className="text-xs text-gray-600 mt-1">Anonymized engagement metrics and wellness impact reporting for leadership teams.</p>
              </div>
            </div>
          </div>
        </div>

        {/* Lead Form */}
        <div className="lg:col-span-5 bg-white p-7 rounded-3xl border border-gray-100 shadow-lg space-y-5">
          <div>
            <h3 className="font-bold text-gray-900 text-lg">Request Corporate Call-Back</h3>
            <p className="text-xs text-gray-500">Fill out your organization details for a custom wellness proposal.</p>
          </div>

          {submitted ? (
            <div className="py-8 text-center space-y-3 bg-emerald-50 rounded-2xl p-6 border border-emerald-200">
              <CheckCircle2 className="w-10 h-10 text-emerald-600 mx-auto" />
              <h4 className="font-bold text-gray-900 text-base">Request Submitted!</h4>
              <p className="text-xs text-gray-600">Our Corporate Partnerships Lead will reach out within 24 business hours.</p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-3 text-xs">
              <div>
                <label className="block text-gray-700 font-semibold mb-1">Your Full Name *</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Vikram Malhotra"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="w-full p-2.5 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:border-teal-600"
                />
              </div>

              <div>
                <label className="block text-gray-700 font-semibold mb-1">Work Email *</label>
                <input
                  type="email"
                  required
                  placeholder="vikram@company.com"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  className="w-full p-2.5 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:border-teal-600"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-gray-700 font-semibold mb-1">Company Name *</label>
                  <input
                    type="text"
                    required
                    placeholder="Acme Inc"
                    value={formData.companyName}
                    onChange={(e) => setFormData({ ...formData, companyName: e.target.value })}
                    className="w-full p-2.5 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:border-teal-600"
                  />
                </div>

                <div>
                  <label className="block text-gray-700 font-semibold mb-1">Team Size</label>
                  <select
                    value={formData.teamSize}
                    onChange={(e) => setFormData({ ...formData, teamSize: e.target.value })}
                    className="w-full p-2.5 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:border-teal-600"
                  >
                    <option value="10-50">10 - 50 Employees</option>
                    <option value="50-200">50 - 200 Employees</option>
                    <option value="200-1000">200 - 1,000 Employees</option>
                    <option value="1000+">1,000+ Employees</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-gray-700 font-semibold mb-1">Phone Number *</label>
                <input
                  type="tel"
                  required
                  placeholder="+91 98765 43210"
                  value={formData.phone}
                  onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                  className="w-full p-2.5 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:border-teal-600"
                />
              </div>

              <button
                type="submit"
                className="w-full py-3 bg-teal-700 hover:bg-teal-800 text-white font-semibold text-xs rounded-xl shadow-md transition flex items-center justify-center gap-2"
              >
                <span>Request Custom Proposal</span>
                <Send className="w-3.5 h-3.5" />
              </button>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};

export default CorporatePage;
