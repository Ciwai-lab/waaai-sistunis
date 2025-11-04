// ProgramSection.jsx
import React from 'react';
import { Zap, BookOpen, Star } from 'lucide-react';

const ProgramCard = ({ Icon, title, description }) => (
    <div className="text-center p-8 bg-white rounded-xl shadow-lg hover:shadow-2xl transition duration-300 transform hover:-translate-y-1 border-t-4 border-green-500">
        <Icon className="w-10 h-10 text-green-600 mx-auto mb-4" />
        <h3 className="text-xl font-bold text-gray-800 mb-3">{title}</h3>
        <p className="text-gray-600">{description}</p>
    </div>
);

const ProgramSection = () => {
    return (
        <section id="program" className="py-20 bg-gray-50">
            <div className="container mx-auto px-6">
                <h2 className="text-4xl font-bold text-center text-indigo-800 mb-12">
                    Mengapa Memilih Sistufatunnisa?
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    <ProgramCard
                        Icon={Zap}
                        title="Tahfidz Intensif"
                        description="Kurikulum hafalan Al-Qur'an yang terstruktur dengan bimbingan Syaikhah bersanad."
                    />
                    <ProgramCard
                        Icon={BookOpen}
                        title="Pendidikan Akhlak"
                        description="Penekanan pada adab dan akhlakul karimah sebagai prioritas utama pendidikan."
                    />
                    <ProgramCard
                        Icon={Star}
                        title="Leadership & Digital"
                        description="Pembekalan soft skill dan literasi teknologi untuk bekal di masa depan."
                    />
                </div>
            </div>
        </section>
    );
};

export default ProgramSection;