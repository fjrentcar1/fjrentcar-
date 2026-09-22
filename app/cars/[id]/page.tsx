import Link from 'next/link';

// Data simulasi armada VIP FJ Rentcar
const carDatabase: Record<string, {
  name: string;
  category: string;
  image: string;
  price12h: number;
  price24h: number;
  capacity: number;
  transmission: string;
  fuel: string;
  year: string;
  description: string;
  features: string[];
}> = {
  'alphard-hev': {
    name: 'Toyota All New Alphard HEV',
    category: 'Ultra Luxury MPV',
    image: 'https://images.unsplash.com/photo-1549399542-7e3f8b79c341?auto=format&fit=crop&w=1200&q=80',
    price12h: 3000000,
    price24h: 4500000,
    capacity: 7,
    transmission: 'CVT Automatic',
    fuel: 'Hybrid Electric (HEV)',
    year: '2024 / 2025',
    description: 'Generasi terbaru Toyota Alphard Hybrid dengan kenyamanan kabin Executive Lounge super senyap, suspensi udara halus, dan teknologi keselamatan Toyota Safety Sense 3.0.',
    features: ['Captain Seat Executive Lounge', 'Dual Sunroof & Ambient Lighting', 'Rear Seat Entertainment Display', 'Wireless Charger & USB-C Fast Ports', 'Air Purifier Nanoe-X', 'Driver VIP Berpakaian Rapi'],
  },
  'lexus-lm350': {
    name: 'Lexus LM 350 Hybrid',
    category: 'Royal Presidential MPV',
    image: 'https://images.unsplash.com/photo-1503376780353-7e6692767b70?auto=format&fit=crop&w=1200&q=80',
    price12h: 6500000,
    price24h: 9000000,
    capacity: 4,
    transmission: 'Direct-Shift Automatic',
    fuel: 'Hybrid Electric',
    year: '2024 / 2025',
    description: 'Kemewahan tanpa kompromi untuk pejabat, eksekutif VIP, dan tamu kenegaraan. Dilengkapi sekat privasi bertirai listrik, layar TV 48 inci, dan kursi massage Mark Levinson Audio System.',
    features: ['48-inch Rear Theater Screen', 'Private Glass Partition with Dimmer', 'Mark Levinson 23-Speaker Audio', 'Massage Leather Seats', 'Refrigerator / Cooler Box', 'Protokoler Escort Available'],
  },
  'mercedes-sclass': {
    name: 'Mercedes-Benz S-Class S450',
    category: 'Flagship Luxury Sedan',
    image: 'https://images.unsplash.com/photo-1618843479313-40f8afb4b4d8?auto=format&fit=crop&w=1200&q=80',
    price12h: 5500000,
    price24h: 8000000,
    capacity: 4,
    transmission: '9G-TRONIC Automatic',
    fuel: 'Bensin Premium',
    year: '2023 / 2024',
    description: 'Simbol prestige tertinggi sedan Jerman. Sangat ideal untuk kebutuhan rombongan diplomatik, wedding car pengantin premium, maupun pertemuan bisnis tingkat tinggi.',
    features: ['Burmester 3D Surround Sound', 'MBUX Interior Assistant', 'Panoramic Sliding Sunroof', 'AirMatic Suspension System', 'Soft Close Doors', 'Karpet Wol Eksklusif'],
  },
};

