import Image from "next/image";
import Link from "next/link";
import type { Metadata } from "next";
import SectionHeading from "@/components/site/SectionHeading";
import { mockCategories, mockProducts, mockGalleryItems, mockTestimonials } from "@/lib/data";
import { buildGenericWhatsAppUrl } from "@/lib/utils";
import { OCCASIONS, ROUTES } from "@/lib/constants";

export const metadata: Metadata = {
  title: "Rajman Graphics Design and Print | Personalized Gifts, Frames, Mugs & Prints",
  description:
    "Beautifully designed and personalized keepsakes made to celebrate the moments that matter most. Custom photo frames, mugs, throw pillows, and event prints in Lagos.",
};

export default function HomePage() {
  const featuredProducts = mockProducts.filter((p) => p.is_featured).slice(0, 3);
  const galleryPreview = mockGalleryItems.filter((g) => g.is_published).slice(0, 6);
  const publishedTestimonials = mockTestimonials.filter((t) => t.is_published).slice(0, 3);

  return (
    <div className="flex flex-col">
      {/* ── 1. HERO ──────────────────────────────────────────── */}
      <section
        id="hero"
        className="relative min-h-[90vh] flex items-center justify-center bg-[#F7F3ED] overflow-hidden"
      >
        {/* Background pattern */}
        <div
          className="absolute inset-0 opacity-[0.03]"
          style={{
            backgroundImage: `radial-gradient(circle at 1px 1px, #171717 1px, transparent 0)`,
            backgroundSize: "32px 32px",
          }}
          aria-hidden="true"
        />
        {/* Gold accent circle */}
        <div
          className="absolute -top-40 -right-40 w-[500px] h-[500px] rounded-full bg-[#C89B3C]/10 blur-3xl"
          aria-hidden="true"
        />
        <div
          className="absolute -bottom-40 -left-40 w-[400px] h-[400px] rounded-full bg-[#C89B3C]/8 blur-3xl"
          aria-hidden="true"
        />

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 grid lg:grid-cols-2 gap-16 items-center">
          {/* Text */}
          <div className="animate-fade-up">
            <p className="text-xs font-semibold uppercase tracking-[0.25em] text-[#C89B3C] mb-5">
              Est. 2023 · Lagos, Nigeria
            </p>
            <h1 className="font-heading text-4xl sm:text-5xl lg:text-6xl font-bold text-[#171717] leading-[1.1] mb-6">
              Turning Moments<br />
              <span className="text-[#C89B3C] italic">Into Memories</span>
            </h1>
            <p className="text-base sm:text-lg text-[#6B6B6B] leading-relaxed max-w-md mb-8">
              Beautifully designed and personalized keepsakes made to celebrate the moments that matter most.
            </p>
            <div className="flex flex-col sm:flex-row gap-3">
              <Link
                href={ROUTES.products}
                id="hero-explore-cta"
                className="inline-flex items-center justify-center px-7 py-3.5 rounded-full bg-[#171717] text-white text-sm font-semibold hover:bg-[#2a2a2a] transition-colors duration-200 shadow-sm"
              >
                Explore Our Designs
              </Link>
              <a
                href={buildGenericWhatsAppUrl()}
                target="_blank"
                rel="noopener noreferrer"
                id="hero-whatsapp-cta"
                className="inline-flex items-center justify-center gap-2 px-7 py-3.5 rounded-full border-2 border-[#C89B3C] text-[#C89B3C] text-sm font-semibold hover:bg-[#C89B3C] hover:text-white transition-all duration-200"
              >
                <WhatsAppIcon />
                Order on WhatsApp
              </a>
            </div>
          </div>

          {/* Visual — logo on elegant card */}
          <div className="hidden lg:flex items-center justify-center animate-scale-in delay-200">
            <div className="relative">
              {/* Layered cards effect */}
              <div className="absolute inset-0 translate-x-4 translate-y-4 rounded-3xl bg-[#EFE7DB] border border-[#E5DDD4]" />
              <div className="absolute inset-0 translate-x-2 translate-y-2 rounded-3xl bg-[#EFE7DB]/80 border border-[#E5DDD4]" />
              <div className="relative bg-white rounded-3xl border border-[#E5DDD4] shadow-xl p-12 flex flex-col items-center gap-6">
                <div className="relative w-32 h-32">
                  <Image
                    src="/brand/rajman-logo.jpg"
                    alt="Rajman Graphics Design and Print"
                    fill
                    className="object-contain rounded-full"
                    priority
                  />
                </div>
                <div className="text-center">
                  <p className="font-heading text-xl font-semibold text-[#171717]">Rajman Graphics</p>
                  <p className="text-sm text-[#C89B3C] mt-1 italic">Turning Moments Into Memories</p>
                </div>
                <div className="w-full pt-4 border-t border-[#EFE7DB] grid grid-cols-3 gap-4 text-center">
                  {[
                    { label: "Products", value: "5+" },
                    { label: "Categories", value: "5" },
                    { label: "Since", value: "2023" },
                  ].map((stat) => (
                    <div key={stat.label}>
                      <p className="font-heading text-xl font-bold text-[#171717]">{stat.value}</p>
                      <p className="text-xs text-[#6B6B6B]">{stat.label}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Scroll indicator */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce" aria-hidden="true">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#C89B3C" strokeWidth="2">
            <path d="M12 5v14M5 12l7 7 7-7" />
          </svg>
        </div>
      </section>

      {/* ── 2. FEATURED PRODUCTS ─────────────────────────────── */}
      <section id="featured-products" className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeading
            eyebrow="Our Work"
            title="Featured Designs"
            subtitle="Handcrafted pieces made for people who cherish memories."
            centered
          />

          {featuredProducts.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-10">
              {featuredProducts.map((product) => (
                <div key={product.id} className="bg-[#F7F3ED] rounded-2xl p-6 text-center">
                  <p className="font-heading text-lg font-semibold text-[#171717]">{product.name}</p>
                </div>
              ))}
            </div>
          ) : (
            <div className="mt-10 text-center py-16 rounded-2xl bg-[#F7F3ED] border border-dashed border-[#E5DDD4]">
              <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-[#EFE7DB] mb-4">
                <PackageIcon />
              </div>
              <p className="font-heading text-lg font-semibold text-[#171717] mb-2">
                Products Coming Soon
              </p>
              <p className="text-sm text-[#6B6B6B] max-w-xs mx-auto mb-6">
                Our products will appear here once added. Browse categories or reach out to order.
              </p>
              <a
                href={buildGenericWhatsAppUrl()}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-6 py-2.5 rounded-full bg-[#C89B3C] text-white text-sm font-medium hover:bg-[#b08830] transition-colors duration-200"
              >
                <WhatsAppIcon />
                Enquire on WhatsApp
              </a>
            </div>
          )}

          <div className="text-center mt-10">
            <Link
              href={ROUTES.products}
              className="inline-flex items-center gap-2 text-sm font-semibold text-[#C89B3C] hover:gap-3 transition-all duration-200"
            >
              View All Products
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M5 12h14M12 5l7 7-7 7" />
              </svg>
            </Link>
          </div>
        </div>
      </section>

      {/* ── 3. PRODUCT CATEGORIES ────────────────────────────── */}
      <section id="categories" className="py-24 bg-[#F7F3ED]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeading
            eyebrow="Browse"
            title="What We Create"
            subtitle="Every product is thoughtfully designed and made with care."
            centered
          />

          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4 mt-10">
            {mockCategories.map((cat, i) => (
              <Link
                key={cat.id}
                href={`${ROUTES.products}?category=${cat.slug}`}
                className={`group flex flex-col items-center gap-3 p-6 rounded-2xl border transition-all duration-300 hover:border-[#C89B3C] hover:shadow-md ${
                  i === 0 ? "bg-[#C89B3C] border-[#C89B3C] text-white" : "bg-white border-[#E5DDD4]"
                }`}
              >
                <div
                  className={`w-12 h-12 rounded-xl flex items-center justify-center ${
                    i === 0 ? "bg-white/20" : "bg-[#F7F3ED] group-hover:bg-[#EFE7DB]"
                  } transition-colors duration-200`}
                >
                  <CategoryIcon index={i} active={i === 0} />
                </div>
                <span
                  className={`text-sm font-semibold text-center ${
                    i === 0 ? "text-white" : "text-[#171717]"
                  }`}
                >
                  {cat.name}
                </span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ── 4. WHY CHOOSE RAJMAN ─────────────────────────────── */}
      <section id="why-us" className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div>
              <SectionHeading
                eyebrow="Why Choose Us"
                title="Why Choose Rajman"
                subtitle="We don't just print — we create things that feel meaningful."
              />
              <ul className="space-y-5">
                {[
                  {
                    icon: "❤️",
                    title: "Personalized with Care",
                    desc: "Every product is crafted for you, for your occasion, and for the people you love.",
                  },
                  {
                    icon: "✨",
                    title: "Premium Quality Finishing",
                    desc: "Beautiful materials and precise printing that stands out and lasts.",
                  },
                  {
                    icon: "🎨",
                    title: "Creative Concepts",
                    desc: "Thoughtful designs tailored to your memory, celebration, or brand.",
                  },
                  {
                    icon: "💬",
                    title: "Simple WhatsApp Ordering",
                    desc: "Just send a message and we handle everything — quick, easy, friendly.",
                  },
                  {
                    icon: "🎁",
                    title: "Perfect for Every Occasion",
                    desc: "Gifts, events, home décor, keepsakes — we've got you covered.",
                  },
                ].map((item) => (
                  <li key={item.title} className="flex gap-4">
                    <span className="text-2xl shrink-0">{item.icon}</span>
                    <div>
                      <p className="font-semibold text-[#171717] text-sm mb-0.5">{item.title}</p>
                      <p className="text-sm text-[#6B6B6B] leading-relaxed">{item.desc}</p>
                    </div>
                  </li>
                ))}
              </ul>
            </div>
            {/* Visual quote card */}
            <div className="flex items-center justify-center">
              <div className="bg-[#F7F3ED] rounded-3xl p-10 border border-[#E5DDD4] max-w-sm text-center">
                <p className="font-heading text-4xl text-[#C89B3C] mb-4">&ldquo;</p>
                <p className="font-heading text-xl font-semibold text-[#171717] leading-snug italic">
                  Special memories deserve more than a phone gallery.
                </p>
                <div className="mt-6 pt-6 border-t border-[#E5DDD4]">
                  <Image
                    src="/brand/rajman-logo.jpg"
                    alt="Rajman"
                    width={40}
                    height={40}
                    className="rounded-full mx-auto mb-2"
                  />
                  <p className="text-xs font-semibold text-[#171717]">Raji Ibrahim</p>
                  <p className="text-xs text-[#6B6B6B]">CEO, Rajman Graphics Design and Print</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── 5. HOW IT WORKS ──────────────────────────────────── */}
      <section id="how-it-works" className="py-24 bg-[#171717]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeading
            eyebrow="Process"
            title="How It Works"
            subtitle="Getting your personalized keepsake is simple and easy."
            centered
            light
          />
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mt-10">
            {[
              {
                step: "01",
                title: "Choose a Design",
                desc: "Browse our products or share your design inspiration with us.",
              },
              {
                step: "02",
                title: "Share Your Details",
                desc: "Send your photo, custom text, or personalization request via WhatsApp.",
              },
              {
                step: "03",
                title: "Confirm & Approve",
                desc: "We'll send you a design preview. You confirm the finishing touches.",
              },
              {
                step: "04",
                title: "Receive Your Keepsake",
                desc: "Your beautifully crafted item is ready for pickup or delivery.",
              },
            ].map((step) => (
              <div
                key={step.step}
                className="relative p-6 rounded-2xl bg-white/5 border border-white/10 hover:border-[#C89B3C]/50 transition-colors duration-300"
              >
                <p className="font-heading text-5xl font-bold text-[#C89B3C]/30 mb-4">{step.step}</p>
                <h3 className="font-heading text-lg font-semibold text-white mb-2">{step.title}</h3>
                <p className="text-sm text-white/60 leading-relaxed">{step.desc}</p>
              </div>
            ))}
          </div>
          <div className="text-center mt-10">
            <a
              href={buildGenericWhatsAppUrl()}
              target="_blank"
              rel="noopener noreferrer"
              id="how-it-works-cta"
              className="inline-flex items-center gap-2 px-8 py-3.5 rounded-full bg-[#C89B3C] text-white text-sm font-semibold hover:bg-[#D9B45C] transition-colors duration-200"
            >
              <WhatsAppIcon />
              Start Your Order
            </a>
          </div>
        </div>
      </section>

      {/* ── 6. OCCASIONS ─────────────────────────────────────── */}
      <section id="occasions" className="py-24 bg-[#F7F3ED]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeading
            eyebrow="Occasions"
            title="Made for Every Meaningful Occasion"
            subtitle="Whatever the celebration, we create something to remember it by."
            centered
          />
          <div className="flex flex-wrap gap-3 justify-center mt-10">
            {OCCASIONS.map((occasion) => (
              <span
                key={occasion}
                className="px-5 py-2.5 rounded-full bg-white border border-[#E5DDD4] text-sm font-medium text-[#171717] hover:border-[#C89B3C] hover:text-[#C89B3C] hover:bg-[#EFE7DB] transition-all duration-200 cursor-default"
              >
                {occasion}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* ── 7. GALLERY PREVIEW ───────────────────────────────── */}
      <section id="gallery-preview" className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeading
            eyebrow="Our Work"
            title="A Glimpse of What We Make"
            subtitle="Every piece tells a story. Here's a look at some of our recent work."
            centered
          />

          {galleryPreview.length > 0 ? (
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mt-10">
              {galleryPreview.map((item) => (
                <div key={item.id} className="aspect-square rounded-2xl overflow-hidden bg-[#EFE7DB]">
                  <span className="sr-only">{item.title}</span>
                </div>
              ))}
            </div>
          ) : (
            <div className="mt-10 text-center py-16 rounded-2xl bg-[#F7F3ED] border border-dashed border-[#E5DDD4]">
              <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-[#EFE7DB] mb-4">
                <GalleryIcon />
              </div>
              <p className="font-heading text-lg font-semibold text-[#171717] mb-2">Gallery Coming Soon</p>
              <p className="text-sm text-[#6B6B6B] max-w-xs mx-auto">
                Our gallery will showcase finished work once added. Check back soon!
              </p>
            </div>
          )}

          <div className="text-center mt-10">
            <Link
              href={ROUTES.gallery}
              className="inline-flex items-center gap-2 text-sm font-semibold text-[#C89B3C] hover:gap-3 transition-all duration-200"
            >
              View Full Gallery
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M5 12h14M12 5l7 7-7 7" />
              </svg>
            </Link>
          </div>
        </div>
      </section>

      {/* ── 8. TESTIMONIALS ──────────────────────────────────── */}
      {publishedTestimonials.length > 0 && (
        <section id="testimonials" className="py-24 bg-[#F7F3ED]">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <SectionHeading
              eyebrow="Reviews"
              title="What Our Customers Say"
              centered
            />
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-10">
              {publishedTestimonials.map((t) => (
                <blockquote
                  key={t.id}
                  className="bg-white rounded-2xl p-7 border border-[#E5DDD4] shadow-sm"
                >
                  <div className="flex gap-1 mb-4 text-[#C89B3C] text-lg">
                    {"★".repeat(t.rating)}
                    {"☆".repeat(5 - t.rating)}
                  </div>
                  <p className="text-sm text-[#6B6B6B] leading-relaxed italic mb-5">
                    &ldquo;{t.text}&rdquo;
                  </p>
                  <footer className="flex items-center gap-3">
                    <div className="w-9 h-9 rounded-full bg-[#EFE7DB] flex items-center justify-center text-xs font-bold text-[#C89B3C]">
                      {t.customer_name.slice(0, 2).toUpperCase()}
                    </div>
                    <cite className="not-italic text-sm font-semibold text-[#171717]">
                      {t.customer_name}
                    </cite>
                  </footer>
                </blockquote>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* ── 9. CONTACT / WHATSAPP CTA ────────────────────────── */}
      <section id="contact-cta" className="py-24 bg-[#EFE7DB]">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[#C89B3C] mb-4">
            Let's Create Something Meaningful
          </p>
          <h2 className="font-heading text-3xl sm:text-4xl font-bold text-[#171717] mb-4 leading-tight">
            Ready to Turn Your Moments Into Memories?
          </h2>
          <p className="text-base text-[#6B6B6B] leading-relaxed mb-8 max-w-xl mx-auto">
            Whether you want a custom frame, a personalized gift, or a special event print, we're ready to help you bring your idea to life.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <a
              href={buildGenericWhatsAppUrl()}
              target="_blank"
              rel="noopener noreferrer"
              id="bottom-whatsapp-cta"
              className="inline-flex items-center justify-center gap-2 px-8 py-3.5 rounded-full bg-[#171717] text-white text-sm font-semibold hover:bg-[#2a2a2a] transition-colors duration-200 shadow-sm"
            >
              <WhatsAppIcon />
              Order on WhatsApp
            </a>
            <Link
              href={ROUTES.contact}
              className="inline-flex items-center justify-center px-8 py-3.5 rounded-full border-2 border-[#171717] text-[#171717] text-sm font-semibold hover:bg-[#171717] hover:text-white transition-all duration-200"
            >
              Send a Message
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}

// ── Local Icons ────────────────────────────────────────────

function WhatsAppIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
    </svg>
  );
}

function PackageIcon() {
  return (
    <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#C89B3C" strokeWidth="1.5" aria-hidden="true">
      <path strokeLinecap="round" strokeLinejoin="round" d="M20.25 7.5l-.625 10.632a2.25 2.25 0 01-2.247 2.118H6.622a2.25 2.25 0 01-2.247-2.118L3.75 7.5M10 11.25h4M3.375 7.5h17.25c.621 0 1.125-.504 1.125-1.125v-1.5c0-.621-.504-1.125-1.125-1.125H3.375c-.621 0-1.125.504-1.125 1.125v1.5c0 .621.504 1.125 1.125 1.125z" />
    </svg>
  );
}

function GalleryIcon() {
  return (
    <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#C89B3C" strokeWidth="1.5" aria-hidden="true">
      <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 15.75l5.159-5.159a2.25 2.25 0 013.182 0l5.159 5.159m-1.5-1.5l1.409-1.409a2.25 2.25 0 013.182 0l2.909 2.909m-18 3.75h16.5a1.5 1.5 0 001.5-1.5V6a1.5 1.5 0 00-1.5-1.5H3.75A1.5 1.5 0 002.25 6v12a1.5 1.5 0 001.5 1.5zm10.5-11.25h.008v.008h-.008V8.25zm.375 0a.375.375 0 11-.75 0 .375.375 0 01.75 0z" />
    </svg>
  );
}

function CategoryIcon({ index, active }: { index: number; active: boolean }) {
  const color = active ? "white" : "#C89B3C";
  const icons = [
    // Frame
    <svg key="frame" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="1.8" aria-hidden="true">
      <rect x="3" y="3" width="18" height="18" rx="2" />
      <rect x="7" y="7" width="10" height="10" rx="1" />
    </svg>,
    // Mug
    <svg key="mug" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="1.8" aria-hidden="true">
      <path strokeLinecap="round" strokeLinejoin="round" d="M9 9h6v10H9z" />
      <path strokeLinecap="round" strokeLinejoin="round" d="M15 11h2a2 2 0 010 4h-2" />
      <line x1="9" y1="4" x2="9" y2="7" strokeLinecap="round" />
      <line x1="12" y1="3" x2="12" y2="7" strokeLinecap="round" />
      <line x1="15" y1="4" x2="15" y2="7" strokeLinecap="round" />
    </svg>,
    // Pillow
    <svg key="pillow" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="1.8" aria-hidden="true">
      <rect x="3" y="6" width="18" height="12" rx="6" />
      <path strokeLinecap="round" d="M3 12h18" />
    </svg>,
    // Gift
    <svg key="gift" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="1.8" aria-hidden="true">
      <path strokeLinecap="round" strokeLinejoin="round" d="M20 12v10H4V12" />
      <path strokeLinecap="round" strokeLinejoin="round" d="M22 7H2v5h20V7z" />
      <path strokeLinecap="round" strokeLinejoin="round" d="M12 22V7" />
      <path strokeLinecap="round" strokeLinejoin="round" d="M12 7H7.5a2.5 2.5 0 010-5C11 2 12 7 12 7z" />
      <path strokeLinecap="round" strokeLinejoin="round" d="M12 7h4.5a2.5 2.5 0 000-5C13 2 12 7 12 7z" />
    </svg>,
    // Event Print / Document
    <svg key="event" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="1.8" aria-hidden="true">
      <path strokeLinecap="round" strokeLinejoin="round" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
    </svg>,
  ];
  return icons[index] || icons[0];
}
