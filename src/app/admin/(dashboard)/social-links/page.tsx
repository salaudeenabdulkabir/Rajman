"use client";

import { useState } from "react";
import AdminTopbar from "@/components/admin/AdminTopbar";

const socialPlatforms = [
  { name: "whatsapp", label: "WhatsApp", placeholder: "+2349160129087", icon: "📱", required: true },
  { name: "instagram", label: "Instagram", placeholder: "https://instagram.com/rajmangraphics", icon: "📸" },
  { name: "facebook", label: "Facebook", placeholder: "https://facebook.com/rajmangraphics", icon: "👍" },
  { name: "tiktok", label: "TikTok", placeholder: "https://tiktok.com/@rajmangraphics", icon: "🎵" },
  { name: "x", label: "X (Twitter)", placeholder: "https://x.com/rajmangraphics", icon: "✕" },
];

export default function AdminSocialLinksPage() {
  const [links, setLinks] = useState<Record<string, string>>({
    whatsapp: "+2349160129087",
  });
  const [status, setStatus] = useState<"idle" | "saving" | "saved">("idle");

  function handleChange(name: string, value: string) {
    setLinks((prev) => ({ ...prev, [name]: value }));
    setStatus("idle");
  }

  async function handleSave(e: React.FormEvent) {
    e.preventDefault();
    setStatus("saving");
    await new Promise((r) => setTimeout(r, 600));
    setStatus("saved");
  }

  return (
    <div>
      <AdminTopbar
        title="Social Links"
        description="Manage social media links. Empty links will be hidden on the public site."
      />

      <div className="bg-white rounded-2xl border border-[#E5DDD4] p-6">
        <form onSubmit={handleSave} className="space-y-5">
          {socialPlatforms.map((platform) => (
            <div key={platform.name}>
              <label htmlFor={`social-${platform.name}`} className="flex items-center gap-2 text-xs font-semibold text-[#171717] uppercase tracking-wide mb-2">
                <span>{platform.icon}</span>
                {platform.label}
                {platform.required && <span className="text-[#C89B3C]">*</span>}
              </label>
              <input
                id={`social-${platform.name}`}
                type="text"
                value={links[platform.name] || ""}
                onChange={(e) => handleChange(platform.name, e.target.value)}
                placeholder={platform.placeholder}
                className="w-full px-4 py-3 rounded-xl border border-[#E5DDD4] text-sm text-[#171717] placeholder:text-[#9B9B9B] focus:outline-none focus:border-[#C89B3C] transition-colors"
              />
              {!links[platform.name] && !platform.required && (
                <p className="text-xs text-[#9B9B9B] mt-1">Not set — link will be hidden on the public site.</p>
              )}
            </div>
          ))}

          <div className="pt-4 border-t border-[#EFE7DB] flex items-center gap-4">
            <button
              type="submit"
              disabled={status === "saving"}
              className="px-8 py-3 rounded-full bg-[#171717] text-white font-semibold text-sm hover:bg-[#2a2a2a] disabled:opacity-60 transition-colors duration-200"
            >
              {status === "saving" ? "Saving..." : "Save Links"}
            </button>
            {status === "saved" && (
              <span className="text-sm text-green-600 font-medium">✓ Links saved!</span>
            )}
          </div>
        </form>
      </div>
    </div>
  );
}
