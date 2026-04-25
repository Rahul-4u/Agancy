"use client";

import { useActionState } from "react";
import { loginUser } from "@/actions/login";
import Link from "next/link";

export default function LoginPage() {
  const [state, formAction, isPending] = useActionState(loginUser, null);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <form 
        action={formAction} 
        className="bg-white p-8 rounded-lg shadow-lg w-96 flex flex-col gap-4 text-black"
      >
        <h1 className="text-2xl font-bold text-center text-blue-600">Login</h1>

        {state?.error && (
          <p className="text-red-500 text-sm bg-red-50 p-2 rounded border border-red-200">
            {state.error}
          </p>
        )}
        {state?.success && (
          <p className="text-green-600 text-sm bg-green-50 p-2 rounded border border-green-200">
            {state.success}
          </p>
        )}

        <div className="flex flex-col gap-1">
          <label className="text-sm font-semibold">Email Address</label>
          <input 
            name="email" 
            type="email" 
            placeholder="example@mail.com" 
            className="border p-2 rounded outline-blue-500" 
            required 
          />
        </div>

        <div className="flex flex-col gap-1">
          <label className="text-sm font-semibold">Password</label>
          <input 
            name="password" 
            type="password" 
            placeholder="••••••••" 
            className="border p-2 rounded outline-blue-500" 
            required 
          />
        </div>

        <button 
          disabled={isPending}
          type="submit" 
          className="bg-blue-600 text-white p-2 rounded font-bold hover:bg-blue-700 disabled:bg-gray-400 transition"
        >
          {isPending ? "Logging in..." : "Login"}
        </button>

        <p className="text-sm text-center">
          Don't have an account?{" "}
          <Link href="/register" className="text-blue-600 hover:underline">
            Register here
          </Link>
        </p>
      </form>
    </div>
  );
}