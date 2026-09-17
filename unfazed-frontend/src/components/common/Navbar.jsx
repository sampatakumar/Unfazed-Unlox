import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import { Heart, Globe, Menu, X, User, Calendar, LayoutDashboard } from "lucide-react";

export const Navbar = () => {
  const { user, country, setCountry, logout } = useAuth();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const navigate = useNavigate();

  return (
    <header className="sticky top-0 z-50 w-full border-b border-gray-100 bg-white/90 backdrop-blur-md">
      {/* Top Country/Currency Banner */}
      <div className="bg-teal-900 text-white text-xs py-1 px-4 flex justify-between items-center">
        <div className="flex items-center gap-2 max-w-7xl mx-auto w-full px-4 justify-between">
          <span className="truncate">
            🔒 100% Confidential & Secure Online Therapy Sessions | RCI Certified Psychologists
          </span>
          <div className="flex items-center gap-3 shrink-0">
            <button
              onClick={() => setCountry(country === "IN" ? "GLOBAL" : "IN")}
              className="flex items-center gap-1 hover:underline cursor-pointer"
            >
              <Globe className="w-3.5 h-3.5 text-teal-300" />
              <span>{country === "IN" ? "🇮🇳 INR (₹)" : "🌐 USD ($)"}</span>
            </button>
            <span className="hidden sm:inline">| Helpline: +91 91940 75097</span>
          </div>
        </div>
      </div>

      {/* Main Navbar */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between gap-4">
        {/* Brand Logo */}
        <Link to="/" className="flex items-center gap-2.5 font-bold text-2xl tracking-tight text-teal-800">
          <div className="w-10 h-10 rounded-xl bg-teal-700 text-white flex items-center justify-center shadow-md shadow-teal-700/20">
            <Heart className="w-6 h-6 fill-current" />
          </div>
          <span>UNFAZED</span>
        </Link>

        {/* Desktop Nav Links */}
        <nav className="hidden md:flex items-center gap-7 text-sm font-medium text-gray-700">
          <Link to="/therapists" className="hover:text-teal-700 transition">
            Find a Therapist
          </Link>
          <div className="relative group cursor-pointer py-2">
            <span className="hover:text-teal-700 flex items-center gap-1 transition">
              Services ▾
            </span>
            <div className="absolute top-full left-0 hidden group-hover:block w-56 bg-white rounded-xl shadow-xl border border-gray-100 p-2 z-50">
              <Link to="/services/individual-therapy" className="block px-3 py-2 text-sm text-gray-700 hover:bg-teal-50 hover:text-teal-800 rounded-lg">
                Individual Therapy (1-on-1)
              </Link>
              <Link to="/services/couple-therapy" className="block px-3 py-2 text-sm text-gray-700 hover:bg-teal-50 hover:text-teal-800 rounded-lg">
                Couple & Marriage Therapy
              </Link>
              <Link to="/services/children-therapy" className="block px-3 py-2 text-sm text-gray-700 hover:bg-teal-50 hover:text-teal-800 rounded-lg">
                Child & Teen Therapy
              </Link>
            </div>
          </div>
          <Link to="/specialties" className="hover:text-teal-700 transition">
            Specialties
          </Link>
          <Link to="/employee-experience-program" className="hover:text-teal-700 transition">
            Corporate (EEP)
          </Link>
          <Link to="/blog" className="hover:text-teal-700 transition">
            Blogs
          </Link>
          <Link to="/about" className="hover:text-teal-700 transition">
            About Us
          </Link>
        </nav>

        {/* CTA Buttons & Profile */}
        <div className="hidden md:flex items-center gap-3">
          {user ? (
            <div className="flex items-center gap-3">
              <Link
                to="/therapist/dashboard"
                className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-teal-800 bg-teal-50 hover:bg-teal-100 rounded-lg transition"
              >
                <LayoutDashboard className="w-4 h-4" />
                <span>Dashboard</span>
              </Link>
              <button
                onClick={() => {
                  logout();
                  navigate("/");
                }}
                className="text-xs text-gray-500 hover:text-red-600 underline"
              >
                Logout
              </button>
            </div>
          ) : (
            <Link
              to="/auth/login"
              className="text-sm font-medium text-gray-700 hover:text-teal-800 px-3 py-2"
            >
              Login
            </Link>
          )}

          <Link
            to="/therapists"
            className="px-5 py-2.5 bg-teal-700 hover:bg-teal-800 text-white font-medium text-sm rounded-xl shadow-md shadow-teal-700/20 transition transform hover:-translate-y-0.5"
          >
            Book a Session
          </Link>
        </div>

        {/* Mobile menu toggle */}
        <button
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="md:hidden text-gray-700 p-2 rounded-lg hover:bg-gray-100"
        >
          {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-white border-b border-gray-100 px-4 pt-2 pb-6 space-y-3">
          <Link to="/therapists" onClick={() => setMobileMenuOpen(false)} className="block py-2 text-gray-700 font-medium">
            Find a Therapist
          </Link>
          <Link to="/services/individual-therapy" onClick={() => setMobileMenuOpen(false)} className="block py-2 text-gray-600 pl-3">
            • Individual Therapy
          </Link>
          <Link to="/services/couple-therapy" onClick={() => setMobileMenuOpen(false)} className="block py-2 text-gray-600 pl-3">
            • Couple Therapy
          </Link>
          <Link to="/services/children-therapy" onClick={() => setMobileMenuOpen(false)} className="block py-2 text-gray-600 pl-3">
            • Child & Teen Therapy
          </Link>
          <Link to="/specialties" onClick={() => setMobileMenuOpen(false)} className="block py-2 text-gray-700 font-medium">
            Specialties
          </Link>
          <Link to="/employee-experience-program" onClick={() => setMobileMenuOpen(false)} className="block py-2 text-gray-700 font-medium">
            Corporate EEP
          </Link>
          <Link to="/blog" onClick={() => setMobileMenuOpen(false)} className="block py-2 text-gray-700 font-medium">
            Blogs
          </Link>
          <Link to="/about" onClick={() => setMobileMenuOpen(false)} className="block py-2 text-gray-700 font-medium">
            About Us
          </Link>

          <div className="pt-4 border-t border-gray-100 flex flex-col gap-2">
            <Link
              to="/therapists"
              onClick={() => setMobileMenuOpen(false)}
              className="w-full text-center py-2.5 bg-teal-700 text-white rounded-xl font-medium"
            >
              Book a Session
            </Link>
            <Link
              to="/auth/login"
              onClick={() => setMobileMenuOpen(false)}
              className="w-full text-center py-2 text-gray-700 font-medium border border-gray-200 rounded-xl"
            >
              Therapist Portal Login
            </Link>
          </div>
        </div>
      )}
    </header>
  );
};

export default Navbar;
