import React, { useEffect, useRef, useState } from "react";
import {
  FaBookOpen,
  FaRunning,
  FaChalkboardTeacher,
  FaPuzzlePiece,
  FaBus,
  FaLeaf
} from "react-icons/fa";
import { Baby, BookOpen, GraduationCap, ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";

/* -------------------------------------------------------------------------
   Design notes — same liquid-glass language as the Hero:
   drifting gradient-mesh blobs behind frosted, translucent panels with
   inset highlights, plus a shine sweep on hover. Same font pairing too —
   Fredoka for display, Plus Jakarta Sans for body/utility (add once to
   index.html <head> if not already there):

   <link rel="preconnect" href="https://fonts.googleapis.com">
   <link href="https://fonts.googleapis.com/css2?family=Fredoka:wght@500;600;700&family=Plus+Jakarta+Sans:wght@400;500;600;700&display=swap" rel="stylesheet">
------------------------------------------------------------------------- */

const ADVANTAGES = [
  { icon: <FaBookOpen />, title: "Focused on Co-Curricular Activities", color: "#2E90FA" },
  { icon: <FaLeaf />, title: "Safe, Healthy & Helpful Environment", color: "#17A673" },
  { icon: <FaRunning />, title: "Boost Physical Activities", color: "#F5A524" },
  { icon: <FaChalkboardTeacher />, title: "Effective Learning Experience", color: "#F0416B" },
  { icon: <FaPuzzlePiece />, title: "Activity-Based Learning", color: "#8B5CF6" },
  { icon: <FaBus />, title: "Comfortable Transport Service", color: "#FF6B57" }
];

const COURSES = [
  {
    icon: <Baby size={24} />,
    title: "Play Group",
    subtitle: "Age 1.5+",
    text: "A safe, playful environment that supports early learning and social development.",
    path: "/courses/playgroup",
    color: "#2E90FA",
    lift: "md:translate-y-8"
  },
  {
    icon: <BookOpen size={24} />,
    title: "Nursery • LKG • UKG",
    subtitle: "Nursery 3+ · LKG 4+ · UKG 5+",
    text: "Age-appropriate activities, creativity and guided play that build strong early foundations.",
    path: "/courses/nursery",
    color: "#F5A524",
    lift: "md:translate-y-3"
  },
  {
    icon: <GraduationCap size={24} />,
    title: "Primary School",
    subtitle: "Age 6+",
    text: "A well-rounded program building academic foundations while nurturing curiosity and character.",
    path: "/courses/primary",
    color: "#8B5CF6",
    lift: "md:translate-y-0"
  }
];

/* Scroll-reveal hook — fires once when the element enters the viewport */
function useInView(threshold = 0.15) {
  const ref = useRef(null);
  const [inView, setInView] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (typeof IntersectionObserver === "undefined") {
      setInView(true);
      return;
    }
    const obs = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setInView(true);
          obs.unobserve(el);
        }
      },
      { threshold }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, [threshold]);

  return [ref, inView];
}

export default function Advantages() {
  return (
    <>
      <GlobalStyles />

      {/* ============================= ADVANTAGES ============================= */}
      <section className="hero-font relative overflow-hidden bg-gradient-to-b from-[#F3F0FF] via-[#FAF7FF] to-white py-16 md:py-20">
        <MeshBackground variant="a" />

        <div className="relative max-w-6xl mx-auto px-6">
          <SectionHeading eyebrow="Why Families Choose Us" title="Our Advantages" sub="Why parents trust us for their child’s future" />

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 md:gap-6">
            {ADVANTAGES.map((item, i) => (
              <AdvCard key={item.title} index={i} {...item} />
            ))}
          </div>
        </div>
      </section>

      {/* ============================== COURSES ================================ */}
      <section className="hero-font relative overflow-hidden bg-white py-16 md:py-24">
        <MeshBackground variant="b" />

        <div className="relative max-w-6xl mx-auto px-6">
          <SectionHeading eyebrow="A Path That Grows With Them" title="Courses Offered" sub="Learning opportunities designed specifically for each stage of early education" />

          <CourseStaircase />
        </div>
      </section>
    </>
  );
}

/* ------------------------------- Heading ---------------------------------- */

function SectionHeading({ eyebrow, title, sub }) {
  return (
    <div className="text-center mb-10 md:mb-14">
      <span className="glass-pill mx-auto">
        <span className="glass-dot" />
        {eyebrow}
      </span>
      <h2 className="hero-display mt-4 text-3xl md:text-4xl font-semibold text-[#221B45]">
        {title}
      </h2>
      <p className="mt-3 text-[#5D5885] max-w-xl mx-auto text-sm md:text-base">{sub}</p>
    </div>
  );
}

