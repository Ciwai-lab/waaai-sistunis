// NewsSection.jsx
import React from 'react';
import { Newspaper } from 'lucide-react';

// Data Dummy untuk Berita (Ganti ini dengan logic fetching API /api/posts jika sudah siap)
const DUMMY_POSTS = [
    { id: 1, title: "Pembukaan Pendaftaran Santri Baru 2026", content: "Pendaftaran tahun ajaran baru dibuka mulai 1 Desember. Kuota terbatas!", author: "Admin Sistunis" },
    { id: 2, title: "Lomba Tahfidz Se-Provinsi Jawa Barat", content: "Santriwati kita berhasil meraih juara umum dalam kategori 10 Juz.", author: "Humas Pondok" },
    { id: 3, title: "Agenda Kajian Kitab Fiqih Bulan Ini", content: "Kajian rutin setiap malam Ahad membahas Kitab Al-Waraqat.", author: "Ustadzah Rina" },
];

const NewsSection = () => {
    return (
        <section id="berita" className="py-20 bg-white">
            <div className="container mx-auto px-6">
                <h2 className="text-4xl font-bold text-center text-indigo-800 mb-12">
                    <Newspaper className="w-8 h-8 mr-3 inline-block text-red-500" />
                    Pengumuman & Berita Terbaru
                </h2>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    {DUMMY_POSTS.map((post) => (
                        <div key={post.id} className="bg-gray-50 p-6 rounded-xl shadow-md border-b-4 border-red-400">
                            <h3 className="text-xl font-bold text-gray-900 mb-2">{post.title}</h3>
                            <p className="text-gray-600 mb-4 line-clamp-3">{post.content}</p>
                            <a href="#" className="text-red-600 font-semibold hover:text-red-800 transition duration-150">
                                Baca Selengkapnya &rarr;
                            </a>
                            <p className="text-xs text-gray-400 mt-2">Oleh: {post.author}</p>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default NewsSection;