import React from "react";
import heroImage from "./files/hero-boy2.png";
import brain from "./files/brain-logo.avif";
import growth from "./files/growth-icon-flat.avif";
import { Link } from "react-router-dom";
import books from "./files/books.png"
import bulb from "./files/bulb.png"
import color from "./files/color.png"
import testtube from "./files/testtube.png"

/* -------------------------------------------------------------------------
   Design notes:

   "Liquid glass" direction — soft, slow-morphing gradient blobs behind
   frosted, translucent panels (backdrop-blur + hairline white borders +
   inner highlight). Everything that reads as a "surface" (eyebrow pill,
   buttons, stat card, floating icon chips, the hero stage itself) is glass;
   everything that reads as "ink" (headline, body copy) stays crisp on top.

   Same font pairing as the rest of the site — Fredoka for display,
   Plus Jakarta Sans for body/utility. Add once to index.html <head>:

   <link rel="preconnect" href="https://fonts.googleapis.com">
   <link href="https://fonts.googleapis.com/css2?family=Fredoka:wght@500;600;700&family=Plus+Jakarta+Sans:wght@400;500;600;700&display=swap" rel="stylesheet">
------------------------------------------------------------------------- */

const CTAS = [
  { label: "Play Group", to: "courses/playgroup" },
  { label: "Kindergarten", to: "courses/nursery" },
  { label: "Primary School", to: "courses/primary" }
];

const STATS = [
  { value: "400+", label: "Students" },
  { value: "25+", label: "Qualified Teachers" },
  { value: "30+", label: "Support Staff" }
];

export default function Hero() {
  return (
    <section className="hero-font relative overflow-hidden bg-gradient-to-b from-[#F3F0FF] via-[#FAF7FF] to-white md:h-screen md:max-h-[860px] md:min-h-[620px]">
      <GlobalStyles />
      <MeshBackground />

      <div className="relative h-full max-w-7xl mx-auto px-4 sm:px-6 py-8 md:py-6 grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-10 items-center">
        {/* ------------------------------- LEFT ------------------------------- */}
        <div className="flex flex-col justify-center text-center md:text-left hero-in" style={{ animationDelay: "60ms" }}>
          <span className="glass-pill mx-auto md:mx-0">
            <span className="glass-dot" />
            Welcome to Our School
          </span>

          <h1 className="hero-display mt-3 text-3xl sm:text-4xl md:text-[2.6rem] font-semibold text-[#221B45] leading-[1.12]">
            Nurturing Minds <br />
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-indigo-600 via-violet-600 to-fuchsia-500">
              Academically, Socially and Emotionally
            </span>
          </h1>

          {/* mobile hero stage */}
          <div className="relative flex justify-center mt-5 mb-4 md:hidden hero-in" style={{ animationDelay: "140ms" }}>
            <GlassStage size="small">
              <img src={heroImage} alt="Happy Student" className="relative z-10 max-h-52 drop-shadow-[0_20px_30px_rgba(99,60,201,0.25)]" />
              <FloatingChips scale="small" />
            </GlassStage>
          </div>

          <p className="text-[#5D5885] mt-2 md:mt-3 max-w-md mx-auto md:mx-0 text-sm leading-relaxed">
            We believe early childhood education should nurture curiosity,
            creativity, and confidence in a safe and joyful environment.
          </p>

          {/* CTAs */}
          <div className="mt-5 grid grid-cols-1 sm:grid-cols-2 md:flex gap-2.5 justify-center md:justify-start">
            {CTAS.map((cta, i) => (
              <Link key={cta.to} to={cta.to} className="w-full md:w-auto">
                <GlassButton solid={i === 0}>{cta.label}</GlassButton>
              </Link>
            ))}
          </div>

          {/* stats */}
          <div className="glass-card mt-5 md:mt-6 grid grid-cols-3 gap-4 text-center md:text-left rounded-2xl p-4">
            {STATS.map((s, i) => (
              <div key={s.label} className={i !== 0 ? "border-l border-white/60 pl-4" : ""}>
                <h3 className="hero-display text-lg md:text-xl font-semibold text-[#221B45]">{s.value}</h3>
                <p className="text-xs text-[#6E6892] mt-0.5">{s.label}</p>
              </div>
            ))}
          </div>
        </div>

        {/* ------------------------------- RIGHT ------------------------------ */}
        <div className="relative hidden md:flex justify-center hero-in" style={{ animationDelay: "220ms" }}>
          <GlassStage size="large">
            <img
              src={heroImage}
              alt="Happy Student"
              className="relative z-10 max-h-[24rem] drop-shadow-[0_30px_40px_rgba(99,60,201,0.28)]"
            />
            <FloatingChips scale="large" />
          </GlassStage>
        </div>
      </div>
    </section>
  );
}

