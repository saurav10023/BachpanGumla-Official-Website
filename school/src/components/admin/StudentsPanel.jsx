import { useEffect, useState } from "react";
import { studentService } from "../../services/studentService";

const SUB_TABS = [
  { key: "list", label: "Students" },
  { key: "form", label: "Add / Edit" },
  { key: "import", label: "Import Excel" },
  { key: "upcoming", label: "Upcoming Birthdays" },
];

const EMPTY_STUDENT = {
  admissionNo: "",
  studentName: "",
  className: "",
  dateOfBirth: "",
  photo: "",
  isActive: true,
};

// ─── Shared bits (glass card / pill button, matching AdminDashboard's look) ──

const glassCard = {
  background: "rgba(255,255,255,0.6)",
  border: "1px solid rgba(255,255,255,0.8)",
  backdropFilter: "blur(12px)",
  boxShadow: "inset 0 1px 0 rgba(255,255,255,0.7), 0 8px 20px -14px rgba(162,28,175,0.3)",
};

function PillButton({ active, onClick, children }) {
  return (
    <button
      onClick={onClick}
      className={`px-4 py-1.5 text-sm font-semibold rounded-xl transition-all ${
        active ? "text-white" : "text-gray-600 hover:text-fuchsia-800"
      }`}
      style={
        active
          ? {
              background: "linear-gradient(135deg, #a21caf, #86198f)",
              boxShadow: "0 6px 14px -8px rgba(162,28,175,0.55)",
            }
          : undefined
      }
    >
      {children}
    </button>
  );
}

function ActionButton({ children, onClick, type = "button", tone = "primary", disabled }) {
  const tones = {
    primary: { background: "linear-gradient(135deg, #a21caf, #86198f)", color: "#fff" },
    danger: { background: "linear-gradient(135deg, #dc2626, #991b1b)", color: "#fff" },
    ghost: { background: "rgba(255,255,255,0.7)", color: "#374151", border: "1px solid rgba(0,0,0,0.08)" },
  };
  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className="glass-shine rounded-xl px-4 py-2 text-sm font-medium transition-all hover:-translate-y-0.5 disabled:opacity-50 disabled:hover:translate-y-0"
      style={tones[tone]}
    >
      {children}
    </button>
  );
}

// ─── Panel ───────────────────────────────────────────────────────────────────

export default function StudentsPanel() {
  const [subTab, setSubTab] = useState("list");

  return (
    <div className="fade-up">
      <div
        className="inline-flex flex-wrap gap-1 rounded-2xl p-1.5 mb-6"
        style={{ background: "rgba(255,255,255,0.5)", border: "1px solid rgba(255,255,255,0.75)" }}
      >
        {SUB_TABS.map((tab) => (
          <PillButton key={tab.key} active={subTab === tab.key} onClick={() => setSubTab(tab.key)}>
            {tab.label}
          </PillButton>
        ))}
      </div>

      {subTab === "list" && <StudentList onEdit={() => setSubTab("form")} />}
      {subTab === "form" && <StudentForm onDone={() => setSubTab("list")} />}
      {subTab === "import" && <ImportExcel />}
      {subTab === "upcoming" && <UpcomingBirthdays />}
    </div>
  );
}

// ─── Students list ───────────────────────────────────────────────────────────

