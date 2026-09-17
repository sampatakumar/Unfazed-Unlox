import React, { useState } from "react";
import { Mail, Phone, MapPin, Send, CheckCircle2 } from "lucide-react";

export const ContactPage = () => {
  const [submitted, setSubmitted] = useState(false);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-12">
      <div className="text-center max-w-2xl mx-auto space-y-3">
        <h1 className="text-3xl font-extrabold text-gray-900">Contact Unfazed Support</h1>
        <p className="text-sm text-gray-600">Have questions about bookings, therapy sessions, or platform features? We are here to help.</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
        <div className="lg:col-span-5 bg-teal-900 text-white rounded-3xl p-8 space-y-6">
          <h3 className="font-bold text-xl">Get in Touch</h3>
          <div className="space-y-4 text-xs text-teal-100">
            <div className="flex items-center gap-3">
              <Phone className="w-5 h-5 text-teal-400" />
              <span>+91 91940 75097</span>
            </div>
            <div className="flex items-center gap-3">
              <Mail className="w-5 h-5 text-teal-400" />
              <span>support@unfazed.in</span>
            </div>
            <div className="flex items-start gap-3">
              <MapPin className="w-5 h-5 text-teal-400 shrink-0" />
              <span>Hustlehub Tech Park, Sector 2, HSR Layout, Bengaluru, Karnataka 560102</span>
            </div>
          </div>
        </div>

        <div className="lg:col-span-7 bg-white p-8 rounded-3xl border border-gray-100 shadow-sm space-y-4">
          {submitted ? (
            <div className="py-8 text-center space-y-2 bg-emerald-50 rounded-2xl p-6 border border-emerald-200">
              <CheckCircle2 className="w-8 h-8 text-emerald-600 mx-auto" />
              <h4 className="font-bold text-gray-900">Message Received!</h4>
              <p className="text-xs text-gray-600">Our customer support team will reply within 4 hours.</p>
            </div>
          ) : (
            <form onSubmit={(e) => { e.preventDefault(); setSubmitted(true); }} className="space-y-3 text-xs">
              <div>
                <label className="block text-gray-700 font-semibold mb-1">Your Name</label>
                <input required type="text" className="w-full p-2.5 bg-gray-50 border border-gray-200 rounded-xl" />
              </div>
              <div>
                <label className="block text-gray-700 font-semibold mb-1">Email Address</label>
                <input required type="email" className="w-full p-2.5 bg-gray-50 border border-gray-200 rounded-xl" />
              </div>
              <div>
                <label className="block text-gray-700 font-semibold mb-1">Message</label>
                <textarea required rows={4} className="w-full p-2.5 bg-gray-50 border border-gray-200 rounded-xl" />
              </div>
              <button type="submit" className="w-full py-3 bg-teal-700 text-white font-semibold rounded-xl">
                Send Message
              </button>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};

export default ContactPage;
