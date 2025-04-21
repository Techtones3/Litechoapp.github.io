// src/utils/api.js
import axios from "axios";

const api = axios.create({
  baseURL: "https://techtones-flaskapp-1.onrender.com", // ✅ Your Render backend
});


export default api;
