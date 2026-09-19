"use client";

import { useState } from "react";
import AdminTopbar from "@/components/admin/AdminTopbar";
import { BRAND, CONTACT } from "@/lib/constants";

export default function AdminSettingsPage() {
  const [settings, setSettings] = useState({
    site_name: BRAND.name,
    tagline: BRAND.tagline,
    phone: CONTACT.phone,
    whatsapp: CONTACT.whatsappDisplay,
    email: CONTACT.email,
    address_line: CONTACT.address,
    opening_hours: CONTACT.openingHours,
    maps_url: "",
  });
  const [status, setStatus] = useState<"idle" | "saving" | "saved">("idle");

  function handleChange(e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) {
    setSettings((prev) => ({ ...prev, [e.target.name]: e.target.value }));
    setStatus("idle");
  }

  async function handleSave(e: React.FormEvent) {
    e.preventDefault();
    setStatus("saving");
    await new Promise((r) => setTimeout(r, 600));
    setStatus("saved");
  }

  const fields = [
    { label: "Site Name", name: "site_name", type: "text" },
    { label: "Tagline", name: "tagline", type: "text" },
    { label: "Phone Number", name: "phone", type: "text" },
    { label: "WhatsApp Number", name: "whatsapp", type: "text" },
    { label: "Email Address", name: "email", type: "email" },
    { label: "Business Address", name: "address_line", type: "text" },
    { label: "Opening Hours", name: "opening_hours", type: "text" },
    { label: "Google Maps Embed URL", name: "maps_url", type: "text" },
  ];

  return (
    <div>
      <AdminTopbar
        title="Settings"
        description="Core business settings for your website."
      />

      <div className="bg-white rounded-2xl border border-[#E5DDD4] p-6 mb-6">
        <form onSubmit={handleSave} className="space-y-5">
          {fields.map((field) => (
            <div key={field.name}>
              <label htmlFor={`setting-${field.name}`} className="block text-xs font-semibold text-[#171717] uppercase tracking-wide mb-2">
                {field.label}
              </label>
              <input
                id={`setting-${field.name}`}
                name={field.name}
                type={field.type}
                value={(settings as unknown as Record<string, string>)[field.name] || ""}
                onChange={handleChange}
                className="w-full px-4 py-3 rounded-xl border border-[#E5DDD4] text-sm text-[#171717] focus:outline-none focus:border-[#C89B3C] transition-colors"
              />
            </div>
          ))}

          <div className="pt-4 border-t border-[#EFE7DB] flex items-center gap-4">
            <button
              type="submit"
              disabled={status === "saving"}
              className="px-8 py-3 rounded-full bg-[#171717] text-white font-semibold text-sm hover:bg-[#2a2a2a] disabled:opacity-60 transition-colors duration-200"
            >
              {status === "saving" ? "Saving..." : "Save Settings"}
            </button>
            {status === "saved" && (
              <span className="text-sm text-green-600 font-medium">✓ Settings saved!</span>
            )}
          </div>
        </form>
      </div>

      {/* Supabase Setup Guide */}
      <div className="bg-[#171717] rounded-2xl p-6 text-white">
        <h2 className="font-heading text-base font-semibold text-white mb-4">🔧 Supabase Setup</h2>
        <p className="text-sm text-white/70 mb-4 leading-relaxed">
          To connect a real database and enable full admin functionality, create a Supabase project and add the following environment variables to your <code className="bg-white/10 px-1.5 py-0.5 rounded text-xs">.env.local</code> file:
        </p>
        <div className="bg-black/30 rounded-xl p-4 font-mono text-xs text-white/80 space-y-1.5">
          <p>NEXT_PUBLIC_SUPABASE_URL=your_supabase_url</p>
          <p>NEXT_PUBLIC_SUPABASE_ANON_KEY=your_anon_key</p>
          <p>SUPABASE_SERVICE_ROLE_KEY=your_service_role_key</p>
        </div>
      </div>
    </div>
  );
}