/* --------------------------------- Cards -------------------------------- */

function AdvCard({ icon, title, color, index }) {
  const [ref, inView] = useInView();

  return (
    <div
      ref={ref}
      style={{ transitionDelay: inView ? `${index * 80}ms` : "0ms" }}
      className={`
        glass-card glass-shine group relative rounded-2xl
        transition-all duration-700 ease-out
        ${inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}

        flex items-center gap-4 p-4
        md:flex-col md:text-center md:p-6
        md:hover:-translate-y-1.5
      `}
    >
      <div
        className="glass-chip shrink-0 w-12 h-12 md:w-14 md:h-14 rounded-full flex items-center justify-center md:mx-auto md:mb-3 transition-transform duration-500 group-hover:-translate-y-1 group-hover:rotate-[-6deg]"
        style={{ background: `linear-gradient(150deg, ${color}33, ${color}14)` }}
      >
        <span className="text-lg md:text-xl" style={{ color }}>
          {icon}
        </span>
      </div>

      <p className="text-[15px] md:text-[15px] font-semibold text-[#241E46] leading-snug">
        {title}
      </p>
    </div>
  );
}

/* ------------------------------ Course path ------------------------------ */

function CourseStaircase() {
  const [ref, inView] = useInView(0.2);

  return (
    <div ref={ref} className="relative">
      {/* connecting glass line */}
      <div className="hidden md:block absolute left-0 right-0 top-[3.25rem] h-px overflow-hidden">
        <div
          className="h-full bg-[repeating-linear-gradient(to_right,rgba(124,58,237,0.35)_0,rgba(124,58,237,0.35)_10px,transparent_10px,transparent_18px)] transition-all duration-[1400ms] ease-out"
          style={{ width: inView ? "100%" : "0%" }}
        />
      </div>
      <div className="md:hidden absolute left-6 top-4 bottom-4 w-px bg-[#EDEBFA]" />

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-6 md:items-end">
        {COURSES.map((course, i) => (
          <CourseStep key={course.title} index={i} inView={inView} {...course} />
        ))}
      </div>
    </div>
  );
}

function CourseStep({ icon, title, subtitle, text, path, color, lift, index, inView }) {
  return (
    <div
      className={`glass-card glass-shine relative rounded-2xl p-5 pt-6 md:text-center transition-all duration-700 ease-out ${lift} ${
        inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
      }`}
      style={{ transitionDelay: inView ? `${index * 150 + 150}ms` : "0ms" }}
    >
      <div
        className="glass-chip w-14 h-14 rounded-full flex items-center justify-center md:mx-auto mb-4"
        style={{ background: `linear-gradient(150deg, ${color}40, ${color}18)`, color }}
      >
        {icon}
      </div>

      <span
        className="inline-block text-[11px] font-semibold tracking-wide uppercase px-2.5 py-1 rounded-full mb-2"
        style={{ background: `${color}1A`, color }}
      >
        {subtitle}
      </span>

      <h3 className="hero-display text-lg md:text-xl font-semibold text-[#241E46]">{title}</h3>

      <p className="text-sm text-[#5D5885] mt-2 leading-relaxed max-w-xs md:mx-auto">{text}</p>

      <Link to={path} className="inline-block mt-4">
        <span
          className="glass-cta glass-cta--ghost relative overflow-hidden inline-flex items-center gap-1.5 px-4 py-2 rounded-full text-xs font-semibold transition-all duration-300"
          style={{ color }}
        >
          <span className="relative z-10 flex items-center gap-1.5">
            See more
            <ArrowRight size={13} />
          </span>
        </span>
      </Link>
    </div>
  );
}

/* ------------------------------ Background -------------------------------- */

function MeshBackground({ variant }) {
  const setA = (
    <>
      <div className="absolute -top-24 -left-20 w-80 h-80 rounded-full bg-indigo-300/35 blur-3xl animate-blob-a" />
      <div className="absolute top-10 -right-24 w-72 h-72 rounded-full bg-fuchsia-200/45 blur-3xl animate-blob-b" />
      <div className="absolute -bottom-24 left-1/3 w-64 h-64 rounded-full bg-pink-200/45 blur-3xl animate-blob-c" />
    </>
  );
  const setB = (
    <>
      <div className="absolute top-0 -right-16 w-72 h-72 rounded-full bg-violet-200/40 blur-3xl animate-blob-b" />
      <div className="absolute -bottom-24 -left-16 w-80 h-80 rounded-full bg-indigo-200/40 blur-3xl animate-blob-a" />
    </>
  );
  return <div className="pointer-events-none absolute inset-0 overflow-hidden">{variant === "a" ? setA : setB}</div>;
}

