// File: src/components/UserList.jsx
import React, { useState, useEffect } from 'react';
import api from '../config/api';

const UserList = () => {
    const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');

    useEffect(() => {
        const fetchUsers = async () => {
            try {
                // Karena sudah login, token harusnya sudah terpasang otomatis
                const response = await api.get('/users');

                setUsers(response.data.data);
                setError('');

            } catch (err) {
                // Jika status 401/403 (Unauthorized/Forbidden), berarti tokennya gagal/expired
                setError(err.response?.data?.message || '🚨 Gagal ambil data. Cek Token/Akses.');
            } finally {
                setLoading(false);
            }
        };

        // Pastikan user sudah login (cek token di local storage)
        if (localStorage.getItem('sistunis_token')) {
            fetchUsers();
        } else {
            setError('❌ Ente belum login, bro!');
            setLoading(false);
        }
    }, []);

    if (loading) return <p>Loading Data Users...</p>;
    if (error) return <p style={{ color: 'red' }}>Error: {error}</p>;

    return (
        <div style={{ margin: '20px', borderTop: '1px solid #ccc', paddingTop: '20px' }}>
            <h4>✅ Data User Berhasil Diambil (Authenticated)</h4>
            <ul>
                {users.map(user => (
                    <li key={user.id}>
                        **{user.name}** ({user.email})
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default UserList;