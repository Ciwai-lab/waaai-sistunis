// File: src/config/api.js

import axios from 'axios';

// 💡 BASE URL BACKEND KAMU
const API_BASE_URL = 'http://13.214.127.23:3000/api';
// 1. Buat instance Axios
const api = axios.create({
    baseURL: API_BASE_URL,
    // Header default jika diperlukan
    headers: {
        'Content-Type': 'application/json',
    },
});

// 2. Export instance agar bisa dipakai di komponen manapun
export default api;

// Contoh fungsi helper untuk header Auth (akan kita pakai nanti!)
export const getAuthHeader = () => {
    // Ambil token dari LocalStorage
    const token = localStorage.getItem('token');

    if (token) {
        // Format wajib untuk JWT: "Bearer <token>"
        return {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        };
    } else {
        return {};
    }
};