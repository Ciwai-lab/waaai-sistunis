// HeroSection.jsx
import React from 'react';

const HeroSection = () => {
    return (
        <section className="relative bg-indigo-800 text-white">
            {/* Background image simulasi, ganti dengan gambar pondok asli */}
            <div className="absolute inset-0 opacity-10 bg-cover bg-center" style={{ backgroundImage: "url('https://picsum.photos/1600/900?random=1')" }}></div>

            <div className="container mx-auto px-6 py-24 text-center relative z-10">
                <h1 className="text-6xl font-extrabold mb-4 leading-tight">
                    Mencetak Generasi **Qur'ani** & Berakhlak Mulia
                </h1>
                <p className="text-2xl mb-10 font-light max-w-4xl mx-auto">
                    Pusat pendidikan Islam terpadu yang fokus pada Tahfidz Al-Qur'an dan penguasaan ilmu syar'i modern.
                </p>
                <div className="space-x-4">
                    <a href="#" className="bg-green-500 hover:bg-green-600 text-white font-bold py-3 px-8 rounded-full text-lg shadow-xl transition duration-300 transform hover:scale-105">
                        Daftar Sekarang
                    </a>
                    <a href="#program" className="bg-transparent border-2 border-white text-white font-bold py-3 px-8 rounded-full text-lg hover:bg-white hover:text-indigo-800 transition duration-300">
                        Lihat Program
                    </a>
                </div>
            </div>
        </section>
    );
};

export default HeroSection;