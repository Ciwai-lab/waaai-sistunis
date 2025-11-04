// File: src/App.jsx (UPDATE)

import { Routes, Route } from 'react-router-dom';
import LandingPage from './pages/LandingPage';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import WaliSantriDashboard from './pages/WaliSantriDashboard';
import AdminTUDashboard from './pages/AdminTUDashboard';

// 💡 Import GuardRoute
import GuardRoute from './components/GuardRoute';

const MudiirDashboard = ({ user }) => <div>Halaman Dashboard Mudiir ({user?.name || 'User'})</div>;

function App() {
  return (
    <div className="min-h-screen bg-gray-50 text-gray-800">
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />

        {/* ============================================== */}
        {/* 🚨 PROTEKSI RUTE DENGAN GuardRoute */}
        {/* ============================================== */}

        {/* Rute Wali Santri (Hanya Role ID 5) */}
        <Route
          path="/wali-santri/dashboard"
          element={
            <GuardRoute allowedRoles={[5]}>
              {(user) => <WaliSantriDashboard user={user} />}
            </GuardRoute>
          }
        />

        {/* Rute Admin TU (Hanya Role ID 3) */}
        <Route
          path="/admin-tu/dashboard"
          element={
            <GuardRoute allowedRoles={[3]}>
              {(user) => <AdminTUDashboard user={user} />}
            </GuardRoute>
          }
        />

        {/* Rute Mudiir (Hanya Role ID 2) */}
        <Route
          path="/mudiir/dashboard"
          element={
            <GuardRoute allowedRoles={[2]}>
              {(user) => <MudiirDashboard user={user} />}
            </GuardRoute>
          }
        />
        {/* ============================================== */}
      </Routes>
    </div>
  );
}

export default App;