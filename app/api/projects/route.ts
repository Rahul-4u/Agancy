import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function PATCH(req: Request) {
  try {
    const body = await req.json();
    // আমরা ফ্রন্টএন্ড থেকে email পাঠাবো
    const { email, name, description, status, id } = body;

    if (!email) {
      return NextResponse.json({ error: "Employee email is required" }, { status: 400 });
    }

    // ১. ইমেইল দিয়ে ডাটাবেস থেকে ইউজারকে খুঁজে বের করা
    const user = await prisma.user.findUnique({
      where: { email: email },
    });

    if (!user) {
      return NextResponse.json({ error: "এই ইমেইলে কোনো ইউজার পাওয়া যায়নি" }, { status: 404 });
    }

    // ২. প্রজেক্ট সেভ বা আপডেট করা (ইউজারের ID ব্যবহার করে)
    const project = await prisma.project.upsert({
      where: { id: id && id.length > 20 ? id : 'non-existent-id' },
      update: {
        status: status || "WIP",
        assignedTo: user.id, // খুঁজে পাওয়া ইউজারের আসল ID
      },
      create: {
        name: name,
        description: description || "",
        status: status || "WIP",
        teamName: "Alpha Developers",
        assignedTo: user.id, // খুঁজে পাওয়া ইউজারের আসল ID
      },
    });

    return NextResponse.json(project);
  } catch (error: any) {
    console.error("Prisma Error:", error.message);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

// এমপ্লয়ি পেজের জন্য GET মেথড
export async function GET() {
  try {
    const projects = await prisma.project.findMany({
      include: {
        user: true, // ইউজারের নাম-ইমেইল সহ ডাটা আসবে
      },
      orderBy: { createdAt: "desc" },
    });
    return NextResponse.json(projects);
  } catch (error) {
    return NextResponse.json({ error: "Fetch failed" }, { status: 500 });
  }
}