import type { Metadata } from 'next';
import './globals.css';
import WhatsAppButton from '@/components/WhatsAppButton';

export const metadata: Metadata = {
  title: {
    default: 'FJ RENTCAR — Rental Mobil Mewah & VIP Jabodetabek',
    template: '%s | FJ RENTCAR',
  },
  description:
    'Layanan rental mobil premium & eksklusif terpercaya. Armada Toyota Alphard HEV, Lexus LM, Mercedes-Benz, dan SUV mewah dengan driver VIP profesional atau lepas kunci.',
  keywords: [
    'Rental Mobil Mewah Jakarta',
    'Sewa Alphard Murah',
    'FJ Rentcar',
    'Sewa Lexus LM350',
    'Rental Mercedes Benz S Class',
    'Sewa Mobil Pengantin Luxury',
  ],
  metadataBase: new URL('https://secure-bravery-production-cd46.up.railway.app'),
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="id">
      <body className="antialiased bg-slate-950 text-slate-100">
        {children}
        <WhatsAppButton />
      </body>
    </html>
  );
}
