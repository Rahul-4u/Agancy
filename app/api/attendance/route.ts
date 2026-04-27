import { db } from "@/lib/db";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { NextResponse } from "next/server";

/**
 * POST: Handles Daily Attendance (Check-in / Check-out)
 */
export async function POST(req: Request) {
  try {
    const session = await getServerSession(authOptions);
    
    if (!session?.user) {
      return new NextResponse("Unauthorized Access", { status: 401 });
    }

    const { type, time } = await req.json(); // Expected time format: "HH:mm AM/PM"
    const userId = (session.user as any).id;

    // Normalize date to track records on a per-day basis (Midnight start)
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    // Fetch user profile to check designated office shift start time
    const profile = await db.user.findUnique({
      where: { id: userId },
      select: { officeStartTime: true }
    });

    // Default to 09:00 AM if no specific shift is set by HR
    const shiftStartConfig = profile?.officeStartTime || "09:00 AM";

    // Lookup existing logs for the current user today
    const existingEntry = await db.attendance.findFirst({
      where: { 
        userId: userId, 
        date: { gte: today } 
      }
    });

    // --- Clock-In Procedure ---
    if (type === "IN") {
      if (existingEntry) {
        return NextResponse.json({ message: "Attendance already logged for today" }, { status: 400 });
      }

      let attendanceStatus = "PRESENT";
      let delayDuration = 0;

      // Parsing times for comparison
      const referenceTime = new Date(`2026-01-01 ${shiftStartConfig}`);
      const actualTime = new Date(`2026-01-01 ${time}`);

      // Evaluate if the user is late based on HR policy
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

    // --- Clock-Out Procedure ---
    if (type === "OUT") {
      if (!existingEntry) {
        return NextResponse.json({ message: "No active check-in record found to close" }, { status: 400 });
      }
      
      const updatedLog = await db.attendance.update({
        where: { id: existingEntry.id },
        data: { checkOut: time }
      });

      return NextResponse.json(updatedLog);
    }

    return new NextResponse("Invalid Request Type", { status: 400 });

  } catch (error: any) {
    console.error("[ATTENDANCE_POST_ERROR]:", error.message);
    return new NextResponse("Internal Synchronization Error", { status: 500 });
  }
}

/**
 * GET: Retrieves Attendance History
 * - HR/Admin: Can view all staff logs
 * - Employee: Can only view personal logs
 */
export async function GET(req: Request) {
  try {
    const session = await getServerSession(authOptions);
    if (!session?.user) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    const userRole = (session.user as any).role;
    const userId = (session.user as any).id;

    // Role-based access control (RBAC) logic
    // HR and ADMIN roles bypass personal filters to see the full list
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
    console.error("[ATTENDANCE_GET_ERROR]:", error.message);
    return new NextResponse("Failed to retrieve attendance history", { status: 500 });
  }
}