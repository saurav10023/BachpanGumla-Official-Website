import { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import API from "../api/axios";

export default function AdminLogin() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const { login } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  // If ProtectedRoute redirected here, send the admin back to where they
  // were headed once they log in successfully.
  const redirectTo = location.state?.from?.pathname || "/admin/dashboard";

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    if (!username.trim() || !password) {
      setError("Username and password are required.");
      return;
    }

    setSubmitting(true);
    try {
      const res = await API.post("/api/v1/users/login", {
        username: username.trim(),
        password,
      });

      // Backend returns the logged-in user as res.data.data; cookies are
      // set automatically via withCredentials, so there's nothing else to
      // store beyond what AuthContext.login keeps in memory/localStorage.
      login({ user: res.data.data });

      navigate(redirectTo, { replace: true });
    } catch (err) {
      const status = err.response?.status;
      if (status === 401) {
        setError("Invalid username or password.");
      } else if (status === 403) {
        setError(err.response?.data?.message || "This account has been disabled.");
      } else {
        setError("Something went wrong. Please try again.");
      }
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="relative min-h-screen flex items-center justify-center overflow-hidden px-4 py-12 bg-gradient-to-br from-fuchsia-50 via-white to-amber-50">
      {/* Drifting gradient blobs */}
      <div
        className="pointer-events-none absolute -top-32 -left-32 w-[26rem] h-[26rem] rounded-full blur-3xl opacity-40 motion-safe:animate-[blob1_15s_ease-in-out_infinite]"
        style={{ background: "radial-gradient(circle, #a21caf, transparent 70%)" }}
      />
      <div
        className="pointer-events-none absolute -bottom-40 -right-24 w-[30rem] h-[30rem] rounded-full blur-3xl opacity-40 motion-safe:animate-[blob2_17s_ease-in-out_infinite]"
        style={{ background: "radial-gradient(circle, #f59e0b, transparent 70%)" }}
      />
      <div
        className="pointer-events-none absolute top-1/3 right-1/4 w-72 h-72 rounded-full blur-3xl opacity-30 motion-safe:animate-[blob3_13s_ease-in-out_infinite]"
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
          from { opacity: 0; transform: translateY(18px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .fade-up { animation: fadeUp 0.6s ease-out both; }
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
          background: linear-gradient(115deg, transparent, rgba(255,255,255,0.65), transparent);
          transform: skewX(-18deg);
          transition: left 0.75s ease;
        }
        .glass-shine:hover::after { left: 130%; }
      `}</style>

      {/* Login card */}
      <div
        className="fade-up relative w-full max-w-sm rounded-3xl p-8 sm:p-9"
        style={{
          background: "rgba(255,255,255,0.55)",
          border: "1px solid rgba(255,255,255,0.75)",
          backdropFilter: "blur(16px)",
          WebkitBackdropFilter: "blur(16px)",
          boxShadow:
            "0 10px 26px -14px rgba(162,28,175,0.3), inset 0 1px 0 rgba(255,255,255,0.85)",
        }}
      >
        {/* Icon chip */}
        <div
          className="mx-auto mb-5 flex h-14 w-14 items-center justify-center rounded-2xl"
          style={{
            background: "linear-gradient(150deg, rgba(162,28,175,0.2), rgba(245,158,11,0.14))",
            border: "1px solid rgba(255,255,255,0.75)",
            backdropFilter: "blur(10px)",
            boxShadow:
              "inset 0 1px 0 rgba(255,255,255,0.7), 0 6px 14px -8px rgba(162,28,175,0.35)",
          }}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-7 w-7 text-fuchsia-800"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={1.75}
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7zM19 8v4m2-2h-4"
            />
          </svg>
        </div>

        {/* Eyebrow pill */}
        <div className="flex justify-center mb-4">
          <span
            className="inline-flex items-center gap-2 rounded-full px-4 py-2 text-[13px] font-semibold text-fuchsia-900"
            style={{
              background: "rgba(255,255,255,0.55)",
              border: "1px solid rgba(255,255,255,0.8)",
              backdropFilter: "blur(14px)",
              boxShadow:
                "0 8px 20px -10px rgba(162,28,175,0.35), inset 0 1px 0 rgba(255,255,255,0.9)",
            }}
          >
            <span className="h-1.5 w-1.5 rounded-full" style={{ background: "#a21caf" }} />
            Staff Access
          </span>
        </div>

        <h1 className="text-center text-2xl font-semibold text-gray-900 mb-1" style={{ fontFamily: "Fredoka, sans-serif" }}>
          Welcome back
        </h1>
        <p className="text-center text-sm text-gray-600 mb-7">
          Sign in to manage the gallery and notices.
        </p>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label htmlFor="username" className="block text-sm font-medium text-gray-700 mb-1.5">
              Username
            </label>
            <input
              id="username"
              type="text"
              autoComplete="username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="w-full rounded-xl px-3.5 py-2.5 text-sm text-gray-900 placeholder-gray-400 outline-none transition focus:ring-2 focus:ring-fuchsia-500/60"
              style={{
                background: "rgba(255,255,255,0.6)",
                border: "1px solid rgba(255,255,255,0.85)",
                backdropFilter: "blur(10px)",
                boxShadow: "inset 0 1px 0 rgba(255,255,255,0.7)",
              }}
              placeholder="Enter your username"
              disabled={submitting}
            />
          </div>

          <div>
            <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1.5">
              Password
            </label>
            <div className="relative">
              <input
                id="password"
                type={showPassword ? "text" : "password"}
                autoComplete="current-password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full rounded-xl px-3.5 py-2.5 pr-11 text-sm text-gray-900 placeholder-gray-400 outline-none transition focus:ring-2 focus:ring-fuchsia-500/60"
                style={{
                  background: "rgba(255,255,255,0.6)",
                  border: "1px solid rgba(255,255,255,0.85)",
                  backdropFilter: "blur(10px)",
                  boxShadow: "inset 0 1px 0 rgba(255,255,255,0.7)",
                }}
                placeholder="Enter your password"
                disabled={submitting}
              />
              <button
                type="button"
                onClick={() => setShowPassword((s) => !s)}
                className="absolute inset-y-0 right-0 flex items-center px-3 text-gray-500 hover:text-fuchsia-700 transition-colors"
                tabIndex={-1}
                aria-label={showPassword ? "Hide password" : "Show password"}
              >
                {showPassword ? (
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-4.5 w-4.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.75}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M3.98 8.223A10.477 10.477 0 001.934 12C3.226 16.338 7.244 19.5 12 19.5c.993 0 1.953-.138 2.863-.395M6.228 6.228A10.45 10.45 0 0112 4.5c4.756 0 8.773 3.162 10.065 7.498a10.523 10.523 0 01-4.293 5.774M6.228 6.228L3 3m3.228 3.228l3.65 3.65m7.894 7.894L21 21m-3.228-3.228l-3.65-3.65m0 0a3 3 0 10-4.243-4.243m4.242 4.242L9.88 9.88" />
                  </svg>
                ) : (
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-4.5 w-4.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.75}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M2.036 12.322a1.012 1.012 0 010-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178z" />
                    <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                )}
              </button>
            </div>
          </div>

          {error && (
            <div
              className="rounded-xl px-3.5 py-2.5 text-sm text-red-700"
              style={{
                background: "rgba(254,226,226,0.7)",
                border: "1px solid rgba(252,165,165,0.6)",
                backdropFilter: "blur(6px)",
              }}
              role="alert"
            >
              {error}
            </div>
          )}

          <button
            type="submit"
            disabled={submitting}
            className="glass-shine w-full rounded-xl py-2.5 text-sm font-semibold text-white transition-all hover:-translate-y-0.5 disabled:opacity-60 disabled:hover:translate-y-0"
            style={{
              background: "linear-gradient(135deg, #a21caf, #86198f)",
              boxShadow: "0 10px 22px -10px rgba(162,28,175,0.55), inset 0 1px 0 rgba(255,255,255,0.25)",
            }}
          >
            {submitting ? (
              <span className="inline-flex items-center gap-2">
                <svg className="h-4 w-4 animate-spin" viewBox="0 0 24 24" fill="none">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z" />
                </svg>
                Signing in…
              </span>
            ) : (
              "Sign in"
            )}
          </button>
        </form>
      </div>
    </div>
  );
}