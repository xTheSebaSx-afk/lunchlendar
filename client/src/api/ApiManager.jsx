import axios from "axios";

const API_URL = import.meta.env.VITE_ENVIRONMENT == "production" ? import.meta.env.VITE_API_URL : import.meta.env.VITE_API_UR_BASE;

const api = axios.create({
    baseURL: API_URL,
    withCredentials: true,
});

api.defaults.withCredentials = true;

export default api;
