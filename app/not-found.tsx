import Link from 'next/link';

export default function NotFound() {
  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col items-center justify-center p-4 text-center selection:bg-amber-500 selection:text-slate-950">
      <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-amber-400 to-amber-600 text-slate-950 font-black text-2xl flex items-center justify-center mb-6 shadow-xl shadow-amber-500/20">
        404
      </div>
      <h1 className="text-2xl sm:text-4xl font-black text-white">Halaman Tidak Ditemukan</h1>
      <p className="text-xs sm:text-sm text-slate-400 mt-2 max-w-md leading-relaxed">
        Maaf, halaman yang Anda cari tidak tersedia atau alamat URL telah dipindahkan.
      </p>

      <div className="flex gap-3 mt-8">
        <Link
          href="/"
          className="bg-gradient-to-r from-amber-500 to-amber-600 text-slate-950 font-bold text-xs px-6 py-3 rounded-xl shadow-lg shadow-amber-500/20 hover:from-amber-400 hover:to-amber-500 transition"
        >
          Kembali ke Beranda
        </Link>
        <Link
          href="/cars"
          className="bg-slate-900 border border-slate-800 text-slate-300 font-bold text-xs px-6 py-3 rounded-xl hover:bg-slate-800 transition"
        >
          Lihat Katalog Armada
        </Link>
      </div>
    </div>
  );
}
