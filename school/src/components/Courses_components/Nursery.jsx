import React, { useEffect, useRef, useState } from "react";
import banner from "./files/bannernursery.png";

/**
 * Liquid Glass theme — indigo/violet accent (#6D28D9 / #4F46E5)
 * Fonts: Fredoka (headings) + Plus Jakarta Sans (body)
 * Make sure index.html has the Fredoka / Plus Jakarta Sans <link> tags
 * (see Admission.jsx for the exact snippet) — only needs to be added once site-wide.
 */

const Reveal = ({ children, delay = 0, className = "" }) => {
  const ref = useRef(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      setVisible(true);
      return;
    }
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          observer.unobserve(el);
        }
      },
      { threshold: 0.15 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <div
      ref={ref}
      className={className}
      style={{
        opacity: visible ? 1 : 0,
        transform: visible ? "translateY(0)" : "translateY(24px)",
        transition: `opacity 0.7s ease ${delay}ms, transform 0.7s ease ${delay}ms`,
      }}
    >
      {children}
    </div>
  );
};

const EyebrowPill = ({ children }) => (
  <span
    className="inline-flex items-center gap-2 rounded-full px-4 py-2 text-[13px] font-semibold"
    style={{
      background: "rgba(255,255,255,0.55)",
      border: "1px solid rgba(255,255,255,0.8)",
      backdropFilter: "blur(14px)",
      WebkitBackdropFilter: "blur(14px)",
      boxShadow:
        "0 8px 20px -10px rgba(109,40,217,0.35), inset 0 1px 0 rgba(255,255,255,0.9)",
      color: "#4F1D9A",
      fontFamily: "'Plus Jakarta Sans', sans-serif",
    }}
  >
    <span className="h-1.5 w-1.5 rounded-full" style={{ background: "#6D28D9" }} />
    {children}
  </span>
);

const GlassCard = ({ children, className = "" }) => (
  <div
    className={`glass-shine rounded-2xl p-6 ${className}`}
    style={{
      background: "rgba(255,255,255,0.55)",
      border: "1px solid rgba(255,255,255,0.75)",
      backdropFilter: "blur(16px)",
      WebkitBackdropFilter: "blur(16px)",
      boxShadow:
        "0 10px 26px -14px rgba(109,40,217,0.3), inset 0 1px 0 rgba(255,255,255,0.85)",
    }}
  >
    {children}
  </div>
);

const IconChip = ({ children }) => (
  <div
    className="mb-3 flex h-10 w-10 items-center justify-center rounded-xl text-lg font-bold"
    style={{
      background: "linear-gradient(150deg, rgba(109,40,217,0.2), rgba(79,70,229,0.08))",
      border: "1px solid rgba(255,255,255,0.75)",
      backdropFilter: "blur(10px)",
      WebkitBackdropFilter: "blur(10px)",
      boxShadow:
        "inset 0 1px 0 rgba(255,255,255,0.7), 0 6px 14px -8px rgba(109,40,217,0.35)",
      color: "#4F1D9A",
    }}
  >
    {children}
  </div>
);

const GlobalStyle = () => (
  <style>{`
    @keyframes drift1 {
      0%, 100% { transform: translate(0, 0) scale(1); }
      50% { transform: translate(40px, 30px) scale(1.08); }
    }
    @keyframes drift2 {
      0%, 100% { transform: translate(0, 0) scale(1); }
      50% { transform: translate(-30px, 25px) scale(1.05); }
    }
    @keyframes drift3 {
      0%, 100% { transform: translate(0, 0) scale(1); }
      50% { transform: translate(20px, -35px) scale(1.1); }
    }
    .blob1 { animation: drift1 15s ease-in-out infinite; }
    .blob2 { animation: drift2 13s ease-in-out infinite; }
    .blob3 { animation: drift3 17s ease-in-out infinite; }

    .glass-shine { position: relative; overflow: hidden; isolation: isolate; }
    .glass-shine::after {
      content: "";
      position: absolute;
      top: 0; left: -60%;
      width: 40%; height: 100%;
      background: linear-gradient(115deg, transparent, rgba(255,255,255,0.6), transparent);
      transform: skewX(-18deg);
      transition: left 0.75s ease;
      pointer-events: none;
    }
    .glass-shine:hover::after { left: 130%; }

    @media (prefers-reduced-motion: reduce) {
      .blob1, .blob2, .blob3 { animation: none !important; }
      .glass-shine::after { transition: none !important; }
    }
  `}</style>
);

