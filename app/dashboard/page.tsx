import { getServerSession } from "next-auth";
import { authOptions } from "../api/auth/[...nextauth]/route";
import { redirect } from "next/navigation";

export default async function DashboardPage() {
  const session = await getServerSession(authOptions);

  if (!session) redirect("/login");

  // @ts-ignore
  const role = session.user.role;

  // ফোল্ডার পাথগুলো তোমার সেটআপ অনুযায়ী চেক করে নাও
  if (role === "ADMIN") redirect("/dashboard/admin/admin-panel");
  if (role === "HR") redirect("/dashboard/hr/hr-panel");
  if (role === "LEADER") redirect("/dashboard/leader/leader-panel");
  if (role === "EMPLOYEE") redirect("/dashboard/employee/employee-panel");

  redirect("/dashboard/user/user-panel");
}