function StudentList({ onEdit }) {
  const [students, setStudents] = useState([]);
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);
  const [pages, setPages] = useState(1);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const load = async () => {
    setLoading(true);
    setError("");
    try {
      const data = await studentService.list({ page, search });
      setStudents(Array.isArray(data?.students) ? data.students : []);
      setPages(data?.pages || 1);
    } catch (err) {
      setError(err.message);
      setStudents([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    load();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [page]);

  const handleSearch = (e) => {
    e.preventDefault();
    setPage(1);
    load();
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Remove this student? This cannot be undone.")) return;
    try {
      await studentService.remove(id);
      load();
    } catch (err) {
      setError(err.message);
    }
  };

  const startEdit = (student) => {
    window.dispatchEvent(new CustomEvent("student:edit", { detail: student }));
    onEdit();
  };

  return (
    <div className="rounded-2xl p-4 sm:p-5" style={glassCard}>
      <form onSubmit={handleSearch} className="flex flex-wrap gap-2 mb-4">
        <input
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Search by name or admission no."
          className="flex-1 min-w-[200px] rounded-xl px-3 py-2 text-sm bg-white/70 border border-white/80 focus:outline-none focus:ring-2 focus:ring-fuchsia-400"
        />
        <ActionButton type="submit" tone="ghost">Search</ActionButton>
      </form>

      {error && <p className="text-sm text-red-600 mb-3">{error}</p>}
      {loading && <p className="text-sm text-gray-500 mb-3">Loading…</p>}

      {!loading && students.length === 0 && (
        <p className="text-sm text-gray-500 py-6 text-center">No students found.</p>
      )}

      <div className="space-y-2">
        {students.map((s) => (
          <div
            key={s._id}
            className="flex items-center justify-between gap-3 rounded-xl px-3 py-2.5 bg-white/60 border border-white/70"
          >
            <div className="min-w-0">
              <p className="text-sm font-semibold text-gray-900 truncate">{s.studentName}</p>
              <p className="text-xs text-gray-500">
                {s.admissionNo} · Class {s.className} ·{" "}
                {new Date(s.dateOfBirth).toLocaleDateString("en-IN", { day: "2-digit", month: "short" })}
                {!s.isActive && <span className="text-red-500"> · inactive</span>}
              </p>
            </div>
            <div className="flex gap-1.5 shrink-0">
              <ActionButton tone="ghost" onClick={() => startEdit(s)}>Edit</ActionButton>
              <ActionButton tone="danger" onClick={() => handleDelete(s._id)}>Delete</ActionButton>
            </div>
          </div>
        ))}
      </div>

      {pages > 1 && (
        <div className="flex items-center justify-center gap-3 mt-4">
          <ActionButton tone="ghost" disabled={page <= 1} onClick={() => setPage((p) => p - 1)}>
            Prev
          </ActionButton>
          <span className="text-sm text-gray-600">
            Page {page} of {pages}
          </span>
          <ActionButton tone="ghost" disabled={page >= pages} onClick={() => setPage((p) => p + 1)}>
            Next
          </ActionButton>
        </div>
      )}
    </div>
  );
}

// ─── Add / edit form ─────────────────────────────────────────────────────────

function StudentForm({ onDone }) {
  const [form, setForm] = useState(EMPTY_STUDENT);
  const [editingId, setEditingId] = useState(null);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    const handler = (e) => {
      const s = e.detail;
      setEditingId(s._id);
      setForm({
        admissionNo: s.admissionNo,
        studentName: s.studentName,
        className: s.className,
        dateOfBirth: s.dateOfBirth?.slice(0, 10) || "",
        photo: s.photo || "",
        isActive: s.isActive,
      });
    };
    window.addEventListener("student:edit", handler);
    return () => window.removeEventListener("student:edit", handler);
  }, []);

  const update = (field) => (e) => {
    const value = field === "isActive" ? e.target.checked : e.target.value;
    setForm((f) => ({ ...f, [field]: value }));
  };

  const resetForm = () => {
    setEditingId(null);
    setForm(EMPTY_STUDENT);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSaving(true);
    setError("");
    try {
      if (editingId) {
        await studentService.update(editingId, form);
      } else {
        await studentService.create(form);
      }
      resetForm();
      onDone();
    } catch (err) {
      setError(err.message);
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="rounded-2xl p-4 sm:p-5 max-w-lg" style={glassCard}>
      <h2 className="text-sm font-semibold text-gray-900 mb-4" style={{ fontFamily: "Fredoka, sans-serif" }}>
        {editingId ? "Edit student" : "Add student"}
      </h2>

      <form onSubmit={handleSubmit} className="space-y-3">
        <Field label="Admission No.">
          <input
            required
            disabled={!!editingId}
            value={form.admissionNo}
            onChange={update("admissionNo")}
            className="w-full rounded-xl px-3 py-2 text-sm bg-white/70 border border-white/80 focus:outline-none focus:ring-2 focus:ring-fuchsia-400 disabled:opacity-60"
          />
        </Field>

        <Field label="Student name">
          <input
            required
            value={form.studentName}
            onChange={update("studentName")}
            className="w-full rounded-xl px-3 py-2 text-sm bg-white/70 border border-white/80 focus:outline-none focus:ring-2 focus:ring-fuchsia-400"
          />
        </Field>

        <div className="grid grid-cols-2 gap-3">
          <Field label="Class">
            <input
              required
              value={form.className}
              onChange={update("className")}
              className="w-full rounded-xl px-3 py-2 text-sm bg-white/70 border border-white/80 focus:outline-none focus:ring-2 focus:ring-fuchsia-400"
            />
          </Field>
          <Field label="Date of birth">
            <input
              required
              type="date"
              value={form.dateOfBirth}
              onChange={update("dateOfBirth")}
              className="w-full rounded-xl px-3 py-2 text-sm bg-white/70 border border-white/80 focus:outline-none focus:ring-2 focus:ring-fuchsia-400"
            />
          </Field>
        </div>

        <Field label="Photo URL (optional)">
          <input
            value={form.photo}
            onChange={update("photo")}
            placeholder="https://…"
            className="w-full rounded-xl px-3 py-2 text-sm bg-white/70 border border-white/80 focus:outline-none focus:ring-2 focus:ring-fuchsia-400"
          />
        </Field>

        {editingId && (
          <label className="flex items-center gap-2 text-sm text-gray-700">
            <input type="checkbox" checked={form.isActive} onChange={update("isActive")} />
            Active
          </label>
        )}

        {error && <p className="text-sm text-red-600">{error}</p>}

        <div className="flex gap-2 pt-1">
          <ActionButton type="submit" disabled={saving}>
            {saving ? "Saving…" : editingId ? "Save changes" : "Add student"}
          </ActionButton>
          {editingId && (
            <ActionButton tone="ghost" onClick={resetForm}>
              Cancel
            </ActionButton>
          )}
        </div>
      </form>
    </div>
  );
}

function Field({ label, children }) {
  return (
    <label className="block">
      <span className="block text-xs font-medium text-gray-600 mb-1">{label}</span>
      {children}
    </label>
  );
}

// ─── Excel import ────────────────────────────────────────────────────────────

function ImportExcel() {
  const [file, setFile] = useState(null);
  const [uploading, setUploading] = useState(false);
  const [summary, setSummary] = useState(null);
  const [error, setError] = useState("");

  const handleUpload = async () => {
    if (!file) return;
    setUploading(true);
    setError("");
    setSummary(null);
    try {
      const result = await studentService.importExcel(file);
      setSummary(result);
    } catch (err) {
      setError(err.message);
    } finally {
      setUploading(false);
    }
  };

  return (
    <div className="rounded-2xl p-4 sm:p-5 max-w-lg" style={glassCard}>
      <h2 className="text-sm font-semibold text-gray-900 mb-1" style={{ fontFamily: "Fredoka, sans-serif" }}>
        Import from Excel
      </h2>
      <p className="text-xs text-gray-500 mb-4">
        Columns required: Admission No, Student Name, Class, Date of Birth. Matching admission numbers update
        existing records.
      </p>

      <input
        type="file"
        accept=".xlsx,.xls"
        onChange={(e) => setFile(e.target.files?.[0] || null)}
        className="block w-full text-sm text-gray-700 mb-4 file:mr-3 file:rounded-xl file:border-0 file:bg-fuchsia-100 file:px-3 file:py-2 file:text-sm file:font-medium file:text-fuchsia-800"
      />

      <ActionButton onClick={handleUpload} disabled={!file || uploading}>
        {uploading ? "Uploading…" : "Upload & import"}
      </ActionButton>

      {error && <p className="text-sm text-red-600 mt-3">{error}</p>}

      {summary && (
        <div className="mt-4 rounded-xl p-3 bg-white/60 border border-white/70">
          <div className="grid grid-cols-4 gap-2 text-center mb-2">
            <Stat label="Total" value={summary.total} />
            <Stat label="Inserted" value={summary.inserted} tone="text-emerald-600" />
            <Stat label="Updated" value={summary.updated} tone="text-amber-600" />
            <Stat label="Failed" value={summary.failed} tone="text-red-600" />
          </div>
          {summary.errors?.length > 0 && (
            <ul className="text-xs text-red-600 mt-2 space-y-0.5 max-h-40 overflow-y-auto">
              {summary.errors.map((e, i) => (
                <li key={i}>{e}</li>
              ))}
            </ul>
          )}
        </div>
      )}
    </div>
  );
}

function Stat({ label, value, tone = "text-gray-800" }) {
  return (
    <div>
      <p className={`text-lg font-semibold ${tone}`}>{value}</p>
      <p className="text-[11px] text-gray-500">{label}</p>
    </div>
  );
}

// ─── Upcoming birthdays ──────────────────────────────────────────────────────

function UpcomingBirthdays() {
  const [days, setDays] = useState(7);
  const [students, setStudents] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const load = async () => {
    setLoading(true);
    setError("");
    try {
      const result = await studentService.upcomingBirthdays(days);
      setStudents(Array.isArray(result) ? result : []);
    } catch (err) {
      setError(err.message);
      setStudents([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    load();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [days]);

  return (
    <div className="rounded-2xl p-4 sm:p-5 max-w-lg" style={glassCard}>
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-sm font-semibold text-gray-900" style={{ fontFamily: "Fredoka, sans-serif" }}>
          Next {days} days
        </h2>
        <select
          value={days}
          onChange={(e) => setDays(Number(e.target.value))}
          className="rounded-xl px-2 py-1 text-sm bg-white/70 border border-white/80"
        >
          {[7, 14, 30].map((d) => (
            <option key={d} value={d}>
              {d} days
            </option>
          ))}
        </select>
      </div>

      {error && <p className="text-sm text-red-600 mb-3">{error}</p>}
      {loading && <p className="text-sm text-gray-500">Loading…</p>}
      {!loading && students.length === 0 && (
        <p className="text-sm text-gray-500 py-6 text-center">No upcoming birthdays in this window.</p>
      )}

      <div className="space-y-2">
        {students.map((s, i) => (
          <div
            key={i}
            className="flex items-center justify-between rounded-xl px-3 py-2.5 bg-white/60 border border-white/70"
          >
            <span className="text-sm font-medium text-gray-900">{s.studentName}</span>
            <span className="text-xs text-gray-500">
              Class {s.className} · {String(s.birthDay).padStart(2, "0")}/{String(s.birthMonth).padStart(2, "0")}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}