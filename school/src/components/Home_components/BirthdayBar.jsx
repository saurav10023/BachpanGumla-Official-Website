import React, { useState } from "react";
import { Link } from "react-router-dom";
import { studentService } from "../../services/studentService";

const RIBBON_COLORS = ["#FF6B9D", "#FFB627", "#9B5DE5", "#00BBF9", "#FF8FA3", "#FFD166"];
const CONFETTI_SHAPES = ["ribbon", "circle", "square"];

export default function BirthdayBar() {
  const [birthdays, setBirthdays] = useState([]);
  const [bursting, setBursting] = useState(false);

  React.useEffect(() => {
    studentService
      .upcomingBirthdays(7)
      .then((data) => setBirthdays(Array.isArray(data) ? data.slice(0, 6) : []))
      .catch(() => setBirthdays([]));
  }, []);

  if (birthdays.length === 0) return null;

  const handleClick = () => {
    if (bursting) return;
    setBursting(true);
    setTimeout(() => setBursting(false), 1300);
  };

  const formatEntry = (s) =>
    `${s.studentName.split(" ")[0]} · ${String(s.birthDay).padStart(2, "0")}/${String(s.birthMonth).padStart(2, "0")}`;

  return (
    <>
      <BirthdayBarStyles />
      <Link
        to="/#birthdays"
        onClick={handleClick}
        className="bday-bar-font bday-pill inline-flex items-center gap-2 relative overflow-hidden mx-auto"
      >
        <span className="bday-glow" />
        <span className="bday-dot" />
        <span className="bday-cake">🎂</span>
        <span className="bday-label">Upcoming Birthdays</span>
        <span className="bday-sep">—</span>
        <span className="bday-scroll">
          <span className="bday-scroll-track">
            {[...birthdays, ...birthdays].map((s, i) => (
              <span key={i} className="bday-entry">
                <span className="bday-balloon">🎈</span>
                {formatEntry(s)}
              </span>
            ))}
          </span>
        </span>
        <span className="bday-arrow">→</span>
      </Link>

      {bursting && <RibbonBurst />}
    </>
  );
}

/* ------------------------------ Confetti burst ------------------------------ */

function RibbonBurst() {
  const pieces = React.useMemo(() => {
    return Array.from({ length: 70 }).map((_, i) => ({
      id: i,
      left: Math.random() * 100,
      color: RIBBON_COLORS[i % RIBBON_COLORS.length],
      shape: CONFETTI_SHAPES[i % CONFETTI_SHAPES.length],
      delay: Math.random() * 0.35,
      duration: 1.5 + Math.random() * 1,
      drift: (Math.random() * 2 - 1) * 140,
      size: 7 + Math.random() * 8,
      spin: 360 * (Math.random() > 0.5 ? 1 : -1) * (1 + Math.random()),
    }));
  }, []);

  const emojiBits = React.useMemo(
    () =>
      Array.from({ length: 10 }).map((_, i) => ({
        id: i,
        left: 8 + Math.random() * 84,
        delay: Math.random() * 0.4,
        duration: 1.6 + Math.random() * 0.8,
        drift: (Math.random() * 2 - 1) * 90,
        emoji: i % 2 === 0 ? "🎉" : "🎊",
      })),
    []
  );

  return (
    <div className="ribbon-burst-overlay">
      <div className="ribbon-burst-flash" />
      {pieces.map((r) => (
        <span
          key={r.id}
          className={`confetti-piece confetti-${r.shape}`}
          style={{
            left: `${r.left}%`,
            background: r.color,
            width: r.shape === "ribbon" ? `${r.size * 0.8}px` : `${r.size}px`,
            height: r.shape === "ribbon" ? `${r.size * 2.3}px` : `${r.size}px`,
            animationDelay: `${r.delay}s`,
            animationDuration: `${r.duration}s`,
            "--drift": `${r.drift}px`,
            "--spin": `${r.spin}deg`,
          }}
        />
      ))}
      {emojiBits.map((e) => (
        <span
          key={e.id}
          className="confetti-emoji"
          style={{
            left: `${e.left}%`,
            animationDelay: `${e.delay}s`,
            animationDuration: `${e.duration}s`,
            "--drift": `${e.drift}px`,
          }}
        >
          {e.emoji}
        </span>
      ))}
    </div>
  );
}

