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
const FUCHSIA_LIGHT = "#fdf4ff";
const FUCHSIA_BORDER = "#e879f9";
const AMBER = "#f59e0b";
const AMBER_DARK = "#b45309";

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
    <div style={{ background: "#ffffff", minHeight: "100vh" }}>
      <style>{`
        @keyframes gp-pop-in { from { opacity: 0; transform: scale(0.98); } to { opacity: 1; transform: scale(1); } }
        @keyframes gp-fade-in { from { opacity: 0; } to { opacity: 1; } }
        .gp-card { animation: gp-fade-in 0.35s ease both; }
        .gp-card img { transition: transform 0.35s ease; }
        .gp-card:hover img { transform: scale(1.06); }
        .gp-modal { animation: gp-fade-in 0.2s ease both; }
        .gp-modal-panel { animation: gp-pop-in 0.25s ease both; }
        @media (prefers-reduced-motion: reduce) {
          .gp-card, .gp-card img, .gp-modal, .gp-modal-panel { animation: none; transition: none; }
        }
      `}</style>

      {/* Hero */}
      <div
        style={{
          background: `linear-gradient(135deg, ${FUCHSIA_DARK} 0%, ${FUCHSIA_MID} 60%, ${FUCHSIA} 100%)`,
          padding: "56px 24px 40px",
        }}
      >
        <div style={{ maxWidth: "1100px", margin: "0 auto", textAlign: "center" }}>
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
            <Images size={26} color="#ffffff" />
          </div>
          <h1
            style={{
              fontFamily: "Georgia, serif",
              fontSize: "clamp(28px, 4vw, 40px)",
              color: "#ffffff",
              margin: "0 0 10px",
            }}
          >
            Photo Gallery
          </h1>
          <p style={{ fontFamily: "sans-serif", fontSize: "14.5px", color: "rgba(255,255,255,0.8)", margin: 0, lineHeight: 1.6 }}>
            Moments from classrooms, events and everyday little-kingdom life.
          </p>
        </div>
      </div>

      {/* Album grid */}
      <div style={{ maxWidth: "1100px", margin: "0 auto", padding: "40px 20px 80px" }}>
        {status === "loading" && (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3" style={{ gap: "20px" }}>
            {[0, 1, 2, 3, 4, 5].map((i) => (
              <div key={i} className="animate-pulse" style={{ borderRadius: "16px", overflow: "hidden" }}>
                <div style={{ aspectRatio: "4 / 3", background: FUCHSIA_LIGHT }} />
              </div>
            ))}
          </div>
        )}

        {status === "error" && (
          <div style={{ textAlign: "center", padding: "48px 16px" }}>
            <p style={{ fontFamily: "sans-serif", fontSize: "14px", color: "#dc2626", marginBottom: "16px" }}>{errorMsg}</p>
            <button
              onClick={() => window.location.reload()}
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

        {status === "success" && albums.length === 0 && (
          <div style={{ textAlign: "center", padding: "64px 16px" }}>
            <ImageOff size={40} color={FUCHSIA_BORDER} style={{ marginBottom: "12px" }} />
            <p style={{ fontFamily: "sans-serif", fontSize: "14px", color: FUCHSIA, margin: 0 }}>
              No albums have been published yet — check back soon.
            </p>
          </div>
        )}

        {status === "success" && albums.length > 0 && (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3" style={{ gap: "20px" }}>
            {albums.map((album, i) => (
              <button
                key={album._id}
                onClick={() => openAlbum(album._id)}
                className="gp-card"
                style={{
                  animationDelay: `${Math.min(i, 8) * 0.04}s`,
                  position: "relative",
                  textAlign: "left",
                  border: "none",
                  padding: 0,
                  borderRadius: "16px",
                  overflow: "hidden",
                  cursor: "pointer",
                  background: FUCHSIA_LIGHT,
                  boxShadow: "0 4px 20px rgba(134,25,143,0.1)",
                }}
              >
                <div style={{ aspectRatio: "4 / 3", overflow: "hidden", background: FUCHSIA_LIGHT }}>
                  {album.coverImageUrl ? (
                    <img
                      src={album.coverImageUrl}
                      alt={album.title}
                      style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }}
                    />
                  ) : (
                    <div style={{ width: "100%", height: "100%", display: "flex", alignItems: "center", justifyContent: "center" }}>
                      <Images size={32} color={FUCHSIA_BORDER} />
                    </div>
                  )}
                </div>
                <div
                  style={{
                    position: "absolute",
                    inset: 0,
                    background: "linear-gradient(to top, rgba(74,4,78,0.85) 0%, rgba(74,4,78,0.05) 55%, transparent 100%)",
                  }}
                />
                <div style={{ position: "absolute", left: 0, right: 0, bottom: 0, padding: "16px" }}>
                  <p style={{ fontFamily: "sans-serif", fontSize: "15px", fontWeight: 700, color: "#ffffff", margin: "0 0 4px", lineHeight: 1.3 }}>
                    {album.title}
                  </p>
                  {album.eventDate && (
                    <p style={{ display: "flex", alignItems: "center", gap: "5px", fontFamily: "sans-serif", fontSize: "11.5px", color: "rgba(255,255,255,0.8)", margin: 0 }}>
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
            background: "rgba(20,4,22,0.88)",
            display: "flex",
            flexDirection: "column",
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
              background: "#ffffff",
              borderRadius: "18px",
              overflow: "hidden",
              display: "flex",
              flexDirection: "column",
            }}
          >
            <div
              style={{
                display: "flex",
                alignItems: "flex-start",
                justifyContent: "space-between",
                gap: "12px",
                padding: "18px 20px",
                borderBottom: `1px solid ${FUCHSIA_BORDER}`,
                background: FUCHSIA_LIGHT,
              }}
            >
              <div>
                <h2 style={{ fontFamily: "sans-serif", fontSize: "16px", fontWeight: 700, color: FUCHSIA_DARK, margin: "0 0 4px" }}>
                  {albumDetail?.album?.title || "Loading album…"}
                </h2>
                {albumDetail?.album?.description && (
                  <p style={{ fontFamily: "sans-serif", fontSize: "12.5px", color: FUCHSIA, margin: 0, maxWidth: "560px" }}>
                    {albumDetail.album.description}
                  </p>
                )}
              </div>
              <button
                onClick={closeAlbum}
                aria-label="Close album"
                style={{
                  flexShrink: 0,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  width: "34px",
                  height: "34px",
                  borderRadius: "10px",
                  border: "none",
                  background: "#ffffff",
                  color: FUCHSIA_DARK,
                  cursor: "pointer",
                  boxShadow: "0 2px 8px rgba(134,25,143,0.15)",
                }}
              >
                <X size={18} />
              </button>
            </div>

            <div style={{ padding: "18px 20px", overflowY: "auto" }}>
              {albumStatus === "loading" && (
                <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4" style={{ gap: "10px" }}>
                  {[0, 1, 2, 3, 4, 5, 6, 7].map((i) => (
                    <div key={i} className="animate-pulse" style={{ aspectRatio: "1 / 1", borderRadius: "10px", background: FUCHSIA_LIGHT }} />
                  ))}
                </div>
              )}

              {albumStatus === "error" && (
                <p style={{ fontFamily: "sans-serif", fontSize: "13px", color: "#dc2626", textAlign: "center", padding: "24px 0" }}>
                  Couldn&rsquo;t load photos for this album.
                </p>
              )}

              {albumStatus === "success" && albumDetail?.photos?.length === 0 && (
                <p style={{ fontFamily: "sans-serif", fontSize: "13px", color: FUCHSIA, textAlign: "center", padding: "24px 0" }}>
                  No photos in this album yet.
                </p>
              )}

              {albumStatus === "success" && albumDetail?.photos?.length > 0 && (
                <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4" style={{ gap: "10px" }}>
                  {albumDetail.photos.map((photo, idx) => (
                    <button
                      key={photo._id}
                      onClick={() => setLightboxIndex(idx)}
                      style={{
                        border: "none",
                        padding: 0,
                        borderRadius: "10px",
                        overflow: "hidden",
                        cursor: "pointer",
                        aspectRatio: "1 / 1",
                        background: FUCHSIA_LIGHT,
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
            background: "rgba(10,2,12,0.95)",
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
            style={{
              position: "absolute",
              top: "18px",
              right: "18px",
              width: "40px",
              height: "40px",
              borderRadius: "50%",
              border: "1.5px solid rgba(255,255,255,0.3)",
              background: "rgba(255,255,255,0.1)",
              color: "#ffffff",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
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
            className="hidden sm:flex"
            style={{
              position: "absolute",
              left: "18px",
              width: "44px",
              height: "44px",
              borderRadius: "50%",
              border: "1.5px solid rgba(255,255,255,0.3)",
              background: "rgba(255,255,255,0.1)",
              color: "#ffffff",
              alignItems: "center",
              justifyContent: "center",
              cursor: "pointer",
            }}
          >
            <ChevronLeft size={22} />
          </button>

          <img
            src={albumDetail.photos[lightboxIndex].imageUrl}
            alt=""
            onClick={(e) => e.stopPropagation()}
            style={{ maxWidth: "90vw", maxHeight: "82vh", borderRadius: "10px", boxShadow: "0 12px 60px rgba(0,0,0,0.5)" }}
          />

          <button
            onClick={(e) => {
              e.stopPropagation();
              setLightboxIndex((i) => (i + 1) % albumDetail.photos.length);
            }}
            aria-label="Next photo"
            className="hidden sm:flex"
            style={{
              position: "absolute",
              right: "18px",
              width: "44px",
              height: "44px",
              borderRadius: "50%",
              border: "1.5px solid rgba(255,255,255,0.3)",
              background: "rgba(255,255,255,0.1)",
              color: "#ffffff",
              alignItems: "center",
              justifyContent: "center",
              cursor: "pointer",
            }}
          >
            <ChevronRight size={22} />
          </button>

          <div
            style={{
              position: "absolute",
              bottom: "18px",
              left: "50%",
              transform: "translateX(-50%)",
              fontFamily: "sans-serif",
              fontSize: "12px",
              fontWeight: 600,
              color: "rgba(255,255,255,0.75)",
              background: "rgba(255,255,255,0.1)",
              padding: "5px 12px",
              borderRadius: "999px",
            }}
          >
            {lightboxIndex + 1} / {albumDetail.photos.length}
          </div>
        </div>
      )}
    </div>
  );
}