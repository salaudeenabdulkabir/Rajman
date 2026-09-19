// ============================================================
// RAJMAN — Data Layer (Supabase with Local Fallbacks)
// ============================================================

import type { Category, Product, GalleryItem, Testimonial, SiteSettings, SocialLinks, ContactMessage } from "./types";
import { createClient as createBrowserSupabase } from "./supabase/client";

export const mockCategories: Category[] = [
  {
    id: "cat-1",
    name: "Photo Frames",
    slug: "photo-frames",
    description: "Beautiful custom frames that turn your favourite photos into wall art.",
    created_at: "2024-01-01T00:00:00Z",
  },
  {
    id: "cat-2",
    name: "Custom Mugs",
    slug: "custom-mugs",
    description: "Start every morning with a memory — personalised mugs made just for you.",
    created_at: "2024-01-01T00:00:00Z",
  },
  {
    id: "cat-3",
    name: "Throw Pillows",
    slug: "throw-pillows",
    description: "Soft, premium pillows printed with your most meaningful photos.",
    created_at: "2024-01-01T00:00:00Z",
  },
  {
    id: "cat-4",
    name: "Personalized Gifts",
    slug: "personalized-gifts",
    description: "Thoughtful, one-of-a-kind gifts designed around the person you love.",
    created_at: "2024-01-01T00:00:00Z",
  },
  {
    id: "cat-5",
    name: "Event Prints",
    slug: "event-prints",
    description: "Banners, backdrops, and branded print materials for every occasion.",
    created_at: "2024-01-01T00:00:00Z",
  },
];

export const mockProducts: Product[] = [];
export const mockGalleryItems: GalleryItem[] = [];
export const mockTestimonials: Testimonial[] = [];

export const siteSettings: SiteSettings = {
  site_name: "Rajman Graphics Design and Print",
  tagline: "Turning Moments Into Memories",
  phone: "+234 916 012 9087",
  whatsapp: "+2349160129087",
  email: "ibrahimrajman@gmail.com",
  address_line: "Aratumi Junction, Iba, Ojo, Lagos, Nigeria",
  opening_hours: "Daily, 9:00 AM – 8:00 PM",
  footer_summary:
    "Rajman Graphics Design and Print creates custom keepsakes and print products that help turn meaningful moments into lasting memories.",
  hero_headline: "Turning Moments Into Memories",
  hero_subtext:
    "Beautifully designed and personalized keepsakes made to celebrate the moments that matter most.",
  hero_primary_cta: "Explore Our Designs",
  hero_secondary_cta: "Order on WhatsApp",
  about_summary:
    "Rajman Graphics Design and Print is a Lagos-based creative print business focused on helping people preserve memories and celebrate life's most special moments.",
};

export const socialLinks: SocialLinks = {
  whatsapp: "+2349160129087",
};

// ============================================================
// ASYNC SUPABASE DATA FETCHERS (WITH GRACEFUL FALLBACK)
// ============================================================

export async function fetchCategories(): Promise<Category[]> {
  try {
    const supabase = createBrowserSupabase();
    const { data, error } = await supabase
      .from("categories")
      .select("*")
      .order("sort_order", { ascending: true });

    if (error || !data || data.length === 0) {
      return mockCategories;
    }
    return data as Category[];
  } catch {
    return mockCategories;
  }
}

export async function fetchProducts(): Promise<Product[]> {
  try {
    const supabase = createBrowserSupabase();
    const { data, error } = await supabase
      .from("products")
      .select(`
        *,
        category:categories(*),
        images:product_images(*)
      `)
      .eq("is_archived", false)
      .eq("is_available", true)
      .order("created_at", { ascending: false });

    if (error || !data) {
      return mockProducts;
    }
    return data as unknown as Product[];
  } catch {
    return mockProducts;
  }
}

export async function fetchProductBySlug(slug: string): Promise<Product | null> {
  try {
    const supabase = createBrowserSupabase();
    const { data, error } = await supabase
      .from("products")
      .select(`
        *,
        category:categories(*),
        images:product_images(*)
      `)
      .eq("slug", slug)
      .single();

    if (error || !data) {
      const fallback = mockProducts.find((p) => p.slug === slug);
      return fallback || null;
    }
    return data as unknown as Product;
  } catch {
    return mockProducts.find((p) => p.slug === slug) || null;
  }
}

export async function fetchGalleryItems(): Promise<GalleryItem[]> {
  try {
    const supabase = createBrowserSupabase();
    const { data, error } = await supabase
      .from("gallery_items")
      .select("*")
      .eq("is_published", true)
      .order("sort_order", { ascending: true });

    if (error || !data) {
      return mockGalleryItems;
    }
    return data as GalleryItem[];
  } catch {
    return mockGalleryItems;
  }
}

export async function fetchTestimonials(): Promise<Testimonial[]> {
  try {
    const supabase = createBrowserSupabase();
    const { data, error } = await supabase
      .from("testimonials")
      .select("*")
      .eq("is_published", true)
      .order("sort_order", { ascending: true });

    if (error || !data) {
      return mockTestimonials;
    }
    return data as Testimonial[];
  } catch {
    return mockTestimonials;
  }
}

export async function submitContactMessage(message: {
  name: string;
  email: string;
  phone?: string;
  message: string;
}): Promise<{ success: boolean; error?: string }> {
  try {
    const supabase = createBrowserSupabase();
    const { error } = await supabase.from("contact_messages").insert({
      name: message.name,
      email: message.email,
      phone: message.phone || null,
      message: message.message,
    });

    if (error) {
      return { success: false, error: error.message };
    }
    return { success: true };
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : "Failed to send message";
    return { success: false, error: message };
  }
}
