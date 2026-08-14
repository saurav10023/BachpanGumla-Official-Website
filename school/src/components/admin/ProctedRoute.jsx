import { Navigate, Outlet, useLocation } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";

/**
 * Wrap admin-only routes with this. Usage in your router:
 *
 *   <Route element={<ProtectedRoute />}>
 *     <Route path="/admin/dashboard" element={<AdminDashboard />} />
 *   </Route>
 *
 * Important: this waits for `loading` to resolve before deciding anything.
 * Redirecting based on a stale `user` read from localStorage (before the
 * /me call confirms the cookie session is still valid) is exactly the
 * flicker/wrong-state bug flagged earlier in AuthContext — don't gate on
 * `user` alone here.
 */
export default function ProtectedRoute() {
  const { user, loading } = useAuth();
  const location = useLocation();

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-sm text-gray-500">Checking session…</p>
      </div>
    );
  }

  if (!user) {
    return <Navigate to="/admin/login" state={{ from: location }} replace />;
  }

  return <Outlet />;
}