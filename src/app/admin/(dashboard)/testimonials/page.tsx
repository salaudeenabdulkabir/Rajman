import AdminTopbar from "@/components/admin/AdminTopbar";
import { mockTestimonials } from "@/lib/data";
import { renderStars } from "@/lib/utils";

export default function AdminTestimonialsPage() {
  return (
    <div>
      <AdminTopbar
        title="Testimonials"
        description="Manage customer reviews and testimonials displayed on the public site."
        action={
          <button className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-[#C89B3C] text-white text-sm font-semibold hover:bg-[#b08830] transition-colors duration-200">
            + Add Testimonial
          </button>
        }
      />

      {mockTestimonials.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {mockTestimonials.map((t) => (
            <div key={t.id} className="bg-white rounded-2xl border border-[#E5DDD4] p-6">
              <div className="flex items-center justify-between mb-3">
                <span className="text-[#C89B3C]">{renderStars(t.rating)}</span>
                <span className={`text-xs px-2 py-0.5 rounded-full ${t.is_published ? "bg-green-50 text-green-700" : "bg-[#EFE7DB] text-[#6B6B6B]"}`}>
                  {t.is_published ? "Published" : "Hidden"}
                </span>
              </div>
              <p className="text-sm text-[#6B6B6B] italic leading-relaxed mb-4">&ldquo;{t.text}&rdquo;</p>
              <div className="flex items-center justify-between">
                <p className="text-sm font-semibold text-[#171717]">{t.customer_name}</p>
                <div className="flex gap-2">
                  <button className="text-xs text-[#C89B3C] hover:text-[#b08830] font-medium transition-colors">Edit</button>
                  <button className="text-xs text-red-500 hover:text-red-700 font-medium transition-colors">Delete</button>
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="bg-white rounded-2xl border border-dashed border-[#E5DDD4] p-16 text-center">
          <div className="w-16 h-16 rounded-full bg-[#EFE7DB] flex items-center justify-center mx-auto mb-4">
            <span className="text-3xl">★</span>
          </div>
          <h3 className="font-heading text-lg font-semibold text-[#171717] mb-2">No Testimonials Yet</h3>
          <p className="text-sm text-[#6B6B6B] max-w-xs mx-auto mb-6">
            Add customer reviews and testimonials. Published ones will appear on the homepage.
          </p>
          <button className="inline-flex items-center gap-2 px-6 py-2.5 rounded-full bg-[#C89B3C] text-white text-sm font-semibold hover:bg-[#b08830] transition-colors duration-200">
            + Add First Testimonial
          </button>
        </div>
      )}
    </div>
  );
}