/* -------------------------------- Button ---------------------------------- */

function GlassButton({ children, solid }) {
  return (
    <button
      className={`glass-cta relative overflow-hidden w-full md:w-auto px-5 py-2.5 rounded-full font-semibold text-sm transition-all duration-300 ${
        solid ? "glass-cta--solid text-white" : "glass-cta--ghost text-[#4C1D95]"
      }`}
    >
      <span className="relative z-10">{children}</span>
    </button>
  );
}

/* --------------------------------- Pieces -------------------------------- */

function GlassStage({ children, size }) {
  const dims = size === "large" ? "w-[21rem] h-[21rem] lg:w-[23rem] lg:h-[23rem]" : "w-56 h-56";
  return (
    <div className={`relative flex items-center justify-center ${dims}`}>
      {/* morphing gradient core */}
      <div className="absolute inset-0 rounded-[45%_55%_60%_40%/50%_45%_55%_50%] bg-gradient-to-br from-indigo-300/70 via-fuchsia-200/60 to-pink-300/70 blur-[2px] animate-blob-slow" />
      {/* glass ring */}
      <div className="absolute inset-3 rounded-full border border-white/70 bg-white/25 backdrop-blur-2xl shadow-[inset_0_1px_1px_rgba(255,255,255,0.9),0_20px_45px_-10px_rgba(99,60,201,0.35)]" />
      {/* specular highlight */}
      <div className="absolute top-4 left-8 w-16 h-8 rounded-full bg-white/60 blur-md rotate-12" />
      {children}
    </div>
  );
}

function FloatingChips({ scale }) {
  const large = scale === "large";
  return (
    <>
      <GlassChip
        className={`${large ? "top-6 right-2 h-14 w-14 text-2xl" : "top-2 -right-2 h-11 w-11 text-lg"}`}
        delay="0s"
      >
        <img src={books} alt="growth" className="w-full h-full object-contain" />
      </GlassChip>

      <GlassChip
        className={`${large ? "bottom-16 -left-4 h-16 w-16 text-3xl" : "bottom-10 -left-2 h-12 w-12 text-xl"}`}
        delay="0.6s"
      >
        <img src={color} alt="growth" className="w-full h-full object-contain" />
      </GlassChip>

      <GlassChip
        className={`${large ? "-bottom-2 right-4 h-20 w-20 p-4" : "-bottom-1 right-2 h-14 w-14 p-2.5"}`}
        delay="1.1s"
      >
        <img src={testtube} alt="growth" className="w-full h-full object-contain" />
      </GlassChip>

      <GlassChip
        className={`${large ? "top-10 left-2 h-14 w-14 p-3" : "top-0 left-0 h-11 w-11 p-2"}`}
        delay="1.6s"
      >
        <img src={bulb} alt="brain" className="w-full h-full object-contain" />
      </GlassChip>
    </>
  );
}

function GlassChip({ children, className, delay }) {
  return (
    <div
      className={`glass-chip absolute z-20 flex items-center justify-center rounded-full text-indigo-700 ${className}`}
      style={{ animationDelay: delay }}
    >
      {children}
    </div>
  );
}

