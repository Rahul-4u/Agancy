import { db } from "@/lib/db";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route"; // পাথটি নিশ্চিত করো
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const session = await getServerSession(authOptions);
    
    if (!session || !session.user) {
      console.log("সেশন পাওয়া যায়নি!");
      return new NextResponse("Unauthorized", { status: 401 });
    }

    const { type, time } = await req.json();
    const userId = (session.user as any).id;

    if (!userId) {
      console.log("ইউজার আইডি পাওয়া যায়নি!");
      return new NextResponse("User ID missing", { status: 400 });
    }

    const today = new Date();
    today.setHours(0, 0, 0, 0);

    const existingRecord = await db.attendance.findFirst({
      where: { userId: userId, date: { gte: today } }
    });

    if (type === "IN") {
      if (existingRecord) return NextResponse.json({ message: "Already In" }, { status: 400 });
      
      const record = await db.attendance.create({
        data: { userId: userId, checkIn: time, status: "PRESENT" }
      });
      console.log("ডাটা সেভ হয়েছে:", record);
      return NextResponse.json(record);
    }

    if (type === "OUT") {
      if (!existingRecord) return NextResponse.json({ message: "No IN record" }, { status: 400 });
      
      const record = await db.attendance.update({
        where: { id: existingRecord.id },
        data: { checkOut: time }
      });
      return NextResponse.json(record);
    }

  } catch (error: any) {
    console.error("সুপাবেজ এরর:", error.message);
    return new NextResponse(error.message, { status: 500 });
  }
}