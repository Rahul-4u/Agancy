import { NextResponse } from 'next/server';
import { db } from '@/lib/db';

export async function GET() {
  try {
    const data = await db.attendance.findMany({
      orderBy: { date: 'desc' }, // নতুন ডাটা আগে দেখাবে
      include: { user: true } // ইউজারের নামসহ দেখাবে
    });
    return NextResponse.json(data);
  } catch (error) {
    return NextResponse.json({ error: "Failed to fetch" }, { status: 500 });
  }
}