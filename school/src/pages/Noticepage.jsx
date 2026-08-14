import React, { useEffect, useState, useCallback } from "react";
import {
  Megaphone,
  ClipboardList,
  CalendarDays,
  PartyPopper,
  AlertTriangle,
  GraduationCap,
  Paperclip,
  FileText,
  Inbox,
  RefreshCw,
  X,
  ExternalLink,
  ZoomIn,
} from "lucide-react";

// Same base as the rest of the app — override with VITE_API_URL if the
// frontend and API aren't served from the same origin.
const API_BASE = import.meta.env?.VITE_API_URL || "";

const FUCHSIA = "#86198f";
const FUCHSIA_DARK = "#4a044e";
const FUCHSIA_MID = "#a21caf";
const AMBER = "#f59e0b";
const AMBER_DARK = "#b45309";

// Each notice category gets its own quiet badge color. "Urgent" is the one
// deliberate break from the brand palette — red is the one color that
// reads as "pay attention" without a caption.
const CATEGORY_META = {
  general: { label: "General", icon: Megaphone, text: FUCHSIA_DARK, bg: "rgba(253,244,255,0.7)", border: "rgba(232,121,249,0.5)" },
  exam: { label: "Exam", icon: ClipboardList, text: "#6d28d9", bg: "rgba(245,243,255,0.7)", border: "rgba(221,214,254,0.6)" },
  holiday: { label: "Holiday", icon: CalendarDays, text: AMBER_DARK, bg: "rgba(255,251,235,0.7)", border: "rgba(253,230,138,0.6)" },
  event: { label: "Event", icon: PartyPopper, text: "#be185d", bg: "rgba(253,242,248,0.7)", border: "rgba(251,207,232,0.6)" },
  urgent: { label: "Urgent", icon: AlertTriangle, text: "#dc2626", bg: "rgba(254,242,242,0.7)", border: "rgba(254,202,202,0.6)" },
  admission: { label: "Admission", icon: GraduationCap, text: "#0f766e", bg: "rgba(240,253,250,0.7)", border: "rgba(153,246,228,0.6)" },
};

const FILTERS = [
  { key: "all", label: "All notices" },
  ...Object.entries(CATEGORY_META).map(([key, v]) => ({ key, label: v.label })),
];

function formatDateBadge(dateStr) {
  const d = new Date(dateStr);
  return {
    day: d.toLocaleDateString(undefined, { day: "2-digit" }),
    month: d.toLocaleDateString(undefined, { month: "short" }),
  };
}

function timeAgo(dateStr) {
  const diffMs = Date.now() - new Date(dateStr).getTime();
  const mins = Math.floor(diffMs / 60000);
  if (mins < 60) return mins <= 1 ? "just now" : `${mins} min ago`;
  const hrs = Math.floor(mins / 60);
  if (hrs < 24) return `${hrs} hr${hrs > 1 ? "s" : ""} ago`;
  const days = Math.floor(hrs / 24);
  if (days < 30) return `${days} day${days > 1 ? "s" : ""} ago`;
  const months = Math.floor(days / 30);
  if (months < 12) return `${months} mo ago`;
  return `${Math.floor(months / 12)} yr ago`;
}

// Works whether the backend sends `attachmentResourceType` ("image" / "raw")
// or nothing at all — falls back to sniffing the file extension.
function getAttachmentKind(notice) {
  if (!notice.attachmentUrl) return null;
  if (notice.attachmentResourceType === "image") return "image";
  if (notice.attachmentResourceType === "raw") return "pdf";
  const url = notice.attachmentUrl.toLowerCase();
  if (/\.pdf(\?|$)/.test(url)) return "pdf";
  if (/\.(png|jpe?g|gif|webp|svg|avif)(\?|$)/.test(url)) return "image";
  return "file";
}

function attachmentFileName(url) {
  try {
    const clean = url.split("?")[0];
    return decodeURIComponent(clean.substring(clean.lastIndexOf("/") + 1));
  } catch {
    return "attachment";
  }
}

