import type { Metadata } from "next";
import { fetchGalleryItems } from "@/lib/data";
import GalleryListClient from "@/components/site/GalleryListClient";

export const metadata: Metadata = {
  title: "Gallery | Rajman Graphics Design and Print",
  description: "Browse our showcase of beautifully crafted photo frames, personalized mugs, throw pillows, and event prints.",
};

export const dynamic = "force-dynamic";

export default async function GalleryPage() {
  const galleryItems = await fetchGalleryItems();

  return <GalleryListClient initialItems={galleryItems} />;
}
