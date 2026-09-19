import Image from "next/image";
import type { GalleryItem } from "@/lib/types";

interface GalleryCardProps {
  item: GalleryItem;
  onClick?: (item: GalleryItem) => void;
}

export default function GalleryCard({ item, onClick }: GalleryCardProps) {
  return (
    <button
      className="group relative w-full overflow-hidden rounded-2xl bg-[#EFE7DB] cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-[#C89B3C]"
      onClick={() => onClick?.(item)}
      aria-label={item.title || "View gallery image"}
    >
      <div className="relative aspect-square">
        <Image
          src={item.image_url}
          alt={item.title || "Gallery image"}
          fill
          className="object-cover group-hover:scale-105 transition-transform duration-500"
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
        />
      </div>
      {/* Overlay on hover */}
      <div className="absolute inset-0 bg-[#171717]/0 group-hover:bg-[#171717]/40 transition-all duration-300 flex items-end p-4">
        <div className="translate-y-4 group-hover:translate-y-0 opacity-0 group-hover:opacity-100 transition-all duration-300">
          {item.title && (
            <p className="text-white font-heading text-sm font-semibold">{item.title}</p>
          )}
          {item.caption && (
            <p className="text-white/80 text-xs mt-0.5">{item.caption}</p>
          )}
        </div>
      </div>
    </button>
  );
}
