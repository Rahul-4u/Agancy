import { NextResponse } from "next/server";
import { db } from "@/lib/db"; // কনসিস্টেন্সির জন্য 'db' ব্যবহার করুন

export async function GET() {
  try {
    // ডাটাবেস থেকে শুধু EMPLOYEE রোল থাকা ইউজারদের নিয়ে আসা
    const users = await db.user.findMany({
      where: {
        role: "EMPLOYEE",
      },
      select: {
        id: true,
        name: true,
        email: true,
        role: true,
      },
    });

    return NextResponse.json(users);
  } catch (error: any) {
    // error: any দেওয়া হয়েছে যাতে Vercel টাইপ চেক এরর না দেয়
    console.error("Fetch Users Error:", error.message);
    return NextResponse.json(
      { error: "Failed to fetch users" }, 
      { status: 500 }
    );
  }
}