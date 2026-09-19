"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import AdminTopbar from "@/components/admin/AdminTopbar";
import ImageUpload from "@/components/admin/ImageUpload";
import { fetchCategories } from "@/lib/data";
import { slugify } from "@/lib/utils";
import { createClient } from "@/lib/supabase/client";
import type { Category } from "@/lib/types";

export default function AdminNewProductPage() {
  const [categories, setCategories] = useState<Category[]>([]);
  const [imageUrl, setImageUrl] = useState("");
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
  const [errorMessage, setErrorMessage] = useState("");

  useEffect(() => {
    fetchCategories().then((cats) => {
      setCategories(cats);
      if (cats.length > 0 && !formData.category_id) {
        setFormData((prev) => ({ ...prev, category_id: cats[0].id }));
      }
    });
  }, []);

  function handleNameChange(e: React.ChangeEvent<HTMLInputElement>) {
    const name = e.target.value;
    setFormData((prev) => ({
      ...prev,
      name,
      slug: slugify(name),
    }));
  }

  function handleChange(
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) {
    const { name, value, type } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? (e.target as HTMLInputElement).checked : value,
    }));
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setStatus("saving");
    setErrorMessage("");

    try {
      const supabase = createClient();
      const tagsArray = formData.tags
        ? formData.tags.split(",").map((t) => t.trim()).filter(Boolean)
        : [];

      // Insert product
      const { data: product, error: productError } = await supabase
        .from("products")
        .insert({
          name: formData.name.trim(),
          slug: formData.slug.trim() || slugify(formData.name),
          short_description: formData.short_description.trim() || null,
          full_description: formData.full_description.trim() || null,
          category_id: formData.category_id || null,
          price_label: formData.price_label.trim() || "Contact for price",
          tags: tagsArray,
          is_featured: formData.is_featured,
          is_available: formData.is_available,
          is_archived: false,
        })
        .select()
        .single();

      if (productError) {
        setStatus("error");
        setErrorMessage(productError.message);
        return;
      }

      // If an image was uploaded, save it to product_images
      if (imageUrl && product) {
        await supabase.from("product_images").insert({
          product_id: product.id,
          url: imageUrl,
          alt_text: formData.name,
          sort_order: 1,
        });
      }

      setStatus("saved");
    } catch (err: unknown) {
      setStatus("error");
      const msg = err instanceof Error ? err.message : "Failed to create product.";
      setErrorMessage(msg);
    }
  }

  if (status === "saved") {
    return (
      <div>
        <AdminTopbar title="Add Product" />
        <div className="bg-white rounded-2xl border border-[#E5DDD4] p-16 text-center max-w-lg mx-auto mt-8">
          <div className="w-16 h-16 rounded-full bg-[#C89B3C]/10 flex items-center justify-center mx-auto mb-4">
            <svg
              width="32"
              height="32"
              viewBox="0 0 24 24"
              fill="none"
              stroke="#C89B3C"
              strokeWidth="2"
              aria-hidden="true"
            >
              <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          </div>
          <h3 className="font-heading text-xl font-semibold text-[#171717] mb-2">Product Saved Successfully!</h3>
          <p className="text-sm text-[#6B6B6B] mb-6">
            Your new product and uploaded image have been persisted to Supabase and are ready for customers.
          </p>
          <div className="flex gap-3 justify-center">
            <button
              onClick={() => {
                setStatus("idle");
                setImageUrl("");
                setFormData({
                  name: "",
                  slug: "",
                  short_description: "",
                  full_description: "",
                  category_id: categories[0]?.id || "",
                  price_label: "Contact for price",
                  tags: "",
                  is_featured: false,
                  is_available: true,
                });
              }}
              className="px-5 py-2.5 rounded-full bg-[#C89B3C] text-white text-sm font-semibold hover:bg-[#b08830] transition-colors cursor-pointer"
            >
              Add Another Product
            </button>
            <Link
              href="/admin/products"
              className="px-5 py-2.5 rounded-full border border-[#E5DDD4] text-sm font-semibold text-[#171717] hover:bg-[#F7F3ED] transition-colors"
            >
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
        title="Add New Product"
        description="Create a new personalized product or print item to showcase in your online catalogue."
        action={
          <Link
            href="/admin/products"
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-[#E5DDD4] text-sm font-semibold text-[#171717] hover:bg-[#F7F3ED] transition-colors"
          >
            ← Cancel
          </Link>
        }
      />

      <form onSubmit={handleSubmit} className="max-w-4xl mt-6">
        {errorMessage && (
          <div className="mb-6 p-4 rounded-xl bg-red-50 border border-red-100 text-sm text-red-600 leading-relaxed">
            {errorMessage}
          </div>
        )}

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Main info */}
          <div className="lg:col-span-2 space-y-6">
            <div className="bg-white rounded-2xl border border-[#E5DDD4] p-6 space-y-5">
              <h2 className="font-heading text-base font-semibold text-[#171717]">Basic Information</h2>

              <div>
                <label htmlFor="prod-name" className="block text-xs font-semibold text-[#171717] uppercase tracking-wide mb-2">
                  Product Name *
                </label>
                <input
                  id="prod-name"
                  name="name"
                  type="text"
                  required
                  value={formData.name}
                  onChange={handleNameChange}
                  placeholder="e.g. Classic Wooden Photo Frame (12x16)"
                  className="w-full px-4 py-3 rounded-xl border border-[#E5DDD4] text-sm text-[#171717] placeholder:text-[#9B9B9B] focus:outline-none focus:border-[#C89B3C] transition-colors"
                />
              </div>

              <div>
                <label htmlFor="prod-slug" className="block text-xs font-semibold text-[#171717] uppercase tracking-wide mb-2">
                  URL Slug
                </label>
                <input
                  id="prod-slug"
                  name="slug"
                  type="text"
                  value={formData.slug}
                  onChange={handleChange}
                  placeholder="classic-wooden-photo-frame"
                  className="w-full px-4 py-3 rounded-xl border border-[#E5DDD4] text-sm text-[#171717] placeholder:text-[#9B9B9B] focus:outline-none focus:border-[#C89B3C] transition-colors font-mono text-xs"
                />
              </div>

              <div>
                <label htmlFor="prod-short-desc" className="block text-xs font-semibold text-[#171717] uppercase tracking-wide mb-2">
                  Short Description
                </label>
                <input
                  id="prod-short-desc"
                  name="short_description"
                  type="text"
                  value={formData.short_description}
                  onChange={handleChange}
                  placeholder="One sentence that summarizes this product"
                  className="w-full px-4 py-3 rounded-xl border border-[#E5DDD4] text-sm text-[#171717] placeholder:text-[#9B9B9B] focus:outline-none focus:border-[#C89B3C] transition-colors"
                />
              </div>

              <div>
                <label htmlFor="prod-full-desc" className="block text-xs font-semibold text-[#171717] uppercase tracking-wide mb-2">
                  Full Description & Details
                </label>
                <textarea
                  id="prod-full-desc"
                  name="full_description"
                  rows={4}
                  value={formData.full_description}
                  onChange={handleChange}
                  placeholder="Describe material, finishing, personalization options, turnaround time, sizes, etc."
                  className="w-full px-4 py-3 rounded-xl border border-[#E5DDD4] text-sm text-[#171717] placeholder:text-[#9B9B9B] focus:outline-none focus:border-[#C89B3C] transition-colors resize-none"
                />
              </div>

              <div>
                <label htmlFor="prod-tags" className="block text-xs font-semibold text-[#171717] uppercase tracking-wide mb-2">
                  Tags (comma separated)
                </label>
                <input
                  id="prod-tags"
                  name="tags"
                  type="text"
                  value={formData.tags}
                  onChange={handleChange}
                  placeholder="frame, birthday, anniversary, keepsake"
                  className="w-full px-4 py-3 rounded-xl border border-[#E5DDD4] text-sm text-[#171717] placeholder:text-[#9B9B9B] focus:outline-none focus:border-[#C89B3C] transition-colors"
                />
              </div>
            </div>

            {/* Image Upload Component */}
            <div className="bg-white rounded-2xl border border-[#E5DDD4] p-6 space-y-4">
              <h2 className="font-heading text-base font-semibold text-[#171717]">Product Image</h2>
              <ImageUpload
                bucket="products"
                folder="catalogue"
                value={imageUrl}
                onChange={(url) => setImageUrl(url)}
                label="Upload Main Product Image"
                aspectRatio="square"
              />
            </div>
          </div>

          {/* Sidebar controls */}
          <div className="space-y-6">
            <div className="bg-white rounded-2xl border border-[#E5DDD4] p-6 space-y-5">
              <h2 className="font-heading text-base font-semibold text-[#171717]">Pricing & Category</h2>
              <div>
                <label htmlFor="prod-price" className="block text-xs font-semibold text-[#171717] uppercase tracking-wide mb-2">
                  Price Label
                </label>
                <input
                  id="prod-price"
                  name="price_label"
                  type="text"
                  value={formData.price_label}
                  onChange={handleChange}
                  placeholder="Contact for price"
                  className="w-full px-4 py-3 rounded-xl border border-[#E5DDD4] text-sm text-[#171717] focus:outline-none focus:border-[#C89B3C] transition-colors"
                />
                <p className="text-xs text-[#9B9B9B] mt-1">e.g. "From ₦5,000" or "Contact for price"</p>
              </div>

              <div>
                <label htmlFor="prod-cat" className="block text-xs font-semibold text-[#171717] uppercase tracking-wide mb-2">
                  Category
                </label>
                <select
                  id="prod-cat"
                  name="category_id"
                  value={formData.category_id}
                  onChange={handleChange}
                  className="w-full px-4 py-3 rounded-xl border border-[#E5DDD4] text-sm text-[#171717] focus:outline-none focus:border-[#C89B3C] transition-colors bg-white"
                >
                  <option value="">Select a category</option>
                  {categories.map((cat) => (
                    <option key={cat.id} value={cat.id}>
                      {cat.name}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            <div className="bg-white rounded-2xl border border-[#E5DDD4] p-6 space-y-4">
              <h2 className="font-heading text-base font-semibold text-[#171717]">Visibility</h2>
              <label className="flex items-center justify-between cursor-pointer">
                <span className="text-sm text-[#171717]">Available for Order</span>
                <input
                  type="checkbox"
                  name="is_available"
                  checked={formData.is_available}
                  onChange={handleChange}
                  className="w-4 h-4 accent-[#C89B3C]"
                />
              </label>
              <label className="flex items-center justify-between cursor-pointer">
                <span className="text-sm text-[#171717]">Featured Product</span>
                <input
                  type="checkbox"
                  name="is_featured"
                  checked={formData.is_featured}
                  onChange={handleChange}
                  className="w-4 h-4 accent-[#C89B3C]"
                />
              </label>
            </div>

            <button
              type="submit"
              disabled={status === "saving"}
              className="w-full py-3.5 rounded-full bg-[#171717] text-white font-semibold text-sm hover:bg-[#2a2a2a] disabled:opacity-60 transition-colors duration-200 cursor-pointer"
            >
              {status === "saving" ? "Saving Product..." : "Save Product"}
            </button>
          </div>
        </div>
      </form>
    </div>
  );
}
