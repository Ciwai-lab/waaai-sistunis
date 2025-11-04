// File: src/components/DashboardNavbar.jsx (NEW FILE)

import { useNavigate } from 'react-router-dom';

const DashboardNavbar = ({ userName = 'User' }) => {
    const navigate = useNavigate();

    const handleLogout = () => {
        // 1. Hapus Token dari Local Storage (Mematikan Sesi)
        localStorage.removeItem('token');

        // 2. Redirect ke halaman Login
        alert('Anda telah log out.');
        navigate('/login', { replace: true });
    };

    return (
        <nav className="bg-pink-600 p-4 shadow-md">
            <div className="flex justify-between items-center max-w-7xl mx-auto">
                <div className="text-white font-bold text-xl">SISTUNIS Dashboard</div>
                <div className="flex items-center space-x-4">
                    <span className="text-white text-sm">Halo, {userName}</span>
                    <button
                        onClick={handleLogout}
                        className="bg-white text-pink-600 hover:bg-pink-100 font-semibold py-1 px-3 rounded text-sm transition"
                    >
                        Logout
                    </button>
                </div>
            </div>
        </nav>
    );
};

export default DashboardNavbar;