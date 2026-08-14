import React, { useState } from "react";
import { CalendarDays, Sun, Star, BookOpen, Bell } from "lucide-react";

/**
 * Liquid Glass theme — fuchsia + amber accent (#86198f / #a21caf / #f59e0b)
 * per the Gallery-section brand tokens. Fonts kept as Georgia/sans-serif
 * to match this page's existing typographic identity.
 */

const FUCHSIA = "#86198f";
const FUCHSIA_DARK = "#4a044e";
const FUCHSIA_MID = "#a21caf";
const AMBER = "#f59e0b";

// ── DATA ────────────────────────────────────────────────────────────────────
const holidays = [
  {
    date: "03-04-2026",
    day: "Friday",
    festival: "Good Friday",
    notice: "",
    days: 1,
  },
  {
    date: "14-04-2026",
    day: "Tuesday",
    festival: "Ambedkar Jayanti / Vaisakhi",
    notice: "",
    days: 1,
  },
  {
    type: "banner",
    label: "1st Unit Test",
    note: "1st week of May",
  },
  {
    date: "16-05-2026 to 13-06-2026",
    day: "Saturday to Saturday",
    festival: "Summer Vacation",
    notice: "",
    days: 25,
    highlight: true,
  },
  {
    date: "28-05-2026",
    day: "Thursday",
    festival: "Bakrid",
    notice: "",
    days: 1,
  },
  {
    date: "26-06-2026",
    day: "Friday",
    festival: "Muharram",
    notice: "",
    days: 1,
  },
  {
    date: "16-07-2026",
    day: "Thursday",
    festival: "Rathyatra",
    notice: "",
    days: 1,
  },
  {
    date: "29-07-2026",
    day: "Wednesday",
    festival: "Guru Purnima",
    notice: "Celebration at school",
    days: 0,
    celebration: true,
  },
  {
    type: "banner",
    label: "2nd Unit Test",
    note: "3rd week of July",
  },
  {
    date: "15-08-2026",
    day: "Saturday",
    festival: "Independence Day",
    notice: "",
    days: 1,
  },
  {
    date: "28-08-2026",
    day: "Friday",
    festival: "Rakshabandhan",
    notice: "",
    days: 1,
  },
  {
    date: "04-09-2026",
    day: "Friday",
    festival: "Janmashtami",
    notice: "",
    days: 1,
  },
  {
    date: "05-09-2026",
    day: "Saturday",
    festival: "Janmashtami & Teachers Day Celebration",
    notice: "",
    days: 0,
    celebration: true,
  },
  {
    date: "14-09-2026",
    day: "Monday",
    festival: "Teej",
    notice: "",
    days: 1,
  },
  {
    date: "15-09-2026",
    day: "Tuesday",
    festival: "Ganesh Chaturthi",
    notice: "",
    days: 1,
  },
  {
    date: "17-09-2026",
    day: "Thursday",
    festival: "Vishwa Karma Puja",
    notice: "",
    days: 1,
  },
  {
    date: "21-09-2026",
    day: "Monday",
    festival: "Karma Celebration",
    notice: "Without lunch box and in traditional dress",
    days: 0,
    celebration: true,
  },
  {
    date: "22-09-2026",
    day: "Tuesday",
    festival: "Karma Puja",
    notice: "",
    days: 1,
  },
  {
    date: "26-09-2026",
    day: "Saturday",
    festival: "Milad-Ul-Nabi",
    notice: "",
    days: 1,
  },
  {
    date: "02-10-2026",
    day: "Friday",
    festival: "Gandhi Jayanti",
    notice: "",
    days: 1,
  },
  {
    date: "03-10-2026",
    day: "Saturday",
    festival: "JeevitPutrikavrat",
    notice: "",
    days: 1,
  },
  {
    type: "banner",
    label: "1st Terminal Examination",
    note: "3rd week of September",
  },
  {
    date: "16-10-2026",
    day: "Friday",
    festival: "Durga Puja Celebration",
    notice: "With lunch box and in traditional dress",
    days: 0,
    celebration: true,
  },
  {
    date: "17-10-2026 to 21-10-2026",
    day: "Saturday to Wednesday",
    festival: "Durga Puja Holiday",
    notice: "",
    days: 5,
    highlight: true,
  },
  {
    date: "07-11-2026",
    day: "Saturday",
    festival: "Diwali Celebration",
    notice: "With lunch box in traditional dress and with Crackers and Sweets",
    days: 0,
    celebration: true,
  },
  {
    date: "09-11-2026 to 16-11-2026",
    day: "Monday to Monday",
    festival: "Diwali, Govardhan Puja, Bhaiduj, Chitragupt Puja",
    notice: "",
    days: 7,
    highlight: true,
  },
  {
    date: "24-11-2026",
    day: "Tuesday",
    festival: "Guru Nanak Jayanti",
    notice: "",
    days: 1,
  },
  {
    type: "banner",
    label: "3rd Unit Test",
    note: "Mid November",
  },
];

