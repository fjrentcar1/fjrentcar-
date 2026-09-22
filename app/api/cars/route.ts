import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

const INITIAL_FLEET = [
  {
    slug: 'alphard-hev',
    name: 'Toyota Alphard 2.5 HEV',
    category: 'mpv',
    pricePerDay: 3500000,
    capacity: '7 Penumpang',
    transmission: 'CVT Automatic',
    engine: '2.5L Hybrid Electric',
    features: ['Captain Seat VIP', 'Executive Power Seat', 'Panoramic Roof', 'Ambient Lighting', 'Wireless Charger'],
    image: 'https://images.unsplash.com/photo-1549399542-7e3f8b79c341?auto=format&fit=crop&w=800&q=80',
    popular: true,
  },
  {
    slug: 'lexus-lm350',
    name: 'Lexus LM 350 Hybrid',
    category: 'mpv',
    pricePerDay: 6500000,
    capacity: '4 - 7 Penumpang',
    transmission: 'E-CVT',
    engine: '2.5L HEV System',
    features: ['Mark Levinson Audio', '48-inch Rear Screen', 'Privasi Partition Glass', 'Massage Seats', 'Cool Box'],
    image: 'https://images.unsplash.com/photo-1563720223185-11003d516935?auto=format&fit=crop&w=800&q=80',
    popular: true,
  },
  {
    slug: 'mercedes-sclass',
    name: 'Mercedes-Benz S-Class S 450',
    category: 'sedan',
    pricePerDay: 7000000,
    capacity: '5 Penumpang',
    transmission: '9G-TRONIC Auto',
    engine: '3.0L Inline-6 Turbo',
    features: ['Burmester 3D Surround', 'AIRMATIC Suspension', 'Rear Seat Entertainment', 'Soft Close Doors'],
    image: 'https://images.unsplash.com/photo-1618843479313-40f8afb4b4d8?auto=format&fit=crop&w=800&q=80',
    popular: true,
  },
  {
    slug: 'land-cruiser-300',
    name: 'Toyota Land Cruiser 300 VX-R',
    category: 'suv',
    pricePerDay: 5500000,
    capacity: '7 Penumpang',
    transmission: '10-Speed Automatic',
    engine: '3.3L Twin Turbo Diesel',
    features: ['4WD Terrain Select', 'JBL Premium Sound', 'Power Tailgate', 'Heated & Ventilated Seats'],
    image: 'https://images.unsplash.com/photo-1533473359331-0135ef1b58bf?auto=format&fit=crop&w=800&q=80',
    popular: false,
  },
  {
    slug: 'bmw-7series',
    name: 'BMW 740i Opulence',
    category: 'sedan',
    pricePerDay: 6800000,
    capacity: '5 Penumpang',
    transmission: '8-Speed Steptronic',
    engine: '3.0L BMW TwinPower Turbo',
    features: ['BMW Theatre Screen 31"', 'Bowers & Wilkins Sound', 'Executive Lounge Seating', 'Sky Lounge Glass Roof'],
    image: 'https://images.unsplash.com/photo-1555215695-3004980ad54e?auto=format&fit=crop&w=800&q=80',
    popular: false,
  },
];

export async function GET() {
  try {
    let cars = await prisma.car.findMany({
      orderBy: { createdAt: 'asc' },
    });

    // Auto-seed data jika database masih kosong
    if (cars.length === 0) {
      await prisma.car.createMany({
        data: INITIAL_FLEET,
      });
      cars = await prisma.car.findMany({
        orderBy: { createdAt: 'asc' },
      });
    }

    return NextResponse.json({ success: true, data: cars });
  } catch (error) {
    return NextResponse.json(
      { success: false, message: 'Gagal memuat data armada dari database' },
      { status: 500 }
    );
  }
}
