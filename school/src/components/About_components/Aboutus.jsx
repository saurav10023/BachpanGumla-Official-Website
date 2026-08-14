import banner from "./files/aboutbanner.png";

// Same teal brand used across this page — kept identical here so the
// glass surfaces tint with the site's own palette instead of borrowing
// the fuchsia/indigo used elsewhere.
const TEAL = "#2b7a78";
const TEAL_DARK = "#1f5b59";

const AboutUs = () => {
  return (
    <section className="relative overflow-hidden bg-gradient-to-b from-[#eafaf7] via-[#f6faf9] to-[#f6faf9] px-4 sm:px-6 md:px-12">
      <GlobalStyles />
      <MeshBackground />

      {/*  MOBILE HERO */}
      <div className="relative lg:hidden">
        <div className="relative w-full h-64 rounded-2xl overflow-hidden mt-4 border border-white/60 shadow-[0_16px_34px_-18px_rgba(31,91,89,0.5)]">
          <img src={banner} alt="banner" className="w-full h-full object-cover" />
          <div className="absolute inset-0 bg-gradient-to-t from-black/55 via-black/10 to-transparent flex flex-col items-center justify-center text-center px-4 gap-3">
            <span className="glass-pill">
              <span className="glass-dot" />
              Gumla, Jharkhand
            </span>
            <h1 className="text-2xl font-bold text-white drop-shadow-sm">About Us</h1>
          </div>
        </div>
      </div>

      {/* desktop banner */}
      <div className="relative hidden lg:block">
        <div className="relative rounded-3xl overflow-hidden border border-white/60 shadow-[0_20px_44px_-20px_rgba(31,91,89,0.45)]">
          <img src={banner} alt="banner" className="w-full" />
          <div className="absolute top-6 left-6">
            <span className="glass-pill">
              <span className="glass-dot" />
              Bachpan &middot; The Little Kingdom &middot; Gumla
            </span>
          </div>
        </div>
      </div>

      <div className="relative max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-3 gap-10 py-10">
        {/* left content */}
        <div className="lg:col-span-2 space-y-10">
          <div>
            <h2 className="hidden lg:block text-3xl font-semibold mb-4" style={{ color: TEAL }}>
              About Us
            </h2>
            <p className="text-gray-700 leading-relaxed">
              <strong>Bachpan, The Little Kingdom</strong> is a renowned educational
              institution in Gumla, Jharkhand, committed to shaping young minds
              through quality education and holistic development. Since our
              inception, we have believed that education is not just about
              academics, but about nurturing great human beings in a safe,
              joyful, and inspiring learning environment.
            </p>
            <p className="text-gray-700 leading-relaxed mt-4">
              Our student-centric approach encourages curiosity, confidence,
              and creativity, ensuring that learning is engaging, meaningful,
              and aligned with each child’s interests.
            </p>
          </div>

          {/* OUR CURRICULUM */}
          <div>
            <h3 className="text-2xl font-semibold mb-3" style={{ color: TEAL }}>
              Our Curriculum
            </h3>
            <p className="text-gray-700 leading-relaxed">
              Our curriculum is meticulously designed to equip children with
              essential 21st-century skills required for success in an
              interconnected world. It fosters critical thinking,
              problem-solving, creativity, and collaboration, while being
              grounded in strong moral values and sensitivity to India’s rich
              cultural heritage.
            </p>
          </div>

          {/* FACILITIES */}
          <div>
            <h3 className="text-2xl font-semibold mb-3" style={{ color: TEAL }}>
              Our Facilities
            </h3>
            <p className="text-gray-700 leading-relaxed">
              We offer a state-of-the-art, lush green campus with well-ventilated
              classrooms, a library, computer and science laboratories, and a
              spacious playground. Sports facilities include table tennis,
              badminton, volleyball, and track activities, supporting students’
              physical and mental well-being.
            </p>
          </div>
        </div>

        {/* RIGHT SIDEBAR */}
        <div className="space-y-8">
          <InfoCard
            title="Our Mission"
            text="To provide a nurturing and stimulating environment that empowers
            students to become confident, creative, and responsible individuals,
            ready to contribute positively to society and the nation."
          />

          <InfoCard
            title="Infrastructure & Technology"
            text="Our school is equipped with modern, technology-based systems that
            promote innovation and smart learning. Continuous investment in
            infrastructure ensures a safe, energetic, and future-ready
            educational environment."
          />
        </div>
      </div>
    </section>
  );
};

