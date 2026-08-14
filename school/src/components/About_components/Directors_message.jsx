import { Link } from "react-router-dom";
import img from "./files/director.jpg";
import { FaFacebookF, FaTwitter, FaInstagram } from "react-icons/fa";

// Same teal brand used across the About page.
const TEAL = "#2b7a78";
const TEAL_DARK = "#1f5b59";

const SOCIALS = [
  { Icon: FaFacebookF, add: "https://www.facebook.com/profile.php?id=100004631889516&sk=photos" },
  { Icon: FaInstagram, add: "https://www.instagram.com/bachpanthelittlekingdom?igsh=c2RnbTJudW51dWQx" },
  { Icon: FaTwitter, add: "#" }
];

const DirectorsMessage = () => {
  return (
    <section className="relative overflow-hidden bg-gradient-to-b from-[#f6faf9] via-[#eafaf7] to-[#f6faf9] py-12 md:py-16 px-4 sm:px-6 md:px-12">
      <GlobalStyles />
      <MeshBackground />

      <div className="relative max-w-6xl mx-auto">
        {/* header */}
        <div className="mb-8 md:mb-10 text-center md:text-left">
          <span className="glass-pill mx-auto md:mx-0">
            <span className="glass-dot" />
            From the Director’s Desk
          </span>
          <h2 className="mt-4 text-3xl sm:text-4xl md:text-5xl font-semibold" style={{ color: "#1f2937" }}>
            Director&rsquo;s Message
          </h2>
        </div>

        <div className="dm-glass relative rounded-3xl p-6 md:p-12 grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-10 items-start">
          {/* soft ambient glow inside the card */}
          <div className="pointer-events-none absolute -top-10 -right-10 w-52 h-52 rounded-full blur-3xl opacity-25" style={{ background: TEAL }} />

          {/* image mobile first*/}
          <div className="relative flex flex-col items-center md:order-2">
            <div className="dm-frame relative w-48 h-56 md:w-60 md:h-68 rounded-2xl overflow-hidden mb-5">
              <img src={img} alt="Director" className="w-full h-full object-cover" />
            </div>

            <div className="flex gap-3">
              {SOCIALS.map(({ Icon, add }, i) => (
                <SocialIcon key={i} Icon={Icon} add={add} />
              ))}
            </div>
          </div>

          {/* message*/}
          <div className="relative md:col-span-2 text-gray-700 leading-relaxed space-y-4 md:order-1">
            <p className="md:indent-8">Dear Parents and Guardians,</p>

            <p className="md:indent-8">
              I, <strong>Chandra Shekhar Giri</strong>, Director of
              <strong> Bachpan, The Little Kingdom, Gumla, Jharkhand</strong>,
              have been serving this institute for several years. I strongly
              believe that education must be provided to all individuals,
              irrespective of their background, as it possesses the power to
              transform lives and uplift society.
            </p>

            <p className="md:indent-8">
              Education is a powerful tool that enlightens the rooms of
              darkness and nurtures wisdom. For this reason, our school ensures
              a safe and secure environment for both students and staff, where
              creativity, curiosity, and confidence can grow with time.
            </p>

            <p className="md:indent-8">
              Our sole aim is to empower pupils to think innovatively by
              focusing on both theoretical and practical aspects of learning.
              In today’s ever-evolving world, technology plays a vital role.
              Therefore, we have well-equipped laboratories and modern
              infrastructure, and we continue investing to keep our students
              aligned with new advancements.
            </p>

            <p className="md:indent-8">
              I firmly believe that motivated educators create empowered
              students. To ensure this, we organize various activities and
              competitions for our faculty and students alike. Such initiatives
              keep them active, confident, and inspired to give their best.
            </p>

            <p className="md:indent-8">
              While academics significantly influence a child’s development,
              extracurricular activities must not be ignored. A balanced
              approach between learning and recreation leads to mindful growth
              and overall excellence.
            </p>

            {/* SIGNATURE */}
            <div className="pt-6">
              <p className="font-semibold text-gray-900">Warm Regards,</p>
              <p className="font-bold" style={{ color: TEAL }}>
                Chandra Shekhar Giri
              </p>
              <p className="text-sm text-gray-600">
                Director
                <br />
                Bachpan, The Little Kingdom
                <br />
                Gumla, Jharkhand
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

function SocialIcon({ Icon, add = "#" }) {
  return (
    <Link to={add} target={add.startsWith("http") ? "_blank" : undefined} rel={add.startsWith("http") ? "noopener noreferrer" : undefined}>
      <div
        className="dm-chip dm-shine w-11 h-11 md:w-12 md:h-12 rounded-full flex items-center justify-center cursor-pointer transition-transform duration-300 hover:-translate-y-1"
        style={{ color: TEAL_DARK }}
      >
        <Icon size={16} />
      </div>
    </Link>
  );
}

function MeshBackground() {
  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden">
      <div className="absolute -top-20 -right-16 w-72 h-72 rounded-full bg-teal-300/25 blur-3xl dm-blob-a" />
      <div className="absolute -bottom-24 -left-16 w-80 h-80 rounded-full bg-emerald-200/30 blur-3xl dm-blob-b" />
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
        color: ${TEAL_DARK};
        background: rgba(255,255,255,0.55);
        border: 1px solid rgba(255,255,255,0.8);
        backdrop-filter: blur(12px);
        -webkit-backdrop-filter: blur(12px);
        box-shadow: 0 8px 18px -10px rgba(31,91,89,0.35), inset 0 1px 0 rgba(255,255,255,0.9);
        width: fit-content;
      }
      .glass-dot {
        width: 6px; height: 6px; border-radius: 999px;
        background: ${TEAL};
        box-shadow: 0 0 0 4px rgba(43,122,120,0.18);
      }

      .dm-glass {
        background: rgba(255,255,255,0.62);
        border: 1px solid rgba(255,255,255,0.8);
        backdrop-filter: blur(18px);
        -webkit-backdrop-filter: blur(18px);
        box-shadow: 0 20px 44px -20px rgba(31,91,89,0.35), inset 0 1px 0 rgba(255,255,255,0.85);
        overflow: hidden;
      }

      .dm-frame {
        border: 1px solid rgba(255,255,255,0.85);
        box-shadow: 0 14px 30px -16px rgba(31,91,89,0.4), inset 0 1px 0 rgba(255,255,255,0.6);
        background: rgba(255,255,255,0.4);
      }

      .dm-chip {
        background: rgba(255,255,255,0.6);
        border: 1px solid rgba(255,255,255,0.85);
        backdrop-filter: blur(10px);
        -webkit-backdrop-filter: blur(10px);
        box-shadow: 0 8px 18px -10px rgba(31,91,89,0.4), inset 0 1px 0 rgba(255,255,255,0.8);
      }
      .dm-chip:hover {
        background: rgba(255,255,255,0.85);
        box-shadow: 0 12px 22px -10px rgba(31,91,89,0.45), inset 0 1px 0 rgba(255,255,255,0.95);
      }

      .dm-shine { position: relative; overflow: hidden; isolation: isolate; }
      .dm-shine::after {
        content: "";
        position: absolute;
        top: 0; left: -60%;
        width: 40%; height: 100%;
        background: linear-gradient(115deg, transparent, rgba(255,255,255,0.7), transparent);
        transform: skewX(-18deg);
        transition: left 0.75s ease;
        pointer-events: none;
      }
      .dm-shine:hover::after { left: 130%; }

      @keyframes dmBlobA { 0%,100% { transform: translate(0,0) scale(1);} 50% { transform: translate(22px,24px) scale(1.08);} }
      @keyframes dmBlobB { 0%,100% { transform: translate(0,0) scale(1);} 50% { transform: translate(-20px,16px) scale(1.06);} }
      .dm-blob-a { animation: dmBlobA 14s ease-in-out infinite; }
      .dm-blob-b { animation: dmBlobB 16s ease-in-out infinite; }

      @media (prefers-reduced-motion: reduce) {
        .dm-shine::after, .dm-blob-a, .dm-blob-b { animation: none !important; transition: none !important; }
      }
    `}</style>
  );
}

export default DirectorsMessage;