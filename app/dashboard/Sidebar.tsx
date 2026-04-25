"use client";
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { LayoutDashboard, Users, Clock, LogOut, CheckSquare } from 'lucide-react';

export default function Sidebar({ userRole }: { userRole: string }) {
  const pathname = usePathname();
  
  const menu = [
    { name: 'Overview', path: '/dashboard', icon: LayoutDashboard },
    { name: 'Attendance', path: '/dashboard/attendance', icon: Clock },
    { name: 'User Management', path: '/dashboard/users', icon: Users },
    { name: 'Tasks', path: '/dashboard/tasks', icon: CheckSquare },
  ];

  return (
    <div className="flex flex-col h-full p-6">
      <div className="text-2xl font-black text-white italic mb-10 px-2 tracking-tighter">Reback</div>
      
      <nav className="flex-1 space-y-2">
        {menu.map((item) => (
          <Link 
            key={item.path} 
            href={item.path} 
            className={`flex items-center gap-4 px-4 py-3 rounded-2xl transition-all font-semibold text-sm ${
              pathname === item.path ? 'bg-blue-600 text-white shadow-lg shadow-blue-600/20' : 'text-slate-400 hover:bg-white/5 hover:text-white'
            }`}
          >
            <item.icon size={20} /> {item.name}
          </Link>
        ))}
      </nav>

      <button className="flex items-center gap-4 px-4 py-3 text-rose-400 hover:bg-rose-500/10 rounded-2xl w-full transition-all font-bold text-sm">
        <LogOut size={20} /> Logout
      </button>
    </div>
  );
}