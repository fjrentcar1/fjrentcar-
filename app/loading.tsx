export default function Loading() {
  return (
    <div className="min-h-screen bg-slate-950 flex flex-col items-center justify-center space-y-4">
      <div className="relative flex items-center justify-center">
        <div className="w-16 h-16 rounded-2xl border-2 border-amber-500/20 border-t-amber-500 animate-spin" />
        <div className="absolute w-8 h-8 rounded-lg bg-gradient-to-br from-amber-400 to-amber-600 text-slate-950 font-black text-xs flex items-center justify-center">
          FJ
        </div>
      </div>
      <p className="text-xs text-slate-400 font-medium tracking-wider uppercase">
        Memuat Layanan FJ Rentcar...
      </p>
    </div>
  );
}
