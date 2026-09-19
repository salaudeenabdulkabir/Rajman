"use client";

import { useState } from "react";
import Link from "next/link";
import SectionHeading from "@/components/site/SectionHeading";
import { CONTACT, ROUTES } from "@/lib/constants";
import { buildGenericWhatsAppUrl } from "@/lib/utils";

export default function ContactPage() {
  const [formData, setFormData] = useState({ name: "", email: "", phone: "", message: "" });
  const [status, setStatus] = useState<"idle" | "sending" | "sent" | "error">("idle");

  function handleChange(e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setStatus("sending");
    // TODO: wire up to Supabase insert or API route
    await new Promise((r) => setTimeout(r, 1000)); // simulate
    setStatus("sent");
    setFormData({ name: "", email: "", phone: "", message: "" });
  }

  return (
    <div>
      {/* Page Header */}
      <section className="bg-[#171717] py-20 relative overflow-hidden">
        <div className="absolute inset-0 opacity-[0.05]" style={{ backgroundImage: "radial-gradient(circle at 1px 1px, white 1px, transparent 0)", backgroundSize: "32px 32px" }} aria-hidden="true" />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
          <nav className="flex items-center gap-2 text-xs text-white/40 mb-6" aria-label="Breadcrumb">
            <Link href={ROUTES.home} className="hover:text-white/70 transition-colors">Home</Link>
            <span>/</span>
            <span className="text-white/70 font-medium">Contact</span>
          </nav>
          <SectionHeading
            eyebrow="Get in Touch"
            title="Let's Create Something Meaningful"
            subtitle="Whether you want a custom frame, a personalized gift, or a special event print, we're ready to help."
            light
          />
        </div>
      </section>

      {/* Contact Content */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-16">
            {/* Contact Info */}
            <div>
              <h2 className="font-heading text-2xl font-bold text-[#171717] mb-8">Contact Information</h2>

              <div className="space-y-6">
                {[
                  {
                    icon: <PhoneIcon />,
                    label: "Phone",
                    value: CONTACT.phone,
                    href: `tel:${CONTACT.phone}`,
                  },
                  {
                    icon: <WhatsAppIcon />,
                    label: "WhatsApp",
                    value: CONTACT.whatsappDisplay,
                    href: buildGenericWhatsAppUrl(),
                    external: true,
                  },
                  {
                    icon: <MailIcon />,
                    label: "Email",
                    value: CONTACT.email,
                    href: `mailto:${CONTACT.email}`,
                  },
                  {
                    icon: <MapPinIcon />,
                    label: "Address",
                    value: CONTACT.address,
                  },
                  {
                    icon: <ClockIcon />,
                    label: "Opening Hours",
                    value: CONTACT.openingHours,
                  },
                ].map((item) => (
                  <div key={item.label} className="flex gap-4">
                    <div className="w-10 h-10 rounded-xl bg-[#EFE7DB] flex items-center justify-center shrink-0 text-[#C89B3C]">
                      {item.icon}
                    </div>
                    <div>
                      <p className="text-xs font-semibold text-[#6B6B6B] uppercase tracking-wide mb-1">{item.label}</p>
                      {item.href ? (
                        <a
                          href={item.href}
                          target={item.external ? "_blank" : undefined}
                          rel={item.external ? "noopener noreferrer" : undefined}
                          className="text-sm text-[#171717] hover:text-[#C89B3C] transition-colors font-medium"
                        >
                          {item.value}
                        </a>
                      ) : (
                        <p className="text-sm text-[#171717] font-medium">{item.value}</p>
                      )}
                    </div>
                  </div>
                ))}
              </div>

              {/* WhatsApp CTA block */}
              <div className="mt-10 p-6 rounded-2xl bg-[#F7F3ED] border border-[#E5DDD4]">
                <p className="font-heading text-lg font-semibold text-[#171717] mb-2">
                  Fastest Way to Order
                </p>
                <p className="text-sm text-[#6B6B6B] mb-4 leading-relaxed">
                  Send us a message on WhatsApp and we'll get back to you quickly with pricing and options.
                </p>
                <a
                  href={buildGenericWhatsAppUrl()}
                  target="_blank"
                  rel="noopener noreferrer"
                  id="contact-whatsapp-cta"
                  className="inline-flex items-center gap-2 px-6 py-2.5 rounded-full bg-[#25D366] text-white text-sm font-semibold hover:bg-[#20c45e] transition-colors duration-200"
                >
                  <WhatsAppIcon />
                  Open WhatsApp Chat
                </a>
              </div>

              {/* Map */}
              <div className="mt-10 rounded-2xl overflow-hidden border border-[#E5DDD4] h-64">
                <iframe
                  src={`https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d15864.851!2d3.1491!3d6.4747!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x103b8bdbba000001%3A0x6847cc9dbb7e6fa2!2sIba%2C%20Lagos!5e0!3m2!1sen!2sng!4v1000000000001`}
                  width="100%"
                  height="100%"
                  style={{ border: 0 }}
                  allowFullScreen
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  title="Rajman Graphics location map"
                />
              </div>
            </div>

            {/* Contact Form */}
            <div>
              <h2 className="font-heading text-2xl font-bold text-[#171717] mb-8">Send a Message</h2>

              {status === "sent" ? (
                <div className="p-8 rounded-2xl bg-[#F7F3ED] border border-[#E5DDD4] text-center">
                  <div className="w-16 h-16 rounded-full bg-[#C89B3C]/10 flex items-center justify-center mx-auto mb-4">
                    <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="#C89B3C" strokeWidth="2" aria-hidden="true">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  </div>
                  <h3 className="font-heading text-xl font-semibold text-[#171717] mb-2">Message Sent!</h3>
                  <p className="text-sm text-[#6B6B6B] mb-6">Thank you for reaching out. We'll get back to you soon.</p>
                  <button
                    onClick={() => setStatus("idle")}
                    className="text-sm font-medium text-[#C89B3C] hover:text-[#b08830] transition-colors"
                  >
                    Send another message
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-5" noValidate>
                  <div className="grid sm:grid-cols-2 gap-5">
                    <div>
                      <label htmlFor="name" className="block text-xs font-semibold text-[#171717] uppercase tracking-wide mb-2">
                        Full Name *
                      </label>
                      <input
                        id="name"
                        name="name"
                        type="text"
                        required
                        value={formData.name}
                        onChange={handleChange}
                        placeholder="Your name"
                        className="w-full px-4 py-3 rounded-xl border border-[#E5DDD4] bg-white text-sm text-[#171717] placeholder:text-[#9B9B9B] focus:outline-none focus:border-[#C89B3C] transition-colors duration-200"
                      />
                    </div>
                    <div>
                      <label htmlFor="email" className="block text-xs font-semibold text-[#171717] uppercase tracking-wide mb-2">
                        Email Address *
                      </label>
                      <input
                        id="email"
                        name="email"
                        type="email"
                        required
                        value={formData.email}
                        onChange={handleChange}
                        placeholder="your@email.com"
                        className="w-full px-4 py-3 rounded-xl border border-[#E5DDD4] bg-white text-sm text-[#171717] placeholder:text-[#9B9B9B] focus:outline-none focus:border-[#C89B3C] transition-colors duration-200"
                      />
                    </div>
                  </div>
                  <div>
                    <label htmlFor="phone" className="block text-xs font-semibold text-[#171717] uppercase tracking-wide mb-2">
                      Phone Number
                    </label>
                    <input
                      id="phone"
                      name="phone"
                      type="tel"
                      value={formData.phone}
                      onChange={handleChange}
                      placeholder="+234 xxx xxx xxxx"
                      className="w-full px-4 py-3 rounded-xl border border-[#E5DDD4] bg-white text-sm text-[#171717] placeholder:text-[#9B9B9B] focus:outline-none focus:border-[#C89B3C] transition-colors duration-200"
                    />
                  </div>
                  <div>
                    <label htmlFor="message" className="block text-xs font-semibold text-[#171717] uppercase tracking-wide mb-2">
                      Your Message *
                    </label>
                    <textarea
                      id="message"
                      name="message"
                      required
                      rows={6}
                      value={formData.message}
                      onChange={handleChange}
                      placeholder="Tell us about your project, occasion, or what you're looking for..."
                      className="w-full px-4 py-3 rounded-xl border border-[#E5DDD4] bg-white text-sm text-[#171717] placeholder:text-[#9B9B9B] focus:outline-none focus:border-[#C89B3C] transition-colors duration-200 resize-none"
                    />
                  </div>
                  <button
                    type="submit"
                    disabled={status === "sending"}
                    className="w-full py-3.5 rounded-full bg-[#171717] text-white font-semibold text-sm hover:bg-[#2a2a2a] disabled:opacity-60 disabled:cursor-not-allowed transition-colors duration-200"
                  >
                    {status === "sending" ? "Sending..." : "Send Message"}
                  </button>
                  <p className="text-xs text-[#9B9B9B] text-center">
                    For the fastest response, use{" "}
                    <a href={buildGenericWhatsAppUrl()} target="_blank" rel="noopener noreferrer" className="text-[#C89B3C] font-medium hover:underline">
                      WhatsApp
                    </a>.
                  </p>
                </form>
              )}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

// ── Icons ──────────────────────────────────────────────

function PhoneIcon() {
  return <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" aria-hidden="true"><path strokeLinecap="round" strokeLinejoin="round" d="M2.25 6.75c0 8.284 6.716 15 15 15h2.25a2.25 2.25 0 002.25-2.25v-1.372c0-.516-.351-.966-.852-1.091l-4.423-1.106c-.44-.11-.902.055-1.173.417l-.97 1.293c-.282.376-.769.542-1.21.38a12.035 12.035 0 01-7.143-7.143c-.162-.441.004-.928.38-1.21l1.293-.97c.363-.271.527-.734.417-1.173L6.963 3.102a1.125 1.125 0 00-1.091-.852H4.5A2.25 2.25 0 002.25 4.5v2.25z" /></svg>;
}

function WhatsAppIcon() {
  return <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" /></svg>;
}

function MailIcon() {
  return <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" aria-hidden="true"><path strokeLinecap="round" strokeLinejoin="round" d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75" /></svg>;
}

function MapPinIcon() {
  return <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" aria-hidden="true"><path strokeLinecap="round" strokeLinejoin="round" d="M15 10.5a3 3 0 11-6 0 3 3 0 016 0z" /><path strokeLinecap="round" strokeLinejoin="round" d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1115 0z" /></svg>;
}

function ClockIcon() {
  return <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" aria-hidden="true"><path strokeLinecap="round" strokeLinejoin="round" d="M12 6v6h4.5m4.5 0a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>;
}
