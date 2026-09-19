import Image from "next/image";
import Link from "next/link";
import type { Metadata } from "next";
import SectionHeading from "@/components/site/SectionHeading";
import { buildGenericWhatsAppUrl } from "@/lib/utils";
import { ROUTES } from "@/lib/constants";

export const metadata: Metadata = {
  title: "About Us | Rajman Graphics Design and Print",
  description:
    "Learn about Rajman Graphics Design and Print — our story, mission, vision, and what makes us different in personalized print keepsakes.",
};

export default function AboutPage() {
  return (
    <div>
      {/* Page Header */}
      <section className="bg-[#171717] py-20 relative overflow-hidden">
        <div className="absolute inset-0 opacity-[0.05]" style={{ backgroundImage: "radial-gradient(circle at 1px 1px, white 1px, transparent 0)", backgroundSize: "32px 32px" }} aria-hidden="true" />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
          <nav className="flex items-center gap-2 text-xs text-white/40 mb-6" aria-label="Breadcrumb">
            <Link href={ROUTES.home} className="hover:text-white/70 transition-colors">Home</Link>
            <span>/</span>
            <span className="text-white/70 font-medium">About</span>
          </nav>
          <SectionHeading
            eyebrow="Our Story"
            title="About Rajman"
            subtitle="A Lagos-based creative print business helping people preserve memories and celebrate life's most special moments."
            light
          />
        </div>
      </section>

      {/* Brand Story */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[#C89B3C] mb-4">Our Story</p>
              <h2 className="font-heading text-3xl sm:text-4xl font-bold text-[#171717] mb-6 leading-tight">
                More Than a Print Shop
              </h2>
              <div className="space-y-4 text-base text-[#6B6B6B] leading-relaxed">
                <p>
                  Rajman Graphics Design and Print was created from a simple belief: <strong className="text-[#171717]">special memories deserve more than a phone gallery.</strong>
                </p>
                <p>
                  What began as a creative passion for design and printing has grown into a brand focused on helping people turn everyday moments, milestones, and celebrations into lasting keepsakes.
                </p>
                <p>
                  From personalized gifts to custom event prints, Rajman combines thoughtful design, quality finishing, and a personal touch to create items that feel meaningful long after the moment has passed.
                </p>
              </div>
            </div>
            <div className="flex justify-center">
              <div className="relative">
                <div className="absolute inset-0 translate-x-4 translate-y-4 rounded-3xl bg-[#EFE7DB]" />
                <div className="relative bg-white rounded-3xl border border-[#E5DDD4] shadow-xl p-12 flex flex-col items-center gap-4 text-center">
                  <Image
                    src="/brand/rajman-logo.jpg"
                    alt="Rajman Graphics Design and Print"
                    width={120}
                    height={120}
                    className="rounded-full border-4 border-[#EFE7DB]"
                  />
                  <div>
                    <p className="font-heading text-xl font-bold text-[#171717]">Raji Ibrahim</p>
                    <p className="text-sm text-[#C89B3C]">CEO & Founder</p>
                    <p className="text-xs text-[#6B6B6B] mt-1">Est. 2023 · Lagos, Nigeria</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Mission & Vision */}
      <section className="py-20 bg-[#F7F3ED]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 gap-8">
            {/* Mission */}
            <div className="bg-white rounded-3xl p-10 border border-[#E5DDD4] shadow-sm">
              <div className="w-12 h-12 rounded-2xl bg-[#C89B3C] flex items-center justify-center mb-6">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" aria-hidden="true">
                  <circle cx="12" cy="12" r="10" />
                  <circle cx="12" cy="12" r="6" />
                  <circle cx="12" cy="12" r="2" />
                </svg>
              </div>
              <h3 className="font-heading text-2xl font-bold text-[#171717] mb-4">Our Mission</h3>
              <p className="text-[#6B6B6B] leading-relaxed">
                To create beautiful, high-quality personalized prints and keepsakes that help people preserve memories, celebrate loved ones, and express meaning through thoughtful design.
              </p>
            </div>

            {/* Vision */}
            <div className="bg-[#171717] rounded-3xl p-10 border border-[#171717] shadow-sm">
              <div className="w-12 h-12 rounded-2xl bg-[#C89B3C] flex items-center justify-center mb-6">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" aria-hidden="true">
                  <path d="M2 12s3-7 10-7 10 7 10 7-3 7-10 7-10-7-10-7z" />
                  <circle cx="12" cy="12" r="3" />
                </svg>
              </div>
              <h3 className="font-heading text-2xl font-bold text-white mb-4">Our Vision</h3>
              <p className="text-white/70 leading-relaxed">
                To become a trusted creative print brand known for transforming life's most important moments into memorable, lasting experiences through premium design and personalization.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* What Makes Us Different */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeading
            eyebrow="Our Edge"
            title="What Makes Rajman Different"
            centered
          />
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-12">
            {[
              {
                icon: "❤️",
                title: "Emotional Storytelling",
                desc: "We don't just print — we help you tell a story. Every product is designed around the emotion and memory it represents.",
              },
              {
                icon: "🎨",
                title: "Personalized Design",
                desc: "Nothing is generic here. Every piece is crafted to reflect you, your occasion, and the people you're celebrating.",
              },
              {
                icon: "✨",
                title: "Quality You Can Feel",
                desc: "From premium materials to precise finishing, we ensure every item looks and feels as special as the moment it represents.",
              },
            ].map((item) => (
              <div key={item.title} className="text-center p-8 rounded-2xl bg-[#F7F3ED] border border-[#E5DDD4]">
                <span className="text-4xl">{item.icon}</span>
                <h3 className="font-heading text-xl font-semibold text-[#171717] mt-4 mb-3">{item.title}</h3>
                <p className="text-sm text-[#6B6B6B] leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 bg-[#EFE7DB]">
        <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="font-heading text-3xl font-bold text-[#171717] mb-4">Ready to Create Something Meaningful?</h2>
          <p className="text-[#6B6B6B] mb-8 leading-relaxed">
            Reach out on WhatsApp and let's talk about your idea. We'll turn it into something beautiful.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <a
              href={buildGenericWhatsAppUrl()}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2 px-8 py-3.5 rounded-full bg-[#C89B3C] text-white text-sm font-semibold hover:bg-[#b08830] transition-colors duration-200"
            >
              <WhatsAppIcon />
              Chat on WhatsApp
            </a>
            <Link
              href={ROUTES.products}
              className="inline-flex items-center justify-center px-8 py-3.5 rounded-full border-2 border-[#171717] text-[#171717] text-sm font-semibold hover:bg-[#171717] hover:text-white transition-all duration-200"
            >
              Browse Products
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}

function WhatsAppIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
    </svg>
  );
}
