"use server";

import { signIn } from "@/auth";

export async function loginUser(prevState: any, formData: FormData) {
  const email = formData.get("email");
  const password = formData.get("password");

  try {
    await signIn("credentials", {
      email,
      password,
      redirectTo: "/dashboard", 
    });
    
    return { success: "Logged in!" };
  } catch (error: any) {
    // Next.js এর রিডাইরেক্ট এরর হ্যান্ডেল করা (যাতে লগইন কাজ করে)
    if (error?.message?.includes("NEXT_REDIRECT")) {
      throw error;
    }

    // ভুল পাসওয়ার্ড বা ইমেইলের জন্য এরর মেসেজ
    if (error?.type === "CredentialsSignin" || error?.code === "credentials") {
      return { error: "Invalid credentials!" };
    }

    // অন্য যেকোনো এররের জন্য
    return { error: "Something went wrong! Please try again." };
  }
}