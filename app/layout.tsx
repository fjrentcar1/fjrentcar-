import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'FJ RENTCAR — Rental Mobil Mewah & VIP Jabodetabek',
  description: 'Sewa Toyota Alphard HEV, Lexus LM350, Mercedes-Benz S-Class, dan Land Cruiser 300 dengan pengemudi profesional. Layanan eksklusif VIP 24 Jam Jabodetabek.',
  keywords: ['rental mobil mewah', 'sewa alphard jakarta', 'rental lexus lm350', 'sewa mercedes s class', 'fj rentcar'],
  authors: [{ name: 'FJ RENTCAR' }],
  openGraph: {
    title: 'FJ RENTCAR — Rental Mobil Mewah & VIP Jabodetabek',
    description: 'Layanan sewa armada eksekutif terpercaya dengan pengemudi profesional & armada unit terbaru.',
    url: 'https://fjrentcar.com',
    siteName: 'FJ RENTCAR',
    images: [
      {
        url: 'https://images.unsplash.com/photo-1549399542-7e3f8b79c341?auto=format&fit=crop&w=1200&q=80',
        width: 1200,
        height: 630,
        alt: 'FJ RENTCAR Premium Fleet',
      },
    ],
    locale: 'id_ID',
    type: 'website',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="id">
      <body className={`${inter.className} bg-slate-950 text-slate-100 antialiased selection:bg-amber-500 selection:text-slate-950`}>
        {children}
      </body>
    </html>
  );
}
