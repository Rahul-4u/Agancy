import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { prisma } from "@/lib/prisma";
import { authOptions } from "@/lib/auth"; // সরাসরি lib থেকে ইমপোর্ট করলে এরর থাকবে না

export async function POST(req: Request) {
  try {
    const session = await getServerSession(authOptions);

    // সেশন ভ্যালিডেশন
    if (!session || !session.user?.email) {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }

    const body = await req.json();
    const { name, phone, designation, department, image } = body;

    // Prisma আপডেট লজিক
    const updatedUser = await prisma.user.update({
      where: { email: session.user.email },
      data: {
        name,
        phone,
        designation,
        department,
        image,
      },
    });

    return NextResponse.json({ 
      message: "Profile updated successfully", 
      user: updatedUser 
    }, { status: 200 });

  } catch (error: any) {
    console.error("Prisma Update Error:", error);
    return NextResponse.json({ 
      message: "Something went wrong", 
      error: error.message 
    }, { status: 500 });
  }
}