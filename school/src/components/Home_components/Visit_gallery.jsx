import React, { useState } from "react";
import { Link } from "react-router-dom";
import { ArrowRight, Phone, Images, Users, Award, Sparkles } from "lucide-react";
import img1 from "./files/sarhul.jpg";
import img2 from "./files/playgroup.jpg";
import img3 from "./files/flaggirl.jpg";
import img4 from "./files/eating.jpg";

// Same brand tokens used across Header / Footer / Notices — kept identical
// here so this section reads as part of the same site rather than a
// separate landing page bolted on with its own palette. The surfaces
// (badges, buttons, stat cards, photo captions) are now liquid-glass:
// translucent, blurred, with a hairline highlight and a shine sweep on
// hover — the fuchsia/amber tokens just tint the glass instead of filling
// flat shapes.
const FUCHSIA = "#86198f";
const FUCHSIA_DARK = "#4a044e";
const FUCHSIA_MID = "#a21caf";
const FUCHSIA_LIGHT = "#fdf4ff";
const FUCHSIA_BORDER = "#e879f9";
const AMBER = "#f59e0b";

const photos = [
  { src: img1, label: "Sarhul Festival" },
  { src: img2, label: "Play Group" },
  { src: img3, label: "Flag Hoisting" },
  { src: img4, label: "Lunch Break" },
];

const stats = [
  { num: "500+", label: "Students", icon: Users },
  { num: "15+", label: "Activities", icon: Sparkles },
  { num: "10+", label: "Years", icon: Award },
];

export default function VisitGallery() {
  return (
    <section
      style={{
        position: "relative",
        overflow: "hidden",
        background: "linear-gradient(180deg, #fdf4ff 0%, #fafafa 55%, #fafafa 100%)",
        fontFamily: "sans-serif",
      }}
    >
      <style>{`
        @keyframes vg-fade-up {
          from { opacity: 0; transform: translateY(14px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        @keyframes vg-blob-a {
          0%, 100% { transform: translate(0,0) scale(1); }
          50% { transform: translate(24px, 26px) scale(1.08); }
        }
        @keyframes vg-blob-b {
          0%, 100% { transform: translate(0,0) scale(1); }
          50% { transform: translate(-22px, 18px) scale(1.06); }
        }
        .vg-item { animation: vg-fade-up 0.5s ease both; }
        .vg-scroll::-webkit-scrollbar { display: none; }
        .vg-scroll { -ms-overflow-style: none; scrollbar-width: none; }
        .vg-blob-a { animation: vg-blob-a 13s ease-in-out infinite; }
        .vg-blob-b { animation: vg-blob-b 15s ease-in-out infinite; }

        /* ---- liquid glass primitives ---- */
        .vg-glass {
          background: rgba(255,255,255,0.5);
          border: 1px solid rgba(255,255,255,0.7);
          backdrop-filter: blur(16px);
          -webkit-backdrop-filter: blur(16px);
          box-shadow: 0 10px 26px -14px rgba(74,4,78,0.28), inset 0 1px 0 rgba(255,255,255,0.85);
        }
        .vg-glass-dark {
          background: rgba(20,6,22,0.32);
          border: 1px solid rgba(255,255,255,0.18);
          backdrop-filter: blur(10px);
          -webkit-backdrop-filter: blur(10px);
        }
        .vg-shine { position: relative; overflow: hidden; isolation: isolate; }
        .vg-shine::after {
          content: "";
          position: absolute;
          top: 0;
          left: -60%;
          width: 40%;
          height: 100%;
          background: linear-gradient(115deg, transparent, rgba(255,255,255,0.65), transparent);
          transform: skewX(-18deg);
          transition: left 0.75s ease;
          pointer-events: none;
        }
        .vg-shine:hover::after { left: 130%; }

        @media (prefers-reduced-motion: reduce) {
          .vg-item, .vg-blob-a, .vg-blob-b, .vg-shine::after { animation: none !important; transition: none !important; }
        }
      `}</style>

      {/* Decorative blobs — fuchsia + amber, matching the rest of the site, now drifting */}
      <div
        aria-hidden="true"
        className="vg-blob-a"
        style={{
          position: "absolute",
          top: -90,
          left: -90,
          width: "320px",
          height: "320px",
          borderRadius: "50%",
          background: FUCHSIA_MID,
          opacity: 0.16,
          filter: "blur(90px)",
        }}
      />
      <div
        aria-hidden="true"
        className="vg-blob-b"
        style={{
          position: "absolute",
          bottom: -100,
          right: -100,
          width: "340px",
          height: "340px",
          borderRadius: "50%",
          background: AMBER,
          opacity: 0.14,
          filter: "blur(100px)",
        }}
      />

      <MobileVisitGallery />
      <DesktopVisitGallery />
    </section>
  );
}

