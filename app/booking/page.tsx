'use client';

import { useState, useEffect, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import Link from 'next/link';

function BookingFormContent() {
  const searchParams = useSearchParams();
  const preSelectedCar = searchParams.get('car') || '';

  const [formData, setFormData] = useState({
    custName: '',
    custPhone: '',
    custEmail: '',
    carName: preSelectedCar || 'Toyota All New Alphard HEV',
    serviceType: 'Dengan Driver VIP',
    startDate: '',
    endDate: '',
    notes: '',
  });

  const [submitting, setSubmitting] = useState(false);
  const [successBooking, setSuccessBooking] = useState<{
    bookingCode: string;
    totalPrice: number;
  } | null>(null);

  useEffect(() => {
    if (preSelectedCar) {
      setFormData((prev) => ({ ...prev, carName: preSelectedCar }));
    }
  }, [preSelectedCar]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);

    try {
      const res = await fetch('/api/bookings', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      const data = await res.json();
      if (data.success) {
        setSuccessBooking({
          bookingCode: data.data.bookingCode,
          totalPrice: data.data.totalPrice,
        });
      } else {
        alert(data.message || 'Terjadi kesalahan saat memproses pesanan.');
      }
    } catch (err) {
      console.error('Gagal mengirim reservasi:', err);
      alert('Gagal terhubung ke server database.');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="max-w-3xl mx-auto">
      {successBooking ? (
        <div className="rounded-3xl border border-emerald-500/30 bg-slate-900/90 p-8 shadow-2xl text-center space-y-6 backdrop-blur-xl">
          <div className="w-16 h-16 bg-emerald-500/20 text-emerald-400 rounded-full flex items-center justify-center mx-auto text-3xl font-black border border-emerald-500/30">
            ✓
          </div>
          <div>
            <h2 className="text-2xl font-black text-white">Reservasi Berhasil Dikirim!</h2>
            <p className="text-xs text-slate-400 mt-1">
              Tim CS FJ Rentcar akan segera memverifikasi pesanan Anda dalam waktu maksimal 15 menit.
            </p>
          </div>

          <div className="bg-slate-950 p-6 rounded-2xl border border-slate-800 space-y-3">
            <span className="text-[11px] text-slate-400 uppercase tracking-wider font-bold">Kode Booking Anda</span>
            <div className="text-3xl font-mono font-black text-amber-400 tracking-widest">
              {successBooking.bookingCode}
            </div>
            <p className="text-xs text-slate-400">
              Estimasi Biaya: <span className="text-white font-bold">Rp {successBooking.totalPrice.toLocaleString('id-ID')}</span>
            </p>
          </div>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-2">
            <Link
              href={`/tracking?code=${successBooking.bookingCode}`}
              className="w-full sm:w-auto px-6 py-3.5 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-xs transition shadow-lg shadow-amber-500/20"
            >
              Lacak Status Pesanan →
            </Link>
            <a
              href={`https://wa.me/6281234567890?text=${encodeURIComponent(
                `Halo FJ Rentcar, saya baru saja membuat pesanan dengan Kode Booking: ${successBooking.bookingCode}. Mohon konfirmasi ketersediaan.`
              )}`}
              target="_blank"
              rel="noreferrer"
              className="w-full sm:w-auto px-6 py-3.5 rounded-xl bg-emerald-500/20 hover:bg-emerald-500/30 text-emerald-400 border border-emerald-500/30 font-bold text-xs transition"
            >
              Konfirmasi via WhatsApp
            </a>
          </div>
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="rounded-3xl border border-slate-800 bg-slate-900/80 p-6 sm:p-10 shadow-2xl space-y-6 backdrop-blur-xl">
          <div className="border-b border-slate-800 pb-4">
            <h1 className="text-2xl font-black text-white">Formulir Reservasi VIP</h1>
            <p className="text-xs text-slate-400 mt-1">
              Isi data detail di bawah ini untuk mengunci jadwal pemesanan armada.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1.5">Nama Lengkap</label>
              <input
                type="text"
                required
                value={formData.custName}
                onChange={(e) => setFormData({ ...formData, custName: e.target.value })}
                placeholder="Contoh: Budi Santoso"
                className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-3 text-xs text-white focus:outline-none focus:border-amber-500"
              />
            </div>
            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1.5">Nomor WhatsApp / HP</label>
              <input
                type="tel"
                required
                value={formData.custPhone}
                onChange={(e) => setFormData({ ...formData, custPhone: e.target.value })}
                placeholder="081234567890"
                className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-3 text-xs text-white focus:outline-none focus:border-amber-500"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1.5">Pilihan Armada</label>
              <select
                value={formData.carName}
                onChange={(e) => setFormData({ ...formData, carName: e.target.value })}
                className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-3 text-xs text-white focus:outline-none focus:border-amber-500"
              >
                <option value="Toyota All New Alphard HEV">Toyota All New Alphard HEV</option>
                <option value="Lexus LM 350 Hybrid">Lexus LM 350 Hybrid</option>
                <option value="Mercedes-Benz S-Class S450">Mercedes-Benz S-Class S450</option>
                <option value="Toyota Land Cruiser 300 VX-R">Toyota Land Cruiser 300 VX-R</option>
              </select>
            </div>
            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1.5">Jenis Layanan</label>
              <select
                value={formData.serviceType}
                onChange={(e) => setFormData({ ...formData, serviceType: e.target.value })}
                className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-3 text-xs text-white focus:outline-none focus:border-amber-500"
              >
                <option value="Dengan Driver VIP">Dengan Driver VIP (Inner City)</option>
                <option value="Driver + Luar Kota">Dengan Driver VIP + Luar Kota</option>
                <option value="Lepas Kunci (Persyaratan Lengkap)">Lepas Kunci (Self-Drive)</option>
              </select>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1.5">Tanggal Mulai Sewa</label>
              <input
                type="date"
                required
                value={formData.startDate}
                onChange={(e) => setFormData({ ...formData, startDate: e.target.value })}
                className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-3 text-xs text-white focus:outline-none focus:border-amber-500"
              />
            </div>
            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1.5">Tanggal Selesai Sewa</label>
              <input
                type="date"
                required
                value={formData.endDate}
                onChange={(e) => setFormData({ ...formData, endDate: e.target.value })}
                className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-3 text-xs text-white focus:outline-none focus:border-amber-500"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-300 mb-1.5">Catatan / Alamat Penjemputan</label>
            <textarea
              rows={3}
              value={formData.notes}
              onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
              placeholder="Contoh: Jemput di Bandara Soekarno-Hatta Terminal 3 jam 09.00 WIB..."
              className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-3 text-xs text-white focus:outline-none focus:border-amber-500"
            />
          </div>

          <button
            type="submit"
            disabled={submitting}
            className="w-full bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-slate-950 font-black text-sm py-4 rounded-xl shadow-xl shadow-amber-500/20 transition transform active:scale-95 disabled:opacity-50"
          >
            {submitting ? 'Memproses Reservasi...' : 'Kirim Reservasi Sekarang →'}
          </button>
        </form>
      )}
    </div>
  );
}

export default function BookingPage() {
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
            ← Katalog Armada
          </Link>
        </div>
      </nav>

      <main className="max-w-7xl mx-auto px-4 py-10">
        <Suspense fallback={<div className="text-center text-xs text-slate-400">Memuat formulir pemesanan...</div>}>
          <BookingFormContent />
        </Suspense>
      </main>
    </div>
  );
}
