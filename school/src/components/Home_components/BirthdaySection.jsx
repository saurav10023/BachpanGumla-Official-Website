import React, { useEffect, useMemo, useState } from "react";
import { studentService } from "../../services/studentService";

const MS_PER_DAY = 86400000;

// Midnight-normalized date so day-diffs are always whole numbers,
// regardless of what time "now" happens to be.
function startOfDay(d) {
  return new Date(d.getFullYear(), d.getMonth(), d.getDate());
}

const BALLOON_COLORS = ["#EC4899", "#7C3AED", "#F59E0B", "#6366F1"];

export default function BirthdaysSection() {
  const [students, setStudents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showNextWeek, setShowNextWeek] = useState(false);
  const [showThisMonth, setShowThisMonth] = useState(false);

  useEffect(() => {
    studentService
      .upcomingBirthdays(30)
      .then((data) => setStudents(Array.isArray(data) ? data : []))
      .catch(() => setStudents([]))
      .finally(() => setLoading(false));
  }, []);

  const { thisWeek, nextWeek, thisMonth } = useMemo(() => {
    const today = startOfDay(new Date());

    const withDays = students.map((s) => {
      let next = startOfDay(new Date(today.getFullYear(), s.birthMonth - 1, s.birthDay));
      if (next < today) next = new Date(next.getFullYear() + 1, next.getMonth(), next.getDate());
      const daysUntil = Math.round((next - today) / MS_PER_DAY);
      return { ...s, daysUntil };
    });

    withDays.sort((a, b) => a.daysUntil - b.daysUntil);

    return {
      thisWeek: withDays.filter((s) => s.daysUntil <= 6),
      nextWeek: withDays.filter((s) => s.daysUntil >= 7 && s.daysUntil <= 13),
      thisMonth: withDays.filter((s) => s.daysUntil >= 14),
    };
  }, [students]);

  const floatingBalloons = useMemo(
    () =>
      Array.from({ length: 5 }).map((_, i) => ({
        id: i,
        left: 8 + i * 21 + Math.random() * 8,
        color: BALLOON_COLORS[i % BALLOON_COLORS.length],
        delay: i * 1.6,
        duration: 10 + Math.random() * 5,
        scale: 0.7 + Math.random() * 0.4,
      })),
    []
  );

  if (!loading && students.length === 0) return null;

  return (
    <section
      id="birthdays"
      className="bday-sec-font relative overflow-hidden bg-gradient-to-b from-white via-[#FAF7FF] to-[#F3F0FF] py-12 sm:py-16 scroll-mt-4"
    >
      <BirthdaySectionStyles />

      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <div className="absolute -top-16 -right-16 w-72 h-72 rounded-full bg-fuchsia-200/40 blur-3xl" />
        <div className="absolute -bottom-16 -left-16 w-72 h-72 rounded-full bg-indigo-200/40 blur-3xl" />
        {floatingBalloons.map((b) => (
          <span
            key={b.id}
            className="bday-bg-balloon"
            style={{
              left: `${b.left}%`,
              animationDelay: `${b.delay}s`,
              animationDuration: `${b.duration}s`,
              transform: `scale(${b.scale})`,
            }}
          >
            <BalloonSVG color={b.color} />
          </span>
        ))}
      </div>

      <div className="relative max-w-3xl mx-auto px-4 sm:px-6">
        <div className="text-center mb-8 bday-sec-in">
          <span className="glass-pill-sec mx-auto">
            <span className="glass-dot-sec" />
            Birthday Celebrations
            <span className="bday-sparkle">✨</span>
          </span>
          <h2 className="bday-sec-display mt-3 text-2xl sm:text-3xl md:text-[2.2rem] font-semibold text-[#221B45] leading-[1.15]">
            Celebrating Every <span className="bday-shimmer-text">Little Milestone</span>
          </h2>
          <p className="text-[#5D5885] mt-2 max-w-md mx-auto text-sm leading-relaxed">
            Here's who's celebrating soon — wish them a wonderful year ahead!
          </p>
        </div>

        {thisWeek.length > 0 && (
          <div className="mb-5 bday-sec-in" style={{ animationDelay: "80ms" }}>
            <SectionLabel emoji="🎉" text="This Week" count={thisWeek.length} />
            <div className="flex flex-col gap-2.5 mt-3">
              {thisWeek.map((s, i) => (
                <BirthdayBarRow key={s._id || `w-${i}`} student={s} index={i} />
              ))}
            </div>
          </div>
        )}

        {nextWeek.length > 0 && (
          <CollapsibleGroup
            emoji="📅"
            text="Next Week"
            count={nextWeek.length}
            open={showNextWeek}
            onToggle={() => setShowNextWeek((v) => !v)}
          >
            {nextWeek.map((s, i) => (
              <BirthdayCompactRow key={s._id || `n-${i}`} student={s} index={i} />
            ))}
          </CollapsibleGroup>
        )}

        {thisMonth.length > 0 && (
          <CollapsibleGroup
            emoji="🗓️"
            text="Later This Month"
            count={thisMonth.length}
            open={showThisMonth}
            onToggle={() => setShowThisMonth((v) => !v)}
          >
            {thisMonth.map((s, i) => (
              <BirthdayCompactRow key={s._id || `m-${i}`} student={s} index={i} />
            ))}
          </CollapsibleGroup>
        )}
      </div>
    </section>
  );
}

