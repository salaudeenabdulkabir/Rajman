import { cn } from "@/lib/utils";

interface SectionHeadingProps {
  eyebrow?: string;
  title: string;
  subtitle?: string;
  centered?: boolean;
  light?: boolean; // for dark backgrounds
  className?: string;
}

export default function SectionHeading({
  eyebrow,
  title,
  subtitle,
  centered = false,
  light = false,
  className,
}: SectionHeadingProps) {
  return (
    <div
      className={cn(
        "mb-12",
        centered && "text-center mx-auto",
        className
      )}
    >
      {eyebrow && (
        <p
          className={cn(
            "text-xs font-semibold uppercase tracking-[0.2em] mb-3",
            light ? "text-[#C89B3C]" : "text-[#C89B3C]"
          )}
        >
          {eyebrow}
        </p>
      )}
      <h2
        className={cn(
          "font-heading text-3xl sm:text-4xl font-semibold leading-tight",
          light ? "text-white" : "text-[#171717]"
        )}
      >
        {title}
      </h2>
      {subtitle && (
        <p
          className={cn(
            "mt-4 text-base leading-relaxed max-w-2xl",
            centered && "mx-auto",
            light ? "text-white/70" : "text-[#6B6B6B]"
          )}
        >
          {subtitle}
        </p>
      )}
    </div>
  );
}