const Nursery = () => {
  return (
    <div
      className="relative overflow-hidden bg-indigo-50 px-4 md:px-10"
      style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}
    >
      <GlobalStyle />

      {/* Drifting gradient blobs */}
      <div
        className="blob1 pointer-events-none absolute -top-24 -left-24 h-80 w-80 rounded-full blur-3xl"
        style={{ background: "rgba(109,40,217,0.28)" }}
      />
      <div
        className="blob2 pointer-events-none absolute top-1/3 -right-32 h-96 w-96 rounded-full blur-3xl"
        style={{ background: "rgba(79,70,229,0.22)" }}
      />
      <div
        className="blob3 pointer-events-none absolute -bottom-28 left-1/4 h-72 w-72 rounded-full blur-3xl"
        style={{ background: "rgba(109,40,217,0.18)" }}
      />

      {/* mobile header */}
      <div className="relative lg:hidden">
        <div className="relative mt-4 h-55 w-full overflow-hidden rounded-xl">
          <img src={banner} alt="banner" className="h-full w-full object-cover" />
          <div className="absolute inset-0 flex flex-col items-center justify-center px-4 text-center">
            <div
              className="rounded-2xl px-6 py-4"
              style={{
                background: "rgba(20,10,40,0.35)",
                border: "1px solid rgba(255,255,255,0.35)",
                backdropFilter: "blur(10px)",
                WebkitBackdropFilter: "blur(10px)",
                boxShadow: "inset 0 1px 0 rgba(255,255,255,0.25)",
              }}
            >
              <h1
                className="text-2xl font-bold text-white"
                style={{ fontFamily: "'Fredoka', sans-serif" }}
              >
                Kindergarten (Foundational -1)
              </h1>
              <p className="mt-1 text-sm font-medium text-white/90">
                Nursery • LKG • UKG
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* desktop header */}
      <div className="hidden lg:block">
        <div className="h-auto w-full overflow-hidden rounded-b-3xl">
          <img src={banner} alt="banner" />
        </div>
      </div>

      <div className="relative mx-auto max-w-6xl py-5">
        {/* title desktop */}
        <Reveal className="hidden lg:block">
          <div className="mb-10 text-center">
            <div className="mb-4 flex justify-center">
              <EyebrowPill>Foundational Stage</EyebrowPill>
            </div>
            <h1
              className="text-3xl font-bold text-purple-700 md:text-4xl"
              style={{ fontFamily: "'Fredoka', sans-serif" }}
            >
              Kindergarten (Foundational -1)
            </h1>
            <p className="mt-2 text-lg font-medium text-gray-600">
              Nursery • LKG • UKG
            </p>
          </div>
        </Reveal>

        <Reveal>
          <GlassCard className="mb-8">
            <p className="mb-4 leading-relaxed text-gray-700">
              At <span className="font-semibold">BTLK</span>, we believe that every
              child is unique and develops at their own pace. Our activities are
              designed to cater to different learning styles and provide all
              children with the support they need to succeed.
            </p>
            <p className="leading-relaxed text-gray-700">
              We encourage parents to actively participate in their children's
              development by playing, reading books, exploring nature, and
              building strong bonds through positive daily interactions.
            </p>
          </GlassCard>
        </Reveal>

        {/* curriculum */}
        <div className="mb-10">
          <Reveal>
            <div className="mb-6 flex justify-center">
              <EyebrowPill>What They Learn</EyebrowPill>
            </div>
            <h2
              className="mb-6 text-center text-2xl font-bold text-gray-800"
              style={{ fontFamily: "'Fredoka', sans-serif" }}
            >
              Curriculum Overview
            </h2>
          </Reveal>

          <div className="grid gap-6 md:grid-cols-2">
            {[
              {
                icon: "अ",
                title: "Language & Literacy (English / हिंदी)",
                desc:
                  "Children develop reading, writing, speaking, and listening skills through phonics and मात्रा (ध्वनि).",
              },
              {
                icon: "🌍",
                title: "EVS / Social Studies",
                desc:
                  "Children explore surroundings, life skills, and harmony with nature.",
              },
              {
                icon: "123",
                title: "Mathematics",
                desc: "Basic concepts like big-small, more-less, and numbers 0–9.",
              },
              {
                icon: "🔬",
                title: "Science",
                desc: "Encourages questioning, observation, and independent discovery.",
              },
            ].map((item, i) => (
              <Reveal key={i} delay={i * 90}>
                <GlassCard>
                  <IconChip>{item.icon}</IconChip>
                  <h3 className="mb-2 text-lg font-semibold text-purple-700">
                    {item.title}
                  </h3>
                  <p className="text-sm leading-relaxed text-gray-700">{item.desc}</p>
                </GlassCard>
              </Reveal>
            ))}
          </div>
        </div>

        {/* activities */}
        <Reveal>
          <GlassCard className="mb-10">
            <h2
              className="mb-4 text-center text-2xl font-bold text-gray-800"
              style={{ fontFamily: "'Fredoka', sans-serif" }}
            >
              Learning Through Activities
            </h2>

            <ul className="mx-auto grid max-w-3xl gap-3 text-sm text-gray-700 md:grid-cols-2 md:text-base">
              {[
                ["Circle Time", "Vocabulary & discussions"],
                ["Art & Craft", "Creativity & fine motor skills"],
                ["Music & Dance", "Emotional expression"],
                ["ICT", "Age-appropriate digital exposure"],
              ].map(([label, desc], i) => (
                <li key={i} className="flex gap-3">
                  <span
                    className="mt-1 flex h-5 w-5 shrink-0 items-center justify-center rounded-full text-[11px] font-bold text-white"
                    style={{
                      background: "linear-gradient(150deg, #6D28D9, #4F46E5)",
                      boxShadow: "0 4px 10px -4px rgba(109,40,217,0.5)",
                    }}
                  >
                    ✓
                  </span>
                  <span>
                    <strong>{label}:</strong> {desc}
                  </span>
                </li>
              ))}
            </ul>
          </GlassCard>
        </Reveal>

        {/* special initiatives */}
        <div className="mb-10">
          <Reveal>
            <h2
              className="mb-6 text-center text-2xl font-bold text-gray-800"
              style={{ fontFamily: "'Fredoka', sans-serif" }}
            >
              Special Initiatives
            </h2>
          </Reveal>

          <div className="grid gap-6 md:grid-cols-2">
            <Reveal delay={0}>
              <GlassCard>
                <IconChip>🎒</IconChip>
                <h3 className="mb-2 text-lg font-semibold text-purple-700">
                  Saturday – No Bag Day
                </h3>
                <p className="text-sm text-gray-700">
                  Creativity-filled experiential learning.
                </p>
              </GlassCard>
            </Reveal>
            <Reveal delay={90}>
              <GlassCard>
                <IconChip>🌱</IconChip>
                <h3 className="mb-2 text-lg font-semibold text-purple-700">
                  Kalpvriksh – Social Service
                </h3>
                <p className="text-sm text-gray-700">
                  Building compassion and responsibility.
                </p>
              </GlassCard>
            </Reveal>
          </div>
        </div>

        {/* health */}
        <Reveal>
          <GlassCard>
            <h2
              className="mb-4 text-center text-2xl font-bold text-gray-800"
              style={{ fontFamily: "'Fredoka', sans-serif" }}
            >
              Physical Education & Health
            </h2>
            <p className="mb-3 text-gray-700">
              Yoga, drills, karate, and sports by trained specialists.
            </p>
            <p className="text-gray-700">
              <strong>Healthy School Campaign:</strong> Regular health check-ups.
            </p>
          </GlassCard>
        </Reveal>
      </div>
    </div>
  );
};

export default Nursery;