/* ------------------------------ Global styles ----------------------------- */

function GlobalStyles() {
  return (
    <style>{`
      .hero-font, .hero-font * { font-family: "Plus Jakarta Sans", ui-sans-serif, system-ui, sans-serif; }
      .hero-display { font-family: "Fredoka", "Plus Jakarta Sans", ui-sans-serif, system-ui, sans-serif; }

      .glass-pill {
        display: inline-flex;
        align-items: center;
        gap: 8px;
        padding: 8px 16px;
        border-radius: 999px;
        font-weight: 600;
        font-size: 13px;
        color: #4C1D95;
        background: rgba(255,255,255,0.55);
        border: 1px solid rgba(255,255,255,0.8);
        backdrop-filter: blur(14px);
        -webkit-backdrop-filter: blur(14px);
        box-shadow: 0 8px 20px -10px rgba(99,60,201,0.35), inset 0 1px 0 rgba(255,255,255,0.9);
        width: fit-content;
      }
      .glass-dot {
        width: 6px; height: 6px; border-radius: 999px;
        background: #7C3AED;
        box-shadow: 0 0 0 4px rgba(124,58,237,0.18);
      }

      .glass-card {
        background: rgba(255,255,255,0.55);
        border: 1px solid rgba(255,255,255,0.75);
        backdrop-filter: blur(16px);
        -webkit-backdrop-filter: blur(16px);
        box-shadow: 0 10px 26px -14px rgba(99,60,201,0.28), inset 0 1px 0 rgba(255,255,255,0.85);
        transition: box-shadow 0.4s ease, transform 0.4s ease;
      }
      .glass-card:hover {
        box-shadow: 0 18px 34px -14px rgba(99,60,201,0.35), inset 0 1px 0 rgba(255,255,255,0.9);
      }

      .glass-chip {
        border: 1px solid rgba(255,255,255,0.75);
        backdrop-filter: blur(10px);
        -webkit-backdrop-filter: blur(10px);
        box-shadow: inset 0 1px 0 rgba(255,255,255,0.7), 0 6px 14px -8px rgba(99,60,201,0.35);
      }

      /* shine sweep — used on both cards and buttons */
      .glass-shine, .glass-cta {
        position: relative;
        overflow: hidden;
        isolation: isolate;
      }
      .glass-shine::after, .glass-cta::after {
        content: "";
        position: absolute;
        top: 0;
        left: -60%;
        width: 40%;
        height: 100%;
        background: linear-gradient(115deg, transparent, rgba(255,255,255,0.6), transparent);
        transform: skewX(-18deg);
        transition: left 0.75s ease;
        pointer-events: none;
      }
      .glass-shine:hover::after, .glass-cta:hover::after { left: 130%; }

      .glass-cta {
        border: 1px solid rgba(255,255,255,0.55);
        backdrop-filter: blur(14px);
        -webkit-backdrop-filter: blur(14px);
      }
      .glass-cta--ghost {
        background: rgba(255,255,255,0.4);
        box-shadow: 0 8px 18px -10px rgba(79,44,168,0.28), inset 0 1px 0 rgba(255,255,255,0.75);
      }
      .glass-cta--ghost:hover {
        background: rgba(255,255,255,0.6);
        transform: translateY(-2px);
        box-shadow: 0 12px 22px -10px rgba(79,44,168,0.32), inset 0 1px 0 rgba(255,255,255,0.9);
      }

      @keyframes blobA {
        0%, 100% { transform: translate(0,0) scale(1); }
        50% { transform: translate(20px,30px) scale(1.1); }
      }
      @keyframes blobB {
        0%, 100% { transform: translate(0,0) scale(1); }
        50% { transform: translate(-25px,20px) scale(1.08); }
      }
      @keyframes blobC {
        0%, 100% { transform: translate(0,0) scale(1); }
        50% { transform: translate(15px,-20px) scale(1.06); }
      }
      .animate-blob-a { animation: blobA 12s ease-in-out infinite; }
      .animate-blob-b { animation: blobB 14s ease-in-out infinite; }
      .animate-blob-c { animation: blobC 16s ease-in-out infinite; }

      @media (prefers-reduced-motion: reduce) {
        .glass-card, .glass-chip, .glass-shine::after, .glass-cta::after,
        .animate-blob-a, .animate-blob-b, .animate-blob-c {
          animation: none !important;
          transition: none !important;
        }
      }
    `}</style>
  );
}