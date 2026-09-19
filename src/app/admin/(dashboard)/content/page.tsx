"use client";

import { useState } from "react";
import AdminTopbar from "@/components/admin/AdminTopbar";
import { siteSettings } from "@/lib/data";

export default function AdminContentPage() {
  const [settings, setSettings] = useState(siteSettings);
  const [status, setStatus] = useState<"idle" | "saving" | "saved">("idle");

  function handleChange(e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) {
    setSettings((prev) => ({ ...prev, [e.target.name]: e.target.value }));
    setStatus("idle");
  }

  async function handleSave(e: React.FormEvent) {
    e.preventDefault();
    setStatus("saving");
    // TODO: save to Supabase site_settings table
    await new Promise((r) => setTimeout(r, 600));
    setStatus("saved");
  }

  const sections = [
    {
      title: "Hero Section",
      fields: [
        { label: "Hero Headline", name: "hero_headline", type: "text" },
        { label: "Hero Subtext", name: "hero_subtext", type: "textarea" },
        { label: "Primary CTA Label", name: "hero_primary_cta", type: "text" },
        { label: "Secondary CTA Label", name: "hero_secondary_cta", type: "text" },
      ],
    },
    {
      title: "Brand Copy",
      fields: [
        { label: "Site Tagline", name: "tagline", type: "text" },
        { label: "About Summary", name: "about_summary", type: "textarea" },
        { label: "Footer Summary", name: "footer_summary", type: "textarea" },
      ],
    },
    {
      title: "Contact Details",
      fields: [
        { label: "Phone", name: "phone", type: "text" },
        { label: "WhatsApp Number", name: "whatsapp", type: "text" },
        { label: "Email", name: "email", type: "email" },
        { label: "Address", name: "address_line", type: "text" },
        { label: "Opening Hours", name: "opening_hours", type: "text" },
      ],
    },
  ];

  return (
    <div>
      <AdminTopbar
        title="Website Content"
        description="Edit the key text and copy displayed on your public website."
      />

      <form onSubmit={handleSave} className="space-y-6">
        {sections.map((section) => (
          <div key={section.title} className="bg-white rounded-2xl border border-[#E5DDD4] p-6">
            <h2 className="font-heading text-base font-semibold text-[#171717] mb-5 pb-4 border-b border-[#EFE7DB]">
              {section.title}
            </h2>
            <div className="space-y-5">
              {section.fields.map((field) => (
                <div key={field.name}>
                  <label htmlFor={`content-${field.name}`} className="block text-xs font-semibold text-[#171717] uppercase tracking-wide mb-2">
                    {field.label}
                  </label>
                  {field.type === "textarea" ? (
                    <textarea
                      id={`content-${field.name}`}
                      name={field.name}
                      rows={3}
                      value={(settings as unknown as Record<string, string>)[field.name] || ""}
                      onChange={handleChange}
                      className="w-full px-4 py-3 rounded-xl border border-[#E5DDD4] text-sm text-[#171717] focus:outline-none focus:border-[#C89B3C] transition-colors resize-none"
                    />
                  ) : (
                    <input
                      id={`content-${field.name}`}
                      name={field.name}
                      type={field.type}
                      value={(settings as unknown as Record<string, string>)[field.name] || ""}
                      onChange={handleChange}
                      className="w-full px-4 py-3 rounded-xl border border-[#E5DDD4] text-sm text-[#171717] focus:outline-none focus:border-[#C89B3C] transition-colors"
                    />
                  )}
                </div>
              ))}
            </div>
          </div>
        ))}

        <div className="flex items-center gap-4">
          <button
            type="submit"
            disabled={status === "saving"}
            className="px-8 py-3 rounded-full bg-[#171717] text-white font-semibold text-sm hover:bg-[#2a2a2a] disabled:opacity-60 transition-colors duration-200"
          >
            {status === "saving" ? "Saving..." : "Save Changes"}
          </button>
          {status === "saved" && (
            <span className="text-sm text-green-600 font-medium">✓ Changes saved!</span>
          )}
        </div>
      </form>
    </div>
  );
}
