'use client';

import { useState, useEffect, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import Link from 'next/link';

interface BookingDetail {
  bookingCode: string;
  custName: string;
  custPhone: string;
  serviceType: string;
  startDate: string;
  endDate: string;
  totalPrice: number;
  status: string;
  carName?: string;
}

function TrackingContent() {
  const searchParams = useSearchParams();
  const initialCode = searchParams.get('code') || '';

  const [inputCode, setInputCode] = useState(initialCode);
  const [loading, setLoading] = useState(false);
  const [booking, setBooking] = useState<BookingDetail | null>(null);
  const [errorMsg, setErrorMsg] = useState('');

  const fetchStatus = async (codeToSearch: string) => {
    if (!codeToSearch.trim()) return;
    setLoading(true);
    setErrorMsg('');
    setBooking(null);

    try {
      const res = await fetch(`/api/bookings?code=${encodeURIComponent(codeToSearch)}`);
      const data = await res.json();
      if (data.success && data.data) {
        setBooking(data.data);
      } else {
        setErrorMsg('Pesanan dengan Kode Booking tersebut tidak ditemukan.');
      }
    } catch (err) {
      setErrorMsg('Gagal mengambil data pesanan.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (initialCode) {
      fetchStatus(initialCode);
    }
  }, [initialCode]);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    fetchStatus(inputCode);
  };

  return (
    <div className="max-w-xl mx-auto space-y-8">
      <div className="text-center space-y-2">
        <h1 className="text-3xl font-black text-white">Lacak Status Pesanan</h1>
        <p className="text-xs text-slate-400">
          Masukkan Kode Booking unik yang Anda dapatkan saat melakukan reservasi.
        </p>
      </div>

      <form onSubmit={handleSearch} className="flex gap-2">
        <input
          type="text"
          required
          value={inputCode}
          onChange={(e) => setInputCode(e.target.value)}
          placeholder="Contoh: FJ-8921"
          className="flex-1 bg-slate-900 border border-slate-800 rounded-xl px-4 py-3 text-xs text-white focus:outline-none focus:border-amber-500 uppercase tracking-wider font-mono"
        />
        <button
          type="submit"
          className="bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold px-6 py-3 rounded-xl text-xs transition shadow-lg shadow-amber-500/20"
        >
          Cari →
        </button>
      </form>

      {loading && <div className="text-center text-xs text-slate-400">Mencari data di database...</div>}

      {errorMsg && (
        <div className="bg-rose-500/10 border border-rose-500/30 text-rose-400 p-4 rounded-xl text-xs text-center font-medium">
          {errorMsg}
        </div>
      )}

      {booking && (
        <div className="rounded-3xl border border-slate-800 bg-slate-900/80 p-6 shadow-2xl space-y-6 backdrop-blur-xl">
          <div className="flex items-center justify-between border-b border-slate-800 pb-4">
            <div>
              <span className="text-[10px] text-slate-400 uppercase font-bold tracking-wider">Kode Booking</span>
              <div className="text-lg font-mono font-bold text-amber-400">{booking.bookingCode}</div>
            </div>
            <span
              className={`px-3 py-1 rounded-full text-xs font-extrabold uppercase tracking-wider ${
                booking.status === 'DISETUJUI'
                  ? 'bg-blue-500/20 text-blue-400 border border-blue-500/30'
                  : booking.status === 'SELESAI'
                  ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/30'
                  : booking.status === 'DIBATALKAN'
                  ? 'bg-rose-500/20 text-rose-400 border border-rose-500/30'
                  : 'bg-amber-500/20 text-amber-400 border border-amber-500/30'
              }`}
            >
              {booking.status}
            </span>
          </div>

          <div className="space-y-3 text-xs">
            <div className="flex justify-between">
              <span className="text-slate-400">Nama Pemesan:</span>
              <span className="font-semibold text-white">{booking.custName}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-slate-400">Layanan:</span>
              <span className="font-semibold text-amber-400">{booking.serviceType}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-slate-400">Jadwal Sewa:</span>
              <span className="font-semibold text-slate-200">
                {new Date(booking.startDate).toLocaleDateString('id-ID')} -{' '}
                {new Date(booking.endDate).toLocaleDateString('id-ID')}
              </span>
            </div>
            <div className="flex justify-between border-t border-slate-800 pt-3">
              <span className="text-slate-400">Total Biaya:</span>
              <span className="font-bold text-white text-sm">
                Rp {booking.totalPrice.toLocaleString('id-ID')}
              </span>
            </div>
          </div>

          <div className="pt-2 text-center">
            <a
              href={`https://wa.me/6281234567890?text=${encodeURIComponent(
                `Halo FJ Rentcar, saya mau menanyakan pesanan dengan Kode Booking: ${booking.bookingCode}`
              )}`}
              target="_blank"
              rel="noreferrer"
              className="inline-block w-full py-3 rounded-xl bg-emerald-500/10 hover:bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 text-xs font-bold transition"
            >
              Tanyakan CS via WhatsApp
            </a>
          </div>
        </div>
      )}
    </div>
  );
}

export default function TrackingPage() {
  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 selection:bg-amber-500 selection:text-slate-950">
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

      <main className="max-w-7xl mx-auto px-4 py-12">
        <Suspense fallback={<div className="text-center text-xs text-slate-400">Memuat modul tracking...</div>}>
          <TrackingContent />
        </Suspense>
      </main>
    </div>
  );
}
