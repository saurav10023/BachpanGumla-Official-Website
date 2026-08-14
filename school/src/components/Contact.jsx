import React, { useEffect, useRef, useState } from "react";
import { Mail, Phone, MapPin } from "lucide-react";
import { Link } from "react-router-dom";
import FAQSection from "./Faq";

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
    className={`glass-shine rounded-2xl p-6 sm:p-7 ${className}`}
    style={{
      background: "rgba(255,255,255,0.55)",
      border: "1px solid rgba(255,255,255,0.75)",
      backdropFilter: "blur(16px)",
      WebkitBackdropFilter: "blur(16px)",
      boxShadow:
        "0 10px 26px -14px rgba(109,40,217,0.3), inset 0 1px 0 rgba(255,255,255,0.85)",
      transition: "transform 0.3s ease, box-shadow 0.3s ease",
    }}
  >
    {children}
  </div>
);

const IconChip = ({ children }) => (
  <div
    className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl"
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
    .glass-shine:hover { transform: translateY(-4px); }

    .glass-btn-primary {
      background: linear-gradient(135deg, rgba(109,40,217,0.9), rgba(79,70,229,0.9));
      border: 1px solid rgba(255,255,255,0.4);
      box-shadow: 0 10px 24px -10px rgba(79,70,229,0.55), inset 0 1px 0 rgba(255,255,255,0.35);
      transition: transform 0.25s ease, box-shadow 0.25s ease;
    }
    .glass-btn-primary:hover {
      transform: translateY(-2px);
      box-shadow: 0 14px 30px -10px rgba(79,70,229,0.65), inset 0 1px 0 rgba(255,255,255,0.45);
    }
    .glass-btn-primary:active { transform: scale(0.96); }

    @media (prefers-reduced-motion: reduce) {
      .blob1, .blob2, .blob3 { animation: none !important; }
      .glass-shine::after { transition: none !important; }
    }
  `}</style>
);

const ContactUs = () => {
  return (
    <section
      className="relative w-full overflow-hidden bg-indigo-50 px-4 py-14 sm:px-6 sm:py-16 lg:px-12 lg:py-20"
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

      <div className="relative mx-auto max-w-7xl">
        <Reveal>
          <div className="mb-10 text-center sm:mb-14">
            <div className="mb-4 flex justify-center">
              <EyebrowPill>Get In Touch</EyebrowPill>
            </div>
            <h2
              className="text-3xl font-bold text-indigo-700 sm:text-4xl lg:text-5xl"
              style={{ fontFamily: "'Fredoka', sans-serif" }}
            >
              Contact Us
            </h2>
            <p className="mx-auto mt-4 max-w-2xl text-base text-gray-600 sm:text-lg">
              If you have any questions, simply use the following contact details
            </p>
          </div>
        </Reveal>

        {/* Contact */}
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 lg:gap-8">
          {/* Address */}
          <Reveal delay={0}>
            <GlassCard>
              <div className="mb-5 flex items-center gap-3">
                <IconChip>
                  <MapPin className="h-6 w-6" />
                </IconChip>
                <h3 className="text-lg font-semibold text-indigo-700 sm:text-xl">
                  Campuses
                </h3>
              </div>

              <p className="mb-4 text-sm leading-relaxed text-gray-700 sm:text-base">
                <span className="font-semibold">Play School Campus:</span>
                <br />
                Old State Bus Depot, Dunduria,
                <br />
                Lohardaga Road, Gumla
              </p>

              <p className="text-sm leading-relaxed text-gray-700 sm:text-base">
                <span className="font-semibold">Primary School Campus:</span>
                <br />
                Bank Colony, Dunduria,
                <br />
                Lohardaga Road, Gumla
              </p>
            </GlassCard>
          </Reveal>

          <Reveal delay={90}>
            <GlassCard>
              <div className="mb-5 flex items-center gap-3">
                <IconChip>
                  <Mail className="h-6 w-6" />
                </IconChip>
                <h3 className="text-lg font-semibold text-indigo-700 sm:text-xl">
                  Email
                </h3>
              </div>
              <p className="wrap-break-word text-sm text-gray-700 sm:text-lg">
                bachpangumla@gmail.com
              </p>
            </GlassCard>
          </Reveal>

          <Reveal delay={180}>
            <GlassCard>
              <div className="mb-5 flex items-center gap-3">
                <IconChip>
                  <Phone className="h-6 w-6" />
                </IconChip>
                <h3 className="text-lg font-semibold text-indigo-700 sm:text-xl">
                  Phone
                </h3>
              </div>
              <p className="text-sm text-gray-700 sm:text-lg">
                1. +91 96088 81888
              </p>
              <p className="mt-1 text-sm text-gray-700 sm:text-lg">
                2. +91 65243 18721
              </p>
            </GlassCard>
          </Reveal>
        </div>

        <Reveal delay={100}>
          <div className="mt-12 text-center sm:mt-16">
            <p className="mb-6 text-sm text-gray-600 sm:text-base">
              We're happy to help you with admissions, queries, and visits.
            </p>

            <Link
              to="https://btlk.scientificstudy.in/online/admissionenquiry?key=btlk&tab=admissionenquiry"
              className="inline-block"
            >
              <button className="glass-shine glass-btn-primary rounded-full px-8 py-3 font-semibold text-white sm:px-10 sm:py-4">
                Get in Touch
              </button>
            </Link>
          </div>
        </Reveal>
      </div>

      <div className="relative mt-16 sm:mt-20">
        <FAQSection />
      </div>
    </section>
  );
};

export default ContactUs;