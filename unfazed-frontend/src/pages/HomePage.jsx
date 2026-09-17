import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axiosInstance from "../api/axiosInstance";
import { ShieldCheck, CheckCircle2 } from "lucide-react";

const FALLBACK_THERAPISTS = [
  {
    _id: "66e01a9b4000000000000001",
    name: "Ashmita",
    slug: "ashmita",
    title: "Clinical Psychologist (RCI Registered)",
    experienceYears: 4,
    sessionPriceIndividual: 1350,
    imageUrl: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&q=80&w=400",
    rating: 5.0,
    reviewsCount: 48,
  },
  {
    _id: "66e01a9b4000000000000002",
    name: "Dr. Neha Sharma",
    slug: "neha-sharma",
    title: "Senior Counseling Psychologist",
    experienceYears: 6,
    sessionPriceIndividual: 1350,
    imageUrl: "https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&q=80&w=400",
    rating: 4.9,
    reviewsCount: 36,
  },
  {
    _id: "66e01a9b4000000000000003",
    name: "Dr. Ritu Verma",
    slug: "ritu-verma",
    title: "Child & Adolescent Specialist",
    experienceYears: 7,
    sessionPriceIndividual: 1350,
    imageUrl: "https://images.unsplash.com/photo-1567532939604-b6b5b0db2604?auto=format&fit=crop&q=80&w=400",
    rating: 4.9,
    reviewsCount: 42,
  },
  {
    _id: "66e01a9b4000000000000004",
    name: "Dr. Amit Patel",
    slug: "amit-patel",
    title: "Couples & Marriage Counselor",
    experienceYears: 10,
    sessionPriceIndividual: 2500,
    imageUrl: "https://images.unsplash.com/photo-1622253692010-333f2da6031d?auto=format&fit=crop&q=80&w=400",
    rating: 4.8,
    reviewsCount: 52,
  },
];

