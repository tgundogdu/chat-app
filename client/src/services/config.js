import axios from "axios";

const customAxios = axios.create();

customAxios.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token");
    if (token) {
      config.headers["Authorization"] = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

customAxios.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    if (error.response.status === 401) {
      window.location.href = "/login";
    } else {
      return Promise.reject(error);
    }
  }
);

const baseUrl = process.env.REACT_APP_API_BASE_URL;

export { customAxios, baseUrl };
