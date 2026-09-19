import AdminTopbar from "@/components/admin/AdminTopbar";
import { mockCategories } from "@/lib/data";

export default function AdminCategoriesPage() {
  return (
    <div>
      <AdminTopbar
        title="Categories"
        description="Manage product categories. These appear as filters on the products page."
        action={
          <button className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-[#C89B3C] text-white text-sm font-semibold hover:bg-[#b08830] transition-colors duration-200">
            + Add Category
          </button>
        }
      />

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {mockCategories.map((cat) => (
          <div key={cat.id} className="bg-white rounded-2xl border border-[#E5DDD4] p-6 hover:border-[#C89B3C] transition-colors duration-200">
            <div className="flex items-start justify-between gap-3">
              <div>
                <h3 className="font-heading text-base font-semibold text-[#171717]">{cat.name}</h3>
                <p className="text-xs text-[#9B9B9B] mt-1">/products?category={cat.slug}</p>
              </div>
              <div className="flex gap-2 shrink-0">
                <button className="text-xs font-medium text-[#C89B3C] hover:text-[#b08830] transition-colors">Edit</button>
                <button className="text-xs font-medium text-red-500 hover:text-red-700 transition-colors">Delete</button>
              </div>
            </div>
            {cat.description && (
              <p className="text-sm text-[#6B6B6B] mt-3 leading-relaxed">{cat.description}</p>
            )}
          </div>
        ))}

        {/* Add new card */}
        <button className="bg-[#F7F3ED] rounded-2xl border border-dashed border-[#E5DDD4] p-6 hover:border-[#C89B3C] transition-colors duration-200 flex flex-col items-center justify-center gap-2 text-center min-h-[120px]">
          <span className="text-2xl text-[#C89B3C]">+</span>
          <span className="text-sm font-medium text-[#6B6B6B]">Add Category</span>
        </button>
      </div>
    </div>
  );
}
