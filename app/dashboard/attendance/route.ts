import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { getServerSession } from "next-auth"; // ইউজার কে তা জানার জন্য

export async function POST(req: Request) {
  const session = await getServerSession();
  if (!session) return NextResponse.json({ message: "Unauthorized" }, { status: 401 });

  try {
    const { type } = await req.json(); // type হবে 'check-in' অথবা 'check-out'
    const userId = (session.user as any).id;

    // আজকের তারিখ বের করা
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    // চেক করা হচ্ছে আজ সে অলরেডি হাজিরা দিয়েছে কিনা
    const existingRecord = await prisma.attendance.findFirst({
      where: { userId, date: today }
    });

    if (type === 'check-in') {
      if (existingRecord) return NextResponse.json({ message: "Already checked in" }, { status: 400 });
      
      await prisma.attendance.create({
        data: { userId, date: today, checkIn: new Date(), status: "PRESENT" }
      });
    } else {
      if (!existingRecord) return NextResponse.json({ message: "Check-in first" }, { status: 400 });
      
      await prisma.attendance.update({
        where: { id: existingRecord.id },
        data: { checkOut: new Date() }
      });
    }

    return NextResponse.json({ message: "Success" });
  } catch (error) {
    return NextResponse.json({ message: "Error" }, { status: 500 });
  }
}