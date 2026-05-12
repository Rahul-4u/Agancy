// lib/auth.ts
import { AuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { db } from "@/lib/db"; // নিশ্চিত করুন আপনার প্রিজমা ক্লায়েন্ট এখানেই আছে
import bcrypt from "bcryptjs";

export const authOptions: AuthOptions = {
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials: any) {
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

        return {
          id: user.id,
          email: user.email,
          name: user.name,
          role: user.role,
          phone: user.phone,
          designation: user.designation,
          department: user.department,
          image: user.image,
        };
      },
    }),
  ],
  callbacks: {
    async jwt({ token, user, trigger, session }: any) {
      // যখন প্রথমবার লগইন করা হয়
      if (user) {
        token.id = user.id;
        token.role = user.role;
        token.name = user.name;
        token.phone = user.phone;
        token.designation = user.designation;
        token.department = user.department;
        token.image = user.image;
      }

      // ফ্রন্টএন্ড থেকে update() ফাংশন কল করলে ডাটা আপডেট হবে
      if (trigger === "update" && session) {
        // নতুন সেশন ডাটা টোকেনে পুশ করা
        return { ...token, ...session.user };
      }

      // ডাটাবেস থেকে রিয়েল-টাইম ডাটা চেক করা (ঐচ্ছিক কিন্তু কার্যকরী)
      if (token?.email) {
        const dbUser = await db.user.findUnique({
          where: { email: token.email },
        });
        
        if (dbUser) {
          token.role = dbUser.role;
          token.id = dbUser.id;
          token.name = dbUser.name;
          token.image = dbUser.image;
          token.phone = dbUser.phone;
          token.designation = dbUser.designation;
          token.department = dbUser.department;
        }
      }

      return token;
    },
    async session({ session, token }: any) {
      if (session.user) {
        session.user.id = token.id;
        session.user.role = token.role;
        session.user.name = token.name;
        session.user.phone = token.phone;
        session.user.designation = token.designation;
        session.user.department = token.department;
        session.user.image = token.image;
      }
      return session;
    },
  },
  session: {
    strategy: "jwt",
    maxAge: 30 * 24 * 60 * 60,
  },
  secret: process.env.NEXTAUTH_SECRET,
  pages: {
    signIn: "/login",
  },
};