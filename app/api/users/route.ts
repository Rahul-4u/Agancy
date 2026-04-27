import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma"; // আপনার প্রিজমা ক্লায়েন্ট পাথ ঠিক করে নিন

export async function GET() {
  try {
    // ডাটাবেস থেকে শুধু EMPLOYEE রোল থাকা ইউজারদের নিয়ে আসা
    const users = await prisma.user.findMany({
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
  } catch (error) {
    console.error("Fetch Users Error:", error);
    return NextResponse.json({ error: "Failed to fetch users" }, { status: 500 });
  }
}