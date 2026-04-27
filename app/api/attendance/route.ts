import { db } from "@/lib/db";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const session = await getServerSession(authOptions);
    
    if (!session?.user) {
      return new NextResponse("Unauthorized Access", { status: 401 });
    }

    const { type, time } = await req.json(); 
    const userId = (session.user as any).id;

    const today = new Date();
    today.setHours(0, 0, 0, 0);

    // --- FIX: Safely fetch user profile ---
    const profile = await db.user.findUnique({
      where: { id: userId },
    });

    // Fallback logic if officeStartTime is missing in DB
    const shiftStartConfig = (profile as any)?.officeStartTime || "09:00 AM";

    // Lookup today's entry
    const existingEntry = await db.attendance.findFirst({
      where: { 
        userId: userId, 
        date: { gte: today } 
      }
    });

    // --- Clock-In Logic ---
    if (type === "IN") {
      if (existingEntry) {
        return NextResponse.json({ message: "Already checked in for today" }, { status: 400 });
      }

      let attendanceStatus = "PRESENT";
      let delayDuration = 0;

      const referenceTime = new Date(`2026-01-01 ${shiftStartConfig}`);
      const actualTime = new Date(`2026-01-01 ${time}`);

      if (actualTime > referenceTime) {
        attendanceStatus = "LATE";
        delayDuration = Math.round((actualTime.getTime() - referenceTime.getTime()) / 60000);
      }

      const attendanceRecord = await db.attendance.create({
        data: { 
          userId, 
          checkIn: time, 
          status: attendanceStatus,
          lateMinutes: delayDuration,
          date: new Date()
        }
      });

      return NextResponse.json(attendanceRecord);
    }

    // --- Clock-Out Logic (Fixing the null issue) ---
    if (type === "OUT") {
      if (!existingEntry) {
        return NextResponse.json({ message: "No active check-in record found" }, { status: 400 });
      }
      
      // Update the existing record's checkOut field
      const updatedLog = await db.attendance.update({
        where: { id: existingEntry.id },
        data: { checkOut: time }
      });

      return NextResponse.json(updatedLog);
    }

    return new NextResponse("Invalid Request", { status: 400 });

  } catch (error: any) {
    console.error("[ATTENDANCE_POST_ERROR]:", error.message);
    return new NextResponse("Sync Error: Please ensure DB schema is correct", { status: 500 });
  }
}

export async function GET(req: Request) {
  try {
    const session = await getServerSession(authOptions);
    if (!session?.user) return new NextResponse("Unauthorized", { status: 401 });

    const userRole = (session.user as any).role;
    const userId = (session.user as any).id;

    const filter = (userRole === "HR" || userRole === "ADMIN") ? {} : { userId };

    const historyLogs = await db.attendance.findMany({
      where: filter,
      include: {
        user: {
          select: { 
            name: true, 
            email: true, 
            designation: true, 
            department: true 
          }
        }
      },
      orderBy: { date: 'desc' }
    });

    return NextResponse.json(historyLogs);
  } catch (error: any) {
    return new NextResponse("Failed to fetch logs", { status: 500 });
  }
}