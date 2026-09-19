import Link from "next/link";
import AdminTopbar from "@/components/admin/AdminTopbar";
import { mockProducts, mockCategories, mockTestimonials, mockGalleryItems } from "@/lib/data";
import { ROUTES } from "@/lib/constants";

export default function AdminOverviewPage() {
  const stats = [
    {
      label: "Total Products",
      value: mockProducts.length,
      icon: <ProductsIcon />,
      href: ROUTES.adminProducts,
      color: "bg-[#C89B3C]",
    },
    {
      label: "Featured Products",
      value: mockProducts.filter((p) => p.is_featured).length,
      icon: <StarIcon />,
      href: ROUTES.adminProducts,
      color: "bg-[#171717]",
    },
    {
      label: "Categories",
      value: mockCategories.length,
      icon: <CategoryIcon />,
      href: ROUTES.adminCategories,
      color: "bg-[#6B6B6B]",
    },
    {
      label: "Testimonials",
      value: mockTestimonials.length,
      icon: <TestimonialIcon />,
      href: ROUTES.adminTestimonials,
      color: "bg-[#EFE7DB]",
      dark: false,
    },
    {
      label: "Gallery Items",
      value: mockGalleryItems.length,
      icon: <GalleryIcon />,
      href: ROUTES.adminGallery,
      color: "bg-[#EFE7DB]",
    },
    {
      label: "Unread Messages",
      value: 0,
      icon: <MessagesIcon />,
      href: ROUTES.adminMessages,
      color: "bg-[#EFE7DB]",
    },
  ];

  const quickActions = [
    { label: "Add a Product", href: `${ROUTES.adminProducts}/new`, icon: "+" },
    { label: "Upload Gallery", href: ROUTES.adminGallery, icon: "↑" },
    { label: "Edit Hero Text", href: ROUTES.adminContent, icon: "✎" },
    { label: "Add Testimonial", href: ROUTES.adminTestimonials, icon: "★" },
  ];

  return (
    <div>
      <AdminTopbar
        title="Dashboard Overview"
        description="Welcome to the Rajman admin panel. Manage your products, gallery, and content here."
      />

      {/* Stats Grid */}
      <div className="grid grid-cols-2 lg:grid-cols-3 gap-4 mb-10">
        {stats.map((stat) => (
          <Link
            key={stat.label}
            href={stat.href}
            className="group bg-white rounded-2xl border border-[#E5DDD4] p-6 hover:border-[#C89B3C] hover:shadow-md transition-all duration-200"
          >
            <div className={`w-10 h-10 rounded-xl ${stat.color} flex items-center justify-center mb-4 text-white`}>
              {stat.icon}
            </div>
            <p className="text-3xl font-bold text-[#171717] font-heading">{stat.value}</p>
            <p className="text-sm text-[#6B6B6B] mt-1">{stat.label}</p>
          </Link>
        ))}
      </div>

      {/* Quick Actions */}
      <div className="bg-white rounded-2xl border border-[#E5DDD4] p-6 mb-8">
        <h2 className="font-heading text-base font-semibold text-[#171717] mb-5">Quick Actions</h2>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
          {quickActions.map((action) => (
            <Link
              key={action.label}
              href={action.href}
              className="flex flex-col items-center gap-2 p-4 rounded-xl bg-[#F7F3ED] border border-[#E5DDD4] hover:border-[#C89B3C] hover:bg-[#EFE7DB] transition-all duration-200 text-center"
            >
              <span className="text-xl text-[#C89B3C] font-bold">{action.icon}</span>
              <span className="text-xs font-medium text-[#171717]">{action.label}</span>
            </Link>
          ))}
        </div>
      </div>

      {/* Setup Checklist */}
      <div className="bg-[#171717] rounded-2xl p-6 text-white">
        <h2 className="font-heading text-base font-semibold text-white mb-5">Content Checklist</h2>
        <ul className="space-y-3">
          {[
            { done: true, label: "Brand identity and logo configured" },
            { done: true, label: "Categories created" },
            { done: false, label: "Products added — go to Products → Add Product" },
            { done: false, label: "Gallery images uploaded" },
            { done: false, label: "Testimonials added" },
            { done: false, label: "Social links configured" },
            { done: false, label: "Supabase database connected" },
          ].map((item) => (
            <li key={item.label} className="flex items-center gap-3">
              <div
                className={`w-5 h-5 rounded-full flex items-center justify-center shrink-0 ${
                  item.done ? "bg-[#C89B3C]" : "bg-white/10"
                }`}
              >
                {item.done && (
                  <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="3" aria-hidden="true">
                    <polyline points="20 6 9 17 4 12" />
                  </svg>
                )}
              </div>
              <span className={`text-sm ${item.done ? "text-white/70 line-through" : "text-white/90"}`}>
                {item.label}
              </span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

// ── Icons ──────────────────────────────────────────────

function ProductsIcon() {
  return <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true"><path strokeLinecap="round" strokeLinejoin="round" d="M20.25 7.5l-.625 10.632a2.25 2.25 0 01-2.247 2.118H6.622a2.25 2.25 0 01-2.247-2.118L3.75 7.5M10 11.25h4M3.375 7.5h17.25c.621 0 1.125-.504 1.125-1.125v-1.5c0-.621-.504-1.125-1.125-1.125H3.375c-.621 0-1.125.504-1.125 1.125v1.5c0 .621.504 1.125 1.125 1.125z" /></svg>;
}
function StarIcon() {
  return <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" /></svg>;
}
function CategoryIcon() {
  return <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true"><path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6A2.25 2.25 0 016 3.75h2.25A2.25 2.25 0 0110.5 6v2.25a2.25 2.25 0 01-2.25 2.25H6a2.25 2.25 0 01-2.25-2.25V6zM3.75 15.75A2.25 2.25 0 016 13.5h2.25a2.25 2.25 0 012.25 2.25V18a2.25 2.25 0 01-2.25 2.25H6A2.25 2.25 0 013.75 18v-2.25zM13.5 6a2.25 2.25 0 012.25-2.25H18A2.25 2.25 0 0120.25 6v2.25A2.25 2.25 0 0118 10.5h-2.25a2.25 2.25 0 01-2.25-2.25V6z" /></svg>;
}
function TestimonialIcon() {
  return <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#6B6B6B" strokeWidth="2" aria-hidden="true"><path strokeLinecap="round" strokeLinejoin="round" d="M7.5 8.25h9m-9 3H12m-9.75 1.51c0 1.6 1.123 2.994 2.707 3.227 1.129.166 2.27.293 3.423.379.35.026.67.21.865.501L12 21l2.755-4.133a1.14 1.14 0 01.865-.501 48.172 48.172 0 003.423-.379c1.584-.233 2.707-1.626 2.707-3.228V6.741c0-1.602-1.123-2.995-2.707-3.228A48.394 48.394 0 0012 3c-2.392 0-4.744.175-7.043.513C3.373 3.746 2.25 5.14 2.25 6.741v6.018z" /></svg>;
}
function GalleryIcon() {
  return <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#6B6B6B" strokeWidth="2" aria-hidden="true"><path strokeLinecap="round" strokeLinejoin="round" d="M2.25 15.75l5.159-5.159a2.25 2.25 0 013.182 0l5.159 5.159m-1.5-1.5l1.409-1.409a2.25 2.25 0 013.182 0l2.909 2.909m-18 3.75h16.5a1.5 1.5 0 001.5-1.5V6a1.5 1.5 0 00-1.5-1.5H3.75A1.5 1.5 0 002.25 6v12a1.5 1.5 0 001.5 1.5z" /></svg>;
}
function MessagesIcon() {
  return <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#6B6B6B" strokeWidth="2" aria-hidden="true"><path strokeLinecap="round" strokeLinejoin="round" d="M2.25 12.76c0 1.6 1.123 2.994 2.707 3.227 1.068.157 2.148.279 3.238.364.466.037.893.281 1.153.671L12 21l2.652-3.978c.26-.39.687-.634 1.153-.67 1.09-.086 2.17-.208 3.238-.365 1.584-.233 2.707-1.626 2.707-3.228V6.741c0-1.602-1.123-2.995-2.707-3.228A48.394 48.394 0 0012 3c-2.392 0-4.744.175-7.043.513C3.373 3.746 2.25 5.14 2.25 6.741v6.019z" /></svg>;
}