/* ------------------------------ Pieces ------------------------------ */

function BalloonSVG({ color }) {
  return (
    <svg width="22" height="34" viewBox="0 0 22 34" fill="none">
      <ellipse cx="11" cy="12" rx="10" ry="12" fill={color} opacity="0.55" />
      <path d="M11 24 L11 30" stroke={color} strokeWidth="1" opacity="0.5" />
      <path d="M9.5 30 Q11 32 12.5 30" stroke={color} strokeWidth="1" opacity="0.5" fill="none" />
    </svg>
  );
}

function SectionLabel({ emoji, text, count }) {
  return (
    <div className="flex items-center gap-2 px-0.5">
      <span className="text-base leading-none bday-emoji-sway">{emoji}</span>
      <h3 className="text-[13px] font-bold uppercase tracking-wide text-[#4C1D95]">{text}</h3>
      <span className="bday-count-chip">{count}</span>
    </div>
  );
}

function urgencyStyle(daysUntil) {
  if (daysUntil === 0) return "today";
  if (daysUntil === 1) return "tomorrow";
  return "soon";
}

function dayLabel(daysUntil) {
  if (daysUntil === 0) return "Today 🎉";
  if (daysUntil === 1) return "Tomorrow";
  return `In ${daysUntil} days`;
}

function BirthdayBarRow({ student, index }) {
  const initial = student.studentName?.[0]?.toUpperCase() || "?";
  const urgency = urgencyStyle(student.daysUntil);

  return (
    <div
      className={`bday-bar-row bday-bar-row--${urgency} bday-sec-in`}
      style={{ animationDelay: `${140 + index * 70}ms` }}
    >
      <span className="bday-bar-glow" />
      {urgency === "today" && (
        <span className="bday-confetti-dots" aria-hidden="true">
          <i /><i /><i /><i /><i /><i />
        </span>
      )}
      <div className="bday-bar-avatar">
        {urgency === "today" && <span className="bday-avatar-ring" />}
        {initial}
      </div>
      <div className="min-w-0 flex-1 relative z-10">
        <p className="text-sm font-bold text-[#221B45] truncate">{student.studentName}</p>
        <p className="text-xs text-[#6E6892] mt-0.5">
          Class {student.className} · {String(student.birthDay).padStart(2, "0")}/
          {String(student.birthMonth).padStart(2, "0")}
        </p>
      </div>
      <span className={`bday-bar-badge bday-bar-badge--${urgency} relative z-10`}>
        {urgency === "today" && <span className="bday-cake-icon">🎂</span>}
        {dayLabel(student.daysUntil)}
      </span>
    </div>
  );
}

function BirthdayCompactRow({ student, index }) {
  const initial = student.studentName?.[0]?.toUpperCase() || "?";
  return (
    <div className="bday-compact-row bday-compact-in" style={{ animationDelay: `${index * 40}ms` }}>
      <div className="bday-compact-avatar">{initial}</div>
      <div className="min-w-0 flex-1">
        <p className="text-[13px] font-semibold text-[#221B45] truncate">{student.studentName}</p>
        <p className="text-[11px] text-[#6E6892]">Class {student.className}</p>
      </div>
      <span className="bday-compact-date">
        {String(student.birthDay).padStart(2, "0")}/{String(student.birthMonth).padStart(2, "0")}
      </span>
      <span className="bday-compact-days">{dayLabel(student.daysUntil)}</span>
    </div>
  );
}

