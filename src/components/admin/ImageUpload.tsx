"use client";

import { useState, useRef } from "react";
import Image from "next/image";
import { createClient } from "@/lib/supabase/client";

interface ImageUploadProps {
  bucket: "products" | "gallery" | "brand";
  folder?: string;
  value?: string;
  onChange: (url: string) => void;
  label?: string;
  aspectRatio?: "square" | "video" | "auto";
}

export default function ImageUpload({
  bucket,
  folder = "uploads",
  value,
  onChange,
  label = "Upload Image",
  aspectRatio = "square",
}: ImageUploadProps) {
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [preview, setPreview] = useState<string | null>(value || null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  async function handleFileChange(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file) return;

    // Validate size (< 5MB)
    if (file.size > 5 * 1024 * 1024) {
      setError("File size exceeds 5MB. Please choose a smaller image.");
      return;
    }

    // Local preview
    const objectUrl = URL.createObjectURL(file);
    setPreview(objectUrl);
    setError(null);
    setUploading(true);

    try {
      const supabase = createClient();
      const fileExt = file.name.split(".").pop();
      const fileName = `${folder}/${Date.now()}-${Math.random().toString(36).substring(2, 9)}.${fileExt}`;

      const { data, error: uploadError } = await supabase.storage
        .from(bucket)
        .upload(fileName, file, {
          cacheControl: "3600",
          upsert: true,
        });

      if (uploadError) {
        if (
          uploadError.message.includes("Bucket not found") ||
          uploadError.message.includes("not found")
        ) {
          setError(
            `Bucket '${bucket}' not found in Supabase Storage. Please create a public bucket named '${bucket}' in your Supabase dashboard.`
          );
        } else {
          setError(uploadError.message);
        }
        setUploading(false);
        return;
      }

      const { data: publicUrlData } = supabase.storage
        .from(bucket)
        .getPublicUrl(data.path);

      onChange(publicUrlData.publicUrl);
      setPreview(publicUrlData.publicUrl);
    } catch (err: unknown) {
      const msg =
        err instanceof Error ? err.message : "Failed to upload image.";
      setError(msg);
    } finally {
      setUploading(false);
    }
  }

  function handleRemove() {
    setPreview(null);
    onChange("");
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  }

  const aspectClass =
    aspectRatio === "square"
      ? "aspect-square"
      : aspectRatio === "video"
      ? "aspect-video"
      : "h-48";

  return (
    <div className="space-y-2">
      {label && (
        <label className="block text-xs font-semibold text-[#171717] uppercase tracking-wide">
          {label}
        </label>
      )}

      {preview ? (
        <div
          className={`relative rounded-2xl overflow-hidden border border-[#E5DDD4] bg-[#F7F3ED] ${aspectClass} group`}
        >
          <Image
            src={preview}
            alt="Preview"
            fill
            className="object-cover"
            sizes="(max-width: 768px) 100vw, 400px"
          />
          <div className="absolute inset-0 bg-[#171717]/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-3">
            <button
              type="button"
              onClick={() => fileInputRef.current?.click()}
              className="px-3 py-1.5 rounded-full bg-white text-xs font-semibold text-[#171717] shadow-sm hover:bg-[#F7F3ED] transition-colors"
            >
              Replace
            </button>
            <button
              type="button"
              onClick={handleRemove}
              className="px-3 py-1.5 rounded-full bg-red-600 text-xs font-semibold text-white shadow-sm hover:bg-red-700 transition-colors"
            >
              Remove
            </button>
          </div>
          {uploading && (
            <div className="absolute inset-0 bg-white/80 flex items-center justify-center">
              <span className="text-xs font-medium text-[#171717] animate-pulse">
                Uploading to Supabase Storage...
              </span>
            </div>
          )}
        </div>
      ) : (
        <div
          onClick={() => fileInputRef.current?.click()}
          className={`border-2 border-dashed border-[#E5DDD4] hover:border-[#C89B3C] rounded-2xl flex flex-col items-center justify-center p-6 cursor-pointer bg-[#F7F3ED] hover:bg-[#EFE7DB]/40 transition-colors ${aspectClass}`}
        >
          <div className="w-10 h-10 rounded-full bg-white shadow-xs flex items-center justify-center mb-2 text-[#C89B3C]">
            <svg
              className="w-5 h-5"
              fill="none"
              stroke="currentColor"
              strokeWidth={1.5}
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M12 4.5v15m7.5-7.5h-15"
              />
            </svg>
          </div>
          <p className="text-xs font-semibold text-[#171717]">
            {uploading ? "Uploading..." : "Click or drag to upload"}
          </p>
          <p className="text-[11px] text-[#9B9B9B] mt-0.5">
            PNG, JPG, WebP up to 5MB
          </p>
        </div>
      )}

      <input
        ref={fileInputRef}
        type="file"
        accept="image/png, image/jpeg, image/webp"
        onChange={handleFileChange}
        className="hidden"
      />

      {error && (
        <p className="text-xs text-red-600 bg-red-50 p-2.5 rounded-xl border border-red-100 leading-relaxed">
          {error}
        </p>
      )}
    </div>
  );
}
