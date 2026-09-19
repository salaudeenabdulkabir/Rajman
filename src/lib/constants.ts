// ============================================================
// RAJMAN — Brand Constants
// ============================================================

export const BRAND = {
  name: "Rajman Graphics Design and Print",
  shortName: "Rajman",
  tagline: "Turning Moments Into Memories",
  founder: "Raji Ibrahim",
  founderTitle: "CEO, Rajman Graphics Design and Print",
  yearStarted: 2023,
} as const;

export const CONTACT = {
  phone: "+234 916 012 9087",
  whatsapp: "+2349160129087", // no spaces for WhatsApp URL
  whatsappDisplay: "+234 916 012 9087",
  email: "ibrahimrajman@gmail.com",
  address: "Aratumi Junction, Iba, Ojo, Lagos, Nigeria",
  addressShort: "Iba, Ojo, Lagos",
  openingHours: "Daily, 9:00 AM – 8:00 PM",
  mapsUrl:
    "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3966.2!2d3.17!3d6.48!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zNsKwMjgnNDguMCJOIDPCsDEwJzEyLjAiRQ!5e0!3m2!1sen!2sng!4v1000000000000",
} as const;

export const WHATSAPP = {
  defaultMessage:
    "Hi Rajman Graphics, I'm interested in your custom print products and I'd like to know more about pricing and personalization options.",
  productMessage: (productName: string) =>
    `Hi Rajman Graphics, I'm interested in ${productName}. I'd like to know the price and customization options.`,
} as const;

export const ROUTES = {
  home: "/",
  products: "/products",
  gallery: "/gallery",
  about: "/about",
  contact: "/contact",
  admin: "/admin",
  adminLogin: "/admin/login",
  adminProducts: "/admin/products",
  adminCategories: "/admin/categories",
  adminGallery: "/admin/gallery",
  adminTestimonials: "/admin/testimonials",
  adminMessages: "/admin/messages",
  adminContent: "/admin/content",
  adminSocialLinks: "/admin/social-links",
  adminSettings: "/admin/settings",
} as const;

export const GALLERY_FILTERS = [
  { label: "All", value: "all" },
  { label: "Frames", value: "frames" },
  { label: "Mugs", value: "mugs" },
  { label: "Pillows", value: "pillows" },
  { label: "Events", value: "events" },
  { label: "Gifts", value: "gifts" },
] as const;

export const DEFAULT_CATEGORIES = [
  "Photo Frames",
  "Custom Mugs",
  "Throw Pillows",
  "Personalized Gifts",
  "Event Prints",
] as const;

export const OCCASIONS = [
  "Birthdays",
  "Weddings",
  "Anniversaries",
  "Graduations",
  "Valentine's Day",
  "Memorial Keepsakes",
  "Surprise Gifts",
  "Event Branding",
] as const;
