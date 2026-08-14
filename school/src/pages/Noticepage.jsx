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
const FUCHSIA_LIGHT = "#fdf4ff";
const FUCHSIA_BORDER = "#e879f9";
const AMBER = "#f59e0b";
const AMBER_DARK = "#b45309";

// Each notice category gets its own quiet badge color. "Urgent" is the one
// deliberate break from the brand palette — red is the one color that
// reads as "pay attention" without a caption.
const CATEGORY_META = {
  general: { label: "General", icon: Megaphone, text: FUCHSIA_DARK, bg: FUCHSIA_LIGHT, border: FUCHSIA_BORDER },
  exam: { label: "Exam", icon: ClipboardList, text: "#6d28d9", bg: "#f5f3ff", border: "#ddd6fe" },
  holiday: { label: "Holiday", icon: CalendarDays, text: AMBER_DARK, bg: "#fffbeb", border: "#fde68a" },
  event: { label: "Event", icon: PartyPopper, text: "#be185d", bg: "#fdf2f8", border: "#fbcfe8" },
  urgent: { label: "Urgent", icon: AlertTriangle, text: "#dc2626", bg: "#fef2f2", border: "#fecaca" },
  admission: { label: "Admission", icon: GraduationCap, text: "#0f766e", bg: "#f0fdfa", border: "#99f6e4" },
};

