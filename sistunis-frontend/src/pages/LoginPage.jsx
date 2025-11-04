// File: src/pages/LoginPage.jsx

import LoginCard from '../components/LoginCard';

const LoginPage = () => {
    return (
        // 💡 Terapkan class Tailwind untuk layout di tengah layar
        <div className="min-h-screen flex items-center justify-center p-4">
            {/* LoginCard akan otomatis berada di tengah layar */}
            <LoginCard />
        </div>
    );
};

export default LoginPage;