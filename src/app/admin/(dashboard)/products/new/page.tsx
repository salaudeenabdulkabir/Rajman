"use client";

import { useState } from "react";
import Link from "next/link";
import AdminTopbar from "@/components/admin/AdminTopbar";
import { mockCategories } from "@/lib/data";
import { slugify } from "@/lib/utils";

export default function AdminNewProductPage() {
  const [formData, setFormData] = useState({
    name: "",
    slug: "",
    short_description: "",
    full_description: "",
    category_id: "",
    price_label: "Contact for price",
    tags: "",
    is_featured: false,
    is_available: true,
  });
  const [status, setStatus] = useState<"idle" | "saving" | "saved" | "error">("idle");

  function handleNameChange(e: React.ChangeEvent<HTMLInputElement>) {
    const name = e.target.value;
    setFormData((prev) => ({
      ...prev,
      name,
      slug: slugify(name),
    }));
  }

  function handleChange(e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) {
    const { name, value, type } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? (e.target as HTMLInputElement).checked : value,
    }));
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setStatus("saving");
    // TODO: wire up to Supabase insert
    await new Promise((r) => setTimeout(r, 800));
    setStatus("saved");
  }

  if (status === "saved") {
    return (
      <div>
        <AdminTopbar title="Add Product" />
        <div className="bg-white rounded-2xl border border-[#E5DDD4] p-16 text-center">
          <div className="w-16 h-16 rounded-full bg-[#C89B3C]/10 flex items-center justify-center mx-auto mb-4">
            <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="#C89B3C" strokeWidth="2" aria-hidden="true">
              <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          </div>
          <h3 className="font-heading text-xl font-semibold text-[#171717] mb-2">Product Saved!</h3>
          <p className="text-sm text-[#6B6B6B] mb-6">
            Note: This will fully save once Supabase is connected.
          </p>
          <div className="flex gap-3 justify-center">
            <button onClick={() => setStatus("idle")} className="px-5 py-2 rounded-full bg-[#C89B3C] text-white text-sm font-semibold hover:bg-[#b08830] transition-colors">
              Add Another
            </button>
            <Link href="/admin/products" className="px-5 py-2 rounded-full border border-[#E5DDD4] text-sm font-semibold text-[#171717] hover:bg-[#F7F3ED] transition-colors">
              View All Products
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div>
      <AdminTopbar
        title="Add Product"
        description="Fill in the product details. Images can be added after connecting storage."
        action={
          <Link href="/admin/products" className="text-sm text-[#6B6B6B] hover:text-[#171717] transition-colors">
            ← Back to Products
          </Link>
        }
      />

      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="grid lg:grid-cols-3 gap-6">
          {/* Main Fields */}
          <div className="lg:col-span-2 space-y-5 bg-white rounded-2xl border border-[#E5DDD4] p-6">
            <h2 className="font-heading text-base font-semibold text-[#171717] mb-2">Product Details</h2>
            <div>
              <label htmlFor="prod-name" className="block text-xs font-semibold text-[#171717] uppercase tracking-wide mb-2">Product Name *</label>
              <input id="prod-name" name="name" type="text" required value={formData.name} onChange={handleNameChange} placeholder="e.g. Custom Photo Frame" className="w-full px-4 py-3 rounded-xl border border-[#E5DDD4] text-sm text-[#171717] focus:outline-none focus:border-[#C89B3C] transition-colors" />
            </div>
            <div>
              <label htmlFor="prod-slug" className="block text-xs font-semibold text-[#171717] uppercase tracking-wide mb-2">Slug (auto-generated)</label>
              <input id="prod-slug" name="slug" type="text" value={formData.slug} onChange={handleChange} className="w-full px-4 py-3 rounded-xl border border-[#E5DDD4] text-sm text-[#6B6B6B] bg-[#F7F3ED] focus:outline-none focus:border-[#C89B3C] transition-colors" />
            </div>
            <div>
              <label htmlFor="prod-short" className="block text-xs font-semibold text-[#171717] uppercase tracking-wide mb-2">Short Description</label>
              <textarea id="prod-short" name="short_description" rows={2} value={formData.short_description} onChange={handleChange} placeholder="Brief summary shown on product cards..." className="w-full px-4 py-3 rounded-xl border border-[#E5DDD4] text-sm text-[#171717] focus:outline-none focus:border-[#C89B3C] transition-colors resize-none" />
            </div>
            <div>
              <label htmlFor="prod-full" className="block text-xs font-semibold text-[#171717] uppercase tracking-wide mb-2">Full Description</label>
              <textarea id="prod-full" name="full_description" rows={5} value={formData.full_description} onChange={handleChange} placeholder="Detailed product description shown on the product page..." className="w-full px-4 py-3 rounded-xl border border-[#E5DDD4] text-sm text-[#171717] focus:outline-none focus:border-[#C89B3C] transition-colors resize-none" />
            </div>
            <div>
              <label htmlFor="prod-tags" className="block text-xs font-semibold text-[#171717] uppercase tracking-wide mb-2">Tags (comma-separated)</label>
              <input id="prod-tags" name="tags" type="text" value={formData.tags} onChange={handleChange} placeholder="birthday, frame, custom, gift" className="w-full px-4 py-3 rounded-xl border border-[#E5DDD4] text-sm text-[#171717] focus:outline-none focus:border-[#C89B3C] transition-colors" />
            </div>
          </div>

          {/* Sidebar Fields */}
          <div className="space-y-5">
            <div className="bg-white rounded-2xl border border-[#E5DDD4] p-6 space-y-5">
              <h2 className="font-heading text-base font-semibold text-[#171717]">Pricing & Category</h2>
              <div>
                <label htmlFor="prod-price" className="block text-xs font-semibold text-[#171717] uppercase tracking-wide mb-2">Price Label</label>
                <input id="prod-price" name="price_label" type="text" value={formData.price_label} onChange={handleChange} placeholder="Contact for price" className="w-full px-4 py-3 rounded-xl border border-[#E5DDD4] text-sm text-[#171717] focus:outline-none focus:border-[#C89B3C] transition-colors" />
                <p className="text-xs text-[#9B9B9B] mt-1">e.g. "From ₦5,000" or "Contact for price"</p>
              </div>
              <div>
                <label htmlFor="prod-cat" className="block text-xs font-semibold text-[#171717] uppercase tracking-wide mb-2">Category</label>
                <select id="prod-cat" name="category_id" value={formData.category_id} onChange={handleChange} className="w-full px-4 py-3 rounded-xl border border-[#E5DDD4] text-sm text-[#171717] focus:outline-none focus:border-[#C89B3C] transition-colors bg-white">
                  <option value="">Select a category</option>
                  {mockCategories.map((cat) => (
                    <option key={cat.id} value={cat.id}>{cat.name}</option>
                  ))}
                </select>
              </div>
            </div>

            <div className="bg-white rounded-2xl border border-[#E5DDD4] p-6 space-y-4">
              <h2 className="font-heading text-base font-semibold text-[#171717]">Visibility</h2>
              <label className="flex items-center justify-between cursor-pointer">
                <span className="text-sm text-[#171717]">Available for Order</span>
                <input type="checkbox" name="is_available" checked={formData.is_available} onChange={handleChange} className="w-4 h-4 accent-[#C89B3C]" />
              </label>
              <label className="flex items-center justify-between cursor-pointer">
                <span className="text-sm text-[#171717]">Featured Product</span>
                <input type="checkbox" name="is_featured" checked={formData.is_featured} onChange={handleChange} className="w-4 h-4 accent-[#C89B3C]" />
              </label>
            </div>

            <div className="bg-[#EFE7DB] rounded-2xl border border-[#E5DDD4] p-4 text-xs text-[#6B6B6B]">
              <strong className="text-[#C89B3C]">Image Upload:</strong> Connect Supabase Storage to enable product image uploads.
            </div>

            <button
              type="submit"
              disabled={status === "saving"}
              className="w-full py-3.5 rounded-full bg-[#171717] text-white font-semibold text-sm hover:bg-[#2a2a2a] disabled:opacity-60 transition-colors duration-200"
            >
              {status === "saving" ? "Saving..." : "Save Product"}
            </button>
          </div>
        </div>
      </form>
    </div>
  );
}
