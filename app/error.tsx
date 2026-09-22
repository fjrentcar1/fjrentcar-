'use client';

import { useEffect } from 'react';
import Link from 'next/link';

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error('Terjadi kesalahan sistem:', error);
  }, [error]);

  return (
    <div className="min-h-screen bg-slate-950 flex flex-col items-center justify-center p-4 text-center">
      <div className="w-12 h-12 rounded-xl bg-rose-500/10 border border-rose-500/30 text-rose-400 font-bold flex items-center justify-center text-xl mb-4">
        !
      </div>
      <h1 className="text-xl font-bold text-white mb-2">Terjadi Kendala Sistem</h1>
      <p className="text-xs text-slate-400 max-w-md mb-6 leading-relaxed">
        Sistem mengalami kesalahan sementara saat memproses data. Silakan coba muat ulang halaman.
      </p>
      <div className="flex gap-3">
        <button
          onClick={() => reset()}
          className="bg-amber-500 text-slate-950 font-bold text-xs px-5 py-2.5 rounded-xl hover:bg-amber-400 transition"
        >
          Coba Lagi
        </button>
        <Link
          href="/"
          className="bg-slate-900 border border-slate-800 text-slate-300 font-bold text-xs px-5 py-2.5 rounded-xl hover:bg-slate-800 transition"
        >
          Kembali ke Beranda
        </Link>
      </div>
    </div>
  );
}