export default function NoticesPage() {
  const [activeCategory, setActiveCategory] = useState("all");
  const [notices, setNotices] = useState([]);
  const [status, setStatus] = useState("loading"); // loading | success | error
  const [errorMsg, setErrorMsg] = useState("");
  const [retryToken, setRetryToken] = useState(0);
  const [lightbox, setLightbox] = useState(null); // { url, title } | null

  useEffect(() => {
    const controller = new AbortController();

    const fetchNotices = async () => {
      setStatus("loading");
      try {
        const url =
          activeCategory === "all"
            ? `${API_BASE}/api/notices`
            : `${API_BASE}/api/notices?category=${activeCategory}`;
        const res = await fetch(url, { signal: controller.signal });
        const json = await res.json();
        if (!res.ok) throw new Error(json?.message || "Couldn't load notices");
        setNotices(Array.isArray(json?.data) ? json.data : []);
        setStatus("success");
      } catch (err) {
        if (err.name !== "AbortError") {
          setErrorMsg(err.message || "Something went wrong");
          setStatus("error");
        }
      }
    };

    fetchNotices();
    return () => controller.abort();
  }, [activeCategory, retryToken]);

  const closeLightbox = useCallback(() => setLightbox(null), []);

  useEffect(() => {
    if (!lightbox) return;
    const onKey = (e) => e.key === "Escape" && closeLightbox();
    document.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [lightbox, closeLightbox]);

  return (
    <div className="relative min-h-screen overflow-hidden bg-gradient-to-br from-fuchsia-50 via-white to-amber-50">
      {/* Drifting gradient blobs */}
      <div
        className="pointer-events-none fixed -top-40 -left-32 w-[28rem] h-[28rem] rounded-full blur-3xl opacity-30 motion-safe:animate-[np-blob1_16s_ease-in-out_infinite]"
        style={{ background: `radial-gradient(circle, ${FUCHSIA_MID}, transparent 70%)` }}
      />
      <div
        className="pointer-events-none fixed -bottom-48 -right-24 w-[32rem] h-[32rem] rounded-full blur-3xl opacity-30 motion-safe:animate-[np-blob2_18s_ease-in-out_infinite]"
        style={{ background: `radial-gradient(circle, ${AMBER}, transparent 70%)` }}
      />
      <div
        className="pointer-events-none fixed top-1/2 left-1/2 w-72 h-72 rounded-full blur-3xl opacity-20 motion-safe:animate-[np-blob3_14s_ease-in-out_infinite]"
        style={{ background: `radial-gradient(circle, ${FUCHSIA}, transparent 70%)` }}
      />

      <style>{`
        @keyframes np-blob1 { 0%,100% { transform: translate(0,0) scale(1); } 50% { transform: translate(40px,30px) scale(1.08); } }
        @keyframes np-blob2 { 0%,100% { transform: translate(0,0) scale(1); } 50% { transform: translate(-30px,-40px) scale(1.1); } }
        @keyframes np-blob3 { 0%,100% { transform: translate(0,0) scale(1); } 50% { transform: translate(-25px,25px) scale(0.95); } }
        @keyframes np-fade-up { from { opacity: 0; transform: translateY(14px); } to { opacity: 1; transform: translateY(0); } }
        @keyframes np-fade-in { from { opacity: 0; } to { opacity: 1; } }
        @keyframes np-scale-in { from { opacity: 0; transform: scale(0.96); } to { opacity: 1; transform: scale(1); } }
        @keyframes np-shimmer { 0%,100% { opacity: 0.5; } 50% { opacity: 0.9; } }
        .np-hero-el { animation: np-fade-up 0.5s ease both; }
        .np-item { animation: np-fade-up 0.45s ease both; }
        .np-skel { animation: np-shimmer 1.4s ease-in-out infinite; }
        .np-filter-scroll::-webkit-scrollbar { display: none; }
        .np-filter-scroll { -ms-overflow-style: none; scrollbar-width: none; }
        .np-attachment-img { transition: transform 0.35s ease; }
        .np-attachment-wrap:hover .np-attachment-img { transform: scale(1.03); }
        .np-attachment-wrap:hover .np-zoom-hint { opacity: 1; }
        .np-glass-shine { position: relative; overflow: hidden; isolation: isolate; }
        .np-glass-shine::after {
          content: "";
          position: absolute; top: 0; left: -60%; width: 40%; height: 100%;
          background: linear-gradient(115deg, transparent, rgba(255,255,255,0.55), transparent);
          transform: skewX(-18deg);
          transition: left 0.75s ease;
        }
        .np-glass-shine:hover::after { left: 130%; }
        .np-retry-btn:hover { filter: brightness(1.08); }
        @media (prefers-reduced-motion: reduce) {
          .np-item, .np-attachment-img, .np-hero-el, .np-skel, .np-glass-shine::after,
          [class*="motion-safe:animate-"] { animation: none !important; transition: none !important; }
        }
      `}</style>

      {/* Hero */}
      <div className="relative px-4 sm:px-6 pt-14 pb-8 sm:pt-16 sm:pb-10">
        <div className="max-w-2xl mx-auto text-center">
          <div className="np-hero-el flex justify-center mb-5">
            <span
              className="inline-flex items-center gap-2 rounded-full px-4 py-2 text-[13px] font-semibold text-fuchsia-900"
              style={{
                background: "rgba(255,255,255,0.55)",
                border: "1px solid rgba(255,255,255,0.8)",
                backdropFilter: "blur(14px)",
                boxShadow: "0 8px 20px -10px rgba(162,28,175,0.35), inset 0 1px 0 rgba(255,255,255,0.9)",
              }}
            >
              <span className="h-1.5 w-1.5 rounded-full" style={{ background: FUCHSIA_MID }} />
              Bachpan updates
            </span>
          </div>

          <div
            className="np-hero-el mx-auto mb-5 flex h-14 w-14 items-center justify-center rounded-2xl"
            style={{
              animationDelay: "0.05s",
              background: `linear-gradient(150deg, ${FUCHSIA_MID}33, ${AMBER}24)`,
              border: "1px solid rgba(255,255,255,0.75)",
              backdropFilter: "blur(10px)",
              boxShadow: "inset 0 1px 0 rgba(255,255,255,0.7), 0 6px 14px -8px rgba(162,28,175,0.35)",
            }}
          >
            <Megaphone size={26} color={FUCHSIA_DARK} />
          </div>

          <h1
            className="np-hero-el text-3xl sm:text-4xl font-semibold text-gray-900 mb-3"
            style={{ animationDelay: "0.1s", fontFamily: "Fredoka, sans-serif" }}
          >
            Notices &amp; announcements
          </h1>
          <p className="np-hero-el text-sm sm:text-base text-gray-600" style={{ animationDelay: "0.15s" }}>
            Everything from Bachpan – The Little Kingdom, in one place.
          </p>
        </div>
      </div>

      {/* Filters */}
      <div
        className="sticky top-0 z-20 py-3.5 px-4 sm:px-6"
        style={{
          background: "rgba(255,255,255,0.6)",
          borderBottom: "1px solid rgba(255,255,255,0.75)",
          backdropFilter: "blur(16px)",
          WebkitBackdropFilter: "blur(16px)",
        }}
      >
        <div className="np-filter-scroll max-w-2xl mx-auto flex gap-2 overflow-x-auto pb-0.5">
          {FILTERS.map((f) => {
            const active = activeCategory === f.key;
            return (
              <button
                key={f.key}
                onClick={() => setActiveCategory(f.key)}
                className="np-glass-shine shrink-0 whitespace-nowrap rounded-full px-4 py-2 text-[12.5px] font-semibold transition-all"
                style={
                  active
                    ? {
                        color: "#ffffff",
                        background: `linear-gradient(135deg, ${AMBER}, ${AMBER_DARK})`,
                        boxShadow: "0 8px 18px -8px rgba(180,83,9,0.5), inset 0 1px 0 rgba(255,255,255,0.25)",
                      }
                    : {
                        color: FUCHSIA_DARK,
                        background: "rgba(255,255,255,0.5)",
                        border: "1px solid rgba(255,255,255,0.8)",
                        backdropFilter: "blur(10px)",
                      }
                }
              >
                {f.label}
              </button>
            );
          })}
        </div>
      </div>

      {/* Timeline */}
      <div className="relative max-w-2xl mx-auto px-4 sm:px-6 py-9 pb-20">
        {status === "loading" && (
          <div className="flex flex-col gap-4">
            {[0, 1, 2].map((i) => (
              <div key={i} className="flex gap-4">
                <div
                  className="np-skel shrink-0 rounded-2xl"
                  style={{ width: "56px", height: "56px", background: "rgba(255,255,255,0.6)" }}
                />
                <div
                  className="np-skel flex-1 rounded-2xl"
                  style={{ height: "96px", background: "rgba(255,255,255,0.6)" }}
                />
              </div>
            ))}
          </div>
        )}

        {status === "error" && (
          <div
            className="text-center py-12 px-4 rounded-3xl mx-auto max-w-md"
            style={{
              background: "rgba(255,255,255,0.55)",
              border: "1px solid rgba(255,255,255,0.75)",
              backdropFilter: "blur(16px)",
            }}
          >
            <p className="text-sm text-red-600 mb-4">{errorMsg}</p>
            <button
              className="np-retry-btn inline-flex items-center gap-1.5 rounded-xl px-4 py-2.5 text-sm font-semibold text-white transition-all hover:-translate-y-0.5"
              onClick={() => setRetryToken((n) => n + 1)}
              style={{
                background: `linear-gradient(135deg, ${FUCHSIA_MID}, ${FUCHSIA})`,
                boxShadow: "0 10px 22px -10px rgba(162,28,175,0.55)",
              }}
            >
              <RefreshCw size={14} /> Try again
            </button>
          </div>
        )}

        {status === "success" && notices.length === 0 && (
          <div
            className="text-center py-16 px-4 rounded-3xl mx-auto max-w-md"
            style={{
              background: "rgba(255,255,255,0.5)",
              border: "1px solid rgba(255,255,255,0.75)",
              backdropFilter: "blur(14px)",
            }}
          >
            <Inbox size={36} className="mx-auto mb-3" color={FUCHSIA_MID} />
            <p className="text-sm text-fuchsia-800">No notices in this category yet.</p>
          </div>
        )}

        {status === "success" && notices.length > 0 && (
          <div className="relative">
            {/* connecting line */}
            <div
              aria-hidden="true"
              className="hidden sm:block absolute"
              style={{ left: "27px", top: "8px", bottom: "8px", width: "2px", background: "rgba(232,121,249,0.4)" }}
            />

            <div className="flex flex-col gap-5">
              {notices.map((notice, i) => {
                const meta = CATEGORY_META[notice.category] || CATEGORY_META.general;
                const Icon = meta.icon;
                const date = formatDateBadge(notice.createdAt);
                const isUrgent = notice.category === "urgent";
                const attachmentKind = getAttachmentKind(notice);

                return (
                  <div
                    key={notice._id}
                    className="np-item relative flex gap-4"
                    style={{ animationDelay: `${Math.min(i, 6) * 0.06}s` }}
                  >
                    {/* date badge */}
                    <div
                      className="hidden sm:flex shrink-0 flex-col items-center justify-center rounded-2xl"
                      style={{
                        width: "56px",
                        height: "56px",
                        background: `linear-gradient(150deg, ${FUCHSIA_DARK}, ${FUCHSIA_MID})`,
                        color: "#ffffff",
                        zIndex: 1,
                        boxShadow: "0 8px 18px -10px rgba(74,4,78,0.5)",
                      }}
                    >
                      <span className="text-[17px] font-bold leading-none">{date.day}</span>
                      <span className="text-[9.5px] uppercase tracking-wide opacity-80">{date.month}</span>
                    </div>

                    {/* card */}
                    <div
                      className="flex-1 min-w-0 rounded-3xl overflow-hidden"
                      style={{
                        background: "rgba(255,255,255,0.55)",
                        border: `1px solid ${isUrgent ? "rgba(254,202,202,0.7)" : "rgba(255,255,255,0.75)"}`,
                        borderLeft: `4px solid ${meta.text}`,
                        backdropFilter: "blur(16px)",
                        WebkitBackdropFilter: "blur(16px)",
                        boxShadow: isUrgent
                          ? "0 10px 26px -16px rgba(220,38,38,0.35), inset 0 1px 0 rgba(255,255,255,0.8)"
                          : "0 10px 26px -16px rgba(162,28,175,0.25), inset 0 1px 0 rgba(255,255,255,0.8)",
                      }}
                    >
                      <div className="px-[18px] pt-4 pb-3.5">
                        <div className="flex flex-wrap items-center gap-2 mb-2">
                          <span
                            className="inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-[11px] font-bold"
                            style={{ color: meta.text, background: meta.bg, border: `1px solid ${meta.border}` }}
                          >
                            <Icon size={12} />
                            {meta.label}
                          </span>
                          <span className="text-[11.5px] text-gray-500">{timeAgo(notice.createdAt)}</span>
                        </div>

                        <h3 className="text-[15.5px] font-semibold leading-snug mb-1.5" style={{ color: FUCHSIA_DARK }}>
                          {notice.title}
                        </h3>

                        {notice.description && (
                          <p className={`text-[13px] leading-relaxed text-gray-600 ${attachmentKind ? "mb-3" : "mb-0"}`}>
                            {notice.description}
                          </p>
                        )}
                      </div>

                      {/* Attachment — shown inline by default, not behind a link click */}
                      {attachmentKind === "image" && (
                        <button
                          className="np-attachment-wrap block w-full relative overflow-hidden cursor-zoom-in"
                          onClick={() => setLightbox({ url: notice.attachmentUrl, title: notice.title })}
                          style={{ border: "none", borderTop: "1px solid rgba(255,255,255,0.6)", background: "rgba(255,255,255,0.3)", padding: 0 }}
                        >
                          <img
                            src={notice.attachmentUrl}
                            alt={notice.title}
                            className="np-attachment-img block w-full mx-auto"
                            style={{ maxHeight: "420px", minHeight: "140px", objectFit: "contain" }}
                            loading="lazy"
                          />
                          <span
                            className="np-zoom-hint absolute top-2.5 right-2.5 inline-flex items-center gap-1.5 rounded-full px-2.5 py-1.5 text-[11px] font-semibold text-white transition-opacity"
                            style={{ background: "rgba(74,4,78,0.75)", opacity: 0, backdropFilter: "blur(6px)" }}
                          >
                            <ZoomIn size={12} /> View full size
                          </span>
                        </button>
                      )}

                      {attachmentKind === "pdf" && (
                        <a
                          href={notice.attachmentUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="np-glass-shine flex items-center gap-3 mx-[18px] mb-4 rounded-2xl px-3.5 py-3 no-underline"
                          style={{ border: "1px solid rgba(255,255,255,0.75)", background: "rgba(255,255,255,0.5)", backdropFilter: "blur(10px)" }}
                        >
                          <span className="flex items-center justify-center rounded-xl shrink-0" style={{ width: "38px", height: "38px", background: "#dc2626" }}>
                            <FileText size={18} color="#ffffff" />
                          </span>
                          <span className="flex-1 min-w-0">
                            <span className="block text-[13px] font-semibold truncate" style={{ color: FUCHSIA_DARK }}>
                              {attachmentFileName(notice.attachmentUrl)}
                            </span>
                            <span className="text-[11.5px]" style={{ color: FUCHSIA_MID }}>
                              PDF document · tap to open
                            </span>
                          </span>
                          <ExternalLink size={15} color={FUCHSIA} className="shrink-0" />
                        </a>
                      )}

                      {attachmentKind === "file" && (
                        <a
                          href={notice.attachmentUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex items-center gap-2.5 mx-[18px] mb-4 rounded-2xl px-3.5 py-2.5 no-underline text-[12.5px] font-semibold"
                          style={{ border: "1px solid rgba(255,255,255,0.75)", background: "rgba(255,255,255,0.5)", backdropFilter: "blur(10px)", color: FUCHSIA }}
                        >
                          <Paperclip size={14} />
                          {attachmentFileName(notice.attachmentUrl)}
                        </a>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}
      </div>

      {/* Lightbox — full-size image preview, aspect ratio always preserved */}
      {lightbox && (
        <div
          onClick={closeLightbox}
          className="fixed inset-0 z-50 flex items-center justify-center p-6"
          style={{ background: "rgba(20,4,22,0.85)", animation: "np-fade-in 0.2s ease both" }}
        >
          <button
            onClick={closeLightbox}
            aria-label="Close"
            className="absolute flex items-center justify-center rounded-full transition-transform hover:-translate-y-0.5"
            style={{
              top: "18px",
              right: "18px",
              width: "38px",
              height: "38px",
              background: "rgba(255,255,255,0.15)",
              border: "1px solid rgba(255,255,255,0.35)",
              backdropFilter: "blur(8px)",
              color: "#ffffff",
            }}
          >
            <X size={18} />
          </button>
          <img
            src={lightbox.url}
            alt={lightbox.title}
            onClick={(e) => e.stopPropagation()}
            className="max-w-full max-h-[88vh] w-auto h-auto object-contain rounded-2xl"
            style={{ boxShadow: "0 20px 60px rgba(0,0,0,0.5)", animation: "np-scale-in 0.2s ease both" }}
          />
        </div>
      )}
    </div>
  );
}