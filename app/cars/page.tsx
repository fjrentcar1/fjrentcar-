'use client';

import { useState } from 'react';
import Link from 'next/link';

interface Car {
  id: string;
  name: string;
  category: 'mpv' | 'sedan' | 'suv';
  categoryLabel: string;
  price: string;
  capacity: string;
  transmission: string;
  engine: string;
  features: string[];
  image: string;
  popular?: boolean;
}

const FLEET_DATA: Car[] = [
  {
    id: 'alphard-hev',
    name: 'Toyota Alphard 2.5 HEV',
    category: 'mpv',
    categoryLabel: 'Luxury MPV',
    price: 'Rp 3.500.000',
    capacity: '7 Penumpang',
    transmission: 'CVT Automatic',
    engine: '2.5L Hybrid Electric',
    features: ['Captain Seat VIP', 'Executive Power Seat', 'Panoramic Roof', 'Ambient Lighting', 'Wireless Charger'],
    image: 'https://images.unsplash.com/photo-1549399542-7e3f8b79c341?auto=format&fit=crop&w=800&q=80',
    popular: true,
  },
  {
    id: 'lexus-lm350',
    name: 'Lexus LM 350 Hybrid',
    category: 'mpv',
    categoryLabel: 'Ultra Luxury MPV',
    price: 'Rp 6.500.000',
    capacity: '4 - 7 Penumpang',
    transmission: 'E-CVT',
    engine: '2.5L HEV System',
    features: ['Mark Levinson Audio', '48-inch Rear Screen', 'Privasi Partition Glass', 'Massage Seats', 'Cool Box'],
    image: 'https://images.unsplash.com/photo-1563720223185-11003d516935?auto=format&fit=crop&w=800&q=80',
    popular: true,
  },
  {
    id: 'mercedes-sclass',
    name: 'Mercedes-Benz S-Class S 450',
    category: 'sedan',
    categoryLabel: 'Executive Saloon',
    price: 'Rp 7.000.000',
    capacity: '5 Penumpang',
    transmission: '9G-TRONIC Auto',
    engine: '3.0L Inline-6 Turbo',
    features: ['Burmester 3D Surround', 'AIRMATIC Suspension', 'Rear Seat Entertainment', 'Soft Close Doors'],
    image: 'https://images.unsplash.com/photo-1618843479313-40f8afb4b4d8?auto=format&fit=crop&w=800&q=80',
    popular: true,
  },
  {
    id: 'land-cruiser-300',
    name: 'Toyota Land Cruiser 300 VX-R',
    category: 'suv',
    categoryLabel: 'Luxury SUV',
    price: 'Rp 5.500.000',
    capacity: '7 Penumpang',
    transmission: '10-Speed Automatic',
    engine: '3.3L Twin Turbo Diesel',
    features: ['4WD Terrain Select', 'JBL Premium Sound', 'Power Tailgate', 'Heated & Ventilated Seats'],
    image: 'https://images.unsplash.com/photo-1533473359331-0135ef1b58bf?auto=format&fit=crop&w=800&q=80',
  },
  {
    id: 'bmw-7series',
    name: 'BMW 740i Opulence',
    category: 'sedan',
    categoryLabel: 'Luxury Saloon',
    price: 'Rp 6.800.000',
    capacity: '5 Penumpang',
    transmission: '8-Speed Steptronic',
    engine: '3.0L BMW TwinPower Turbo',
    features: ['BMW Theatre Screen 31"', 'Bowers & Wilkins Sound', 'Executive Lounge Seating', 'Sky Lounge Glass Roof'],
    image: 'https://images.unsplash.com/photo-1555215695-3004980ad54e?auto=format&fit=crop&w=800&q=80',
  },
];

