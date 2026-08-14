import { useState } from "react";
import { useAuth } from "../context/AuthContext";
import AlbumsPanel from "../components/admin/Albumspanel";
import NoticesPanel from "../components/admin/Noticespanel";

const TABS = [
  { key: "albums", label: "Gallery" },
  { key: "notices", label: "Notices" },
];

export default function AdminDashboard() {
  const { user, logout } = useAuth();
  const [activeTab, setActiveTab] = useState("albums");

  return (
    <div className="relative min-h-screen overflow-hidden bg-gradient-to-br from-fuchsia-50 via-white to-amber-50">
      {/* Drifting gradient blobs */}
      <div
        className="pointer-events-none fixed -top-40 -left-32 w-[28rem] h-[28rem] rounded-full blur-3xl opacity-30 motion-safe:animate-[blob1_16s_ease-in-out_infinite]"
        style={{ background: "radial-gradient(circle, #a21caf, transparent 70%)" }}
      />
      <div
        className="pointer-events-none fixed -bottom-48 -right-24 w-[32rem] h-[32rem] rounded-full blur-3xl opacity-30 motion-safe:animate-[blob2_18s_ease-in-out_infinite]"
        style={{ background: "radial-gradient(circle, #f59e0b, transparent 70%)" }}
      />
      <div
        className="pointer-events-none fixed top-1/2 left-1/2 w-72 h-72 rounded-full blur-3xl opacity-20 motion-safe:animate-[blob3_14s_ease-in-out_infinite]"
        style={{ background: "radial-gradient(circle, #86198f, transparent 70%)" }}
      />

      <style>{`
        @keyframes blob1 {
          0%, 100% { transform: translate(0,0) scale(1); }
          50% { transform: translate(40px, 30px) scale(1.08); }
        }
        @keyframes blob2 {
          0%, 100% { transform: translate(0,0) scale(1); }
          50% { transform: translate(-30px, -40px) scale(1.1); }
        }
        @keyframes blob3 {
          0%, 100% { transform: translate(0,0) scale(1); }
          50% { transform: translate(-25px, 25px) scale(0.95); }
        }
        @keyframes fadeUp {
          from { opacity: 0; transform: translateY(14px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .fade-up { animation: fadeUp 0.5s ease-out both; }
        @media (prefers-reduced-motion: reduce) {
          .fade-up, [class*="motion-safe:animate-"] { animation: none !important; }
        }
        .glass-shine { position: relative; overflow: hidden; isolation: isolate; }
        .glass-shine::after {
          content: "";
          position: absolute;
          top: 0;
          left: -60%;
          width: 40%;
          height: 100%;
          background: linear-gradient(115deg, transparent, rgba(255,255,255,0.6), transparent);
          transform: skewX(-18deg);
          transition: left 0.75s ease;
        }
        .glass-shine:hover::after { left: 130%; }
      `}</style>

      {/* Header */}
      <header
        className="fade-up sticky top-0 z-30 pt-[env(safe-area-inset-top)]"
        style={{
          background: "rgba(255,255,255,0.55)",
          borderBottom: "1px solid rgba(255,255,255,0.75)",
          backdropFilter: "blur(16px)",
          WebkitBackdropFilter: "blur(16px)",
          boxShadow: "0 10px 26px -18px rgba(162,28,175,0.3)",
        }}
      >
        <div className="max-w-5xl mx-auto px-4 sm:px-6 py-4 flex items-center justify-between gap-4">
          <div className="flex items-center gap-3 min-w-0">
            <div
              className="hidden sm:flex h-10 w-10 shrink-0 items-center justify-center rounded-xl"
              style={{
                background: "linear-gradient(150deg, rgba(162,28,175,0.2), rgba(245,158,11,0.14))",
                border: "1px solid rgba(255,255,255,0.75)",
                backdropFilter: "blur(10px)",
                boxShadow: "inset 0 1px 0 rgba(255,255,255,0.7), 0 6px 14px -8px rgba(162,28,175,0.35)",
              }}
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-fuchsia-800" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.75}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M9 3v18M3 9h18M3 15h18" />
              </svg>
            </div>
            <div className="min-w-0">
              <h1 className="text-base sm:text-lg font-semibold text-gray-900 truncate" style={{ fontFamily: "Fredoka, sans-serif" }}>
                Admin dashboard
              </h1>
              {user?.name && (
                <p className="text-xs sm:text-sm text-gray-600 truncate">Signed in as {user.name}</p>
              )}
            </div>
          </div>

          <button
            onClick={logout}
            className="glass-shine shrink-0 inline-flex items-center gap-1.5 rounded-xl px-3.5 py-2 text-sm font-medium text-gray-700 transition-all hover:-translate-y-0.5"
            style={{
              background: "rgba(255,255,255,0.6)",
              border: "1px solid rgba(255,255,255,0.85)",
              backdropFilter: "blur(10px)",
              boxShadow: "inset 0 1px 0 rgba(255,255,255,0.7)",
            }}
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.75}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
            </svg>
            <span className="hidden sm:inline">Log out</span>
          </button>
        </div>
      </header>

      {/* Tabs */}
      <nav className="fade-up relative z-20 max-w-5xl mx-auto px-4 sm:px-6 pt-6">
        <div
          className="inline-flex gap-1 rounded-2xl p-1.5"
          style={{
            background: "rgba(255,255,255,0.5)",
            border: "1px solid rgba(255,255,255,0.75)",
            backdropFilter: "blur(14px)",
            boxShadow: "0 8px 20px -12px rgba(162,28,175,0.3), inset 0 1px 0 rgba(255,255,255,0.85)",
          }}
        >
          {TABS.map((tab) => {
            const active = activeTab === tab.key;
            return (
              <button
                key={tab.key}
                onClick={() => setActiveTab(tab.key)}
                className={`relative px-4 sm:px-5 py-2 text-sm font-semibold rounded-xl transition-all ${
                  active ? "text-white" : "text-gray-600 hover:text-fuchsia-800"
                }`}
                style={
                  active
                    ? {
                        background: "linear-gradient(135deg, #a21caf, #86198f)",
                        boxShadow: "0 8px 18px -8px rgba(162,28,175,0.55), inset 0 1px 0 rgba(255,255,255,0.25)",
                      }
                    : undefined
                }
              >
                {tab.label}
              </button>
            );
          })}
        </div>
      </nav>

      {/* Main content */}
      <main className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 py-6 sm:py-8">
        <div
          className="fade-up rounded-3xl p-4 sm:p-6"
          style={{
            background: "rgba(255,255,255,0.55)",
            border: "1px solid rgba(255,255,255,0.75)",
            backdropFilter: "blur(16px)",
            WebkitBackdropFilter: "blur(16px)",
            boxShadow: "0 10px 26px -14px rgba(162,28,175,0.25), inset 0 1px 0 rgba(255,255,255,0.85)",
          }}
        >
          {activeTab === "albums" && <AlbumsPanel />}
          {activeTab === "notices" && <NoticesPanel />}
        </div>
      </main>
    </div>
  );
}