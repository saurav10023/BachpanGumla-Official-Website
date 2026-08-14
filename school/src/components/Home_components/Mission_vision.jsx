import React, { useEffect, useRef, useState } from "react";
import { FaEye, FaBullseye, FaAward } from "react-icons/fa";

/* -------------------------------------------------------------------------
   Design notes — same liquid-glass system as Hero / Advantages:
   drifting gradient-mesh blobs behind frosted glass cards with inset
   highlights and a shine sweep on hover. The icon now sits directly in a
   glass chip inside the card, with a soft color-tinted glow behind it —
   no separate pin/clip graphic needed.

   Same font pairing — Fredoka (display) + Plus Jakarta Sans (body). Add
   once to index.html <head> if not already there:

   <link rel="preconnect" href="https://fonts.googleapis.com">
   <link href="https://fonts.googleapis.com/css2?family=Fredoka:wght@500;600;700&family=Plus+Jakarta+Sans:wght@400;500;600;700&display=swap" rel="stylesheet">
------------------------------------------------------------------------- */

const PILLARS = [
  {
    icon: <FaEye />,
    title: "Vision",
    text: "To create a nurturing and inspiring learning environment that empowers children to become confident, compassionate, and lifelong learners.",
    color: "#2E90FA"
  },
  {
    icon: <FaBullseye />,
    title: "Mission",
    text: "Our mission is to provide holistic education through innovative teaching, moral values, and a child-centric approach to learning.",
    color: "#8B5CF6"
  },
  {
    icon: <FaAward />,
    title: "Values",
    text: "We value integrity, respect, creativity, inclusiveness, and excellence in every aspect of a child’s development.",
    color: "#F5A524"
  }
];

/* Scroll-reveal hook — fires once when the element enters the viewport */
function useInView(threshold = 0.2) {
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

export default function VisionMission() {
  return (
    <section className="hero-font relative overflow-hidden bg-gradient-to-b from-[#F3F0FF] via-[#FAF7FF] to-white py-16 md:py-24">
      <GlobalStyles />
      <MeshBackground />

      <div className="relative max-w-6xl mx-auto px-6">
        {/* title */}
        <div className="text-center mb-16 md:mb-20">
          <span className="glass-pill mx-auto">
            <span className="glass-dot" />
            What Drives Us
          </span>
          <h2 className="hero-display mt-4 text-3xl md:text-4xl font-semibold text-[#221B45]">
            Our Foundation
          </h2>
          <p className="mt-3 text-[#5D5885] max-w-xl mx-auto text-sm md:text-base">
            Building young minds with purpose, passion, and principles
          </p>
        </div>

        {/* CARDS */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10 md:gap-8">
          {PILLARS.map((p, i) => (
            <Card key={p.title} index={i} {...p} />
          ))}
        </div>
      </div>
    </section>
  );
}

function Card({ icon, title, text, color, index }) {
  const [ref, inView] = useInView();

  return (
    <div
      ref={ref}
      style={{ transitionDelay: inView ? `${index * 120}ms` : "0ms" }}
      className={`
        glass-card glass-shine relative rounded-2xl pt-10 pb-9 px-6 text-center
        transition-all duration-700 ease-out
        hover:-translate-y-2
        ${inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}
      `}
    >
      {/* soft glow behind the icon, tinted per pillar */}
      <div
        className="pointer-events-none absolute top-2 left-1/2 -translate-x-1/2 w-28 h-20 rounded-full blur-2xl opacity-60"
        style={{ background: color }}
      />

      <div
        className="glass-chip w-16 h-16 mx-auto rounded-2xl flex items-center justify-center mb-5 relative"
        style={{ background: `linear-gradient(150deg, ${color}38, ${color}14)` }}
      >
        <span className="text-2xl" style={{ color }}>
          {icon}
        </span>
      </div>

      <h3 className="hero-display text-xl font-semibold text-[#221B45] mb-3">{title}</h3>

      <p className="text-[#5D5885] text-sm leading-relaxed">{text}</p>
    </div>
  );
}

/* ------------------------------ Background -------------------------------- */

function MeshBackground() {
  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden">
      <div className="absolute -top-20 -right-20 w-80 h-80 rounded-full bg-fuchsia-200/40 blur-3xl animate-blob-b" />
      <div className="absolute -bottom-24 -left-20 w-72 h-72 rounded-full bg-indigo-300/35 blur-3xl animate-blob-a" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-64 h-64 rounded-full bg-pink-200/30 blur-3xl animate-blob-c" />
    </div>
  );
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
        background: rgba(255,255,255,0.6);
        border: 1px solid rgba(255,255,255,0.75);
        backdrop-filter: blur(16px);
        -webkit-backdrop-filter: blur(16px);
        box-shadow: 0 10px 26px -14px rgba(99,60,201,0.28), inset 0 1px 0 rgba(255,255,255,0.85);
        transition: box-shadow 0.4s ease, transform 0.4s ease;
      }
      .glass-card:hover {
        box-shadow: 0 20px 36px -14px rgba(99,60,201,0.38), inset 0 1px 0 rgba(255,255,255,0.9);
      }

      .glass-chip {
        border: 1px solid rgba(255,255,255,0.75);
        backdrop-filter: blur(10px);
        -webkit-backdrop-filter: blur(10px);
        box-shadow: inset 0 1px 0 rgba(255,255,255,0.7), 0 6px 14px -8px rgba(99,60,201,0.35);
        background: rgba(255,255,255,0.65);
      }

      .glass-shine { position: relative; overflow: hidden; isolation: isolate; }
      .glass-shine::after {
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
      .glass-shine:hover::after { left: 130%; }

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
        .glass-card, .glass-chip, .glass-shine::after,
        .animate-blob-a, .animate-blob-b, .animate-blob-c {
          animation: none !important;
          transition: none !important;
        }
      }
    `}</style>
  );
}