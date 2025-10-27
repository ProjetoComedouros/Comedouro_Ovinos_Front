// src/api/api.js
import axios from "axios";

const api = axios.create({
    baseURL: "https://comedouros.onrender.com/", 
});

export default api;