// ── GLOBAL STYLE (glass system, blobs, shine) ───────────────────────────────
function GlobalStyle() {
  return (
    <style>{`
      @keyframes hol-drift1 {
        0%, 100% { transform: translate(0, 0) scale(1); }
        50% { transform: translate(40px, 30px) scale(1.08); }
      }
      @keyframes hol-drift2 {
        0%, 100% { transform: translate(0, 0) scale(1); }
        50% { transform: translate(-30px, 25px) scale(1.05); }
      }
      @keyframes hol-drift3 {
        0%, 100% { transform: translate(0, 0) scale(1); }
        50% { transform: translate(20px, -35px) scale(1.1); }
      }
      .hol-blob1 { animation: hol-drift1 15s ease-in-out infinite; }
      .hol-blob2 { animation: hol-drift2 13s ease-in-out infinite; }
      .hol-blob3 { animation: hol-drift3 17s ease-in-out infinite; }

      .hol-glass {
        background: rgba(255,255,255,0.55);
        border: 1px solid rgba(255,255,255,0.75);
        backdrop-filter: blur(16px);
        -webkit-backdrop-filter: blur(16px);
        box-shadow: 0 10px 26px -14px rgba(134,25,143,0.28), inset 0 1px 0 rgba(255,255,255,0.85);
      }

      .hol-shine { position: relative; overflow: hidden; isolation: isolate; }
      .hol-shine::after {
        content: "";
        position: absolute;
        top: 0; left: -60%;
        width: 40%; height: 100%;
        background: linear-gradient(115deg, transparent, rgba(255,255,255,0.55), transparent);
        transform: skewX(-18deg);
        transition: left 0.75s ease;
        pointer-events: none;
      }
      .hol-shine:hover::after { left: 130%; }

      .hol-row {
        transition: background 0.2s ease;
      }

      .hol-fade-up {
        animation: hol-fadeup 0.7s ease both;
      }
      @keyframes hol-fadeup {
        from { opacity: 0; transform: translateY(20px); }
        to { opacity: 1; transform: translateY(0); }
      }

      @media (prefers-reduced-motion: reduce) {
        .hol-blob1, .hol-blob2, .hol-blob3 { animation: none !important; }
        .hol-shine::after { transition: none !important; }
        .hol-fade-up { animation: none !important; }
      }
    `}</style>
  );
}

