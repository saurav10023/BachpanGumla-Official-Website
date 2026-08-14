import { useEffect, useRef, useState } from "react";
import API from "../api/axios";
import {
  Plus,
  X,
  Trash2,
  Pencil,
  Megaphone,
  Paperclip,
  UploadCloud,
  AlertCircle,
  AlertTriangle,
  Loader2,
  Eye,
  EyeOff,
  FileText,
} from "lucide-react";

// NOTE: this assumes a notice controller with routes shaped like:
//   GET    /api/notices
//   POST   /api/notices              (multipart if attachment included)
//   PATCH  /api/notices/:id          (edit fields / toggle isPublished / replace attachment)
//   DELETE /api/notices/:id
// That controller wasn't part of what you shared, so double-check these
// paths (and the field names) against your actual router/controller.
//
// NOTE: the "Remove attachment" option in the edit modal sends
// removeAttachment: "true" — your updateNotice controller needs to handle
// that flag (destroy the Cloudinary asset and null out the three
// attachment fields) for it to actually take effect. If that branch isn't
// wired up yet, hide/remove the button below or it'll silently no-op.
//
// DEBUG BUILD: every catch block below now builds a detailed message from
// the actual axios error (status + response body, or "no response at all"
// for network/CORS failures) instead of a generic string, and surfaces it
// in the error banner. Once you've found the root cause on mobile, you can
// swap `debugMessage(err, "...")` calls back to plain strings if you'd
// rather not show raw error detail to end users in production.

const CATEGORIES = [
  { value: "general", label: "General", dot: "bg-gray-400", pill: "bg-gray-100 text-gray-600" },
  { value: "exam", label: "Exam", dot: "bg-blue-500", pill: "bg-blue-50 text-blue-700" },
  { value: "holiday", label: "Holiday", dot: "bg-amber-500", pill: "bg-amber-50 text-amber-700" },
  { value: "event", label: "Event", dot: "bg-violet-500", pill: "bg-violet-50 text-violet-700" },
  { value: "urgent", label: "Urgent", dot: "bg-red-500", pill: "bg-red-50 text-red-700" },
  { value: "admission", label: "Admission", dot: "bg-emerald-500", pill: "bg-emerald-50 text-emerald-700" },
];

const categoryMeta = (value) => CATEGORIES.find((c) => c.value === value) || CATEGORIES[0];

// Builds a detailed, human-readable error string from an axios error so it
// can be shown directly in the UI for debugging.
function debugMessage(err, fallbackAction) {
  console.error(`${fallbackAction} failed:`, err);

  if (err.response) {
    // Server responded, but with a non-2xx status — this is the most
    // useful case: it tells you exactly what the backend said.
    const status = err.response.status;
    let body = err.response.data;
    try {
      body = typeof body === "string" ? body : JSON.stringify(body);
    } catch {
      body = String(body);
    }
    return `${fallbackAction} failed — status ${status}: ${body}`;
  }

  if (err.request) {
    // Request was sent but no response ever came back. On mobile this is
    // the classic signature of a CORS block, mixed-content block, or a
    // network/DNS failure.
    return `${fallbackAction} failed — no response from server (network or CORS error): ${err.message}`;
  }

  // Something went wrong before the request was even sent.
  return `${fallbackAction} failed — ${err.message}`;
}

