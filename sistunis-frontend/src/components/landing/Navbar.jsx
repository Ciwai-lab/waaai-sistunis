// Navbar.jsx
import React from 'react';
import { BookOpen } from 'lucide-react';

const Navbar = () => {
    return (
        <header className="sticky top-0 bg-white shadow-md z-10">
            <div className="container mx-auto px-6 py-4 flex justify-between items-center">
                <div className="text-2xl font-bold text-indigo-700 flex items-center">
                    <BookOpen className="w-6 h-6 mr-2 text-green-500" />
                    Sistufatunnisa
                </div>
                <nav className="space-x-4 hidden md:block">
                    <a href="#program" className="text-gray-600 hover:text-indigo-700 font-medium">Program</a>
                    <a href="#berita" className="text-gray-600 hover:text-indigo-700 font-medium">Berita</a>
                    <a href="/login" className="bg-indigo-600 text-white py-2 px-4 rounded-full hover:bg-indigo-700 transition duration-150 shadow-md">
                        Login Sistem
                    </a>
                </nav>
            </div>
        </header>
    );
};

export default Navbar;