// ── BADGE ────────────────────────────────────────────────────────────────────
function DaysBadge({ days, celebration }) {
  if (celebration) {
    return (
      <span
        className="hol-glass"
        style={{
          display: "inline-flex",
          alignItems: "center",
          gap: "4px",
          color: "#b45309",
          borderRadius: "999px",
          padding: "3px 12px",
          fontSize: "11px",
          fontWeight: 700,
          fontFamily: "Georgia, serif",
          whiteSpace: "nowrap",
          boxShadow:
            "0 6px 16px -10px rgba(245,158,11,0.5), inset 0 1px 0 rgba(255,255,255,0.9)",
        }}
      >
        🎉 School Event
      </span>
    );
  }
  if (days === 0) return null;
  return (
    <span
      className="hol-glass"
      style={{
        display: "inline-block",
        color: days >= 5 ? "#fff" : FUCHSIA,
        background:
          days >= 5
            ? `linear-gradient(135deg, ${FUCHSIA_DARK}, ${FUCHSIA_MID})`
            : "rgba(255,255,255,0.55)",
        borderRadius: "999px",
        padding: "3px 12px",
        fontSize: "11px",
        fontWeight: 700,
        fontFamily: "Georgia, serif",
        whiteSpace: "nowrap",
      }}
    >
      {days} {days === 1 ? "day" : "days"}
    </span>
  );
}

// ── EXAM BANNER ───────────────────────────────────────────────────────────────
function ExamBanner({ label, note }) {
  return (
    <div
      className="hol-shine"
      style={{
        background: `linear-gradient(90deg, rgba(74,4,78,0.85) 0%, rgba(162,28,175,0.85) 100%)`,
        border: "1px solid rgba(255,255,255,0.25)",
        backdropFilter: "blur(10px)",
        WebkitBackdropFilter: "blur(10px)",
        borderRadius: "12px",
        padding: "10px 20px",
        display: "flex",
        alignItems: "center",
        gap: "10px",
        margin: "6px 0",
        boxShadow: "inset 0 1px 0 rgba(255,255,255,0.2)",
      }}
    >
      <BookOpen size={16} color="#fde68a" />
      <span style={{ fontFamily: "Georgia, serif", fontSize: "14px", color: "#fff", fontWeight: "bold" }}>
        {label}
      </span>
      <span style={{ fontFamily: "sans-serif", fontSize: "12px", color: "rgba(255,255,255,0.7)", marginLeft: "4px" }}>
        — {note}
      </span>
    </div>
  );
}