export default function NoticesPanel() {
  const [notices, setNotices] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [showCreate, setShowCreate] = useState(false);
  const [editTarget, setEditTarget] = useState(null); // full notice object, or null
  const [confirmTarget, setConfirmTarget] = useState(null); // { id, label }
  const [activeFilter, setActiveFilter] = useState("all");
  const [busyId, setBusyId] = useState(null);

  const fetchNotices = async () => {
    setLoading(true);
    setError("");
    try {
      const res = await API.get("/api/notices");
      setNotices(res.data.data);
    } catch (err) {
      setError(debugMessage(err, "Loading notices"));
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchNotices();
  }, []);

  const handleTogglePublish = async (notice) => {
    setBusyId(notice._id);
    try {
      const res = await API.patch(`/api/notices/${notice._id}`, {
        isPublished: !notice.isPublished,
      });
      setNotices((prev) =>
        prev.map((n) => (n._id === notice._id ? res.data.data : n))
      );
    } catch (err) {
      setError(debugMessage(err, "Updating notice"));
    } finally {
      setBusyId(null);
    }
  };

  const handleDelete = async (id) => {
    try {
      await API.delete(`/api/notices/${id}`);
      setNotices((prev) => prev.filter((n) => n._id !== id));
    } catch (err) {
      setError(debugMessage(err, "Deleting notice"));
    } finally {
      setConfirmTarget(null);
    }
  };

  const filteredNotices =
    activeFilter === "all" ? notices : notices.filter((n) => n.category === activeFilter);

  const filterCounts = CATEGORIES.reduce((acc, c) => {
    acc[c.value] = notices.filter((n) => n.category === c.value).length;
    return acc;
  }, {});

  return (
    <div>
      {error && (
        <div className="mb-5 flex items-start gap-3 rounded-xl border border-red-200 bg-red-50 px-4 py-3">
          <AlertCircle size={18} className="mt-0.5 shrink-0 text-red-500" />
          <p className="flex-1 whitespace-pre-wrap break-words text-sm text-red-700">{error}</p>
          <button
            onClick={() => setError("")}
            aria-label="Dismiss"
            className="shrink-0 rounded-md p-1 text-red-400 transition-colors hover:bg-red-100 hover:text-red-600"
          >
            <X size={14} />
          </button>
        </div>
      )}

      <div className="mb-5 flex flex-wrap items-center justify-between gap-4">
        <div>
          <h2 className="text-lg font-semibold text-gray-900">Notices</h2>
          <p className="mt-0.5 text-sm text-gray-500">
            {loading ? "Loading…" : `${notices.length} notice${notices.length === 1 ? "" : "s"}`}
          </p>
        </div>
        <button
          onClick={() => setShowCreate(true)}
          className="inline-flex items-center gap-1.5 rounded-lg bg-fuchsia-800 px-4 py-2.5 text-sm font-medium text-white shadow-sm transition-colors hover:bg-fuchsia-900 focus:outline-none focus:ring-2 focus:ring-fuchsia-400 focus:ring-offset-2"
        >
          <Plus size={16} />
          New Notice
        </button>
      </div>

      {!loading && notices.length > 0 && (
        <div className="mb-6 flex flex-wrap gap-2">
          <FilterPill
            active={activeFilter === "all"}
            onClick={() => setActiveFilter("all")}
            label="All"
            count={notices.length}
          />
          {CATEGORIES.map((c) =>
            filterCounts[c.value] > 0 ? (
              <FilterPill
                key={c.value}
                active={activeFilter === c.value}
                onClick={() => setActiveFilter(c.value)}
                label={c.label}
                count={filterCounts[c.value]}
                dot={c.dot}
              />
            ) : null
          )}
        </div>
      )}

      {loading ? (
        <NoticeListSkeleton />
      ) : filteredNotices.length === 0 ? (
        <EmptyState
          hasNotices={notices.length > 0}
          onAction={() => setShowCreate(true)}
        />
      ) : (
        <div className="space-y-3">
          {filteredNotices.map((notice) => (
            <NoticeCard
              key={notice._id}
              notice={notice}
              busy={busyId === notice._id}
              onTogglePublish={() => handleTogglePublish(notice)}
              onEdit={() => setEditTarget(notice)}
              onRequestDelete={() =>
                setConfirmTarget({ id: notice._id, label: `"${notice.title}"` })
              }
            />
          ))}
        </div>
      )}

      {showCreate && (
        <NoticeFormModal
          mode="create"
          onClose={() => setShowCreate(false)}
          onSaved={(notice) => {
            setNotices((prev) => [notice, ...prev]);
            setShowCreate(false);
          }}
          onError={setError}
        />
      )}

      {editTarget && (
        <NoticeFormModal
          mode="edit"
          initialNotice={editTarget}
          onClose={() => setEditTarget(null)}
          onSaved={(notice) => {
            setNotices((prev) => prev.map((n) => (n._id === notice._id ? notice : n)));
            setEditTarget(null);
          }}
          onError={setError}
        />
      )}

      {confirmTarget && (
        <ConfirmDialog
          message={`Delete ${confirmTarget.label}? This can't be undone.`}
          onCancel={() => setConfirmTarget(null)}
          onConfirm={() => handleDelete(confirmTarget.id)}
        />
      )}
    </div>
  );
}

