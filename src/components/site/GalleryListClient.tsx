"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import SectionHeading from "@/components/site/SectionHeading";
import { buildWhatsAppUrl } from "@/lib/utils";
import { GALLERY_FILTERS, ROUTES } from "@/lib/constants";
import type { GalleryItem } from "@/lib/types";

interface GalleryListClientProps {
  initialItems: GalleryItem[];
}

export default function GalleryListClient({ initialItems }: GalleryListClientProps) {
  const [activeFilter, setActiveFilter] = useState<string>("all");

  const filtered = initialItems.filter(
    (item) =>
      item.is_published &&
      (activeFilter === "all" || item.category === activeFilter)
  );

  return (
    <div>
      {/* Page Header */}
      <section className="bg-[#F7F3ED] py-16 border-b border-[#E5DDD4]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <nav className="flex items-center gap-2 text-xs text-[#6B6B6B] mb-6" aria-label="Breadcrumb">
            <Link href={ROUTES.home} className="hover:text-[#C89B3C] transition-colors">
              Home
            </Link>
            <span>/</span>
            <span className="text-[#171717] font-medium">Gallery</span>
          </nav>
          <SectionHeading
            eyebrow="Our Work"
            title="Gallery"
            subtitle="A showcase of our personalized prints and keepsakes — each one made with care."
          />

          {/* Filter tabs */}
          <div className="flex gap-2 flex-wrap mt-6">
            {GALLERY_FILTERS.map((filter) => (
              <button
                key={filter.value}
                onClick={() => setActiveFilter(filter.value)}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-200 ${
                  activeFilter === filter.value
                    ? "bg-[#171717] text-white"
                    : "bg-white border border-[#E5DDD4] text-[#6B6B6B] hover:border-[#C89B3C] hover:text-[#C89B3C]"
                }`}
              >
                {filter.label}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Gallery Grid */}
      <section className="py-16 bg-white min-h-[50vh]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {filtered.length > 0 ? (
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
              {filtered.map((item) => (
                <div
                  key={item.id}
                  className="group relative bg-[#EFE7DB] rounded-2xl overflow-hidden aspect-square border border-[#E5DDD4] hover:border-[#C89B3C] transition-colors duration-300"
                >
                  <Image
                    src={item.image_url}
                    alt={item.title || "Rajman keepsake"}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-500"
                    sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#171717]/80 via-[#171717]/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-4">
                    {item.category && (
                      <span className="text-[11px] font-medium text-[#C89B3C] uppercase tracking-wide">
                        {item.category}
                      </span>
                    )}
                    {item.title && (
                      <p className="text-white text-sm font-semibold mt-0.5">
                        {item.title}
                      </p>
                    )}
                    {item.caption && (
                      <p className="text-white/70 text-xs mt-0.5 line-clamp-1">
                        {item.caption}
                      </p>
                    )}
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-20 bg-[#F7F3ED] rounded-3xl border border-dashed border-[#E5DDD4] max-w-xl mx-auto">
              <div className="w-16 h-16 rounded-full bg-[#EFE7DB] flex items-center justify-center mx-auto mb-4 text-[#C89B3C]">
                <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 15.75l5.159-5.159a2.25 2.25 0 013.182 0l5.159 5.159m-1.5-1.5l1.409-1.409a2.25 2.25 0 013.182 0l2.909 2.909m-18 3.75h16.5a1.5 1.5 0 001.5-1.5V6a1.5 1.5 0 00-1.5-1.5H3.75A1.5 1.5 0 002.25 6v12a1.5 1.5 0 001.5 1.5zm10.5-11.25h.008v.008h-.008V8.25zm.375 0a.375.375 0 11-.75 0 .375.375 0 01.75 0z" />
                </svg>
              </div>
              <h3 className="font-heading text-xl font-semibold text-[#171717] mb-2">No Photos in This Category</h3>
              <p className="text-sm text-[#6B6B6B] max-w-sm mx-auto mb-6">
                Check back soon or message us on WhatsApp to see photos of our recent work in this category.
              </p>
              <a
                href={buildWhatsAppUrl("Hi, I'd like to see samples of your recent work.")}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-[#171717] text-white font-semibold text-sm hover:bg-[#2a2a2a] transition-colors duration-200"
              >
                Request Samples on WhatsApp
              </a>
            </div>
          )}
        </div>
      </section>
    </div>
  );
}
