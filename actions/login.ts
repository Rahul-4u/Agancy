"use server";

import { signIn } from "next-auth/react";


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
    // Next.js 
    if (error?.message?.includes("NEXT_REDIRECT")) {
      throw error;
    }

    // 
    if (error?.type === "CredentialsSignin" || error?.code === "credentials") {
      return { error: "Invalid credentials!" };
    }

    // অন্য যেকোনো এররের জন্য
    return { error: "Something went wrong! Please try again." };
  }
}