// ============================================================
// RAJMAN — Mock / Seed Data (used until Supabase is connected)
// ============================================================

import type { Category, Product, GalleryItem, Testimonial, SiteSettings, SocialLinks } from "./types";

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

// Products will be empty until admin adds real ones
export const mockProducts: Product[] = [];

// Gallery will be empty until admin uploads real work
export const mockGalleryItems: GalleryItem[] = [];

// Testimonials will be empty until admin adds real reviews
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
  // instagram, facebook, tiktok, x — will be added via admin
};
