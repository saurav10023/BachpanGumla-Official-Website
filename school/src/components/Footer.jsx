import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { FaFacebookF, FaInstagram, FaYoutube, FaLock, FaWhatsapp, FaPhoneAlt } from "react-icons/fa";
import logo from "../files/logo.jpg";

const FUCHSIA = "#86198f";
const FUCHSIA_DARK = "#4a044e";
const FUCHSIA_MID = "#a21caf";

// WhatsApp's own brand green — the one deliberate break from the fuchsia
// theme, same logic as the "urgent" red on the notices page: a color this
// recognizable communicates faster than matching the palette would.
const WHATSAPP_GREEN = "#25D366";
const WHATSAPP_GREEN_DARK = "#128C7E";

const PHONE_DISPLAY = "+91-9608881888";
const PHONE_TEL = "+919608881888";
const WHATSAPP_NUMBER = "919608881888"; // wa.me format — no +, spaces, or dashes
const WHATSAPP_MESSAGE =
  "Hi! I'd like to know more about Bachpan – The Little Kingdom.";
const WHATSAPP_LINK = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(WHATSAPP_MESSAGE)}`;

const links = [
  { to: "/admission/process", label: "Admission" },
  { to: "https://btlk.scientificstudy.in/payment?key=btlk", label: "Online Fee Payment" },
  { to: "/contact", label: "Contact Us" },
  { to: "/gallery", label: "Gallery" },
];

const socials = [
  { Icon: FaFacebookF, dest: "https://www.facebook.com/@bachpangumla/?hr=1&wtsid=rdr_0METeFFJ1Q4QWwAKI" },
  { Icon: FaInstagram, dest: "https://www.instagram.com/bachpanthelittlekingdom?igsh=c2RnbTJudW51dWQx" },
  { Icon: FaYoutube, dest: "" },
];

// Where the admin login page lives. Update this if your router uses a
// different path.
const ADMIN_LOGIN_PATH = "/admin/login";

function SocialIcon({ Icon, dest, hoverColor = "#ffffff" }) {
  return (
    <a href={dest} target="_blank" rel="noopener noreferrer">
      <div
        style={{
          width: "40px",
          height: "40px",
          borderRadius: "50%",
          background: "rgba(255,255,255,0.12)",
          border: "1px solid rgba(255,255,255,0.25)",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          cursor: "pointer",
          transition: "all 0.2s ease",
          color: "#ffffff",
        }}
        onMouseEnter={(e) => {
          e.currentTarget.style.background = hoverColor;
          e.currentTarget.style.color = hoverColor === "#ffffff" ? FUCHSIA : "#ffffff";
          e.currentTarget.style.borderColor = hoverColor;
          e.currentTarget.style.transform = "translateY(-2px)";
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.background = "rgba(255,255,255,0.12)";
          e.currentTarget.style.color = "#ffffff";
          e.currentTarget.style.borderColor = "rgba(255,255,255,0.25)";
          e.currentTarget.style.transform = "translateY(0)";
        }}
      >
        <Icon size={16} />
      </div>
    </a>
  );
}

// Deliberately understated — school staff know to look for it, but it
// shouldn't compete visually with the parent-facing links above it.
function AdminLoginLink({ variant = "desktop" }) {
  const isMobile = variant === "mobile";
  return (
    <Link
      to={ADMIN_LOGIN_PATH}
      style={{
        fontFamily: "sans-serif",
        fontSize: isMobile ? "11px" : "12px",
        color: "rgba(255,255,255,0.45)",
        textDecoration: "none",
        display: "inline-flex",
        alignItems: "center",
        gap: "5px",
        transition: "color 0.2s ease",
      }}
      onMouseEnter={(e) => (e.currentTarget.style.color = "#f0abfc")}
      onMouseLeave={(e) => (e.currentTarget.style.color = "rgba(255,255,255,0.45)")}
    >
      <FaLock size={10} />
      Staff Login
    </Link>
  );
}

// Two equal-weight ways to reach the school directly — call or WhatsApp —
// styled as a pair of pill buttons rather than a plain phone number, so the
// card reads as "do something" instead of just "here's a number."
function ReachUsCard({ compact = false }) {
  return (
    <div
      style={{
        padding: compact ? "16px" : "18px",
        borderRadius: "14px",
        background: "rgba(255,255,255,0.08)",
        border: "1px solid rgba(255,255,255,0.14)",
      }}
    >
      <p
        style={{
          fontFamily: "sans-serif",
          fontSize: "11px",
          letterSpacing: "0.16em",
          textTransform: "uppercase",
          color: "rgba(255,255,255,0.55)",
          margin: "0 0 12px 0",
        }}
      >
        Reach us directly
      </p>

      <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
        <a
          href={WHATSAPP_LINK}
          target="_blank"
          rel="noopener noreferrer"
          style={{
            display: "flex",
            alignItems: "center",
            gap: "10px",
            padding: "10px 14px",
            borderRadius: "10px",
            background: WHATSAPP_GREEN,
            color: "#ffffff",
            textDecoration: "none",
            fontFamily: "sans-serif",
            fontSize: "13px",
            fontWeight: 600,
            transition: "filter 0.15s ease, transform 0.15s ease",
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.filter = "brightness(1.06)";
            e.currentTarget.style.transform = "translateY(-1px)";
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.filter = "brightness(1)";
            e.currentTarget.style.transform = "translateY(0)";
          }}
        >
          <FaWhatsapp size={16} />
          Chat on WhatsApp
        </a>

        <a
          href={`tel:${PHONE_TEL}`}
          style={{
            display: "flex",
            alignItems: "center",
            gap: "10px",
            padding: "10px 14px",
            borderRadius: "10px",
            background: "rgba(255,255,255,0.08)",
            border: "1px solid rgba(255,255,255,0.16)",
            color: "#ffffff",
            textDecoration: "none",
            fontFamily: "sans-serif",
            fontSize: "13px",
            fontWeight: 600,
            transition: "background 0.15s ease",
          }}
          onMouseEnter={(e) => (e.currentTarget.style.background = "rgba(255,255,255,0.16)")}
          onMouseLeave={(e) => (e.currentTarget.style.background = "rgba(255,255,255,0.08)")}
        >
          <FaPhoneAlt size={13} />
          {PHONE_DISPLAY}
        </a>
      </div>
    </div>
  );
}

// Fixed, site-wide click-to-chat button. Lives inside Footer since that's
// the shared file, but positioning is fixed so it stays on screen
// regardless of scroll position, on every page Footer is mounted on.
function WhatsAppFloatingButton() {
  const [showTooltip, setShowTooltip] = useState(false);

  return (
    <a
      href={WHATSAPP_LINK}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Chat with us on WhatsApp"
      onMouseEnter={() => setShowTooltip(true)}
      onMouseLeave={() => setShowTooltip(false)}
      style={{
        position: "fixed",
        right: "20px",
        bottom: "20px",
        zIndex: 40,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        width: "56px",
        height: "56px",
        borderRadius: "50%",
        background: WHATSAPP_GREEN,
        boxShadow: "0 8px 24px rgba(37,211,102,0.45)",
        color: "#ffffff",
        textDecoration: "none",
        transition: "transform 0.2s ease, box-shadow 0.2s ease",
      }}
      onMouseDown={(e) => (e.currentTarget.style.transform = "scale(0.94)")}
      onMouseUp={(e) => (e.currentTarget.style.transform = "scale(1)")}
    >
      <span
        aria-hidden="true"
        style={{
          position: "absolute",
          inset: 0,
          borderRadius: "50%",
          background: WHATSAPP_GREEN,
          animation: "wa-pulse 2.4s ease-out infinite",
        }}
      />
      <FaWhatsapp size={26} style={{ position: "relative" }} />

      <span
        style={{
          position: "absolute",
          right: "68px",
          top: "50%",
          transform: `translateY(-50%) translateX(${showTooltip ? "0" : "6px"})`,
          whiteSpace: "nowrap",
          background: FUCHSIA_DARK,
          color: "#ffffff",
          fontFamily: "sans-serif",
          fontSize: "12.5px",
          fontWeight: 600,
          padding: "7px 12px",
          borderRadius: "8px",
          opacity: showTooltip ? 1 : 0,
          pointerEvents: "none",
          transition: "opacity 0.18s ease, transform 0.18s ease",
          boxShadow: "0 4px 14px rgba(0,0,0,0.2)",
        }}
      >
        Chat with us
      </span>
    </a>
  );
}

export default function Footer() {
  const year = new Date().getFullYear();

  const gradientBg = `linear-gradient(135deg, ${FUCHSIA_DARK} 0%, ${FUCHSIA_MID} 60%, ${FUCHSIA} 100%)`;

  const footerLinkStyle = {
    fontFamily: "sans-serif",
    fontSize: "13px",
    color: "rgba(255,255,255,0.75)",
    textDecoration: "none",
    transition: "color 0.2s ease",
    display: "inline-block",
  };

  return (
    <>
      <style>{`
        @keyframes wa-pulse {
          0%   { transform: scale(1);   opacity: 0.55; }
          70%  { transform: scale(1.9); opacity: 0; }
          100% { transform: scale(1.9); opacity: 0; }
        }
        @media (prefers-reduced-motion: reduce) {
          [style*="wa-pulse"] { animation: none !important; }
        }
      `}</style>

      {/* ── MOBILE FOOTER ── */}
      <footer
        className="lg:hidden"
        style={{ background: gradientBg, color: "#fff" }}
      >
        <div style={{ padding: "36px 24px 20px", display: "flex", flexDirection: "column", alignItems: "center", gap: "24px" }}>

          {/* Logo */}
          <div style={{ background: "#fff", borderRadius: "12px", padding: "6px 10px", boxShadow: "0 4px 16px rgba(0,0,0,0.15)" }}>
            <img src={logo} alt="School Logo" style={{ height: "48px", display: "block" }} />
          </div>

          {/* School name */}
          <div style={{ textAlign: "center" }}>
            <p style={{ fontFamily: "Georgia, serif", fontSize: "16px", color: "#fff", margin: "0 0 4px 0" }}>
              Bachpan, The Little Kingdom
            </p>
            <p style={{ fontFamily: "sans-serif", fontSize: "10px", letterSpacing: "0.2em", textTransform: "uppercase", color: "rgba(255,255,255,0.55)", margin: 0 }}>
              Gumla &middot; Jharkhand
            </p>
          </div>

          {/* Divider */}
          <div style={{ width: "40px", height: "1px", background: "rgba(255,255,255,0.3)" }} />

          {/* Address */}
          <div style={{ textAlign: "center", fontFamily: "sans-serif", fontSize: "13px", color: "rgba(255,255,255,0.7)", lineHeight: 1.8 }}>
            <p style={{ margin: 0 }}>Lohardaga Road, Behind State Bus Depot</p>
            <p style={{ margin: 0 }}>Gumla - 835207, Jharkhand</p>
            <p style={{ margin: "4px 0 0 0" }}>
              <a href="mailto:bachpangumla@gmail.com" style={{ color: "#f0abfc", textDecoration: "none" }}>
                bachpangumla@gmail.com
              </a>
            </p>
            <p style={{ margin: 0 }}>
              <a href="https://www.bachpangumla.com" style={{ color: "#f0abfc", textDecoration: "none" }}>
                www.bachpangumla.com
              </a>
            </p>
          </div>

          {/* Reach us — call + WhatsApp */}
          <div style={{ width: "100%" }}>
            <ReachUsCard compact />
          </div>

          {/* Quick links */}
          <div style={{ textAlign: "center" }}>
            <p style={{ fontFamily: "sans-serif", fontSize: "11px", letterSpacing: "0.2em", textTransform: "uppercase", color: "rgba(255,255,255,0.5)", margin: "0 0 12px 0" }}>
              Quick Links
            </p>
            <div style={{ display: "flex", flexWrap: "wrap", justifyContent: "center", gap: "8px" }}>
              {links.map((l) => (
                <Link
                  key={l.label}
                  to={l.to}
                  style={{
                    fontFamily: "sans-serif",
                    fontSize: "12px",
                    color: "rgba(255,255,255,0.8)",
                    textDecoration: "none",
                    padding: "5px 12px",
                    borderRadius: "999px",
                    border: "1px solid rgba(255,255,255,0.2)",
                    background: "rgba(255,255,255,0.08)",
                    transition: "all 0.2s ease",
                  }}
                  onMouseEnter={(e) => { e.currentTarget.style.background = "rgba(255,255,255,0.2)"; }}
                  onMouseLeave={(e) => { e.currentTarget.style.background = "rgba(255,255,255,0.08)"; }}
                >
                  {l.label}
                </Link>
              ))}
            </div>
          </div>

          {/* Socials */}
          <div style={{ display: "flex", gap: "10px" }}>
            {socials.map((s, i) => <SocialIcon key={i} Icon={s.Icon} dest={s.dest} />)}
          </div>

          {/* Bottom */}
          <div style={{ borderTop: "1px solid rgba(255,255,255,0.15)", paddingTop: "16px", textAlign: "center", width: "100%", display: "flex", flexDirection: "column", alignItems: "center", gap: "10px" }}>
            <p style={{ fontFamily: "sans-serif", fontSize: "11px", color: "rgba(255,255,255,0.5)", margin: 0 }}>
              &copy; {year} Bachpan The Little Kingdom. All rights reserved.
            </p>
            <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
              <a
                href="https://github.com/saurav10023"
                target="_blank"
                rel="noopener noreferrer"
                style={{ fontFamily: "sans-serif", fontSize: "11px", color: "#f0abfc", textDecoration: "none" }}
              >
                Designed by Kumar Saurav
              </a>
              <div style={{ width: "1px", height: "12px", background: "rgba(255,255,255,0.25)" }} />
              <AdminLoginLink variant="mobile" />
            </div>
          </div>
        </div>
      </footer>

      {/* ── DESKTOP FOOTER ── */}
      <footer
        className="hidden lg:block"
        style={{ background: gradientBg, color: "#fff" }}
      >
        {/* Main content */}
        <div
          style={{
            maxWidth: "1280px",
            margin: "0 auto",
            padding: "52px 32px 40px",
            display: "grid",
            gridTemplateColumns: "2fr 1fr 1fr",
            gap: "48px",
            alignItems: "start",
          }}
        >
          {/* Col 1 — Brand */}
          <div>
            <div style={{ display: "flex", alignItems: "center", gap: "14px", marginBottom: "20px" }}>
              <div style={{ background: "#fff", borderRadius: "12px", padding: "5px 8px", boxShadow: "0 4px 16px rgba(0,0,0,0.18)" }}>
                <img src={logo} alt="School Logo" style={{ height: "48px", display: "block" }} />
              </div>
              <div>
                <p style={{ fontFamily: "Georgia, serif", fontSize: "16px", color: "#fff", margin: 0, lineHeight: 1.2 }}>
                  Bachpan
                </p>
                <p style={{ fontFamily: "sans-serif", fontSize: "10px", letterSpacing: "0.18em", textTransform: "uppercase", color: "rgba(255,255,255,0.55)", margin: 0 }}>
                  The Little Kingdom
                </p>
              </div>
            </div>

            <div style={{ fontFamily: "sans-serif", fontSize: "13px", color: "rgba(255,255,255,0.7)", lineHeight: 2 }}>
              <p style={{ margin: 0 }}>Lohardaga Road, Behind State Bus Depot</p>
              <p style={{ margin: 0 }}>Gumla - 835207, Jharkhand</p>
              <p style={{ margin: "6px 0 0 0" }}>
                <a href="mailto:bachpangumla@gmail.com" style={{ color: "#f0abfc", textDecoration: "none" }}>
                  bachpangumla@gmail.com
                </a>
              </p>
              <p style={{ margin: 0 }}>
                <a href="https://www.bachpangumla.com" style={{ color: "#f0abfc", textDecoration: "none" }}>
                  www.bachpangumla.com
                </a>
              </p>
            </div>

            <div style={{ display: "flex", gap: "10px", marginTop: "22px" }}>
              {socials.map((s, i) => <SocialIcon key={i} Icon={s.Icon} dest={s.dest} />)}
            </div>
          </div>

          {/* Col 2 — Quick Links */}
          <div>
            <p style={{ fontFamily: "sans-serif", fontSize: "11px", letterSpacing: "0.2em", textTransform: "uppercase", color: "rgba(255,255,255,0.5)", margin: "0 0 16px 0" }}>
              Quick Links
            </p>
            <ul style={{ listStyle: "none", margin: 0, padding: 0, display: "flex", flexDirection: "column", gap: "10px" }}>
              {links.map((l) => (
                <li key={l.label}>
                  <Link
                    to={l.to}
                    style={footerLinkStyle}
                    onMouseEnter={(e) => { e.currentTarget.style.color = "#f0abfc"; e.currentTarget.style.paddingLeft = "6px"; }}
                    onMouseLeave={(e) => { e.currentTarget.style.color = "rgba(255,255,255,0.75)"; e.currentTarget.style.paddingLeft = "0px"; }}
                  >
                    &#8250;&nbsp; {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Col 3 — Reach us */}
          <div>
            <ReachUsCard />
          </div>
        </div>

        {/* Bottom bar */}
        <div style={{ borderTop: "1px solid rgba(255,255,255,0.12)" }}>
          <div
            style={{
              maxWidth: "1280px",
              margin: "0 auto",
              padding: "14px 32px",
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <p style={{ fontFamily: "sans-serif", fontSize: "12px", color: "rgba(255,255,255,0.45)", margin: 0 }}>
              &copy; {year} Bachpan The Little Kingdom. All rights reserved.
            </p>
            <div style={{ display: "flex", alignItems: "center", gap: "16px" }}>
              <a
                href="https://github.com/saurav10023"
                target="_blank"
                rel="noopener noreferrer"
                style={{ fontFamily: "sans-serif", fontSize: "12px", color: "#f0abfc", textDecoration: "none" }}
                onMouseEnter={(e) => (e.currentTarget.style.color = "#ffffff")}
                onMouseLeave={(e) => (e.currentTarget.style.color = "#f0abfc")}
              >
                Designed by Kumar Saurav
              </a>
              <div style={{ width: "1px", height: "16px", background: "rgba(255,255,255,0.2)" }} />
              <AdminLoginLink variant="desktop" />
            </div>
          </div>
        </div>
      </footer>

      <WhatsAppFloatingButton />
    </>
  );
}