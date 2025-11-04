// File: src/pages/RegisterPage.jsx (NEW FILE)

import RegisterCard from '../components/RegisterCard';

const RegisterPage = () => {
    return (
        // Layout di tengah layar, sama seperti halaman Login
        <div className="min-h-screen flex items-center justify-center p-4">
            <RegisterCard />
        </div>
    );
};

export default RegisterPage;