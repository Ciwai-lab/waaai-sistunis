// CtaSection.jsx
import React from 'react';

const CtaSection = () => {
    return (
        <section className="bg-green-600 py-16">
            <div className="container mx-auto px-6 text-center text-white">
                <h2 className="text-4xl font-bold mb-4">Siap Bergabung?</h2>
                <p className="text-xl mb-8">Jadikan anak Anda bagian dari generasi Qur'ani yang berkarakter kuat.</p>
                <a href="#" className="bg-white text-green-700 font-bold py-4 px-10 rounded-full text-xl shadow-2xl transition duration-300 transform hover:scale-110">
                    Hubungi Panitia PPDB
                </a>
            </div>
        </section>
    );
};

export default CtaSection;