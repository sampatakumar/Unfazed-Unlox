import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import axiosInstance from "../api/axiosInstance";
import { Heart, User, Mail, Lock, ShieldCheck, ArrowRight, Eye, EyeOff } from "lucide-react";

export const RegisterPage = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [title, setTitle] = useState("Licensed Clinical Psychologist");
  const [loading, setLoading] = useState(false);

  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await axiosInstance.post("/auth/register", {
        name,
        email,
        password,
        title,
      });
      login(res.data.therapist, res.data.token);
      navigate("/therapist/dashboard");
    } catch (err) {
      alert("Registration simulated for therapist: " + name);
      login(
        {
          id: "66e01a9b4000000000000001",
          name: name || "Dr. Therapist",
          email,
          slug: "dr-therapist",
          subscriptionTier: "starter",
        },
        "demo_token"
      );
      navigate("/therapist/dashboard");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-[75vh] flex items-center justify-center px-4 py-12">
      <div className="bg-white p-8 rounded-3xl border border-gray-100 shadow-xl max-w-md w-full space-y-6">
        <div className="text-center space-y-2">
          <div className="w-12 h-12 rounded-2xl bg-teal-700 text-white flex items-center justify-center mx-auto font-bold shadow-md">
            <Heart className="w-7 h-7 fill-current" />
          </div>
          <h2 className="text-2xl font-extrabold text-gray-900">Therapist Practice Onboarding</h2>
          <p className="text-xs text-gray-500">Get your branded link unfazed.in/your-name in minutes</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-3 text-xs">
          <div>
            <label className="block font-semibold text-gray-700 mb-1">Full Name *</label>
            <input
              type="text"
              required
              placeholder="e.g. Dr. Sanskruti Sharma"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full p-2.5 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:border-teal-600"
            />
          </div>

          <div>
            <label className="block font-semibold text-gray-700 mb-1">Professional Email *</label>
            <input
              type="email"
              required
              placeholder="therapist@domain.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full p-2.5 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:border-teal-600"
            />
          </div>

          <div>
            <label className="block font-semibold text-gray-700 mb-1">Password *</label>
            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full pl-3 pr-10 py-2.5 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:border-teal-600"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 focus:outline-none p-1"
                aria-label={showPassword ? "Hide password" : "Show password"}
              >
                {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
              </button>
            </div>
          </div>

          <div>
            <label className="block font-semibold text-gray-700 mb-1">Professional Designation</label>
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="w-full p-2.5 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:border-teal-600"
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full py-3.5 bg-teal-700 hover:bg-teal-800 text-white font-semibold text-sm rounded-xl shadow-lg shadow-teal-700/20 transition flex items-center justify-center gap-2 mt-2 cursor-pointer"
          >
            <span>{loading ? "Creating Account..." : "Create Practice Hub"}</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </form>

        <div className="text-center text-xs text-gray-500">
          Already have an account?{" "}
          <Link to="/auth/login" className="text-teal-700 font-bold hover:underline">
            Log In
          </Link>
        </div>
      </div>
    </div>
  );
};

export default RegisterPage;
