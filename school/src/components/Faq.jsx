import React, { useEffect, useRef, useState } from "react";

/**
 * Liquid Glass theme — indigo/violet accent (#6D28D9 / #4F46E5)
 * Fonts: Fredoka (headings) + Plus Jakarta Sans (body)
 * Make sure index.html has the Fredoka / Plus Jakarta Sans <link> tags
 * (see Admission.jsx for the exact snippet) — only needs to be added once site-wide.
 */

const faqs = [
  {
    question: "How can I contact the school office?",
    answer:
      "You can contact the school office by phone or email during regular school hours.",
  },
  {
    question: "Can we meet the school management?",
    answer:
      "Yes, meetings with the school management can be arranged. Please contact the school's office to schedule an appointment.",
  },
  {
    question: "Where can we apply for school jobs?",
    answer:
      'Job applications can be submitted through the "Careers" section on our official website.',
  },
  {
    question: "Where can we apply for admission?",
    answer:
      "Admissions can be applied for online via our official website or in person at the school's admissions office.",
  },
];

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

const GlobalStyle = () => (
  <style>{`
    .faq-glass {
      background: rgba(255,255,255,0.55);
      border: 1px solid rgba(255,255,255,0.75);
      backdrop-filter: blur(16px);
      -webkit-backdrop-filter: blur(16px);
      box-shadow: 0 10px 26px -14px rgba(109,40,217,0.3), inset 0 1px 0 rgba(255,255,255,0.85);
      transition: box-shadow 0.3s ease, transform 0.3s ease;
    }
    .faq-glass:hover {
      box-shadow: 0 14px 30px -14px rgba(109,40,217,0.4), inset 0 1px 0 rgba(255,255,255,0.9);
    }

    .faq-shine { position: relative; overflow: hidden; isolation: isolate; }
    .faq-shine::after {
      content: "";
      position: absolute;
      top: 0; left: -60%;
      width: 40%; height: 100%;
      background: linear-gradient(115deg, transparent, rgba(255,255,255,0.55), transparent);
      transform: skewX(-18deg);
      transition: left 0.75s ease;
      pointer-events: none;
    }
    .faq-shine:hover::after { left: 130%; }

    .faq-icon-chip {
      background: linear-gradient(150deg, rgba(109,40,217,0.2), rgba(79,70,229,0.08));
      border: 1px solid rgba(255,255,255,0.75);
      backdrop-filter: blur(10px);
      -webkit-backdrop-filter: blur(10px);
      box-shadow: inset 0 1px 0 rgba(255,255,255,0.7), 0 6px 14px -8px rgba(109,40,217,0.35);
      transition: transform 0.3s ease, background 0.3s ease;
    }
    .faq-icon-chip.open {
      transform: rotate(45deg);
      background: linear-gradient(150deg, rgba(109,40,217,0.35), rgba(79,70,229,0.18));
    }

    .faq-answer {
      display: grid;
      grid-template-rows: 0fr;
      transition: grid-template-rows 0.35s ease;
    }
    .faq-answer.open {
      grid-template-rows: 1fr;
    }
    .faq-answer > div { overflow: hidden; }

    @media (prefers-reduced-motion: reduce) {
      .faq-shine::after { transition: none !important; }
      .faq-icon-chip { transition: none !important; }
      .faq-answer { transition: none !important; }
    }
  `}</style>
);

const FAQSection = () => {
  const [openIndex, setOpenIndex] = useState(null);

  const toggleFAQ = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section
      className="mx-auto mt-16 max-w-4xl px-4"
      style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}
    >
      <GlobalStyle />

      <Reveal>
        <div className="mb-8 text-center">
          <div className="mb-4 flex justify-center">
            <EyebrowPill>FAQ</EyebrowPill>
          </div>
          <h2
            className="text-3xl font-bold text-indigo-700"
            style={{ fontFamily: "'Fredoka', sans-serif" }}
          >
            Frequently Asked Questions
          </h2>
        </div>
      </Reveal>

      <div className="space-y-4">
        {faqs.map((faq, index) => {
          const isOpen = openIndex === index;
          return (
            <Reveal key={index} delay={index * 80}>
              <div className="faq-glass faq-shine overflow-hidden rounded-2xl">
                <button
                  onClick={() => toggleFAQ(index)}
                  aria-expanded={isOpen}
                  className="flex w-full items-center justify-between gap-4 px-6 py-4 text-left font-semibold text-gray-800 transition hover:bg-white/30"
                >
                  <span>{faq.question}</span>
                  <span
                    className={`faq-icon-chip flex h-8 w-8 shrink-0 items-center justify-center rounded-full text-lg font-bold text-indigo-700 ${
                      isOpen ? "open" : ""
                    }`}
                  >
                    +
                  </span>
                </button>

                <div className={`faq-answer ${isOpen ? "open" : ""}`}>
                  <div>
                    <div className="px-6 pb-5 text-left leading-relaxed text-gray-600">
                      {faq.answer}
                    </div>
                  </div>
                </div>
              </div>
            </Reveal>
          );
        })}
      </div>
    </section>
  );
};

export default FAQSection;