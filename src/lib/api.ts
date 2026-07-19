import axios from "axios";

const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

api.interceptors.request.use((config) => {
  if (typeof window !== "undefined") {


    const token =
  localStorage.getItem("token") ||
  localStorage.getItem("committeeToken") ||
  localStorage.getItem("parishToken");



    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
  }

  return config;
});

api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (
      error.response?.status === 401 &&
      typeof window !== "undefined"
    ) {
      if (
  error.response?.status === 401 &&
  typeof window !== "undefined"
) {

  if (localStorage.getItem("committeeToken")) {

    localStorage.removeItem("committeeToken");
    localStorage.removeItem("committeeUser");
    localStorage.removeItem("activeCommittee");

    window.location.href = "/committee/login";

  } else if (localStorage.getItem("token")) {

    localStorage.removeItem("token");
    localStorage.removeItem("admin");

    window.location.href = "/admin/login";

  } else if (localStorage.getItem("parishToken")) {

    localStorage.removeItem("parishToken");
    localStorage.removeItem("parish");

    window.location.href = "/parish/login";

  }

};
    }

    return Promise.reject(error);
  }
);


export default api;