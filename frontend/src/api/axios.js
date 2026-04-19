import axios from 'axios';

const api = axios.create({
    baseURL: '/api', // Use Vite proxy (configured in vite.config.js)
    withCredentials: true
});

export default api;