// ── MAIN PAGE ─────────────────────────────────────────────────────────────────
export default function Holidays() {
  const [filter, setFilter] = useState("all");

  const visibleRows = holidays.filter((h) => {
    if (h.type === "banner") return true;
    if (filter === "all") return true;
    if (filter === "vacation") return h.highlight;
    if (filter === "celebration") return h.celebration;
    if (filter === "holiday") return !h.highlight && !h.celebration;
    return true;
  });

  const totalHolidayDays = holidays
    .filter((h) => !h.type && !h.celebration)
    .reduce((acc, h) => acc + (h.days || 0), 0);

  return (
    <div style={{ position: "relative", minHeight: "100vh", background: "#faf5ff", fontFamily: "sans-serif", overflow: "hidden" }}>
      <GlobalStyle />

      {/* ── HERO ── */}
      <div style={{
        position: "relative",
        padding: "48px 24px 64px",
        overflow: "hidden",
        background: `linear-gradient(135deg, ${FUCHSIA_DARK} 0%, ${FUCHSIA_MID} 60%, #c026d3 100%)`,
      }}>
        {/* drifting gradient blobs */}
        <div
          className="hol-blob1"
          style={{
            position: "absolute", top: "-60px", right: "-40px",
            width: 260, height: 260, borderRadius: "50%",
            background: "rgba(245,158,11,0.25)", filter: "blur(60px)",
            pointerEvents: "none",
          }}
        />
        <div
          className="hol-blob2"
          style={{
            position: "absolute", bottom: "-80px", left: "10%",
            width: 220, height: 220, borderRadius: "50%",
            background: "rgba(255,255,255,0.12)", filter: "blur(50px)",
            pointerEvents: "none",
          }}
        />
        <div
          className="hol-blob3"
          style={{
            position: "absolute", top: "20%", right: "25%",
            width: 140, height: 140, borderRadius: "50%",
            background: "rgba(240,171,252,0.2)", filter: "blur(40px)",
            pointerEvents: "none",
          }}
        />

        <div style={{ maxWidth: "900px", margin: "0 auto", position: "relative" }}>
          {/* eyebrow pill */}
          <span
            className="hol-glass"
            style={{
              display: "inline-flex", alignItems: "center", gap: "8px",
              padding: "7px 16px", borderRadius: "999px",
              fontSize: "11px", fontWeight: 700, letterSpacing: "0.14em",
              textTransform: "uppercase", color: "#fdf4ff",
              background: "rgba(255,255,255,0.15)",
              border: "1px solid rgba(255,255,255,0.3)",
              marginBottom: "16px",
            }}
          >
            <span style={{ width: 6, height: 6, borderRadius: "999px", background: AMBER }} />
            Session April 2026 – March 2027
          </span>

          <div style={{ display: "flex", alignItems: "center", gap: "12px", marginBottom: "20px" }}>
            <div
              className="hol-glass hol-shine"
              style={{
                borderRadius: "14px", padding: "12px",
                background: "rgba(255,255,255,0.15)",
                border: "1px solid rgba(255,255,255,0.3)",
              }}
            >
              <CalendarDays size={26} color="#fff" />
            </div>
            <h1 style={{ margin: 0, fontFamily: "Georgia, serif", fontSize: "clamp(24px, 5vw, 38px)", color: "#fff", fontWeight: "normal", lineHeight: 1.2 }}>
              Holiday List
            </h1>
          </div>

          <p style={{ margin: "0 0 24px", fontFamily: "sans-serif", fontSize: "13px", color: "rgba(255,255,255,0.75)", maxWidth: "560px" }}>
            Bachpan The Little Kingdom, Gumla &nbsp;·&nbsp; Lohardaga Road, Behind Old State Bus Depot, 835207<br />
            Primary Wing – Old D.A.V Campus, Bank Colony, Dunduria, Gumla
          </p>

          {/* stats row — glass chips */}
          <div style={{ display: "flex", gap: "12px", flexWrap: "wrap" }}>
            {[
              { icon: <Sun size={14} />, label: "Total Holiday Days", value: totalHolidayDays },
              { icon: <Star size={14} />, label: "Long Vacations", value: "3" },
              { icon: <Bell size={14} />, label: "School Celebrations", value: holidays.filter(h => h.celebration).length },
            ].map((s, i) => (
              <div
                key={i}
                className="hol-shine"
                style={{
                  background: "rgba(255,255,255,0.14)",
                  border: "1px solid rgba(255,255,255,0.25)",
                  backdropFilter: "blur(12px)",
                  WebkitBackdropFilter: "blur(12px)",
                  borderRadius: "12px",
                  padding: "10px 18px",
                  display: "flex", alignItems: "center", gap: "8px",
                  boxShadow: "inset 0 1px 0 rgba(255,255,255,0.2)",
                }}
              >
                <span style={{ color: AMBER }}>{s.icon}</span>
                <div>
                  <p style={{ margin: 0, fontSize: "18px", fontWeight: 700, color: "#fff", fontFamily: "Georgia, serif", lineHeight: 1 }}>{s.value}</p>
                  <p style={{ margin: 0, fontSize: "10px", color: "rgba(255,255,255,0.65)", textTransform: "uppercase", letterSpacing: "0.1em" }}>{s.label}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ── FILTER PILLS (glass, sticky) ── */}
      <div
        style={{
          background: "rgba(255,255,255,0.65)",
          borderBottom: "1px solid rgba(240,171,252,0.5)",
          backdropFilter: "blur(14px)",
          WebkitBackdropFilter: "blur(14px)",
          padding: "12px 24px",
          position: "sticky",
          top: 0,
          zIndex: 10,
        }}
      >
        <div style={{ maxWidth: "900px", margin: "0 auto", display: "flex", gap: "8px", flexWrap: "wrap" }}>
          {[
            { key: "all", label: "All" },
            { key: "vacation", label: "🌴 Long Vacations" },
            { key: "celebration", label: "🎉 School Events" },
            { key: "holiday", label: "📅 Public Holidays" },
          ].map((f) => {
            const active = filter === f.key;
            return (
              <button
                key={f.key}
                onClick={() => setFilter(f.key)}
                className="hol-shine"
                style={{
                  padding: "7px 14px",
                  borderRadius: "999px",
                  border: `1px solid ${active ? "rgba(255,255,255,0.4)" : "rgba(240,171,252,0.8)"}`,
                  background: active
                    ? `linear-gradient(135deg, ${FUCHSIA_DARK}, ${FUCHSIA_MID})`
                    : "rgba(255,255,255,0.55)",
                  backdropFilter: "blur(10px)",
                  WebkitBackdropFilter: "blur(10px)",
                  color: active ? "#fff" : FUCHSIA,
                  fontFamily: "sans-serif", fontSize: "12px", fontWeight: 600,
                  cursor: "pointer",
                  transition: "transform 0.2s ease, background 0.2s ease, color 0.2s ease",
                  letterSpacing: "0.04em",
                  boxShadow: active
                    ? "0 8px 20px -10px rgba(74,4,78,0.5), inset 0 1px 0 rgba(255,255,255,0.3)"
                    : "inset 0 1px 0 rgba(255,255,255,0.8)",
                }}
                onMouseEnter={(e) => { e.currentTarget.style.transform = "translateY(-2px)"; }}
                onMouseLeave={(e) => { e.currentTarget.style.transform = "translateY(0)"; }}
              >
                {f.label}
              </button>
            );
          })}
        </div>
      </div>

      {/* ── TABLE ── */}
      <div style={{ position: "relative", maxWidth: "900px", margin: "28px auto", padding: "0 16px 60px" }}>

        {/* Desktop Table */}
        <div
          className="hol-glass hidden sm:block"
          style={{ borderRadius: "18px", overflow: "hidden" }}
        >
          <table style={{ width: "100%", borderCollapse: "collapse" }}>
            <thead>
              <tr style={{ background: `linear-gradient(90deg, rgba(74,4,78,0.9), rgba(162,28,175,0.9))` }}>
                {["Date", "Day", "Festival / Occasion", "Notice", "Days"].map((h) => (
                  <th key={h} style={{
                    padding: "14px 16px", textAlign: "left",
                    fontFamily: "Georgia, serif", fontSize: "13px",
                    fontWeight: "normal", color: "#fff", letterSpacing: "0.05em",
                    whiteSpace: "nowrap",
                  }}>{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {visibleRows.map((row, i) => {
                if (row.type === "banner") {
                  return (
                    <tr key={i}>
                      <td colSpan={5} style={{ padding: "6px 12px" }}>
                        <ExamBanner label={row.label} note={row.note} />
                      </td>
                    </tr>
                  );
                }
                const bg = row.highlight
                  ? "rgba(253,244,255,0.6)"
                  : row.celebration
                  ? "rgba(255,247,237,0.6)"
                  : i % 2 === 0 ? "rgba(255,255,255,0.3)" : "rgba(253,250,255,0.3)";
                return (
                  <tr
                    key={i}
                    className="hol-row"
                    style={{
                      background: bg,
                      borderBottom: "1px solid rgba(240,171,252,0.35)",
                    }}
                    onMouseEnter={(e) => (e.currentTarget.style.background = "rgba(250,240,254,0.7)")}
                    onMouseLeave={(e) => (e.currentTarget.style.background = bg)}
                  >
                    <td style={{ padding: "13px 16px", fontFamily: "Georgia, serif", fontSize: "13px", color: FUCHSIA_DARK, fontWeight: 600, whiteSpace: "nowrap" }}>
                      {row.date}
                    </td>
                    <td style={{ padding: "13px 16px", fontFamily: "sans-serif", fontSize: "12.5px", color: "#6b21a8", whiteSpace: "nowrap" }}>
                      {row.day}
                    </td>
                    <td style={{ padding: "13px 16px", fontFamily: "sans-serif", fontSize: "13px", color: "#1e1b4b", fontWeight: 500 }}>
                      {row.festival}
                    </td>
                    <td style={{ padding: "13px 16px", fontFamily: "sans-serif", fontSize: "12px", color: "#92400e" }}>
                      {row.notice || <span style={{ color: "#d8b4fe" }}>—</span>}
                    </td>
                    <td style={{ padding: "13px 16px" }}>
                      <DaysBadge days={row.days} celebration={row.celebration} />
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>

        {/* Mobile Cards */}
        <div className="sm:hidden" style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
          {visibleRows.map((row, i) => {
            if (row.type === "banner") {
              return <ExamBanner key={i} label={row.label} note={row.note} />;
            }
            const bg = row.highlight
              ? "rgba(253,244,255,0.6)"
              : row.celebration
              ? "rgba(255,247,237,0.6)"
              : "rgba(255,255,255,0.5)";
            return (
              <div
                key={i}
                className="hol-shine"
                style={{
                  background: bg,
                  border: "1px solid rgba(240,171,252,0.5)",
                  backdropFilter: "blur(12px)",
                  WebkitBackdropFilter: "blur(12px)",
                  borderRadius: "14px",
                  padding: "14px 16px",
                  boxShadow: "0 6px 18px -12px rgba(134,25,143,0.3), inset 0 1px 0 rgba(255,255,255,0.7)",
                }}
              >
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: "6px" }}>
                  <p style={{ margin: 0, fontFamily: "Georgia, serif", fontSize: "13px", color: FUCHSIA_DARK, fontWeight: 700 }}>{row.date}</p>
                  <DaysBadge days={row.days} celebration={row.celebration} />
                </div>
                <p style={{ margin: "0 0 4px", fontFamily: "sans-serif", fontSize: "14px", color: "#1e1b4b", fontWeight: 600 }}>{row.festival}</p>
                <p style={{ margin: 0, fontFamily: "sans-serif", fontSize: "12px", color: "#6b21a8" }}>{row.day}</p>
                {row.notice && (
                  <p style={{ margin: "6px 0 0", fontFamily: "sans-serif", fontSize: "12px", color: "#92400e", background: "rgba(255,247,237,0.8)", borderRadius: "6px", padding: "5px 8px" }}>
                    📌 {row.notice}
                  </p>
                )}
              </div>
            );
          })}
        </div>

        {/* Legend */}
        <div
          className="hol-glass"
          style={{
            marginTop: "28px", borderRadius: "14px", padding: "16px 20px",
            display: "flex", gap: "20px", flexWrap: "wrap", alignItems: "center",
          }}
        >
          <p style={{ margin: 0, fontFamily: "Georgia, serif", fontSize: "13px", color: FUCHSIA_DARK, fontWeight: 600 }}>Legend:</p>
          {[
            { color: "rgba(253,244,255,0.9)", border: "#f0abfc", label: "Long Vacation" },
            { color: "rgba(255,247,237,0.9)", border: "#fed7aa", label: "School Celebration" },
            { color: "rgba(255,255,255,0.9)", border: "#fae8ff", label: "Public Holiday" },
          ].map((l) => (
            <div key={l.label} style={{ display: "flex", alignItems: "center", gap: "8px" }}>
              <div style={{ width: "16px", height: "16px", borderRadius: "5px", background: l.color, border: `1.5px solid ${l.border}` }} />
              <span style={{ fontFamily: "sans-serif", fontSize: "12px", color: "#6b21a8" }}>{l.label}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}