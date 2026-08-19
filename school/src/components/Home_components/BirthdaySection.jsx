import React, { useEffect, useState } from "react";
import { studentService } from "../../services/studentService";

export default function BirthdaysSection() {
  const [students, setStudents] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    studentService
      .upcomingBirthdays(30)
      .then((data) => setStudents(Array.isArray(data) ? data : []))
      .catch(() => setStudents([]))
      .finally(() => setLoading(false));
  }, []);

  if (!loading && students.length === 0) return null;

  const today = new Date();
  const withDays = students
    .map((s) => {
      let next = new Date(today.getFullYear(), s.birthMonth - 1, s.birthDay);
      if (next < today) next.setFullYear(next.getFullYear() + 1);
      return { ...s, daysUntil: Math.round((next - today) / 86400000) };
    })
    .sort((a, b) => a.daysUntil - b.daysUntil);

  return (
    <section id="birthdays" className="bday-sec-font relative overflow-hidden bg-gradient-to-b from-white via-[#FAF7FF] to-[#F3F0FF] py-14 sm:py-20 scroll-mt-4">
      <BirthdaySectionStyles />
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <div className="absolute -top-16 -right-16 w-72 h-72 rounded-full bg-fuchsia-200/40 blur-3xl" />
        <div className="absolute -bottom-16 -left-16 w-72 h-72 rounded-full bg-indigo-200/40 blur-3xl" />
      </div>

      <div className="relative max-w-5xl mx-auto px-4 sm:px-6">
        <div className="text-center mb-10 bday-sec-in">
          <span className="glass-pill-sec mx-auto">
            <span className="glass-dot-sec" />
            Birthday Celebrations
          </span>
          <h2 className="bday-sec-display mt-3 text-2xl sm:text-3xl md:text-[2.2rem] font-semibold text-[#221B45] leading-[1.15]">
            Celebrating Every{" "}
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-indigo-600 via-violet-600 to-fuchsia-500">
              Little Milestone
            </span>
          </h2>
          <p className="text-[#5D5885] mt-3 max-w-md mx-auto text-sm leading-relaxed">
            Here's who's celebrating soon — wish them a wonderful year ahead!
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {withDays.map((s, i) => (
            <BirthdayCard key={s._id || i} student={s} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}

function BirthdayCard({ student, index }) {
  const initial = student.studentName?.[0]?.toUpperCase() || "?";
  const label =
    student.daysUntil === 0 ? "Today 🎉" : student.daysUntil === 1 ? "Tomorrow" : `In ${student.daysUntil} days`;

  return (
    <div className="bday-sec-card bday-sec-in" style={{ animationDelay: `${100 + index * 70}ms` }}>
      <div className="bday-sec-avatar">{initial}</div>
      <div className="min-w-0 flex-1">
        <p className="text-sm font-semibold text-[#221B45] truncate">{student.studentName}</p>
        <p className="text-xs text-[#6E6892] mt-0.5">
          Class {student.className} · {String(student.birthDay).padStart(2, "0")}/{String(student.birthMonth).padStart(2, "0")}
        </p>
      </div>
      <span className={`bday-sec-badge ${student.daysUntil <= 1 ? "bday-sec-badge--hot" : ""}`}>{label}</span>
    </div>
  );
}

function BirthdaySectionStyles() {
  return (
    <style>{`
      .bday-sec-font, .bday-sec-font * { font-family: "Plus Jakarta Sans", ui-sans-serif, system-ui, sans-serif; }
      .bday-sec-display { font-family: "Fredoka", "Plus Jakarta Sans", ui-sans-serif, system-ui, sans-serif; }

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
      .glass-dot-sec { width: 6px; height: 6px; border-radius: 999px; background: #7C3AED; box-shadow: 0 0 0 4px rgba(124,58,237,0.18); }

      .bday-sec-card {
        display: flex; align-items: center; gap: 12px;
        padding: 14px 16px; border-radius: 18px;
        background: rgba(255,255,255,0.6);
        border: 1px solid rgba(255,255,255,0.8);
        backdrop-filter: blur(14px);
        box-shadow: 0 10px 26px -14px rgba(99,60,201,0.3), inset 0 1px 0 rgba(255,255,255,0.85);
      }

      .bday-sec-avatar {
        flex-shrink: 0; width: 42px; height: 42px; border-radius: 999px;
        display: flex; align-items: center; justify-content: center;
        font-weight: 700; font-size: 15px; color: #fff;
        background: linear-gradient(135deg, #6d28d9, #d946ef);
        box-shadow: 0 6px 14px -6px rgba(109,40,217,0.5);
      }

      .bday-sec-badge {
        flex-shrink: 0; font-size: 11px; font-weight: 700;
        padding: 4px 10px; border-radius: 999px; color: #4C1D95;
        background: rgba(196,181,253,0.35);
        border: 1px solid rgba(196,181,253,0.6);
      }
      .bday-sec-badge--hot { color: #9d174d; background: rgba(244,114,182,0.25); border: 1px solid rgba(244,114,182,0.5); }

      .bday-sec-in { opacity: 0; animation: bdaySecIn 0.7s ease-out forwards; }
      @keyframes bdaySecIn { from { opacity: 0; transform: translateY(14px); } to { opacity: 1; transform: translateY(0); } }

      @media (prefers-reduced-motion: reduce) {
        .bday-sec-in { animation: none !important; opacity: 1; transform: none; }
      }
    `}</style>
  );
}