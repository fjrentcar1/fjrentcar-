import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  const cars = [
    {
      slug: 'alphard-hev',
      name: 'Toyota All New Alphard HEV',
      category: 'Luxury MPV',
      pricePerDay: 3000000,
      capacity: '7 Penumpang',
      transmission: 'Automatic CVT',
      engine: '2.5L Hybrid Electric',
      image: 'https://images.unsplash.com/photo-1549399542-7e3f8b79c341?auto=format&fit=crop&w=1200&q=80',
      popular: true,
    },
    {
      slug: 'lexus-lm350',
      name: 'Lexus LM 350 Hybrid',
      category: 'Luxury MPV',
      pricePerDay: 6500000,
      capacity: '4 Penumpang',
      transmission: 'Direct-Shift CVT',
      engine: '2.5L Hybrid Electric',
      image: 'https://images.unsplash.com/photo-1503376780353-7e6692767b70?auto=format&fit=crop&w=1200&q=80',
      popular: true,
    },
    {
      slug: 'mercedes-sclass',
      name: 'Mercedes-Benz S-Class S450',
      category: 'Flagship Sedan',
      pricePerDay: 5500000,
      capacity: '4 Penumpang',
      transmission: '9G-TRONIC Automatic',
      engine: '3.0L Inline-6 Turbo',
      image: 'https://images.unsplash.com/photo-1618843479313-40f8afb4b4d8?auto=format&fit=crop&w=1200&q=80',
      popular: true,
    },
    {
      slug: 'land-cruiser-300',
      name: 'Toyota Land Cruiser 300 VX-R',
      category: 'Premium SUV',
      pricePerDay: 5000000,
      capacity: '7 Penumpang',
      transmission: '10-Speed Automatic',
      engine: '3.3L V6 Twin Turbo Diesel',
      image: 'https://images.unsplash.com/photo-1533473359331-0135ef1b58bf?auto=format&fit=crop&w=1200&q=80',
      popular: false,
    },
  ];

  for (const car of cars) {
    await prisma.car.upsert({
      where: { slug: car.slug },
      update: car,
      create: car,
    });
  }

  console.log('✅ Seeding database armada FJ Rentcar berhasil diselesaikan!');
}

main()
  .catch((e) => {
    console.error('❌ Gagal seeding database:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
