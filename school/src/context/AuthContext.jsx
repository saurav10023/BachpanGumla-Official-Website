import { createContext, useContext, useEffect, useRef, useState } from "react";
import API from "../api/axios";

const AuthContext = createContext(undefined);

export const AuthProvider = ({ children }) => {
  const [user, setUser]       = useState(null);
  const [loading, setLoading] = useState(true);

  // Guards against setState-after-unmount if the provider unmounts (or
  // remounts under fast refresh) before the initial /me call resolves.
  const mountedRef = useRef(true);

  const refreshUser = async () => {
    try {
      const res = await API.get("/api/v1/users/me");
      if (!mountedRef.current) return;
      setUser(res.data.data);
      localStorage.setItem("user", JSON.stringify(res.data.data));
    } catch (error) {
      if (!mountedRef.current) return;
      // Only wipe session on a real 401 — not network errors or server hiccups
      if (error.response?.status === 401) {
        clearUser();
      }
    } finally {
      if (mountedRef.current) setLoading(false);
    }
  };

  useEffect(() => {
    mountedRef.current = true;

    const storedUser = localStorage.getItem("user");
    if (storedUser && storedUser !== "undefined") {
      try {
        setUser(JSON.parse(storedUser));
      } catch (err) {
        console.warn("Corrupted user in localStorage:", err);
        localStorage.removeItem("user");
      }
    }

    refreshUser();

    return () => {
      mountedRef.current = false;
    };
  }, []);

  const login = (data) => {
    setUser(data.user);
    localStorage.setItem("user", JSON.stringify(data.user));
  };

  const clearUser = () => {
    localStorage.removeItem("user");
    setUser(null);
  };

  const logout = async () => {
    try {
      await API.post("/api/v1/users/logout");
    } catch (err) {
      console.error("Logout error", err);
    } finally {
      clearUser();
    }
  };

  return (
    <AuthContext.Provider value={{ user, login, logout, setUser, refreshUser, loading }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const ctx = useContext(AuthContext);
  if (ctx === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return ctx;
};