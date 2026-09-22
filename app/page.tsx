'use client';

import Link from 'next/link';

export default function HomePage() {
  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 selection:bg-amber-500 selection:text-slate-950">
      {/* Navigation Bar */}
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

          <div className="hidden md:flex items-center gap-8 text-xs font-semibold uppercase tracking-wider text-slate-300">
            <Link href="/" className="text-amber-400">Beranda</Link>
            <Link href="/cars" className="hover:text-amber-400 transition">Katalog Armada</Link>
            <Link href="/booking" className="hover:text-amber-400 transition">Pemesanan</Link>
          </div>

          <div className="flex items-center gap-3">
            <Link
              href="/login"
              className="text-xs font-semibold uppercase tracking-wider text-slate-300 hover:text-white px-3 py-2 transition"
            >
              Masuk
            </Link>
            <Link
              href="/register"
              className="text-xs font-semibold uppercase tracking-wider bg-gradient-to-r from-amber-500 to-amber-600 text-slate-950 px-4 py-2 rounded-lg shadow-md shadow-amber-500/20 hover:from-amber-400 hover:to-amber-500 transition"
            >
              Daftar
            </Link>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative overflow-hidden py-20 lg:py-32">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-amber-500/10 blur-[150px] rounded-full pointer-events-none" />
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
          <span className="inline-block text-xs font-semibold tracking-widest uppercase text-amber-400 bg-amber-500/10 px-4 py-1.5 rounded-full border border-amber-500/20 mb-6">
            Layanan Rental Mobil Premium #1
          </span>
          <h1 className="text-4xl sm:text-6xl font-black text-white tracking-tight leading-tight max-w-4xl mx-auto">
            Pengalaman Berkendara <span className="bg-gradient-to-r from-amber-300 via-amber-400 to-amber-600 bg-clip-text text-transparent">Eksklusif & Mewah</span>
          </h1>
          <p className="mt-6 text-base sm:text-lg text-slate-400 max-w-2xl mx-auto">
            Hadirkan kenyamanan kelas atas untuk acara pernikahan, perjalanan bisnis eksekutif, dan penjemputan VIP dengan armada premium pilihan.
          </p>

          <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link
              href="/booking"
              className="w-full sm:w-auto px-8 py-4 rounded-xl bg-gradient-to-r from-amber-500 to-amber-600 text-slate-950 font-bold text-sm shadow-xl shadow-amber-500/20 hover:from-amber-400 hover:to-amber-500 transition"
            >
              Pesan Layanan Sekarang
            </Link>
            <Link
              href="/cars"
              className="w-full sm:w-auto px-8 py-4 rounded-xl border border-slate-700 bg-slate-900/60 text-slate-200 font-semibold text-sm hover:border-amber-500/50 hover:text-amber-400 transition"
            >
              Lihat Katalog Mobil
            </Link>
          </div>
        </div>
      </section>

      {/* Featured Fleet Preview */}
      <section className="py-16 border-t border-slate-800/80 bg-slate-900/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-2xl sm:text-3xl font-bold text-white tracking-tight">
              Armada Unggulan Kami
            </h2>
            <p className="text-sm text-slate-400 mt-2">
              Unit kendaraan kelas atas dengan perawatan rutin dan performa maksimal.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                name: 'Toyota Alphard 2.5 HEV',
                type: 'Luxury MPV',
                price: 'Rp 3.500.000 / hari',
                img: 'https://images.unsplash.com/photo-1549399542-7e3f8b79c341?auto=format&fit=crop&w=800&q=80',
              },
              {
                name: 'Lexus LM 350 Hybrid',
                type: 'Ultra Luxury MPV',
                price: 'Rp 6.500.000 / hari',
                img: 'https://images.unsplash.com/photo-1563720223185-11003d516935?auto=format&fit=crop&w=800&q=80',
              },
              {
                name: 'Mercedes-Benz S-Class',
                type: 'Executive Sedan',
                price: 'Rp 7.000.000 / hari',
                img: 'https://images.unsplash.com/photo-1618843479313-40f8afb4b4d8?auto=format&fit=crop&w=800&q=80',
              },
            ].map((car, idx) => (
              <div key={idx} className="rounded-2xl border border-slate-800 bg-slate-900 overflow-hidden shadow-xl">
                <img src={car.img} alt={car.name} className="w-full h-48 object-cover" />
                <div className="p-6">
                  <span className="text-[10px] uppercase font-bold text-amber-400 bg-amber-500/10 px-2.5 py-1 rounded border border-amber-500/20">
                    {car.type}
                  </span>
                  <h3 className="text-lg font-bold text-white mt-3">{car.name}</h3>
                  <p className="text-amber-400 font-extrabold text-xl mt-2">{car.price}</p>
                  <Link
                    href="/booking"
                    className="mt-4 block text-center w-full py-2.5 rounded-lg bg-slate-800 hover:bg-amber-500 hover:text-slate-950 text-slate-200 text-xs font-semibold transition"
                  >
                    Sewa Mobil Ini
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-slate-800 py-10 text-center text-xs text-slate-500">
        © {new Date().getFullYear()} FJ Rentcar. All rights reserved.
      </footer>
    </div>
  );
}
