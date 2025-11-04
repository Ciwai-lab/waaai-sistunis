import DashboardNavbar from '../components/DashboardNavbar';

// GANTI DENGAN KODE INI
const WaliSantriDashboard = ({ user }) => {
    // 💡 PASTIKAN ADA RETURN DAN ELEMEN HTML
    return (
        <>
            {/* 1. Navbar */}
            <DashboardNavbar userName={user?.name || 'Wali Santri'} />

            {/* 2. Konten Utama */}
            <div className="p-8 max-w-7xl mx-auto bg-white shadow-lg my-8 rounded-lg">
                <h1 className="text-3xl font-bold text-pink-700 mb-6">
                    Selamat Datang di Dashboard Wali Santri!
                </h1>
                <p className="text-gray-700">Anda login sebagai: **{user?.name || 'User'}** (Role ID: **{user?.role_id}**)</p>

                {/* 💡 Tambahkan konten dummy lain agar tidak blank */}
                <div className="mt-6 p-4 border rounded border-gray-200">
                    Ini adalah area konten dashboard.
                </div>
            </div>
        </>
    );
};
export default WaliSantriDashboard;