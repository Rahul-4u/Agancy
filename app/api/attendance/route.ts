import { NextResponse } from 'next/server';
import { db } from "@/lib/db"; // আপনার db.ts থেকে ইমপোর্ট করুন

export async function POST(req: Request) {
  try {
    const { userId, type } = await req.json();

    // ১. চেক করুন এই ID-র কোনো ইউজার আপনার ডেটাবেজে আছে কি না
    const userExists = await db.user.findUnique({ where: { id: userId } });
    if (!userExists) return NextResponse.json({ error: "User not found in Database" }, { status: 400 });

    const today = new Date();
    today.setHours(0, 0, 0, 0);

    if (type === 'check-in') {
      const record = await db.attendance.create({
        data: {
          userId,
          checkIn: new Date(),
          date: today,
          status: new Date().getHours() >= 10 ? "Late" : "Present"
        }
      });
      return NextResponse.json(record);
    }
    
    // ... বাকি লজিক (check-out) আগের মতোই থাকবে
  } catch (error: any) {
    console.error("PRISMA ERROR:", error); // এটি আপনার টার্মিনালে এরর দেখাবে
    return NextResponse.json({ error: "Database Connection Failed" }, { status: 500 });
  }
}