// File: src/pages/AdminTUDashboard.jsx (NEW FILE)

import React, { useState } from 'react';
import DashboardNavbar from '../components/DashboardNavbar';
import axios from 'axios';

const AdminTUDashboard = ({ user }) => {

    // --- STATE UNTUK SCANNER ---
    const api = axios.create({
        baseURL: 'http://13.214.127.23:3000/api', // Sesuaikan URL backend kamu
        headers: { 'Content-Type': 'application/json' }
    });
    // State untuk input QR Code
    const [qrCodeUid, setQrCodeUid] = useState('');
    // State untuk data santri yang ditemukan
    const [studentData, setStudentData] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const [withdrawAmount, setWithdrawAmount] = useState('');

    const handleSubmitScan = async (e) => {
        e.preventDefault();
        setError(null);
        setStudentData(null);
        setLoading(true);

        const token = localStorage.getItem('token');
        if (!token) {
            setError('Error: Token login tidak ditemukan.');
            setLoading(false);
            return;
        }

        try {
            const response = await api.post('/scanner/scan',
                { qr_code_uid: qrCodeUid },
                {
                    headers: {
                        // 🟢 STEP 2: GANTI HEADER LAMA (x-auth-token)
                        'Authorization': `Bearer ${token}`
                    }
                }
            );

            if (response.data.status === 'success') {
                setStudentData(response.data.data);
                alert(`Santri ${response.data.data.name} ditemukan!`);
            }
        } catch (err) {
            // Tampilkan pesan error dari backend
            const msg = err.response?.data?.message || 'Gagal memindai QR Code. Coba lagi.';
            setError(msg);
        } finally {
            setLoading(false);
        }
    };

    const handleSubmitWithdraw = async (e) => {
        e.preventDefault();
        setError(null);
        setLoading(true);

        if (!studentData) {
            setError('Silakan pindai QR Code santri terlebih dahulu.');
            setLoading(false);
            return;
        }

        const amount = parseInt(withdrawAmount, 10);
        if (isNaN(amount) || amount <= 0) {
            setError('Jumlah penarikan tidak valid.');
            setLoading(false);
            return;
        }

        try {
            const token = localStorage.getItem('token');

            const response = await api.post('/scanner/withdraw', // Panggil endpoint withdraw
                {
                    qr_code_uid: studentData.qr_code_uid, // Gunakan UID dari data santri
                    nominal: amount
                },
                {
                    headers: {
                        // 🟢 PERBAIKAN HEADER DI WITHDRAW JUGA!
                        'Authorization': `Bearer ${token}`
                    }
                }
            );

            if (response.data.status === 'success') {
                alert(`✅ Penarikan Rp${amount.toLocaleString('id-ID')} Berhasil! Saldo Baru: Rp${parseFloat(response.data.new_balance).toLocaleString('id-ID')}`);

                // Reset form dan update data santri di UI
                setStudentData(prev => ({
                    ...prev,
                    current_balance: response.data.new_balance,
                    qr_code_uid: null // Hapus UID agar harus scan lagi
                }));
                setWithdrawAmount('');
                setQrCodeUid('');
            }
        } catch (err) {
            const msg = err.response?.data?.message || 'Gagal memproses penarikan.';
            setError(msg);
        } finally {
            setLoading(false);
        }
    };

    // ... (Logika akan ditambahkan di sini) ...

    return (
        <>
            <DashboardNavbar userName={user?.name || 'Admin TU'} />
            <div className="p-8 max-w-7xl mx-auto">
                <h1 className="text-3xl font-bold text-pink-700 mb-6">
                    Dashboard Admin Tata Usaha
                </h1>
                <p className="mb-8">Selamat bertugas, **{user?.name || 'Admin TU'}** (Role ID: **{user?.role_id}**).</p>

                <div className="bg-white p-6 rounded-lg shadow-xl">
                    <h2 className="text-2xl font-semibold mb-4 text-gray-800">Scanner Penarikan Uang Saku</h2>

                    <form onSubmit={handleSubmitScan} className="flex items-center space-x-3 mb-6">
                        <input
                            type="text"
                            className="flex-grow p-2 border border-gray-300 rounded focus:ring-pink-500 focus:border-pink-500"
                            placeholder="Scan atau Masukkan QR Code UID Santri"
                            value={qrCodeUid}
                            onChange={(e) => setQrCodeUid(e.target.value)}
                            required
                            disabled={loading}
                        />
                        <button
                            type="submit"
                            className="bg-pink-600 text-white py-2 px-4 rounded hover:bg-pink-700 disabled:bg-gray-400"
                            disabled={loading}
                        >
                            {loading ? 'Memindai...' : 'Pindai'}
                        </button>
                    </form>

                    {error && (
                        <div className="p-3 bg-red-100 text-red-700 rounded mb-4">
                            🚨 {error}
                        </div>
                    )}

                    {studentData && (
                        <div className="border-t pt-4">
                            <h3 className="text-xl font-bold text-green-700 mb-2">
                                {studentData.name} Ditemukan!
                            </h3>
                            <p>NIS: {studentData.nis}</p>
                            <p>Saldo Saat Ini: **Rp{parseFloat(studentData.current_balance).toLocaleString('id-ID')}**</p>

                            {studentData && (
                                <div className="border-t pt-4">
                                    <h3 className="text-xl font-bold text-green-700 mb-2">
                                        {studentData.name} Ditemukan!
                                    </h3>
                                    <p>NIS: {studentData.nis}</p>
                                    <p className="font-semibold text-lg mb-4">
                                        Saldo Saat Ini: **Rp{parseFloat(studentData.current_balance).toLocaleString('id-ID')}**
                                    </p>

                                    {/* 💡 FORM PENARIKAN UANG SAKU */}
                                    <form onSubmit={handleSubmitWithdraw} className="space-y-4 p-4 border rounded bg-gray-50">
                                        <label className="block text-gray-700 font-medium">
                                            Jumlah Penarikan (Rp)
                                        </label>
                                        <input
                                            type="number"
                                            className="w-full p-2 border border-gray-300 rounded focus:ring-pink-500 focus:border-pink-500"
                                            placeholder="Contoh: 10000"
                                            value={withdrawAmount}
                                            onChange={(e) => setWithdrawAmount(e.target.value)}
                                            min="1"
                                            required
                                            disabled={loading}
                                        />

                                        <button
                                            type="submit"
                                            className="w-full bg-green-600 text-white py-2 px-4 rounded hover:bg-green-700 disabled:bg-gray-400 font-semibold"
                                            disabled={loading || !withdrawAmount || withdrawAmount > studentData.current_balance}
                                        >
                                            {loading ? 'Memproses...' : 'Tarik Uang Saku'}
                                        </button>

                                        {withdrawAmount > studentData.current_balance && (
                                            <p className="text-red-500 text-sm">Jumlah penarikan melebihi saldo santri.</p>
                                        )}
                                    </form>
                                </div>
                            )}
                        </div>
                    )}
                </div>
            </div>
        </>
    );
};

export default AdminTUDashboard;