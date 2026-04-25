"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { signIn } from "next-auth/react";

export default function RegisterPage() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const res = await fetch("/api/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email, password }),
      });

      if (res.ok) {
        // রেজিস্ট্রেশন সফল হলে সরাসরি লগইন করিয়ে ড্যাশবোর্ডে পাঠিয়ে দিবে
        await signIn("credentials", {
          email,
          password,
          callbackUrl: "/dashboard",
        });
      } else {
        const errorData = await res.json();
        alert(errorData.message || "Something went wrong!");
      }
    } catch (error) {
      console.error("Registration error:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="max-w-md w-full p-8 bg-white rounded-2xl shadow-xl">
        <h2 className="text-3xl font-extrabold text-center text-gray-800 mb-8">
          Create Account
        </h2>

        {/* Social Register */}
        <div className="space-y-4 mb-8">
          <button 
            onClick={() => signIn("google", { callbackUrl: "/dashboard" })}
            className="w-full flex items-center justify-center gap-3 border border-gray-300 p-3 rounded-xl hover:bg-gray-50 transition-all font-medium"
          >
            <img src="https://authjs.dev/img/providers/google.svg" className="w-5 h-5" alt="Google"/>
            Join with Google
          </button>
        </div>

        <div className="relative my-8 text-center">
          <hr className="border-gray-200" />
          <span className="absolute left-1/2 -translate-x-1/2 -top-3 bg-white px-4 text-gray-400 text-sm italic">
            or use email
          </span>
        </div>

        <form className="space-y-5" onSubmit={handleSubmit}>
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-1">Full Name</label>
            <input 
              required
              type="text" 
              placeholder="John Doe"
              className="w-full p-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 outline-none transition-all"
              onChange={(e) => setName(e.target.value)}
            />
          </div>
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-1">Email Address</label>
            <input 
              required
              type="email" 
              placeholder="name@company.com"
              className="w-full p-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 outline-none transition-all"
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-1">Password</label>
            <input 
              required
              type="password" 
              placeholder="••••••••"
              className="w-full p-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 outline-none transition-all"
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>

          <button 
            type="submit"
            disabled={loading}
            className="w-full bg-blue-600 text-white p-3 rounded-xl font-bold hover:bg-blue-700 transition-all shadow-lg disabled:bg-gray-400"
          >
            {loading ? "Creating Account..." : "Register Now"}
          </button>
        </form>

        <p className="mt-8 text-center text-gray-600 text-sm">
          Already have an account? 
          <a href="/login" className="text-blue-600 font-bold hover:underline ml-1">Login here</a>
        </p>
      </div>
    </div>
  );
}