"use client";

import { useState, useEffect } from "react";
import { useSession } from "next-auth/react";
import { User, Camera, Loader2, Save, Phone, Briefcase, Building, Edit3, X } from "lucide-react";
import toast, { Toaster } from "react-hot-toast";

export default function EmployeeProfile() {
  const { data: session, update } = useSession();
  const [isEditing, setIsEditing] = useState(false);
  const [loading, setLoading] = useState(false);
  const [fetching, setFetching] = useState(true);
  const [uploading, setUploading] = useState(false); // ইমেজ আপলোড লোডার

  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    designation: "",
    department: "",
    image: "",
  });

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const res = await fetch('/api/dashboard/employee/me');
        if (res.ok) {
          const data = await res.json();
          setFormData({
            name: data.name || "",
            phone: data.phone || "",
            designation: data.designation || "",
            department: data.department || "",
            image: data.image || "",
          });
        }
      } catch (error) {
        toast.error("Failed to load profile data");
      } finally {
        setFetching(false);
      }
    };
    fetchProfile();
  }, []);

  // ইমেজ আপলোড হ্যান্ডলার (Cloudinary Example)
  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setUploading(true);
    const data = new FormData();
    data.append("file", file);
    data.append("upload_preset", "your_preset"); // আপনার Cloudinary Preset দিন

    try {
      const res = await fetch("https://api.cloudinary.com/v1_1/your_cloud_name/image/upload", {
        method: "POST",
        body: data,
      });
      const fileData = await res.json();
      if (fileData.secure_url) {
        setFormData((prev) => ({ ...prev, image: fileData.secure_url }));
        toast.success("Photo uploaded! Click save to confirm.");
      }
    } catch (err) {
      toast.error("Image upload failed");
    } finally {
      setUploading(false);
    }
  };

  const handleSave = async () => {
    setLoading(true);
    try {
      const res = await fetch('/api/dashboard/employee/update', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      if (res.ok) {
        await update({
          ...session,
          user: { ...session?.user, ...formData }
        }); 
        toast.success("Profile updated!");
        setIsEditing(false);
      }
    } catch (error) {
      toast.error("Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  if (fetching) {
    return (
      <div className="flex h-[60vh] items-center justify-center">
        <Loader2 className="animate-spin text-black" size={40} />
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto space-y-8 p-6 text-black">
      <Toaster position="top-center" />
      
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-black italic tracking-tighter uppercase">My Profile</h1>
        <button 
          onClick={() => setIsEditing(!isEditing)}
          className={`flex items-center gap-2 px-6 py-2 rounded-full font-bold text-sm transition-all ${
            isEditing ? "bg-slate-100 text-slate-600" : "bg-black text-white"
          }`}
        >
          {isEditing ? <><X size={16} /> CANCEL</> : <><Edit3 size={16} /> EDIT PROFILE</>}
        </button>
      </div>
      
      <div className="bg-white rounded-[48px] p-8 md:p-12 border shadow-sm">
        <div className="flex flex-col md:flex-row gap-12 items-center md:items-start">
          
          {/* প্রোফাইল ইমেজ সেকশন আপডেট */}
          <div className="relative group">
            <div className="w-40 h-40 bg-slate-50 rounded-full flex items-center justify-center border-4 border-white shadow-xl overflow-hidden relative">
              {formData.image ? (
                <img src={formData.image} alt="Profile" className="w-full h-full object-cover" />
              ) : (
                <User size={80} className="text-slate-200" />
              )}
              
              {/* আপলোডিং ইন্ডিকেটর */}
              {uploading && (
                <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
                  <Loader2 className="animate-spin text-white" size={24} />
                </div>
              )}
            </div>

            {/* ক্যামেরা আইকন (শুধুমাত্র এডিট মোডে দেখাবে) */}
            {isEditing && (
              <label className="absolute bottom-2 right-2 bg-blue-600 text-white p-3 rounded-full shadow-lg hover:scale-110 transition-all cursor-pointer">
                <Camera size={20} />
                <input 
                  type="file" 
                  className="hidden" 
                  onChange={handleImageUpload} 
                  accept="image/*" 
                  disabled={uploading}
                />
              </label>
            )}
          </div>

          <div className="flex-1 w-full space-y-8">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-10">
              <InfoField 
                label="Full Name" 
                value={formData.name} 
                isEditing={isEditing}
                icon={<User size={18}/>}
                onChange={(val: string) => setFormData({...formData, name: val})}
              />

              <div className="space-y-3">
                <p className="text-[11px] font-black uppercase tracking-[0.2em]">Email Address</p>
                <div className="p-4 rounded-2xl bg-slate-50 border border-transparent font-bold italic opacity-70">
                  {session?.user?.email}
                </div>
              </div>

              <InfoField label="Designation" value={formData.designation} isEditing={isEditing} icon={<Briefcase size={18}/>} onChange={(val: string) => setFormData({...formData, designation: val})} />
              <InfoField label="Department" value={formData.department} isEditing={isEditing} icon={<Building size={18}/>} onChange={(val: string) => setFormData({...formData, department: val})} />
              <InfoField label="Phone" value={formData.phone} isEditing={isEditing} icon={<Phone size={18}/>} onChange={(val: string) => setFormData({...formData, phone: val})} />
            </div>

            {isEditing && (
              <div className="pt-6 flex justify-end">
                <button 
                  onClick={handleSave} 
                  disabled={loading || uploading}
                  className="bg-black text-white px-10 py-4 rounded-2xl font-bold hover:bg-blue-600 transition-all flex items-center gap-3 disabled:opacity-50"
                >
                  {loading ? <Loader2 size={20} className="animate-spin" /> : <Save size={20} />}
                  SAVE CHANGES
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

function InfoField({ label, value, isEditing, icon, onChange }: any) {
  return (
    <div className="space-y-3">
      <p className="text-[11px] font-black uppercase tracking-[0.2em] ml-1">{label}</p>
      {isEditing ? (
        <div className="relative">
          <div className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400">{icon}</div>
          <input 
            type="text" 
            value={value} 
            onChange={(e) => onChange(e.target.value)} 
            className="w-full p-4 pl-12 rounded-2xl border border-slate-200 bg-white focus:border-blue-500 outline-none text-sm font-bold italic text-black" 
          />
        </div>
      ) : (
        <div className="flex items-center gap-4 p-4 rounded-2xl border border-slate-100 bg-slate-50/30">
          <div className="text-slate-400">{icon}</div>
          <p className="text-sm font-bold italic text-black">{value || "Not set"}</p>
        </div>
      )}
    </div>
  );
}