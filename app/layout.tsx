import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { AuthProvider } from "@/components/AuthProvider";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "My Agency App",
  description: "Next.js 14 with NextAuth and Supabase",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        {/* AuthProvider পুরো অ্যাপকে সেশন এক্সেস দেয় */}
        <AuthProvider>
          {children}
        </AuthProvider>
      </body>
    </html>
  );
}