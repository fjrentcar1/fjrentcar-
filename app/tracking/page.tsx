'use client';

import { useState } from 'react';
import Link from 'next/link';

interface BookingResult {
  id: string;
  bookingCode: string;
  custName: string;
  custPhone: string;
  serviceType: string;
  startDate: string;
  endDate: string;
  totalPrice: number;
  status: 'DIPROSES' | 'DISETUJUI' | 'SELESAI' | 'DIBATALKAN';
  car: {
    name: string;
    image: string;
  };
}

export default function TrackingPage() {
  const [query, setQuery] = useState('');
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<BookingResult | null>(null);
  const [errorMsg, setErrorMsg] = useState('');

  const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!query.trim()) return;

    setLoading(true);
    setErrorMsg('');
    setResult(null);

    try {
      const res = await fetch(`/api/bookings/track?code=${encodeURIComponent(query)}`);
      const data = await res.json();

      if (data.success) {
        setResult(data.data);
      } else {
        setErrorMsg(data.message || 'Pesanan tidak ditemukan.');
      }
    } catch (err) {
      setErrorMsg('Gagal terhubung ke server. Coba beberapa saat lagi.');
    } font-medium
    finally {
      setLoading(false);
    }
  };

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
            Katalog Armada →
          </Link>
        </div>
      </nav>

      <main className="max-w-3xl mx-auto px-4 py-12">
        <div className="text-center space-y-3 mb-8">
          <span className="text-xs font-bold text-amber-400 uppercase tracking-widest border border-amber-500/30 bg-amber-500/10 px-3 py-1 rounded-full">
            Layanan Mandiri Konsumen
          </span>
          <h1 className="text-2xl sm:text-4xl font-black text-white">Lacak Status Reservasi</h1>
          <p className="text-xs sm:text-sm text-slate-400">
            Masukkan Kode Booking (contoh: <span className="text-amber-400 font-mono">FJR-XXXX</span>) atau Nomor WhatsApp yang terdaftar saat pemesanan.
          </p>
        </div>

        {/* Search Box */}
        <form onSubmit={handleSearch} className="bg-slate-900 border border-slate-800 rounded-2xl p-3 flex flex-col sm:flex-row gap-3 shadow-2xl mb-8">
          <input
            type="text"
            required
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Masukkan Kode Booking / No. WhatsApp..."
            className="flex-1 bg-slate-950 border border-slate-800 rounded-xl px-4 py-3 text-xs text-white focus:outline-none focus:border-amber-500"
          />
          <button
            type="submit"
            disabled={loading}
            className="bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-slate-950 font-bold text-xs px-6 py-3 rounded-xl transition shadow-lg shadow-amber-500/20 disabled:opacity-50"
          >
            {loading ? 'Mencari...' : 'Cek Status'}
          </button>
        </form>

        {/* Error State */}
        {errorMsg && (
          <div className="bg-rose-500/10 border border-rose-500/30 text-rose-400 p-4 rounded-2xl text-xs text-center font-medium mb-8">
            {errorMsg}
          </div>
        )}

        {/* Result Card */}
        {result && (
          <div className="bg-slate-900/90 border border-slate-800 rounded-3xl p-6 sm:p-8 space-y-6 shadow-2xl backdrop-blur-xl">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-800 pb-6">
              <div>
                <span className="text-[10px] text-slate-400 uppercase font-bold tracking-wider block">Kode Booking</span>
                <span className="text-xl font-mono font-black text-amber-400">{result.bookingCode}</span>
              </div>
              <div>
                <span className={`inline-block px-3 py-1 rounded-full text-xs font-extrabold uppercase tracking-wider ${
                  result.status === 'DISETUJUI'
                    ? 'bg-blue-500/10 text-blue-400 border border-blue-500/30'
                    : result.status === 'SELESAI'
                    ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/30'
                    : result.status === 'DIBATALKAN'
                    ? 'bg-rose-500/10 text-rose-400 border border-rose-500/30'
                    : 'bg-amber-500/10 text-amber-400 border border-amber-500/30'
                }`}>
                  Status: {result.status}
                </span>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
              <div className="bg-slate-950 p-4 rounded-2xl border border-slate-800 space-y-1">
                <span className="text-slate-500 font-bold block">Pemesan</span>
                <span className="text-white font-bold block">{result.custName}</span>
                <span className="text-slate-400 block">{result.custPhone}</span>
              </div>
              <div className="bg-slate-950 p-4 rounded-2xl border border-slate-800 space-y-1">
                <span className="text-slate-500 font-bold block">Armada & Layanan</span>
                <span className="text-white font-bold block">{result.car?.name || 'Unit VIP'}</span>
                <span className="text-amber-400 block">{result.serviceType}</span>
              </div>
            </div>

            <div className="bg-slate-950 p-4 rounded-2xl border border-slate-800 flex justify-between items-center text-xs">
              <div>
                <span className="text-slate-500 font-bold block">Jadwal Sewa</span>
                <span className="text-slate-200 mt-1 block">
                  {new Date(result.startDate).toLocaleDateString('id-ID')} — {new Date(result.endDate).toLocaleDateString('id-ID')}
                </span>
              </div>
              <div className="text-right">
                <span className="text-slate-500 font-bold block">Total Billed</span>
                <span className="text-amber-400 font-black text-sm mt-1 block">
                  Rp {result.totalPrice.toLocaleString('id-ID')}
                </span>
              </div>
            </div>

            <div className="pt-2 text-center">
              <a
                href={`https://wa.me/6281234567890?text=${encodeURIComponent(
                  `Halo CS FJ Rentcar, saya ingin konfirmasi pesanan dengan Kode Booking ${result.bookingCode}`
                )}`}
                target="_blank"
                rel="noreferrer"
                className="inline-block bg-slate-950 hover:bg-slate-800 border border-slate-800 text-slate-300 font-bold text-xs px-6 py-3 rounded-xl transition"
              >
                Hubungi CS via WhatsApp →
              </a>
            </div>
          </div>
        )}
      </main>
    </div>
  );
}
