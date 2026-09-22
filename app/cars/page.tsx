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
  engine: string;
  image: string;
  popular: boolean;
}

export default function CarsPage() {
  const [cars, setCars] = useState<Car[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    fetch('/api/cars')
      .then((res) => res.json())
      .then((data) => {
        if (data.success) {
          setCars(data.data);
        }
      })
      .catch((err) => console.error('Gagal memuat armada:', err))
      .finally(() => setLoading(false));
  }, []);

  const filteredCars = cars.filter((car) => {
    const matchCategory =
      selectedCategory === 'all' || car.category.toLowerCase() === selectedCategory.toLowerCase();
    const matchSearch = car.name.toLowerCase().includes(searchQuery.toLowerCase());
    return matchCategory && matchSearch;
  });

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 selection:bg-amber-500 selection:text-slate-950">
      {/* Top Navbar */}
      <nav className="border-b border-slate-800 bg-slate-900/80 sticky top-0 z-50 backdrop-blur-md">
        <div className="max-w-7xl mx-auto px-4 h-20 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-amber-400 to-amber-600 text-slate-950 font-black text-xl flex items-center justify-center shadow-lg shadow-amber-500/20">
              FJ
            </div>
            <span className="font-extrabold tracking-wider text-white text-lg">FJ RENTCAR</span>
          </Link>

          <div className="flex items-center gap-4 text-xs font-semibold">
            <Link href="/tracking" className="text-slate-300 hover:text-amber-400 transition">
              Lacak Pesanan
            </Link>
            <Link
              href="/booking"
              className="bg-amber-500 hover:bg-amber-400 text-slate-950 px-4 py-2 rounded-xl transition shadow-md shadow-amber-500/20"
            >
              Sewa Sekarang
            </Link>
          </div>
        </div>
      </nav>

      {/* Main Container */}
      <main className="max-w-7xl mx-auto px-4 py-12">
        <div className="text-center max-w-2xl mx-auto mb-10">
          <span className="text-xs uppercase font-bold text-amber-400 tracking-widest border border-amber-500/20 bg-amber-500/10 px-3.5 py-1.5 rounded-full">
            Katalog Armada Eksklusif
          </span>
          <h1 className="text-3xl sm:text-5xl font-black text-white mt-4">Pilihan Mobil Mewah VIP</h1>
          <p className="text-xs sm:text-sm text-slate-400 mt-2">
            Seluruh armada dalam kondisi prima, wangi, dan terawat resmi. Siap melayani kebutuhan perjalanan dinas, kenegaraan, hingga acara pribadi Anda.
          </p>
        </div>

        {/* Filter Controls & Search */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 mb-10 bg-slate-900/60 p-4 rounded-2xl border border-slate-800 backdrop-blur-xl">
          {/* Category Tabs */}
          <div className="flex items-center gap-2 overflow-x-auto w-full sm:w-auto pb-2 sm:pb-0">
            {[
              { id: 'all', label: 'Semua Unit' },
              { id: 'mpv', label: 'Luxury MPV' },
              { id: 'sedan', label: 'Flagship Sedan' },
              { id: 'suv', label: 'Premium SUV' },
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setSelectedCategory(tab.id)}
                className={`px-4 py-2 rounded-xl text-xs font-bold transition whitespace-nowrap ${
                  selectedCategory === tab.id
                    ? 'bg-amber-500 text-slate-950 shadow-lg shadow-amber-500/20'
                    : 'bg-slate-950 text-slate-400 hover:text-white border border-slate-800'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>

          {/* Search Input */}
          <div className="w-full sm:w-72">
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Cari armada (misal: Alphard)..."
              className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-2.5 text-xs text-white focus:outline-none focus:border-amber-500 placeholder:text-slate-500"
            />
          </div>
        </div>

        {/* Fleet Grid */}
        {loading ? (
          <div className="text-center py-20 text-xs text-slate-400">
            Memuat daftar armada dari database PostgreSQL...
          </div>
        ) : filteredCars.length === 0 ? (
          <div className="text-center py-20 text-xs text-slate-400 bg-slate-900/40 rounded-3xl border border-slate-800">
            Tidak ada armada yang sesuai dengan kriteria pencarian Anda.
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredCars.map((car) => (
              <div
                key={car.id}
                className="group rounded-3xl border border-slate-800 bg-slate-900/80 overflow-hidden shadow-2xl hover:border-amber-500/50 transition-all duration-300 flex flex-col justify-between"
              >
                <div>
                  {/* Image Header */}
                  <div className="relative h-56 overflow-hidden">
                    <img
                      src={car.image}
                      alt={car.name}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-transparent to-transparent opacity-80" />
                    <span className="absolute top-4 left-4 bg-slate-950/80 backdrop-blur-md border border-slate-800 text-amber-400 text-[10px] font-bold px-3 py-1 rounded-full uppercase tracking-wider">
                      {car.category}
                    </span>
                    {car.popular && (
                      <span className="absolute top-4 right-4 bg-amber-500 text-slate-950 text-[10px] font-extrabold px-2.5 py-1 rounded-full uppercase tracking-wider shadow-md">
                        Terfavorit
                      </span>
                    )}
                  </div>

                  {/* Body Info */}
                  <div className="p-6 space-y-4">
                    <div>
                      <h3 className="text-lg font-bold text-white group-hover:text-amber-400 transition">
                        {car.name}
                      </h3>
                      <p className="text-xs text-slate-400 mt-1">{car.engine}</p>
                    </div>

                    <div className="grid grid-cols-2 gap-2 text-[11px] bg-slate-950/80 p-3 rounded-xl border border-slate-800/80 text-slate-300">
                      <div>
                        <span className="text-slate-500 block">Kapasitas:</span>
                        <span className="font-semibold text-white">{car.capacity}</span>
                      </div>
                      <div>
                        <span className="text-slate-500 block">Transmisi:</span>
                        <span className="font-semibold text-white">{car.transmission}</span>
                      </div>
                    </div>

                    <div className="border-t border-slate-800/80 pt-3 flex items-baseline justify-between">
                      <span className="text-xs text-slate-400">Mulai dari</span>
                      <div className="text-right">
                        <span className="text-lg font-black text-amber-400">
                          Rp {car.pricePerDay.toLocaleString('id-ID')}
                        </span>
                        <span className="text-[10px] text-slate-400"> / hari</span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Card Action Buttons */}
                <div className="p-6 pt-0 grid grid-cols-2 gap-2">
                  <Link
                    href={`/cars/${car.slug}`}
                    className="text-center bg-slate-950 hover:bg-slate-800 border border-slate-800 text-slate-300 font-semibold text-xs py-2.5 rounded-xl transition"
                  >
                    Detail Unit
                  </Link>
                  <Link
                    href={`/booking?car=${encodeURIComponent(car.name)}`}
                    className="text-center bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-slate-950 font-bold text-xs py-2.5 rounded-xl shadow-lg shadow-amber-500/20 transition"
                  >
                    Pesan Sewa
                  </Link>
                </div>
              </div>
            ))}
          </div>
        )}
      </main>
    </div>
  );
}