// ─── Mobile ────────────────────────────────────────────────────────────
// Centered copy, full-width thumb-friendly buttons, and a swipeable photo
// carousel instead of a cramped side-by-side grid — small screens don't
// have room for a bento layout to breathe, so this trades the grid for a
// pattern people already know how to use: swipe. All surfaces now read as
// frosted glass over the drifting blobs behind them.

function MobileVisitGallery() {
  return (
    <div className="lg:hidden" style={{ position: "relative", padding: "48px 0 56px" }}>
      <div className="vg-item" style={{ padding: "0 20px", textAlign: "center" }}>
        <span
          className="vg-glass"
          style={{
            display: "inline-flex",
            alignItems: "center",
            gap: "6px",
            fontSize: "10px",
            fontWeight: 700,
            letterSpacing: "0.22em",
            textTransform: "uppercase",
            color: FUCHSIA_DARK,
            borderRadius: "999px",
            padding: "6px 12px",
            marginBottom: "18px",
          }}
        >
          <Sparkles size={11} />
          Bachpan &middot; Gumla
        </span>

        <h2
          style={{
            fontFamily: "Georgia, serif",
            fontSize: "clamp(1.7rem, 7vw, 2.1rem)",
            color: "#18181b",
            lineHeight: 1.2,
            margin: "0 0 14px",
            fontWeight: "normal",
          }}
        >
          Let your{" "}
          <span
            style={{
              background: `linear-gradient(90deg, ${FUCHSIA_DARK}, ${FUCHSIA_MID})`,
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              backgroundClip: "text",
            }}
          >
            children
          </span>{" "}
          learn from the best.
        </h2>

        <p
          style={{
            fontSize: "14px",
            color: "#52525b",
            lineHeight: 1.7,
            margin: "0 auto 26px",
            maxWidth: "360px",
          }}
        >
          Discover a joyful learning environment where children grow
          academically, socially, and emotionally through creativity and care.
        </p>
      </div>

      {/* Photo carousel — full-bleed, swipeable, snaps to each card */}
      <div
        className="vg-scroll vg-item"
        style={{
          display: "flex",
          gap: "12px",
          overflowX: "auto",
          scrollSnapType: "x mandatory",
          WebkitOverflowScrolling: "touch",
          padding: "2px 20px 6px",
          marginBottom: "10px",
          animationDelay: "0.08s",
        }}
      >
        {photos.map((photo) => (
          <div
            key={photo.label}
            style={{
              flex: "0 0 auto",
              width: "68vw",
              maxWidth: "300px",
              aspectRatio: "4 / 5",
              borderRadius: "18px",
              overflow: "hidden",
              position: "relative",
              scrollSnapAlign: "start",
              border: "1px solid rgba(255,255,255,0.6)",
              boxShadow: "0 14px 30px -16px rgba(74,4,78,0.35)",
            }}
          >
            <img
              src={photo.src}
              alt={photo.label}
              style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }}
            />
            <div
              className="vg-glass-dark"
              style={{
                position: "absolute",
                bottom: 0,
                left: 0,
                right: 0,
                padding: "12px",
                borderLeft: "none",
                borderRight: "none",
                borderBottom: "none",
                color: "#ffffff",
                fontSize: "12.5px",
                fontWeight: 600,
              }}
            >
              {photo.label}
            </div>
          </div>
        ))}

        {/* Final card — CTA into the full gallery, same swipe rhythm as the photos */}
        <Link
          to="/gallery"
          className="vg-shine"
          style={{
            flex: "0 0 auto",
            width: "68vw",
            maxWidth: "300px",
            aspectRatio: "4 / 5",
            borderRadius: "18px",
            overflow: "hidden",
            position: "relative",
            scrollSnapAlign: "start",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            textDecoration: "none",
            background: `linear-gradient(135deg, ${FUCHSIA_DARK} 0%, ${FUCHSIA_MID} 60%, ${FUCHSIA} 100%)`,
            border: "1px solid rgba(255,255,255,0.35)",
          }}
        >
          <span
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              gap: "10px",
              color: "#ffffff",
              textAlign: "center",
              padding: "0 20px",
            }}
          >
            <span
              className="vg-glass"
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                width: "44px",
                height: "44px",
                borderRadius: "50%",
                background: "rgba(255,255,255,0.15)",
                color: "#ffffff",
              }}
            >
              <Images size={19} />
            </span>
            <span style={{ fontSize: "13.5px", fontWeight: 700 }}>View Full Gallery</span>
            <ArrowRight size={15} />
          </span>
        </Link>
      </div>

      <p
        style={{
          textAlign: "center",
          fontSize: "11px",
          color: "#a1a1aa",
          margin: "0 0 26px",
        }}
      >
        Swipe to see more &rarr;
      </p>

      {/* Buttons — full width, stacked, sized for thumbs */}
      <div
        className="vg-item"
        style={{
          display: "flex",
          flexDirection: "column",
          gap: "10px",
          padding: "0 20px",
          marginBottom: "28px",
          animationDelay: "0.12s",
        }}
      >
        <Link
          to="/gallery"
          className="vg-shine"
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            gap: "8px",
            padding: "15px 20px",
            borderRadius: "14px",
            background: `linear-gradient(135deg, ${FUCHSIA_DARK} 0%, ${FUCHSIA_MID} 60%, ${FUCHSIA} 100%)`,
            color: "#ffffff",
            textDecoration: "none",
            fontWeight: 700,
            fontSize: "14.5px",
            border: "1px solid rgba(255,255,255,0.35)",
            boxShadow: "0 8px 22px rgba(134,25,143,0.3), inset 0 1px 0 rgba(255,255,255,0.3)",
          }}
        >
          <Images size={17} />
          Visit Gallery
        </Link>

        <a
          href="tel:+919608881888"
          className="vg-glass vg-shine"
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            gap: "8px",
            padding: "15px 20px",
            borderRadius: "14px",
            color: FUCHSIA_DARK,
            textDecoration: "none",
            fontWeight: 700,
            fontSize: "14.5px",
          }}
        >
          <Phone size={16} />
          Contact Us
        </a>
      </div>

      {/* Stats — equal 3-column grid, compact glass cards */}
      <div
        className="vg-item"
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(3, 1fr)",
          gap: "8px",
          padding: "0 20px",
          animationDelay: "0.16s",
        }}
      >
        {stats.map((stat) => {
          const Icon = stat.icon;
          return (
            <div
              key={stat.label}
              className="vg-glass"
              style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                gap: "6px",
                padding: "14px 8px",
                borderRadius: "14px",
                textAlign: "center",
              }}
            >
              <span
                className="vg-glass"
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  width: "30px",
                  height: "30px",
                  borderRadius: "9px",
                  color: FUCHSIA,
                }}
              >
                <Icon size={14} />
              </span>
              <p style={{ fontSize: "16px", fontWeight: 700, color: "#18181b", margin: 0, lineHeight: 1.1 }}>
                {stat.num}
              </p>
              <p
                style={{
                  fontSize: "9px",
                  letterSpacing: "0.1em",
                  textTransform: "uppercase",
                  color: "#9ca3af",
                  margin: 0,
                }}
              >
                {stat.label}
              </p>
            </div>
          );
        })}
      </div>

      <p style={{ textAlign: "center", marginTop: "36px", fontSize: "10.5px", letterSpacing: "0.18em", color: "#a1a1aa" }}>
        &copy; Bachpan &middot; The Little Kingdom &middot; Gumla
      </p>
    </div>
  );
}

