import API from "../api/axios"; // adjust path to wherever your axios instance lives

const BASE_URL = "/api/v1/students"; // relative to API's baseURL (import.meta.env.VITE_API_URL)

export const studentService = {
  list: async ({ page = 1, limit = 20, search = "", className = "" } = {}) => {
    const params = new URLSearchParams({ page, limit });
    if (search) params.set("search", search);
    if (className) params.set("className", className);
    const res = await API.get(`${BASE_URL}?${params.toString()}`);
    return res.data?.data;
  },

  getById: async (id) => {
    const res = await API.get(`${BASE_URL}/${id}`);
    return res.data?.data;
  },

  create: async (student) => {
    const res = await API.post(BASE_URL, student);
    return res.data?.data;
  },

  update: async (id, student) => {
    const res = await API.put(`${BASE_URL}/${id}`, student);
    return res.data?.data;
  },

  remove: async (id) => {
    const res = await API.delete(`${BASE_URL}/${id}`);
    return res.data?.data;
  },

  importExcel: async (file) => {
    const formData = new FormData();
    formData.append("file", file);
    const res = await API.post(`${BASE_URL}/import`, formData, {
      headers: { "Content-Type": "multipart/form-data" },
    });
    return res.data?.data;
  },

  upcomingBirthdays: async (days = 7) => {
    const res = await API.get(`${BASE_URL}/birthdays/upcoming?days=${days}`);
    return res.data?.data;
  },
};