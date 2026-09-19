"use client";

import { useState } from "react";
import Link from "next/link";
import SectionHeading from "@/components/site/SectionHeading";
import ProductCard from "@/components/site/ProductCard";
import { buildWhatsAppUrl } from "@/lib/utils";
import { ROUTES } from "@/lib/constants";
import type { Product, Category } from "@/lib/types";

interface ProductListClientProps {
  initialProducts: Product[];
  initialCategories: Category[];
}

export default function ProductListClient({
  initialProducts,
  initialCategories,
}: ProductListClientProps) {
  const [selectedCategory, setSelectedCategory] = useState<string>("all");
  const [searchQuery, setSearchQuery] = useState<string>("");

  const filteredProducts = initialProducts.filter((p) => {
    if (p.is_archived) return false;
    const matchesCategory =
      selectedCategory === "all" || p.category?.slug === selectedCategory;
    const matchesSearch =
      !searchQuery ||
      p.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.short_description?.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

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
            <span className="text-[#171717] font-medium">Products</span>
          </nav>
          <SectionHeading
            eyebrow="Our Collection"
            title="All Products"
            subtitle="Browse our full range of personalized prints and keepsakes."
          />

          {/* Search + Filter Bar */}
          <div className="mt-8 flex flex-col sm:flex-row gap-4 items-stretch sm:items-center justify-between">
            {/* Search input */}
            <div className="relative flex-1 max-w-sm">
              <svg
                className="absolute left-3 top-1/2 -translate-y-1/2 text-[#6B6B6B]"
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                aria-hidden="true"
              >
                <circle cx="11" cy="11" r="8" />
                <path d="m21 21-4.35-4.35" />
              </svg>
              <input
                type="search"
                placeholder="Search products..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-9 pr-4 py-2.5 rounded-full border border-[#E5DDD4] bg-white text-sm text-[#171717] placeholder:text-[#9B9B9B] focus:outline-none focus:border-[#C89B3C] transition-colors duration-200"
              />
            </div>

            {/* Category filter tabs */}
            <div className="flex gap-2 flex-wrap">
              <button
                onClick={() => setSelectedCategory("all")}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-200 ${
                  selectedCategory === "all"
                    ? "bg-[#171717] text-white"
                    : "bg-white border border-[#E5DDD4] text-[#6B6B6B] hover:border-[#C89B3C] hover:text-[#C89B3C]"
                }`}
              >
                All
              </button>
              {initialCategories.map((cat) => (
                <button
                  key={cat.id}
                  onClick={() => setSelectedCategory(cat.slug)}
                  className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-200 ${
                    selectedCategory === cat.slug
                      ? "bg-[#171717] text-white"
                      : "bg-white border border-[#E5DDD4] text-[#6B6B6B] hover:border-[#C89B3C] hover:text-[#C89B3C]"
                  }`}
                >
                  {cat.name}
                </button>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Product Grid */}
      <section className="py-16 bg-white min-h-[50vh]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {filteredProducts.length > 0 ? (
            <>
              <p className="text-xs text-[#6B6B6B] mb-8">
                Showing {filteredProducts.length} product{filteredProducts.length !== 1 ? "s" : ""}
              </p>
              <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {filteredProducts.map((product) => (
                  <ProductCard key={product.id} product={product} />
                ))}
              </div>
            </>
          ) : (
            <div className="text-center py-20 bg-[#F7F3ED] rounded-3xl border border-dashed border-[#E5DDD4] max-w-xl mx-auto">
              <div className="w-16 h-16 rounded-full bg-[#EFE7DB] flex items-center justify-center mx-auto mb-4 text-[#C89B3C]">
                <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z" />
                </svg>
              </div>
              <h3 className="font-heading text-xl font-semibold text-[#171717] mb-2">No Products Found</h3>
              <p className="text-sm text-[#6B6B6B] max-w-sm mx-auto mb-6">
                {searchQuery || selectedCategory !== "all"
                  ? "Try adjusting your search or category filter to find what you're looking for."
                  : "We're currently updating our catalog. Reach out on WhatsApp to ask about custom orders."}
              </p>
              <a
                href={buildWhatsAppUrl("Hi, I couldn't find what I was looking for on the site. Can I ask about a custom order?")}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-[#171717] text-white font-semibold text-sm hover:bg-[#2a2a2a] transition-colors duration-200"
              >
                Ask on WhatsApp
              </a>
            </div>
          )}
        </div>
      </section>
    </div>
  );
}