// ─── Filter pill ─────────────────────────────────────────────────────────

function FilterPill({ active, onClick, label, count, dot }) {
  return (
    <button
      onClick={onClick}
      className={`inline-flex items-center gap-1.5 rounded-full border px-3 py-1.5 text-xs font-medium transition-colors ${
        active
          ? "border-fuchsia-800 bg-fuchsia-800 text-white"
          : "border-gray-200 bg-white text-gray-600 hover:border-fuchsia-200 hover:bg-fuchsia-50"
      }`}
    >
      {dot && <span className={`h-1.5 w-1.5 rounded-full ${active ? "bg-white" : dot}`} />}
      {label}
      <span className={active ? "text-fuchsia-100" : "text-gray-400"}>{count}</span>
    </button>
  );
}

// ─── Notice card ─────────────────────────────────────────────────────────

function NoticeCard({ notice, busy, onTogglePublish, onEdit, onRequestDelete }) {
  const meta = categoryMeta(notice.category);
  const isUrgent = notice.category === "urgent";

  return (
    <div
      className={`group relative overflow-hidden rounded-2xl bg-white p-4 ring-1 transition-all hover:shadow-md sm:p-5 ${
        isUrgent ? "ring-red-200" : "ring-gray-200 hover:ring-fuchsia-200"
      }`}
    >
      {isUrgent && <div className="absolute inset-y-0 left-0 w-1 bg-red-500" />}

      <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
        <div className="min-w-0 flex-1">
          <div className="mb-1.5 flex flex-wrap items-center gap-2">
            <span
              className={`inline-flex items-center gap-1 rounded-full px-2 py-0.5 text-[11px] font-medium uppercase tracking-wide ${meta.pill}`}
            >
              <span className={`h-1.5 w-1.5 rounded-full ${meta.dot}`} />
              {meta.label}
            </span>
            {!notice.isPublished && (
              <span className="inline-flex items-center gap-1 rounded-full bg-gray-100 px-2 py-0.5 text-[11px] font-medium text-gray-500">
                Draft
              </span>
            )}
            {notice.createdAt && (
              <span className="text-xs text-gray-400">
                {new Date(notice.createdAt).toLocaleDateString(undefined, {
                  day: "numeric",
                  month: "short",
                  year: "numeric",
                })}
              </span>
            )}
          </div>
          <p className="truncate text-sm font-semibold text-gray-900 sm:text-base">
            {notice.title}
          </p>
          {notice.description && (
            <p className="mt-1 line-clamp-2 text-sm text-gray-500">{notice.description}</p>
          )}
          {notice.attachmentUrl && (
            <a
              href={notice.attachmentUrl}
              target="_blank"
              rel="noreferrer"
              className="mt-2 inline-flex items-center gap-1.5 text-xs font-medium text-fuchsia-800 hover:text-fuchsia-900 hover:underline"
            >
              <Paperclip size={13} />
              View attachment
            </a>
          )}
        </div>

        <div className="flex shrink-0 items-center gap-1.5 self-start sm:flex-col sm:items-end sm:gap-2">
          <button
            onClick={onEdit}
            className="inline-flex items-center gap-1.5 rounded-lg px-2.5 py-1.5 text-xs font-medium text-gray-600 transition-colors hover:bg-gray-100 hover:text-fuchsia-800"
          >
            <Pencil size={13} />
            Edit
          </button>
          <button
            onClick={onTogglePublish}
            disabled={busy}
            className="inline-flex items-center gap-1.5 rounded-lg px-2.5 py-1.5 text-xs font-medium text-gray-600 transition-colors hover:bg-gray-100 hover:text-fuchsia-800 disabled:opacity-50"
          >
            {busy ? (
              <Loader2 size={13} className="animate-spin" />
            ) : notice.isPublished ? (
              <EyeOff size={13} />
            ) : (
              <Eye size={13} />
            )}
            {notice.isPublished ? "Unpublish" : "Publish"}
          </button>
          <button
            onClick={onRequestDelete}
            className="inline-flex items-center gap-1.5 rounded-lg px-2.5 py-1.5 text-xs font-medium text-red-600 transition-colors hover:bg-red-50 hover:text-red-700"
          >
            <Trash2 size={13} />
            Delete
          </button>
        </div>
      </div>
    </div>
  );
}

