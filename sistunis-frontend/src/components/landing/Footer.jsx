// Footer.jsx
import React from 'react';
import { MapPin } from 'lucide-react';

const Footer = () => {
    return (
        <footer className="bg-gray-900 text-white py-10">
            <div className="container mx-auto px-6 grid grid-cols-1 md:grid-cols-4 gap-8">

                <div>
                    <h3 className="text-xl font-bold text-green-500 mb-4">Sistufatunnisa</h3>
                    <p className="text-sm text-gray-400">Pondok Pesantren putri yang didedikasikan untuk menghasilkan muslimah berilmu dan berakhlak.</p>
                </div>

                <div>
                    <h3 className="text-lg font-semibold mb-4">Informasi</h3>
                    <ul className="space-y-2 text-sm text-gray-400">
                        <li><a href="#" className="hover:text-white">Sejarah Pondok</a></li>
                        <li><a href="#" className="hover:text-white">Struktur Pengurus</a></li>
                        <li><a href="#" className="hover:text-white">Fasilitas</a></li>
                    </ul>
                </div>

                <div>
                    <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
                    <ul className="space-y-2 text-sm text-gray-400">
                        <li><a href="#" className="hover:text-white">Panduan Pendaftaran</a></li>
                        <li><a href="#" className="hover:text-white">Kurikulum</a></li>
                        <li><a href="/login" className="hover:text-white">Login Wali/Admin</a></li>
                    </ul>
                </div>

                <div>
                    <h3 className="text-lg font-semibold mb-4 flex items-center"><MapPin className='w-4 h-4 mr-2' /> Kontak Kami</h3>
                    <p className="text-sm text-gray-400">
                        Jl. Pesantren No. 123, <br />
                        Kota Santri, 98765<br />
                        (021) 1234 5678<br />
                        info@sistunis.com
                    </p>
                </div>

            </div>
            <div className="mt-8 pt-6 border-t border-gray-700 text-center">
                <p className="text-xs text-gray-500">
                    &copy; {new Date().getFullYear()} Pondok Pesantren Sistufatunnisa. Dibuat dengan cinta.
                </p>
            </div>
        </footer>
    );
};

export default Footer;