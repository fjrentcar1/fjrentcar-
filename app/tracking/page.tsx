'use client';

import { useState } from 'react';
import Link from 'next/link';

interface BookingDetail {
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
    transmission: string;
    capacity: string;
  };
}

export default function TrackingPage() {
  const [code, setCode] = useState('');
  const [loading, setLoading] = useState(false);
  const [booking, setBooking] = useState<BookingDetail | null>(null);
  const [errorMsg, setErrorMsg] = useState('');

  const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!code.trim()) return;

    setLoading(true);
    setErrorMsg('');
    setBooking(null);

    try {
      const res = await fetch(`/api/bookings/track?code=${encodeURIComponent(code)}`);
      const data = await res.json();

      if (data.success) {
        setBooking(data.data);
      } else {
        setErrorMsg(data.message || 'Kode booking tidak ditemukan.');
      }
    } catch (err) {
      setErrorMsg('Gagal terhubung ke server.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 selection:bg-amber-500 selection:text-slate-950">
      {/* Navbar */}
      <nav className="border-b border-slate-800 bg-slate-900/60 backdrop-blur-md sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 h-20 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-amber-400 to-amber-600 text-slate-950 font-black text-xl flex items-center justify-center shadow-lg shadow-amber-500/20">
              FJ
            </div>
            <span className="font-extrabold tracking-wider text-white text-lg">FJ RENTCAR</span>
          </Link>
          <div className="flex items-center gap-4 text-xs font-semibold">
            <Link href="/cars" className="text-slate-300 hover:text-amber-400 transition">
              Katalog Armada
            </Link>
            <Link href="/booking" className="text-amber-400 hover:underline">
              Sewa Sekarang →
            </Link>
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <main className="max-w-3xl mx-auto px-4 py-12">
        <div className="text-center mb-8">
          <span className="text-xs uppercase font-bold text-amber-400 tracking-widest border border-amber-500/20 bg-amber-500/10 px-3 py-1 rounded-full">
            Fitur Lacak Status
          </span>
          <h1 className="text-3xl sm:text-4xl font-extrabold text-white mt-3">Lacak Pesanan Sewa Anda</h1>
          <p className="text-xs sm:text-sm text-slate-400 mt-2">
            Masukkan Kode Booking Anda (contoh: <span className="font-mono text-amber-400 font-bold">FJR-8492</span>) untuk melihat progres reservasi secara real-time.
          </p>
        </div>

        {/* Form Pencarian */}
        <form onSubmit={handleSearch} className="mb-10">
          <div className="flex flex-col sm:flex-row gap-2 bg-slate-900 border border-slate-800 p-2 rounded-2xl shadow-xl">
            <input
              type="text"
              required
              value={code}
              onChange={(e) => setCode(e.target.value)}
              placeholder="Masukkan Kode Booking (FJR-XXXX)"
              className="flex-1 bg-slate-950 border border-slate-800 rounded-xl px-4 py-3 text-xs text-white uppercase font-mono tracking-wider focus:outline-none focus:border-amber-500 placeholder:normal-case placeholder:tracking-normal"
            />
            <button
              type="submit"
              disabled={loading}
              className="bg-gradient-to-r from-amber-500 to-amber-600 text-slate-950 font-bold text-xs px-6 py-3.5 rounded-xl hover:from-amber-400 hover:to-amber-500 transition disabled:opacity-50"
            >
              {loading ? 'Mencari...' : 'Cek Status'}
            </button>
          </div>
        </form>

        {errorMsg && (
          <div className="bg-rose-500/10 border border-rose-500/30 text-rose-400 p-4 rounded-xl text-xs text-center font-medium">
            {errorMsg}
          </div>
        )}

        {/* Result Card */}
        {booking && (
          <div className="bg-slate-900/80 border border-slate-800 rounded-2xl p-6 sm:p-8 space-y-6 shadow-2xl backdrop-blur-xl">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between border-b border-slate-800 pb-5 gap-3">
              <div>
                <div className="text-xs text-slate-400">Kode Pemesanan</div>
                <div className="text-xl font-mono font-bold text-amber-400">{booking.bookingCode}</div>
              </div>
              <div>
                <span
                  className={`inline-block px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider ${
                    booking.status === 'DISETUJUI'
                      ? 'bg-blue-500/10 text-blue-400 border border-blue-500/30'
                      : booking.status === 'SELESAI'
                      ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/30'
                      : booking.status === 'DIBATALKAN'
                      ? 'bg-rose-500/10 text-rose-400 border border-rose-500/30'
                      : 'bg-amber-500/10 text-amber-400 border border-amber-500/30'
                  }`}
                >
                  Status: {booking.status}
                </span>
              </div>
            </div>

            {/* Progress Bar / Timeline */}
            <div className="grid grid-cols-3 gap-2 text-center text-[11px] font-semibold pt-2">
              <div className={`p-2.5 rounded-xl border ${booking.status === 'DIPROSES' || booking.status === 'DISETUJUI' || booking.status === 'SELESAI' ? 'bg-amber-500/20 text-amber-400 border-amber-500/40' : 'bg-slate-950 text-slate-500 border-slate-800'}`}>
                1. Diproses
              </div>
              <div className={`p-2.5 rounded-xl border ${booking.status === 'DISETUJUI' || booking.status === 'SELESAI' ? 'bg-blue-500/20 text-blue-400 border-blue-500/40' : 'bg-slate-950 text-slate-500 border-slate-800'}`}>
                2. Disetujui
              </div>
              <div className={`p-2.5 rounded-xl border ${booking.status === 'SELESAI' ? 'bg-emerald-500/20 text-emerald-400 border-emerald-500/40' : 'bg-slate-950 text-slate-500 border-slate-800'}`}>
                3. Selesai
              </div>
            </div>

            {/* Rincian Pesanan */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs bg-slate-950 p-4 rounded-xl border border-slate-800">
              <div>
                <span className="text-slate-400 block">Nama Pemesan:</span>
                <span className="font-semibold text-white">{booking.custName}</span>
              </div>
              <div>
                <span className="text-slate-400 block">Nomor HP / WhatsApp:</span>
                <span className="font-semibold text-white">{booking.custPhone}</span>
              </div>
              <div>
                <span className="text-slate-400 block">Unit Armada:</span>
                <span className="font-semibold text-amber-400">{booking.car?.name || 'Armada VIP'}</span>
              </div>
              <div>
                <span className="text-slate-400 block">Layanan:</span>
                <span className="font-semibold text-white">{booking.serviceType}</span>
              </div>
              <div>
                <span className="text-slate-400 block">Tanggal Sewa:</span>
                <span className="font-semibold text-white">
                  {new Date(booking.startDate).toLocaleDateString('id-ID')} s/d {new Date(booking.endDate).toLocaleDateString('id-ID')}
                </span>
              </div>
              <div>
                <span className="text-slate-400 block">Total Biaya Est:</span>
                <span className="font-bold text-amber-400 text-sm">
                  Rp {booking.totalPrice.toLocaleString('id-ID')}
                </span>
              </div>
            </div>

            {/* Bantuan CS */}
            <div className="text-center pt-2">
              <a
                href={`https://wa.me/6281234567890?text=${encodeURIComponent(`Halo FJ Rentcar, saya mau konfirmasi pesanan dengan kode ${booking.bookingCode}`)}`}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-2 text-xs font-semibold text-emerald-400 bg-emerald-500/10 border border-emerald-500/30 px-4 py-2.5 rounded-xl hover:bg-emerald-500/20 transition"
              >
                💬 Konfirmasi / Hubungi CS WhatsApp
              </a>
            </div>
          </div>
        )}
      </main>
    </div>
  );
}