// ─── Desktop ─────────────────────────────────────────────────────────────
// Same bento layout and hover interactions as before, now rebuilt as
// liquid glass: translucent badge/buttons/stat cards with a shine sweep,
// and frosted glass photo captions instead of a flat black gradient.

function DesktopVisitGallery() {
  const [hovered, setHovered] = useState(null);
  const [btnHover, setBtnHover] = useState(false);
  const [telHover, setTelHover] = useState(false);
  const [ctaHover, setCtaHover] = useState(false);

  return (
    <div className="hidden lg:block" style={{ position: "relative", padding: "96px 24px" }}>
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "1.05fr 1fr",
          gap: "64px",
          alignItems: "center",
          maxWidth: "1200px",
          margin: "0 auto",
        }}
      >
        {/* LEFT — copy */}
        <div className="vg-item">
          <span
            className="vg-glass"
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: "7px",
              fontSize: "11px",
              fontWeight: 700,
              letterSpacing: "0.28em",
              textTransform: "uppercase",
              color: FUCHSIA_DARK,
              borderRadius: "999px",
              padding: "6px 14px",
              marginBottom: "22px",
            }}
          >
            <Sparkles size={12} />
            Bachpan &middot; The Little Kingdom &middot; Gumla
          </span>

          <h2
            style={{
              fontFamily: "Georgia, serif",
              fontSize: "clamp(2rem, 4.2vw, 3.1rem)",
              color: "#18181b",
              lineHeight: 1.18,
              marginBottom: "20px",
              fontWeight: "normal",
            }}
          >
            Let your{" "}
            <span
              style={{
                background: `linear-gradient(90deg, ${FUCHSIA_DARK}, ${FUCHSIA_MID})`,
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                backgroundClip: "text",
              }}
            >
              children
            </span>{" "}
            learn from the best.
          </h2>

          <p
            style={{
              fontSize: "15.5px",
              color: "#52525b",
              lineHeight: 1.75,
              maxWidth: "440px",
              marginBottom: "32px",
            }}
          >
            Discover a joyful learning environment where children grow
            academically, socially, and emotionally through creativity and care.
          </p>

          {/* Buttons */}
          <div style={{ display: "flex", gap: "14px", marginBottom: "44px", flexWrap: "wrap" }}>
            <Link
              to="/gallery"
              className="vg-shine"
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: "8px",
                padding: "14px 26px",
                borderRadius: "999px",
                background: `linear-gradient(135deg, ${FUCHSIA_DARK} 0%, ${FUCHSIA_MID} 60%, ${FUCHSIA} 100%)`,
                color: "#ffffff",
                textDecoration: "none",
                fontWeight: 700,
                fontSize: "14px",
                border: "1px solid rgba(255,255,255,0.35)",
                boxShadow: btnHover
                  ? "0 14px 34px -8px rgba(134,25,143,0.5), inset 0 1px 0 rgba(255,255,255,0.4)"
                  : "0 8px 22px -8px rgba(134,25,143,0.35), inset 0 1px 0 rgba(255,255,255,0.3)",
                transform: btnHover ? "translateY(-2px)" : "none",
                transition: "0.25s",
              }}
              onMouseEnter={() => setBtnHover(true)}
              onMouseLeave={() => setBtnHover(false)}
            >
              <Images size={16} />
              Visit Gallery
              <ArrowRight size={15} style={{ transform: btnHover ? "translateX(2px)" : "none", transition: "0.2s" }} />
            </Link>

            <a
              href="tel:+919608881888"
              className="vg-glass vg-shine"
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: "8px",
                padding: "14px 26px",
                borderRadius: "999px",
                color: FUCHSIA_DARK,
                textDecoration: "none",
                fontWeight: 700,
                fontSize: "14px",
                borderColor: telHover ? FUCHSIA : "rgba(255,255,255,0.7)",
                background: telHover ? "rgba(255,255,255,0.7)" : "rgba(255,255,255,0.5)",
                boxShadow: telHover
                  ? "0 10px 24px -10px rgba(134,25,143,0.3), inset 0 1px 0 rgba(255,255,255,0.9)"
                  : "0 10px 26px -14px rgba(74,4,78,0.28), inset 0 1px 0 rgba(255,255,255,0.85)",
                transform: telHover ? "translateY(-2px)" : "none",
                transition: "0.25s",
              }}
              onMouseEnter={() => setTelHover(true)}
              onMouseLeave={() => setTelHover(false)}
            >
              <Phone size={15} />
              Contact Us
            </a>
          </div>

          {/* Stats */}
          <div style={{ display: "flex", gap: "14px", flexWrap: "wrap" }}>
            {stats.map((stat) => {
              const Icon = stat.icon;
              return (
                <div
                  key={stat.label}
                  className="vg-glass"
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: "12px",
                    padding: "12px 18px",
                    borderRadius: "14px",
                  }}
                >
                  <span
                    className="vg-glass"
                    style={{
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      width: "34px",
                      height: "34px",
                      borderRadius: "10px",
                      color: FUCHSIA,
                      flexShrink: 0,
                    }}
                  >
                    <Icon size={16} />
                  </span>
                  <div>
                    <p style={{ fontSize: "18px", fontWeight: 700, color: "#18181b", margin: 0, lineHeight: 1.1 }}>
                      {stat.num}
                    </p>
                    <p
                      style={{
                        fontSize: "10px",
                        letterSpacing: "0.16em",
                        textTransform: "uppercase",
                        color: "#9ca3af",
                        margin: "2px 0 0",
                      }}
                    >
                      {stat.label}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* RIGHT — bento photo grid */}
        <div
          className="vg-item"
          style={{
            display: "grid",
            gridTemplateColumns: "1fr 1fr",
            gridTemplateRows: "160px 160px 110px",
            gap: "12px",
            animationDelay: "0.1s",
          }}
        >
          {/* Tall image, spans both rows on the left column */}
          <div
            style={{
              gridColumn: "1",
              gridRow: "1 / span 2",
              position: "relative",
              overflow: "hidden",
              borderRadius: "20px",
              cursor: "pointer",
              border: "1px solid rgba(255,255,255,0.6)",
              boxShadow: "0 16px 32px -18px rgba(74,4,78,0.4)",
            }}
            onMouseEnter={() => setHovered(0)}
            onMouseLeave={() => setHovered(null)}
          >
            <img
              src={photos[0].src}
              alt={photos[0].label}
              style={{
                width: "100%",
                height: "100%",
                objectFit: "cover",
                transform: hovered === 0 ? "scale(1.08)" : "scale(1)",
                transition: "0.5s",
              }}
            />
            <PhotoCaption label={photos[0].label} visible={hovered === 0} />
          </div>

          {/* Two stacked images, right column */}
          {[photos[1], photos[2]].map((photo, idx) => {
            const i = idx + 1;
            return (
              <div
                key={photo.label}
                style={{
                  gridColumn: "2",
                  gridRow: String(i),
                  position: "relative",
                  overflow: "hidden",
                  borderRadius: "20px",
                  cursor: "pointer",
                  border: "1px solid rgba(255,255,255,0.6)",
                  boxShadow: "0 16px 32px -18px rgba(74,4,78,0.4)",
                }}
                onMouseEnter={() => setHovered(i)}
                onMouseLeave={() => setHovered(null)}
              >
                <img
                  src={photo.src}
                  alt={photo.label}
                  style={{
                    width: "100%",
                    height: "100%",
                    objectFit: "cover",
                    transform: hovered === i ? "scale(1.08)" : "scale(1)",
                    transition: "0.5s",
                  }}
                />
                <PhotoCaption label={photo.label} visible={hovered === i} />
              </div>
            );
          })}

          {/* Wide banner tile — 4th photo doubles as a "view full gallery" CTA */}
          <Link
            to="/gallery"
            style={{
              gridColumn: "1 / span 2",
              gridRow: "3",
              position: "relative",
              overflow: "hidden",
              borderRadius: "20px",
              display: "block",
              textDecoration: "none",
              border: "1px solid rgba(255,255,255,0.35)",
            }}
            onMouseEnter={() => setCtaHover(true)}
            onMouseLeave={() => setCtaHover(false)}
          >
            <img
              src={photos[3].src}
              alt={photos[3].label}
              style={{
                width: "100%",
                height: "100%",
                objectFit: "cover",
                transform: ctaHover ? "scale(1.06)" : "scale(1)",
                transition: "0.5s",
                filter: "brightness(0.6)",
              }}
            />
            <div
              className="vg-glass-dark"
              style={{
                position: "absolute",
                inset: 0,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                gap: "8px",
                border: "none",
                background: ctaHover
                  ? "linear-gradient(135deg, rgba(74,4,78,0.6) 0%, rgba(162,28,175,0.48) 100%)"
                  : "linear-gradient(135deg, rgba(74,4,78,0.5) 0%, rgba(162,28,175,0.36) 100%)",
              }}
            >
              <span
                className="vg-glass"
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  gap: "7px",
                  color: "#ffffff",
                  fontWeight: 700,
                  fontSize: "13.5px",
                  padding: "10px 18px",
                  borderRadius: "999px",
                  background: "rgba(255,255,255,0.12)",
                }}
              >
                <Images size={15} />
                View Full Gallery
                <ArrowRight size={14} style={{ transform: ctaHover ? "translateX(3px)" : "none", transition: "0.2s" }} />
              </span>
            </div>
          </Link>
        </div>
      </div>

      <p style={{ textAlign: "center", marginTop: "56px", fontSize: "11px", letterSpacing: "0.22em", color: "#a1a1aa" }}>
        &copy; Bachpan &middot; The Little Kingdom &middot; Gumla
      </p>
    </div>
  );
}

function PhotoCaption({ label, visible }) {
  return (
    <div
      className="vg-glass-dark"
      style={{
        position: "absolute",
        bottom: 0,
        left: 0,
        right: 0,
        padding: "10px 12px",
        borderLeft: "none",
        borderRight: "none",
        borderBottom: "none",
        color: "#ffffff",
        fontSize: "12.5px",
        fontWeight: 600,
        opacity: visible ? 1 : 0,
        transform: visible ? "translateY(0)" : "translateY(4px)",
        transition: "0.25s",
      }}
    >
      {label}
    </div>
  );
}