function NoticeListSkeleton() {
  return (
    <div className="space-y-3">
      {Array.from({ length: 5 }).map((_, i) => (
        <div key={i} className="animate-pulse rounded-2xl bg-white p-4 ring-1 ring-gray-200 sm:p-5">
          <div className="mb-3 h-4 w-20 rounded-full bg-gray-100" />
          <div className="mb-2 h-4 w-2/3 rounded bg-gray-100" />
          <div className="h-3 w-1/2 rounded bg-gray-100" />
        </div>
      ))}
    </div>
  );
}

// ─── Empty state ─────────────────────────────────────────────────────────

function EmptyState({ hasNotices, onAction }) {
  return (
    <div className="flex flex-col items-center justify-center rounded-2xl border-2 border-dashed border-gray-200 px-6 py-16 text-center">
      <div className="mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-fuchsia-50">
        <Megaphone size={26} className="text-fuchsia-400" />
      </div>
      <p className="text-sm font-medium text-gray-900">
        {hasNotices ? "No notices in this category" : "No notices yet"}
      </p>
      <p className="mt-1 max-w-xs text-sm text-gray-500">
        {hasNotices
          ? "Try a different filter, or post a new notice."
          : "Post your first notice to keep everyone in the loop."}
      </p>
      {!hasNotices && onAction && (
        <button
          onClick={onAction}
          className="mt-5 inline-flex items-center gap-1.5 rounded-lg bg-fuchsia-800 px-4 py-2.5 text-sm font-medium text-white transition-colors hover:bg-fuchsia-900"
        >
          <Plus size={16} />
          New Notice
        </button>
      )}
    </div>
  );
}

// ─── Create / edit notice modal ───────────────────────────────────────────
// One form drives both flows: POST for create, PATCH (multipart when the
// attachment changes) for edit. `initialNotice` is only passed in edit mode.

