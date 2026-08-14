import { useEffect, useRef, useState, useCallback } from "react";
import API from "../../api/axios";
import {
  Plus,
  X,
  Trash2,
  ArrowLeft,
  Calendar,
  Images,
  ImagePlus,
  ImageOff,
  UploadCloud,
  AlertCircle,
  AlertTriangle,
  Loader2,
  ZoomIn,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";

// ─── Shared body-scroll lock ──────────────────────────────────────────────
// Ref-counted so multiple overlays can stack safely (e.g. a lightbox that
// opens a confirm dialog) without one closing early and un-locking the page
// while another overlay is still open. Also compensates for the scrollbar
// width so the page doesn't visibly shift/jump when the lock engages.
let lockCount = 0;
let previousBodyOverflow = "";
let previousBodyPaddingRight = "";

function useLockBodyScroll(active) {
  useEffect(() => {
    if (!active) return;

    if (lockCount === 0) {
      const scrollbarWidth = window.innerWidth - document.documentElement.clientWidth;
      previousBodyOverflow = document.body.style.overflow;
      previousBodyPaddingRight = document.body.style.paddingRight;
      document.body.style.overflow = "hidden";
      if (scrollbarWidth > 0) {
        document.body.style.paddingRight = `${scrollbarWidth}px`;
      }
    }
    lockCount++;

    return () => {
      lockCount--;
      if (lockCount === 0) {
        document.body.style.overflow = previousBodyOverflow;
        document.body.style.paddingRight = previousBodyPaddingRight;
      }
    };
    // Intentionally only depends on `active` — this must NOT re-run when
    // unrelated state (submitting, busy, photos.length, etc.) changes,
    // or the lock flickers off/on and causes a visible scroll/layout jump.
  }, [active]);
}

export default function AlbumsPanel() {
  const [albums, setAlbums] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const [selectedAlbum, setSelectedAlbum] = useState(null); // { album, photos }
  const [selectedLoading, setSelectedLoading] = useState(false);

  const [showCreate, setShowCreate] = useState(false);
  const [confirmTarget, setConfirmTarget] = useState(null); // { type: "album" | "photo", id, label }
  const [deleting, setDeleting] = useState(false);

  const fetchAlbums = async () => {
    setLoading(true);
    setError("");
    try {
      const res = await API.get("/api/gallery/albums");
      setAlbums(res.data.data);
    } catch (err) {
      setError("Could not load albums.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAlbums();
  }, []);

  const openAlbum = async (id) => {
    setSelectedLoading(true);
    try {
      const res = await API.get(`/api/gallery/albums/${id}`);
      setSelectedAlbum(res.data.data); // { album, photos }
    } catch (err) {
      setError("Could not load album.");
    } finally {
      setSelectedLoading(false);
    }
  };

  const handleDeleteAlbum = async (id) => {
    setDeleting(true);
    try {
      await API.delete(`/api/gallery/albums/${id}`);
      setAlbums((prev) => prev.filter((a) => a._id !== id));
      if (selectedAlbum?.album?._id === id) setSelectedAlbum(null);
      setConfirmTarget(null);
    } catch (err) {
      setError("Could not delete album.");
    } finally {
      setDeleting(false);
    }
  };

  const handleDeletePhoto = async (photoId) => {
    setDeleting(true);
    try {
      await API.delete(`/api/gallery/photos/${photoId}`);
      setSelectedAlbum((prev) =>
        prev ? { ...prev, photos: prev.photos.filter((p) => p._id !== photoId) } : prev
      );
      setConfirmTarget(null);
    } catch (err) {
      setError("Could not delete photo.");
    } finally {
      setDeleting(false);
    }
  };

  const handleConfirmDelete = () => {
    if (!confirmTarget) return;
    if (confirmTarget.type === "album") handleDeleteAlbum(confirmTarget.id);
    else handleDeletePhoto(confirmTarget.id);
  };

  return (
    <div>
      {error && (
        <div className="mb-5 flex items-start gap-3 rounded-xl border border-red-200 bg-red-50 px-4 py-3">
          <AlertCircle size={18} className="mt-0.5 shrink-0 text-red-500" />
          <p className="flex-1 text-sm text-red-700">{error}</p>
          <button
            onClick={() => setError("")}
            aria-label="Dismiss"
            className="shrink-0 rounded-md p-1 text-red-400 transition-colors hover:bg-red-100 hover:text-red-600"
          >
            <X size={14} />
          </button>
        </div>
      )}

      {selectedAlbum ? (
        <AlbumDetail
          albumData={selectedAlbum}
          loading={selectedLoading}
          onBack={() => setSelectedAlbum(null)}
          onPhotosAdded={(newPhotos) =>
            setSelectedAlbum((prev) =>
              prev ? { ...prev, photos: [...newPhotos, ...prev.photos] } : prev
            )
          }
          onRequestDeletePhoto={(id, label) => setConfirmTarget({ type: "photo", id, label })}
          onError={setError}
        />
      ) : (
        <>
          <div className="mb-6 flex items-center justify-between gap-4">
            <div>
              <h2 className="text-lg font-semibold text-gray-900">Photo Albums</h2>
              <p className="mt-0.5 text-sm text-gray-500">
                {loading ? "Loading…" : `${albums.length} album${albums.length === 1 ? "" : "s"}`}
              </p>
            </div>
            <button
              onClick={() => setShowCreate(true)}
              className="inline-flex items-center gap-1.5 rounded-lg bg-fuchsia-800 px-4 py-2.5 text-sm font-medium text-white shadow-sm transition-colors hover:bg-fuchsia-900 focus:outline-none focus:ring-2 focus:ring-fuchsia-400 focus:ring-offset-2"
            >
              <Plus size={16} />
              New Album
            </button>
          </div>

          {loading ? (
            <AlbumGridSkeleton />
          ) : albums.length === 0 ? (
            <EmptyState
              icon={Images}
              title="No albums yet"
              subtitle="Create your first album to start organizing photos."
              actionLabel="New Album"
              actionIcon={Plus}
              onAction={() => setShowCreate(true)}
            />
          ) : (
            <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
              {albums.map((album) => (
                <AlbumCard
                  key={album._id}
                  album={album}
                  onOpen={() => openAlbum(album._id)}
                  onRequestDelete={() =>
                    setConfirmTarget({
                      type: "album",
                      id: album._id,
                      label: `"${album.title}" and all its photos`,
                    })
                  }
                />
              ))}
            </div>
          )}
        </>
      )}

      {showCreate && (
        <CreateAlbumModal
          onClose={() => setShowCreate(false)}
          onCreated={(album) => {
            setAlbums((prev) => [album, ...prev]);
            setShowCreate(false);
          }}
          onError={setError}
        />
      )}

      {confirmTarget && (
        <ConfirmDialog
          message={`Delete ${confirmTarget.label}? This can't be undone.`}
          busy={deleting}
          onCancel={() => setConfirmTarget(null)}
          onConfirm={handleConfirmDelete}
        />
      )}
    </div>
  );
}

// ─── Album card ─────────────────────────────────────────────────────────

function AlbumCard({ album, onOpen, onRequestDelete }) {
  return (
    <div className="group relative overflow-hidden rounded-2xl bg-white ring-1 ring-gray-200 transition-all hover:shadow-lg hover:ring-fuchsia-200">
      <button onClick={onOpen} className="block w-full text-left">
        <div className="relative aspect-[4/3] overflow-hidden bg-gray-100">
          {album.coverImageUrl ? (
            <img
              src={album.coverImageUrl}
              alt={album.title}
              className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
            />
          ) : (
            <div className="flex h-full w-full items-center justify-center bg-gradient-to-br from-fuchsia-50 to-gray-100">
              <Images size={28} className="text-fuchsia-200" />
            </div>
          )}
          <div className="pointer-events-none absolute inset-x-0 bottom-0 h-16 bg-gradient-to-t from-black/55 to-transparent" />
        </div>
        <div className="p-3">
          <p className="truncate text-sm font-semibold text-gray-900">{album.title}</p>
          {album.eventDate && (
            <p className="mt-0.5 flex items-center gap-1 text-xs text-gray-500">
              <Calendar size={12} />
              {new Date(album.eventDate).toLocaleDateString(undefined, {
                day: "numeric",
                month: "short",
                year: "numeric",
              })}
            </p>
          )}
        </div>
      </button>

      <button
        onClick={(e) => {
          e.stopPropagation();
          onRequestDelete();
        }}
        aria-label="Delete album"
        className="absolute right-2.5 top-2.5 flex h-8 w-8 items-center justify-center rounded-full bg-white/90 text-red-600 opacity-0 shadow-sm backdrop-blur transition-all hover:bg-white group-hover:opacity-100 focus:opacity-100"
      >
        <Trash2 size={15} />
      </button>
    </div>
  );
}

function AlbumGridSkeleton() {
  return (
    <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
      {Array.from({ length: 8 }).map((_, i) => (
        <div key={i} className="animate-pulse overflow-hidden rounded-2xl bg-white ring-1 ring-gray-200">
          <div className="aspect-[4/3] bg-gray-100" />
          <div className="space-y-2 p-3">
            <div className="h-3.5 w-2/3 rounded bg-gray-100" />
            <div className="h-3 w-1/3 rounded bg-gray-100" />
          </div>
        </div>
      ))}
    </div>
  );
}

// ─── Shared empty state ─────────────────────────────────────────────────

function EmptyState({ icon: Icon, title, subtitle, actionLabel, actionIcon: ActionIcon, onAction }) {
  return (
    <div className="flex flex-col items-center justify-center rounded-2xl border-2 border-dashed border-gray-200 px-6 py-16 text-center">
      <div className="mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-fuchsia-50">
        <Icon size={26} className="text-fuchsia-400" />
      </div>
      <p className="text-sm font-medium text-gray-900">{title}</p>
      <p className="mt-1 max-w-xs text-sm text-gray-500">{subtitle}</p>
      {onAction && (
        <button
          onClick={onAction}
          className="mt-5 inline-flex items-center gap-1.5 rounded-lg bg-fuchsia-800 px-4 py-2.5 text-sm font-medium text-white transition-colors hover:bg-fuchsia-900"
        >
          <ActionIcon size={16} />
          {actionLabel}
        </button>
      )}
    </div>
  );
}

// ─── Create album modal ─────────────────────────────────────────────────

function CreateAlbumModal({ onClose, onCreated, onError }) {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [eventDate, setEventDate] = useState("");
  const [coverFile, setCoverFile] = useState(null);
  const [coverPreview, setCoverPreview] = useState(null);
  const [dragActive, setDragActive] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [localError, setLocalError] = useState("");
  const fileInputRef = useRef(null);

  // Lock the background scroll for as long as this modal is mounted —
  // NOT tied to `submitting`, so clicking "Create" can't flicker the lock.
  useLockBodyScroll(true);

  useEffect(() => {
    return () => {
      if (coverPreview) URL.revokeObjectURL(coverPreview);
    };
  }, [coverPreview]);

  // Escape closes the modal. Kept as its own effect (separate from the
  // scroll lock above) so re-running it when `submitting` changes never
  // touches document.body — that's what was causing the scroll jump.
  useEffect(() => {
    const onKeyDown = (e) => {
      if (e.key === "Escape" && !submitting) onClose();
    };
    document.addEventListener("keydown", onKeyDown);
    return () => document.removeEventListener("keydown", onKeyDown);
  }, [onClose, submitting]);

  const handleFile = (file) => {
    if (!file || !file.type.startsWith("image/")) return;
    setCoverFile(file);
    setCoverPreview((prev) => {
      if (prev) URL.revokeObjectURL(prev);
      return URL.createObjectURL(file);
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!title.trim()) {
      setLocalError("Album title is required.");
      return;
    }
    setLocalError("");

    const formData = new FormData();
    formData.append("title", title.trim());
    formData.append("description", description);
    if (eventDate) formData.append("eventDate", eventDate);
    if (coverFile) formData.append("coverImage", coverFile);

    setSubmitting(true);
    onError("");
    try {
      const res = await API.post("/api/gallery/albums", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      onCreated(res.data.data);
    } catch (err) {
      onError("Could not create album.");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div
      className="fixed inset-0 z-[100] flex items-center justify-center overscroll-contain bg-black/40 p-4 backdrop-blur-sm"
      onClick={() => !submitting && onClose()}
      role="dialog"
      aria-modal="true"
      aria-labelledby="create-album-title"
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className="flex max-h-[90vh] w-full max-w-md flex-col overflow-hidden rounded-2xl bg-white shadow-2xl"
      >
        <div className="flex shrink-0 items-center justify-between border-b border-gray-100 p-6 pb-5">
          <h3 id="create-album-title" className="text-base font-semibold text-gray-900">
            New Album
          </h3>
          <button
            onClick={onClose}
            disabled={submitting}
            aria-label="Close"
            className="rounded-md p-1.5 text-gray-400 transition-colors hover:bg-gray-100 hover:text-gray-600 disabled:opacity-50"
          >
            <X size={18} />
          </button>
        </div>

        <form
          onSubmit={handleSubmit}
          className="min-h-0 flex-1 overflow-y-auto overscroll-contain p-6"
        >
          <div className="space-y-4">
            {/* Cover image — drag & drop or click to browse */}
            <div
              onDragOver={(e) => {
                e.preventDefault();
                setDragActive(true);
              }}
              onDragLeave={() => setDragActive(false)}
              onDrop={(e) => {
                e.preventDefault();
                setDragActive(false);
                handleFile(e.dataTransfer.files?.[0]);
              }}
              onClick={() => !submitting && fileInputRef.current?.click()}
              className={`relative flex h-32 cursor-pointer flex-col items-center justify-center overflow-hidden rounded-xl border-2 border-dashed transition-colors ${
                dragActive
                  ? "border-fuchsia-400 bg-fuchsia-50"
                  : "border-gray-200 hover:border-fuchsia-300 hover:bg-gray-50"
              }`}
            >
              {coverPreview ? (
                <>
                  <img src={coverPreview} alt="" className="h-full w-full object-cover" />
                  <button
                    type="button"
                    onClick={(e) => {
                      e.stopPropagation();
                      if (coverPreview) URL.revokeObjectURL(coverPreview);
                      setCoverFile(null);
                      setCoverPreview(null);
                    }}
                    aria-label="Remove cover image"
                    className="absolute right-2 top-2 flex h-7 w-7 items-center justify-center rounded-full bg-white/90 text-gray-600 shadow hover:bg-white"
                  >
                    <X size={13} />
                  </button>
                </>
              ) : (
                <>
                  <UploadCloud size={22} className="mb-1.5 text-gray-400" />
                  <p className="px-4 text-center text-xs font-medium text-gray-500">
                    Drop a cover image, or click to browse
                  </p>
                </>
              )}
              <input
                ref={fileInputRef}
                type="file"
                accept="image/*"
                onChange={(e) => handleFile(e.target.files?.[0])}
                className="hidden"
              />
            </div>

            <div>
              <label htmlFor="album-title" className="mb-1 block text-xs font-medium text-gray-700">
                Title
              </label>
              <input
                id="album-title"
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="e.g. Annual Day 2026"
                disabled={submitting}
                className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm outline-none transition-colors focus:border-fuchsia-400 focus:ring-2 focus:ring-fuchsia-100"
              />
            </div>

            <div>
              <label htmlFor="album-description" className="mb-1 block text-xs font-medium text-gray-700">
                Description
              </label>
              <textarea
                id="album-description"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                rows={2}
                placeholder="Optional"
                disabled={submitting}
                className="w-full resize-none rounded-lg border border-gray-300 px-3 py-2 text-sm outline-none transition-colors focus:border-fuchsia-400 focus:ring-2 focus:ring-fuchsia-100"
              />
            </div>

            <div>
              <label htmlFor="album-date" className="mb-1 block text-xs font-medium text-gray-700">
                Event Date
              </label>
              <div className="relative">
                <Calendar
                  size={15}
                  className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
                />
                <input
                  id="album-date"
                  type="date"
                  value={eventDate}
                  onChange={(e) => setEventDate(e.target.value)}
                  disabled={submitting}
                  className="w-full rounded-lg border border-gray-300 py-2 pl-9 pr-3 text-sm outline-none transition-colors focus:border-fuchsia-400 focus:ring-2 focus:ring-fuchsia-100"
                />
              </div>
            </div>

            {localError && (
              <p className="text-xs text-red-600" role="alert">
                {localError}
              </p>
            )}
          </div>
        </form>

        <div className="shrink-0 border-t border-gray-100 p-6 pt-4">
          <button
            type="button"
            onClick={handleSubmit}
            disabled={submitting}
            className="flex w-full items-center justify-center gap-2 rounded-lg bg-fuchsia-800 px-4 py-2.5 text-sm font-medium text-white transition-colors hover:bg-fuchsia-900 disabled:cursor-not-allowed disabled:opacity-60"
          >
            {submitting && <Loader2 size={15} className="animate-spin" />}
            {submitting ? "Creating…" : "Create Album"}
          </button>
        </div>
      </div>
    </div>
  );
}

// ─── Album detail ────────────────────────────────────────────────────────

function AlbumDetail({ albumData, loading, onBack, onPhotosAdded, onRequestDeletePhoto, onError }) {
  const { album, photos } = albumData;
  const [uploading, setUploading] = useState(false);
  const [lightboxIndex, setLightboxIndex] = useState(null); // index into photos, or null

  const handleUpload = async (e) => {
    const files = Array.from(e.target.files || []);
    if (files.length === 0) return;

    const formData = new FormData();
    files.forEach((f) => formData.append("photos", f));

    setUploading(true);
    onError("");
    try {
      const res = await API.post(`/api/gallery/albums/${album._id}/photos`, formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      onPhotosAdded(res.data.data);
    } catch (err) {
      onError("Could not upload photos.");
    } finally {
      setUploading(false);
      e.target.value = "";
    }
  };

  const closeLightbox = useCallback(() => setLightboxIndex(null), []);
  const showPrev = useCallback(
    () => setLightboxIndex((i) => (photos.length ? (i - 1 + photos.length) % photos.length : null)),
    [photos.length]
  );
  const showNext = useCallback(
    () => setLightboxIndex((i) => (photos.length ? (i + 1) % photos.length : null)),
    [photos.length]
  );

  // If the currently-open photo gets deleted, keep the lightbox pointed at
  // a valid index (or close it if that was the last photo).
  useEffect(() => {
    if (lightboxIndex === null) return;
    if (photos.length === 0) {
      setLightboxIndex(null);
    } else if (lightboxIndex >= photos.length) {
      setLightboxIndex(photos.length - 1);
    }
  }, [photos.length, lightboxIndex]);

  return (
    <div>
      <button
        onClick={onBack}
        className="mb-4 inline-flex items-center gap-1.5 rounded-lg px-2 py-1.5 text-sm font-medium text-gray-600 transition-colors hover:bg-gray-100 hover:text-fuchsia-800"
      >
        <ArrowLeft size={16} />
        Back to albums
      </button>

      <div className="mb-6 flex flex-wrap items-start justify-between gap-4">
        <div className="min-w-0">
          <h2 className="truncate text-lg font-semibold text-gray-900">{album.title}</h2>
          {album.description && <p className="mt-1 text-sm text-gray-500">{album.description}</p>}
          <p className="mt-1 text-xs text-gray-400">
            {photos.length} photo{photos.length === 1 ? "" : "s"}
          </p>
        </div>
        <label
          className={`inline-flex shrink-0 items-center gap-1.5 rounded-lg bg-fuchsia-800 px-4 py-2.5 text-sm font-medium text-white shadow-sm transition-colors hover:bg-fuchsia-900 ${
            uploading ? "cursor-not-allowed opacity-70" : "cursor-pointer"
          }`}
        >
          {uploading ? <Loader2 size={16} className="animate-spin" /> : <ImagePlus size={16} />}
          {uploading ? "Uploading…" : "Add Photos"}
          <input
            type="file"
            accept="image/*"
            multiple
            onChange={handleUpload}
            disabled={uploading}
            className="hidden"
          />
        </label>
      </div>

      {loading ? (
        <PhotoGridSkeleton />
      ) : photos.length === 0 ? (
        <EmptyState
          icon={ImageOff}
          title="No photos yet"
          subtitle="Add some photos to bring this album to life."
        />
      ) : (
        <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
          {photos.map((photo, idx) => (
            <div
              key={photo._id}
              className="group relative aspect-square overflow-hidden rounded-xl bg-gray-100 ring-1 ring-gray-200 transition-shadow hover:shadow-md"
            >
              <button
                onClick={() => setLightboxIndex(idx)}
                className="block h-full w-full cursor-zoom-in"
                aria-label={`View photo ${idx + 1} full size`}
              >
                <img
                  src={photo.imageUrl}
                  alt=""
                  className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
                  loading="lazy"
                />
                {/* Subtle corner hint instead of a full dark overlay */}
                <span className="pointer-events-none absolute bottom-1.5 left-1.5 flex h-6 w-6 items-center justify-center rounded-full bg-black/45 text-white opacity-0 backdrop-blur-sm transition-opacity group-hover:opacity-100">
                  <ZoomIn size={13} />
                </span>
              </button>

              <button
                onClick={(e) => {
                  e.stopPropagation();
                  onRequestDeletePhoto(photo._id, "this photo");
                }}
                aria-label="Delete photo"
                className="absolute right-1.5 top-1.5 flex h-7 w-7 items-center justify-center rounded-full bg-white/90 text-red-600 opacity-0 shadow-sm backdrop-blur transition-all hover:bg-white group-hover:opacity-100 focus:opacity-100"
              >
                <Trash2 size={13} />
              </button>
            </div>
          ))}
        </div>
      )}

      {lightboxIndex !== null && photos[lightboxIndex] && (
        <PhotoLightbox
          photo={photos[lightboxIndex]}
          index={lightboxIndex}
          total={photos.length}
          onClose={closeLightbox}
          onPrev={showPrev}
          onNext={showNext}
          onDelete={() => {
            closeLightbox();
            onRequestDeletePhoto(photos[lightboxIndex]._id, "this photo");
          }}
        />
      )}
    </div>
  );
}

function PhotoGridSkeleton() {
  return (
    <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
      {Array.from({ length: 10 }).map((_, i) => (
        <div key={i} className="aspect-square animate-pulse rounded-xl bg-gray-100" />
      ))}
    </div>
  );
}

// ─── Photo lightbox — full-size view with prev/next + delete ─────────────

function PhotoLightbox({ photo, index, total, onClose, onPrev, onNext, onDelete }) {
  // Locked for the lifetime of this component only — independent of
  // `total`/`index` changes, so paging through photos never flickers it.
  useLockBodyScroll(true);

  useEffect(() => {
    const onKeyDown = (e) => {
      if (e.key === "Escape") onClose();
      if (e.key === "ArrowRight") onNext();
      if (e.key === "ArrowLeft") onPrev();
    };
    document.addEventListener("keydown", onKeyDown);
    return () => document.removeEventListener("keydown", onKeyDown);
  }, [onClose, onNext, onPrev]);

  return (
    <div
      className="fixed inset-0 z-[100] flex items-center justify-center overscroll-contain bg-black/90 p-4"
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-label="Photo preview"
    >
      <button
        onClick={onClose}
        aria-label="Close"
        className="absolute right-4 top-4 flex h-10 w-10 items-center justify-center rounded-full border border-white/25 bg-white/10 text-white transition-colors hover:bg-white/20"
      >
        <X size={20} />
      </button>

      <button
        onClick={(e) => {
          e.stopPropagation();
          onDelete();
        }}
        aria-label="Delete this photo"
        className="absolute left-4 top-4 inline-flex items-center gap-1.5 rounded-full border border-white/25 bg-white/10 px-3.5 py-2 text-xs font-medium text-white transition-colors hover:border-red-400 hover:bg-red-500/80"
      >
        <Trash2 size={14} />
        Delete
      </button>

      {total > 1 && (
        <button
          onClick={(e) => {
            e.stopPropagation();
            onPrev();
          }}
          aria-label="Previous photo"
          className="absolute left-4 top-1/2 hidden h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full border border-white/25 bg-white/10 text-white transition-colors hover:bg-white/20 sm:flex"
        >
          <ChevronLeft size={22} />
        </button>
      )}

      <img
        src={photo.imageUrl}
        alt=""
        onClick={(e) => e.stopPropagation()}
        className="max-h-[85vh] max-w-[90vw] rounded-lg object-contain shadow-2xl"
      />

      {total > 1 && (
        <button
          onClick={(e) => {
            e.stopPropagation();
            onNext();
          }}
          aria-label="Next photo"
          className="absolute right-4 top-1/2 hidden h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full border border-white/25 bg-white/10 text-white transition-colors hover:bg-white/20 sm:flex"
        >
          <ChevronRight size={22} />
        </button>
      )}

      {total > 1 && (
        <div className="absolute bottom-5 left-1/2 -translate-x-1/2 rounded-full border border-white/20 bg-white/10 px-3.5 py-1.5 text-xs font-medium text-white">
          {index + 1} / {total}
        </div>
      )}
    </div>
  );
}

// ─── Confirm dialog (replaces window.confirm) ────────────────────────────

function ConfirmDialog({ message, busy, onConfirm, onCancel }) {
  // This previously had NO scroll lock at all, so the page behind it could
  // still scroll while it was open. It also now sits at a higher z-index
  // than other overlays so it always renders on top if it's ever triggered
  // from within another modal (e.g. deleting a photo from the lightbox).
  useLockBodyScroll(true);

  useEffect(() => {
    const onKeyDown = (e) => {
      if (e.key === "Escape" && !busy) onCancel();
    };
    document.addEventListener("keydown", onKeyDown);
    return () => document.removeEventListener("keydown", onKeyDown);
  }, [onCancel, busy]);

  return (
    <div
      className="fixed inset-0 z-[110] flex items-center justify-center overscroll-contain bg-black/40 p-4 backdrop-blur-sm"
      onClick={() => !busy && onCancel()}
      role="dialog"
      aria-modal="true"
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className="w-full max-w-sm rounded-2xl bg-white p-6 text-center shadow-2xl"
      >
        <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-red-50">
          <AlertTriangle size={22} className="text-red-500" />
        </div>
        <p className="text-sm text-gray-700">{message}</p>
        <div className="mt-6 flex gap-3">
          <button
            onClick={onCancel}
            disabled={busy}
            className="flex-1 rounded-lg border border-gray-300 px-4 py-2.5 text-sm font-medium text-gray-700 transition-colors hover:bg-gray-50 disabled:cursor-not-allowed disabled:opacity-60"
          >
            Cancel
          </button>
          <button
            onClick={onConfirm}
            disabled={busy}
            className="flex flex-1 items-center justify-center gap-2 rounded-lg bg-red-600 px-4 py-2.5 text-sm font-medium text-white transition-colors hover:bg-red-700 disabled:cursor-not-allowed disabled:opacity-60"
          >
            {busy && <Loader2 size={14} className="animate-spin" />}
            {busy ? "Deleting…" : "Delete"}
          </button>
        </div>
      </div>
    </div>
  );
}