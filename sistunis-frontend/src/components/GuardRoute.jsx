// File: src/components/GuardRoute.jsx (NEW FILE)

import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

// Fungsi helper untuk cek token (sementara di sini)
const decodeToken = (token) => {
    try {
        if (!token) return null;
        // Logic decode dari LoginCard.jsx
        const payloadBase64 = token.split('.')[1];
        const base64 = payloadBase64.replace(/-/g, '+').replace(/_/g, '/');
        // Mendecode Base64 ke JSON
        const decodedJson = decodeURIComponent(atob(base64).split('').map(function (c) {
            return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
        }).join(''));

        return JSON.parse(decodedJson); // Mengembalikan seluruh payload
    } catch (error) {
        // Token invalid atau format salah (kadaluarsa)
        return null;
    }
};

const GuardRoute = ({ children, allowedRoles = [] }) => {
    const navigate = useNavigate();
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [userData, setUserData] = useState(null);

    useEffect(() => {
        const token = localStorage.getItem('token');
        if (!token) {
            // 1. Tidak Ada Token: Arahkan ke Login
            alert('Akses Ditolak! Anda harus login.');
            navigate('/login', { replace: true });
            return;
        }

        const decodedPayload = decodeToken(token);
        if (!decodedPayload) {
            // 2. Token Invalid/Kadaluarsa: Hapus & Arahkan ke Login
            localStorage.removeItem('token');
            alert('Sesi habis. Silakan login kembali.');
            navigate('/login', { replace: true });
            return;
        }

        const userRoleId = decodedPayload.user.role_id;

        // 3. Cek Role: Jika ada daftar role yang diizinkan (allowedRoles)
        if (allowedRoles.length > 0 && !allowedRoles.includes(userRoleId)) {
            // Role tidak diizinkan untuk rute ini
            alert('Akses Ditolak! Anda tidak memiliki izin.');
            navigate('/', { replace: true }); // Redirect ke Landing Page
            return;
        }

        // 4. Token Valid dan Role Sesuai: Izinkan akses
        setUserData(decodedPayload.user);
        setIsAuthenticated(true);
    }, [navigate, allowedRoles]);

    // Tampilkan loading atau komponen anak jika sudah terautentikasi
    return isAuthenticated ? children(userData) : <div className="p-10 text-center">Memuat otorisasi...</div>;
};

export default GuardRoute;