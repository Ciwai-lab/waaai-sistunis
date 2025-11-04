// File: src/config/api.js

import axios from 'axios';

// GANTI DENGAN IP PUBLIC EC2 DAN PORT BACKEND ENTE!
const API_BASE_URL = 'http://[IP_PUBLIC_EC2_ENTE]:3000/api';

const api = axios.create({
    baseURL: API_BASE_URL,
    timeout: 10000,
    headers: {
        'Content-Type': 'application/json',
    },
});

// ============================================
// === 🟢 INTERCEPTOR: Otomatis Tambah Token ===
// ============================================
api.interceptors.request.use(
    (config) => {
        // 1. Ambil token dari Local Storage (key-nya: 'sistunis_token')
        const token = localStorage.getItem('sistunis_token');

        // 2. Jika token ada, pasang di Header 'Authorization' dengan format Bearer
        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }

        return config;
    },
    (error) => {
        // Handling error request sebelum dikirim
        return Promise.reject(error);
    }
);
// ============================================

export default api;