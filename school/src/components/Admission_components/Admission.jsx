import React, { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";

/**
 * Liquid Glass theme — indigo/violet accent (#6D28D9 / #4F46E5)
 * Fonts: Fredoka (headings) + Plus Jakarta Sans (body)
 * Add once, globally, in index.html:
 * <link rel="preconnect" href="https://fonts.googleapis.com">
 * <link href="https://fonts.googleapis.com/css2?family=Fredoka:wght@500;600;700&family=Plus+Jakarta+Sans:wght@400;500;600;700&display=swap" rel="stylesheet">
 */

// Scroll-triggered fade-up wrapper, staggered, respects prefers-reduced-motion
const Reveal = ({ children, delay = 0, className = "" }) => {
  const ref = useRef(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const prefersReduced = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;

    if (prefersReduced) {
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
    <span
      className="h-1.5 w-1.5 rounded-full"
      style={{ background: "#6D28D9" }}
    />
    {children}
  </span>
);

const GlassCard = ({ children, className = "" }) => (
  <div
    className={`glass-shine rounded-3xl p-6 md:p-8 ${className}`}
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

const BulletItem = ({ children }) => (
  <li className="flex gap-3 text-sm md:text-base leading-relaxed text-gray-700">
    <span
      className="mt-1 flex h-5 w-5 shrink-0 items-center justify-center rounded-full text-[11px] font-bold text-white"
      style={{
        background: "linear-gradient(150deg, #6D28D9, #4F46E5)",
        boxShadow: "0 4px 10px -4px rgba(109,40,217,0.5)",
      }}
    >
      ✓
    </span>
    <span>{children}</span>
  </li>
);

const Admission = () => {
  return (
    <div className="relative overflow-hidden bg-indigo-50 px-4 py-10 md:px-10">
      {/* Drifting gradient blobs */}
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

        .glass-btn-secondary {
          background: rgba(255,255,255,0.55);
          border: 1px solid rgba(255,255,255,0.8);
          backdrop-filter: blur(14px);
          -webkit-backdrop-filter: blur(14px);
          box-shadow: 0 8px 20px -10px rgba(109,40,217,0.25), inset 0 1px 0 rgba(255,255,255,0.9);
          transition: background 0.25s ease, transform 0.25s ease;
        }
        .glass-btn-secondary:hover {
          background: rgba(255,255,255,0.75);
          transform: translateY(-2px);
        }

        @media (prefers-reduced-motion: reduce) {
          .blob1, .blob2, .blob3 { animation: none !important; }
          .glass-shine::after { transition: none !important; }
        }
      `}</style>

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

      <div
        className="relative mx-auto max-w-6xl"
        style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}
      >
        {/* Header */}
        <Reveal>
          <div className="mb-10 text-center">
            <div className="mb-4 flex justify-center">
              <EyebrowPill>Admissions Open</EyebrowPill>
            </div>
            <h1
              className="text-3xl font-bold text-purple-700 md:text-4xl"
              style={{ fontFamily: "'Fredoka', sans-serif" }}
            >
              Admission Procedure
            </h1>
            <p className="mt-2 text-lg font-medium text-gray-600">
              Online & Offline Registration Process
            </p>
          </div>
        </Reveal>

        {/* Online Admission */}
        <div className="mb-10 text-lg">
          <Reveal>
            <h2
              className="mb-6 text-center text-2xl font-bold text-gray-800"
              style={{ fontFamily: "'Fredoka', sans-serif" }}
            >
              Online Admission / Registration
            </h2>
          </Reveal>

          <Reveal delay={100}>
            <GlassCard>
              <p className="mb-4 leading-relaxed text-gray-700">
                Complete the online application by submitting the required
                documents. Applicants may be required to attend an entrance
                test and interview for final selection.
              </p>

              <ul className="space-y-3">
                <BulletItem>
                  Visit the school website and click on the{" "}
                  <span className="font-semibold">"Admissions"</span> tab.
                </BulletItem>
                <BulletItem>
                  Fill in all required details including student information,
                  parent/guardian details, and upload supporting documents.
                </BulletItem>
                <BulletItem>
                  Upload documents such as birth certificate, passport-size
                  photographs, Aadhaar card copies, previous school
                  transcripts, and other required records.
                </BulletItem>
                <BulletItem>
                  Ensure the date of birth and all sensitive information are
                  entered correctly before submission.
                </BulletItem>
                <BulletItem>
                  Pay the application fee online using the secure payment
                  gateway.
                </BulletItem>
                <BulletItem>
                  The admissions team will review your application and
                  contact you if additional details are required.
                </BulletItem>
                <BulletItem>
                  Upon approval, you will receive an email with an admission
                  offer letter, fee payment instructions, and document
                  verification details.
                </BulletItem>
                <BulletItem>
                  Complete all formalities within the allotted time to
                  confirm admission.
                </BulletItem>
                <BulletItem>
                  Transportation facilities can also be availed through the
                  online helpdesk. Simply raise a query and our team will
                  contact you.
                </BulletItem>
              </ul>
            </GlassCard>
          </Reveal>
        </div>

        {/* Offline Admission */}
        <div className="mb-12">
          <Reveal>
            <h2
              className="mb-6 text-center text-2xl font-bold text-gray-800"
              style={{ fontFamily: "'Fredoka', sans-serif" }}
            >
              Offline Admission / Registration
            </h2>
          </Reveal>

          <Reveal delay={100}>
            <GlassCard>
              <p className="mb-4 leading-relaxed text-gray-700">
                Parents may also opt for offline admission by visiting the
                school campus and completing the registration process in
                person.
              </p>

              <ul className="space-y-3">
                <BulletItem>
                  Collect the admission form from the school's administrative
                  office.
                </BulletItem>
                <BulletItem>
                  Carefully fill in the application form and attach all
                  required documents as per the checklist.
                </BulletItem>
                <BulletItem>
                  Submit the completed form and documents during designated
                  admission hours.
                </BulletItem>
                <BulletItem>
                  Pay the application fee at the administrative office.
                </BulletItem>
                <BulletItem>
                  The admissions team will review your application and
                  contact you if further details are required.
                </BulletItem>
                <BulletItem>
                  If selected, you will receive an admission offer letter via
                  phone call or in-person notification.
                </BulletItem>
                <BulletItem>
                  Complete fee payment and document verification within the
                  given time frame to secure admission.
                </BulletItem>
              </ul>
            </GlassCard>
          </Reveal>
        </div>

        {/* Note */}
        <Reveal>
          <div
            className="mb-10 rounded-2xl p-5"
            style={{
              background: "rgba(255,255,255,0.4)",
              border: "1px solid rgba(255,255,255,0.7)",
              backdropFilter: "blur(12px)",
              WebkitBackdropFilter: "blur(12px)",
            }}
          >
            <p className="text-center text-sm leading-relaxed text-gray-700 md:text-base">
              Please note that the availability of online or offline
              admission may vary depending on the admission period and
              institutional guidelines.
            </p>
          </div>
        </Reveal>

        {/* Call To Action Buttons */}
        <Reveal delay={100}>
          <div className="flex flex-col justify-center gap-4 sm:flex-row">
            <Link to="https://btlk.scientificstudy.in/online/admissionenquiry?key=btlk&tab=admissionenquiry">
              <button className="glass-shine glass-btn-primary w-full rounded-full px-8 py-3 font-semibold text-white sm:w-auto">
                Admission Enquiry
              </button>
            </Link>

            <Link to="https://btlk.scientificstudy.in/online/registration?key=btlk&tab=registration">
              <button className="glass-shine glass-btn-secondary w-full rounded-full px-8 py-3 font-semibold text-purple-700 sm:w-auto">
                Register Online
              </button>
            </Link>
          </div>
        </Reveal>
      </div>
    </div>
  );
};

export default Admission;