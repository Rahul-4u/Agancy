"use client";
import { signIn } from "next-auth/react";
import { useState } from "react";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="max-w-md w-full p-8 bg-white rounded-2xl shadow-xl">
        <h2 className="text-3xl font-extrabold text-center text-gray-800 mb-8">
          Welcome Back
        </h2>

        {/* Social Logins */}
        <div className="space-y-4 mb-8">
          <button 
            onClick={() => signIn("google", { callbackUrl: "/dashboard" })}
            className="w-full flex items-center justify-center gap-3 border border-gray-300 p-3 rounded-xl hover:bg-gray-50 transition-all font-medium"
          >
            <img src="https://authjs.dev/img/providers/google.svg" className="w-5 h-5" alt="Google"/>
            Continue with Google
          </button>
          
          <button 
            onClick={() => signIn("facebook", { callbackUrl: "/dashboard" })}
            className="w-full flex items-center justify-center gap-3 bg-[#1877F2] text-white p-3 rounded-xl hover:bg-blue-700 transition-all font-medium shadow-md"
          >
            <img src="https://authjs.dev/img/providers/facebook.svg" className="w-5 h-5 invert" alt="Facebook"/>
            Continue with Facebook
          </button>
        </div>

        <div className="relative my-8 text-center">
          <hr className="border-gray-200" />
          <span className="absolute left-1/2 -translate-x-1/2 -top-3 bg-white px-4 text-gray-400 text-sm italic">
            or use email
          </span>
        </div>

        {/* Manual Login Form */}
        <form className="space-y-5" onSubmit={(e) => e.preventDefault()}>
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-1">Email Address</label>
            <input 
              type="email" 
              placeholder="name@company.com"
              className="w-full p-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 outline-none transition-all"
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-1">Password</label>
            <input 
              type="password" 
              placeholder="••••••••"
              className="w-full p-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 outline-none transition-all"
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>

          <button 
            onClick={() => signIn("credentials", { email, password, callbackUrl: "/dashboard" })}
            className="w-full bg-black text-white p-3 rounded-xl font-bold hover:bg-gray-800 transition-all shadow-lg"
          >
            Sign In
          </button>
        </form>

        <p className="mt-8 text-center text-gray-600 text-sm">
          Don't have an account? 
          <a href="/register" className="text-blue-600 font-bold hover:underline ml-1">Create one</a>
        </p>
      </div>
    </div>
  );
}