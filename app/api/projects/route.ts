import { NextResponse } from "next/server";
import { db } from "@/lib/db"; // কনসিস্টেন্সির জন্য 'db' ব্যবহার করুন

export async function PATCH(req: Request) {
  try {
    const body = await req.json();
    const { email, name, description, status, id } = body;

    if (!email) {
      return NextResponse.json({ error: "Employee email is required" }, { status: 400 });
    }

    // ১. ইমেইল দিয়ে ডাটাবেস থেকে ইউজারকে খুঁজে বের করা
    const user = await db.user.findUnique({
      where: { email: email },
    });

    if (!user) {
      return NextResponse.json({ error: "এই ইমেইলে কোনো ইউজার পাওয়া যায়নি" }, { status: 404 });
    }

    // ২. প্রজেক্ট সেভ বা আপডেট করা
    const project = await db.project.upsert({
      // ID চেক করা হচ্ছে যাতে ভুল ID-তে ক্রাশ না করে
      where: { id: (id && id.length > 20) ? id : '00000000-0000-0000-0000-000000000000' },
      update: {
        status: status || "WIP",
        assignedTo: user.id,
      },
      create: {
        name: name,
        description: description || "",
        status: status || "WIP",
        teamName: "Alpha Developers",
        assignedTo: user.id,
      },
    });

    return NextResponse.json(project);
  } catch (error: any) {
    console.error("Prisma Error:", error.message);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

export async function GET() {
  try {
    const projects = await db.project.findMany({
      include: {
        user: true, 
      },
      orderBy: { createdAt: "desc" },
    });
    return NextResponse.json(projects);
  } catch (error: any) {
    console.error("Fetch Error:", error.message);
    return NextResponse.json({ error: "Fetch failed" }, { status: 500 }); 
  }
}