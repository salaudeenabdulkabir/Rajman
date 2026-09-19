import AdminTopbar from "@/components/admin/AdminTopbar";
import { mockGalleryItems } from "@/lib/data";

export default function AdminGalleryPage() {
  return (
    <div>
      <AdminTopbar
        title="Gallery"
        description="Upload and manage your gallery of finished work. Published items appear on the public gallery page."
        action={
          <button className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-[#C89B3C] text-white text-sm font-semibold hover:bg-[#b08830] transition-colors duration-200">
            ↑ Upload Images
          </button>
        }
      />

      {mockGalleryItems.length > 0 ? (
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {mockGalleryItems.map((item) => (
            <div key={item.id} className="group relative bg-[#EFE7DB] rounded-2xl overflow-hidden aspect-square border border-[#E5DDD4] hover:border-[#C89B3C] transition-colors duration-200">
              <div className="absolute inset-0 bg-[#171717]/0 group-hover:bg-[#171717]/40 transition-all duration-300 flex items-end p-3 gap-2">
                <div className="translate-y-4 group-hover:translate-y-0 opacity-0 group-hover:opacity-100 transition-all duration-300 flex gap-2">
                  <button className="px-2.5 py-1 rounded-lg bg-white text-xs font-semibold text-[#171717]">Edit</button>
                  <button className="px-2.5 py-1 rounded-lg bg-red-500 text-xs font-semibold text-white">Delete</button>
                </div>
              </div>
              {!item.is_published && (
                <span className="absolute top-2 right-2 px-2 py-0.5 rounded-full bg-[#171717]/70 text-white text-[10px]">Hidden</span>
              )}
            </div>
          ))}

          {/* Upload tile */}
          <button className="aspect-square rounded-2xl border border-dashed border-[#E5DDD4] flex flex-col items-center justify-center gap-2 hover:border-[#C89B3C] transition-colors duration-200 bg-[#F7F3ED]">
            <span className="text-3xl text-[#C89B3C]">+</span>
            <span className="text-xs font-medium text-[#6B6B6B]">Upload</span>
          </button>
        </div>
      ) : (
        <div className="bg-white rounded-2xl border border-dashed border-[#E5DDD4] p-16 text-center">
          <div className="w-16 h-16 rounded-full bg-[#EFE7DB] flex items-center justify-center mx-auto mb-4">
            <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="#C89B3C" strokeWidth="1.5" aria-hidden="true">
              <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 15.75l5.159-5.159a2.25 2.25 0 013.182 0l5.159 5.159m-1.5-1.5l1.409-1.409a2.25 2.25 0 013.182 0l2.909 2.909m-18 3.75h16.5a1.5 1.5 0 001.5-1.5V6a1.5 1.5 0 00-1.5-1.5H3.75A1.5 1.5 0 002.25 6v12a1.5 1.5 0 001.5 1.5zm10.5-11.25h.008v.008h-.008V8.25zm.375 0a.375.375 0 11-.75 0 .375.375 0 01.75 0z" />
            </svg>
          </div>
          <h3 className="font-heading text-lg font-semibold text-[#171717] mb-2">No Gallery Items Yet</h3>
          <p className="text-sm text-[#6B6B6B] max-w-xs mx-auto mb-6">
            Upload your finished work here. Connect Supabase Storage first to enable image uploads.
          </p>
          <div className="p-4 rounded-xl bg-[#EFE7DB] inline-block text-xs text-[#6B6B6B]">
            <strong className="text-[#C89B3C]">Setup needed:</strong> Connect Supabase Storage to enable uploads.
          </div>
        </div>
      )}
    </div>
  );
}
