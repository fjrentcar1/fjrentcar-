'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';

interface Booking {
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
  };
}

export default function AdminPage() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [pinInput, setPinInput] = useState('');
  const [pinError, setPinError] = useState('');

  const [bookings, setBookings] = useState<Booking[]>([]);
  const [loading, setLoading] = useState(false);

  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState('ALL');

  const ADMIN_PIN = 'fjrentcar2026';

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (pinInput === ADMIN_PIN) {
      setIsAuthenticated(true);
      setPinError('');
    } else {
      setPinError('Passcode/PIN Admin Salah. Akses ditolak.');
    }
  };

  const fetchBookings = async () => {
    setLoading(true);
    try {
      const res = await fetch('/api/bookings');
      const data = await res.json();
      if (data.success) {
        setBookings(data.data);
      }
    } catch (err) {
      console.error('Gagal mengambil data pesanan', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (isAuthenticated) {
      fetchBookings();
    }
  }, [isAuthenticated]);

  const updateStatus = async (id: string, newStatus: Booking['status']) => {
    try {
      const res = await fetch(`/api/bookings/${id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status: newStatus }),
      });
      const data = await res.json();
      if (data.success) {
        setBookings((prev) =>
          prev.map((b) => (b.id === id ? { ...b, status: newStatus } : b))
        );
      }
    } catch (err) {
      alert('Gagal mengupdate status pesanan.');
    }
  };

  const exportToCSV = () => {
    if (bookings.length === 0) {
      alert('Belum ada data transaksi untuk diekspor.');
      return;
    }

    const headers = ['Kode Booking', 'Nama Pemesan', 'No WhatsApp', 'Armada', 'Layanan', 'Tgl Mulai', 'Tgl Selesai', 'Total Biaya (Rp)', 'Status'];
    const rows = filteredBookings.map((b) => [
      b.bookingCode,
      `"${b.custName}"`,
      `"${b.custPhone}"`,
      `"${b.car?.name || '-'}"`,
      `"${b.serviceType}"`,
      new Date(b.startDate).toLocaleDateString('id-ID'),
      new Date(b.endDate).toLocaleDateString('id-ID'),
      b.totalPrice,
      b.status,
    ]);

    const csvContent =
      'data:text/csv;charset=utf-8,' +
      [headers.join(','), ...rows.map((e) => e.join(','))].join('\n');

    const encodedUri = encodeURI(csvContent);
    const link = document.createElement('a');
    link.setAttribute('href', encodedUri);
    link.setAttribute('download', `Laporan_Transaksi_FJ_Rentcar_${new Date().toISOString().slice(0, 10)}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  // Generator Pesan WhatsApp Otomatis
  const generateWAMessage = (b: Booking) => {
    const formattedPhone = b.custPhone.replace(/[^0-9]/g, '').replace(/^0/, '62');
    const text = `Halo Bapak/Ibu *${b.custName}*,\n\nTerima kasih telah memesan layanan VIP di *FJ RENTCAR*.\n\n` +
      `📌 *Detail Pesanan Anda:*\n` +
      `• Kode Booking: *${b.bookingCode}*\n` +
      `• Armada: *${b.car?.name || 'Unit VIP'}*\n` +
      `• Layanan: ${b.serviceType}\n` +
      `• Periode: ${new Date(b.startDate).toLocaleDateString('id-ID')} - ${new Date(b.endDate).toLocaleDateString('id-ID')}\n` +
      `• Total Biaya: Rp ${b.totalPrice.toLocaleString('id-ID')}\n` +
      `• Status Pesanan: *${b.status}*\n\n` +
      `Anda dapat mengecek status pesanan kapan saja melalui tautan:\n` +
      `https://fjrentcar.com/tracking\n\n` +
      `Tim operasional kami akan segera menghubungi Anda untuk koordinasi pengemudi. Salam, *FJ RENTCAR*.`;

    return `https://wa.me/${formattedPhone}?text=${encodeURIComponent(text)}`;
  };

  const filteredBookings = bookings.filter((b) => {
    const matchStatus = statusFilter === 'ALL' || b.status === statusFilter;
    const matchSearch =
      b.bookingCode.toLowerCase().includes(searchQuery.toLowerCase()) ||
      b.custName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      b.custPhone.includes(searchQuery);
    return matchStatus && matchSearch;
  });

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-slate-950 flex items-center justify-center p-4">
        <div className="max-w-md w-full bg-slate-900 border border-slate-800 rounded-2xl p-8 shadow-2xl space-y-6">
          <div className="text-center">
            <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-amber-400 to-amber-600 text-slate-950 font-black text-2xl flex items-center justify-center mx-auto shadow-lg shadow-amber-500/20 mb-3">
              FJ
            </div>
            <h1 className="text-xl font-bold text-white">Panel Operasional Admin</h1>
            <p className="text-xs text-slate-400 mt-1">Masukkan Passcode Keamanan FJ Rentcar</p>
          </div>

          <form onSubmit={handleLogin} className="space-y-4">
            {pinError && (
              <div className="bg-rose-500/10 border border-rose-500/30 text-rose-400 p-3 rounded-xl text-xs text-center font-medium">
                {pinError}
              </div>
            )}
            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1">Passcode Rahasia Admin</label>
              <input
                type="password"
                required
                value={pinInput}
                onChange={(e) => setPinInput(e.target.value)}
                placeholder="Masukkan Passcode (default: fjrentcar2026)"
                className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-3 text-xs text-white focus:outline-none focus:border-amber-500"
              />
            </div>
            <button
              type="submit"
              className="w-full bg-gradient-to-r from-amber-500 to-amber-600 text-slate-950 font-bold text-xs py-3 rounded-xl shadow-lg shadow-amber-500/20 hover:from-amber-400 hover:to-amber-500 transition"
            >
              Masuk ke Panel Admin →
            </button>
          </form>

          <div className="text-center pt-2">
            <Link href="/" className="text-xs text-slate-500 hover:text-slate-300 underline">
              ← Kembali ke Website Utama
            </Link>
          </div>
        </div>
      </div>
    );
  }

  const totalIncome = bookings
    .filter((b) => b.status === 'SELESAI' || b.status === 'DISETUJUI')
    .reduce((sum, b) => sum + b.totalPrice, 0);

  const pendingCount = bookings.filter((b) => b.status === 'DIPROSES').length;
  const activeCount = bookings.filter((b) => b.status === 'DISETUJUI').length;

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 selection:bg-amber-500 selection:text-slate-950">
      <nav className="border-b border-slate-800 bg-slate-900/90 sticky top-0 z-50 backdrop-blur-md">
        <div className="max-w-7xl mx-auto px-4 h-16 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-amber-400 to-amber-600 text-slate-950 font-black flex items-center justify-center text-sm shadow-md shadow-amber-500/20">
              FJ
            </div>
            <span className="font-bold tracking-wider text-white text-base">
              FJ RENTCAR <span className="text-xs font-normal text-amber-400 border border-amber-500/30 px-2 py-0.5 rounded-full ml-2">Panel Admin DB</span>
            </span>
          </div>

          <div className="flex items-center gap-4 text-xs">
            <button
              onClick={exportToCSV}
              className="bg-amber-500/10 border border-amber-500/30 text-amber-400 hover:bg-amber-500/20 px-3 py-1.5 rounded-lg text-xs font-semibold transition"
            >
              📥 Ekspor CSV
            </button>
            <button onClick={fetchBookings} className="text-amber-400 hover:underline text-xs">
              🔄 Refresh
            </button>
            <button onClick={() => setIsAuthenticated(false)} className="text-rose-400 hover:underline text-xs">
              Logout
            </button>
          </div>
        </div>
      </nav>

      <main className="max-w-7xl mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-2xl sm:text-3xl font-black text-white">Kelola Operasional Rental</h1>
          <p className="text-xs sm:text-sm text-slate-400 mt-1">
            Data pesanan langsung terhubung secara real-time dari database PostgreSQL Railway.
          </p>
        </div>

        {/* Metrics */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          <div className="rounded-xl border border-slate-800 bg-slate-900/80 p-5">
            <span className="text-xs text-slate-400 uppercase font-bold tracking-wider">Total Pendapatan Terkonfirmasi</span>
            <div className="text-2xl font-extrabold text-amber-400 mt-2">
              Rp {totalIncome.toLocaleString('id-ID')}
            </div>
          </div>
          <div className="rounded-xl border border-slate-800 bg-slate-900/80 p-5">
            <span className="text-xs text-slate-400 uppercase font-bold tracking-wider">Pesanan Menunggu</span>
            <div className="text-2xl font-extrabold text-white mt-2">{pendingCount} Transaksi</div>
          </div>
          <div className="rounded-xl border border-slate-800 bg-slate-900/80 p-5">
            <span className="text-xs text-slate-400 uppercase font-bold tracking-wider">Sewa Aktif (Disetujui)</span>
            <div className="text-2xl font-extrabold text-emerald-400 mt-2">{activeCount} Unit</div>
          </div>
          <div className="rounded-xl border border-slate-800 bg-slate-900/80 p-5">
            <span className="text-xs text-slate-400 uppercase font-bold tracking-wider">Total Semua Pesanan</span>
            <div className="text-2xl font-extrabold text-slate-300 mt-2">{bookings.length} Transaksi</div>
          </div>
        </div>

        {/* Filter Bar */}
        <div className="flex flex-col sm:flex-row gap-3 mb-6 bg-slate-900/60 p-4 rounded-xl border border-slate-800">
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Cari Kode Booking / Nama Pemesan / HP..."
            className="flex-1 bg-slate-950 border border-slate-800 rounded-lg px-4 py-2.5 text-xs text-white focus:outline-none focus:border-amber-500"
          />
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="bg-slate-950 border border-slate-800 rounded-lg px-4 py-2.5 text-xs text-white focus:outline-none focus:border-amber-500"
          >
            <option value="ALL">Semua Status</option>
            <option value="DIPROSES">Status: DIPROSES</option>
            <option value="DISETUJUI">Status: DISETUJUI</option>
            <option value="SELESAI">Status: SELESAI</option>
            <option value="DIBATALKAN">Status: DIBATALKAN</option>
          </select>
        </div>

        {/* Table */}
        <div className="rounded-2xl border border-slate-800 bg-slate-900/80 overflow-hidden shadow-2xl backdrop-blur-xl">
          <div className="p-5 border-b border-slate-800 flex items-center justify-between">
            <h2 className="text-sm font-bold uppercase tracking-wider text-amber-400">
              Daftar Reservasi PostgreSQL
            </h2>
            <span className="text-xs text-slate-400">Menampilkan {filteredBookings.length} dari {bookings.length} data</span>
          </div>

          <div className="overflow-x-auto">
            {loading ? (
              <div className="p-8 text-center text-xs text-slate-400">Memuat data pesanan...</div>
            ) : filteredBookings.length === 0 ? (
              <div className="p-8 text-center text-xs text-slate-400">Tidak ada pesanan yang sesuai.</div>
            ) : (
              <table className="w-full text-left text-xs">
                <thead className="bg-slate-950/80 uppercase tracking-wider text-slate-400 border-b border-slate-800">
                  <tr>
                    <th className="py-3.5 px-5">Kode & Pemesan</th>
                    <th className="py-3.5 px-5">Armada & Layanan</th>
                    <th className="py-3.5 px-5">Jadwal Sewa</th>
                    <th className="py-3.5 px-5">Total Biaya</th>
                    <th className="py-3.5 px-5">Status</th>
                    <th className="py-3.5 px-5 text-right">Aksi & Notifikasi</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-800/60 text-slate-300">
                  {filteredBookings.map((b) => (
                    <tr key={b.id} className="hover:bg-slate-800/40 transition">
                      <td className="py-4 px-5">
                        <div className="font-mono text-amber-400 font-bold">{b.bookingCode}</div>
                        <div className="font-semibold text-white mt-0.5">{b.custName}</div>
                        <div className="text-[11px] text-slate-400">{b.custPhone}</div>
                      </td>
                      <td className="py-4 px-5">
                        <div className="font-semibold text-white">{b.car?.name || 'Armada VIP'}</div>
                        <div className="text-[11px] text-amber-500/90">{b.serviceType}</div>
                      </td>
                      <td className="py-4 px-5 text-slate-300">
                        {new Date(b.startDate).toLocaleDateString('id-ID')} s/d{' '}
                        {new Date(b.endDate).toLocaleDateString('id-ID')}
                      </td>
                      <td className="py-4 px-5 font-bold text-white">
                        Rp {b.totalPrice.toLocaleString('id-ID')}
                      </td>
                      <td className="py-4 px-5">
                        <span
                          className={`inline-block px-2.5 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider ${
                            b.status === 'DISETUJUI'
                              ? 'bg-blue-500/10 text-blue-400 border border-blue-500/20'
                              : b.status === 'SELESAI'
                              ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20'
                              : b.status === 'DIBATALKAN'
                              ? 'bg-rose-500/10 text-rose-400 border border-rose-500/20'
                              : 'bg-amber-500/10 text-amber-400 border border-amber-500/20'
                          }`}
                        >
                          {b.status}
                        </span>
                      </td>
                      <td className="py-4 px-5 text-right space-x-1">
                        <a
                          href={generateWAMessage(b)}
                          target="_blank"
                          rel="noreferrer"
                          className="inline-block px-2.5 py-1 rounded bg-amber-500/10 text-amber-400 hover:bg-amber-500/20 border border-amber-500/30 text-[11px] font-semibold transition mr-1"
                        >
                          💬 Kirim WA
                        </a>

                        {b.status === 'DIPROSES' && (
                          <button
                            onClick={() => updateStatus(b.id, 'DISETUJUI')}
                            className="px-2.5 py-1 rounded bg-emerald-500/20 text-emerald-400 hover:bg-emerald-500/30 border border-emerald-500/30 text-[11px] font-semibold transition"
                          >
                            Setujui
                          </button>
                        )}
                        {b.status === 'DISETUJUI' && (
                          <button
                            onClick={() => updateStatus(b.id, 'SELESAI')}
                            className="px-2.5 py-1 rounded bg-blue-500/20 text-blue-400 hover:bg-blue-500/30 border border-blue-500/30 text-[11px] font-semibold transition"
                          >
                            Selesai
                          </button>
                        )}
                        {b.status !== 'DIBATALKAN' && b.status !== 'SELESAI' && (
                          <button
                            onClick={() => updateStatus(b.id, 'DIBATALKAN')}
                            className="px-2.5 py-1 rounded bg-slate-800 text-slate-400 hover:bg-rose-500/20 hover:text-rose-400 text-[11px] font-semibold transition"
                          >
                            Batal
                          </button>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            )}
          </div>
        </div>
      </main>
    </div>
  );
}
