import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { studentService } from "../../services/studentService";

export default function BirthdayBar() {
  const [birthdays, setBirthdays] = useState([]);
  const [bursting, setBursting] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    studentService
      .upcomingBirthdays(7)
      .then((data) => setBirthdays(Array.isArray(data) ? data.slice(0, 6) : []))
      .catch(() => setBirthdays([]));
  }, []);

  if (birthdays.length === 0) return null;

  const handleClick = () => {
    setBursting(true);
    setTimeout(() => navigate("/birthdays"), 650);
  };

  const formatEntry = (s) =>
    `${s.studentName.split(" ")[0]} · ${String(s.birthDay).padStart(2, "0")}/${String(s.birthMonth).padStart(2, "0")}`;

  return (
    <>
      <BirthdayBarStyles />
      <button
        onClick={handleClick}
        className="bday-bar-font bday-bar w-full flex items-center justify-center gap-2 relative overflow-hidden"
      >
        <span className="bday-dot" />
        <span className="bday-cake">🎂</span>
        <span className="bday-label">Upcoming Birthdays</span>
        <span className="bday-sep">—</span>
        <span className="bday-scroll">
          <span className="bday-scroll-track">
            {[...birthdays, ...birthdays].map((s, i) => (
              <span key={i} className="bday-entry">{formatEntry(s)}</span>
            ))}
          </span>
        </span>
        <span className="bday-arrow">→</span>
      </button>

      {bursting && <BirthdayBurst />}
    </>
  );
}

function BirthdayBurst() {
  const chips = ["🎂", "🎉", "🎈", "✨", "🎁"];
  return (
    <div className="bday-burst-overlay">
      <div className="bday-burst-core" />
      {Array.from({ length: 14 }).map((_, i) => (
        <span
          key={i}
          className="bday-burst-particle"
          style={{ "--angle": `${(360 / 14) * i}deg`, animationDelay: `${(i % 4) * 40}ms` }}
        >
          {chips[i % chips.length]}
        </span>
      ))}
    </div>
  );
}

function BirthdayBarStyles() {
  return (
    <style>{`
      .bday-bar-font, .bday-bar-font * { font-family: "Plus Jakarta Sans", ui-sans-serif, system-ui, sans-serif; }

      .bday-bar {
        border: none;
        border-bottom: 1px solid rgba(255,255,255,0.6);
        padding: 9px 16px;
        background: rgba(255,255,255,0.55);
        backdrop-filter: blur(14px);
        -webkit-backdrop-filter: blur(14px);
        box-shadow: inset 0 -1px 0 rgba(255,255,255,0.7), 0 6px 18px -14px rgba(99,60,201,0.4);
        cursor: pointer;
        transition: background 0.25s ease;
      }
      .bday-bar:hover { background: rgba(255,255,255,0.72); }

      .bday-dot {
        width: 6px; height: 6px; border-radius: 999px;
        background: #7C3AED;
        box-shadow: 0 0 0 4px rgba(124,58,237,0.18);
        flex-shrink: 0;
      }
      .bday-cake { font-size: 15px; flex-shrink: 0; }
      .bday-label { font-weight: 700; font-size: 12.5px; letter-spacing: 0.02em; color: #4C1D95; flex-shrink: 0; }
      .bday-sep { color: #B8AEDC; flex-shrink: 0; }

      .bday-scroll {
        max-width: 380px;
        overflow: hidden;
        mask-image: linear-gradient(90deg, transparent, #000 12%, #000 88%, transparent);
        -webkit-mask-image: linear-gradient(90deg, transparent, #000 12%, #000 88%, transparent);
      }
      .bday-scroll-track {
        display: inline-flex; gap: 22px; white-space: nowrap;
        animation: bdayScroll 14s linear infinite;
      }
      .bday-entry { font-size: 12.5px; font-weight: 600; color: #5D5885; }
      @keyframes bdayScroll { from { transform: translateX(0); } to { transform: translateX(-50%); } }

      .bday-arrow { color: #7C3AED; font-weight: 700; flex-shrink: 0; transition: transform 0.25s ease; }
      .bday-bar:hover .bday-arrow { transform: translateX(3px); }

      .bday-burst-overlay {
        position: fixed; inset: 0; z-index: 9999;
        display: flex; align-items: center; justify-content: center;
        pointer-events: none; overflow: hidden;
      }
      .bday-burst-core {
        width: 40px; height: 40px; border-radius: 999px;
        background: radial-gradient(circle, rgba(255,255,255,0.95) 0%, rgba(196,181,253,0.7) 45%, rgba(244,114,182,0.0) 75%);
        animation: bdayCoreGrow 0.65s cubic-bezier(0.2,0.8,0.2,1) forwards;
      }
      @keyframes bdayCoreGrow { from { transform: scale(0); opacity: 1; } to { transform: scale(60); opacity: 1; } }
      .bday-burst-particle { position: absolute; font-size: 22px; opacity: 0; animation: bdayParticleFly 0.6s ease-out forwards; }
      @keyframes bdayParticleFly {
        0% { transform: rotate(var(--angle)) translateX(0) scale(0.5); opacity: 0; }
        30% { opacity: 1; }
        100% { transform: rotate(var(--angle)) translateX(160px) scale(1.1); opacity: 0; }
      }

      @media (prefers-reduced-motion: reduce) {
        .bday-scroll-track, .bday-burst-core, .bday-burst-particle { animation: none !important; }
      }
    `}</style>
  );
}