import axios from "axios";

const API_URL = import.meta.env.VITE_API_URL;

// Crea una instancia global para todas las peticiones
const api = axios.create({
    baseURL: API_URL,    // NO poner "/" extra si VITE_API_URL ya lo trae
    withCredentials: true,
});

// Importante: permitir cookies en CORS preflight
api.defaults.withCredentials = true;

export default api;
