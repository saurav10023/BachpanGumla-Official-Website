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
    borderBottom: "2px solid transparent",
    transition: "border-color 0.2s ease",
    whiteSpace: "nowrap",
    background: "none",
    border: "none",
    borderBottom: "2px solid transparent",
    cursor: "pointer",
  };

  // Shared look for the two header CTAs (Pay Fees / Register Online).
  // `variant` controls which of the two treatments is used.
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
    transition: "transform 0.2s ease, box-shadow 0.2s ease, background 0.2s ease, color 0.2s ease",
    ...(variant === "ghost"
      ? {
          background: "rgba(255,255,255,0.1)",
          border: "1.5px solid rgba(255,255,255,0.4)",
          color: "#ffffff",
        }
      : {
          background: `linear-gradient(135deg, ${AMBER} 0%, ${AMBER_DARK} 100%)`,
          border: "1.5px solid transparent",
          color: "#ffffff",
          boxShadow: "0 4px 16px rgba(180,83,9,0.4)",
        }),
  });

  const ctaHoverOn = (e, variant) => {
    if (variant === "ghost") {
      e.currentTarget.style.background = "#ffffff";
      e.currentTarget.style.color = FUCHSIA_DARK;
      e.currentTarget.style.borderColor = "#ffffff";
    } else {
      e.currentTarget.style.transform = "translateY(-2px)";
      e.currentTarget.style.boxShadow = "0 8px 22px rgba(180,83,9,0.55)";
    }
  };

  const ctaHoverOff = (e, variant) => {
    if (variant === "ghost") {
      e.currentTarget.style.background = "rgba(255,255,255,0.1)";
      e.currentTarget.style.color = "#ffffff";
      e.currentTarget.style.borderColor = "rgba(255,255,255,0.4)";
    } else {
      e.currentTarget.style.transform = "translateY(0)";
      e.currentTarget.style.boxShadow = "0 4px 16px rgba(180,83,9,0.4)";
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
      {/* Ticker + nav badge animations. Kept in a single <style> tag since
          this component has no external stylesheet. */}
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
        @media (prefers-reduced-motion: reduce) {
          .btlk-marquee-track { animation: none; }
          .btlk-pulse-dot { animation: none; }
        }
      `}</style>

      {/* ── MOBILE ── */}
      <div
        className="lg:hidden"
        style={{
          position: "sticky",
          top: 0,
          zIndex: 50,
          background: `linear-gradient(135deg, ${FUCHSIA_DARK} 0%, ${FUCHSIA} 100%)`,
          boxShadow: scrolled ? "0 4px 24px rgba(134,25,143,0.35)" : "none",
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
              style={{
                background: "#fff",
                borderRadius: "10px",
                padding: "3px",
                boxShadow: "0 2px 8px rgba(0,0,0,0.15)",
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
              border: "1px solid rgba(255,255,255,0.25)",
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
              background: "#ffffff",
              padding: "8px 16px 20px",
              borderTop: "1px solid #f5d0fe",
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
                  borderBottom: "1px solid #fae8ff",
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
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  gap: "6px",
                  padding: "12px 8px",
                  borderRadius: "12px",
                  border: `1.5px solid ${FUCHSIA_BORDER}`,
                  background: FUCHSIA_LIGHT,
                  color: FUCHSIA_DARK,
                  fontFamily: "sans-serif",
                  fontSize: "13px",
                  fontWeight: 700,
                  textDecoration: "none",
                }}
              >
                <CreditCardIcon size={16} />
                Pay Fees
              </Link>
              <Link
                to="https://btlk.scientificstudy.in/admissionregistration?key=btlk"
                onClick={closeAll}
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  gap: "6px",
                  padding: "12px 8px",
                  borderRadius: "12px",
                  border: "1.5px solid transparent",
                  background: `linear-gradient(135deg, ${AMBER} 0%, ${AMBER_DARK} 100%)`,
                  color: "#ffffff",
                  fontFamily: "sans-serif",
                  fontSize: "13px",
                  fontWeight: 700,
                  textDecoration: "none",
                  boxShadow: "0 4px 14px rgba(180,83,9,0.35)",
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
                borderBottom: "1px solid #fae8ff",
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
                    style={{ display: "flex", alignItems: "center", gap: "10px", padding: "8px 12px", borderRadius: "8px", background: FUCHSIA_LIGHT, fontFamily: "sans-serif", fontSize: "13px", color: FUCHSIA, textDecoration: "none" }}>
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
                borderBottom: "1px solid #fae8ff",
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
                    style={{ display: "flex", alignItems: "center", gap: "10px", padding: "8px 12px", borderRadius: "8px", background: FUCHSIA_LIGHT, fontFamily: "sans-serif", fontSize: "13px", color: FUCHSIA, textDecoration: "none" }}>
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
                borderBottom: "1px solid #fae8ff",
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
                    style={{ display: "flex", alignItems: "center", gap: "10px", padding: "8px 12px", borderRadius: "8px", background: FUCHSIA_LIGHT, fontFamily: "sans-serif", fontSize: "13px", color: FUCHSIA, textDecoration: "none" }}>
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
                style={{ display: "flex", alignItems: "center", gap: "12px", padding: "12px 4px", fontFamily: "sans-serif", fontSize: "14px", fontWeight: 600, color: FUCHSIA_DARK, textDecoration: "none", borderBottom: "1px solid #fae8ff" }}>
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
        {/* Top info bar */}
        <div style={{ background: "#fdf4ff", borderBottom: "1px solid #f5d0fe", padding: "5px 0" }}>
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

        {/* Main nav */}
        <div style={{ background: `linear-gradient(135deg, ${FUCHSIA_DARK} 0%, ${FUCHSIA_MID} 60%, ${FUCHSIA} 100%)`, padding: "0 24px" }}>
          <div style={{ maxWidth: "1280px", margin: "0 auto", display: "flex", justifyContent: "space-between", alignItems: "center", height: "72px" }}>

            {/* Logo */}
            <div style={{ display: "flex", alignItems: "center", gap: "14px" }}>
              <div style={{ background: "#ffffff", borderRadius: "12px", padding: "4px", boxShadow: "0 2px 16px rgba(0,0,0,0.18)" }}>
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
                    <ul style={{ position: "absolute", top: "calc(100% + 10px)", left: "50%", transform: "translateX(-50%)", background: "#ffffff", borderRadius: "12px", boxShadow: "0 8px 40px rgba(134,25,143,0.18)", minWidth: "200px", padding: "6px 0", listStyle: "none", margin: 0, border: "1px solid #f5d0fe" }}>
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
                            onMouseEnter={(e) => (e.currentTarget.style.background = FUCHSIA_LIGHT)}
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
                    <ul style={{ position: "absolute", top: "calc(100% + 10px)", left: "50%", transform: "translateX(-50%)", background: "#ffffff", borderRadius: "12px", boxShadow: "0 8px 40px rgba(134,25,143,0.18)", minWidth: "210px", padding: "6px 0", listStyle: "none", margin: 0, border: "1px solid #f5d0fe" }}>
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
                            onMouseEnter={(e) => (e.currentTarget.style.background = FUCHSIA_LIGHT)}
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
                    <ul style={{ position: "absolute", top: "calc(100% + 10px)", left: "50%", transform: "translateX(-50%)", background: "#ffffff", borderRadius: "12px", boxShadow: "0 8px 40px rgba(134,25,143,0.18)", minWidth: "220px", padding: "6px 0", listStyle: "none", margin: 0, border: "1px solid #f5d0fe" }}>
                      {schoolInfoItems.map((item) => (
                        <li key={item.label}>
                          <Link
                            to={item.to}
                            onClick={toggleschoolinfo}
                            style={dropdownItemStyle}
                            onMouseEnter={(e) => (e.currentTarget.style.background = FUCHSIA_LIGHT)}
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

            {/* CTA cluster — Pay Fees is the quiet option, Register Online
                is the one visual "loud" moment in the nav. */}
            <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
              <Link
                to="https://btlk.scientificstudy.in/payment?key=btlk"
                style={ctaStyle("ghost")}
                onMouseEnter={(e) => ctaHoverOn(e, "ghost")}
                onMouseLeave={(e) => ctaHoverOff(e, "ghost")}
              >
                <CreditCardIcon size={15} />
                Pay Fees
              </Link>
              <Link
                to="https://btlk.scientificstudy.in/admissionregistration?key=btlk"
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
          background: FUCHSIA_DARK,
          borderBottom: `1px solid ${FUCHSIA_MID}`,
        }}
      >
        <div
          style={{
            flexShrink: 0,
            display: "flex",
            alignItems: "center",
            gap: "6px",
            padding: "8px 12px",
            background: `linear-gradient(135deg, ${AMBER} 0%, ${AMBER_DARK} 100%)`,
            color: "#fff",
            fontFamily: "sans-serif",
            fontSize: "11px",
            fontWeight: 700,
            letterSpacing: "0.08em",
            textTransform: "uppercase",
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
              background: `linear-gradient(90deg, ${FUCHSIA_DARK} 0%, transparent 100%)`,
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
              background: `linear-gradient(270deg, ${FUCHSIA_DARK} 0%, transparent 100%)`,
              pointerEvents: "none",
            }}
          />
        </div>
      </div>
    </>
  );
}