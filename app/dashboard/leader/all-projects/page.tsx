"use client";
import { useState, useEffect } from "react";
import { Search, CheckCircle, Mail, Plus, X, Loader2, Database } from "lucide-react";
import { toast } from "react-hot-toast";

export default function LeaderAllProjects() {
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedProject, setSelectedProject] = useState<any>(null);
  const [selectedEmp, setSelectedEmp] = useState<any>(null);
  const [employees, setEmployees] = useState<any[]>([]);
  const [showModal, setShowModal] = useState(false);

  // রেজিস্ট্রেশন ফর্মের জন্য নতুন স্টেট
  const [regData, setRegData] = useState({ name: "", email: "" });

  // ১. ডাটাবেস থেকে সব Employee লোড করা
  const loadEmployees = async () => {
    setLoading(true);
    try {
      const res = await fetch("/api/users"); 
      const data = await res.json();
      
      // শুধুমাত্র যাদের রোল EMPLOYEE তাদের ফিল্টার করা
      const onlyEmployees = Array.isArray(data) 
        ? data.filter((user: any) => user.role === "EMPLOYEE") 
        : [];
      setEmployees(onlyEmployees); 
    } catch (err) {
      toast.error("ডাটাবেস থেকে মেম্বার লোড করা যায়নি");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadEmployees();
  }, []);

  // ২. নতুন মেম্বার রেজিস্ট্রেশন লজিক (Fixing the 404/Functionality)
  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!regData.name || !regData.email) return toast.error("সবগুলো ঘর পূরণ করুন");

    const loadingToast = toast.loading("মেম্বার অ্যাড হচ্ছে...");
    try {
      const res = await fetch("/api/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: regData.name,
          email: regData.email,
          password: "password123", // ডিফল্ট পাসওয়ার্ড
          role: "EMPLOYEE"
        }),
      });

      if (res.ok) {
        toast.success("নতুন মেম্বার সফলভাবে অ্যাড হয়েছে", { id: loadingToast });
        setShowModal(false);
        setRegData({ name: "", email: "" });
        loadEmployees(); // লিস্ট রিফ্রেশ করা
      } else {
        const error = await res.json();
        throw new Error(error.message || "Failed");
      }
    } catch (err: any) {
      toast.error(err.message || "রেজিস্ট্রেশন করা যায়নি", { id: loadingToast });
    }
  };

  // ৩. প্রজেক্ট অ্যাসাইন লজিক
  const handleAssign = async () => {
    if (!selectedProject || !selectedEmp) return toast.error("প্রজেক্ট এবং মেম্বার সিলেক্ট করুন");

    const loadingToast = toast.loading("অ্যাসাইন হচ্ছে...");
    try {
      const res = await fetch("/api/projects", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: selectedProject.service,
          description: selectedProject.orderId,
          email: selectedEmp.email,
          status: "WIP",
        }),
      });

      if (res.ok) {
        toast.success(`অ্যাসাইন হয়েছে: ${selectedEmp.name}`, { id: loadingToast });
        setSelectedProject(null);
        setSelectedEmp(null);
      } else {
        throw new Error("Failed");
      }
    } catch (err) {
      toast.error("অ্যাসাইন করা সম্ভব হয়নি", { id: loadingToast });
    }
  };

  // ৪. সার্চ ফিল্টারিং
  const filteredEmployees = employees.filter(emp => 
    emp.name?.toLowerCase().includes(searchTerm.toLowerCase()) || 
    emp.email?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="p-4 md:p-10 space-y-8 bg-[#F8F9FB] min-h-screen font-sans italic">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        
        {/* বাম পাশ: প্রজেক্ট টেবিল */}
        <div className="lg:col-span-7 bg-white rounded-[35px] md:rounded-[44px] shadow-sm border border-slate-100 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left">
              <thead className="bg-slate-50 text-[10px] font-black text-slate-400 uppercase tracking-widest">
                <tr>
                  <th className="px-8 py-6">Order ID</th>
                  <th className="px-8 py-6">Service</th>
                  <th className="px-8 py-6 text-right">Select</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-50">
                {[
                  { id: "p1", orderId: "FO31487283BC3", service: "Squarespace" },
                  { id: "p2", orderId: "FO730581E5847", service: "WordPress" },
                  { id: "p3", orderId: "FO118AF747787", service: "Wix" },
                ].map((row) => (
                  <tr 
                    key={row.id} 
                    onClick={() => setSelectedProject(row)}
                    className={`cursor-pointer transition-all ${selectedProject?.id === row.id ? 'bg-blue-50' : 'hover:bg-slate-50/50'}`}
                  >
                    <td className="px-8 py-6 font-black text-slate-900 text-xs md:text-sm">{row.orderId}</td>
                    <td className="px-8 py-6 text-xs font-bold text-slate-500">{row.service}</td>
                    <td className="px-8 py-6 text-right">
                      <div className={`w-6 h-6 rounded-full border-2 ml-auto flex items-center justify-center transition-all ${selectedProject?.id === row.id ? 'bg-blue-600 border-blue-600' : 'border-slate-200'}`}>
                        {selectedProject?.id === row.id && <div className="w-2.5 h-2.5 bg-white rounded-full animate-pulse"></div>}
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* ডান পাশ: মেম্বার প্যানেল */}
        <div className="lg:col-span-5">
          <div className="bg-[#0B0F19] rounded-[35px] md:rounded-[44px] p-6 md:p-10 text-white shadow-2xl flex flex-col min-h-[550px] relative overflow-hidden">
            <div className="relative z-10 h-full flex flex-col">
              <div className="flex justify-between items-center mb-8">
                <h3 className="text-xl font-black italic uppercase tracking-tighter">Assign Team Member</h3>
                <button onClick={() => setShowModal(true)} className="p-3 bg-blue-600 rounded-2xl hover:bg-blue-500 transition-all active:scale-90 shadow-lg shadow-blue-900/20">
                  <Plus size={20} />
                </button>
              </div>

              {/* সার্চ ইনপুট */}
              <div className="relative mb-6">
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500" size={18} />
                <input 
                  type="text" 
                  placeholder="Search by name or email..." 
                  className="w-full bg-white/5 border border-white/10 rounded-2xl py-5 pl-12 pr-6 text-sm font-bold italic text-white outline-none focus:ring-2 ring-blue-500 placeholder:text-slate-500"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>

              {/* মেম্বার লিস্ট */}
              <div className="flex-1 space-y-3 overflow-y-auto max-h-[280px] mb-8 pr-2 custom-scrollbar">
                {loading ? (
                  <div className="flex flex-col items-center py-10 gap-2">
                    <Loader2 className="animate-spin text-blue-500" />
                  </div>
                ) : filteredEmployees.length > 0 ? (
                  filteredEmployees.map((emp) => (
                    <div 
                      key={emp.id} 
                      onClick={() => setSelectedEmp(emp)}
                      className={`p-4 rounded-2xl cursor-pointer flex items-center justify-between border transition-all ${
                        selectedEmp?.email === emp.email ? 'bg-blue-600 border-blue-400' : 'bg-white/5 border-white/5 hover:bg-white/10'
                      }`}
                    >
                      <div className="flex items-center gap-3 overflow-hidden">
                        <div className="w-10 h-10 bg-slate-800 rounded-xl flex items-center justify-center font-black text-blue-500 uppercase flex-shrink-0">
                          {emp.name?.charAt(0)}
                        </div>
                        <div className="truncate">
                          <p className="text-sm font-black italic uppercase leading-none mb-1 truncate">{emp.name}</p>
                          <p className="text-[10px] font-bold text-slate-500 truncate">{emp.email}</p>
                        </div>
                      </div>
                      {selectedEmp?.email === emp.email && <CheckCircle size={18} className="text-white flex-shrink-0" />}
                    </div>
                  ))
                ) : (
                  <div className="text-center py-10 opacity-40">
                    <p className="text-xs font-black uppercase italic tracking-widest">No Member Found</p>
                  </div>
                )}
              </div>

              <button 
                onClick={handleAssign}
                disabled={!selectedProject || !selectedEmp}
                className="w-full bg-white text-[#0B0F19] py-5 rounded-[28px] font-black italic uppercase tracking-widest hover:bg-blue-500 hover:text-white transition-all disabled:opacity-20 shadow-xl mt-auto"
              >
                Confirm Assignment
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* register modal */}
      {showModal && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-slate-950/90 backdrop-blur-md">
          <div className="bg-white rounded-[40px] p-10 w-full max-w-md relative shadow-2xl border border-white/20">
            <button onClick={() => setShowModal(false)} className="absolute top-8 right-8 text-slate-300 hover:text-slate-900 transition-colors">
              <X size={24}/>
            </button>
            <h3 className="text-3xl font-black italic uppercase tracking-tighter text-slate-900 mb-1">Add Member</h3>
            <p className="text-slate-400 font-bold italic text-[10px] uppercase tracking-widest mb-8">Register new employee to database</p>
            
            <form onSubmit={handleRegister} className="space-y-4">
              <input 
                required
                type="text" 
                placeholder="Full Name" 
                className="w-full bg-slate-50 border border-slate-100 rounded-2xl py-4 px-6 text-sm font-bold italic text-slate-900 outline-none focus:ring-2 ring-blue-500" 
                value={regData.name}
                onChange={(e) => setRegData({...regData, name: e.target.value})}
              />
              <input 
                required
                type="email" 
                placeholder="Email Address" 
                className="w-full bg-slate-50 border border-slate-100 rounded-2xl py-4 px-6 text-sm font-bold italic text-slate-900 outline-none focus:ring-2 ring-blue-500" 
                value={regData.email}
                onChange={(e) => setRegData({...regData, email: e.target.value})}
              />
              <button 
                type="submit"
                className="w-full bg-blue-600 text-white py-5 rounded-[28px] font-black italic uppercase tracking-widest hover:bg-slate-900 transition-all shadow-xl shadow-blue-100 mt-4"
              >
                Register Member
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}