export default function CarsPage() {
  const [filter, setFilter] = useState<'all' | 'mpv' | 'sedan' | 'suv'>('all');

  const filteredCars = filter === 'all' 
    ? FLEET_DATA 
    : FLEET_DATA.filter(car => car.category === filter);

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 selection:bg-amber-500 selection:text-slate-950">
      {/* Navbar Minimalis */}
      <nav className="border-b border-slate-800 bg-slate-900/60 backdrop-blur-md sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-amber-400 to-amber-600 text-slate-950 font-black text-xl flex items-center justify-center shadow-lg shadow-amber-500/20">
              FJ
            </div>
            <div>
              <span className="font-extrabold tracking-wider text-white text-lg block leading-none">FJ RENTCAR</span>
              <span className="text-[10px] text-amber-400 font-medium tracking-widest uppercase">Luxury Mobility</span>
            </div>
          </Link>

          <div className="flex items-center gap-6 text-xs font-semibold uppercase tracking-wider text-slate-300">
            <Link href="/" className="hover:text-amber-400 transition">Beranda</Link>
            <Link href="/cars" className="text-amber-400">Katalog Armada</Link>
            <Link href="/booking" className="hover:text-amber-400 transition">Pemesanan</Link>
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <span className="text-xs font-semibold tracking-widest uppercase text-amber-400 bg-amber-500/10 px-4 py-1.5 rounded-full border border-amber-500/20">
            Pilihan Premium Fleet
          </span>
          <h1 className="mt-4 text-3xl sm:text-5xl font-black tracking-tight text-white">
            Katalog Armada FJ Rentcar
          </h1>
          <p className="mt-3 text-sm sm:text-base text-slate-400">
            Setiap unit senantiasa terjaga dalam kondisi prima, bersih, beraroma harum, serta siap memberikan kenyamanan tingkat tinggi bagi perjalanan Anda.
          </p>
        </div>

        {/* Filter Buttons */}
        <div className="flex flex-wrap justify-center gap-2 sm:gap-4 mb-10">
          {[
            { id: 'all', label: 'Semua Armada' },
            { id: 'mpv', label: 'MPV Mewah' },
            { id: 'sedan', label: 'Sedan Eksekutif' },
            { id: 'suv', label: 'SUV Luxury' },
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setFilter(tab.id as any)}
              className={`px-5 py-2.5 rounded-xl text-xs font-semibold transition tracking-wide ${
                filter === tab.id
                  ? 'bg-gradient-to-r from-amber-500 to-amber-600 text-slate-950 font-bold shadow-lg shadow-amber-500/20'
                  : 'bg-slate-900 border border-slate-800 text-slate-400 hover:text-white hover:border-slate-700'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Fleet Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredCars.map((car) => (
            <div
              key={car.id}
              className="rounded-2xl border border-slate-800 bg-slate-900/80 overflow-hidden shadow-2xl flex flex-col justify-between backdrop-blur-xl group hover:border-amber-500/40 transition duration-300"
            >
              <div>
                <div className="relative h-56 overflow-hidden bg-slate-950">
                  <img
                    src={car.image}
                    alt={car.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition duration-500"
                  />
                  <div className="absolute top-4 left-4 flex gap-2">
                    <span className="text-[10px] uppercase font-bold text-amber-400 bg-slate-950/80 backdrop-blur-md px-3 py-1 rounded-md border border-amber-500/30">
                      {car.categoryLabel}
                    </span>
                    {car.popular && (
                      <span className="text-[10px] uppercase font-bold text-slate-950 bg-amber-400 px-3 py-1 rounded-md shadow">
                        Terpopuler
                      </span>
                    )}
                  </div>
                </div>

                <div className="p-6">
                  <h3 className="text-xl font-bold text-white group-hover:text-amber-400 transition">
                    {car.name}
                  </h3>
                  
                  {/* Specs summary */}
                  <div className="grid grid-cols-2 gap-2 mt-4 text-xs text-slate-400 border-y border-slate-800/80 py-3">
                    <div>👥 {car.capacity}</div>
                    <div>⚙️ {car.transmission}</div>
                    <div className="col-span-2">⛽ Engine: {car.engine}</div>
                  </div>

                  {/* Features list */}
                  <div className="mt-4">
                    <span className="text-[10px] font-bold uppercase tracking-wider text-slate-500 block mb-2">
                      Fitur Unggulan
                    </span>
                    <div className="flex flex-wrap gap-1.5">
                      {car.features.map((ft, i) => (
                        <span key={i} className="text-[10px] bg-slate-800/80 text-slate-300 px-2.5 py-1 rounded-md border border-slate-700/50">
                          ✓ {ft}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </div>

              {/* Price & Action */}
              <div className="p-6 pt-0 border-t border-slate-800/40 mt-4 flex items-center justify-between gap-4">
                <div>
                  <span className="text-[10px] text-slate-400 block uppercase">Tarif Sewa / Hari</span>
                  <span className="text-lg font-black text-amber-400">{car.price}</span>
                </div>
                <Link
                  href={`/booking`}
                  className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-amber-500 to-amber-600 text-slate-950 font-bold text-xs shadow-md shadow-amber-500/20 hover:from-amber-400 hover:to-amber-500 transition"
                >
                  Pesan Sewa
                </Link>
              </div>
            </div>
          ))}
        </div>
      </main>

      {/* Footer Minimalis */}
      <footer className="border-t border-slate-800 py-8 text-center text-xs text-slate-500 mt-16">
        © {new Date().getFullYear()} FJ Rentcar — Layanan Rental Mobil Mewah Terpercaya.
      </footer>
    </div>
  );
}