const FILTERS = [
  { key: "all", label: "All Notices" },
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
    <div style={{ background: "#ffffff", minHeight: "100vh" }}>
      <style>{`
        @keyframes np-fade-up {
          from { opacity: 0; transform: translateY(10px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        @keyframes np-fade-in {
          from { opacity: 0; }
          to   { opacity: 1; }
        }
        @keyframes np-scale-in {
          from { opacity: 0; transform: scale(0.96); }
          to   { opacity: 1; transform: scale(1); }
        }
        .np-item { animation: np-fade-up 0.4s ease both; }
        .np-filter-scroll::-webkit-scrollbar { display: none; }
        .np-filter-scroll { -ms-overflow-style: none; scrollbar-width: none; }
        .np-attachment-img { transition: transform 0.35s ease; }
        .np-attachment-wrap:hover .np-attachment-img { transform: scale(1.03); }
        .np-attachment-wrap:hover .np-zoom-hint { opacity: 1; }
        .np-pdf-card:hover { border-color: ${FUCHSIA_MID}; box-shadow: 0 4px 16px rgba(134,25,143,0.10); }
        .np-retry-btn:hover { filter: brightness(1.08); }
        @media (prefers-reduced-motion: reduce) {
          .np-item, .np-attachment-img { animation: none !important; transition: none !important; }
        }
      `}</style>

      {/* Hero */}
      <div
        style={{
          background: `linear-gradient(135deg, ${FUCHSIA_DARK} 0%, ${FUCHSIA_MID} 60%, ${FUCHSIA} 100%)`,
          padding: "56px 24px 40px",
        }}
      >
        <div style={{ maxWidth: "840px", margin: "0 auto", textAlign: "center" }}>
          <div
            style={{
              display: "inline-flex",
              alignItems: "center",
              justifyContent: "center",
              width: "56px",
              height: "56px",
              borderRadius: "16px",
              background: "rgba(255,255,255,0.12)",
              border: "1.5px solid rgba(255,255,255,0.3)",
              marginBottom: "18px",
            }}
          >
            <Megaphone size={26} color="#ffffff" />
          </div>
          <h1
            style={{
              fontFamily: "Georgia, serif",
              fontSize: "clamp(28px, 4vw, 40px)",
              color: "#ffffff",
              margin: "0 0 10px",
            }}
          >
            Notices &amp; Announcements
          </h1>
          <p
            style={{
              fontFamily: "sans-serif",
              fontSize: "14.5px",
              color: "rgba(255,255,255,0.8)",
              margin: 0,
              lineHeight: 1.6,
            }}
          >
            Everything you need to know from Bachpan &ndash; The Little Kingdom, in one place.
          </p>
        </div>
      </div>

      {/* Filters */}
      <div
        style={{
          position: "sticky",
          top: 0,
          zIndex: 10,
          background: "rgba(255,255,255,0.92)",
          backdropFilter: "blur(8px)",
          WebkitBackdropFilter: "blur(8px)",
          borderBottom: `1px solid ${FUCHSIA_BORDER}`,
          padding: "14px 16px",
        }}
      >
        <div
          className="np-filter-scroll"
          style={{
            maxWidth: "840px",
            margin: "0 auto",
            display: "flex",
            gap: "8px",
            overflowX: "auto",
            paddingBottom: "2px",
          }}
        >
          {FILTERS.map((f) => {
            const active = activeCategory === f.key;
            return (
              <button
                key={f.key}
                onClick={() => setActiveCategory(f.key)}
                style={{
                  flexShrink: 0,
                  fontFamily: "sans-serif",
                  fontSize: "12.5px",
                  fontWeight: 600,
                  padding: "8px 16px",
                  borderRadius: "999px",
                  cursor: "pointer",
                  whiteSpace: "nowrap",
                  transition: "all 0.15s ease",
                  border: active ? "1.5px solid transparent" : `1.5px solid ${FUCHSIA_BORDER}`,
                  background: active ? `linear-gradient(135deg, ${AMBER} 0%, ${AMBER_DARK} 100%)` : "#ffffff",
                  color: active ? "#ffffff" : FUCHSIA_DARK,
                }}
              >
                {f.label}
              </button>
            );
          })}
        </div>
      </div>

      {/* Timeline */}
      <div style={{ maxWidth: "840px", margin: "0 auto", padding: "36px 20px 80px" }}>
        {status === "loading" && (
          <div style={{ display: "flex", flexDirection: "column", gap: "18px" }}>
            {[0, 1, 2].map((i) => (
              <div key={i} style={{ display: "flex", gap: "16px" }}>
                <div
                  style={{
                    width: "56px",
                    height: "56px",
                    borderRadius: "12px",
                    background: FUCHSIA_LIGHT,
                    flexShrink: 0,
                    animation: "np-fade-in 1.2s ease-in-out infinite alternate",
                  }}
                />
                <div
                  style={{
                    flex: 1,
                    height: "96px",
                    borderRadius: "14px",
                    background: FUCHSIA_LIGHT,
                    animation: "np-fade-in 1.2s ease-in-out infinite alternate",
                  }}
                />
              </div>
            ))}
          </div>
        )}

        {status === "error" && (
          <div style={{ textAlign: "center", padding: "48px 16px" }}>
            <p style={{ fontFamily: "sans-serif", fontSize: "14px", color: "#dc2626", marginBottom: "16px" }}>
              {errorMsg}
            </p>
            <button
              className="np-retry-btn"
              onClick={() => setRetryToken((n) => n + 1)}
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: "6px",
                fontFamily: "sans-serif",
                fontSize: "13px",
                fontWeight: 600,
                color: "#ffffff",
                background: FUCHSIA,
                border: "none",
                borderRadius: "10px",
                padding: "9px 18px",
                cursor: "pointer",
              }}
            >
              <RefreshCw size={14} /> Try again
            </button>
          </div>
        )}

        {status === "success" && notices.length === 0 && (
          <div style={{ textAlign: "center", padding: "64px 16px" }}>
            <Inbox size={40} color={FUCHSIA_BORDER} style={{ marginBottom: "12px" }} />
            <p style={{ fontFamily: "sans-serif", fontSize: "14px", color: FUCHSIA, margin: 0 }}>
              No notices in this category yet.
            </p>
          </div>
        )}

        {status === "success" && notices.length > 0 && (
          <div style={{ position: "relative" }}>
            {/* connecting line */}
            <div
              aria-hidden="true"
              className="hidden sm:block"
              style={{
                position: "absolute",
                left: "27px",
                top: "8px",
                bottom: "8px",
                width: "2px",
                background: FUCHSIA_BORDER,
              }}
            />

            <div style={{ display: "flex", flexDirection: "column", gap: "20px" }}>
              {notices.map((notice, i) => {
                const meta = CATEGORY_META[notice.category] || CATEGORY_META.general;
                const Icon = meta.icon;
                const date = formatDateBadge(notice.createdAt);
                const isUrgent = notice.category === "urgent";
                const attachmentKind = getAttachmentKind(notice);

                return (
                  <div
                    key={notice._id}
                    className="np-item"
                    style={{
                      display: "flex",
                      gap: "16px",
                      animationDelay: `${Math.min(i, 6) * 0.05}s`,
                      position: "relative",
                    }}
                  >
                    {/* date badge */}
                    <div
                      className="hidden sm:flex"
                      style={{
                        flexShrink: 0,
                        flexDirection: "column",
                        alignItems: "center",
                        justifyContent: "center",
                        width: "56px",
                        height: "56px",
                        borderRadius: "12px",
                        background: FUCHSIA_DARK,
                        color: "#ffffff",
                        zIndex: 1,
                      }}
                    >
                      <span style={{ fontFamily: "sans-serif", fontSize: "17px", fontWeight: 700, lineHeight: 1 }}>
                        {date.day}
                      </span>
                      <span
                        style={{
                          fontFamily: "sans-serif",
                          fontSize: "9.5px",
                          textTransform: "uppercase",
                          letterSpacing: "0.05em",
                          opacity: 0.75,
                        }}
                      >
                        {date.month}
                      </span>
                    </div>

                    {/* card */}
                    <div
                      style={{
                        flex: 1,
                        minWidth: 0,
                        background: "#ffffff",
                        borderRadius: "16px",
                        border: `1px solid ${isUrgent ? "#fecaca" : "#f5d0fe"}`,
                        borderLeft: `4px solid ${meta.text}`,
                        boxShadow: isUrgent
                          ? "0 4px 20px rgba(220,38,38,0.12)"
                          : "0 2px 12px rgba(134,25,143,0.06)",
                        overflow: "hidden",
                      }}
                    >
                      <div style={{ padding: "16px 18px 14px" }}>
                        <div
                          style={{
                            display: "flex",
                            flexWrap: "wrap",
                            alignItems: "center",
                            gap: "8px",
                            marginBottom: "8px",
                          }}
                        >
                          <span
                            style={{
                              display: "inline-flex",
                              alignItems: "center",
                              gap: "5px",
                              fontFamily: "sans-serif",
                              fontSize: "11px",
                              fontWeight: 700,
                              padding: "3px 10px",
                              borderRadius: "999px",
                              color: meta.text,
                              background: meta.bg,
                              border: `1px solid ${meta.border}`,
                            }}
                          >
                            <Icon size={12} />
                            {meta.label}
                          </span>
                          <span style={{ fontFamily: "sans-serif", fontSize: "11.5px", color: "#9ca3af" }}>
                            {timeAgo(notice.createdAt)}
                          </span>
                        </div>

                        <h3
                          style={{
                            fontFamily: "sans-serif",
                            fontSize: "15.5px",
                            fontWeight: 700,
                            color: FUCHSIA_DARK,
                            margin: "0 0 6px",
                            lineHeight: 1.4,
                          }}
                        >
                          {notice.title}
                        </h3>

                        {notice.description && (
                          <p
                            style={{
                              fontFamily: "sans-serif",
                              fontSize: "13px",
                              color: "#52525b",
                              margin: attachmentKind ? "0 0 12px" : 0,
                              lineHeight: 1.6,
                            }}
                          >
                            {notice.description}
                          </p>
                        )}
                      </div>

                      {/* Attachment — shown inline by default, not behind a link click */}
                      {attachmentKind === "image" && (
                        <button
                          className="np-attachment-wrap"
                          onClick={() =>
                            setLightbox({ url: notice.attachmentUrl, title: notice.title })
                          }
                          style={{
                            display: "block",
                            width: "100%",
                            border: "none",
                            borderTop: "1px solid #f5d0fe",
                            background: "#fafafa",
                            padding: 0,
                            cursor: "zoom-in",
                            position: "relative",
                            overflow: "hidden",
                          }}
                        >
                          <img
                            src={notice.attachmentUrl}
                            alt={notice.title}
                            className="np-attachment-img"
                            style={{
                              display: "block",
                              width: "100%",
                              maxHeight: "420px",
                              minHeight: "140px",
                              objectFit: "contain",
                              margin: "0 auto",
                            }}
                            loading="lazy"
                          />
                          <span
                            className="np-zoom-hint"
                            style={{
                              position: "absolute",
                              top: "10px",
                              right: "10px",
                              display: "inline-flex",
                              alignItems: "center",
                              gap: "5px",
                              fontFamily: "sans-serif",
                              fontSize: "11px",
                              fontWeight: 600,
                              color: "#ffffff",
                              background: "rgba(74,4,78,0.75)",
                              borderRadius: "999px",
                              padding: "5px 10px",
                              opacity: 0,
                              transition: "opacity 0.2s ease",
                            }}
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
                          className="np-pdf-card"
                          style={{
                            display: "flex",
                            alignItems: "center",
                            gap: "12px",
                            margin: "0 18px 16px",
                            padding: "12px 14px",
                            borderRadius: "12px",
                            border: "1px solid #f5d0fe",
                            background: FUCHSIA_LIGHT,
                            textDecoration: "none",
                            transition: "border-color 0.15s ease, box-shadow 0.15s ease",
                          }}
                        >
                          <span
                            style={{
                              display: "flex",
                              alignItems: "center",
                              justifyContent: "center",
                              width: "38px",
                              height: "38px",
                              borderRadius: "10px",
                              background: "#dc2626",
                              flexShrink: 0,
                            }}
                          >
                            <FileText size={18} color="#ffffff" />
                          </span>
                          <span style={{ flex: 1, minWidth: 0 }}>
                            <span
                              style={{
                                display: "block",
                                fontFamily: "sans-serif",
                                fontSize: "13px",
                                fontWeight: 600,
                                color: FUCHSIA_DARK,
                                whiteSpace: "nowrap",
                                overflow: "hidden",
                                textOverflow: "ellipsis",
                              }}
                            >
                              {attachmentFileName(notice.attachmentUrl)}
                            </span>
                            <span style={{ fontFamily: "sans-serif", fontSize: "11.5px", color: "#a21caf" }}>
                              PDF document &middot; tap to open
                            </span>
                          </span>
                          <ExternalLink size={15} color={FUCHSIA} style={{ flexShrink: 0 }} />
                        </a>
                      )}

                      {attachmentKind === "file" && (
                        <a
                          href={notice.attachmentUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="np-pdf-card"
                          style={{
                            display: "flex",
                            alignItems: "center",
                            gap: "10px",
                            margin: "0 18px 16px",
                            padding: "10px 14px",
                            borderRadius: "12px",
                            border: "1px solid #f5d0fe",
                            background: FUCHSIA_LIGHT,
                            textDecoration: "none",
                            fontFamily: "sans-serif",
                            fontSize: "12.5px",
                            fontWeight: 600,
                            color: FUCHSIA,
                          }}
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
          style={{
            position: "fixed",
            inset: 0,
            zIndex: 50,
            background: "rgba(20,4,22,0.88)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            padding: "24px",
            animation: "np-fade-in 0.2s ease both",
          }}
        >
          <button
            onClick={closeLightbox}
            aria-label="Close"
            style={{
              position: "absolute",
              top: "18px",
              right: "18px",
              width: "38px",
              height: "38px",
              borderRadius: "999px",
              border: "none",
              background: "rgba(255,255,255,0.12)",
              color: "#ffffff",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              cursor: "pointer",
            }}
          >
            <X size={18} />
          </button>
          <img
            src={lightbox.url}
            alt={lightbox.title}
            onClick={(e) => e.stopPropagation()}
            style={{
              maxWidth: "100%",
              maxHeight: "88vh",
              width: "auto",
              height: "auto",
              objectFit: "contain",
              borderRadius: "12px",
              boxShadow: "0 20px 60px rgba(0,0,0,0.5)",
              animation: "np-scale-in 0.2s ease both",
            }}
          />
        </div>
      )}
    </div>
  );
}