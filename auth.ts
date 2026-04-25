import NextAuth from "next-auth";
import Credentials from "next-auth/providers/credentials";
import { db } from "@/lib/db";
import bcrypt from "bcryptjs";

// এই export লাইনটি খুবই গুরুত্বপূর্ণ!
export const { handlers, auth, signIn, signOut } = NextAuth({
  providers: [
    Credentials({
      async authorize(credentials) {
        const { email, password } = credentials;

        if (!email || !password) return null;

        const user = await db.user.findUnique({
          where: { email: email as string },
        });

        if (!user || !user.password) return null;

        const isPasswordValid = await bcrypt.compare(password as string, user.password);

        if (isPasswordValid) {
          return { id: user.id, name: user.name, email: user.email };
        }

        return null;
      },
    }),
  ],
  session: { strategy: "jwt" },
  pages: {
    signIn: "/login",
  },
});