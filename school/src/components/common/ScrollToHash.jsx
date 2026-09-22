import { useEffect } from "react";
import { useLocation } from "react-router-dom";

// Mount this once near the top of your app (e.g. in App.jsx, inside the Router).
// React Router's client-side navigation doesn't trigger the browser's native
// "scroll to #id" behavior, so we do it ourselves whenever the hash changes.
export default function ScrollToHash() {
  const { hash, pathname } = useLocation();

  useEffect(() => {
    if (!hash) return;

    const id = hash.replace("#", "");

    // Wait a tick so the target route/section has actually rendered
    // (important right after navigating from a different page).
    const timeout = setTimeout(() => {
      const el = document.getElementById(id);
      if (el) {
        el.scrollIntoView({ behavior: "smooth", block: "start" });
      }
    }, 80);

    return () => clearTimeout(timeout);
  }, [hash, pathname]);

  return null;
}