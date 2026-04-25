"use server";

import { signIn } from "@/auth";
import { AuthError } from "next-auth";

export async function loginUser(prevState: any, formData: FormData) {
  const email = formData.get("email");
  const password = formData.get("password");

  try {
    // এখানে 'await' এবং 'redirect: true' নিশ্চিত করো
    await signIn("credentials", {
      email,
      password,
      redirectTo: "/dashboard", 
    });
    
    return { success: "Logged in!" };
  } catch (error) {
    if (error instanceof AuthError) {
      switch (error.type) {
        case "CredentialsSignin":
          return { error: "Invalid credentials!" };
        default:
          return { error: "Something went wrong!" };
      }
    }

    // খুবই জরুরি: নেক্সট জেএস রিডাইরেক্ট করার জন্য এরর থ্রো করে। 
    // এটা না থাকলে ইউজার লগইন পেজেই আটকে থাকবে।
    throw error; 
  }
}