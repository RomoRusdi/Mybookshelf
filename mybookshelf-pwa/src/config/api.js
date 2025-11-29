import axios from 'axios';

// Pastikan Backend Node.js Anda sudah berjalan di port 3000
const API_BASE_URL = 'http://localhost:3000/api';

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

export default api;