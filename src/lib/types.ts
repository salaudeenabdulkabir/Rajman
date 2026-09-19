// ============================================================
// RAJMAN — TypeScript Types
// ============================================================

export interface Category {
  id: string;
  name: string;
  slug: string;
  description?: string;
  image_url?: string;
  created_at: string;
}

export interface ProductImage {
  id: string;
  product_id: string;
  url: string;
  alt_text?: string;
  sort_order: number;
}

export interface Product {
  id: string;
  name: string;
  slug: string;
  short_description?: string;
  full_description?: string;
  category_id: string;
  category?: Category;
  price?: number;
  price_label: string; // e.g. "Contact for price" or "From ₦5,000"
  images: ProductImage[];
  tags: string[];
  is_featured: boolean;
  is_available: boolean;
  is_archived: boolean;
  created_at: string;
  updated_at: string;
}

export interface GalleryItem {
  id: string;
  title?: string;
  caption?: string;
  image_url: string;
  category?: string;
  is_featured: boolean;
  is_published: boolean;
  created_at: string;
}

export interface Testimonial {
  id: string;
  customer_name: string;
  text: string;
  rating: number; // 1–5
  photo_url?: string;
  is_published: boolean;
  created_at: string;
}

export interface ContactMessage {
  id: string;
  name: string;
  email: string;
  phone?: string;
  message: string;
  is_read: boolean;
  created_at: string;
}

export interface SiteSettings {
  site_name: string;
  tagline: string;
  phone: string;
  whatsapp: string;
  email: string;
  address_line: string;
  opening_hours: string;
  maps_url?: string;
  footer_summary: string;
  hero_headline: string;
  hero_subtext: string;
  hero_primary_cta: string;
  hero_secondary_cta: string;
  about_summary: string;
}

export interface SocialLinks {
  instagram?: string;
  facebook?: string;
  tiktok?: string;
  x?: string;
  whatsapp: string;
}
