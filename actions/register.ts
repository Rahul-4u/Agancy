"use server";

import { db } from "@/lib/db";
import bcrypt from "bcryptjs"; // npm install bcryptjs ইন্সটল করে নিও

export async function registerUser(prevState: any, formData: FormData) {
  try {
    const name = formData.get("name") as string;
    const email = formData.get("email") as string;
    const password = formData.get("password") as string;

    if (!email || !password) {
      return { error: "Email and Password are required!" };
    }

    // ১. চেক করা ইউজার আগে থেকে আছে কি না
    const existingUser = await db.user.findUnique({
      where: { email },
    });

    if (existingUser) {
      return { error: "User already exists with this email!" };
    }

    // ২. পাসওয়ার্ড হ্যাশ করা (নিরাপত্তার জন্য)
    const hashedPassword = await bcrypt.hash(password, 10);

    // ৩. ডাটাবেসে সেভ করা
    await db.user.create({
      data: {
        name,
        email,
        password: hashedPassword,
      },
    });

    return { success: "User registered successfully! Now you can login." };

  } catch (error) {
    console.error("Registration Error:", error);
    return { error: "Something went wrong. Please try again." };
  }
}