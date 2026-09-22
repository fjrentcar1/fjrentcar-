'use client';

import { useState } from 'react';
import Link from 'next/link';

interface Car {
  id: string;
  name: string;
  category: string;
  pricePerDay: string;
  capacity: string;
  transmission: string;
  fuel: string;
  image: string;
  features: string[];
}

const FLEET: Car[] = [
  {
    id: 'alphard-hev',
    name: 'Toyota Alphard 2.5 HEV',
    category: 'Luxury MPV',
    pricePerDay: 'Rp 3.500.000',
    capacity: '7 Kursi',
    transmission: 'Otomatis (CVT)',
    fuel: 'Hybrid',
    image: 'https://images.unsplash.com/photo-1549399542-7e3f8b79c341?auto=format&fit=crop&w=800&q=80',
    features: ['Captain Seat VIP', 'Sunroof', 'Wireless Charger', 'Driver Professional'],
  },
  {
    id: 'lexus-lm350',
    name: 'Lexus LM 350 Hybrid',
    category: 'Ultra Luxury MPV',
    pricePerDay: 'Rp 6.500.000',
    capacity: '4 - 7 Kursi',
    transmission: 'Otomatis',
    fuel: 'Hybrid',
    image: 'https://images.unsplash.com/photo-1563720223185-11003d516935?auto=format&fit=crop&w=800&q=80',
    features: ['Private Partition', 'Mark Levinson Audio', 'Massage Seats', 'Driver & Concierge'],
  },
  {
    id: 'mercedes-sclass',
    name: 'Mercedes-Benz S-Class',
    category: 'Executive Sedan',
    pricePerDay: 'Rp 7.000.000',
    capacity: '5 Kursi',
    transmission: 'Otomatis 9G-TRONIC',
    fuel: 'Bensin',
    image: 'https://images.unsplash.com/photo-1618843479313-40f8afb4b4d8?auto=format&fit=crop&w=800&q=80',
    features: ['Air Suspension', 'Burmester 3D Sound', 'Rear Seat Entertainment', 'Driver VIP'],
  },
];

export default function FleetPage() {
  const [selectedCategory, setSelectedCategory] = useState<string>('All');

  const filteredFleet =
    selectedCategory === 'All'
      ? FLEET
      : FLEET.filter((car) => car.category.toLowerCase().includes(selectedCategory.toLowerCase()));

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 selection:bg-amber-500 selection:text-slate-950">
      {/* Navbar Minimalis */}
      <nav className="border-b border-slate-800 bg-slate-900/60 backdrop-blur-md sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-lg bg-gradient-to-br from-amber-400 to-amber-600 text-slate-950 font-black text-lg flex items-center justify-center shadow-md shadow-amber-500/20">
              FJ
            </div>
            <span className="font-bold tracking-wider text-white text-lg">FJ RENTCAR</span>
          </Link>
          <div className="flex items-center gap-4">
            <Link
              href="/login"
              className="text-xs font-semibold uppercase tracking-wider text-amber-400 hover:text-amber-300 transition px-3 py-1.5 border border-amber-500/30 rounded-lg hover:border-amber-400"
            >
              Masuk
            </Link>
          </div>
        </div>
      </nav>

      {/* Main Container */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Header Section */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <span className="text-xs font-semibold tracking-widest uppercase text-amber-400 bg-amber-500/10 px-3 py-1 rounded-full border border-amber-500/20">
            Armada Eksklusif
          </span>
          <h1 className="mt-4 text-3xl sm:text-4xl font-extrabold tracking-tight text-white">
            Katalog Kendaraan Premium
          </h1>
          <p className="mt-3 text-slate-400 text-sm sm:text-base">
            Nikmati kenyamanan perjalanan mewah dengan armada terbaik kami. Dirawat secara berkala untuk performa dan estetika sempurna.
          </p>
        </div>

        {/* Filter Category */}
        <div className="flex justify-center gap-2 mb-10 overflow-x-auto pb-2">
          {['All', 'MPV', 'Sedan'].map((category) => (
            <button
              key={category}
              onClick={() => setSelectedCategory(category)}
              className={`px-4 py-2 rounded-xl text-xs font-semibold tracking-wider transition ${
                selectedCategory === category
                  ? 'bg-amber-500 text-slate-950 shadow-lg shadow-amber-500/20'
                  : 'bg-slate-900 border border-slate-800 text-slate-400 hover:text-white hover:border-slate-700'
              }`}
            >
              {category === 'All' ? 'Semua Armada' : category}
            </button>
          ))}
        </div>

        {/* Fleet Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredFleet.map((car) => (
            <div
              key={car.id}
              className="group rounded-2xl border border-slate-800 bg-slate-900/80 overflow-hidden shadow-xl hover:border-amber-500/40 transition duration-300 backdrop-blur-sm flex flex-col justify-between"
            >
              <div>
                {/* Image Card */}
                <div className="relative h-48 w-full overflow-hidden bg-slate-800">
                  <img
                    src={car.image}
                    alt={car.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition duration-500"
                  />
                  <div className="absolute top-3 right-3 bg-slate-950/80 backdrop-blur-md px-2.5 py-1 rounded-md text-[10px] font-semibold tracking-widest text-amber-400 border border-amber-500/30 uppercase">
                    {car.category}
                  </div>
                </div>

                {/* Body Content */}
                <div className="p-6">
                  <h3 className="text-xl font-bold text-white group-hover:text-amber-400 transition">
                    {car.name}
                  </h3>
                  <div className="mt-2 text-2xl font-black text-amber-400">
                    {car.pricePerDay}
                    <span className="text-xs font-normal text-slate-400"> / hari</span>
                  </div>

                  {/* Specs Grid */}
                  <div className="mt-4 grid grid-cols-3 gap-2 border-y border-slate-800/80 py-3 text-center text-xs text-slate-400">
                    <div>
                      <span className="block font-medium text-slate-300">{car.capacity}</span>
                      Kapasitas
                    </div>
                    <div>
                      <span className="block font-medium text-slate-300">{car.transmission}</span>
                      Transmisi
                    </div>
                    <div>
                      <span className="block font-medium text-slate-300">{car.fuel}</span>
                      Bahan Bakar
                    </div>
                  </div>

                  {/* Features Badge */}
                  <div className="mt-4 flex flex-wrap gap-1.5">
                    {car.features.map((feature, idx) => (
                      <span
                        key={idx}
                        className="text-[11px] bg-slate-800/90 text-slate-300 px-2.5 py-1 rounded-md border border-slate-700/50"
                      >
                        ✓ {feature}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              {/* Action Button */}
              <div className="p-6 pt-0 mt-2">
                <button
                  onClick={() => alert(`Memilih unit: ${car.name}`)}
                  className="w-full rounded-lg bg-gradient-to-r from-amber-500 to-amber-600 py-2.5 text-xs font-semibold text-slate-950 shadow-lg shadow-amber-500/10 hover:from-amber-400 hover:to-amber-500 transition focus:outline-none"
                >
                  Sewa Unit Ini
                </button>
              </div>
            </div>
          ))}
        </div>
      </main>

      {/* Footer */}
      <footer className="mt-20 border-t border-slate-800/80 py-8 text-center text-xs text-slate-500">
        © {new Date().getFullYear()} FJ Rentcar. All rights reserved.
      </footer>
    </div>
  );
}
