import axios from "axios"

const API = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
  withCredentials: true
});

// Request Interceptor
// Auth is handled entirely via the httpOnly cookie sent by withCredentials.
// Do NOT attach a stale Authorization header from localStorage here — that
// was leftover from the old token-based flow and was causing the backend to
// reject otherwise-valid cookie sessions, triggering spurious 401s.
API.interceptors.request.use(
  (config) => config,
  (error) => Promise.reject(error)
);

// Dedupe concurrent refresh calls: the backend stores a single refreshToken
// per user and rotates it on use, so two 401s firing at the same instant
// would otherwise send the same (soon-to-be-stale) cookie twice — the second
// refresh call would get rejected even though the session is still valid.
// All callers that 401 while a refresh is already in flight just await the
// same promise instead of starting their own.
let refreshPromise = null;

const performRefresh = () => {
  if (!refreshPromise) {
    refreshPromise = axios
      .post(
        `${import.meta.env.VITE_API_URL}/api/v1/users/refresh-token`,
        {},
        { withCredentials: true }
      )
      .finally(() => {
        refreshPromise = null;
      });
  }
  return refreshPromise;
};

// Response Interceptor for handling 401s and Token Refresh
API.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;

      try {
        // We use raw axios here to avoid the interceptor loop.
        const res = await performRefresh();

        // If the refresh call returns a new accessToken in the body, update localStorage
        const newAccessToken = res.data.data?.accessToken;
        if (newAccessToken) {
          localStorage.setItem("accessToken", newAccessToken);
        }

        // Retry the original request
        return API(originalRequest);

      } catch (refreshError) {
        // If refresh fails, the session is truly dead
        localStorage.removeItem("user");
        localStorage.removeItem("accessToken");
        return Promise.reject(refreshError);
      }
    }

    return Promise.reject(error);
  }
);

export default API;