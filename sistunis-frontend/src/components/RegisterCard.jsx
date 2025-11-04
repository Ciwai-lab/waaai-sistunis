// File: src/components/RegisterCard.jsx (NEW FILE)

import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom'; // Untuk navigasi setelah sukses
import api from '../config/api';

const RegisterCard = () => {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        password: '',
        role_id: 3,
    });
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [success, setSuccess] = useState(false);

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError(null);
        setSuccess(false);

        try {
            // 🟢 Panggil endpoint Register: /api/users/register
            await api.post('/users/register', formData);

            setSuccess(true);
            // Langsung redirect ke halaman login setelah 2 detik
            setTimeout(() => {
                navigate('/login');
            }, 2000);

        } catch (err) {
            const errorMessage = err.response?.data?.message || 'Gagal registrasi, coba cek input Anda.';
            setError(errorMessage);
            console.error('Register Error:', err);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="w-full max-w-md bg-white shadow-xl rounded-lg p-8 border border-gray-200">
            <h2 className="text-3xl font-bold text-center text-pink-600 mb-6">Daftar Akun SISTUNIS</h2>

            {/* Success Message */}
            {success && (
                <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded relative mb-4">
                    <span className="block sm:inline">Registrasi SUKSES! Mengarahkan ke halaman Login...</span>
                </div>
            )}

            {/* Error Message */}
            {error && (
                <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative mb-4">
                    <span className="block sm:inline">{error}</span>
                </div>
            )}

            <form onSubmit={handleSubmit}>

                {/* Input Name */}
                <div className="mb-4">
                    <label className="block text-gray-700 text-sm font-semibold mb-2" htmlFor="name">Nama Lengkap</label>
                    <input
                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                        id="name" type="text" name="name" placeholder="Nama Anda" value={formData.name} onChange={handleChange} required disabled={loading}
                    />
                </div>

                {/* Input Email */}
                <div className="mb-4">
                    <label className="block text-gray-700 text-sm font-semibold mb-2" htmlFor="email">Email</label>
                    <input
                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                        id="email" type="email" name="email" placeholder="email@contoh.com" value={formData.email} onChange={handleChange} required disabled={loading}
                    />
                </div>

                {/* Input Password */}
                <div className="mb-6">
                    <label className="block text-gray-700 text-sm font-semibold mb-2" htmlFor="password">Password</label>
                    <input
                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"
                        id="password" type="password" name="password" placeholder="********" value={formData.password} onChange={handleChange} required disabled={loading}
                    />
                </div>

                {/* Tombol Submit */}
                <div className="flex flex-col items-center justify-between gap-3">
                    <button
                        className={`w-full font-bold py-2 px-4 rounded transition duration-150 ${loading ? 'bg-pink-400 cursor-not-allowed' : 'bg-pink-600 hover:bg-pink-700 text-white'
                            }`}
                        type="submit"
                        disabled={loading}
                    >
                        {loading ? 'Mendaftar...' : 'Daftar Sekarang'}
                    </button>

                    <Link to="/login" className="text-sm text-pink-600 hover:text-pink-800">
                        Sudah punya akun? Login di sini.
                    </Link>
                </div>

            </form>
            <p className="text-center text-gray-500 text-xs mt-6">&copy;2024 SISTUNIS. All rights reserved.</p>
        </div>
    );
};

export default RegisterCard;