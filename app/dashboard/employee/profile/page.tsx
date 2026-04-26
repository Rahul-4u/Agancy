"use client";
import { useSession } from "next-auth/react";
import { User, Mail, Phone, MapPin, Camera } from "lucide-react";

export default function EmployeeProfile() {
  const { data: session } = useSession();

  return (
    <div className="max-w-4xl mx-auto space-y-8">
      <h1 className="text-3xl font-black italic tracking-tighter">MY PROFILE</h1>
      
      <div className="bg-white rounded-[48px] p-10 border shadow-sm">
        <div className="flex flex-col md:flex-row gap-10 items-center">
          {/* প্রোফাইল পিকচার */}
          <div className="relative group">
            <div className="w-32 h-32 bg-slate-100 rounded-full flex items-center justify-center border-4 border-white shadow-xl overflow-hidden">
              <User size={64} className="text-slate-300" />
            </div>
            <button className="absolute bottom-0 right-0 bg-blue-600 text-white p-2 rounded-full shadow-lg hover:scale-110 transition-all">
              <Camera size={16} />
            </button>
          </div>

          {/* ইনফরমেশন ফর্ম */}
          <div className="flex-1 grid grid-cols-1 md:grid-cols-2 gap-6 w-full">
            <InfoBox label="Full Name" value={session?.user?.name || "N/A"} isEditable />
            <InfoBox label="Email Address" value={session?.user?.email || "N/A"} />
            <InfoBox label="Phone" value="+880 1234..." isEditable />
            <InfoBox label="Address" value="Dhaka, Bangladesh" isEditable />
          </div>
        </div>
        
        <div className="mt-10 flex justify-end">
          <button className="bg-slate-900 text-white px-10 py-3 rounded-2xl font-bold hover:bg-blue-600 transition-all shadow-lg">
            SAVE CHANGES
          </button>
        </div>
      </div>
    </div>
  );
}

function InfoBox({ label, value, isEditable = false }: any) {
  return (
    <div className="space-y-2">
      <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">{label}</p>
      <input 
        type="text" 
        defaultValue={value} 
        readOnly={!isEditable}
        className={`w-full p-4 rounded-2xl border text-sm font-bold italic transition-all ${isEditable ? 'bg-white border-slate-200 focus:border-blue-500 outline-none shadow-inner' : 'bg-slate-50 border-transparent cursor-not-allowed'}`}
      />
    </div>
  );
}