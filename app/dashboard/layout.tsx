import { getServerSession } from "next-auth";

import Sidebar from "./Sidebar";
import { redirect } from "next/navigation";
import { authOptions } from "@/lib/auth";

/**
 * DashboardLayout - The main wrapper for all authenticated routes.
 * Handles server-side session validation and sidebar rendering.
 */
export default async function DashboardLayout({ children }: { children: React.ReactNode }) {
  // 1. Fetching session on the server side
  const session = await getServerSession(authOptions);

  // 2. Redirect to login if no active session is found
  if (!session) {
    redirect("/login");
  }

  /** * 3. Extracting user role. 
   * Since we added 'role' to the next-auth.d.ts file, 
   * we no longer need 'as any' casting.
   */
  // @ts-ignore
const userRole = (session?.user as any)?.role || "USER";

  return (
    <div className="flex h-screen bg-[#F8F9FB] overflow-hidden">
      
      {/* Sidebar - Fixed on the left for medium screens and up */}
      <aside className="w-72 bg-slate-900 h-full hidden md:block flex-shrink-0">
        <Sidebar userRole={userRole} />
      </aside>

      {/* Dynamic Content Area */}
      <main className="flex-1 h-full overflow-y-auto p-4 md:p-8">
        <div className="max-w-7xl mx-auto">
          {/* This is where the specific page content (Admin, Leader, Employee) 
            will be injected based on the route.
          */}
          {children}
        </div>
      </main>

    </div>
  );
}