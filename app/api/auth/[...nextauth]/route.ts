import NextAuth, { AuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { db } from "@/lib/db";
import bcrypt from "bcryptjs";

export const authOptions: AuthOptions = {
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) {
          throw new Error("Missing credentials");
        }

        const user = await db.user.findUnique({
          where: { email: credentials.email },
        });

        if (!user || !user.password) {
          throw new Error("User not found");
        }

        const isCorrect = await bcrypt.compare(
          credentials.password,
          user.password
        );

        if (!isCorrect) {
          throw new Error("Wrong password");
        }

        // লগইনের সময় প্রাথমিক ডাটা রিটার্ন
        return {
          id: user.id,
          email: user.email,
          name: user.name,
          role: user.role,
        };
      },
    }),
  ],
  callbacks: {
    async jwt({ token, user, trigger, session }) {
      // ১. লগইন করার সময় টোকেনে ডাটা রাখা
      if (user) {
        token.id = user.id;
        token.role = user.role;
      }

      // ২. অটো-রিফ্রেশ লজিক: প্রতিবার ডাটাবেস থেকে লেটেস্ট রোল চেক করবে
      // এটি করার ফলে সুপাবেজে রোল চেঞ্জ করলে এখানে অটো আপডেট হবে
      if (token?.email) {
        const dbUser = await db.user.findUnique({
          where: { email: token.email },
          select: { role: true, id: true }
        });
        
        if (dbUser) {
          token.role = dbUser.role;
          token.id = dbUser.id;
        }
      }

      // ৩. যদি ক্লায়েন্ট সাইড থেকে update() কল করা হয়
      if (trigger === "update" && session?.role) {
        token.role = session.role;
      }

      return token;
    },
    async session({ session, token }) {
      if (session.user) {
        // @ts-ignore
        session.user.id = token.id;
        // @ts-ignore
        session.user.role = token.role;
      }
      return session;
    },
  },
  session: {
    strategy: "jwt",
    maxAge: 30 * 24 * 60 * 60, // ৩০ দিন সেশন থাকবে
  },
  secret: process.env.NEXTAUTH_SECRET,
  pages: {
    signIn: "/login",
  },
};

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };