// import axios from "axios"

// const API = axios.create({
//   baseURL: import.meta.env.VITE_API_URL,
//   withCredentials: true
// });

// // Request Interceptor
// // Auth is handled entirely via the httpOnly cookie sent by withCredentials.
// // Do NOT attach a stale Authorization header from localStorage here — that
// // was leftover from the old token-based flow and was causing the backend to
// // reject otherwise-valid cookie sessions, triggering spurious 401s.
// API.interceptors.request.use(
//   (config) => config,
//   (error) => Promise.reject(error)
// );

// // Dedupe concurrent refresh calls: the backend stores a single refreshToken
// // per user and rotates it on use, so two 401s firing at the same instant
// // would otherwise send the same (soon-to-be-stale) cookie twice — the second
// // refresh call would get rejected even though the session is still valid.
// // All callers that 401 while a refresh is already in flight just await the
// // same promise instead of starting their own.
// let refreshPromise = null;

// const performRefresh = () => {
//   if (!refreshPromise) {
//     refreshPromise = axios
//       .post(
//         `${import.meta.env.VITE_API_URL}/api/v1/users/refresh-token`,
//         {},
//         { withCredentials: true }
//       )
//       .finally(() => {
//         refreshPromise = null;
//       });
//   }
//   return refreshPromise;
// };

// // Response Interceptor for handling 401s and Token Refresh
// API.interceptors.response.use(
//   (response) => response,
//   async (error) => {
//     const originalRequest = error.config;

//     if (error.response?.status === 401 && !originalRequest._retry) {
//       originalRequest._retry = true;

//       try {
//         // We use raw axios here to avoid the interceptor loop.
//         const res = await performRefresh();

//         // If the refresh call returns a new accessToken in the body, update localStorage
//         const newAccessToken = res.data.data?.accessToken;
//         if (newAccessToken) {
//           localStorage.setItem("accessToken", newAccessToken);
//         }

//         // Retry the original request
//         return API(originalRequest);

//       } catch (refreshError) {
//         // If refresh fails, the session is truly dead
//         localStorage.removeItem("user");
//         localStorage.removeItem("accessToken");
//         return Promise.reject(refreshError);
//       }
//     }

//     return Promise.reject(error);
//   }
// );
// export default API;



import axios from "axios";

const API = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
  withCredentials: true,
  headers: {
    Accept: "application/json",
  },
});

let refreshPromise = null;

const refreshAccessToken = async () => {
  if (!refreshPromise) {
    refreshPromise = axios
      .post(
        `${import.meta.env.VITE_API_URL}/api/v1/users/refresh-token`,
        {},
        {
          withCredentials: true,
          headers: {
            Accept: "application/json",
          },
        }
      )
      .finally(() => {
        refreshPromise = null;
      });
  }

  return refreshPromise;
};

// Request interceptor
API.interceptors.request.use(
  (config) => {
    // Authentication is handled by httpOnly cookies.
    // Do NOT manually add Authorization from localStorage.
    config.withCredentials = true;

    return config;
  },
  (error) => Promise.reject(error)
);

// Response interceptor
API.interceptors.response.use(
  (response) => response,

  async (error) => {
    const originalRequest = error.config;

    // No response = network/CORS/browser problem
    if (!error.response) {
      return Promise.reject(error);
    }

    // Don't try to refresh the refresh-token request itself
    const isRefreshRequest = originalRequest?.url?.includes(
      "/api/v1/users/refresh-token"
    );

    if (
      error.response.status === 401 &&
      !originalRequest?._retry &&
      !isRefreshRequest
    ) {
      originalRequest._retry = true;

      try {
        await refreshAccessToken();

        // Retry original request.
        // Browser will automatically attach the httpOnly cookie.
        return API(originalRequest);
      } catch (refreshError) {
        console.error(
          "Session refresh failed:",
          refreshError.response?.data || refreshError.message
        );

        localStorage.removeItem("user");
        localStorage.removeItem("accessToken");

        return Promise.reject(refreshError);
      }
    }

    return Promise.reject(error);
  }
);

export default API;