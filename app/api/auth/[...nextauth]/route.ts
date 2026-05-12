import NextAuth from "next-auth";
import { authOptions } from "@/lib/auth"; // আপনার পাথ অনুযায়ী

const handler = NextAuth(authOptions);

// এই দুটি লাইন অত্যন্ত গুরুত্বপূর্ণ
export { handler as GET, handler as POST };