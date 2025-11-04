// File: src/components/LoginCard.jsx

import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import api from '../config/api'; // 👈 Import Axios instance
// import { decodeToken } from '../utils/authUtils';

const decodeToken = (token) => {
  try {
    const payloadBase64 = token.split('.')[1];
    // Pastikan padding base64 jika diperlukan (untuk nodejs/browser compatibility)
    const base64 = payloadBase64.replace(/-/g, '+').replace(/_/g, '/');
    const decodedJson = decodeURIComponent(atob(base64).split('').map(function (c) {
      return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
    }).join(''));

    return JSON.parse(decodedJson).user;
  } catch (error) {
    console.error("Error decoding token:", error);
    return null;
  }
};

const LoginCard = () => {
  const navigate = useNavigate();
  // State untuk menyimpan input user
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // Handle perubahan input
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  // Handle submit form
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      // 🟢 Panggil endpoint Login dari backend
      const response = await api.post('/users/login', formData);
      const { token } = response.data;

      // const { token, message } = response.data;

      // 1. Simpan Token
      localStorage.setItem('token', token);

      // 2. Decode Token untuk mendapatkan Role ID
      const userPayload = decodeToken(token);
      const roleId = userPayload?.role_id; // Ambil role_id

      let redirectPath = '/'; // Default ke landing page

      // 3. Tentukan Redirect Path berdasarkan Role ID
      if (roleId === 5) { // 👈 Asumsi 5 = Wali Santri (Lihat role_id di DB)
        redirectPath = '/wali-santri/dashboard';
      } else if (roleId === 3) { // 👈 Asumsi 3 = Admin TU
        redirectPath = '/admin-tu/dashboard';
      } else if (roleId === 2) { // 👈 Asumsi 2 = Mudiir
        redirectPath = '/mudiir/dashboard';
      }

      // 4. Redirect!
      alert(`Login Sukses! Mengarahkan ke ${redirectPath}`);
      navigate(redirectPath, { replace: true });

    } catch (err) {
      // ... (sisa logic error)
      const errorMessage = err.response?.data?.message || 'Gagal login, coba cek koneksi atau input Anda.';
      setError(errorMessage);
      console.error('Login Error:', err);
    } finally {
      setLoading(false);
    }
  };


  return (
    // Container card dengan style Tailwind
    <div className="w-full max-w-sm bg-white shadow-xl rounded-lg p-8 border border-gray-200">

      {/* Header */}
      <h2 className="text-3xl font-bold text-center text-pink-600 mb-6">Login SISTUNIS</h2>

      {/* Error Message */}
      {error && (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative mb-4" role="alert">
          <span className="block sm:inline">{error}</span>
        </div>
      )}

      {/* Form */}
      <form onSubmit={handleSubmit}>

        {/* Input Email */}
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-semibold mb-2" htmlFor="email">
            Email
          </label>
          <input
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            id="email"
            type="email"
            name="email"
            placeholder="contoh@sistunis.com"
            value={formData.email}
            onChange={handleChange}
            required
            disabled={loading}
          />
        </div>

        {/* Input Password */}
        <div className="mb-6">
          <label className="block text-gray-700 text-sm font-semibold mb-2" htmlFor="password">
            Password
          </label>
          <input
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"
            id="password"
            type="password"
            name="password"
            placeholder="********"
            value={formData.password}
            onChange={handleChange}
            required
            disabled={loading}
          />
        </div>

        {/* Tombol Submit */}
        <div className="flex items-center justify-between">
          <button
            className={`w-full font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline transition duration-150 ${loading ? 'bg-pink-400 cursor-not-allowed' : 'bg-pink-600 hover:bg-pink-700 text-white'
              }`}
            type="submit"
            disabled={loading}
          >
            {loading ? 'Memproses...' : 'Login Sistem'}
          </button>
        </div>

      </form>

      {/* Footer Card */}
      <p className="text-center text-gray-500 text-xs mt-6">
        &copy;2024 SISTUNIS. All rights reserved.
      </p>
    </div>
  );
};

export default LoginCard;