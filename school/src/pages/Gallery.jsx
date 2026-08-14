import React, { useEffect, useState, useCallback } from "react";
import {
  Images,
  X,
  ChevronLeft,
  ChevronRight,
  CalendarDays,
  ImageOff,
  RefreshCw,
} from "lucide-react";

const API_BASE = import.meta.env?.VITE_API_URL || "";

const FUCHSIA = "#86198f";
const FUCHSIA_DARK = "#4a044e";
const FUCHSIA_MID = "#a21caf";
const AMBER = "#f59e0b";

function formatDate(dateStr) {
  if (!dateStr) return null;
  return new Date(dateStr).toLocaleDateString(undefined, {
    day: "numeric",
    month: "short",
    year: "numeric",
  });
}

export default function GalleryPage() {
  const [albums, setAlbums] = useState([]);
  const [status, setStatus] = useState("loading"); // loading | success | error
  const [errorMsg, setErrorMsg] = useState("");

  const [openAlbumId, setOpenAlbumId] = useState(null);
  const [albumDetail, setAlbumDetail] = useState(null); // { album, photos }
  const [albumStatus, setAlbumStatus] = useState("idle");
  const [lightboxIndex, setLightboxIndex] = useState(null); // index into photos, or null

  useEffect(() => {
    const controller = new AbortController();
    (async () => {
      setStatus("loading");
      try {
        const res = await fetch(`${API_BASE}/api/gallery/albums`, { signal: controller.signal });
        const json = await res.json();
        if (!res.ok) throw new Error(json?.message || "Couldn't load the gallery");
        setAlbums(Array.isArray(json?.data) ? json.data : []);
        setStatus("success");
      } catch (err) {
        if (err.name !== "AbortError") {
          setErrorMsg(err.message || "Something went wrong");
          setStatus("error");
        }
      }
    })();
    return () => controller.abort();
  }, []);

  const openAlbum = useCallback(async (id) => {
    setOpenAlbumId(id);
    setAlbumStatus("loading");
    setAlbumDetail(null);
    try {
      const res = await fetch(`${API_BASE}/api/gallery/albums/${id}`);
      const json = await res.json();
      if (!res.ok) throw new Error(json?.message || "Couldn't load this album");
      setAlbumDetail(json.data);
      setAlbumStatus("success");
    } catch (err) {
      setAlbumStatus("error");
    }
  }, []);

  const closeAlbum = useCallback(() => {
    setOpenAlbumId(null);
    setAlbumDetail(null);
    setLightboxIndex(null);
  }, []);

  // Lock body scroll while any overlay is open.
  useEffect(() => {
    document.body.style.overflow = openAlbumId ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [openAlbumId]);

  // Keyboard navigation for the lightbox / album modal.
  useEffect(() => {
    const onKeyDown = (e) => {
      if (lightboxIndex !== null && albumDetail?.photos?.length) {
        if (e.key === "Escape") setLightboxIndex(null);
        if (e.key === "ArrowRight") setLightboxIndex((i) => (i + 1) % albumDetail.photos.length);
        if (e.key === "ArrowLeft") setLightboxIndex((i) => (i - 1 + albumDetail.photos.length) % albumDetail.photos.length);
      } else if (openAlbumId && e.key === "Escape") {
        closeAlbum();
      }
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [lightboxIndex, albumDetail, openAlbumId, closeAlbum]);

  return (
    <div className="relative min-h-screen overflow-hidden bg-gradient-to-br from-fuchsia-50 via-white to-amber-50">
      {/* Drifting gradient blobs */}
      <div
        className="pointer-events-none fixed -top-40 -left-32 w-[28rem] h-[28rem] rounded-full blur-3xl opacity-30 motion-safe:animate-[gp-blob1_16s_ease-in-out_infinite]"
        style={{ background: `radial-gradient(circle, ${FUCHSIA_MID}, transparent 70%)` }}
      />
      <div
        className="pointer-events-none fixed -bottom-48 -right-24 w-[32rem] h-[32rem] rounded-full blur-3xl opacity-30 motion-safe:animate-[gp-blob2_18s_ease-in-out_infinite]"
        style={{ background: `radial-gradient(circle, ${AMBER}, transparent 70%)` }}
      />
      <div
        className="pointer-events-none fixed top-1/2 left-1/2 w-72 h-72 rounded-full blur-3xl opacity-20 motion-safe:animate-[gp-blob3_14s_ease-in-out_infinite]"
        style={{ background: `radial-gradient(circle, ${FUCHSIA}, transparent 70%)` }}
      />

      <style>{`
        @keyframes gp-blob1 { 0%,100% { transform: translate(0,0) scale(1); } 50% { transform: translate(40px,30px) scale(1.08); } }
        @keyframes gp-blob2 { 0%,100% { transform: translate(0,0) scale(1); } 50% { transform: translate(-30px,-40px) scale(1.1); } }
        @keyframes gp-blob3 { 0%,100% { transform: translate(0,0) scale(1); } 50% { transform: translate(-25px,25px) scale(0.95); } }
        @keyframes gp-pop-in { from { opacity: 0; transform: scale(0.98); } to { opacity: 1; transform: scale(1); } }
        @keyframes gp-fade-in { from { opacity: 0; } to { opacity: 1; } }
        @keyframes gp-fade-up { from { opacity: 0; transform: translateY(16px); } to { opacity: 1; transform: translateY(0); } }
        .gp-card { animation: gp-fade-up 0.5s ease both; position: relative; overflow: hidden; isolation: isolate; }
        .gp-card img { transition: transform 0.35s ease; }
        .gp-card:hover img { transform: scale(1.06); }
        .gp-card::after {
          content: "";
          position: absolute; top: 0; left: -60%; width: 40%; height: 100%;
          background: linear-gradient(115deg, transparent, rgba(255,255,255,0.55), transparent);
          transform: skewX(-18deg);
          transition: left 0.75s ease;
          z-index: 2;
        }
        .gp-card:hover::after { left: 130%; }
        .gp-modal { animation: gp-fade-in 0.2s ease both; }
        .gp-modal-panel { animation: gp-pop-in 0.25s ease both; }
        .gp-eyebrow { animation: gp-fade-up 0.5s ease both; }
        @media (prefers-reduced-motion: reduce) {
          .gp-card, .gp-card img, .gp-card::after, .gp-modal, .gp-modal-panel, .gp-eyebrow,
          [class*="motion-safe:animate-"] { animation: none !important; transition: none !important; }
        }
      `}</style>

      {/* Hero */}
      <div className="relative px-4 sm:px-6 pt-14 pb-10 sm:pt-16 sm:pb-14">
        <div className="max-w-3xl mx-auto text-center">
          <div className="gp-eyebrow flex justify-center mb-5">
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
              Photo gallery
            </span>
          </div>

          <div
            className="gp-eyebrow mx-auto mb-5 flex h-14 w-14 items-center justify-center rounded-2xl"
            style={{
              animationDelay: "0.05s",
              background: `linear-gradient(150deg, ${FUCHSIA_MID}33, ${AMBER}24)`,
              border: "1px solid rgba(255,255,255,0.75)",
              backdropFilter: "blur(10px)",
              boxShadow: "inset 0 1px 0 rgba(255,255,255,0.7), 0 6px 14px -8px rgba(162,28,175,0.35)",
            }}
          >
            <Images size={26} color={FUCHSIA_DARK} />
          </div>

          <h1
            className="gp-eyebrow text-3xl sm:text-4xl font-semibold text-gray-900 mb-3"
            style={{ animationDelay: "0.1s", fontFamily: "Fredoka, sans-serif" }}
          >
            Moments worth keeping
          </h1>
          <p className="gp-eyebrow text-sm sm:text-base text-gray-600" style={{ animationDelay: "0.15s" }}>
            Photos from classrooms, events and everyday little-kingdom life.
          </p>
        </div>
      </div>

      {/* Album grid */}
      <div className="relative max-w-5xl mx-auto px-4 sm:px-6 pb-20">
        {status === "loading" && (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {[0, 1, 2, 3, 4, 5].map((i) => (
              <div
                key={i}
                className="animate-pulse rounded-3xl overflow-hidden"
                style={{
                  background: "rgba(255,255,255,0.45)",
                  border: "1px solid rgba(255,255,255,0.7)",
                  backdropFilter: "blur(10px)",
                }}
              >
                <div style={{ aspectRatio: "4 / 3" }} />
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
              onClick={() => window.location.reload()}
              className="inline-flex items-center gap-1.5 rounded-xl px-4 py-2.5 text-sm font-semibold text-white transition-all hover:-translate-y-0.5"
              style={{
                background: `linear-gradient(135deg, ${FUCHSIA_MID}, ${FUCHSIA})`,
                boxShadow: "0 10px 22px -10px rgba(162,28,175,0.55)",
              }}
            >
              <RefreshCw size={14} /> Try again
            </button>
          </div>
        )}

        {status === "success" && albums.length === 0 && (
          <div
            className="text-center py-16 px-4 rounded-3xl mx-auto max-w-md"
            style={{
              background: "rgba(255,255,255,0.5)",
              border: "1px solid rgba(255,255,255,0.75)",
              backdropFilter: "blur(14px)",
            }}
          >
            <ImageOff size={36} className="mx-auto mb-3" color={FUCHSIA_MID} />
            <p className="text-sm text-fuchsia-800">No albums have been published yet — check back soon.</p>
          </div>
        )}

        {status === "success" && albums.length > 0 && (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {albums.map((album, i) => (
              <button
                key={album._id}
                onClick={() => openAlbum(album._id)}
                className="gp-card text-left rounded-3xl"
                style={{
                  animationDelay: `${Math.min(i, 8) * 0.06}s`,
                  padding: 0,
                  border: "1px solid rgba(255,255,255,0.75)",
                  background: "rgba(255,255,255,0.5)",
                  backdropFilter: "blur(14px)",
                  boxShadow: "0 10px 26px -16px rgba(162,28,175,0.3), inset 0 1px 0 rgba(255,255,255,0.8)",
                  cursor: "pointer",
                }}
              >
                <div style={{ aspectRatio: "4 / 3", overflow: "hidden", background: "rgba(255,255,255,0.4)" }}>
                  {album.coverImageUrl ? (
                    <img
                      src={album.coverImageUrl}
                      alt={album.title}
                      style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }}
                    />
                  ) : (
                    <div style={{ width: "100%", height: "100%", display: "flex", alignItems: "center", justifyContent: "center" }}>
                      <Images size={32} color={FUCHSIA_MID} />
                    </div>
                  )}
                </div>
                <div
                  style={{
                    position: "absolute",
                    inset: 0,
                    background: "linear-gradient(to top, rgba(74,4,78,0.82) 0%, rgba(74,4,78,0.05) 55%, transparent 100%)",
                  }}
                />
                <div style={{ position: "absolute", left: 0, right: 0, bottom: 0, padding: "16px" }}>
                  <p className="text-white font-semibold text-[15px] mb-1 leading-snug">{album.title}</p>
                  {album.eventDate && (
                    <p className="flex items-center gap-1.5 text-[11.5px]" style={{ color: "rgba(255,255,255,0.85)" }}>
                      <CalendarDays size={12} />
                      {formatDate(album.eventDate)}
                    </p>
                  )}
                </div>
              </button>
            ))}
          </div>
        )}
      </div>

      {/* Album modal */}
      {openAlbumId && (
        <div
          className="gp-modal"
          style={{
            position: "fixed",
            inset: 0,
            zIndex: 100,
            background: "rgba(20,4,22,0.6)",
            backdropFilter: "blur(4px)",
            display: "flex",
            flexDirection: "column",
            padding: "16px",
          }}
          onClick={closeAlbum}
        >
          <div
            className="gp-modal-panel"
            onClick={(e) => e.stopPropagation()}
            style={{
              margin: "auto",
              width: "min(1000px, 94vw)",
              maxHeight: "88vh",
              borderRadius: "24px",
              overflow: "hidden",
              display: "flex",
              flexDirection: "column",
              background: "rgba(255,255,255,0.7)",
              border: "1px solid rgba(255,255,255,0.8)",
              backdropFilter: "blur(20px)",
              WebkitBackdropFilter: "blur(20px)",
              boxShadow: "0 20px 50px -20px rgba(74,4,78,0.4)",
            }}
          >
            <div
              className="flex items-start justify-between gap-3 px-5 py-4"
              style={{ borderBottom: "1px solid rgba(255,255,255,0.6)", background: "rgba(255,255,255,0.35)" }}
            >
              <div>
                <h2 className="text-base font-semibold text-fuchsia-950 mb-1">
                  {albumDetail?.album?.title || "Loading album…"}
                </h2>
                {albumDetail?.album?.description && (
                  <p className="text-[12.5px] text-fuchsia-800 max-w-[560px]">{albumDetail.album.description}</p>
                )}
              </div>
              <button
                onClick={closeAlbum}
                aria-label="Close album"
                className="shrink-0 flex items-center justify-center rounded-xl transition-transform hover:-translate-y-0.5"
                style={{
                  width: "34px",
                  height: "34px",
                  background: "rgba(255,255,255,0.7)",
                  border: "1px solid rgba(255,255,255,0.85)",
                  color: FUCHSIA_DARK,
                  boxShadow: "0 2px 8px rgba(134,25,143,0.15)",
                }}
              >
                <X size={18} />
              </button>
            </div>

            <div className="px-5 py-4" style={{ overflowY: "auto" }}>
              {albumStatus === "loading" && (
                <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-2.5">
                  {[0, 1, 2, 3, 4, 5, 6, 7].map((i) => (
                    <div
                      key={i}
                      className="animate-pulse rounded-xl"
                      style={{ aspectRatio: "1 / 1", background: "rgba(255,255,255,0.5)" }}
                    />
                  ))}
                </div>
              )}

              {albumStatus === "error" && (
                <p className="text-[13px] text-red-600 text-center py-6">Couldn&rsquo;t load photos for this album.</p>
              )}

              {albumStatus === "success" && albumDetail?.photos?.length === 0 && (
                <p className="text-[13px] text-fuchsia-800 text-center py-6">No photos in this album yet.</p>
              )}

              {albumStatus === "success" && albumDetail?.photos?.length > 0 && (
                <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-2.5">
                  {albumDetail.photos.map((photo, idx) => (
                    <button
                      key={photo._id}
                      onClick={() => setLightboxIndex(idx)}
                      className="rounded-xl overflow-hidden"
                      style={{
                        border: "1px solid rgba(255,255,255,0.7)",
                        padding: 0,
                        cursor: "pointer",
                        aspectRatio: "1 / 1",
                        background: "rgba(255,255,255,0.4)",
                      }}
                    >
                      <img
                        src={photo.imageUrl}
                        alt=""
                        style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }}
                      />
                    </button>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      )}

      {/* Fullscreen lightbox */}
      {lightboxIndex !== null && albumDetail?.photos?.length > 0 && (
        <div
          className="gp-modal"
          style={{
            position: "fixed",
            inset: 0,
            zIndex: 200,
            background: "rgba(10,2,12,0.92)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
          onClick={() => setLightboxIndex(null)}
        >
          <button
            onClick={(e) => {
              e.stopPropagation();
              setLightboxIndex(null);
            }}
            aria-label="Close photo"
            className="flex items-center justify-center rounded-full transition-transform hover:-translate-y-0.5"
            style={{
              position: "absolute",
              top: "18px",
              right: "18px",
              width: "40px",
              height: "40px",
              background: "rgba(255,255,255,0.15)",
              border: "1px solid rgba(255,255,255,0.35)",
              backdropFilter: "blur(8px)",
              color: "#ffffff",
              cursor: "pointer",
            }}
          >
            <X size={20} />
          </button>

          <button
            onClick={(e) => {
              e.stopPropagation();
              setLightboxIndex((i) => (i - 1 + albumDetail.photos.length) % albumDetail.photos.length);
            }}
            aria-label="Previous photo"
            className="hidden sm:flex items-center justify-center rounded-full transition-transform hover:-translate-y-0.5"
            style={{
              position: "absolute",
              left: "18px",
              width: "44px",
              height: "44px",
              background: "rgba(255,255,255,0.15)",
              border: "1px solid rgba(255,255,255,0.35)",
              backdropFilter: "blur(8px)",
              color: "#ffffff",
              cursor: "pointer",
            }}
          >
            <ChevronLeft size={22} />
          </button>

          <img
            src={albumDetail.photos[lightboxIndex].imageUrl}
            alt=""
            onClick={(e) => e.stopPropagation()}
            style={{ maxWidth: "90vw", maxHeight: "82vh", borderRadius: "14px", boxShadow: "0 12px 60px rgba(0,0,0,0.5)" }}
          />

          <button
            onClick={(e) => {
              e.stopPropagation();
              setLightboxIndex((i) => (i + 1) % albumDetail.photos.length);
            }}
            aria-label="Next photo"
            className="hidden sm:flex items-center justify-center rounded-full transition-transform hover:-translate-y-0.5"
            style={{
              position: "absolute",
              right: "18px",
              width: "44px",
              height: "44px",
              background: "rgba(255,255,255,0.15)",
              border: "1px solid rgba(255,255,255,0.35)",
              backdropFilter: "blur(8px)",
              color: "#ffffff",
              cursor: "pointer",
            }}
          >
            <ChevronRight size={22} />
          </button>

          <div
            className="text-xs font-semibold"
            style={{
              position: "absolute",
              bottom: "18px",
              left: "50%",
              transform: "translateX(-50%)",
              color: "rgba(255,255,255,0.85)",
              background: "rgba(255,255,255,0.15)",
              backdropFilter: "blur(8px)",
              padding: "6px 14px",
              borderRadius: "999px",
              border: "1px solid rgba(255,255,255,0.25)",
            }}
          >
            {lightboxIndex + 1} / {albumDetail.photos.length}
          </div>
        </div>
      )}
    </div>
  );
}