function CollapsibleGroup({ emoji, text, count, open, onToggle, children }) {
  return (
    <div className="mb-3 bday-sec-in" style={{ animationDelay: "160ms" }}>
      <button type="button" onClick={onToggle} className="bday-group-toggle">
        <span className="flex items-center gap-2">
          <span className="text-base leading-none">{emoji}</span>
          <span className="text-[13px] font-bold uppercase tracking-wide text-[#4C1D95]">{text}</span>
          <span className="bday-count-chip">{count}</span>
        </span>
        <svg
          className={`bday-chevron ${open ? "bday-chevron--open" : ""}`}
          width="16"
          height="16"
          viewBox="0 0 24 24"
          fill="none"
        >
          <path d="M6 9l6 6 6-6" stroke="#7C3AED" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </button>
      <div className={`bday-group-panel ${open ? "bday-group-panel--open" : ""}`}>
        <div className="flex flex-col gap-1.5 pt-2.5">{children}</div>
      </div>
    </div>
  );
}

function BirthdaySectionStyles() {
  return (
    <style>{`
      .bday-sec-font, .bday-sec-font * { font-family: "Plus Jakarta Sans", ui-sans-serif, system-ui, sans-serif; }
      .bday-sec-display { font-family: "Fredoka", "Plus Jakarta Sans", ui-sans-serif, system-ui, sans-serif; }

      /* --- Background balloons --- */
      .bday-bg-balloon {
        position: absolute;
        bottom: -60px;
        opacity: 0;
        animation-name: bdayBalloonFloat;
        animation-timing-function: ease-in-out;
        animation-iteration-count: infinite;
      }
      @keyframes bdayBalloonFloat {
        0% { transform: translateY(0) translateX(0) rotate(-4deg); opacity: 0; }
        10% { opacity: 0.5; }
        50% { transform: translateY(-220px) translateX(14px) rotate(4deg); }
        90% { opacity: 0.35; }
        100% { transform: translateY(-440px) translateX(-10px) rotate(-4deg); opacity: 0; }
      }

      /* --- Header --- */
      .glass-pill-sec {
        display: inline-flex; align-items: center; gap: 8px;
        padding: 8px 16px; border-radius: 999px;
        font-weight: 600; font-size: 13px; color: #4C1D95;
        background: rgba(255,255,255,0.55);
        border: 1px solid rgba(255,255,255,0.8);
        backdrop-filter: blur(14px);
        box-shadow: 0 8px 20px -10px rgba(99,60,201,0.35), inset 0 1px 0 rgba(255,255,255,0.9);
        width: fit-content;
      }
      .glass-dot-sec { width: 6px; height: 6px; border-radius: 999px; background: #7C3AED; box-shadow: 0 0 0 4px rgba(124,58,237,0.18); animation: bdayDotPulse 1.8s ease-in-out infinite; }
      @keyframes bdayDotPulse { 0%, 100% { box-shadow: 0 0 0 4px rgba(124,58,237,0.18); } 50% { box-shadow: 0 0 0 7px rgba(124,58,237,0.06); } }
      .bday-sparkle { display: inline-block; animation: bdaySparkleSpin 3s ease-in-out infinite; }
      @keyframes bdaySparkleSpin { 0%, 100% { transform: rotate(0deg) scale(1); } 50% { transform: rotate(20deg) scale(1.2); } }

      .bday-shimmer-text {
        background: linear-gradient(90deg, #4f46e5, #a855f7, #ec4899, #a855f7, #4f46e5);
        background-size: 250% auto;
        -webkit-background-clip: text; background-clip: text; color: transparent;
        animation: bdayShimmer 5s linear infinite;
      }
      @keyframes bdayShimmer { to { background-position: -250% center; } }

      .bday-emoji-sway { display: inline-block; animation: bdaySway 2.4s ease-in-out infinite; }
      @keyframes bdaySway { 0%, 100% { transform: rotate(-8deg); } 50% { transform: rotate(8deg); } }

      /* --- This-week bars --- */
      .bday-count-chip {
        font-size: 10.5px; font-weight: 800; color: #7C3AED;
        background: rgba(196,181,253,0.35); border: 1px solid rgba(196,181,253,0.55);
        border-radius: 999px; padding: 1px 7px; line-height: 1.5;
      }

      .bday-bar-row {
        position: relative; overflow: hidden;
        display: flex; align-items: center; gap: 12px;
        padding: 12px 16px; border-radius: 16px;
        background: rgba(255,255,255,0.68);
        border: 1px solid rgba(255,255,255,0.85);
        backdrop-filter: blur(14px);
        box-shadow: 0 10px 24px -14px rgba(99,60,201,0.3), inset 0 1px 0 rgba(255,255,255,0.9);
        flex-wrap: wrap;
        transition: transform 0.25s ease, box-shadow 0.25s ease;
      }
      .bday-bar-row:hover {
        transform: translateY(-3px);
        box-shadow: 0 16px 32px -14px rgba(99,60,201,0.4), inset 0 1px 0 rgba(255,255,255,0.95);
      }
      .bday-bar-row--today { background: linear-gradient(135deg, rgba(255,241,246,0.85), rgba(255,247,230,0.75)); border-color: rgba(244,114,182,0.5); }
      .bday-bar-row--tomorrow { border-color: rgba(196,181,253,0.7); }

      .bday-bar-glow {
        position: absolute; inset: -60% -20%;
        background: conic-gradient(from 0deg, #7C3AED, #EC4899, #F59E0B, #6366F1, #7C3AED);
        opacity: 0; z-index: 0;
      }
      .bday-bar-row--today .bday-bar-glow { opacity: 0.14; animation: bdaySpin 7s linear infinite; }
      @keyframes bdaySpin { to { transform: rotate(360deg); } }

      .bday-confetti-dots { position: absolute; inset: 0; z-index: 0; pointer-events: none; }
      .bday-confetti-dots i {
        position: absolute; width: 5px; height: 5px; border-radius: 999px;
        background: #F59E0B; opacity: 0; animation: bdayConfettiPop 2.6s ease-in-out infinite;
      }
      .bday-confetti-dots i:nth-child(1) { top: 14%; left: 18%; background: #EC4899; animation-delay: 0s; }
      .bday-confetti-dots i:nth-child(2) { top: 70%; left: 30%; background: #6366F1; animation-delay: 0.4s; }
      .bday-confetti-dots i:nth-child(3) { top: 20%; left: 55%; background: #F59E0B; animation-delay: 0.8s; }
      .bday-confetti-dots i:nth-child(4) { top: 65%; left: 68%; background: #34D399; animation-delay: 1.2s; }
      .bday-confetti-dots i:nth-child(5) { top: 30%; left: 80%; background: #EC4899; animation-delay: 1.6s; }
      .bday-confetti-dots i:nth-child(6) { top: 75%; left: 90%; background: #7C3AED; animation-delay: 2s; }
      @keyframes bdayConfettiPop {
        0%, 100% { opacity: 0; transform: translateY(0) scale(0.6); }
        50% { opacity: 0.8; transform: translateY(-6px) scale(1); }
      }

      .bday-bar-avatar {
        position: relative; z-index: 1;
        flex-shrink: 0; width: 40px; height: 40px; border-radius: 999px;
        display: flex; align-items: center; justify-content: center;
        font-weight: 700; font-size: 14px; color: #fff;
        background: linear-gradient(135deg, #6d28d9, #d946ef);
        box-shadow: 0 6px 14px -6px rgba(109,40,217,0.5);
      }
      .bday-avatar-ring {
        position: absolute; inset: -4px; border-radius: 999px;
        border: 2px solid #EC4899; opacity: 0.6;
        animation: bdayRing 1.8s ease-out infinite;
      }
      @keyframes bdayRing {
        0% { transform: scale(1); opacity: 0.6; }
        100% { transform: scale(1.5); opacity: 0; }
      }

      .bday-bar-badge {
        flex-shrink: 0; display: inline-flex; align-items: center; gap: 4px;
        font-size: 11px; font-weight: 700;
        padding: 4px 10px; border-radius: 999px; color: #4C1D95;
        background: rgba(196,181,253,0.35);
        border: 1px solid rgba(196,181,253,0.6);
        white-space: nowrap;
      }
      .bday-bar-badge--today { color: #9d174d; background: rgba(244,114,182,0.28); border: 1px solid rgba(244,114,182,0.55); animation: bdayBadgePulse 1.8s ease-in-out infinite; }
      .bday-bar-badge--tomorrow { color: #92400e; background: rgba(253,230,138,0.4); border: 1px solid rgba(253,230,138,0.7); }
      .bday-cake-icon { display: inline-block; animation: bdayCakeWiggle 1.6s ease-in-out infinite; }
      @keyframes bdayCakeWiggle { 0%, 100% { transform: rotate(-10deg); } 50% { transform: rotate(10deg); } }
      @keyframes bdayBadgePulse {
        0%, 100% { box-shadow: 0 0 0 0 rgba(244,114,182,0.35); }
        50% { box-shadow: 0 0 0 5px rgba(244,114,182,0); }
      }

      /* --- Collapsible groups --- */
      .bday-group-toggle {
        width: 100%; display: flex; align-items: center; justify-content: space-between;
        padding: 10px 14px; border-radius: 14px; cursor: pointer;
        background: rgba(255,255,255,0.5);
        border: 1px solid rgba(255,255,255,0.75);
        backdrop-filter: blur(10px);
        transition: background 0.2s ease, transform 0.2s ease;
      }
      .bday-group-toggle:hover { background: rgba(255,255,255,0.7); transform: translateY(-1px); }

      .bday-chevron { transition: transform 0.25s ease; flex-shrink: 0; }
      .bday-chevron--open { transform: rotate(180deg); }

      .bday-group-panel {
        display: grid; grid-template-rows: 0fr; overflow: hidden;
        transition: grid-template-rows 0.35s ease;
      }
      .bday-group-panel > div { min-height: 0; overflow: hidden; }
      .bday-group-panel--open { grid-template-rows: 1fr; }

      .bday-compact-row {
        display: flex; align-items: center; gap: 10px;
        padding: 8px 14px; border-radius: 12px;
        background: rgba(255,255,255,0.45);
        border: 1px solid rgba(255,255,255,0.6);
        transition: background 0.2s ease, transform 0.2s ease;
      }
      .bday-compact-row:hover { background: rgba(255,255,255,0.7); transform: translateX(2px); }
      .bday-compact-in { opacity: 0; animation: bdayCompactIn 0.4s ease-out forwards; }
      @keyframes bdayCompactIn { from { opacity: 0; transform: translateY(6px); } to { opacity: 1; transform: translateY(0); } }

      .bday-compact-avatar {
        flex-shrink: 0; width: 28px; height: 28px; border-radius: 999px;
        display: flex; align-items: center; justify-content: center;
        font-weight: 700; font-size: 11px; color: #fff;
        background: linear-gradient(135deg, #8b5cf6, #ec4899);
      }
      .bday-compact-date { flex-shrink: 0; font-size: 11px; font-weight: 700; color: #7C3AED; }
      .bday-compact-days { flex-shrink: 0; font-size: 10.5px; font-weight: 600; color: #6E6892; min-width: 62px; text-align: right; }

      .bday-sec-in { opacity: 0; animation: bdaySecIn 0.7s ease-out forwards; }
      @keyframes bdaySecIn { from { opacity: 0; transform: translateY(14px); } to { opacity: 1; transform: translateY(0); } }

      @media (max-width: 480px) {
        .bday-bar-row { padding: 10px 12px; gap: 10px; }
        .bday-bar-badge { font-size: 10px; padding: 3px 8px; }
        .bday-compact-days { min-width: 52px; }
        .bday-bg-balloon { display: none; }
      }

      @media (prefers-reduced-motion: reduce) {
        .bday-sec-in, .bday-compact-in, .bday-bar-glow, .bday-bar-badge--today,
        .bday-avatar-ring, .bday-confetti-dots i, .bday-shimmer-text, .bday-sparkle,
        .bday-emoji-sway, .glass-dot-sec, .bday-cake-icon, .bday-bg-balloon {
          animation: none !important; opacity: 1; transform: none;
        }
      }
    `}</style>
  );
}