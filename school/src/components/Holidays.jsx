import React, { useState } from "react";
import { CalendarDays, Sun, Star, BookOpen, Bell } from "lucide-react";

const FUCHSIA = "#86198f";
const FUCHSIA_DARK = "#4a044e";
const FUCHSIA_MID = "#a21caf";
const FUCHSIA_LIGHT = "#fdf4ff";
const FUCHSIA_BORDER = "#f0abfc";

// ── DATA ────────────────────────────────────────────────────────────────────
const examBanners = [
  { label: "1st Unit Test", note: "1st week of May" },
  { label: "2nd Unit Test", note: "3rd week of July" },
  { label: "1st Terminal Examination", note: "3rd week of September" },
  { label: "3rd Unit Test", note: "Mid November" },
];

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

// ── BADGE ────────────────────────────────────────────────────────────────────
function DaysBadge({ days, celebration }) {
  if (celebration) {
    return (
      <span style={{
        display: "inline-flex", alignItems: "center", gap: "4px",
        background: "#fff7ed", color: "#c2410c", border: "1px solid #fed7aa",
        borderRadius: "999px", padding: "2px 10px", fontSize: "11px", fontWeight: 700,
        fontFamily: "Georgia, serif", whiteSpace: "nowrap",
      }}>
        🎉 School Event
      </span>
    );
  }
  if (days === 0) return null;
  return (
    <span style={{
      display: "inline-block",
      background: days >= 5 ? FUCHSIA_DARK : FUCHSIA_LIGHT,
      color: days >= 5 ? "#fff" : FUCHSIA,
      border: `1px solid ${days >= 5 ? FUCHSIA_DARK : FUCHSIA_BORDER}`,
      borderRadius: "999px", padding: "2px 10px", fontSize: "11px", fontWeight: 700,
      fontFamily: "Georgia, serif", whiteSpace: "nowrap",
    }}>
      {days} {days === 1 ? "day" : "days"}
    </span>
  );
}

