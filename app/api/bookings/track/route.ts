import { NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const code = searchParams.get('code');

  if (!code) {
    return NextResponse.json(
      { success: false, message: 'Kode booking atau nomor HP wajib diisi.' },
      { status: 400 }
    );
  }

  try {
    const booking = await prisma.booking.findFirst({
      where: {
        OR: [
          { bookingCode: { equals: code.trim(), mode: 'insensitive' } },
          { custPhone: { contains: code.trim() } },
        ],
      },
      include: {
        car: true,
      },
      orderBy: {
        createdAt: 'desc',
      },
    });

    if (!booking) {
      return NextResponse.json(
        { success: false, message: 'Data pesanan tidak ditemukan. Periksa kembali kode booking Anda.' },
        { status: 404 }
      );
    }

    return NextResponse.json({ success: true, data: booking });
  } catch (error) {
    return NextResponse.json(
      { success: false, message: 'Terjadi kesalahan sistem saat melacak pesanan.' },
      { status: 500 }
    );
  }
}
