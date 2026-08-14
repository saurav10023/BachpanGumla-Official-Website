import React, { useEffect, useRef, useState } from "react";

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
    className={`glass-shine rounded-3xl p-7 md:p-9 ${className}`}
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

    .fee-row {
      background: rgba(255,255,255,0.4);
      border: 1px solid rgba(255,255,255,0.6);
      backdrop-filter: blur(6px);
      -webkit-backdrop-filter: blur(6px);
      transition: background 0.2s ease;
    }
    .fee-row:hover { background: rgba(255,255,255,0.7); }

    .month-chip {
      background: linear-gradient(150deg, rgba(109,40,217,0.14), rgba(79,70,229,0.05));
      border: 1px solid rgba(255,255,255,0.75);
      backdrop-filter: blur(10px);
      -webkit-backdrop-filter: blur(10px);
      box-shadow: inset 0 1px 0 rgba(255,255,255,0.7), 0 6px 14px -8px rgba(109,40,217,0.25);
      transition: transform 0.25s ease, box-shadow 0.25s ease;
    }
    .month-chip:hover {
      transform: translateY(-3px);
      box-shadow: 0 10px 20px -8px rgba(109,40,217,0.35), inset 0 1px 0 rgba(255,255,255,0.8);
    }

    @media (prefers-reduced-motion: reduce) {
      .blob1, .blob2, .blob3 { animation: none !important; }
      .glass-shine::after { transition: none !important; }
      .month-chip { transition: none !important; }
    }
  `}</style>
);

const FeeStructure = () => {
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

      <div className="relative mx-auto max-w-5xl py-12">
        {/* header */}
        <Reveal>
          <div className="mb-14 text-center">
            <div className="mb-4 flex justify-center">
              <EyebrowPill>Session {new Date().getFullYear()}–{new Date().getFullYear() + 1}</EyebrowPill>
            </div>
            <h1
              className="text-3xl font-extrabold tracking-wide text-purple-700 md:text-4xl"
              style={{ fontFamily: "'Fredoka', sans-serif" }}
            >
              Fee Structure
            </h1>
            <p className="mt-4 text-base font-medium text-gray-600 md:text-lg">
              New Admission Fee Structure – Session {new Date().getFullYear()}–{new Date().getFullYear() + 1}
            </p>
          </div>
        </Reveal>

        <Reveal delay={80}>
          <InfoCard />
        </Reveal>

        {/* admission fee section */}
        <Reveal delay={0}>
          <Section number="01" title="Admission Fees">
            <FeeRow label="Prospectus & Form" value="₹ 200" />
            <FeeRow label="Admission Fee (One Time)" value="₹ 7,000" />
            <FeeRow label="Annual Activity Fee" value="₹ 4,000" />
            <FeeRow label="Smart Class & School App (Annual)" value="₹ 1,500" />
          </Section>
        </Reveal>

        <Reveal delay={0}>
          <Section number="02" title="Monthly Tuition Fee">
            <MonthlyFeeList />
          </Section>
        </Reveal>

        <Reveal delay={0}>
          <Section number="03" title="Additional Charges">
            <FeeRow label="Karate, Dance, Music & Yoga" value="₹ 50 / month" />
            <p className="mt-4 text-sm leading-relaxed text-gray-600">
              Transportation Fee (As per distance):
              <br />
              <span className="font-medium">₹ 750, 800, 850, 950, 1000, 1100</span>
            </p>
          </Section>
        </Reveal>

        <Reveal delay={0}>
          <Section number="04" title="Documents Required">
            <DocumentList />
          </Section>
        </Reveal>
      </div>
    </div>
  );
};

export default FeeStructure;

function InfoCard() {
  return (
    <GlassCard className="mb-14 space-y-2 text-center">
      <h2
        className="text-xl font-bold text-purple-700 md:text-2xl"
        style={{ fontFamily: "'Fredoka', sans-serif" }}
      >
        Bachpan – The Little Kingdom, Gumla
      </h2>
      <p className="text-sm text-gray-600 md:text-base">
        Governed & Managed by KALPATARU Edu. and Charitable Trust
      </p>
      <p className="text-sm text-gray-600">
        Play School – Behind Old State Bus Depot, Lohardaga Road, Dunduria, Gumla
      </p>
      <p className="text-sm text-gray-600">
        Primary School – Old DAV Campus, Bank Colony, Dunduria, Gumla, Jharkhand – 835207
      </p>
      <p className="pt-2 text-sm text-gray-600">
        U-DISE: <span className="font-medium">20160819409</span> | Contact:{" "}
        <span className="font-medium">9608881888</span>
      </p>
    </GlassCard>
  );
}

function Section({ number, title, children }) {
  return (
    <GlassCard className="mb-12">
      <div className="mb-6 flex items-center gap-4">
        <div
          className="flex h-10 w-10 items-center justify-center rounded-full font-bold text-purple-700"
          style={{
            background: "linear-gradient(150deg, rgba(109,40,217,0.2), rgba(79,70,229,0.08))",
            border: "1px solid rgba(255,255,255,0.75)",
            boxShadow: "inset 0 1px 0 rgba(255,255,255,0.7), 0 6px 14px -8px rgba(109,40,217,0.35)",
          }}
        >
          {number}
        </div>
        <h2
          className="text-xl font-bold text-purple-700 md:text-2xl"
          style={{ fontFamily: "'Fredoka', sans-serif" }}
        >
          {title}
        </h2>
      </div>
      {children}
    </GlassCard>
  );
}

function FeeRow({ label, value }) {
  return (
    <div className="fee-row mb-2 flex items-center justify-between rounded-xl px-4 py-4 text-gray-700 last:mb-0">
      <span className="w-2/3 text-sm leading-relaxed md:text-base">{label}</span>
      <span className="text-sm font-semibold text-gray-900 md:text-base">{value}</span>
    </div>
  );
}

function MonthlyFeeList() {
  const data = [
    ["Play Group", "2–3 Years", "₹ 1500"],
    ["Nursery", "3–4 Years", "₹ 1550"],
    ["LKG", "4–5 Years", "₹ 1600"],
    ["UKG", "5–6 Years", "₹ 1650"],
    ["Class 1", "6–7 Years", "₹ 1700"],
    ["Class 2", "-", "₹ 1700"],
    ["Class 3", "-", "₹ 1750"],
    ["Class 4", "-", "₹ 1750"],
    ["Class 5", "-", "₹ 1850"],
    ["Class 6", "-", "₹ 1900"],
    ["Class 7", "-", "₹ 1950"],
  ];

  return (
    <div className="grid gap-3 sm:grid-cols-2">
      {data.map(([cls, age, fee], i) => (
        <div
          key={i}
          className="month-chip flex items-center justify-between rounded-xl p-4"
        >
          <div>
            <p className="font-semibold text-gray-800">{cls}</p>
            <p className="text-xs text-gray-500">{age}</p>
          </div>
          <p className="font-bold text-purple-700">{fee}</p>
        </div>
      ))}
    </div>
  );
}

function DocumentList() {
  const docs = [
    "Passport size photographs (Student – 6, Mother – 3, Father – 3)",
    "Aadhar Number of Student & Parents",
    "Birth Certificate (Govt. Office / Hospital)",
    "Blood Group",
  ];
  return (
    <ul className="space-y-3 text-sm leading-relaxed text-gray-700 md:text-base">
      {docs.map((doc, i) => (
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
          <span>{doc}</span>
        </li>
      ))}
    </ul>
  );
}