function MeshBackground() {
  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden">
      <div className="absolute -top-24 -left-20 w-80 h-80 rounded-full bg-indigo-300/40 blur-3xl animate-blob-a" />
      <div className="absolute top-6 -right-20 w-72 h-72 rounded-full bg-fuchsia-200/50 blur-3xl animate-blob-b" />
      <div className="absolute -bottom-20 left-1/3 w-64 h-64 rounded-full bg-pink-200/50 blur-3xl animate-blob-c" />
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
        background: rgba(255,255,255,0.5);
        border: 1px solid rgba(255,255,255,0.75);
        backdrop-filter: blur(18px);
        -webkit-backdrop-filter: blur(18px);
        box-shadow: 0 10px 30px -12px rgba(99,60,201,0.25), inset 0 1px 0 rgba(255,255,255,0.9);
      }

      .glass-chip {
        background: rgba(255,255,255,0.55);
        border: 1px solid rgba(255,255,255,0.8);
        backdrop-filter: blur(12px);
        -webkit-backdrop-filter: blur(12px);
        box-shadow: 0 12px 24px -10px rgba(99,60,201,0.35), inset 0 1px 0 rgba(255,255,255,0.9);
        animation: chipFloat 5.5s ease-in-out infinite;
      }

      .glass-cta {
        border: 1px solid rgba(255,255,255,0.55);
        backdrop-filter: blur(14px);
        -webkit-backdrop-filter: blur(14px);
        isolation: isolate;
      }
      .glass-cta::before {
        content: "";
        position: absolute;
        inset: 0;
        border-radius: inherit;
        background: linear-gradient(180deg, rgba(255,255,255,0.55) 0%, rgba(255,255,255,0) 55%);
        pointer-events: none;
      }
      .glass-cta::after {
        content: "";
        position: absolute;
        top: 0;
        left: -60%;
        width: 40%;
        height: 100%;
        background: linear-gradient(115deg, transparent, rgba(255,255,255,0.75), transparent);
        transform: skewX(-18deg);
        transition: left 0.75s ease;
        pointer-events: none;
      }
      .glass-cta:hover::after { left: 130%; }

      .glass-cta--solid {
        background: linear-gradient(135deg, rgba(109,40,217,0.72) 0%, rgba(79,70,229,0.72) 100%);
        box-shadow: 0 12px 26px -8px rgba(79,44,168,0.55), inset 0 1px 0 rgba(255,255,255,0.4);
      }
      .glass-cta--solid:hover {
        transform: translateY(-2px);
        box-shadow: 0 18px 32px -8px rgba(79,44,168,0.65), inset 0 1px 0 rgba(255,255,255,0.5);
      }
      .glass-cta--ghost {
        background: rgba(255,255,255,0.32);
        box-shadow: 0 10px 22px -10px rgba(79,44,168,0.3), inset 0 1px 0 rgba(255,255,255,0.7);
      }
      .glass-cta--ghost:hover {
        background: rgba(255,255,255,0.5);
        transform: translateY(-2px);
        box-shadow: 0 14px 26px -10px rgba(79,44,168,0.35), inset 0 1px 0 rgba(255,255,255,0.85);
      }

      .hero-in {
        opacity: 0;
        animation: heroIn 0.8s ease-out forwards;
      }

      @keyframes heroIn {
        from { opacity: 0; transform: translateY(16px); }
        to { opacity: 1; transform: translateY(0); }
      }
      @keyframes chipFloat {
        0%, 100% { transform: translateY(0) rotate(0deg); }
        50% { transform: translateY(-10px) rotate(3deg); }
      }
      @keyframes blobSlow {
        0%, 100% { border-radius: 45% 55% 60% 40% / 50% 45% 55% 50%; transform: scale(1); }
        50% { border-radius: 60% 40% 45% 55% / 45% 55% 40% 60%; transform: scale(1.04); }
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
      .animate-blob-slow { animation: blobSlow 9s ease-in-out infinite; }
      .animate-blob-a { animation: blobA 12s ease-in-out infinite; }
      .animate-blob-b { animation: blobB 14s ease-in-out infinite; }
      .animate-blob-c { animation: blobC 16s ease-in-out infinite; }

      @media (prefers-reduced-motion: reduce) {
        .hero-in, .glass-chip, .animate-blob-slow, .animate-blob-a, .animate-blob-b, .animate-blob-c {
          animation: none !important;
        }
        .hero-in { opacity: 1; transform: none; }
      }
    `}</style>
  );
}