export default async function CarDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const resolvedParams = await params;
  const carId = resolvedParams.id;
  const car = carDatabase[carId] || {
    name: 'Armada Luxury FJ Rentcar',
    category: 'Premium Fleet',
    image: 'https://images.unsplash.com/photo-1503376780353-7e6692767b70?auto=format&fit=crop&w=1200&q=80',
    price12h: 2500000,
    price24h: 4000000,
    capacity: 7,
    transmission: 'Automatic',
    fuel: 'Bensin / Hybrid',
    year: '2024',
    description: 'Unit armada premium dengan perawatan berkala resmi dan jaminan kebersihan higienis standar hotel bintang 5.',
    features: ['Driver Berpengalaman & Berseragam', 'AC Double Blower Cold', 'Free Mineral Water & Refreshment', 'Asuransi All Risk', 'Layanan Darurat 24 Jam'],
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 selection:bg-amber-500 selection:text-slate-950">
      {/* Header Navigasi */}
      <nav className="border-b border-slate-800 bg-slate-900/80 sticky top-0 z-50 backdrop-blur-md">
        <div className="max-w-7xl mx-auto px-4 h-16 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-amber-400 to-amber-600 text-slate-950 font-black flex items-center justify-center text-sm shadow-md shadow-amber-500/20">
              FJ
            </div>
            <span className="font-bold tracking-wider text-white text-base">FJ RENTCAR</span>
          </Link>

          <Link
            href="/cars"
            className="text-xs text-amber-400 hover:text-amber-300 font-semibold flex items-center gap-1"
          >
            ← Kembali ke Katalog Armada
          </Link>
        </div>
      </nav>

      {/* Detail Konten */}
      <main className="max-w-7xl mx-auto px-4 py-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
          {/* Kolom Kiri: Visual & Deskripsi */}
          <div className="lg:col-span-7 space-y-8">
            <div className="relative rounded-3xl overflow-hidden border border-slate-800 shadow-2xl group">
              <img
                src={car.image}
                alt={car.name}
                className="w-full h-80 sm:h-[420px] object-cover group-hover:scale-105 transition-transform duration-700"
              />
              <div className="absolute top-4 left-4 bg-slate-950/80 backdrop-blur-md border border-slate-800 text-amber-400 text-xs font-bold px-3 py-1.5 rounded-full">
                {car.category}
              </div>
            </div>

            <div>
              <h1 className="text-2xl sm:text-4xl font-black text-white">{car.name}</h1>
              <p className="text-xs sm:text-sm text-slate-400 mt-2 leading-relaxed">
                {car.description}
              </p>
            </div>

            {/* Spesifikasi Ringkas */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 p-5 rounded-2xl bg-slate-900/60 border border-slate-800">
              <div>
                <span className="block text-[11px] text-slate-400 uppercase font-medium">Kapasitas</span>
                <span className="text-sm font-bold text-white mt-0.5 block">{car.capacity} Penumpang</span>
              </div>
              <div>
                <span className="block text-[11px] text-slate-400 uppercase font-medium">Transmisi</span>
                <span className="text-sm font-bold text-white mt-0.5 block">{car.transmission}</span>
              </div>
              <div>
                <span className="block text-[11px] text-slate-400 uppercase font-medium">Bahan Bakar</span>
                <span className="text-sm font-bold text-white mt-0.5 block">{car.fuel}</span>
              </div>
              <div>
                <span className="block text-[11px] text-slate-400 uppercase font-medium">Tahun Unit</span>
                <span className="text-sm font-bold text-white mt-0.5 block">{car.year}</span>
              </div>
            </div>

            {/* Fitur & Layanan Eksklusif */}
            <div>
              <h2 className="text-base font-bold text-amber-400 uppercase tracking-wider mb-4">
                Fasilitas & Fitur Kemewahan
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {car.features.map((feature, idx) => (
                  <div
                    key={idx}
                    className="flex items-center gap-3 p-3.5 rounded-xl bg-slate-900/40 border border-slate-800/80 text-xs text-slate-200"
                  >
                    <span className="text-amber-400 font-bold">✓</span>
                    <span>{feature}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Kolom Kanan: Card Estimasi Harga & Pemesanan */}
          <div className="lg:col-span-5">
            <div className="sticky top-24 rounded-3xl border border-amber-500/30 bg-slate-900/90 p-6 shadow-2xl backdrop-blur-xl space-y-6">
              <div>
                <span className="text-xs font-semibold text-amber-400 uppercase tracking-wider">Tarif Sewa Spesial</span>
                <div className="mt-2 space-y-2">
                  <div className="flex items-baseline justify-between border-b border-slate-800 pb-3">
                    <span className="text-xs text-slate-300">12 Jam (Inner City + Driver)</span>
                    <span className="text-lg font-black text-amber-400">
                      Rp {car.price12h.toLocaleString('id-ID')}
                    </span>
                  </div>
                  <div className="flex items-baseline justify-between pt-1">
                    <span className="text-xs text-slate-300">24 Jam / Full Day</span>
                    <span className="text-xl font-black text-white">
                      Rp {car.price24h.toLocaleString('id-ID')}
                    </span>
                  </div>
                </div>
                <p className="text-[11px] text-slate-400 mt-3 italic">
                  *Sudah termasuk driver profesional, BBM & asuransi perjalanan.
                </p>
              </div>

              <div className="space-y-3 pt-2">
                <Link
                  href={`/booking?car=${encodeURIComponent(car.name)}`}
                  className="block w-full text-center bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-slate-950 font-extrabold text-sm py-4 rounded-xl shadow-xl shadow-amber-500/20 transition transform active:scale-95"
                >
                  Pesan Sekarang via Form →
                </Link>

                <a
                  href={`https://wa.me/6281234567890?text=${encodeURIComponent(
                    `Halo FJ Rentcar, saya tertarik untuk menyewa unit ${car.name}. Apakah tersedia untuk jadwal minggu ini?`
                  )}`}
                  target="_blank"
                  rel="noreferrer"
                  className="block w-full text-center bg-emerald-500/10 hover:bg-emerald-500/20 border border-emerald-500/30 text-emerald-400 font-bold text-xs py-3.5 rounded-xl transition"
                >
                  Konsultasi Cepat via WhatsApp
                </a>
              </div>

              <div className="border-t border-slate-800/80 pt-4 text-[11px] text-slate-400 space-y-1.5">
                <p>🛡️ Guarantee Condition: Unit selalu bersih & wangi.</p>
                <p>🚘 Penggantian unit cepat jika terjadi kendala teknis.</p>
                <p>💳 Pembayaran via Transfer Bank / Credit Card.</p>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