function NoticeFormModal({ mode, initialNotice, onClose, onSaved, onError }) {
  const isEdit = mode === "edit";

  const [title, setTitle] = useState(initialNotice?.title || "");
  const [description, setDescription] = useState(initialNotice?.description || "");
  const [category, setCategory] = useState(initialNotice?.category || "general");
  const [isPublished, setIsPublished] = useState(initialNotice?.isPublished ?? true);
  const [attachment, setAttachment] = useState(null); // new File, if replacing
  const [removeAttachment, setRemoveAttachment] = useState(false);
  const [dragActive, setDragActive] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [localError, setLocalError] = useState("");
  const fileInputRef = useRef(null);

  const existingAttachmentUrl = isEdit ? initialNotice?.attachmentUrl : null;
  const hasAttachmentToShow = attachment || (existingAttachmentUrl && !removeAttachment);

  const handleFile = (file) => {
    if (!file) return;
    setAttachment(file);
    setRemoveAttachment(false);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!title.trim()) {
      setLocalError("Notice title is required.");
      return;
    }
    setLocalError("");
    onError("");
    setSubmitting(true);

    try {
      let res;
      if (attachment) {
        const formData = new FormData();
        formData.append("title", title.trim());
        formData.append("description", description);
        formData.append("category", category);
        formData.append("isPublished", isPublished);
        formData.append("attachment", attachment);
        // NOTE: intentionally NOT setting Content-Type here — let
        // axios/the browser set "multipart/form-data; boundary=..."
        // automatically. Setting it manually strips the boundary param
        // and can break multipart parsing on some clients/servers.
        res = isEdit
          ? await API.patch(`/api/notices/${initialNotice._id}`, formData)
          : await API.post("/api/notices", formData);
      } else {
        const payload = {
          title: title.trim(),
          description,
          category,
          isPublished,
          ...(isEdit && removeAttachment ? { removeAttachment: true } : {}),
        };
        res = isEdit
          ? await API.patch(`/api/notices/${initialNotice._id}`, payload)
          : await API.post("/api/notices", payload);
      }
      onSaved(res.data.data);
    } catch (err) {
      const msg = debugMessage(err, isEdit ? "Updating notice" : "Creating notice");
      onError(msg);
      setLocalError(msg);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4 backdrop-blur-sm"
      onClick={onClose}
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className="max-h-[90vh] w-full max-w-md overflow-y-auto rounded-2xl bg-white p-6 shadow-2xl"
      >
        <div className="mb-5 flex items-center justify-between">
          <h3 className="text-base font-semibold text-gray-900">
            {isEdit ? "Edit Notice" : "New Notice"}
          </h3>
          <button
            onClick={onClose}
            aria-label="Close"
            className="rounded-md p-1.5 text-gray-400 transition-colors hover:bg-gray-100 hover:text-gray-600"
          >
            <X size={18} />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="mb-1 block text-xs font-medium text-gray-700">Title</label>
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="e.g. Mid-term exam schedule"
              disabled={submitting}
              className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm outline-none transition-colors focus:border-fuchsia-400 focus:ring-2 focus:ring-fuchsia-100"
            />
          </div>

          <div>
            <label className="mb-1 block text-xs font-medium text-gray-700">Description</label>
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              rows={3}
              placeholder="Optional"
              disabled={submitting}
              className="w-full resize-none rounded-lg border border-gray-300 px-3 py-2 text-sm outline-none transition-colors focus:border-fuchsia-400 focus:ring-2 focus:ring-fuchsia-100"
            />
          </div>

          <div>
            <label className="mb-2 block text-xs font-medium text-gray-700">Category</label>
            <div className="flex flex-wrap gap-2">
              {CATEGORIES.map((c) => (
                <button
                  key={c.value}
                  type="button"
                  onClick={() => setCategory(c.value)}
                  disabled={submitting}
                  className={`inline-flex items-center gap-1.5 rounded-full border px-3 py-1.5 text-xs font-medium transition-colors ${
                    category === c.value
                      ? "border-fuchsia-800 bg-fuchsia-800 text-white"
                      : "border-gray-200 bg-white text-gray-600 hover:border-fuchsia-200 hover:bg-fuchsia-50"
                  }`}
                >
                  <span className={`h-1.5 w-1.5 rounded-full ${category === c.value ? "bg-white" : c.dot}`} />
                  {c.label}
                </button>
              ))}
            </div>
          </div>

          {isEdit && (
            <div>
              <label className="mb-1 block text-xs font-medium text-gray-700">Status</label>
              <div className="flex gap-2">
                <button
                  type="button"
                  onClick={() => setIsPublished(true)}
                  disabled={submitting}
                  className={`flex-1 inline-flex items-center justify-center gap-1.5 rounded-lg border px-3 py-2 text-xs font-medium transition-colors ${
                    isPublished
                      ? "border-fuchsia-800 bg-fuchsia-800 text-white"
                      : "border-gray-200 bg-white text-gray-600 hover:bg-gray-50"
                  }`}
                >
                  <Eye size={13} />
                  Published
                </button>
                <button
                  type="button"
                  onClick={() => setIsPublished(false)}
                  disabled={submitting}
                  className={`flex-1 inline-flex items-center justify-center gap-1.5 rounded-lg border px-3 py-2 text-xs font-medium transition-colors ${
                    !isPublished
                      ? "border-gray-800 bg-gray-800 text-white"
                      : "border-gray-200 bg-white text-gray-600 hover:bg-gray-50"
                  }`}
                >
                  <EyeOff size={13} />
                  Draft
                </button>
              </div>
            </div>
          )}

          <div>
            <label className="mb-1 block text-xs font-medium text-gray-700">Attachment</label>

            {hasAttachmentToShow ? (
              <div className="flex items-center gap-3 rounded-xl border border-gray-200 px-4 py-3">
                <div className="flex min-w-0 flex-1 items-center gap-2 text-sm text-gray-700">
                  <FileText size={16} className="shrink-0 text-fuchsia-700" />
                  <span className="truncate">
                    {attachment ? attachment.name : "Current attachment"}
                  </span>
                </div>
                <button
                  type="button"
                  onClick={() => {
                    if (attachment) {
                      setAttachment(null);
                    } else {
                      setRemoveAttachment(true);
                    }
                  }}
                  className="shrink-0 text-xs font-medium text-red-600 hover:underline"
                >
                  Remove
                </button>
              </div>
            ) : (
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
                onClick={() => fileInputRef.current?.click()}
                className={`relative flex h-24 cursor-pointer flex-col items-center justify-center gap-1 rounded-xl border-2 border-dashed px-4 text-center transition-colors ${
                  dragActive
                    ? "border-fuchsia-400 bg-fuchsia-50"
                    : "border-gray-200 hover:border-fuchsia-300 hover:bg-gray-50"
                }`}
              >
                <UploadCloud size={20} className="text-gray-400" />
                <p className="text-xs font-medium text-gray-500">
                  {removeAttachment ? "Attachment will be removed — drop a new file, or click to browse" : "Drop a file, or click to browse"}
                </p>
                <input
                  ref={fileInputRef}
                  type="file"
                  onChange={(e) => handleFile(e.target.files?.[0])}
                  className="hidden"
                />
              </div>
            )}
          </div>

          {localError && (
            <p className="whitespace-pre-wrap break-words text-xs text-red-600">{localError}</p>
          )}

          <button
            type="submit"
            disabled={submitting}
            className="flex w-full items-center justify-center gap-2 rounded-lg bg-fuchsia-800 px-4 py-2.5 text-sm font-medium text-white transition-colors hover:bg-fuchsia-900 disabled:cursor-not-allowed disabled:opacity-60"
          >
            {submitting && <Loader2 size={15} className="animate-spin" />}
            {submitting ? (isEdit ? "Saving…" : "Posting…") : isEdit ? "Save Changes" : "Post Notice"}
          </button>
        </form>
      </div>
    </div>
  );
}

// ─── Confirm dialog ───────────────────────────────────────────────────────

function ConfirmDialog({ message, onConfirm, onCancel }) {
  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4 backdrop-blur-sm"
      onClick={onCancel}
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
            className="flex-1 rounded-lg border border-gray-300 px-4 py-2.5 text-sm font-medium text-gray-700 transition-colors hover:bg-gray-50"
          >
            Cancel
          </button>
          <button
            onClick={onConfirm}
            className="flex-1 rounded-lg bg-red-600 px-4 py-2.5 text-sm font-medium text-white transition-colors hover:bg-red-700"
          >
            Delete
          </button>
        </div>
      </div>
    </div>
  );
}