// File: src/components/Login.jsx
import React, { useState } from 'react';
import api from '../config/api'; // Pastikan path ke api.js benar

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [message, setMessage] = useState('');
    const [loading, setLoading] = useState(false);

    const handleLogin = async (e) => {
        e.preventDefault(); // Mencegah refresh halaman
        setMessage('');
        setLoading(true);

        try {
            // Endpoint login yang ente buat di server.js: /api/users/login
            const response = await api.post('/users/login', { email, password });

            const token = response.data.token;
            setMessage('✅ Login SUKSES! Token: ' + token.substring(0, 30) + '...');

            // Di sini ente harus simpan token ke Local Storage/Context!
            localStorage.setItem('sistunis_token', token);

        } catch (error) {
            // Mengambil pesan error dari response backend ente
            const errorMessage = error.response?.data?.message || '🚨 Koneksi atau Server Error. Cek EC2!';
            setMessage(errorMessage);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div style={{ padding: '20px', maxWidth: '400px', margin: '50px auto', border: '1px solid #ccc', borderRadius: '8px' }}>
            <h3>🔑 Login SISTUNIS</h3>
            <form onSubmit={handleLogin}>
                <div style={{ marginBottom: '15px' }}>
                    <label>Email:</label>
                    <input
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        style={{ width: '100%', padding: '8px', boxSizing: 'border-box' }}
                        required
                    />
                </div>
                <div style={{ marginBottom: '15px' }}>
                    <label>Password:</label>
                    <input
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        style={{ width: '100%', padding: '8px', boxSizing: 'border-box' }}
                        required
                    />
                </div>
                <button type="submit" disabled={loading} style={{ padding: '10px 15px', backgroundColor: loading ? '#ccc' : '#4CAF50', color: 'white', border: 'none', cursor: 'pointer' }}>
                    {loading ? 'Loading...' : 'Login Sekarang'}
                </button>
            </form>
            {message && <p style={{ marginTop: '15px', color: message.startsWith('✅') ? 'green' : 'red' }}>{message}</p>}
            <p style={{ marginTop: '10px', fontSize: '12px' }}>Tes dengan user yang sudah terdaftar di RDS ente!</p>
        </div>
    );
};

export default Login;