import { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import API from "../api/axios";

export default function AdminLogin() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [submitting, setSubmitting] = useState(false);

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
    <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
      <div className="w-full max-w-sm bg-white rounded-2xl shadow-lg p-8">
        <h1 className="text-xl font-semibold text-gray-900 mb-1">Staff Login</h1>
        <p className="text-sm text-gray-500 mb-6">
          Sign in to manage the gallery and notices.
        </p>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label htmlFor="username" className="block text-sm font-medium text-gray-700 mb-1">
              Username
            </label>
            <input
              id="username"
              type="text"
              autoComplete="username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-fuchsia-500 focus:border-transparent"
              disabled={submitting}
            />
          </div>

          <div>
            <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1">
              Password
            </label>
            <input
              id="password"
              type="password"
              autoComplete="current-password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-fuchsia-500 focus:border-transparent"
              disabled={submitting}
            />
          </div>

          {error && (
            <p className="text-sm text-red-600" role="alert">
              {error}
            </p>
          )}

          <button
            type="submit"
            disabled={submitting}
            className="w-full rounded-lg bg-fuchsia-800 text-white text-sm font-medium py-2.5 hover:bg-fuchsia-900 transition-colors disabled:opacity-60"
          >
            {submitting ? "Signing in…" : "Sign in"}
          </button>
        </form>
      </div>
    </div>
  );
}