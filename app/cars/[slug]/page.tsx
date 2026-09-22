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

export default function CarDetailPage({ params }: { params: { slug: string } }) {
  const [car, setCar] = useState<Car | null>(null);
  const [loading, setLoading] = useState(true);
  const [days, setDays] = useState(1);

  useEffect(() => {
    fetch(`/api/cars/${params.slug}`)
      .then((res) => res.json())
      .then((data) => {
        if (data.success) {
          setCar(data.data);
        }
      })
      .catch((err) => console.error('Gagal mengambil detail unit:', err))
      .finally(() => setLoading(false));
  }, [params.slug]);

  if (loading) {
    return (
      <div className="min-h-screen bg-slate-950 text-slate-100 flex items-center justify-center text-xs text-slate-400">
        Memuat spesifikasi armada...
      </div>
    );
  }

  if (!car) {
    return (
      <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col items-center justify-center p-4">
        <h1 className="text-xl font-bold text-white mb-2">Armada Tidak Ditemukan</h1>
        <p className="text-xs text-slate-400 mb-6">Unit yang Anda cari tidak tersedia atau telah dihapus.</p>
        <Link href="/cars" className="bg-amber-500 text-slate-950 font-bold px-4 py-2 rounded-xl text-xs">
          ← Kembali ke Katalog
        </Link>
      </div>
    );
  }

  const totalPrice = car.pricePerDay * days;

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 selection:bg-amber-500 selection:text-slate-950">
      {/* Header Nav */}
      <nav className="border-b border-slate-800 bg-slate-900/80 sticky top-0 z-50 backdrop-blur-md">
        <div className="max-w-7xl mx-auto px-4 h-16 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-amber-400 to-amber-600 text-slate-950 font-black flex items-center justify-center text-sm shadow-md shadow-amber-500/20">
              FJ
            </div>
            <span className="font-bold tracking-wider text-white text-base">FJ RENTCAR</span>
          </Link>
          <Link href="/cars" className="text-xs text-amber-400 hover:underline">
            ← Kembali ke Katalog
          </Link>
        </div>
      </nav>

      <main className="max-w-7xl mx-auto px-4 py-10">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content Info */}
          <div className="lg:col-span-2 space-y-6">
            <div className="relative rounded-3xl overflow-hidden border border-slate-800 bg-slate-900 shadow-2xl h-80 sm:h-96">
              <img src={car.image} alt={car.name} className="w-full h-full object-cover" />
              <div className="absolute top-4 left-4 bg-slate-950/80 backdrop-blur-md border border-slate-800 text-amber-400 text-[10px] font-bold px-3 py-1 rounded-full uppercase tracking-wider">
                {car.category}
              </div>
            </div>

            <div className="bg-slate-900/80 border border-slate-800 rounded-3xl p-6 sm:p-8 space-y-6 backdrop-blur-xl">
              <div>
                <h1 className="text-2xl sm:text-4xl font-black text-white">{car.name}</h1>
                <p className="text-xs sm:text-sm text-slate-400 mt-2">
                  Armada flagship dengan standar kenyamanan eksekutif tinggi, dilengkapi perawatan berkala resmi dan interior higienis.
                </p>
              </div>

              {/* Specs Grid */}
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 border-y border-slate-800 py-6">
                <div className="bg-slate-950 p-4 rounded-2xl border border-slate-800/80">
                  <span className="text-[10px] text-slate-500 uppercase font-bold block">Kapasitas</span>
                  <span className="text-sm font-bold text-white mt-1 block">{car.capacity}</span>
                </div>
                <div className="bg-slate-950 p-4 rounded-2xl border border-slate-800/80">
                  <span className="text-[10px] text-slate-500 uppercase font-bold block">Transmisi</span>
                  <span className="text-sm font-bold text-white mt-1 block">{car.transmission}</span>
                </div>
                <div className="bg-slate-950 p-4 rounded-2xl border border-slate-800/80 col-span-2 sm:col-span-1">
                  <span className="text-[10px] text-slate-500 uppercase font-bold block">Mesin</span>
                  <span className="text-sm font-bold text-amber-400 mt-1 block">{car.engine}</span>
                </div>
              </div>

              {/* VIP Inclusive Facilities */}
              <div className="space-y-3">
                <h3 className="text-xs font-bold uppercase tracking-wider text-amber-400">Fasilitas Layanan Standard VIP</h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs text-slate-300">
                  <div className="flex items-center gap-2">
                    <span className="text-emerald-400 font-bold">✓</span> Driver Berpengalaman & Berseragam
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-emerald-400 font-bold">✓</span> Air Mineral Premium & Wet Wipes
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-emerald-400 font-bold">✓</span> On-board Charger & High-speed Wi-Fi
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-emerald-400 font-bold">✓</span> Unit Steril & Bebas Bau Asap Rokok
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Pricing & Booking Panel */}
          <div className="lg:col-span-1">
            <div className="bg-slate-900/90 border border-slate-800 rounded-3xl p-6 sm:p-8 space-y-6 sticky top-24 shadow-2xl backdrop-blur-xl">
              <div>
                <span className="text-[10px] text-slate-400 uppercase font-bold tracking-wider">Tarif Sewa Harian</span>
                <div className="flex items-baseline gap-2 mt-1">
                  <span className="text-3xl font-black text-amber-400">
                    Rp {car.pricePerDay.toLocaleString('id-ID')}
                  </span>
                  <span className="text-xs text-slate-400">/ 24 Jam</span>
                </div>
              </div>

              {/* Estimator */}
              <div className="bg-slate-950 p-4 rounded-2xl border border-slate-800 space-y-3">
                <label className="block text-xs font-semibold text-slate-300">Estimasi Durasi Sewa</label>
                <div className="flex items-center justify-between gap-3">
                  <button
                    onClick={() => setDays(Math.max(1, days - 1))}
                    className="w-10 h-10 rounded-xl bg-slate-900 border border-slate-800 font-bold text-white hover:bg-slate-800 transition"
                  >
                    -
                  </button>
                  <span className="text-sm font-bold text-white font-mono">{days} Hari</span>
                  <button
                    onClick={() => setDays(days + 1)}
                    className="w-10 h-10 rounded-xl bg-slate-900 border border-slate-800 font-bold text-white hover:bg-slate-800 transition"
                  >
                    +
                  </button>
                </div>
                <div className="border-t border-slate-800/80 pt-3 flex justify-between items-center text-xs">
                  <span className="text-slate-400">Total Estimasi:</span>
                  <span className="text-base font-black text-amber-400">
                    Rp {totalPrice.toLocaleString('id-ID')}
                  </span>
                </div>
              </div>

              <Link
                href={`/booking?car=${encodeURIComponent(car.name)}`}
                className="block text-center w-full bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-slate-950 font-black text-xs py-4 rounded-xl shadow-xl shadow-amber-500/20 transition transform active:scale-95"
              >
                Lanjutkan Pemesanan Unit →
              </Link>

              <a
                href={`https://wa.me/6281234567890?text=${encodeURIComponent(
                  `Halo FJ Rentcar, saya tertarik untuk menyewa unit ${car.name}. Boleh minta info ketersediaannya?`
                )}`}
                target="_blank"
                rel="noreferrer"
                className="block text-center w-full bg-slate-950 hover:bg-slate-800 border border-slate-800 text-slate-300 font-bold text-xs py-3 rounded-xl transition"
              >
                Tanya via WhatsApp
              </a>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
