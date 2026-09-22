'use client';

import { useState } from 'react';
import Link from 'next/link';

interface Order {
  id: string;
  customerName: string;
  phone: string;
  carName: string;
  serviceType: string;
  dates: string;
  totalPrice: string;
  status: 'Menunggu' | 'Disetujui' | 'Selesai' | 'Dibatalkan';
}

const INITIAL_ORDERS: Order[] = [
  {
    id: 'FJR-2026-001',
    customerName: 'Budi Santoso',
    phone: '081298765432',
    carName: 'Toyota Alphard 2.5 HEV',
    serviceType: 'Dengan Driver VIP',
    dates: '25 Sep – 27 Sep 2026',
    totalPrice: 'Rp 10.500.000',
    status: 'Menunggu',
  },
  {
    id: 'FJR-2026-002',
    customerName: 'PT Nusantara Jaya',
    phone: '081122334455',
    carName: 'Mercedes-Benz S-Class',
    serviceType: 'Dengan Driver VIP',
    dates: '28 Sep – 30 Sep 2026',
    totalPrice: 'Rp 21.000.000',
    status: 'Disetujui',
  },
  {
    id: 'FJR-2026-003',
    customerName: 'Hendrik Setiawan',
    phone: '085711223344',
    carName: 'Lexus LM 350 Hybrid',
    serviceType: 'Lepas Kunci',
    dates: '15 Sep – 17 Sep 2026',
    totalPrice: 'Rp 13.000.000',
    status: 'Selesai',
  },
];

export default function AdminPage() {
  const [orders, setOrders] = useState<Order[]>(INITIAL_ORDERS);

  const updateStatus = (id: string, newStatus: Order['status']) => {
    setOrders((prev) =>
      prev.map((ord) => (ord.id === id ? { ...ord, status: newStatus } : ord))
    );
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 selection:bg-amber-500 selection:text-slate-950">
      {/* Top Admin Bar */}
      <nav className="border-b border-slate-800 bg-slate-900/90 sticky top-0 z-50 backdrop-blur-md">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-amber-400 to-amber-600 text-slate-950 font-black flex items-center justify-center text-sm shadow-md shadow-amber-500/20">
              FJ
            </div>
            <span className="font-bold tracking-wider text-white text-base">
              FJ RENTCAR <span className="text-xs font-normal text-amber-400 border border-amber-500/30 px-2 py-0.5 rounded-full ml-2">Panel Admin</span>
            </span>
          </div>

          <div className="flex items-center gap-4 text-xs">
            <Link href="/" className="text-slate-400 hover:text-white transition">
              Lihat Website Utama →
            </Link>
          </div>
        </div>
      </nav>

      {/* Main Admin Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <h1 className="text-2xl sm:text-3xl font-black text-white">Kelola Operasional Rental</h1>
          <p className="text-xs sm:text-sm text-slate-400 mt-1">
            Pantau statistik pendapatan, ketersediaan unit, dan persetujuan pesanan pelanggan.
          </p>
        </div>

        {/* Metrics Overview */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          <div className="rounded-xl border border-slate-800 bg-slate-900/80 p-5">
            <span className="text-xs text-slate-400 uppercase font-bold tracking-wider">Total Est. Pendapatan</span>
            <div className="text-2xl font-extrabold text-amber-400 mt-2">Rp 44.500.000</div>
          </div>
          <div className="rounded-xl border border-slate-800 bg-slate-900/80 p-5">
            <span className="text-xs text-slate-400 uppercase font-bold tracking-wider">Pesanan Menunggu</span>
            <div className="text-2xl font-extrabold text-white mt-2">1 Transaksi</div>
          </div>
          <div className="rounded-xl border border-slate-800 bg-slate-900/80 p-5">
            <span className="text-xs text-slate-400 uppercase font-bold tracking-wider">Armada Disewa</span>
            <div className="text-2xl font-extrabold text-emerald-400 mt-2">2 Unit</div>
          </div>
          <div className="rounded-xl border border-slate-800 bg-slate-900/80 p-5">
            <span className="text-xs text-slate-400 uppercase font-bold tracking-wider">Armada Ready Pool</span>
            <div className="text-2xl font-extrabold text-slate-300 mt-2">3 Unit</div>
          </div>
        </div>

        {/* Table Manajemen Pesanan */}
        <div className="rounded-2xl border border-slate-800 bg-slate-900/80 overflow-hidden shadow-2xl backdrop-blur-xl">
          <div className="p-5 border-b border-slate-800 flex items-center justify-between">
            <h2 className="text-sm font-bold uppercase tracking-wider text-amber-400">
              Daftar Reservasi Masuk
            </h2>
            <span className="text-xs text-slate-400">Total: {orders.length} pesanan</span>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="bg-slate-950/80 uppercase tracking-wider text-slate-400 border-b border-slate-800">
                <tr>
                  <th className="py-3.5 px-5">ID & Pemesan</th>
                  <th className="py-3.5 px-5">Armada & Layanan</th>
                  <th className="py-3.5 px-5">Jadwal Sewa</th>
                  <th className="py-3.5 px-5">Biaya</th>
                  <th className="py-3.5 px-5">Status</th>
                  <th className="py-3.5 px-5 text-right">Aksi Manajemen</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800/60 text-slate-300">
                {orders.map((ord) => (
                  <tr key={ord.id} className="hover:bg-slate-800/40 transition">
                    <td className="py-4 px-5">
                      <div className="font-mono text-amber-400 font-bold">{ord.id}</div>
                      <div className="font-semibold text-white mt-0.5">{ord.customerName}</div>
                      <div className="text-[11px] text-slate-400">{ord.phone}</div>
                    </td>
                    <td className="py-4 px-5">
                      <div className="font-semibold text-white">{ord.carName}</div>
                      <div className="text-[11px] text-amber-500/90">{ord.serviceType}</div>
                    </td>
                    <td className="py-4 px-5 text-slate-300">{ord.dates}</td>
                    <td className="py-4 px-5 font-bold text-white">{ord.totalPrice}</td>
                    <td className="py-4 px-5">
                      <span
                        className={`inline-block px-2.5 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider ${
                          ord.status === 'Disetujui'
                            ? 'bg-blue-500/10 text-blue-400 border border-blue-500/20'
                            : ord.status === 'Selesai'
                            ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20'
                            : ord.status === 'Dibatalkan'
                            ? 'bg-rose-500/10 text-rose-400 border border-rose-500/20'
                            : 'bg-amber-500/10 text-amber-400 border border-amber-500/20'
                        }`}
                      >
                        {ord.status}
                      </span>
                    </td>
                    <td className="py-4 px-5 text-right space-x-1">
                      {ord.status === 'Menunggu' && (
                        <button
                          onClick={() => updateStatus(ord.id, 'Disetujui')}
                          className="px-2.5 py-1 rounded bg-emerald-500/20 text-emerald-400 hover:bg-emerald-500/30 border border-emerald-500/30 text-[11px] font-semibold transition"
                        >
                          Setujui
                        </button>
                      )}
                      {ord.status === 'Disetujui' && (
                        <button
                          onClick={() => updateStatus(ord.id, 'Selesai')}
                          className="px-2.5 py-1 rounded bg-blue-500/20 text-blue-400 hover:bg-blue-500/30 border border-blue-500/30 text-[11px] font-semibold transition"
                        >
                          Tandai Selesai
                        </button>
                      )}
                      {ord.status !== 'Dibatalkan' && ord.status !== 'Selesai' && (
                        <button
                          onClick={() => updateStatus(ord.id, 'Dibatalkan')}
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
          </div>
        </div>
      </main>
    </div>
  );
}
