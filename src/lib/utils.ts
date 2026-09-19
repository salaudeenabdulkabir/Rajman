// ============================================================
// RAJMAN — Utility Functions
// ============================================================

import { CONTACT, WHATSAPP } from "./constants";

/**
 * Builds a WhatsApp URL with an optional pre-filled message.
 */
export function buildWhatsAppUrl(message?: string): string {
  const base = `https://wa.me/${CONTACT.whatsapp}`;
  if (!message) return base;
  return `${base}?text=${encodeURIComponent(message)}`;
}

/**
 * Returns a WhatsApp URL with the default product inquiry message.
 */
export function buildProductWhatsAppUrl(productName: string): string {
  return buildWhatsAppUrl(WHATSAPP.productMessage(productName));
}

/**
 * Returns a WhatsApp URL with the generic fallback message.
 */
export function buildGenericWhatsAppUrl(): string {
  return buildWhatsAppUrl(WHATSAPP.defaultMessage);
}

/**
 * Formats a naira price for display.
 */
export function formatPrice(price?: number | null): string {
  if (!price) return "Contact for price";
  return new Intl.NumberFormat("en-NG", {
    style: "currency",
    currency: "NGN",
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(price);
}

/**
 * Creates a URL slug from a string.
 */
export function slugify(text: string): string {
  return text
    .toLowerCase()
    .replace(/[^a-z0-9\s-]/g, "")
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-")
    .trim();
}

/**
 * Truncates text to a given length with an ellipsis.
 */
export function truncate(text: string, length: number): string {
  if (text.length <= length) return text;
  return text.slice(0, length).trim() + "…";
}

/**
 * Returns initials from a name (for avatar placeholders).
 */
export function getInitials(name: string): string {
  return name
    .split(" ")
    .map((n) => n[0])
    .join("")
    .toUpperCase()
    .slice(0, 2);
}

/**
 * Formats a date string to a readable format.
 */
export function formatDate(dateString: string): string {
  return new Date(dateString).toLocaleDateString("en-NG", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });
}

/**
 * Generates star rating display (e.g., "★★★★☆").
 */
export function renderStars(rating: number, max = 5): string {
  const filled = "★".repeat(Math.min(rating, max));
  const empty = "☆".repeat(Math.max(0, max - rating));
  return filled + empty;
}

/**
 * Classnames helper (lightweight, no dependency needed).
 */
export function cn(...classes: (string | undefined | null | false)[]): string {
  return classes.filter(Boolean).join(" ");
}
