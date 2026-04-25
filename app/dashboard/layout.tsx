import Sidebar from './Sidebar';

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex bg-[#F8FAFC] min-h-screen">
      {/* Sidebar Section */}
      <aside className="w-64 fixed h-full bg-[#0B1120] z-20">
        <Sidebar userRole="ADMIN" />
      </aside>

      {/* Main Content Area */}
      <div className="flex-1 ml-64 flex flex-col">
        {/* Top Header */}
        <header className="h-20 bg-white/80 backdrop-blur-md border-b border-slate-200 flex items-center justify-between px-10 sticky top-0 z-10">
          <h2 className="text-sm font-bold text-slate-800 tracking-tight">TechGuru / <span className="text-blue-600 font-black">Dashboard</span></h2>
          <div className="flex items-center gap-4">
            <div className="text-right hidden md:block">
               <p className="text-xs font-black text-slate-900 leading-none">Admin User</p>
               <p className="text-[10px] font-bold text-blue-600 uppercase mt-1">Administrator</p>
            </div>
            <div className="w-10 h-10 rounded-full bg-gradient-to-tr from-blue-600 to-indigo-600 border-2 border-white shadow-md"></div>
          </div>
        </header>

        <main className="p-8 lg:p-12">
          {children}
        </main>
      </div>
    </div>
  );
}