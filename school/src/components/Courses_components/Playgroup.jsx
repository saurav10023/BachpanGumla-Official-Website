import React, { useEffect, useRef, useState } from "react";
import banner from "./files/playgroup.jpg";

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
    className="mb-3 flex h-10 w-10 items-center justify-center rounded-xl text-lg"
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

const PlayGroup = () => {
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

      {/* MOBILE */}
      <div className="relative lg:hidden">
        <div className="relative mt-4 w-full overflow-hidden rounded-xl">
          <img src={banner} alt="banner" className="h-auto w-full object-cover" />
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
                Play Group
              </h1>
              <p className="mt-1 text-sm font-medium text-white/90">
                Age 1.5 to 3 Years
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* DESKTOP BANNER */}
      <div className="hidden w-full overflow-hidden rounded-b-3xl lg:block">
        <img src={banner} alt="banner" className="h-auto w-full" />
      </div>

      <div className="relative mx-auto max-w-6xl py-5">
        {/* desktop header */}
        <Reveal className="hidden lg:block">
          <div className="mb-10 text-center">
            <div className="mb-4 flex justify-center">
              <EyebrowPill>Early Years</EyebrowPill>
            </div>
            <h1
              className="text-3xl font-bold text-purple-700 md:text-4xl"
              style={{ fontFamily: "'Fredoka', sans-serif" }}
            >
              Play Group
            </h1>
            <p className="mt-2 text-lg font-medium text-gray-600">
              Age 1.5 to 3 Years
            </p>
          </div>
        </Reveal>

        <Reveal>
          <GlassCard className="mb-8">
            <p className="mb-4 leading-relaxed text-gray-700">
              We believe that at this early age, children should experience
              balanced development of all parts of their body, including
              strengthening large muscles, bones, and fine muscles.
            </p>
            <p className="mb-4 leading-relaxed text-gray-700">
              Proper coordination between hands, feet, fingers, eyes, and the
              brain is essential for healthy growth and overall balance.
            </p>
            <p className="leading-relaxed text-gray-700">
              Our activities are carefully designed to meet the unique needs of
              children aged 1.5 to 3 years, fostering holistic growth and
              well-being in a joyful learning environment.
            </p>
          </GlassCard>
        </Reveal>

        {/* activities */}
        <div className="mb-10">
          <Reveal>
            <div className="mb-6 flex justify-center">
              <EyebrowPill>How They Grow</EyebrowPill>
            </div>
            <h2
              className="mb-6 text-center text-2xl font-bold text-gray-800"
              style={{ fontFamily: "'Fredoka', sans-serif" }}
            >
              Developmental Activities
            </h2>
          </Reveal>

          <div className="grid gap-6 md:grid-cols-2">
            <Reveal delay={0}>
              <ActivityCard
                icon="🤸"
                title="Gross Motor Skill Development"
                items={[
                  "Climbing, crawling, and sliding to strengthen large muscles",
                  "Throwing and catching balls for balance and coordination",
                  "Dancing and singing to encourage movement and rhythm",
                ]}
              />
            </Reveal>

            <Reveal delay={90}>
              <ActivityCard
                icon="✋"
                title="Fine Motor Skill Development"
                items={[
                  "Building blocks and puzzles for hand-eye coordination",
                  "Coloring and drawing to boost creativity",
                  "Playing with dough and clay for sensory exploration",
                ]}
              />
            </Reveal>

            <Reveal delay={180}>
              <ActivityCard
                icon="🧠"
                title="Cognitive Development"
                items={[
                  "Storytelling and drama to enhance language skills",
                  "Puzzles and board games for logical thinking",
                  "Nature exploration to build curiosity and observation",
                ]}
              />
            </Reveal>

            <Reveal delay={270}>
              <ActivityCard
                icon="💛"
                title="Social & Emotional Development"
                items={[
                  "Cooperative play to develop sharing and teamwork",
                  "Identifying and expressing emotions",
                  "Building self-confidence and self-regulation",
                ]}
              />
            </Reveal>
          </div>
        </div>

        {/* recognition */}
        <Reveal>
          <GlassCard>
            <h2
              className="mb-4 text-center text-2xl font-bold text-gray-800"
              style={{ fontFamily: "'Fredoka', sans-serif" }}
            >
              Recognition of Letters & Numbers
            </h2>
            <p className="mx-auto max-w-4xl text-center leading-relaxed text-gray-700">
              Integrated seamlessly into our daily activities is the introduction
              of alphabets, numbers, vowel sounds, स्वर–व्यंजन, and more. These
              concepts are presented through engaging, hands-on methods that help
              children recognize and identify the foundational elements of
              language and numeracy, preparing them confidently for future
              learning.
            </p>
          </GlassCard>
        </Reveal>
      </div>
    </div>
  );
};

export default PlayGroup;

function ActivityCard({ icon, title, items }) {
  return (
    <GlassCard>
      <IconChip>{icon}</IconChip>
      <h3 className="mb-3 text-lg font-semibold text-purple-700">{title}</h3>
      <ul className="space-y-2 text-sm leading-relaxed text-gray-700">
        {items.map((item, i) => (
          <li key={i} className="flex gap-2">
            <span
              className="mt-1 flex h-4 w-4 shrink-0 items-center justify-center rounded-full text-[9px] font-bold text-white"
              style={{
                background: "linear-gradient(150deg, #6D28D9, #4F46E5)",
              }}
            >
              ✓
            </span>
            <span>{item}</span>
          </li>
        ))}
      </ul>
    </GlassCard>
  );
}