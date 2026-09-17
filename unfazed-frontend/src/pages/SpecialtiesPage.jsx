import React, { useState } from "react";
import { Link } from "react-router-dom";
import {
  ShieldCheck,
  CheckCircle2,
  Star,
  ArrowRight,
  Brain,
  Sparkles,
  Search,
  ChevronDown,
  ChevronUp,
} from "lucide-react";

export const SpecialtiesPage = () => {
  const [activeTab, setActiveTab] = useState("Anxiety");
  const [activeFaq, setActiveFaq] = useState(0);

  const specialtyTabs = [
    { id: "Anxiety", label: "Anxiety & Stress" },
    { id: "Depression", label: "Depression & Low Mood" },
    { id: "Relationships", label: "Relationships & Marriage" },
    { id: "Stress", label: "Burnout & Work Stress" },
    { id: "Trauma", label: "Trauma & PTSD" },
    { id: "Child", label: "Child & Teen Therapy" },
  ];

  const specialtyData = {
    Anxiety: {
      pill: "SPECIALITY: ANXIETY & STRESS",
      title: "Feeling constantly on edge?",
      subtitle:
        "Racing thoughts, physical tension, or a persistent feeling of dread? You don't have to carry this alone. RCI clinical psychologists help you regain control.",
      stats: {
        stat1: "87%",
        text1: "Clients reported anxiety reduction in 6 sessions",
        stat2: "4.9★",
        text2: "Average rating for anxiety care",
        stat3: "2,100+",
        text3: "Anxiety sessions conducted",
      },
      symptoms: [
        "Feeling restless, wound up, or constantly on edge",
        "Persistent overthinking and worst-case scenario loops",
        "Panic attacks, racing heart, or tightness in chest",
        "Sleep disturbances or waking up with morning dread",
        "Social anxiety or intense fear of negative evaluation",
        "Difficulty concentrating or persistent brain fog",
      ],
      explanationTitle: "What is anxiety, and why won't it just stop?",
      explanationText:
        "Anxiety is your body's survival system getting stuck in overdrive. When your nervous system perceives threat—even from hypothetical thoughts—it triggers adrenaline and cortisol. Without clinical intervention, your brain creates hardwired fear loops. Cognitive Behavioral Therapy (CBT) and Acceptance & Commitment Therapy (ACT) help rewire these neural pathways.",
      howWeHelpTitle: "How we help you manage anxiety",
      modalities: [
        {
          title: "Cognitive Behavioral Therapy (CBT)",
          desc: "Identify intrusive thought patterns, challenge irrational fear assumptions, and reframe anxiety loops.",
        },
        {
          title: "Acceptance & Commitment Therapy (ACT)",
          desc: "Learn to acknowledge anxious thoughts without letting them control your actions or decision making.",
        },
        {
          title: "Exposure & Response Prevention (ERP)",
          desc: "Gradually diminish phobias, panic triggers, and social anxiety through controlled clinical exercises.",
        },
        {
          title: "Mindfulness & Grounding Techniques",
          desc: "Somatic nervous system regulation to calm racing heart rate and physical panic spikes instantly.",
        },
      ],
      quote:
        "Anxiety is not a sign of weakness. It is a sign that your nervous system has been fighting for too long.",
    },
    Depression: {
      pill: "SPECIALITY: DEPRESSION & LOW MOOD",
      title: "Feeling empty, exhausted, or detached?",
      subtitle:
        "When everyday tasks feel overwhelming and joy seems out of reach, specialized clinical care offers a path back to vitality and emotional connection.",
      stats: {
        stat1: "84%",
        text1: "Clients experienced mood recovery within 8 sessions",
        stat2: "4.9★",
        text2: "Average rating for depression care",
        stat3: "1,850+",
        text3: "Depression sessions conducted",
      },
      symptoms: [
        "Persistent feelings of sadness, emptiness, or emotional numbness",
        "Loss of interest in activities you once enjoyed",
        "Chronic fatigue and low energy despite adequate rest",
        "Self-critical thoughts and feelings of worthlessness",
        "Changes in sleep patterns or appetite",
        "Difficulty starting or completing daily responsibilities",
      ],
      explanationTitle: "What is depression, and why is it so draining?",
      explanationText:
        "Depression is not simply sadness—it is a complex neuro-biological state that impacts motivation, energy, and cognition. It creates a protective 'shutdown' mode in response to chronic stress, loss, or emotional overload. Our evidence-based protocols help restore emotional momentum step-by-step.",
      howWeHelpTitle: "How we help you recover from depression",
      modalities: [
        {
          title: "Behavioral Activation Therapy",
          desc: "Re-engage in rewarding life activities to stimulate dopamine and break depressive isolation.",
        },
        {
          title: "Cognitive Restructuring",
          desc: "Unpack core negative beliefs about yourself, others, and the future with gentle clinical guidance.",
        },
        {
          title: "Schema Therapy",
          desc: "Address deep-seated emotional patterns originating from past experiences or childhood environments.",
        },
        {
          title: "Self-Compassion Protocols",
          desc: "Replace harsh inner criticism with constructive, nurturing self-talk and emotional resilience.",
        },
      ],
      quote:
        "Depression tells you that you are trapped. Therapy reminds you that you hold the key.",
    },
    Relationships: {
      pill: "SPECIALITY: RELATIONSHIPS & MARRIAGE",
      title: "Struggling with conflict or emotional distance?",
      subtitle:
        "Break free from recurring arguments, miscommunication, and broken trust. Rebuild intimacy with specialized couples therapy.",
      stats: {
        stat1: "91%",
        text1: "Couples reported improved communication after 5 sessions",
        stat2: "4.8★",
        text2: "Average rating for couples care",
        stat3: "1,400+",
        text3: "Couples sessions conducted",
      },
      symptoms: [
        "Recurring arguments about the same unresolved issues",
        "Feeling unheard, invalidated, or emotionally distant",
        "Breakdown of physical or emotional intimacy",
        "Trust issues following infidelity or emotional distance",
        "Difficulty setting boundaries with extended family or in-laws",
        "Uncertainty about the future of your marriage or relationship",
      ],
      explanationTitle: "Why do relationship patterns repeat?",
      explanationText:
        "Couples often get trapped in negative interaction cycles where one partner pursues and the other withdraws. Without guidance, defensive reactions replace genuine vulnerability. Couples therapy provides a structured, neutral space to decode these dynamics.",
      howWeHelpTitle: "How we help you rebuild your relationship",
      modalities: [
        {
          title: "Emotionally Focused Therapy (EFT)",
          desc: "De-escalate conflict and cultivate secure attachment bonds between partners.",
        },
        {
          title: "Gottman Method Interventions",
          desc: "Implement scientifically proven principles to foster respect, affection, and conflict resolution.",
        },
        {
          title: "Communication Training",
          desc: "Master active listening and non-violent communication to express needs clearly.",
        },
        {
          title: "Trust Repair Protocols",
          desc: "Navigate post-infidelity healing or deep boundary breaches with structured clinical steps.",
        },
      ],
      quote:
        "Great relationships aren't born without conflict. They are built through constructive repair.",
    },
    Stress: {
      pill: "SPECIALITY: BURNOUT & WORK STRESS",
      title: "Drained by workplace pressure and burnout?",
      subtitle:
        "Restore work-life balance, set firm boundaries, and overcome executive burnout with targeted psychological coaching.",
      stats: {
        stat1: "89%",
        text1: "Executives reported reduced stress levels in 4 sessions",
        stat2: "4.9★",
        text2: "Average rating for burnout care",
        stat3: "1,250+",
        text3: "Burnout sessions conducted",
      },
      symptoms: [
        "Constant physical and mental exhaustion",
        "Cynicism or detachment regarding your career or job",
        "Impairment in work performance or decision making",
        "Inability to disconnect from work outside office hours",
        "Physical symptoms: tension headaches, stomach issues, insomnia",
        "Loss of career satisfaction and personal purpose",
      ],
      explanationTitle: "What is burnout, and why can't you just rest it off?",
      explanationText:
        "Burnout is not simple tiredness; it is chronic workplace stress that has not been successfully managed. Weekend rest alone cannot fix burnout if underlying boundary issues, perfectionism, or organizational overload persist.",
      howWeHelpTitle: "How we help you overcome burnout",
      modalities: [
        {
          title: "Boundary Setting & Assertiveness",
          desc: "Learn to set firm professional boundaries and say no without guilt.",
        },
        {
          title: "Perfectionism Deconstruction",
          desc: "Challenge hyper-achiever tendencies that lead to self-imposed overwork.",
        },
        {
          title: "Stress Regulation Strategies",
          desc: "Somatic practices to manage high-stakes pressure and acute workplace stress.",
        },
        {
          title: "Values Realignment",
          desc: "Align your career choices with your core life values and personal well-being.",
        },
      ],
      quote:
        "Rest is not a reward for work. Rest is a fundamental requirement for living.",
    },
    Trauma: {
      pill: "SPECIALITY: TRAUMA & PTSD",
      title: "Haunted by past memories or trauma?",
      subtitle:
        "Process traumatic memories safely and restore a feeling of safety in your body with trauma-informed clinical therapy.",
      stats: {
        stat1: "86%",
        text1: "Clients reported significant trauma relief",
        stat2: "4.9★",
        text2: "Average rating for trauma care",
        stat3: "980+",
        text3: "Trauma sessions conducted",
      },
      symptoms: [
        "Intrusive memories, flashbacks, or disturbing nightmares",
        "Avoidance of places, people, or thoughts connected to past trauma",
        "Hyper-vigilance, feeling constantly guarded or easily startled",
        "Emotional numbness or difficulty feeling positive emotions",
        "Deep feelings of guilt, shame, or self-blame",
        "Physical tension or unexplained somatic pain",
      ],
      explanationTitle: "How does trauma impact your mind and body?",
      explanationText:
        "Trauma is not just what happened to you—it is what happens inside your nervous system as a result. Unprocessed traumatic memories remain stored in raw sensory forms, causing triggers long after the event has passed.",
      howWeHelpTitle: "How we help you heal from trauma",
      modalities: [
        {
          title: "Trauma-Informed CBT",
          desc: "Safely process trauma narratives and reframe distressing core beliefs.",
        },
        {
          title: "Somatic Experiencing",
          desc: "Release stored physical trauma responses and tension from the body.",
        },
        {
          title: "Internal Family Systems (IFS)",
          desc: "Heal protective and wounded parts of your psyche with self-compassion.",
        },
        {
          title: "Safety & Stabilization Work",
          desc: "Build emotional grounding tools before engaging with traumatic memories.",
        },
      ],
      quote:
        "Trauma alters your story. Therapy empowers you to author the next chapter.",
    },
    Child: {
      pill: "SPECIALITY: CHILD & TEEN THERAPY",
      title: "Concerned about your child's emotional health?",
      subtitle:
        "Help your child or teenager navigate emotional outbursts, school stress, peer pressure, and behavioral changes with child psychologists.",
      stats: {
        stat1: "92%",
        text1: "Parents noticed positive behavioral changes",
        stat2: "4.9★",
        text2: "Average rating for child therapy",
        stat3: "1,150+",
        text3: "Child & teen sessions conducted",
      },
      symptoms: [
        "Frequent temper tantrums, emotional outbursts, or aggression",
        "Withdrawal from family, friends, or school activities",
        "Academic decline or extreme school-related anxiety",
        "Difficulty managing frustration, focus, or impulsive behavior",
        "Changes in sleeping or eating habits",
        "Self-harm signs or expressions of hopelessness in teens",
      ],
      explanationTitle: "Why do children and teens struggle emotionally?",
      explanationText:
        "Children and adolescents lack the fully developed emotional vocabulary to articulate internal stress. Their distress often manifests as behavioral outbursts, academic struggles, or somatic complaints.",
      howWeHelpTitle: "How we support children and teens",
      modalities: [
        {
          title: "Art & Play Therapy",
          desc: "Expressive techniques that allow young children to process emotions through creative play.",
        },
        {
          title: "Adolescent CBT",
          desc: "Age-appropriate cognitive strategies to help teens manage peer stress and self-esteem.",
        },
        {
          title: "Parenting Guidance & Consultation",
          desc: "Equip parents with actionable strategies to support their child's emotional needs at home.",
        },
        {
          title: "Emotional Regulation Coaching",
          desc: "Teach kids practical tools to identify and regulate intense feelings safely.",
        },
      ],
      quote:
        "Children don't need perfect parents. They need parents who are willing to understand them.",
    },
  };

  const current = specialtyData[activeTab] || specialtyData["Anxiety"];

  const therapistsList = [
    {
      name: "Ashmita",
      title: "Clinical Psychologist (RCI Registered)",
      specs: "CBT • ACT • Schema Therapy",
      exp: "4 Yrs Exp",
      price: "1,350",
      img: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&q=80&w=400",
      rating: "5.0",
      slug: "ashmita",
    },
    {
      name: "Dr. Neha Sharma",
      title: "Senior Counseling Psychologist",
      specs: "Anxiety • Burnout • Relationships",
      exp: "6 Yrs Exp",
      price: "1,350",
      img: "https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&q=80&w=400",
      rating: "4.9",
      slug: "neha-sharma",
    },
    {
      name: "Dr. Ritu Verma",
      title: "Child & Adolescent Specialist",
      specs: "Child Psychology • Play Therapy",
      exp: "7 Yrs Exp",
      price: "1,350",
      img: "https://images.unsplash.com/photo-1567532939604-b6b5b0db2604?auto=format&fit=crop&q=80&w=400",
      rating: "4.9",
      slug: "ritu-verma",
    },
  ];

  const specialtyFaqs = [
    {
      q: "How many sessions are typically needed for anxiety or stress reduction?",
      a: "Most clients notice significant symptom reduction and emotional clarity within 4 to 6 sessions. Clinical psychologists tailor the exact plan based on severity.",
    },
    {
      q: "Can I choose my psychologist based on my specific concern?",
      a: "Yes! All our psychologists are RCI registered and specialize in specific clinical domains. You can review profiles and choose the therapist best suited for your needs.",
    },
    {
      q: "Are video sessions encrypted and completely private?",
      a: "Yes, 100%. All tele-health sessions take place over 256-bit encrypted connections adhering strictly to HIPAA and Indian IT Tele-medicine regulations.",
    },
    {
      q: "What is the difference between a counselor and an RCI Clinical Psychologist?",
      a: "An RCI Clinical Psychologist holds a specialized Master's and M.Phil degree from recognized medical institutes (like NIMHANS) and is licensed by the Rehabilitation Council of India to diagnose and treat clinical disorders.",
    },
  ];

  return (
    <div className="bg-white min-h-screen space-y-12">
      {/* 1. Sub-Header Speciality Filter Bar matching unfazed.in */}
      <div className="bg-[#111111] text-white py-3 sticky top-0 z-30 shadow-md">
        <div className="max-w-6xl mx-auto px-4 flex items-center justify-start sm:justify-center gap-2 overflow-x-auto scrollbar-none text-xs font-bold">
          {specialtyTabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`px-4 py-2 rounded-full transition whitespace-nowrap cursor-pointer ${
                activeTab === tab.id
                  ? "bg-[#E56A38] text-white shadow-md"
                  : "bg-gray-800/80 text-gray-300 hover:bg-gray-700 hover:text-white"
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>
      </div>

      {/* 2. Hero Section for Specialty */}
      <section className="pt-6 pb-12 bg-gradient-to-b from-orange-50/40 via-white to-white">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
            {/* Left Column */}
            <div className="lg:col-span-7 space-y-5 text-center lg:text-left">
              <div className="inline-block px-3 py-1 rounded-full bg-orange-100/80 text-[#E56A38] text-[11px] font-extrabold tracking-wider uppercase">
                {current.pill}
              </div>

              <h1 className="text-4xl sm:text-5xl font-black text-gray-900 leading-tight">
                {current.title}
              </h1>

              <p className="text-xs sm:text-sm text-gray-600 max-w-xl mx-auto lg:mx-0 leading-relaxed">
                {current.subtitle}
              </p>

              {/* 3 Specs Bar */}
              <div className="grid grid-cols-3 gap-3 pt-2 text-center max-w-lg mx-auto lg:mx-0 bg-white p-4 rounded-2xl border border-gray-100 shadow-sm">
                <div>
                  <div className="text-xl font-black text-[#E56A38]">{current.stats.stat1}</div>
                  <div className="text-[10px] text-gray-500 font-medium leading-tight mt-0.5">{current.stats.text1}</div>
                </div>
                <div className="border-x border-gray-100">
                  <div className="text-xl font-black text-amber-500">{current.stats.stat2}</div>
                  <div className="text-[10px] text-gray-500 font-medium leading-tight mt-0.5">{current.stats.text2}</div>
                </div>
                <div>
                  <div className="text-xl font-black text-[#E56A38]">{current.stats.stat3}</div>
                  <div className="text-[10px] text-gray-500 font-medium leading-tight mt-0.5">{current.stats.text3}</div>
                </div>
              </div>

              <div className="flex flex-col sm:flex-row gap-3 justify-center lg:justify-start pt-2">
                <Link
                  to="/therapists"
                  className="px-7 py-3 bg-[#E56A38] hover:bg-[#d45826] text-white font-bold text-xs rounded-xl shadow-lg shadow-orange-950/20 transition text-center"
                >
                  Book a Session - Rs. 1350
                </Link>
                <Link
                  to="/therapists"
                  className="px-6 py-3 bg-white hover:bg-orange-50 text-[#E56A38] border border-[#E56A38] font-bold text-xs rounded-xl transition text-center"
                >
                  Browse Therapists
                </Link>
              </div>
            </div>

            {/* Right Graphic Card */}
            <div className="lg:col-span-5 flex justify-center">
              <div className="bg-[#1D4D4F] text-white p-6 rounded-3xl shadow-2xl max-w-sm w-full space-y-4 border border-teal-800">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-2xl bg-amber-400 text-teal-950 font-bold flex items-center justify-center text-xl">
                    🧠
                  </div>
                  <div>
                    <h3 className="font-extrabold text-white text-base">Anxiety & Stress Care</h3>
                    <p className="text-[11px] text-teal-200">RCI Clinical Protocol</p>
                  </div>
                </div>

                <div className="bg-teal-900/80 p-3.5 rounded-2xl space-y-2 text-xs border border-teal-700">
                  <div className="flex justify-between text-teal-100">
                    <span>Evidence Modality:</span>
                    <span className="font-bold text-white">CBT & ACT Therapy</span>
                  </div>
                  <div className="flex justify-between text-teal-100">
                    <span>Format:</span>
                    <span className="font-bold text-white">1-on-1 Video Session</span>
                  </div>
                  <div className="flex justify-between text-teal-100">
                    <span>Session Length:</span>
                    <span className="font-bold text-white">50 Minutes</span>
                  </div>
                </div>

                <Link
                  to="/therapist/ashmita"
                  className="block w-full py-2.5 bg-[#E56A38] hover:bg-[#d45826] text-white font-bold text-xs rounded-xl text-center shadow-md transition"
                >
                  Book Specialist Session
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 3. Understanding Section & Symptoms Checklist */}
      <section className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-6 space-y-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
          {/* Left Symptoms Checklist */}
          <div className="lg:col-span-5 bg-orange-50/60 p-6 rounded-3xl border border-orange-100 space-y-4">
            <span className="text-[10px] font-extrabold uppercase text-[#E56A38] tracking-widest">SYMPTOMS CHECK</span>
            <h3 className="text-lg font-black text-gray-900">Are you experiencing any of these?</h3>

            <div className="space-y-3 text-xs text-gray-700 font-medium">
              {current.symptoms.map((symptom, idx) => (
                <div key={idx} className="flex items-start gap-2.5 bg-white p-3 rounded-xl border border-orange-100/70 shadow-2xs">
                  <CheckCircle2 className="w-4 h-4 text-[#E56A38] shrink-0 mt-0.5" />
                  <span>{symptom}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Right Explanation */}
          <div className="lg:col-span-7 space-y-4">
            <span className="text-[10px] font-extrabold uppercase text-[#E56A38] tracking-widest">UNDERSTANDING {activeTab.toUpperCase()}</span>
            <h2 className="text-2xl sm:text-3xl font-black text-gray-900 leading-tight">
              {current.explanationTitle}
            </h2>
            <p className="text-xs sm:text-sm text-gray-600 leading-relaxed">
              {current.explanationText}
            </p>

            <div className="p-4 bg-teal-50 border border-teal-100 rounded-2xl text-xs text-teal-900 space-y-1">
              <span className="font-bold block">How our psychologists work with {activeTab}:</span>
              <p className="text-teal-800 leading-relaxed">
                Trigger identification, Cognitive restructuring, Behavioral exposure, and Mindfulness grounding tailored to your personality.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 4. Evidence-Based Modalities Grid */}
      <section className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-6 space-y-6 text-center">
        <div className="space-y-2">
          <span className="text-[10px] font-extrabold uppercase text-[#E56A38] tracking-widest">EVIDENCE-BASED CARE</span>
          <h2 className="text-2xl sm:text-3xl font-black text-gray-900">
            {current.howWeHelpTitle}
          </h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 text-left">
          {current.modalities.map((mod, idx) => (
            <div key={idx} className="bg-white p-5 rounded-2xl border border-gray-200 shadow-sm space-y-2 hover:border-[#E56A38] transition">
              <div className="w-8 h-8 rounded-lg bg-orange-100 text-[#E56A38] font-bold text-sm flex items-center justify-center">
                0{idx + 1}
              </div>
              <h3 className="font-extrabold text-sm text-gray-900">{mod.title}</h3>
              <p className="text-xs text-gray-600 leading-relaxed">{mod.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* 5. Black Quote Callout Banner */}
      <section className="bg-black text-white py-12 px-4 text-center">
        <div className="max-w-3xl mx-auto space-y-3">
          <blockquote className="text-xl sm:text-2xl font-bold leading-relaxed">
            "{current.quote}"
          </blockquote>
          <p className="text-xs text-gray-400 font-medium uppercase tracking-widest">— Unfazed Clinical Care Team</p>
        </div>
      </section>

      {/* 6. Real Therapists Section */}
      <section className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-6 space-y-8 text-center">
        <div className="space-y-2">
          <span className="text-[10px] font-extrabold uppercase text-[#E56A38] tracking-widest">RCI CLINICAL PSYCHOLOGISTS</span>
          <h2 className="text-2xl sm:text-3xl font-black text-gray-900">
            Real therapists who won't <span className="text-[#E56A38]">let you stay comfortable.</span>
          </h2>
          <p className="text-xs text-gray-500 max-w-md mx-auto">
            Specialized RCI clinical psychologists with deep expertise in {activeTab.toLowerCase()} care.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 text-center">
          {therapistsList.map((t, idx) => (
            <div key={idx} className="bg-white rounded-2xl p-4 border border-orange-200 shadow-md space-y-3">
              <img
                src={t.img}
                alt={t.name}
                className="w-full h-56 object-cover rounded-xl"
              />
              <div className="space-y-1">
                <h3 className="font-bold text-sm text-gray-900">{t.name}</h3>
                <p className="text-[11px] text-gray-500 font-medium">{t.title}</p>
                <p className="text-xs font-bold text-[#E56A38]">Rs. {t.price}/session</p>
              </div>

              <Link
                to={`/therapist/${t.slug}`}
                className="block w-full py-2 bg-[#E56A38] hover:bg-[#d45826] text-white font-bold text-xs rounded-lg shadow-sm transition"
              >
                Book a Session
              </Link>
            </div>
          ))}
        </div>
      </section>

      {/* 7. Testimonials Section */}
      <section className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-6 space-y-6 text-center">
        <div className="space-y-2">
          <span className="text-[10px] font-extrabold uppercase text-[#E56A38] tracking-widest">PATIENT RECOVERIES</span>
          <h2 className="text-2xl sm:text-3xl font-black text-gray-900">
            Know our customers <span className="text-[#E56A38]">Experiences</span>
          </h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 text-left">
          {[
            { name: "Aakash M.", text: "After months of panic attacks, Dr. Ashmita's CBT exercises gave me back my independence." },
            { name: "Pooja R.", text: "I used to overthink every social interaction. Therapy taught me how to quiet the mental noise." },
            { name: "Siddharth K.", text: "I was hesitant about online therapy, but the progress in 5 sessions exceeded my expectations." },
            { name: "Divya N.", text: "Compassionate, structured, and genuinely life-changing care." },
          ].map((rev, idx) => (
            <div key={idx} className="bg-gray-50 p-5 rounded-2xl border border-gray-200 space-y-2">
              <div className="flex text-amber-400 text-xs">★★★★★</div>
              <p className="text-xs text-gray-600 leading-relaxed italic">"{rev.text}"</p>
              <h4 className="font-bold text-xs text-gray-900 pt-1">— {rev.name}</h4>
            </div>
          ))}
        </div>
      </section>

      {/* 8. FAQ Accordion Section */}
      <section className="max-w-4xl mx-auto px-4 py-6">
        <div className="bg-gray-50 rounded-3xl p-8 space-y-6 border border-gray-100">
          <div className="space-y-1">
            <span className="text-[10px] uppercase font-bold text-gray-400 tracking-widest">FAQS</span>
            <h2 className="text-2xl font-black text-gray-900">
              Frequently asked <span className="text-[#E56A38]">questions</span>
            </h2>
          </div>

          <div className="space-y-3">
            {specialtyFaqs.map((faq, idx) => {
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

      {/* 9. Bright Orange "Ready to start feeling better?" Banner */}
      <section className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
        <div className="bg-gradient-to-r from-orange-500 via-[#E56A38] to-orange-600 text-white rounded-3xl p-10 sm:p-12 shadow-xl flex flex-col md:flex-row items-center justify-between gap-8">
          <div className="space-y-3 text-center md:text-left">
            <h2 className="text-3xl font-black tracking-tight">Ready to start feeling better?</h2>
            <p className="text-xs sm:text-sm text-orange-100 max-w-md leading-relaxed">
              Book a 1-on-1 session with an RCI registered clinical psychologist today and take your first step toward emotional clarity.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row gap-3 shrink-0">
            <Link
              to="/therapists"
              className="px-7 py-3.5 bg-white text-[#E56A38] font-bold text-xs rounded-xl shadow-lg hover:bg-orange-50 transition text-center"
            >
              Book a Session
            </Link>
            <Link
              to="/therapists"
              className="px-6 py-3.5 bg-orange-700/80 hover:bg-orange-800 text-white border border-orange-400 font-bold text-xs rounded-xl transition text-center"
            >
              Browse Therapists
            </Link>
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

export default SpecialtiesPage;