// ── EXAM BANNER ───────────────────────────────────────────────────────────────
function ExamBanner({ label, note }) {
  return (
    <div style={{
      background: `linear-gradient(90deg, ${FUCHSIA_DARK} 0%, ${FUCHSIA_MID} 100%)`,
      borderRadius: "10px",
      padding: "10px 20px",
      display: "flex",
      alignItems: "center",
      gap: "10px",
      margin: "6px 0",
    }}>
      <BookOpen size={16} color="#f5d0fe" />
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
    <div style={{ minHeight: "100vh", background: "#faf5ff", fontFamily: "sans-serif" }}>

      {/* ── HERO ── */}
      <div style={{
        background: `linear-gradient(135deg, ${FUCHSIA_DARK} 0%, ${FUCHSIA_MID} 60%, #c026d3 100%)`,
        padding: "48px 24px 56px",
        position: "relative",
        overflow: "hidden",
      }}>
        {/* decorative circles */}
        {[120, 200, 60].map((size, i) => (
          <div key={i} style={{
            position: "absolute",
            width: size, height: size,
            borderRadius: "50%",
            background: "rgba(255,255,255,0.06)",
            top: ["-30px", "10px", "60px"][i],
            right: ["-40px", "15%", "30%"][i],
            pointerEvents: "none",
          }} />
        ))}

        <div style={{ maxWidth: "900px", margin: "0 auto", position: "relative" }}>
          <div style={{ display: "flex", alignItems: "center", gap: "12px", marginBottom: "12px" }}>
            <div style={{ background: "rgba(255,255,255,0.15)", borderRadius: "12px", padding: "10px" }}>
              <CalendarDays size={28} color="#fff" />
            </div>
            <div>
              <p style={{ margin: 0, fontFamily: "sans-serif", fontSize: "11px", letterSpacing: "0.18em", textTransform: "uppercase", color: "rgba(255,255,255,0.65)" }}>
                Session April 2026 – March 2027
              </p>
              <h1 style={{ margin: 0, fontFamily: "Georgia, serif", fontSize: "clamp(22px, 5vw, 36px)", color: "#fff", fontWeight: "normal", lineHeight: 1.2 }}>
                Holiday List
              </h1>
            </div>
          </div>

          <p style={{ margin: "0 0 24px", fontFamily: "sans-serif", fontSize: "13px", color: "rgba(255,255,255,0.75)", maxWidth: "560px" }}>
            Bachpan The Little Kingdom, Gumla &nbsp;·&nbsp; Lohardaga Road, Behind Old State Bus Depot, 835207<br />
            Primary Wing – Old D.A.V Campus, Bank Colony, Dunduria, Gumla
          </p>

          {/* stats row */}
          <div style={{ display: "flex", gap: "12px", flexWrap: "wrap" }}>
            {[
              { icon: <Sun size={14} />, label: "Total Holiday Days", value: totalHolidayDays },
              { icon: <Star size={14} />, label: "Long Vacations", value: "3" },
              { icon: <Bell size={14} />, label: "School Celebrations", value: holidays.filter(h => h.celebration).length },
            ].map((s, i) => (
              <div key={i} style={{
                background: "rgba(255,255,255,0.12)",
                border: "1px solid rgba(255,255,255,0.2)",
                borderRadius: "10px",
                padding: "10px 18px",
                display: "flex", alignItems: "center", gap: "8px",
              }}>
                <span style={{ color: "#f0abfc" }}>{s.icon}</span>
                <div>
                  <p style={{ margin: 0, fontSize: "18px", fontWeight: 700, color: "#fff", fontFamily: "Georgia, serif", lineHeight: 1 }}>{s.value}</p>
                  <p style={{ margin: 0, fontSize: "10px", color: "rgba(255,255,255,0.6)", textTransform: "uppercase", letterSpacing: "0.1em" }}>{s.label}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ── FILTER PILLS ── */}
      <div style={{ background: "#fff", borderBottom: "1px solid #fae8ff", padding: "12px 24px", position: "sticky", top: 0, zIndex: 10 }}>
        <div style={{ maxWidth: "900px", margin: "0 auto", display: "flex", gap: "8px", flexWrap: "wrap" }}>
          {[
            { key: "all", label: "All" },
            { key: "vacation", label: "🌴 Long Vacations" },
            { key: "celebration", label: "🎉 School Events" },
            { key: "holiday", label: "📅 Public Holidays" },
          ].map((f) => (
            <button key={f.key} onClick={() => setFilter(f.key)} style={{
              padding: "6px 14px",
              borderRadius: "999px",
              border: `1.5px solid ${filter === f.key ? FUCHSIA : FUCHSIA_BORDER}`,
              background: filter === f.key ? FUCHSIA : "transparent",
              color: filter === f.key ? "#fff" : FUCHSIA,
              fontFamily: "sans-serif", fontSize: "12px", fontWeight: 600,
              cursor: "pointer", transition: "all 0.18s ease",
              letterSpacing: "0.04em",
            }}>
              {f.label}
            </button>
          ))}
        </div>
      </div>

      {/* ── TABLE ── */}
      <div style={{ maxWidth: "900px", margin: "28px auto", padding: "0 16px 60px" }}>

        {/* Desktop Table */}
        <div className="hidden sm:block" style={{ background: "#fff", borderRadius: "16px", border: "1px solid #fae8ff", overflow: "hidden", boxShadow: "0 4px 32px rgba(134,25,143,0.08)" }}>
          <table style={{ width: "100%", borderCollapse: "collapse" }}>
            <thead>
              <tr style={{ background: `linear-gradient(90deg, ${FUCHSIA_DARK}, ${FUCHSIA_MID})` }}>
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
                return (
                  <tr key={i} style={{
                    background: row.highlight
                      ? "#fdf4ff"
                      : row.celebration
                      ? "#fff7ed"
                      : i % 2 === 0 ? "#fff" : "#fdfaff",
                    borderBottom: "1px solid #fae8ff",
                    transition: "background 0.15s",
                  }}
                    onMouseEnter={(e) => (e.currentTarget.style.background = "#faf0fe")}
                    onMouseLeave={(e) => (e.currentTarget.style.background = row.highlight ? "#fdf4ff" : row.celebration ? "#fff7ed" : i % 2 === 0 ? "#fff" : "#fdfaff")}
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
                    <td style={{ padding: "13px 16px", fontFamily: "sans-serif", fontSize: "12px", color: "#92400e", fontStyle: row.notice ? "normal" : "normal" }}>
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
            return (
              <div key={i} style={{
                background: row.highlight ? "#fdf4ff" : row.celebration ? "#fff7ed" : "#fff",
                border: `1px solid ${row.highlight ? FUCHSIA_BORDER : row.celebration ? "#fed7aa" : "#fae8ff"}`,
                borderRadius: "12px",
                padding: "14px 16px",
                boxShadow: "0 2px 8px rgba(134,25,143,0.06)",
              }}>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: "6px" }}>
                  <p style={{ margin: 0, fontFamily: "Georgia, serif", fontSize: "13px", color: FUCHSIA_DARK, fontWeight: 700 }}>{row.date}</p>
                  <DaysBadge days={row.days} celebration={row.celebration} />
                </div>
                <p style={{ margin: "0 0 4px", fontFamily: "sans-serif", fontSize: "14px", color: "#1e1b4b", fontWeight: 600 }}>{row.festival}</p>
                <p style={{ margin: 0, fontFamily: "sans-serif", fontSize: "12px", color: "#6b21a8" }}>{row.day}</p>
                {row.notice && (
                  <p style={{ margin: "6px 0 0", fontFamily: "sans-serif", fontSize: "12px", color: "#92400e", background: "#fff7ed", borderRadius: "6px", padding: "5px 8px" }}>
                    📌 {row.notice}
                  </p>
                )}
              </div>
            );
          })}
        </div>

        {/* Legend */}
        <div style={{
          marginTop: "28px", background: "#fff", border: "1px solid #fae8ff",
          borderRadius: "12px", padding: "16px 20px",
          display: "flex", gap: "20px", flexWrap: "wrap", alignItems: "center",
        }}>
          <p style={{ margin: 0, fontFamily: "Georgia, serif", fontSize: "13px", color: FUCHSIA_DARK, fontWeight: 600 }}>Legend:</p>
          {[
            { color: "#fdf4ff", border: FUCHSIA_BORDER, label: "Long Vacation" },
            { color: "#fff7ed", border: "#fed7aa", label: "School Celebration" },
            { color: "#fff", border: "#fae8ff", label: "Public Holiday" },
          ].map((l) => (
            <div key={l.label} style={{ display: "flex", alignItems: "center", gap: "8px" }}>
              <div style={{ width: "16px", height: "16px", borderRadius: "4px", background: l.color, border: `1.5px solid ${l.border}` }} />
              <span style={{ fontFamily: "sans-serif", fontSize: "12px", color: "#6b21a8" }}>{l.label}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}