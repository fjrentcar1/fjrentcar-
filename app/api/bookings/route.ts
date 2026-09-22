import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

// GET: Ambil daftar semua pesanan
export async function GET() {
  try {
    const bookings = await prisma.booking.findMany({
      include: { car: true },
      orderBy: { createdAt: 'desc' },
    });
    return NextResponse.json({ success: true, data: bookings });
  } catch (error) {
    return NextResponse.json(
      { success: false, message: 'Gagal mengambil data pesanan' },
      { status: 500 }
    );
  }
}

// POST: Buat pesanan sewa baru
export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { carId, custName, custPhone, serviceType, startDate, endDate, totalPrice } = body;

    const bookingCode = `FJR-${Math.floor(1000 + Math.random() * 9000)}`;

    const newBooking = await prisma.booking.create({
      data: {
        bookingCode,
        carId,
        custName,
        custPhone,
        serviceType,
        startDate: new Date(startDate),
        endDate: new Date(endDate),
        totalPrice: Number(totalPrice),
      },
    });

    return NextResponse.json({ success: true, data: newBooking }, { status: 201 });
  } catch (error) {
    return NextResponse.json(
      { success: false, message: 'Gagal membuat pesanan sewa baru' },
      { status: 500 }
    );
  }
}