export default AboutUs;

function InfoCard({ title, text }) {
  return (
    <div className="au-glass au-shine relative rounded-2xl p-6 transition-all duration-300 hover:-translate-y-1.5">
      <div
        className="pointer-events-none absolute -top-6 -right-6 w-24 h-24 rounded-full blur-2xl opacity-40"
        style={{ background: TEAL }}
      />
      <h4 className="relative text-xl font-semibold mb-3" style={{ color: TEAL }}>
        {title}
      </h4>
      <p className="relative text-gray-700 leading-relaxed">{text}</p>
    </div>
  );
}

function MeshBackground() {
  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden">
      <div className="absolute -top-16 -left-16 w-72 h-72 rounded-full bg-teal-300/25 blur-3xl au-blob-a" />
      <div className="absolute top-1/3 -right-20 w-80 h-80 rounded-full bg-emerald-200/30 blur-3xl au-blob-b" />
      <div className="absolute bottom-0 left-1/4 w-64 h-64 rounded-full bg-teal-100/40 blur-3xl au-blob-c" />
    </div>
  );
}

function GlobalStyles() {
  return (
    <style>{`
      .glass-pill {
        display: inline-flex;
        align-items: center;
        gap: 8px;
        padding: 7px 14px;
        border-radius: 999px;
        font-weight: 600;
        font-size: 12px;
        color: #ffffff;
        background: rgba(255,255,255,0.18);
        border: 1px solid rgba(255,255,255,0.5);
        backdrop-filter: blur(12px);
        -webkit-backdrop-filter: blur(12px);
        box-shadow: inset 0 1px 0 rgba(255,255,255,0.35);
        width: fit-content;
      }
      .glass-dot {
        width: 6px; height: 6px; border-radius: 999px;
        background: #ffffff;
        box-shadow: 0 0 0 4px rgba(255,255,255,0.25);
      }

      .au-glass {
        background: rgba(255,255,255,0.62);
        border: 1px solid rgba(255,255,255,0.8);
        backdrop-filter: blur(16px);
        -webkit-backdrop-filter: blur(16px);
        box-shadow: 0 12px 28px -16px rgba(31,91,89,0.35), inset 0 1px 0 rgba(255,255,255,0.85);
      }
      .au-glass:hover {
        box-shadow: 0 20px 36px -16px rgba(31,91,89,0.42), inset 0 1px 0 rgba(255,255,255,0.9);
      }

      .au-shine { position: relative; overflow: hidden; isolation: isolate; }
      .au-shine::after {
        content: "";
        position: absolute;
        top: 0; left: -60%;
        width: 40%; height: 100%;
        background: linear-gradient(115deg, transparent, rgba(255,255,255,0.65), transparent);
        transform: skewX(-18deg);
        transition: left 0.75s ease;
        pointer-events: none;
      }
      .au-shine:hover::after { left: 130%; }

      @keyframes auBlobA { 0%,100% { transform: translate(0,0) scale(1);} 50% { transform: translate(20px,26px) scale(1.08);} }
      @keyframes auBlobB { 0%,100% { transform: translate(0,0) scale(1);} 50% { transform: translate(-22px,18px) scale(1.06);} }
      @keyframes auBlobC { 0%,100% { transform: translate(0,0) scale(1);} 50% { transform: translate(14px,-20px) scale(1.05);} }
      .au-blob-a { animation: auBlobA 13s ease-in-out infinite; }
      .au-blob-b { animation: auBlobB 15s ease-in-out infinite; }
      .au-blob-c { animation: auBlobC 17s ease-in-out infinite; }

      @media (prefers-reduced-motion: reduce) {
        .au-glass, .au-shine::after, .au-blob-a, .au-blob-b, .au-blob-c {
          animation: none !important;
          transition: none !important;
        }
      }
    `}</style>
  );
}