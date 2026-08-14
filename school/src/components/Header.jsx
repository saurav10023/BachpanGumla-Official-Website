import React, { useState, useRef, useEffect } from "react";
import { Link } from "react-router-dom";
import logo from "../files/logo.jpg";
import {
  List,
  X,
  ChevronDown,
  ChevronUp,
  HouseIcon,
  HandshakeIcon,
  Backpack,
  FileUserIcon,
  ImagesIcon,
  CreditCardIcon,
  HeadsetIcon,
  UserPlusIcon,
  Baby,
  BookOpen,
  School,
  ClipboardList,
  FileQuestion,
  UserCheck,
  AlignVerticalJustifyEnd,
  CalendarDays,
  MonitorPlay,
  Info,
  Megaphone,
  Rocket,
} from "lucide-react";

export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [courseOpen, setCourseOpen] = useState(false);
  const [admissionOpen, setAdmissionOpen] = useState(false);
  const [schoolInfoOpen, setSchoolInfoOpen] = useState(false);
  const [display1, setDisplay1] = useState(false);
  const [display2, setDisplay2] = useState(false);
  const [display3, setDisplay3] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  const desktopRef = useRef(null);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 10);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (desktopRef.current && !desktopRef.current.contains(e.target)) {
        setDisplay1(false);
        setDisplay2(false);
        setDisplay3(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const closeAll = () => {
    setMenuOpen(false);
    setCourseOpen(false);
    setAdmissionOpen(false);
    setSchoolInfoOpen(false);
  };

  const clickcourse = () => {
    setCourseOpen(!courseOpen);
    setAdmissionOpen(false);
    setSchoolInfoOpen(false);
  };

  const clickadmission = () => {
    setAdmissionOpen(!admissionOpen);
    setCourseOpen(false);
    setSchoolInfoOpen(false);
  };

  const clickschoolinfo = () => {
    setSchoolInfoOpen(!schoolInfoOpen);
    setCourseOpen(false);
    setAdmissionOpen(false);
  };

  const off = () => {
    setDisplay1(false);
    setDisplay2(false);
    setDisplay3(false);
  };

  const togglecourse = () => {
    setDisplay1(!display1);
    setDisplay2(false);
    setDisplay3(false);
  };

  const toggleadd = () => {
    setDisplay2(!display2);
    setDisplay1(false);
    setDisplay3(false);
  };

  const toggleschoolinfo = () => {
    setDisplay3(!display3);
    setDisplay1(false);
    setDisplay2(false);
  };

  const FUCHSIA = "#86198f";
  const FUCHSIA_DARK = "#4a044e";
  const FUCHSIA_MID = "#a21caf";
  const FUCHSIA_LIGHT = "#fdf4ff";
  const FUCHSIA_BORDER = "#e879f9";
  const AMBER = "#f59e0b";
  const AMBER_DARK = "#b45309";

  const navLinkStyle = {
    fontFamily: "sans-serif",
    fontSize: "13.5px",
    fontWeight: 500,
    letterSpacing: "0.04em",
    color: "#ffffff",
    textDecoration: "none",
    padding: "6px 2px",
    transition: "border-color 0.2s ease",
    whiteSpace: "nowrap",
    background: "none",
    border: "none",
    borderBottom: "2px solid transparent",
    cursor: "pointer",
  };

  // Shared look for the two header CTAs (Pay Fees / Register Online) — both
  // are frosted glass now: ghost is a light glass chip, primary is a tinted
  // amber-gradient glass chip with a shine sweep on hover.
  const ctaStyle = (variant) => ({
    display: "inline-flex",
    alignItems: "center",
    gap: "7px",
    fontFamily: "sans-serif",
    fontSize: "12.5px",
    fontWeight: 700,
    letterSpacing: "0.01em",
    textDecoration: "none",
    padding: "9px 18px",
    borderRadius: "10px",
    whiteSpace: "nowrap",
    backdropFilter: "blur(10px)",
    WebkitBackdropFilter: "blur(10px)",
    transition: "transform 0.2s ease, box-shadow 0.2s ease, background 0.2s ease, color 0.2s ease",
    ...(variant === "ghost"
      ? {
          background: "rgba(255,255,255,0.12)",
          border: "1px solid rgba(255,255,255,0.4)",
          color: "#ffffff",
          boxShadow: "inset 0 1px 0 rgba(255,255,255,0.25)",
        }
      : {
          background: `linear-gradient(135deg, rgba(245,158,11,0.9) 0%, rgba(180,83,9,0.9) 100%)`,
          border: "1px solid rgba(255,255,255,0.35)",
          color: "#ffffff",
          boxShadow: "0 8px 22px -8px rgba(180,83,9,0.55), inset 0 1px 0 rgba(255,255,255,0.3)",
        }),
  });

  const ctaHoverOn = (e, variant) => {
    if (variant === "ghost") {
      e.currentTarget.style.background = "rgba(255,255,255,0.85)";
      e.currentTarget.style.color = FUCHSIA_DARK;
      e.currentTarget.style.borderColor = "rgba(255,255,255,0.9)";
    } else {
      e.currentTarget.style.transform = "translateY(-2px)";
      e.currentTarget.style.boxShadow = "0 12px 28px -8px rgba(180,83,9,0.65), inset 0 1px 0 rgba(255,255,255,0.4)";
    }
  };

  const ctaHoverOff = (e, variant) => {
    if (variant === "ghost") {
      e.currentTarget.style.background = "rgba(255,255,255,0.12)";
      e.currentTarget.style.color = "#ffffff";
      e.currentTarget.style.borderColor = "rgba(255,255,255,0.4)";
    } else {
      e.currentTarget.style.transform = "translateY(0)";
      e.currentTarget.style.boxShadow = "0 8px 22px -8px rgba(180,83,9,0.55), inset 0 1px 0 rgba(255,255,255,0.3)";
    }
  };

  const dropdownItemStyle = {
    display: "flex",
    alignItems: "center",
    gap: "10px",
    padding: "10px 16px",
    fontFamily: "sans-serif",
    fontSize: "13px",
    color: FUCHSIA_DARK,
    textDecoration: "none",
    transition: "background 0.15s ease",
    borderRadius: "8px",
    margin: "2px 4px",
  };

  // Frosted glass panel used for both mobile menu and desktop dropdowns —
  // replaces the old flat white panel.
  const glassPanelStyle = {
    background: "rgba(255,255,255,0.75)",
    backdropFilter: "blur(18px)",
    WebkitBackdropFilter: "blur(18px)",
    border: "1px solid rgba(255,255,255,0.85)",
    boxShadow: "0 14px 40px -12px rgba(74,4,78,0.28), inset 0 1px 0 rgba(255,255,255,0.9)",
  };

  const schoolInfoItems = [
    { to: "/gallery", icon: <ImagesIcon size={15} />, label: "Gallery" },
    { to: "/feestructure", icon: <AlignVerticalJustifyEnd size={15} />, label: "Fee Structure" },
    { to: "/holidays", icon: <CalendarDays size={15} />, label: "Holiday List" },
    { to: "https://btlk.scientificstudy.in/login", icon: <MonitorPlay size={15} />, label: "School Portal Login" },
  ];

  // Items shown in the scrolling announcement ticker. Keep labels short —
  // they read left to right at a glance, not as full sentences.
  const tickerItems = [
    { to: "/notices", icon: "📢", label: "Latest notices & announcements" },
    { to: "/admission/process", icon: "🎒", label: "Admissions open for 2026–27" },
    { to: "/gallery", icon: "📸", label: "New photos in the Gallery" },
    { to: "/holidays", icon: "📅", label: "Holiday list updated" },
    { to: "https://btlk.scientificstudy.in/payment?key=btlk", icon: "💳", label: "Pay fees online" },
  ];

  return (
    <>
      {/* Ticker + nav badge + glass-shine animations. Kept in a single
          <style> tag since this component has no external stylesheet. */}
      <style>{`
        @keyframes btlk-marquee {
          0%   { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
        @keyframes btlk-pulse-dot {
          0%, 100% { opacity: 1; transform: scale(1); }
          50%      { opacity: 0.45; transform: scale(1.35); }
        }
        .btlk-marquee-track {
          animation: btlk-marquee 32s linear infinite;
        }
        .btlk-marquee-wrapper:hover .btlk-marquee-track,
        .btlk-marquee-wrapper:focus-within .btlk-marquee-track {
          animation-play-state: paused;
        }
        .btlk-pulse-dot {
          animation: btlk-pulse-dot 1.8s ease-in-out infinite;
        }
        .btlk-shine { position: relative; overflow: hidden; isolation: isolate; }
        .btlk-shine::after {
          content: "";
          position: absolute;
          top: 0; left: -60%;
          width: 40%; height: 100%;
          background: linear-gradient(115deg, transparent, rgba(255,255,255,0.55), transparent);
          transform: skewX(-18deg);
          transition: left 0.75s ease;
          pointer-events: none;
        }
        .btlk-shine:hover::after { left: 130%; }
        @media (prefers-reduced-motion: reduce) {
          .btlk-marquee-track { animation: none; }
          .btlk-pulse-dot { animation: none; }
          .btlk-shine::after { transition: none; }
        }
      `}</style>

      {/* ── MOBILE ── */}
      <div
        className="lg:hidden"
        style={{
          position: "sticky",
          top: 0,
          zIndex: 50,
          background: `linear-gradient(135deg, rgba(74,4,78,0.82) 0%, rgba(134,25,143,0.82) 100%)`,
          backdropFilter: "blur(16px)",
          WebkitBackdropFilter: "blur(16px)",
          boxShadow: scrolled ? "0 4px 24px rgba(134,25,143,0.35)" : "none",
          borderBottom: "1px solid rgba(255,255,255,0.15)",
          transition: "box-shadow 0.3s ease",
        }}
      >
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            padding: "10px 16px",
          }}
        >
          <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
            <div
              className="btlk-shine"
              style={{
                background: "rgba(255,255,255,0.9)",
                borderRadius: "10px",
                padding: "3px",
                boxShadow: "0 2px 8px rgba(0,0,0,0.15), inset 0 1px 0 rgba(255,255,255,0.6)",
              }}
            >
              <img src={logo} alt="Logo" style={{ height: "40px", display: "block" }} />
            </div>
            <div>
              <p
                style={{
                  fontFamily: "Georgia, serif",
                  fontSize: "13px",
                  color: "#ffffff",
                  margin: 0,
                  lineHeight: 1.2,
                }}
              >
                Bachpan
              </p>
              <p
                style={{
                  fontFamily: "sans-serif",
                  fontSize: "10px",
                  color: "rgba(255,255,255,0.7)",
                  letterSpacing: "0.12em",
                  textTransform: "uppercase",
                  margin: 0,
                }}
              >
                The Little Kingdom
              </p>
            </div>
          </div>

          <button
            onClick={() => setMenuOpen(!menuOpen)}
            style={{
              background: "rgba(255,255,255,0.15)",
              backdropFilter: "blur(10px)",
              WebkitBackdropFilter: "blur(10px)",
              border: "1px solid rgba(255,255,255,0.3)",
              borderRadius: "8px",
              padding: "6px",
              color: "#fff",
              cursor: "pointer",
              display: "flex",
              alignItems: "center",
            }}
          >
            {menuOpen ? <X size={22} /> : <List size={22} />}
          </button>
        </div>

        {menuOpen && (
          <div
            style={{
              ...glassPanelStyle,
              padding: "8px 16px 20px",
              borderTop: "1px solid rgba(245,208,254,0.6)",
              borderLeft: "none",
              borderRight: "none",
              borderBottom: "none",
              borderRadius: 0,
              boxShadow: "0 18px 40px -18px rgba(74,4,78,0.3) inset",
            }}
          >
            {[
              { to: "/", icon: <HouseIcon size={18} />, label: "Home" },
              { to: "/about", icon: <HandshakeIcon size={18} />, label: "About Us" },
              { to: "/notices", icon: <Megaphone size={18} />, label: "Notices", badge: true },
            ].map((item) => (
              <Link
                key={item.label}
                to={item.to}
                onClick={closeAll}
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "12px",
                  padding: "12px 4px",
                  fontFamily: "sans-serif",
                  fontSize: "14px",
                  fontWeight: 600,
                  color: FUCHSIA_DARK,
                  textDecoration: "none",
                  borderBottom: "1px solid rgba(250,232,255,0.8)",
                }}
              >
                <span style={{ color: FUCHSIA, position: "relative" }}>
                  {item.icon}
                  {item.badge && (
                    <span
                      className="btlk-pulse-dot"
                      style={{
                        position: "absolute",
                        top: "-2px",
                        right: "-4px",
                        width: "7px",
                        height: "7px",
                        borderRadius: "50%",
                        background: AMBER,
                      }}
                    />
                  )}
                </span>
                {item.label}
              </Link>
            ))}

            {/* CTA pair — same two priority actions as desktop, sized for
                thumbs and given equal width so neither reads as an afterthought */}
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "10px", padding: "10px 4px 14px" }}>
              <Link
                to="https://btlk.scientificstudy.in/payment?key=btlk"
                onClick={closeAll}
                className="btlk-shine"
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  gap: "6px",
                  padding: "12px 8px",
                  borderRadius: "12px",
                  border: `1px solid ${FUCHSIA_BORDER}`,
                  background: "rgba(253,244,255,0.7)",
                  backdropFilter: "blur(8px)",
                  WebkitBackdropFilter: "blur(8px)",
                  color: FUCHSIA_DARK,
                  fontFamily: "sans-serif",
                  fontSize: "13px",
                  fontWeight: 700,
                  textDecoration: "none",
                  boxShadow: "inset 0 1px 0 rgba(255,255,255,0.8)",
                }}
              >
                <CreditCardIcon size={16} />
                Pay Fees
              </Link>
              <Link
                to="https://btlk.scientificstudy.in/admissionregistration?key=btlk"
                onClick={closeAll}
                className="btlk-shine"
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  gap: "6px",
                  padding: "12px 8px",
                  borderRadius: "12px",
                  border: "1px solid rgba(255,255,255,0.4)",
                  background: `linear-gradient(135deg, rgba(245,158,11,0.92) 0%, rgba(180,83,9,0.92) 100%)`,
                  backdropFilter: "blur(8px)",
                  WebkitBackdropFilter: "blur(8px)",
                  color: "#ffffff",
                  fontFamily: "sans-serif",
                  fontSize: "13px",
                  fontWeight: 700,
                  textDecoration: "none",
                  boxShadow: "0 6px 18px -6px rgba(180,83,9,0.45), inset 0 1px 0 rgba(255,255,255,0.35)",
                }}
              >
                <Rocket size={16} />
                Register Online
              </Link>
            </div>

            {/* Courses */}
            <button
              onClick={clickcourse}
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                width: "100%",
                padding: "12px 4px",
                fontFamily: "sans-serif",
                fontSize: "14px",
                fontWeight: 600,
                color: FUCHSIA_DARK,
                background: "none",
                border: "none",
                borderBottom: "1px solid rgba(250,232,255,0.8)",
                cursor: "pointer",
              }}
            >
              <span style={{ display: "flex", alignItems: "center", gap: "12px" }}>
                <span style={{ color: FUCHSIA }}><Backpack size={18} /></span>
                Our Courses
              </span>
              {courseOpen ? <ChevronUp size={16} color={FUCHSIA} /> : <ChevronDown size={16} color={FUCHSIA} />}
            </button>
            {courseOpen && (
              <div style={{ marginLeft: "16px", borderLeft: `2px solid ${FUCHSIA_BORDER}`, paddingLeft: "12px", paddingTop: "6px", paddingBottom: "6px", display: "flex", flexDirection: "column", gap: "6px" }}>
                {[
                  { to: "/courses/playgroup", icon: <Baby size={15} />, label: "Play Group" },
                  { to: "/courses/nursery", icon: <BookOpen size={15} />, label: "Kindergarten" },
                  { to: "/courses/primary", icon: <School size={15} />, label: "Primary School" },
                ].map((item) => (
                  <Link key={item.label} to={item.to} onClick={closeAll}
                    style={{ display: "flex", alignItems: "center", gap: "10px", padding: "8px 12px", borderRadius: "8px", background: "rgba(253,244,255,0.7)", backdropFilter: "blur(6px)", WebkitBackdropFilter: "blur(6px)", fontFamily: "sans-serif", fontSize: "13px", color: FUCHSIA, textDecoration: "none" }}>
                    {item.icon} {item.label}
                  </Link>
                ))}
              </div>
            )}

            {/* Admission */}
            <button
              onClick={clickadmission}
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                width: "100%",
                padding: "12px 4px",
                fontFamily: "sans-serif",
                fontSize: "14px",
                fontWeight: 600,
                color: FUCHSIA_DARK,
                background: "none",
                border: "none",
                borderBottom: "1px solid rgba(250,232,255,0.8)",
                cursor: "pointer",
              }}
            >
              <span style={{ display: "flex", alignItems: "center", gap: "12px" }}>
                <span style={{ color: FUCHSIA }}><FileUserIcon size={18} /></span>
                Admission
              </span>
              {admissionOpen ? <ChevronUp size={16} color={FUCHSIA} /> : <ChevronDown size={16} color={FUCHSIA} />}
            </button>
            {admissionOpen && (
              <div style={{ marginLeft: "16px", borderLeft: `2px solid ${FUCHSIA_BORDER}`, paddingLeft: "12px", paddingTop: "6px", paddingBottom: "6px", display: "flex", flexDirection: "column", gap: "6px" }}>
                {[
                  { to: "/admission/process", icon: <ClipboardList size={15} />, label: "Admission Process" },
                  { to: "https://btlk.scientificstudy.in/online/admissionenquiry?key=btlk&tab=admissionenquiry", icon: <FileQuestion size={15} />, label: "Admission Enquiry" },
                  { to: "https://btlk.scientificstudy.in/online/registration?key=btlk&tab=registration", icon: <UserCheck size={15} />, label: "Register Online" },
                ].map((item) => (
                  <Link key={item.label} to={item.to} onClick={closeAll}
                    style={{ display: "flex", alignItems: "center", gap: "10px", padding: "8px 12px", borderRadius: "8px", background: "rgba(253,244,255,0.7)", backdropFilter: "blur(6px)", WebkitBackdropFilter: "blur(6px)", fontFamily: "sans-serif", fontSize: "13px", color: FUCHSIA, textDecoration: "none" }}>
                    {item.icon} {item.label}
                  </Link>
                ))}
              </div>
            )}

            {/* School Info — mobile accordion */}
            <button
              onClick={clickschoolinfo}
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                width: "100%",
                padding: "12px 4px",
                fontFamily: "sans-serif",
                fontSize: "14px",
                fontWeight: 600,
                color: FUCHSIA_DARK,
                background: "none",
                border: "none",
                borderBottom: "1px solid rgba(250,232,255,0.8)",
                cursor: "pointer",
              }}
            >
              <span style={{ display: "flex", alignItems: "center", gap: "12px" }}>
                <span style={{ color: FUCHSIA }}><Info size={18} /></span>
                School Info
              </span>
              {schoolInfoOpen ? <ChevronUp size={16} color={FUCHSIA} /> : <ChevronDown size={16} color={FUCHSIA} />}
            </button>
            {schoolInfoOpen && (
              <div style={{ marginLeft: "16px", borderLeft: `2px solid ${FUCHSIA_BORDER}`, paddingLeft: "12px", paddingTop: "6px", paddingBottom: "6px", display: "flex", flexDirection: "column", gap: "6px" }}>
                {schoolInfoItems.map((item) => (
                  <Link key={item.label} to={item.to} onClick={closeAll}
                    style={{ display: "flex", alignItems: "center", gap: "10px", padding: "8px 12px", borderRadius: "8px", background: "rgba(253,244,255,0.7)", backdropFilter: "blur(6px)", WebkitBackdropFilter: "blur(6px)", fontFamily: "sans-serif", fontSize: "13px", color: FUCHSIA, textDecoration: "none" }}>
                    {item.icon} {item.label}
                  </Link>
                ))}
              </div>
            )}

            {[
              { to: "/contact", icon: <HeadsetIcon size={18} />, label: "Contact Us" },
              { to: "https://jobs.scientificstudy.in/career?schoolcode=btlk", icon: <UserPlusIcon size={18} />, label: "Career" },
            ].map((item) => (
              <Link key={item.label} to={item.to} onClick={closeAll}
                style={{ display: "flex", alignItems: "center", gap: "12px", padding: "12px 4px", fontFamily: "sans-serif", fontSize: "14px", fontWeight: 600, color: FUCHSIA_DARK, textDecoration: "none", borderBottom: "1px solid rgba(250,232,255,0.8)" }}>
                <span style={{ color: FUCHSIA }}>{item.icon}</span>
                {item.label}
              </Link>
            ))}
          </div>
        )}
      </div>

      {/* ── DESKTOP ── */}
      <div
        ref={desktopRef}
        className="hidden lg:block"
        style={{
          position: "sticky",
          top: 0,
          zIndex: 50,
          boxShadow: scrolled
            ? "0 4px 32px rgba(134,25,143,0.22)"
            : "0 2px 12px rgba(134,25,143,0.1)",
          transition: "box-shadow 0.3s ease",
        }}
      >
        {/* Top info bar — glass strip */}
        <div
          style={{
            background: "rgba(253,244,255,0.75)",
            backdropFilter: "blur(14px)",
            WebkitBackdropFilter: "blur(14px)",
            borderBottom: "1px solid rgba(245,208,254,0.7)",
            padding: "5px 0",
          }}
        >
          <div style={{ maxWidth: "1280px", margin: "0 auto", padding: "0 24px", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
            <p style={{ fontFamily: "sans-serif", fontSize: "12px", color: "#86198f", margin: 0 }}>
              &#9993;&nbsp;
              <a href="mailto:bachpangumla@gmail.com" style={{ color: FUCHSIA_DARK, fontWeight: 600, textDecoration: "none" }}>
                bachpangumla@gmail.com
              </a>
            </p>
            <p style={{ fontFamily: "sans-serif", fontSize: "12px", color: "#86198f", margin: 0 }}>
              &#128222;&nbsp;
              <a href="tel:+919608881888" style={{ color: FUCHSIA_DARK, fontWeight: 600, textDecoration: "none" }}>
                +91-9608881888
              </a>
            </p>
          </div>
        </div>

        {/* Main nav — translucent frosted gradient over whatever scrolls beneath it */}
        <div
          style={{
            background: `linear-gradient(135deg, rgba(74,4,78,0.85) 0%, rgba(162,28,175,0.85) 60%, rgba(134,25,143,0.85) 100%)`,
            backdropFilter: "blur(18px)",
            WebkitBackdropFilter: "blur(18px)",
            borderBottom: "1px solid rgba(255,255,255,0.12)",
            padding: "0 24px",
          }}
        >
          <div style={{ maxWidth: "1280px", margin: "0 auto", display: "flex", justifyContent: "space-between", alignItems: "center", height: "72px" }}>

            {/* Logo */}
            <div style={{ display: "flex", alignItems: "center", gap: "14px" }}>
              <div
                className="btlk-shine"
                style={{
                  background: "rgba(255,255,255,0.92)",
                  borderRadius: "12px",
                  padding: "4px",
                  boxShadow: "0 2px 16px rgba(0,0,0,0.18), inset 0 1px 0 rgba(255,255,255,0.6)",
                }}
              >
                <img src={logo} alt="Logo" style={{ height: "56px", display: "block" }} />
              </div>
              <div>
                <p style={{ fontFamily: "Georgia, serif", fontSize: "18px", fontWeight: "normal", color: "#ffffff", margin: 0, lineHeight: 1.2 }}>
                  Bachpan
                </p>
                <p style={{ fontFamily: "sans-serif", fontSize: "10px", color: "rgba(255,255,255,0.65)", letterSpacing: "0.18em", textTransform: "uppercase", margin: 0 }}>
                  The Little Kingdom &middot; Gumla
                </p>
              </div>
            </div>

            {/* Nav links + CTAs */}
            <div style={{ display: "flex", alignItems: "center", gap: "22px" }}>
            <nav>
              <ul style={{ display: "flex", alignItems: "center", gap: "4px", listStyle: "none", margin: 0, padding: 0 }}>

                {[{ to: "/", label: "Home" }, { to: "/about", label: "About Us" }].map((item) => (
                  <li key={item.label}>
                    <Link
                      to={item.to}
                      onClick={off}
                      style={{ ...navLinkStyle, display: "inline-block" }}
                      onMouseEnter={(e) => (e.currentTarget.style.borderBottomColor = "rgba(255,255,255,0.75)")}
                      onMouseLeave={(e) => (e.currentTarget.style.borderBottomColor = "transparent")}
                    >
                      {item.label}
                    </Link>
                  </li>
                ))}

                {/* Courses dropdown */}
                <li style={{ position: "relative" }}>
                  <button
                    onClick={togglecourse}
                    style={{
                      ...navLinkStyle,
                      borderBottom: display1 ? "2px solid rgba(255,255,255,0.75)" : "2px solid transparent",
                      display: "flex",
                      alignItems: "center",
                      gap: "4px",
                    }}
                  >
                    Our Courses
                    <ChevronDown size={14} style={{ transition: "transform 0.2s", transform: display1 ? "rotate(180deg)" : "rotate(0deg)" }} />
                  </button>
                  {display1 && (
                    <ul style={{ position: "absolute", top: "calc(100% + 10px)", left: "50%", transform: "translateX(-50%)", borderRadius: "12px", minWidth: "200px", padding: "6px 0", listStyle: "none", margin: 0, ...glassPanelStyle }}>
                      {[
                        { to: "/courses/playgroup", icon: <Baby size={15} />, label: "Play Group" },
                        { to: "/courses/nursery", icon: <BookOpen size={15} />, label: "Kindergarten" },
                        { to: "/courses/primary", icon: <School size={15} />, label: "Primary School" },
                      ].map((item) => (
                        <li key={item.label}>
                          <Link
                            to={item.to}
                            onClick={togglecourse}
                            style={dropdownItemStyle}
                            onMouseEnter={(e) => (e.currentTarget.style.background = "rgba(253,244,255,0.9)")}
                            onMouseLeave={(e) => (e.currentTarget.style.background = "transparent")}
                          >
                            <span style={{ color: FUCHSIA }}>{item.icon}</span>
                            {item.label}
                          </Link>
                        </li>
                      ))}
                    </ul>
                  )}
                </li>

                {/* Admission dropdown */}
                <li style={{ position: "relative" }}>
                  <button
                    onClick={toggleadd}
                    style={{
                      ...navLinkStyle,
                      borderBottom: display2 ? "2px solid rgba(255,255,255,0.75)" : "2px solid transparent",
                      display: "flex",
                      alignItems: "center",
                      gap: "4px",
                    }}
                  >
                    Admission
                    <ChevronDown size={14} style={{ transition: "transform 0.2s", transform: display2 ? "rotate(180deg)" : "rotate(0deg)" }} />
                  </button>
                  {display2 && (
                    <ul style={{ position: "absolute", top: "calc(100% + 10px)", left: "50%", transform: "translateX(-50%)", borderRadius: "12px", minWidth: "210px", padding: "6px 0", listStyle: "none", margin: 0, ...glassPanelStyle }}>
                      {[
                        { to: "/admission/process", icon: <ClipboardList size={15} />, label: "Admission Process" },
                        { to: "https://btlk.scientificstudy.in/online/admissionenquiry?key=btlk&tab=admissionenquiry", icon: <FileQuestion size={15} />, label: "Admission Enquiry" },
                        { to: "https://btlk.scientificstudy.in/online/registration?key=btlk&tab=registration", icon: <UserCheck size={15} />, label: "Register Online" },
                      ].map((item) => (
                        <li key={item.label}>
                          <Link
                            to={item.to}
                            onClick={toggleadd}
                            style={dropdownItemStyle}
                            onMouseEnter={(e) => (e.currentTarget.style.background = "rgba(253,244,255,0.9)")}
                            onMouseLeave={(e) => (e.currentTarget.style.background = "transparent")}
                          >
                            <span style={{ color: FUCHSIA }}>{item.icon}</span>
                            {item.label}
                          </Link>
                        </li>
                      ))}
                    </ul>
                  )}
                </li>

                {/* School Info dropdown */}
                <li style={{ position: "relative" }}>
                  <button
                    onClick={toggleschoolinfo}
                    style={{
                      ...navLinkStyle,
                      borderBottom: display3 ? "2px solid rgba(255,255,255,0.75)" : "2px solid transparent",
                      display: "flex",
                      alignItems: "center",
                      gap: "4px",
                    }}
                  >
                    School Info
                    <ChevronDown size={14} style={{ transition: "transform 0.2s", transform: display3 ? "rotate(180deg)" : "rotate(0deg)" }} />
                  </button>
                  {display3 && (
                    <ul style={{ position: "absolute", top: "calc(100% + 10px)", left: "50%", transform: "translateX(-50%)", borderRadius: "12px", minWidth: "220px", padding: "6px 0", listStyle: "none", margin: 0, ...glassPanelStyle }}>
                      {schoolInfoItems.map((item) => (
                        <li key={item.label}>
                          <Link
                            to={item.to}
                            onClick={toggleschoolinfo}
                            style={dropdownItemStyle}
                            onMouseEnter={(e) => (e.currentTarget.style.background = "rgba(253,244,255,0.9)")}
                            onMouseLeave={(e) => (e.currentTarget.style.background = "transparent")}
                          >
                            <span style={{ color: FUCHSIA }}>{item.icon}</span>
                            {item.label}
                          </Link>
                        </li>
                      ))}
                    </ul>
                  )}
                </li>

                {/* Notices — standalone link, gets a small attention dot */}
                <li>
                  <Link
                    to="/notices"
                    onClick={off}
                    style={{ ...navLinkStyle, display: "inline-flex", alignItems: "center", gap: "5px" }}
                    onMouseEnter={(e) => (e.currentTarget.style.borderBottomColor = "rgba(255,255,255,0.75)")}
                    onMouseLeave={(e) => (e.currentTarget.style.borderBottomColor = "transparent")}
                  >
                    Notices
                    <span
                      className="btlk-pulse-dot"
                      style={{
                        width: "6px",
                        height: "6px",
                        borderRadius: "50%",
                        background: AMBER,
                        display: "inline-block",
                      }}
                    />
                  </Link>
                </li>

                {[
                  { to: "/contact", label: "Contact Us" },
                  { to: "https://jobs.scientificstudy.in/career?schoolcode=btlk", label: "Career" },
                ].map((item) => (
                  <li key={item.label}>
                    <Link
                      to={item.to}
                      onClick={off}
                      style={{ ...navLinkStyle, display: "inline-block" }}
                      onMouseEnter={(e) => (e.currentTarget.style.borderBottomColor = "rgba(255,255,255,0.75)")}
                      onMouseLeave={(e) => (e.currentTarget.style.borderBottomColor = "transparent")}
                    >
                      {item.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>

            {/* CTA cluster — Pay Fees is the quiet glass chip, Register Online
                is the tinted amber-gradient glass chip with shine sweep. */}
            <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
              <Link
                to="https://btlk.scientificstudy.in/payment?key=btlk"
                className="btlk-shine"
                style={ctaStyle("ghost")}
                onMouseEnter={(e) => ctaHoverOn(e, "ghost")}
                onMouseLeave={(e) => ctaHoverOff(e, "ghost")}
              >
                <CreditCardIcon size={15} />
                Pay Fees
              </Link>
              <Link
                to="https://btlk.scientificstudy.in/admissionregistration?key=btlk"
                className="btlk-shine"
                style={ctaStyle("primary")}
                onMouseEnter={(e) => ctaHoverOn(e, "primary")}
                onMouseLeave={(e) => ctaHoverOff(e, "primary")}
              >
                <Rocket size={15} />
                Register Online
              </Link>
            </div>
            </div>
          </div>
        </div>
      </div>

      {/* ── ANNOUNCEMENT TICKER ── shared across mobile + desktop, sits
          right under the sticky header. A fixed "NOTICE" tab anchors the
          left edge (non-scrolling); the rest auto-scrolls and links out
          to the relevant page. Pauses on hover/keyboard focus. */}
      <div
        className="btlk-marquee-wrapper"
        style={{
          display: "flex",
          alignItems: "stretch",
          background: "rgba(74,4,78,0.9)",
          backdropFilter: "blur(12px)",
          WebkitBackdropFilter: "blur(12px)",
          borderBottom: `1px solid rgba(162,28,175,0.6)`,
        }}
      >
        <div
          className="btlk-shine"
          style={{
            flexShrink: 0,
            display: "flex",
            alignItems: "center",
            gap: "6px",
            padding: "8px 12px",
            background: `linear-gradient(135deg, rgba(245,158,11,0.92) 0%, rgba(180,83,9,0.92) 100%)`,
            backdropFilter: "blur(8px)",
            WebkitBackdropFilter: "blur(8px)",
            color: "#fff",
            fontFamily: "sans-serif",
            fontSize: "11px",
            fontWeight: 700,
            letterSpacing: "0.08em",
            textTransform: "uppercase",
            boxShadow: "inset 0 1px 0 rgba(255,255,255,0.3)",
            zIndex: 1,
          }}
        >
          <Megaphone size={14} />
          <span className="hidden sm:inline">Notice</span>
        </div>

        <div style={{ position: "relative", overflow: "hidden", flex: 1 }}>
          <div
            className="btlk-marquee-track"
            style={{ display: "flex", width: "max-content" }}
          >
            {[...tickerItems, ...tickerItems].map((item, i) => (
              <Link
                key={i}
                to={item.to}
                aria-hidden={i >= tickerItems.length ? "true" : undefined}
                tabIndex={i >= tickerItems.length ? -1 : 0}
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  gap: "8px",
                  padding: "8px 28px",
                  fontFamily: "sans-serif",
                  fontSize: "12.5px",
                  fontWeight: 500,
                  color: "#fdf4ff",
                  textDecoration: "none",
                  whiteSpace: "nowrap",
                  borderRight: "1px solid rgba(255,255,255,0.15)",
                }}
              >
                <span aria-hidden="true">{item.icon}</span>
                {item.label}
              </Link>
            ))}
          </div>

          {/* edge fades so items scroll in/out smoothly instead of clipping */}
          <div
            aria-hidden="true"
            style={{
              position: "absolute",
              top: 0,
              left: 0,
              bottom: 0,
              width: "28px",
              background: `linear-gradient(90deg, rgba(74,4,78,0.9) 0%, transparent 100%)`,
              pointerEvents: "none",
            }}
          />
          <div
            aria-hidden="true"
            style={{
              position: "absolute",
              top: 0,
              right: 0,
              bottom: 0,
              width: "28px",
              background: `linear-gradient(270deg, rgba(74,4,78,0.9) 0%, transparent 100%)`,
              pointerEvents: "none",
            }}
          />
        </div>
      </div>
    </>
  );
}