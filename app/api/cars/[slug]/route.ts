import { NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function GET(
  request: Request,
  { params }: { params: { slug: string } }
) {
  try {
    const car = await prisma.car.findUnique({
      where: { slug: params.slug },
    });

    if (!car) {
      return NextResponse.json(
        { success: false, message: 'Armada tidak ditemukan' },
        { status: 404 }
      );
    }

    return NextResponse.json({ success: true, data: car });
  } catch (error) {
    return NextResponse.json(
      { success: false, message: 'Gagal mengambil detail armada' },
      { status: 500 }
    );
  }
}
