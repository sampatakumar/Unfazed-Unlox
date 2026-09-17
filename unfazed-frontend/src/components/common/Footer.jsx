import React from "react";
import { Link } from "react-router-dom";
import { Heart, ShieldCheck, Phone, Mail, MapPin } from "lucide-react";

export const Footer = () => {
  return (
    <footer className="bg-gray-900 text-gray-300 pt-16 pb-12 border-t border-gray-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10 mb-12">
          {/* Brand Col */}
          <div className="space-y-4 md:col-span-1">
            <Link to="/" className="flex items-center gap-2.5 font-bold text-2xl text-white">
              <div className="w-10 h-10 rounded-xl bg-teal-600 flex items-center justify-center">
                <Heart className="w-6 h-6 fill-current text-white" />
              </div>
              <span>UNFAZED</span>
            </Link>
            <p className="text-sm text-gray-400 leading-relaxed">
              India’s leading online therapy & mental counselling solution. Confidential, certified, and compassionate therapy for everyone.
            </p>
            <div className="flex items-center gap-2 text-xs text-teal-400 bg-gray-800/80 p-2.5 rounded-lg border border-gray-700/50">
              <ShieldCheck className="w-4 h-4 shrink-0" />
              <span>100% End-to-End Encrypted & Private</span>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-white font-semibold text-sm tracking-wider uppercase mb-4">Services</h4>
            <ul className="space-y-2.5 text-sm text-gray-400">
              <li><Link to="/services/individual-therapy" className="hover:text-teal-400 transition">Individual Therapy</Link></li>
              <li><Link to="/services/couple-therapy" className="hover:text-teal-400 transition">Couples & Marriage Therapy</Link></li>
              <li><Link to="/services/children-therapy" className="hover:text-teal-400 transition">Child & Adolescent Therapy</Link></li>
              <li><Link to="/specialties" className="hover:text-teal-400 transition">Anxiety & Depression Care</Link></li>
              <li><Link to="/employee-experience-program" className="hover:text-teal-400 transition">Corporate Wellness (EEP)</Link></li>
            </ul>
          </div>

          {/* Platform Links */}
          <div>
            <h4 className="text-white font-semibold text-sm tracking-wider uppercase mb-4">Platform & Support</h4>
            <ul className="space-y-2.5 text-sm text-gray-400">
              <li><Link to="/therapists" className="hover:text-teal-400 transition">Find a Therapist</Link></li>
              <li><Link to="/blog" className="hover:text-teal-400 transition">Mental Health Blogs</Link></li>
              <li><Link to="/about" className="hover:text-teal-400 transition">About Our Mission</Link></li>
              <li><Link to="/contact-us" className="hover:text-teal-400 transition">Contact Support</Link></li>
              <li><Link to="/auth/login" className="hover:text-teal-400 transition">Therapist Portal</Link></li>
            </ul>
          </div>

          {/* Contact & Helpline */}
          <div>
            <h4 className="text-white font-semibold text-sm tracking-wider uppercase mb-4">Contact Info</h4>
            <ul className="space-y-3 text-sm text-gray-400">
              <li className="flex items-center gap-2.5">
                <Phone className="w-4 h-4 text-teal-400 shrink-0" />
                <span>+91 91940 75097</span>
              </li>
              <li className="flex items-center gap-2.5">
                <Mail className="w-4 h-4 text-teal-400 shrink-0" />
                <span>support@unfazed.in</span>
              </li>
              <li className="flex items-start gap-2.5">
                <MapPin className="w-4 h-4 text-teal-400 shrink-0 mt-0.5" />
                <span>Hustlehub Tech Park, HSR Layout, Sector 2, Bengaluru, Karnataka 560102</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Emergency Crisis Disclaimer Banner */}
        <div className="bg-red-950/50 border border-red-900/50 rounded-2xl p-5 mb-10 text-xs text-red-200 leading-relaxed">
          <p className="font-semibold mb-1 text-red-400 uppercase tracking-wide">⚠️ Emergency Crisis Support Disclaimer</p>
          <p>
            Unfazed is an online therapy platform and does not offer emergency crisis medical intervention. If you are experiencing thoughts of self-harm or medical emergency, please immediately call a crisis helpline or visit your nearest hospital.
          </p>
          <div className="mt-2 flex flex-wrap gap-4 font-mono text-red-300">
            <span>Vandrevala Foundation: +91 9999 666 555</span>
            <span>NIMHANS: 080-46110007</span>
            <span>AASRA: +91 98204 66726</span>
          </div>
        </div>

        {/* Footer Bottom */}
        <div className="pt-8 border-t border-gray-800 flex flex-col md:flex-row justify-between items-center text-xs text-gray-500 gap-4">
          <p>© {new Date().getFullYear()} Unfazed Therapy Solution (Rivoquix Learning Pvt Ltd). All Rights Reserved.</p>
          <div className="flex gap-6">
            <Link to="/privacy-policy" className="hover:text-gray-400 transition">Privacy Policy</Link>
            <Link to="/terms-and-conditions" className="hover:text-gray-400 transition">Terms & Conditions</Link>
            <Link to="/refund-policy" className="hover:text-gray-400 transition">Refund & Cancellation Policy</Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
