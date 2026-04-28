import { authOptions } from "@/lib/auth";
import { db } from "@/lib/db";
import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const session = await getServerSession(authOptions);
    if (!session?.user) return new NextResponse("Unauthorized", { status: 401 });

    const { type, time } = await req.json(); 
    const userId = (session.user as any).id;
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    // ফিক্স: ডাটাবেসে officeStartTime কলাম নেই, তাই সরাসরি ডিফল্ট টাইম ধরছি
    const shiftStart = "09:00 AM"; 

    // আজকের এন্ট্রি চেক
    const existingEntry = await db.attendance.findFirst({
      where: { userId, date: { gte: today } }
    });

    if (type === "IN") {
      if (existingEntry) return NextResponse.json({ message: "Already checked in" }, { status: 400 });

      let status = "PRESENT";
      let delay = 0;

      // সময় তুলনা (Late ক্যালকুলেশন)
      const refTime = new Date(`2026-01-01 ${shiftStart}`);
      const actualTime = new Date(`2026-01-01 ${time}`);

      if (actualTime > refTime) {
        status = "LATE";
        delay = Math.round((actualTime.getTime() - refTime.getTime()) / 60000);
      }

      const newRecord = await db.attendance.create({
        data: { 
          userId, 
          checkIn: time, 
          status, 
          lateMinutes: delay, 
          date: new Date() 
        }
      });
      return NextResponse.json(newRecord);
    }

    if (type === "OUT") {
      if (!existingEntry) return NextResponse.json({ message: "No check-in found" }, { status: 400 });
      if (existingEntry.checkOut) return NextResponse.json({ message: "Already checked out" }, { status: 400 });
      
      const updated = await db.attendance.update({
        where: { id: existingEntry.id },
        data: { checkOut: time }
      });
      return NextResponse.json(updated);
    }

    return new NextResponse("Invalid request", { status: 400 });
  } catch (error: any) {
    console.error("[ATTENDANCE_POST_ERROR]:", error.message);
    return NextResponse.json({ message: "Internal Server Error" }, { status: 500 });
  }
}

export async function GET(req: Request) {
  try {
    const session = await getServerSession(authOptions);
    if (!session?.user) return new NextResponse("Unauthorized", { status: 401 });

    const user = session.user as any;
    const queryFilter = (user.role === "HR" || user.role === "ADMIN") ? {} : { userId: user.id };

    const logs = await db.attendance.findMany({
      where: queryFilter,
      include: {
        user: { 
          select: { name: true, designation: true } 
        }
      },
      orderBy: { date: 'desc' }
    });

    return NextResponse.json(logs);
  } catch (error: any) {
    return NextResponse.json({ message: "Fetch failed" }, { status: 500 });
  }
}