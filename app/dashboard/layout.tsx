import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import Sidebar from "./Sidebar";
import { redirect } from "next/navigation";

export default async function DashboardLayout({ children }: { children: React.ReactNode }) {
  const session = await getServerSession(authOptions);

  // সেশন চেক
  if (!session) {
    redirect("/login");
  }

  // সেশন থেকে রোল নেওয়া (TypeScript এরর এড়াতে any ব্যবহার করা হয়েছে)
  const userRole = (session?.user as any)?.role || "USER";

  return (
    <div className="flex h-screen bg-slate-50 overflow-hidden">
      {/* বামপাশে ফিক্সড সাইডবার - ইউজার রোল পাস করা হয়েছে */}
      <aside className="w-64 bg-slate-900 h-full hidden md:block flex-shrink-0">
        <Sidebar userRole={userRole} />
      </aside>

      {/* ডানপাশে ডাইনামিক কন্টেন্ট */}
      <main className="flex-1 h-full overflow-y-auto p-4 md:p-8">
        {/* কন্টেন্ট এরিয়া */}
        <div className="max-w-7xl mx-auto">
           {children}
        </div>
      </main>
    </div>
  );
}