export const HomePage = () => {
  const [therapists, setTherapists] = useState([]);
  const [activeFaq, setActiveFaq] = useState(0);

  useEffect(() => {
    const fetchTherapists = async () => {
      try {
        const res = await axiosInstance.get("/therapists");
        if (res.data && res.data.length > 0) {
          setTherapists(res.data);
        } else {
          setTherapists(FALLBACK_THERAPISTS);
        }
      } catch (e) {
        setTherapists(FALLBACK_THERAPISTS);
      }
    };
    fetchTherapists();
  }, []);

  const reviews = [
    {
      id: 1,
      name: "Anand V.",
      text: "Dr. Ashmita helped me navigate extreme work anxiety with CBT tools that actually work. Highly empathetic and non-judgmental.",
      rating: 5,
    },
    {
      id: 2,
      name: "Megha S.",
      text: "Our couples therapy sessions saved our relationship. She created a safe space where we both felt heard and valued.",
      rating: 5,
    },
    {
      id: 3,
      name: "Rahul K.",
      text: "Very structured approach. I could feel actionable emotional progress after just 3 sessions.",
      rating: 5,
    },
    {
      id: 4,
      name: "Simran P.",
      text: "Compassionate, insightful, and incredibly skilled in Schema Therapy and stress management.",
      rating: 5,
    },
  ];

  const faqs = [
    {
      q: "Is online therapy as effective as in-person?",
      a: "Yes, extensive clinical research demonstrates that tele-health therapy conducted via encrypted video sessions is equally effective as in-person therapy for managing anxiety, depression, relationship conflict, and stress.",
    },
    {
      q: "Is my data and session content confidential?",
      a: "100% confidential. All communications take place over 256-bit SSL encrypted connections compliant with RCI and Indian IT Tele-medicine guidelines.",
    },
    {
      q: "How do I choose the right session type?",
      a: "If you are seeking personal support, choose Individual Therapy (50 mins). If attending with your partner, select Couples Therapy (60 mins).",
    },
    {
      q: "What if I need to reschedule my session?",
      a: "You can reschedule any booked session up to 24 hours prior directly from your Client Portal at zero additional fee.",
    },
  ];

  return (
    <div className="bg-white min-h-screen space-y-16">
      {/* 1. Hero Section matching unfazed.in */}
      <section className="pt-12 pb-16 bg-gradient-to-b from-orange-50/40 via-white to-white">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
            {/* Left Content */}
            <div className="lg:col-span-7 space-y-6 text-center lg:text-left">
              <div className="inline-block px-3.5 py-1 rounded-full bg-orange-100/70 text-[#E56A38] text-xs font-bold uppercase tracking-wider">
                RE-DISCOVER YOURSELF AGAIN
              </div>

              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black text-gray-900 leading-tight tracking-tight">
                Mind the <span className="text-[#E56A38]">cycle</span>. <br />
                Before it creates another <span className="text-[#E56A38]">grief arc</span>.
              </h1>

              <p className="text-sm sm:text-base text-gray-600 max-w-xl mx-auto lg:mx-0 leading-relaxed">
                Therapy that doesn't just listen, but helps you rewrite your emotional story with RCI-registered clinical psychologists in a 100% private environment.
              </p>

              <div className="flex flex-col sm:flex-row gap-3.5 justify-center lg:justify-start pt-2">
                <Link
                  to="/therapists"
                  className="px-7 py-3.5 bg-[#E56A38] hover:bg-[#d45826] text-white font-bold text-sm rounded-xl shadow-lg shadow-orange-950/20 transition cursor-pointer"
                >
                  Book a Session
                </Link>
                <Link
                  to="/booking/individual/ashmita"
                  className="px-6 py-3.5 bg-white hover:bg-orange-50 text-[#E56A38] border border-[#E56A38] font-bold text-sm rounded-xl transition cursor-pointer"
                >
                  Take Assessment
                </Link>
              </div>
            </div>

            {/* Right Featured Specialist Photo Card */}
            <div className="lg:col-span-5 flex justify-center">
              <div className="relative bg-white rounded-3xl p-4 border border-gray-100 shadow-2xl max-w-sm w-full text-center space-y-4">
                <div className="relative rounded-2xl overflow-hidden">
                  <img
                    src="https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&q=80&w=400"
                    alt="Ashmita"
                    className="w-full h-80 object-cover rounded-2xl"
                  />
                  <div className="absolute top-3 right-3 bg-white/90 backdrop-blur-xs px-2.5 py-1 rounded-full text-[10px] font-bold text-teal-800 flex items-center gap-1 shadow-md">
                    <ShieldCheck className="w-3.5 h-3.5 text-teal-600" /> RCI Certified
                  </div>
                </div>

                <div className="space-y-1">
                  <h3 className="font-extrabold text-gray-900 text-lg">Ashmita</h3>
                  <p className="text-xs text-gray-500 font-medium">Clinical Psychologist • M.Phil NIMHANS</p>
                  <p className="text-xs font-bold text-[#E56A38] pt-1">Starting @ Rs. 1350/session</p>
                </div>

                <Link
                  to="/therapist/ashmita"
                  className="block w-full py-2.5 bg-[#E56A38] hover:bg-[#d45826] text-white font-bold text-xs rounded-xl shadow-md transition"
                >
                  View Full Profile
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 2. Black Stats Counter Bar */}
      <section className="bg-[#111111] text-white py-8">
        <div className="max-w-6xl mx-auto px-4 grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
          <div>
            <div className="text-2xl sm:text-3xl font-black text-[#E56A38]">500+</div>
            <div className="text-[11px] text-gray-400 font-medium mt-0.5 uppercase tracking-wider">Sessions Conducted</div>
          </div>
          <div>
            <div className="text-2xl sm:text-3xl font-black text-amber-400">4.9/5</div>
            <div className="text-[11px] text-gray-400 font-medium mt-0.5 uppercase tracking-wider">Patient Rating</div>
          </div>
          <div>
            <div className="text-2xl sm:text-3xl font-black text-[#E56A38]">2000+</div>
            <div className="text-[11px] text-gray-400 font-medium mt-0.5 uppercase tracking-wider">Lives Impacted</div>
          </div>
          <div>
            <div className="text-2xl sm:text-3xl font-black text-emerald-400">100%</div>
            <div className="text-[11px] text-gray-400 font-medium mt-0.5 uppercase tracking-wider">Confidential & RCI</div>
          </div>
        </div>
      </section>

      {/* 3. Why Unfazed Section */}
      <section className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-10 items-center">
          <div className="md:col-span-5 flex justify-center">
            <img
              src="https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&q=80&w=400"
              alt="Why Unfazed"
              className="w-72 h-80 object-cover rounded-3xl shadow-xl border border-gray-100"
            />
          </div>

          <div className="md:col-span-7 space-y-4 text-center md:text-left">
            <h2 className="text-3xl font-black text-gray-900">
              Why <span className="text-[#E56A38]">Unfazed</span>?
            </h2>

            <p className="text-xs sm:text-sm text-gray-600 leading-relaxed">
              We built Unfazed to bridge the gap between people seeking emotional support and genuine, RCI-registered clinical psychologists. Unlike automated AI chatbots or uncertified coaches, our therapists bring evidence-based clinical rigor to every conversation.
            </p>

            <div className="space-y-2 pt-2 text-xs text-gray-700 font-semibold text-left max-w-lg mx-auto md:mx-0">
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-[#E56A38] shrink-0" />
                <span>RCI Licensed Clinical Psychologists (M.Phil & Ph.D. Level)</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-[#E56A38] shrink-0" />
                <span>Zero Judgment, 100% Encrypted Tele-health Architecture</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-[#E56A38] shrink-0" />
                <span>Personalized CBT, ACT, and Schema Therapy Frameworks</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 4. Black Quote Callout Banner matching unfazed.in */}
      <section className="bg-black text-white py-14 px-4 text-center">
        <div className="max-w-3xl mx-auto space-y-4">
          <blockquote className="text-xl sm:text-2xl font-bold leading-relaxed">
            "Unfazed was created so that <span className="text-[#E56A38]">no one has to suffer in silence</span>. Healing starts when you find a psychologist who <span className="text-[#E56A38]">truly understands you</span>."
          </blockquote>
          <p className="text-xs text-gray-400 font-medium uppercase tracking-widest">— Founder, Unfazed Mental Health</p>
        </div>
      </section>

      {/* 5. What We Provide Section */}
      <section className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-6 space-y-8 text-center">
        <div className="space-y-2">
          <h2 className="text-3xl font-black text-gray-900">
            What we <span className="text-[#E56A38]">provide</span>
          </h2>
          <p className="text-xs text-gray-500 max-w-lg mx-auto">
            Personalized mental health care tailored to your unique emotional journey.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-white p-6 rounded-2xl border border-orange-200 shadow-sm space-y-3 text-center hover:shadow-md transition">
            <div className="w-12 h-12 rounded-xl bg-orange-100 text-[#E56A38] font-bold text-xl flex items-center justify-center mx-auto">
              👤
            </div>
            <h3 className="font-extrabold text-gray-900 text-base">1-on-1 Therapy</h3>
            <p className="text-xs text-gray-600 leading-relaxed">
              Individual confidential sessions addressing anxiety, trauma, depression, and personal growth.
            </p>
          </div>

          <div className="bg-white p-6 rounded-2xl border border-orange-200 shadow-sm space-y-3 text-center hover:shadow-md transition">
            <div className="w-12 h-12 rounded-xl bg-orange-100 text-[#E56A38] font-bold text-xl flex items-center justify-center mx-auto">
              👩‍❤️‍👨
            </div>
            <h3 className="font-extrabold text-gray-900 text-base">Couples Therapy</h3>
            <p className="text-xs text-gray-600 leading-relaxed">
              Rebuild communication, resolve conflict, and restore emotional intimacy with specialized counseling.
            </p>
          </div>

          <div className="bg-white p-6 rounded-2xl border border-orange-200 shadow-sm space-y-3 text-center hover:shadow-md transition">
            <div className="w-12 h-12 rounded-xl bg-orange-100 text-[#E56A38] font-bold text-xl flex items-center justify-center mx-auto">
              🎨
            </div>
            <h3 className="font-extrabold text-gray-900 text-base">Child & Teen Therapy</h3>
            <p className="text-xs text-gray-600 leading-relaxed">
              Expressive techniques, emotional regulation, and stress support for young minds and adolescents.
            </p>
          </div>
        </div>

        <div>
          <Link
            to="/therapists"
            className="inline-block px-7 py-3 bg-[#E56A38] hover:bg-[#d45826] text-white font-bold text-xs rounded-xl shadow-md transition"
          >
            Explore Services
          </Link>
        </div>
      </section>

      {/* 6. Meet Our Experts / Therapists Section */}
      <section className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-6 space-y-8">
        <div className="text-center space-y-2">
          <h2 className="text-3xl font-black text-gray-900">
            Meet our Experts / <span className="text-[#E56A38]">Therapists</span>
          </h2>
          <p className="text-xs text-gray-500">Handpicked RCI Registered Clinical Psychologists</p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {(therapists.length > 0 ? therapists : FALLBACK_THERAPISTS).slice(0, 4).map((t) => (
            <div key={t._id || t.slug} className="bg-white rounded-2xl p-4 border border-gray-100 shadow-md space-y-3 text-center">
              <img
                src={t.imageUrl || "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&q=80&w=400"}
                alt={t.name}
                className="w-full h-48 object-cover rounded-xl"
              />
              <div>
                <h3 className="font-bold text-sm text-gray-900">{t.name}</h3>
                <p className="text-[11px] text-gray-500 font-medium">{t.title}</p>
                <p className="text-xs font-bold text-[#E56A38] mt-1">Rs. {t.sessionPriceIndividual || 1350}/session</p>
              </div>

              <Link
                to={`/therapist/${t.slug || "ashmita"}`}
                className="block w-full py-2 bg-[#E56A38] hover:bg-[#d45826] text-white font-bold text-xs rounded-lg shadow-sm transition"
              >
                View Profile
              </Link>
            </div>
          ))}
        </div>
      </section>

      {/* 7. Reviews Section */}
      <section className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-6 space-y-8 text-center">
        <div className="space-y-2">
          <h2 className="text-2xl sm:text-3xl font-black text-gray-900">
            Reviews of People Who Took The <br />
            <span className="text-[#E56A38]">Leap of Faith with Unfazed</span>
          </h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 text-left">
          {reviews.map((r) => (
            <div key={r.id} className="bg-gray-50 p-5 rounded-2xl border border-gray-100 space-y-2">
              <div className="flex text-amber-400 text-xs">{"★".repeat(r.rating)}</div>
              <p className="text-xs text-gray-600 leading-relaxed italic">"{r.text}"</p>
              <h4 className="font-bold text-xs text-gray-900 pt-1">— {r.name}</h4>
            </div>
          ))}
        </div>
      </section>

      {/* 8. Pricing Plans Section matching unfazed.in */}
      <section className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-6 space-y-8 text-center">
        <div className="space-y-2">
          <h2 className="text-3xl font-black text-gray-900">
            Pricing <span className="text-[#E56A38]">plans</span>
          </h2>
          <p className="text-xs text-gray-500">Transparent & Affordable Mental Healthcare</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto items-stretch">
          {/* Card 1 */}
          <div className="bg-white p-6 rounded-2xl border border-gray-200 shadow-sm flex flex-col justify-between space-y-4">
            <div className="space-y-2">
              <h3 className="font-extrabold text-sm text-gray-900">Individual Session</h3>
              <div className="text-3xl font-black text-[#E56A38]">₹1,350</div>
              <p className="text-[11px] text-gray-500">Per 50 Mins Session</p>
            </div>
            <ul className="text-xs text-gray-600 space-y-2 text-left pt-2 border-t border-gray-100">
              <li>✓ 1-on-1 Confidential Video Call</li>
              <li>✓ RCI Registered Clinical Psychologist</li>
              <li>✓ Actionable Session Notes</li>
            </ul>
            <Link
              to="/booking/individual/ashmita"
              className="block w-full py-2.5 bg-[#E56A38] hover:bg-[#d45826] text-white font-bold text-xs rounded-xl shadow-md transition"
            >
              Book Now
            </Link>
          </div>

          {/* Card 2 (Featured Bundle) */}
          <div className="bg-white p-6 rounded-2xl border-2 border-[#E56A38] shadow-xl flex flex-col justify-between space-y-4 relative transform -translate-y-1">
            <span className="absolute -top-3 left-1/2 -translate-x-1/2 bg-[#E56A38] text-white text-[10px] uppercase font-extrabold px-3 py-0.5 rounded-full shadow-md">
              Most Popular
            </span>
            <div className="space-y-2 pt-1">
              <h3 className="font-extrabold text-sm text-gray-900">3-Session Package</h3>
              <div className="text-3xl font-black text-[#E56A38]">₹3,847</div>
              <p className="text-[11px] text-gray-500">Save 5% (Rs. 1282/session)</p>
            </div>
            <ul className="text-xs text-gray-600 space-y-2 text-left pt-2 border-t border-gray-100">
              <li>✓ 3 Individual Therapy Sessions</li>
              <li>✓ Priority Slot Reservation</li>
              <li>✓ Extended 60-Day Validity</li>
            </ul>
            <Link
              to="/booking/individual/ashmita"
              className="block w-full py-2.5 bg-[#E56A38] hover:bg-[#d45826] text-white font-bold text-xs rounded-xl shadow-md transition"
            >
              Book Package
            </Link>
          </div>

          {/* Card 3 */}
          <div className="bg-white p-6 rounded-2xl border border-gray-200 shadow-sm flex flex-col justify-between space-y-4">
            <div className="space-y-2">
              <h3 className="font-extrabold text-sm text-gray-900">Couples Therapy</h3>
              <div className="text-3xl font-black text-[#E56A38]">₹2,500</div>
              <p className="text-[11px] text-gray-500">Per 60 Mins Session</p>
            </div>
            <ul className="text-xs text-gray-600 space-y-2 text-left pt-2 border-t border-gray-100">
              <li>✓ Joint Couples Session</li>
              <li>✓ Specialized Marriage Counselor</li>
              <li>✓ Relationship Harmony Exercises</li>
            </ul>
            <Link
              to="/booking/couple/ashmita"
              className="block w-full py-2.5 bg-[#E56A38] hover:bg-[#d45826] text-white font-bold text-xs rounded-xl shadow-md transition"
            >
              Book Now
            </Link>
          </div>
        </div>
      </section>

      {/* 9. FAQ Section */}
      <section className="max-w-4xl mx-auto px-4 py-6">
        <div className="bg-gray-50 rounded-3xl p-8 space-y-6 border border-gray-100">
          <div className="space-y-1">
            <span className="text-[10px] uppercase font-bold text-gray-400 tracking-widest">FAQS</span>
            <h2 className="text-2xl font-black text-gray-900">
              Frequently asked <span className="text-[#E56A38]">questions</span>
            </h2>
          </div>

          <div className="space-y-3">
            {faqs.map((faq, idx) => {
              const isOpen = activeFaq === idx;
              return (
                <div key={idx} className="bg-white rounded-xl border border-gray-200 overflow-hidden">
                  <button
                    onClick={() => setActiveFaq(isOpen ? -1 : idx)}
                    className="w-full p-4 text-left flex justify-between items-center font-bold text-xs sm:text-sm text-gray-900 cursor-pointer"
                  >
                    <span>{faq.q}</span>
                    <span className={`w-5 h-5 rounded-full flex items-center justify-center shrink-0 ${isOpen ? "bg-[#E56A38] text-white" : "bg-gray-100 text-gray-600"}`}>
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
      </section>

      {/* 10. Dark CTA Banner */}
      <section className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 pb-12">
        <div className="bg-black text-white rounded-3xl p-10 sm:p-14 text-center space-y-5">
          <h2 className="text-3xl sm:text-4xl font-black tracking-tight">
            Your pain has a <span className="text-[#E56A38]">pattern</span>. <br /> Break it.
          </h2>
          <p className="text-xs sm:text-sm text-gray-400 max-w-md mx-auto">
            Before it captures another relationship, another year, another version of yourself. Connect with RCI clinical psychologists today.
          </p>
          <Link
            to="/therapists"
            className="inline-block px-8 py-3 bg-[#E56A38] hover:bg-[#d45826] text-white font-bold text-xs rounded-xl shadow-xl transition"
          >
            Get Started
          </Link>
        </div>
      </section>
    </div>
  );
};

export default HomePage;
