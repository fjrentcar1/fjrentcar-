import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function PATCH(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const { id } = params;
    const body = await request.json();
    const { status } = body;

    const updatedBooking = await prisma.booking.update({
      where: { id },
      data: { status },
    });

    return NextResponse.json({ success: true, data: updatedBooking });
  } catch (error) {
    return NextResponse.json(
      { success: false, message: 'Gagal memperbarui status pesanan' },
      { status: 500 }
    );
  }
}
