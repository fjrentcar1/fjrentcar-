import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const code = searchParams.get('code');

  if (!code) {
    return NextResponse.json(
      { success: false, message: 'Kode booking wajib diisi' },
      { status: 400 }
    );
  }

  try {
    const booking = await prisma.booking.findFirst({
      where: {
        bookingCode: {
          equals: code.trim(),
          mode: 'insensitive',
        },
      },
      include: {
        car: true,
      },
    });

    if (!booking) {
      return NextResponse.json(
        { success: false, message: 'Kode booking tidak ditemukan' },
        { status: 404 }
      );
    }

    return NextResponse.json({ success: true, data: booking });
  } catch (error) {
    return NextResponse.json(
      { success: false, message: 'Terjadi kesalahan sistem saat melacak pesanan' },
      { status: 500 }
    );
  }
}
