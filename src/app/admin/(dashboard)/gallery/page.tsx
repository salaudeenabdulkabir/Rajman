"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import AdminTopbar from "@/components/admin/AdminTopbar";
import ImageUpload from "@/components/admin/ImageUpload";
import { fetchGalleryItems } from "@/lib/data";
import { createClient } from "@/lib/supabase/client";
import type { GalleryItem } from "@/lib/types";

export default function AdminGalleryPage() {
  const [items, setItems] = useState<GalleryItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [showUploadModal, setShowUploadModal] = useState(false);
  const [uploadedImageUrl, setUploadedImageUrl] = useState("");
  const [title, setTitle] = useState("");
  const [caption, setCaption] = useState("");
  const [category, setCategory] = useState("Photo Frames");
  const [isFeatured, setIsFeatured] = useState(false);
  const [saving, setSaving] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  useEffect(() => {
    loadGallery();
  }, []);

  async function loadGallery() {
    setLoading(true);
    const data = await fetchGalleryItems();
    setItems(data);
    setLoading(false);
  }

  async function handleCreateItem(e: React.FormEvent) {
    e.preventDefault();
    if (!uploadedImageUrl) {
      setErrorMessage("Please upload an image before saving.");
      return;
    }

    setSaving(true);
    setErrorMessage("");

    try {
      const supabase = createClient();
      const { error } = await supabase.from("gallery_items").insert({
        title: title.trim() || null,
        caption: caption.trim() || null,
        image_url: uploadedImageUrl,
        category: category || null,
        is_featured: isFeatured,
        is_published: true,
        sort_order: items.length + 1,
      });

      if (error) {
        setErrorMessage(error.message);
        setSaving(false);
        return;
      }

      // Reset & reload
      setUploadedImageUrl("");
      setTitle("");
      setCaption("");
      setShowUploadModal(false);
      setSaving(false);
      loadGallery();
    } catch (err: unknown) {
      const msg =
        err instanceof Error ? err.message : "Failed to save gallery item.";
      setErrorMessage(msg);
      setSaving(false);
    }
  }

  async function handleDeleteItem(id: string) {
    if (!confirm("Are you sure you want to delete this gallery item?")) return;

    try {
      const supabase = createClient();
      await supabase.from("gallery_items").delete().eq("id", id);
      setItems((prev) => prev.filter((item) => item.id !== id));
    } catch {
      alert("Failed to delete item.");
    }
  }

  return (
    <div>
      <AdminTopbar
        title="Gallery"
        description="Upload and manage your gallery of finished work. Published items appear on the public gallery page."
        action={
          <button
            type="button"
            onClick={() => setShowUploadModal(true)}
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-[#C89B3C] text-white text-sm font-semibold hover:bg-[#b08830] transition-colors duration-200 cursor-pointer"
          >
            ↑ Upload Images
          </button>
        }
      />

      {/* Upload Modal */}
      {showUploadModal && (
        <div className="fixed inset-0 z-50 bg-[#171717]/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl max-w-lg w-full p-6 sm:p-8 shadow-xl border border-[#E5DDD4] max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between mb-6">
              <h3 className="font-heading text-xl font-bold text-[#171717]">
                Upload Gallery Item
              </h3>
              <button
                type="button"
                onClick={() => setShowUploadModal(false)}
                className="w-8 h-8 rounded-full bg-[#F7F3ED] text-[#6B6B6B] hover:text-[#171717] flex items-center justify-center text-sm font-semibold cursor-pointer"
              >
                ✕
              </button>
            </div>

            {errorMessage && (
              <div className="mb-4 p-3 rounded-xl bg-red-50 border border-red-100 text-xs text-red-600 leading-relaxed">
                {errorMessage}
              </div>
            )}

            <form onSubmit={handleCreateItem} className="space-y-4">
              <ImageUpload
                bucket="gallery"
                folder="showcase"
                value={uploadedImageUrl}
                onChange={(url) => setUploadedImageUrl(url)}
                label="Choose Photo"
                aspectRatio="video"
              />

              <div>
                <label className="block text-xs font-semibold text-[#171717] uppercase tracking-wide mb-1.5">
                  Title
                </label>
                <input
                  type="text"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  placeholder="e.g. 50th Birthday Acrylic Frame"
                  className="w-full px-4 py-2.5 rounded-xl border border-[#E5DDD4] text-sm text-[#171717] focus:outline-none focus:border-[#C89B3C] transition-colors"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-[#171717] uppercase tracking-wide mb-1.5">
                  Category
                </label>
                <select
                  value={category}
                  onChange={(e) => setCategory(e.target.value)}
                  className="w-full px-4 py-2.5 rounded-xl border border-[#E5DDD4] text-sm text-[#171717] focus:outline-none focus:border-[#C89B3C] transition-colors bg-white"
                >
                  <option value="Photo Frames">Photo Frames</option>
                  <option value="Custom Mugs">Custom Mugs</option>
                  <option value="Throw Pillows">Throw Pillows</option>
                  <option value="Personalized Gifts">Personalized Gifts</option>
                  <option value="Event Prints">Event Prints</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-semibold text-[#171717] uppercase tracking-wide mb-1.5">
                  Caption / Details
                </label>
                <input
                  type="text"
                  value={caption}
                  onChange={(e) => setCaption(e.target.value)}
                  placeholder="e.g. Gold foil lettering on velvet backboard"
                  className="w-full px-4 py-2.5 rounded-xl border border-[#E5DDD4] text-sm text-[#171717] focus:outline-none focus:border-[#C89B3C] transition-colors"
                />
              </div>

              <label className="flex items-center gap-2 cursor-pointer pt-1">
                <input
                  type="checkbox"
                  checked={isFeatured}
                  onChange={(e) => setIsFeatured(e.target.checked)}
                  className="w-4 h-4 accent-[#C89B3C]"
                />
                <span className="text-xs text-[#171717] font-medium">
                  Feature on Homepage
                </span>
              </label>

              <div className="flex gap-3 pt-4">
                <button
                  type="button"
                  onClick={() => setShowUploadModal(false)}
                  className="flex-1 py-2.5 rounded-full border border-[#E5DDD4] text-xs font-semibold text-[#171717] hover:bg-[#F7F3ED] transition-colors cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={saving || !uploadedImageUrl}
                  className="flex-1 py-2.5 rounded-full bg-[#171717] text-white text-xs font-semibold hover:bg-[#2a2a2a] disabled:opacity-60 transition-colors cursor-pointer"
                >
                  {saving ? "Saving..." : "Save to Gallery"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Gallery Grid */}
      {loading ? (
        <div className="py-20 text-center text-sm text-[#6B6B6B] animate-pulse">
          Loading gallery items from Supabase...
        </div>
      ) : items.length > 0 ? (
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 mt-6">
          {items.map((item) => (
            <div
              key={item.id}
              className="group relative bg-[#EFE7DB] rounded-2xl overflow-hidden aspect-square border border-[#E5DDD4] hover:border-[#C89B3C] transition-colors duration-200"
            >
              {item.image_url ? (
                <Image
                  src={item.image_url}
                  alt={item.title || "Gallery item"}
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 50vw, 25vw"
                />
              ) : (
                <div className="w-full h-full flex items-center justify-center text-xs text-[#9B9B9B]">
                  No image
                </div>
              )}
              <div className="absolute inset-0 bg-[#171717]/0 group-hover:bg-[#171717]/50 transition-all duration-300 flex flex-col justify-between p-3">
                <div className="flex justify-between items-start">
                  {item.is_featured && (
                    <span className="px-2 py-0.5 rounded-full bg-[#C89B3C] text-white text-[10px] font-semibold">
                      Featured
                    </span>
                  )}
                </div>
                <div className="translate-y-4 group-hover:translate-y-0 opacity-0 group-hover:opacity-100 transition-all duration-300 flex items-center justify-between gap-2">
                  <span className="text-white text-xs font-medium truncate drop-shadow-xs">
                    {item.title || "Untitled"}
                  </span>
                  <button
                    type="button"
                    onClick={() => handleDeleteItem(item.id)}
                    className="px-2.5 py-1 rounded-lg bg-red-600 text-xs font-semibold text-white hover:bg-red-700 transition-colors shrink-0 cursor-pointer"
                  >
                    Delete
                  </button>
                </div>
              </div>
            </div>
          ))}

          {/* Upload tile */}
          <button
            type="button"
            onClick={() => setShowUploadModal(true)}
            className="aspect-square rounded-2xl border border-dashed border-[#E5DDD4] flex flex-col items-center justify-center gap-2 hover:border-[#C89B3C] transition-colors duration-200 bg-[#F7F3ED] cursor-pointer"
          >
            <span className="text-3xl text-[#C89B3C]">+</span>
            <span className="text-xs font-medium text-[#6B6B6B]">
              Upload New Photo
            </span>
          </button>
        </div>
      ) : (
        <div className="bg-white rounded-2xl border border-dashed border-[#E5DDD4] p-16 text-center mt-6">
          <div className="w-16 h-16 rounded-full bg-[#EFE7DB] flex items-center justify-center mx-auto mb-4">
            <svg
              width="32"
              height="32"
              viewBox="0 0 24 24"
              fill="none"
              stroke="#C89B3C"
              strokeWidth="1.5"
              aria-hidden="true"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M2.25 15.75l5.159-5.159a2.25 2.25 0 013.182 0l5.159 5.159m-1.5-1.5l1.409-1.409a2.25 2.25 0 013.182 0l2.909 2.909m-18 3.75h16.5a1.5 1.5 0 001.5-1.5V6a1.5 1.5 0 00-1.5-1.5H3.75A1.5 1.5 0 002.25 6v12a1.5 1.5 0 001.5 1.5zm10.5-11.25h.008v.008h-.008V8.25zm.375 0a.375.375 0 11-.75 0 .375.375 0 01.75 0z"
              />
            </svg>
          </div>
          <h3 className="font-heading text-lg font-semibold text-[#171717] mb-2">
            No Gallery Items Yet
          </h3>
          <p className="text-sm text-[#6B6B6B] max-w-sm mx-auto mb-6">
            Upload photos of your completed frames, mugs, throw pillows, and event prints to build your public showcase.
          </p>
          <button
            type="button"
            onClick={() => setShowUploadModal(true)}
            className="px-6 py-2.5 rounded-full bg-[#C89B3C] text-white text-xs font-semibold hover:bg-[#b08830] transition-colors cursor-pointer"
          >
            Upload Your First Photo
          </button>
        </div>
      )}
    </div>
  );
}
