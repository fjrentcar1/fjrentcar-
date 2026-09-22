'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';

interface Car {
  id: string;
  slug: string;
  name: string;
  category: string;
  pricePerDay: number;
  capacity: string;
  transmission: string;
  image: string;
  popular: boolean;
}

export default function HomePage() {
  const [featuredCars, setFeaturedCars] = useState<Car[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('/api/cars')
      .then((res) => res.json())
      .then((data) => {
        if (data.success) {
          // Ambil unit terfavorit atau 3 unit pertama
          setFeaturedCars(data.data.slice(0, 3));
        }
      })
      .catch((err) => console.error('Gagal mengambil armada unggulan:', err))
      .finally(() => setLoading(false));
  }, []);

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 selection:bg-amber-500 selection:text-slate-950">
      {/* Header / Navbar */}
      <nav className="border-b border-slate-800 bg-slate-900/80 sticky top-0 z-50 backdrop-blur-md">
        <div className="max-w-7xl mx-auto px-4 h-20 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-amber-400 to-amber-600 text-slate-950 font-black text-xl flex items-center justify-center shadow-lg shadow-amber-500/20">
              FJ
            </div>
            <span className="font-extrabold tracking-wider text-white text-lg">FJ RENTCAR</span>
          </Link>

          <div className="flex items-center gap-6 text-xs font-semibold">
            <Link href="/cars" className="hidden sm:block text-slate-300 hover:text-amber-400 transition">
              Katalog Armada
            </Link>
            <Link href="/tracking" className="hidden sm:block text-slate-300 hover:text-amber-400 transition">
              Lacak Pesanan
            </Link>
            <Link href="/admin" className="text-slate-500 hover:text-slate-300 transition">
              Admin
            </Link>
            <Link
              href="/booking"
              className="bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-slate-950 px-4 py-2.5 rounded-xl font-bold transition shadow-lg shadow-amber-500/20"
            >
              Sewa Sekarang
            </Link>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative overflow-hidden pt-12 pb-20 lg:pt-20 lg:pb-28 border-b border-slate-800/80">
        <div className="max-w-7xl mx-auto px-4 text-center space-y-6">
          <span className="inline-block text-xs font-bold uppercase tracking-widest text-amber-400 border border-amber-500/30 bg-amber-500/10 px-4 py-1.5 rounded-full">
            Premium Luxury Car Rental Jabodetabek
          </span>
          <h1 className="text-4xl sm:text-6xl font-black text-white leading-tight max-w-4xl mx-auto">
            Kemewahan Perjalanan VIP Tanpa Kompromi
          </h1>
          <p className="text-xs sm:text-base text-slate-400 max-w-2xl mx-auto leading-relaxed">
            Hadirkan impresi terbaik untuk perjalanan dinas, tamu kenegaraan, maupun pernikahan eksklusif Anda dengan armada pilihan terbaru dan pengemudi profesional.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4">
            <Link
              href="/cars"
              className="w-full sm:w-auto px-8 py-4 rounded-xl bg-gradient-to-r from-amber-500 to-amber-600 text-slate-950 font-black text-xs uppercase tracking-wider shadow-xl shadow-amber-500/20 hover:from-amber-400 hover:to-amber-500 transition"
            >
              Lihat Katalog Mobil Mewah →
            </Link>
            <Link
              href="/booking"
              className="w-full sm:w-auto px-8 py-4 rounded-xl bg-slate-900 hover:bg-slate-800 border border-slate-800 text-slate-200 font-bold text-xs uppercase tracking-wider transition"
            >
              Reservasi Langsung
            </Link>
          </div>
        </div>
      </section>

      {/* Featured Fleet Section */}
      <section className="max-w-7xl mx-auto px-4 py-16">
        <div className="flex items-end justify-between mb-10">
          <div>
            <span className="text-xs font-bold text-amber-400 uppercase tracking-widest">Armada Unggulan</span>
            <h2 className="text-2xl sm:text-3xl font-black text-white mt-1">Pilihan Terfavorit Konsumen</h2>
          </div>
          <Link href="/cars" className="text-xs text-amber-400 hover:underline font-bold">
            Lihat Semua Unit ({'>'})
          </Link>
        </div>

        {loading ? (
          <div className="text-center py-12 text-xs text-slate-400">Memuat armada unggulan...</div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {featuredCars.map((car) => (
              <div
                key={car.id}
                className="rounded-3xl border border-slate-800 bg-slate-900/80 overflow-hidden shadow-xl flex flex-col justify-between"
              >
                <div>
                  <div className="relative h-48">
                    <img src={car.image} alt={car.name} className="w-full h-full object-cover" />
                    <span className="absolute top-3 left-3 bg-slate-950/80 text-amber-400 text-[10px] font-bold px-3 py-1 rounded-full uppercase">
                      {car.category}
                    </span>
                  </div>
                  <div className="p-5 space-y-2">
                    <h3 className="font-bold text-white text-base">{car.name}</h3>
                    <div className="flex justify-between text-xs border-t border-slate-800/80 pt-3">
                      <span className="text-slate-400">Mulai dari</span>
                      <span className="font-black text-amber-400">
                        Rp {car.pricePerDay.toLocaleString('id-ID')} / hari
                      </span>
                    </div>
                  </div>
                </div>
                <div className="p-5 pt-0">
                  <Link
                    href={`/cars/${car.slug}`}
                    className="block text-center w-full bg-slate-950 hover:bg-slate-800 border border-slate-800 text-slate-200 font-bold text-xs py-2.5 rounded-xl transition"
                  >
                    Detail Unit & Sewa
                  </Link>
                </div>
              </div>
            ))}
          </div>
        )}
      </section>

      {/* Why Choose Us */}
      <section className="border-t border-slate-800/80 bg-slate-900/40 py-16">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center max-w-xl mx-auto mb-12">
            <span className="text-xs font-bold text-amber-400 uppercase tracking-widest">Standar Layanan VIP</span>
            <h2 className="text-2xl sm:text-3xl font-black text-white mt-1">Mengapa Memilih FJ Rentcar?</h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { title: 'Driver Berpengalaman', desc: 'Sopir VIP berseragam rapi, paham rute Jabodetabek, dan menjunjung privasi tinggi.' },
              { title: 'Unit Terbaru & Steril', desc: 'Seluruh armada terawat berkala di bengkel resmi dan selalu disterilkan sebelum digunakan.' },
              { title: 'Asuransi & Jaminan Unit', desc: 'Dilengkapi asuransi perjalanan penuh dan garansi penggantian unit cepat jika ada kendala.' },
              { title: 'Layanan CS 24 Jam', desc: 'Dukungan tim operasional siap melayani reservasi dadakan maupun pertanyaan Anda kapan saja.' },
            ].map((item, idx) => (
              <div key={idx} className="p-6 rounded-2xl bg-slate-900 border border-slate-800 space-y-2">
                <div className="w-8 h-8 rounded-lg bg-amber-500/10 border border-amber-500/20 text-amber-400 font-bold flex items-center justify-center text-xs">
                  0{idx + 1}
                </div>
                <h3 className="font-bold text-white text-sm">{item.title}</h3>
                <p className="text-xs text-slate-400 leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-slate-800 bg-slate-950 py-10 text-xs text-slate-500">
        <div className="max-w-7xl mx-auto px-4 flex flex-col sm:flex-row justify-between items-center gap-4">
          <div>
            <span className="font-bold text-white">FJ RENTCAR</span> — Rental Mobil Mewah & VIP Jabodetabek
          </div>
          <div>© 2026 FJ Rentcar. All rights reserved.</div>
        </div>
      </footer>
    </div>
  );
}