function BirthdayBarStyles() {
  return (
    <style>{`
      .bday-bar-font, .bday-bar-font * { font-family: "Plus Jakarta Sans", ui-sans-serif, system-ui, sans-serif; }

      .bday-pill {
        border: 1px solid rgba(255,255,255,0.9);
        padding: 8px 18px;
        border-radius: 999px;
        background: linear-gradient(135deg, rgba(255,241,246,0.85), rgba(255,247,230,0.85) 50%, rgba(240,236,255,0.85));
        backdrop-filter: blur(14px);
        -webkit-backdrop-filter: blur(14px);
        box-shadow: 0 8px 22px -10px rgba(236,72,153,0.35), inset 0 1px 0 rgba(255,255,255,0.95);
        cursor: pointer;
        text-decoration: none;
        transition: transform 0.25s ease, box-shadow 0.25s ease, background 0.25s ease;
        max-width: calc(100% - 24px);
      }
      .bday-pill:hover {
        transform: translateY(-2px);
        box-shadow: 0 16px 30px -10px rgba(236,72,153,0.5), inset 0 1px 0 rgba(255,255,255,1);
      }
      .bday-pill:active { transform: translateY(0) scale(0.98); }

      .bday-glow {
        position: absolute;
        inset: -40%;
        background: conic-gradient(from 0deg, #FF6B9D, #FFB627, #9B5DE5, #00BBF9, #FF6B9D);
        opacity: 0.18;
        animation: bdaySpin 6s linear infinite;
        z-index: 0;
      }
      @keyframes bdaySpin { to { transform: rotate(360deg); } }

      .bday-dot {
        position: relative; z-index: 1;
        width: 7px; height: 7px; border-radius: 999px;
        background: #EC4899;
        box-shadow: 0 0 0 4px rgba(236,72,153,0.2);
        flex-shrink: 0;
        animation: bdayPulse 1.8s ease-in-out infinite;
      }
      @keyframes bdayPulse {
        0%, 100% { box-shadow: 0 0 0 4px rgba(236,72,153,0.2); }
        50% { box-shadow: 0 0 0 7px rgba(236,72,153,0.08); }
      }

      .bday-cake { position: relative; z-index: 1; font-size: 16px; flex-shrink: 0; display: inline-block; animation: bdayBounce 2.2s ease-in-out infinite; }
      @keyframes bdayBounce {
        0%, 100% { transform: rotate(-6deg) translateY(0); }
        50% { transform: rotate(6deg) translateY(-2px); }
      }

      .bday-label { position: relative; z-index: 1; font-weight: 800; font-size: 12.5px; letter-spacing: 0.02em; color: #A21CAF; flex-shrink: 0; }
      .bday-sep { position: relative; z-index: 1; color: #E2A8D6; flex-shrink: 0; }

      .bday-scroll {
        position: relative; z-index: 1;
        max-width: 260px;
        overflow: hidden;
        mask-image: linear-gradient(90deg, transparent, #000 12%, #000 88%, transparent);
        -webkit-mask-image: linear-gradient(90deg, transparent, #000 12%, #000 88%, transparent);
      }
      .bday-scroll-track {
        display: inline-flex; gap: 22px; white-space: nowrap;
        animation: bdayScroll 14s linear infinite;
      }
      .bday-entry { display: inline-flex; align-items: center; gap: 4px; font-size: 12.5px; font-weight: 700; color: #7C3781; }
      .bday-balloon { font-size: 11px; }
      @keyframes bdayScroll { from { transform: translateX(0); } to { transform: translateX(-50%); } }

      .bday-arrow { position: relative; z-index: 1; color: #EC4899; font-weight: 800; flex-shrink: 0; transition: transform 0.25s ease; }
      .bday-pill:hover .bday-arrow { transform: translateX(3px); }

      .ribbon-burst-overlay {
        position: fixed; inset: 0; z-index: 9999;
        pointer-events: none; overflow: hidden;
      }
      .ribbon-burst-flash {
        position: absolute; inset: 0;
        background: radial-gradient(circle at 50% 20%, rgba(255,241,246,0.65), rgba(255,255,255,0) 60%);
        animation: ribbonFlash 0.5s ease-out forwards;
      }
      @keyframes ribbonFlash {
        from { opacity: 1; }
        to { opacity: 0; }
      }

      .confetti-piece {
        position: absolute;
        top: -40px;
        opacity: 0.95;
        animation-name: ribbonFall;
        animation-timing-function: cubic-bezier(0.25, 0.6, 0.4, 1);
        animation-fill-mode: forwards;
      }
      .confetti-ribbon { border-radius: 2px; }
      .confetti-square { border-radius: 2px; }
      .confetti-circle { border-radius: 999px; }

      @keyframes ribbonFall {
        0% { transform: translateY(0) translateX(0) rotate(0deg); opacity: 0; }
        8% { opacity: 1; }
        100% { transform: translateY(115vh) translateX(var(--drift)) rotate(var(--spin)); opacity: 0.85; }
      }

      .confetti-emoji {
        position: absolute;
        top: -30px;
        font-size: 22px;
        animation-name: emojiFall;
        animation-timing-function: ease-in;
        animation-fill-mode: forwards;
      }
      @keyframes emojiFall {
        0% { transform: translateY(0) translateX(0) rotate(0deg); opacity: 0; }
        10% { opacity: 1; }
        100% { transform: translateY(110vh) translateX(var(--drift)) rotate(25deg); opacity: 0.9; }
      }

      @media (prefers-reduced-motion: reduce) {
        .bday-scroll-track, .confetti-piece, .confetti-emoji, .ribbon-burst-flash, .bday-glow, .bday-dot, .bday-cake { animation: none !important; }
      }
    `}</style>
  );
}