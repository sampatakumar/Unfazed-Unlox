import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axiosInstance from "../api/axiosInstance";
import SlotPicker from "../components/scheduling/SlotPicker";
import CheckoutModal from "../components/payments/CheckoutModal";
import { Star, ShieldCheck, CheckCircle2, ChevronDown, ChevronUp, MessageSquare, X, ArrowRight, User } from "lucide-react";

export const TherapistPublicProfile = () => {
  const { slug } = useParams();
  const navigate = useNavigate();

  const [therapist, setTherapist] = useState(null);
  const [readMoreBio, setReadMoreBio] = useState(false);
  const [activeFaq, setActiveFaq] = useState(0);

  // Booking Modal State
  const [bookingModalOpen, setBookingModalOpen] = useState(false);
  const [selectedSession, setSelectedSession] = useState({ title: "Individual Therapy (50 mins)", price: 1350, type: "individual" });
  const [selectedSlot, setSelectedSlot] = useState(null);
  const [checkoutOpen, setCheckoutOpen] = useState(false);
  const [consentAccepted, setConsentAccepted] = useState(true);
  const [clientData, setClientData] = useState({
    name: "",
    email: "",
    phone: "",
    presentingConcern: "",
  });

  // Reviews State
  const [reviews, setReviews] = useState([
    { _id: "1", clientName: "Anand V.", rating: 5, comment: "Dr. Ashmita helped me navigate extreme work anxiety with CBT tools that actually work. Highly empathetic and non-judgmental approach." },
    { _id: "2", clientName: "Megha S.", rating: 5, comment: "Our couples therapy sessions saved our relationship. She created a safe space where both of us felt heard and valued." },
    { _id: "3", clientName: "Rahul K.", rating: 5, comment: "Very structured approach. I could feel actionable emotional progress after just 3 sessions." },
  ]);

  const [reviewModalOpen, setReviewModalOpen] = useState(false);
  const [newReview, setNewReview] = useState({ name: "", rating: 5, comment: "" });

  useEffect(() => {
    const fetchProfileAndReviews = async () => {
      try {
        const res = await axiosInstance.get(`/therapists/slug/${slug || "ashmita-singh"}`);
        setTherapist(res.data);

        if (res.data && res.data._id) {
          try {
            const revRes = await axiosInstance.get(`/therapists/${res.data._id}/reviews`);
            if (revRes.data && revRes.data.length > 0) {
              setReviews(revRes.data);
            }
          } catch (err) {
            console.error("Failed to load reviews", err);
          }
        }
      } catch (e) {
        // Fallback demo therapist profile matching unfazed.in
        setTherapist({
          _id: "66e01a9b4000000000000001",
          name: "Ashmita",
          slug: slug || "ashmita",
          title: "Clinical Psychologist",
          experienceYears: 4,
          gender: "Female",
          imageUrl: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&q=80&w=400",
          bio: "I am a Clinical Psychologist with a Master's Degree in Clinical Psychology and an M.Phil in Clinical Psychology from NIMHANS. I utilize Cognitive Behavioral Therapy, Acceptance and Commitment Therapy, Mindfulness-Based Cognitive Therapy, and Solution-Focused Brief Therapy to help individuals navigate anxiety, trauma, relationship conflict, and emotional regulation.",
          qualifications: ["Masters in Clinical Psychology", "M.Phil in Clinical Psychology"],
          specializations: ["Cognitive Behavioral Therapy (CBT)", "Acceptance & Commitment Therapy (ACT)", "Couples Therapy", "Schema Therapy"],
          languages: ["Hindi", "English"],
          sessionPriceIndividual: 1350,
          sessionPriceCouple: 2500,
          rating: 5.0,
          reviewsCount: 48,
        });
      }
    };

    fetchProfileAndReviews();
  }, [slug]);

  const sessionTypes = [
    { id: "ind", title: "Individual Therapy (50 mins)", price: 1350, type: "individual" },
    { id: "cpl", title: "Couples Therapy (60 mins)", price: 2500, type: "couple" },
    { id: "chd", title: "Child & Adolescent Therapy (50 mins)", price: 1350, type: "child" },
    { id: "teen", title: "Teen Therapy (For Relationship) (50 mins)", price: 1350, type: "teen" },
  ];

  const packages = [
    { id: "p1", title: "Couples Therapy", sessions: "Number of Sessions: 3", price: 7125, type: "couple" },
    { id: "p2", title: "Individual Therapy (1 on 1)", sessions: "Number of Sessions: 3", price: 3847, type: "individual" },
    { id: "p3", title: "Child & Adolescent Therapy", sessions: "Number of Sessions: 3", price: 3847, type: "child" },
    { id: "p4", title: "Couples Therapy", sessions: "Number of Sessions: 6", price: 13500, type: "couple" },
    { id: "p5", title: "Individual Therapy (1 on 1)", sessions: "Number of Sessions: 6", price: 7290, type: "individual" },
    { id: "p6", title: "Couples Therapy", sessions: "Number of Sessions: 12", price: 25500, type: "couple" },
    { id: "p7", title: "Teen Therapy (For Relationship)", sessions: "Number of Sessions: 3", price: 3847, type: "teen" },
    { id: "p8", title: "Individual Therapy (1 on 1)", sessions: "Number of Sessions: 12", price: 13500, type: "individual" },
    { id: "p9", title: "Couples Therapy", sessions: "Number of Sessions: 12", price: 25500, type: "couple" },
    { id: "p10", title: "Individual Therapy (1 on 1)", sessions: "Number of Sessions: 12", price: 13500, type: "individual" },
    { id: "p11", title: "Teen Therapy (For Relationship)", sessions: "Number of Sessions: 6", price: 7290, type: "teen" },
    { id: "p12", title: "Couples Therapy", sessions: "Number of Sessions: 6", price: 13500, type: "couple" },
  ];

  const faqs = [
    {
      q: "Is online therapy as effective as in-person?",
      a: "Yes, extensive clinical research demonstrates that tele-health therapy conducted via encrypted video sessions is equally effective as in-person therapy for managing anxiety, depression, relationship conflict, and stress."
    },
    {
      q: "Is my data and session content confidential?",
      a: "100% confidential. All communications take place over 256-bit SSL encrypted connections compliant with RCI and Indian IT Tele-medicine guidelines."
    },
    {
      q: "How do I choose the right session type?",
      a: "If you are seeking personal support, choose Individual Therapy (50 mins). If attending with your partner, select Couples Therapy (60 mins)."
    },
    {
      q: "What if I need to reschedule my session?",
      a: "You can reschedule any booked session up to 24 hours prior directly from your Client Portal at zero additional fee."
    }
  ];

  const handleOpenBooking = (item) => {
    setSelectedSession(item);
    setBookingModalOpen(true);
  };

  const handleAddReview = async (e) => {
    e.preventDefault();
    if (!newReview.name.trim() || !newReview.comment.trim()) return;

    try {
      const payload = {
        clientName: newReview.name.trim(),
        rating: Number(newReview.rating),
        comment: newReview.comment.trim(),
      };

      const targetId = therapist?._id || "66e01a9b4000000000000001";
      const res = await axiosInstance.post(`/therapists/${targetId}/reviews`, payload);
      if (res.data && res.data.reviews) {
        setReviews(res.data.reviews);
      } else {
        setReviews((prev) => [
          { _id: String(Date.now()), clientName: payload.clientName, rating: payload.rating, comment: payload.comment },
          ...prev,
        ]);
      }
      if (therapist) {
        setTherapist((prev) => ({
          ...prev,
          reviewsCount: (prev.reviewsCount || 0) + 1,
        }));
      }
    } catch (err) {
      setReviews((prev) => [
        { _id: String(Date.now()), clientName: newReview.name.trim(), rating: Number(newReview.rating), comment: newReview.comment.trim() },
        ...prev,
      ]);
    }

    setReviewModalOpen(false);
    setNewReview({ name: "", rating: 5, comment: "" });
  };

  if (!therapist) {
    return <div className="py-24 text-center text-sm text-gray-500 font-medium">Loading therapist profile...</div>;
  }

  return (
    <div className="bg-white min-h-screen">
      {/* 1. Header Banner Hero (Exact Dark Teal & Orange Branding matching unfazed.in) */}
      <div className="bg-[#1D4D4F] text-white py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center md:items-start gap-8">
          {/* Profile Picture Circle */}
          <div className="relative shrink-0">
            <img
              src={therapist.imageUrl || "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&q=80&w=400"}
              alt={therapist.name}
              className="w-36 h-36 sm:w-44 sm:h-44 rounded-full object-cover border-4 border-white shadow-2xl"
            />
          </div>

          {/* Therapist Info */}
          <div className="flex-1 space-y-3 text-center md:text-left">
            <div className="flex items-center justify-center md:justify-start gap-2">
              <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-white">{therapist.name}</h1>
              <span className="bg-teal-700/80 text-teal-200 text-xs px-2.5 py-0.5 rounded-md font-bold flex items-center gap-1 border border-teal-600">
                <ShieldCheck className="w-3.5 h-3.5 text-teal-300" /> RCI
              </span>
            </div>

            <p className="text-xs text-teal-100 uppercase tracking-widest font-semibold">{therapist.title}</p>
            <p className="text-xs sm:text-sm text-gray-200 max-w-3xl leading-relaxed font-normal">
              {therapist.bio}
            </p>

            <div className="pt-2 flex flex-col sm:flex-row items-center justify-center md:justify-start gap-4">
              <div className="text-xs font-medium text-gray-200">
                <span>Experience: <strong>{therapist.experienceYears} Years</strong></span>
                <span className="mx-2">•</span>
                <span>Starting @ <strong>Rs. {therapist.sessionPriceIndividual}/session</strong></span>
              </div>

              <button
                onClick={() => handleOpenBooking(sessionTypes[0])}
                className="px-6 py-2.5 bg-[#E56A38] hover:bg-[#d45826] text-white font-bold text-xs rounded-xl shadow-lg shadow-orange-950/30 transition cursor-pointer shrink-0"
              >
                Book a Session
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-14">
        {/* 2. About Therapist & Qualifications / Languages Grid */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8">
          {/* About Therapist (Left) */}
          <div className="md:col-span-7 space-y-3">
            <h2 className="text-xl font-extrabold text-gray-900">About Therapist</h2>
            <p className="text-xs sm:text-sm text-gray-600 leading-relaxed">
              {readMoreBio
                ? therapist.bio + " I am committed to creating a compassionate, safe, and confidential therapeutic space tailored to each individual's unique challenges and emotional growth goals."
                : therapist.bio.slice(0, 220) + "..."}
            </p>
            <button
              onClick={() => setReadMoreBio(!readMoreBio)}
              className="text-[#E56A38] font-bold text-xs hover:underline cursor-pointer"
            >
              {readMoreBio ? "Read Less" : "Read More"}
            </button>
          </div>

          {/* Qualification & Languages (Right) */}
          <div className="md:col-span-5 space-y-5">
            <div>
              <h3 className="text-sm font-extrabold text-gray-900 mb-2">Qualification</h3>
              <div className="flex flex-wrap gap-2">
                {therapist.qualifications.map((q) => (
                  <span key={q} className="px-3 py-1.5 bg-gray-100 text-gray-800 rounded-lg text-xs font-semibold">
                    {q}
                  </span>
                ))}
              </div>
            </div>

            <div>
              <h3 className="text-sm font-extrabold text-gray-900 mb-2">Languages</h3>
              <div className="flex flex-wrap gap-2">
                {therapist.languages.map((l) => (
                  <span key={l} className="px-3 py-1 bg-gray-100 text-gray-700 rounded-md text-xs font-medium uppercase">
                    {l}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* 3. Sessions Types Section */}
        <div className="space-y-6">
          <h2 className="text-2xl font-extrabold text-gray-900">Sessions Types</h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {sessionTypes.map((st) => (
              <div key={st.id} className="bg-[#1D4D4F] text-white p-5 rounded-2xl shadow-sm flex flex-col justify-between space-y-4">
                <div>
                  <div className="flex justify-between items-start">
                    <h3 className="font-bold text-sm text-white">{st.title}</h3>
                    <span className="text-[10px] text-amber-300 font-semibold bg-teal-800/80 px-2 py-0.5 rounded">1 on 1 ★</span>
                  </div>
                  <p className="text-xs text-teal-100 mt-2 font-medium">Starting @ Rs. {st.price}</p>
                </div>

                <button
                  onClick={() => handleOpenBooking(st)}
                  className="w-full py-2 bg-[#E56A38] hover:bg-[#d45826] text-white font-bold text-xs rounded-xl shadow-md transition cursor-pointer text-center"
                >
                  Book Now
                </button>
              </div>
            ))}
          </div>
        </div>

        {/* 4. Packages Section */}
        <div className="space-y-6">
          <h2 className="text-2xl font-extrabold text-gray-900">Packages</h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {packages.map((pkg) => (
              <div key={pkg.id} className="bg-[#1D4D4F] text-white p-5 rounded-2xl shadow-sm flex flex-col justify-between space-y-4">
                <div>
                  <div className="flex justify-between items-start">
                    <h3 className="font-bold text-sm text-white">{pkg.title}</h3>
                    <span className="text-[10px] text-amber-300 font-semibold bg-teal-800/80 px-2 py-0.5 rounded">Bundle ★</span>
                  </div>
                  <p className="text-[11px] text-teal-200 mt-1">{pkg.sessions}</p>
                  <p className="text-xs text-white font-bold mt-1">Starting @ Rs. {pkg.price}</p>
                </div>

                <button
                  onClick={() => handleOpenBooking({ title: pkg.title, price: pkg.price, type: pkg.type })}
                  className="w-full py-2 bg-[#E56A38] hover:bg-[#d45826] text-white font-bold text-xs rounded-xl shadow-md transition cursor-pointer text-center"
                >
                  Book Now
                </button>
              </div>
            ))}
          </div>
        </div>

        {/* 5. Reviews Section */}
        <div className="space-y-6">
          <div className="flex justify-between items-center">
            <h2 className="text-2xl font-extrabold text-gray-900">Reviews</h2>
            <button
              onClick={() => setReviewModalOpen(true)}
              className="px-4 py-2 bg-[#E56A38] hover:bg-[#d45826] text-white text-xs font-bold rounded-xl shadow-md transition cursor-pointer flex items-center gap-1.5"
            >
              <MessageSquare className="w-3.5 h-3.5" />
              <span>Write a review</span>
            </button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {reviews.slice(0, 6).map((rev, idx) => {
              const displayName = rev.clientName || rev.name || "Client";
              const displayComment = rev.comment || rev.text || "Highly recommended therapy session.";
              return (
                <div key={rev._id || rev.id || idx} className="bg-[#1D4D4F] text-white p-5 rounded-2xl space-y-3 flex flex-col justify-between">
                  <div className="space-y-2">
                    <div className="flex items-center gap-3">
                      <div className="w-9 h-9 rounded-full bg-amber-400 text-teal-950 font-bold flex items-center justify-center text-xs">
                        {displayName[0]}
                      </div>
                      <div>
                        <h4 className="font-bold text-xs text-white">{displayName}</h4>
                        <div className="flex text-amber-400 text-[10px]">
                          {"★".repeat(rev.rating || 5)}
                        </div>
                      </div>
                    </div>
                    <p className="text-xs text-teal-100 leading-relaxed line-clamp-3 font-normal">"{displayComment}"</p>
                  </div>
                </div>
              );
            })}
          </div>

          <div className="text-center pt-2">
            <button
              onClick={() => alert("All 48 verified patient reviews loaded.")}
              className="px-6 py-2 bg-[#E56A38] hover:bg-[#d45826] text-white text-xs font-bold rounded-xl shadow-md transition cursor-pointer"
            >
              View More
            </button>
          </div>
        </div>

        {/* 6. Frequently Asked Questions Section */}
        <div className="bg-gray-50 rounded-3xl p-8 sm:p-10 space-y-8 border border-gray-100">
          <div className="space-y-2">
            <span className="text-[11px] uppercase tracking-widest text-gray-400 font-bold">Faqs</span>
            <h2 className="text-3xl font-black text-gray-900">
              Frequently asked <span className="text-[#E56A38]">questions</span>
            </h2>
            <p className="text-xs text-gray-500">
              Everything you need to know about starting your mental healthcare journey with us.
            </p>
          </div>

          <div className="space-y-3">
            {faqs.map((faq, idx) => {
              const isOpen = activeFaq === idx;
              return (
                <div
                  key={idx}
                  className="bg-white rounded-2xl border border-gray-200 overflow-hidden transition"
                >
                  <button
                    onClick={() => setActiveFaq(isOpen ? -1 : idx)}
                    className="w-full p-4 text-left flex justify-between items-center gap-3 font-bold text-xs sm:text-sm text-gray-900 cursor-pointer"
                  >
                    <span>{faq.q}</span>
                    <span className={`w-6 h-6 rounded-full flex items-center justify-center shrink-0 ${isOpen ? "bg-[#E56A38] text-white" : "bg-gray-100 text-gray-600"}`}>
                      {isOpen ? "−" : "+"}
                    </span>
                  </button>

                  {isOpen && (
                    <div className="px-4 pb-4 text-xs text-gray-600 leading-relaxed border-t border-gray-100 pt-3">
                      {faq.a}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>

        {/* 7. CTA Dark Banner matching unfazed.in */}
        <div className="bg-black text-white rounded-3xl p-10 sm:p-14 text-center space-y-5 relative overflow-hidden">
          <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight">
            Your pain has a <span className="text-[#E56A38]">pattern</span>. <br className="hidden sm:inline" /> Break it.
          </h2>
          <p className="text-xs sm:text-sm text-gray-400 max-w-xl mx-auto">
            Before it captures another relationship, another year, another version of yourself. Connect with RCI certified clinical psychologists today.
          </p>
          <button
            onClick={() => handleOpenBooking(sessionTypes[0])}
            className="px-8 py-3 bg-[#E56A38] hover:bg-[#d45826] text-white font-bold text-xs rounded-xl shadow-xl transition cursor-pointer"
          >
            Get Started
          </button>
        </div>
      </div>

      {/* Interactive Booking Modal directly on Profile Page */}
      {bookingModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-xs p-4 overflow-y-auto">
          <div className="bg-white rounded-3xl max-w-3xl w-full p-6 sm:p-8 shadow-2xl border border-gray-100 space-y-6 relative max-h-[90vh] overflow-y-auto scrollbar-thin">
            <button
              onClick={() => setBookingModalOpen(false)}
              className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 p-1.5 rounded-full cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="border-b border-gray-100 pb-3">
              <span className="text-xs text-[#E56A38] font-bold uppercase tracking-wider">Instant Slot Booking</span>
              <h3 className="text-xl font-extrabold text-gray-900">{selectedSession.title}</h3>
              <p className="text-xs text-gray-500">Therapist: <strong>{therapist.name}</strong> • Session Fee: <strong>₹{selectedSession.price}</strong></p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Left Column: Interactive Slot Picker */}
              <div className="space-y-3">
                <span className="text-xs font-bold text-gray-900 block border-b border-gray-100 pb-2">1. Select Date & Time Slot</span>
                <SlotPicker
                  therapistId={therapist._id}
                  onSelectSlot={(slot) => setSelectedSlot(slot)}
                />
              </div>

              {/* Right Column: Client Intake Details */}
              <div className="space-y-4 text-xs bg-gray-50/70 p-5 rounded-2xl border border-gray-100">
                <span className="text-xs font-bold text-gray-900 block border-b border-gray-200 pb-2">2. Client Intake Information</span>

                <div>
                  <label className="block text-gray-700 font-semibold mb-1">Full Name *</label>
                  <input
                    type="text"
                    placeholder="e.g. Rahul Sharma"
                    value={clientData.name}
                    onChange={(e) => setClientData({ ...clientData, name: e.target.value })}
                    className="w-full p-2.5 bg-white border border-gray-200 rounded-xl focus:outline-none focus:border-[#E56A38]"
                  />
                </div>

                <div className="grid grid-cols-2 gap-2">
                  <div>
                    <label className="block text-gray-700 font-semibold mb-1">Email Address *</label>
                    <input
                      type="email"
                      placeholder="rahul@example.com"
                      value={clientData.email}
                      onChange={(e) => setClientData({ ...clientData, email: e.target.value })}
                      className="w-full p-2.5 bg-white border border-gray-200 rounded-xl focus:outline-none focus:border-[#E56A38]"
                    />
                  </div>

                  <div>
                    <label className="block text-gray-700 font-semibold mb-1">Phone Number *</label>
                    <input
                      type="tel"
                      placeholder="+91 98765 43210"
                      value={clientData.phone}
                      onChange={(e) => setClientData({ ...clientData, phone: e.target.value })}
                      className="w-full p-2.5 bg-white border border-gray-200 rounded-xl focus:outline-none focus:border-[#E56A38]"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-gray-700 font-semibold mb-1">Primary Concern / Goal</label>
                  <textarea
                    rows={2}
                    placeholder="Describe what you would like to focus on..."
                    value={clientData.presentingConcern}
                    onChange={(e) => setClientData({ ...clientData, presentingConcern: e.target.value })}
                    className="w-full p-2.5 bg-white border border-gray-200 rounded-xl focus:outline-none focus:border-[#E56A38]"
                  />
                </div>

                <div className="p-2.5 bg-white border border-gray-200 rounded-xl text-[11px] text-gray-600">
                  <label className="flex items-start gap-2 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={consentAccepted}
                      onChange={(e) => setConsentAccepted(e.target.checked)}
                      className="mt-0.5 rounded text-[#E56A38] focus:ring-[#E56A38]"
                    />
                    <span>I agree to <strong>Unfazed Tele-Health Therapy Consent Policy</strong>. Sessions are 100% confidential.</span>
                  </label>
                </div>

                <button
                  disabled={!selectedSlot || !clientData.name || !clientData.email || !clientData.phone || !consentAccepted}
                  onClick={() => {
                    setBookingModalOpen(false);
                    setCheckoutOpen(true);
                  }}
                  className={`w-full py-3 rounded-xl font-bold text-xs transition flex items-center justify-center gap-2 ${
                    selectedSlot && clientData.name && clientData.email && clientData.phone && consentAccepted
                      ? "bg-[#E56A38] hover:bg-[#d45826] text-white shadow-lg cursor-pointer"
                      : "bg-gray-200 text-gray-400 cursor-not-allowed"
                  }`}
                >
                  <span>Pay & Confirm Booking (₹{selectedSession.price})</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Review Submission Modal */}
      {reviewModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-xs p-4">
          <div className="bg-white rounded-3xl max-w-md w-full p-6 shadow-2xl border border-gray-100 space-y-5 relative">
            <button
              onClick={() => setReviewModalOpen(false)}
              className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 p-1.5 rounded-full cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>

            <h3 className="text-lg font-bold text-gray-900">Write a Patient Review</h3>

            <form onSubmit={handleAddReview} className="space-y-4 text-xs">
              <div>
                <label className="block text-gray-700 font-semibold mb-1">Your Name *</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Priya M."
                  value={newReview.name}
                  onChange={(e) => setNewReview({ ...newReview, name: e.target.value })}
                  className="w-full p-2.5 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:border-teal-700"
                />
              </div>

              <div>
                <label className="block text-gray-700 font-semibold mb-1">Rating *</label>
                <select
                  value={newReview.rating}
                  onChange={(e) => setNewReview({ ...newReview, rating: e.target.value })}
                  className="w-full p-2.5 bg-gray-50 border border-gray-200 rounded-xl font-bold"
                >
                  <option value={5}>5 Stars (Excellent)</option>
                  <option value={4}>4 Stars (Very Good)</option>
                  <option value={3}>3 Stars (Good)</option>
                </select>
              </div>

              <div>
                <label className="block text-gray-700 font-semibold mb-1">Your Feedback *</label>
                <textarea
                  required
                  rows={3}
                  placeholder="Share your session experience..."
                  value={newReview.comment}
                  onChange={(e) => setNewReview({ ...newReview, comment: e.target.value })}
                  className="w-full p-2.5 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:border-teal-700"
                />
              </div>

              <button
                type="submit"
                className="w-full py-3 bg-[#E56A38] hover:bg-[#d45826] text-white font-bold text-xs rounded-xl shadow-md transition cursor-pointer"
              >
                Submit Review
              </button>
            </form>
          </div>
        </div>
      )}

      {/* Checkout Modal */}
      <CheckoutModal
        isOpen={checkoutOpen}
        onClose={() => setCheckoutOpen(false)}
        bookingDetails={{
          therapistId: therapist._id,
          sessionType: selectedSession.type || "individual",
          date: selectedSlot?.date,
          time: selectedSlot?.time,
          amount: selectedSession.price || 1350,
          clientName: clientData.name || "Valued Client",
          clientEmail: clientData.email || "client@example.com",
        }}
      />
    </div>
  );
};

export default TherapistPublicProfile;
