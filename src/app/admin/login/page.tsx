"use client";

import { useState } from "react";
import Image from "next/image";
import { BRAND } from "@/lib/constants";

export default function AdminLoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [status, setStatus] = useState<"idle" | "loading" | "error">("idle");
  const [errorMessage, setErrorMessage] = useState("");

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setStatus("loading");
    setErrorMessage("");
    // TODO: wire up Supabase Auth
    await new Promise((r) => setTimeout(r, 800));
    setStatus("error");
    setErrorMessage("Admin login will be available once Supabase is connected.");
  }

  return (
    <div className="min-h-screen bg-[#F7F3ED] flex items-center justify-center px-4">
      <div className="w-full max-w-sm">
        {/* Logo */}
        <div className="flex flex-col items-center mb-8">
          <div className="relative w-16 h-16 rounded-full overflow-hidden border-2 border-[#E5DDD4] shadow-sm mb-4">
            <Image
              src="/brand/rajman-logo.jpg"
              alt={BRAND.name}
              fill
              className="object-cover"
              sizes="64px"
              priority
            />
          </div>
          <h1 className="font-heading text-2xl font-bold text-[#171717]">Admin Login</h1>
          <p className="text-sm text-[#6B6B6B] mt-1">{BRAND.name}</p>
        </div>

        {/* Form card */}
        <div className="bg-white rounded-2xl border border-[#E5DDD4] shadow-sm p-8">
          <form onSubmit={handleSubmit} className="space-y-5" noValidate>
            <div>
              <label htmlFor="admin-email" className="block text-xs font-semibold text-[#171717] uppercase tracking-wide mb-2">
                Email Address
              </label>
              <input
                id="admin-email"
                type="email"
                required
                autoComplete="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="admin@rajmangraphics.com"
                className="w-full px-4 py-3 rounded-xl border border-[#E5DDD4] bg-[#F7F3ED] text-sm text-[#171717] placeholder:text-[#9B9B9B] focus:outline-none focus:border-[#C89B3C] focus:bg-white transition-all duration-200"
              />
            </div>
            <div>
              <label htmlFor="admin-password" className="block text-xs font-semibold text-[#171717] uppercase tracking-wide mb-2">
                Password
              </label>
              <input
                id="admin-password"
                type="password"
                required
                autoComplete="current-password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Enter your password"
                className="w-full px-4 py-3 rounded-xl border border-[#E5DDD4] bg-[#F7F3ED] text-sm text-[#171717] placeholder:text-[#9B9B9B] focus:outline-none focus:border-[#C89B3C] focus:bg-white transition-all duration-200"
              />
            </div>

            {errorMessage && (
              <div className="p-3 rounded-xl bg-red-50 border border-red-100 text-sm text-red-600">
                {errorMessage}
              </div>
            )}

            <button
              type="submit"
              disabled={status === "loading"}
              className="w-full py-3.5 rounded-full bg-[#171717] text-white font-semibold text-sm hover:bg-[#2a2a2a] disabled:opacity-60 disabled:cursor-not-allowed transition-colors duration-200"
            >
              {status === "loading" ? "Signing in..." : "Sign In"}
            </button>
          </form>
        </div>

        {/* Setup note */}
        <div className="mt-6 p-4 rounded-xl bg-[#EFE7DB] border border-[#E5DDD4]">
          <p className="text-xs text-[#6B6B6B] text-center leading-relaxed">
            <strong className="text-[#C89B3C]">Setup needed:</strong> Connect Supabase to enable authentication. See the README for instructions.
          </p>
        </div>
      </div>
    </div>
  );
}
