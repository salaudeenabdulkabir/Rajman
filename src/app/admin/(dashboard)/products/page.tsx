import Link from "next/link";
import AdminTopbar from "@/components/admin/AdminTopbar";
import { fetchProducts, fetchCategories } from "@/lib/data";

export const dynamic = "force-dynamic";

export default async function AdminProductsPage() {
  const [products, categories] = await Promise.all([
    fetchProducts(),
    fetchCategories(),
  ]);

  return (
    <div>
      <AdminTopbar
        title="Products"
        description="Manage your product catalog. Add, edit, feature, or archive products."
        action={
          <Link
            href="/admin/products/new"
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-[#C89B3C] text-white text-sm font-semibold hover:bg-[#b08830] transition-colors duration-200"
          >
            + Add Product
          </Link>
        }
      />

      {products.length > 0 ? (
        <div className="bg-white rounded-2xl border border-[#E5DDD4] overflow-hidden">
          <table className="w-full text-sm">
            <thead className="bg-[#F7F3ED] border-b border-[#E5DDD4]">
              <tr>
                <th className="text-left px-6 py-3 text-xs font-semibold text-[#6B6B6B] uppercase tracking-wide">Product</th>
                <th className="text-left px-6 py-3 text-xs font-semibold text-[#6B6B6B] uppercase tracking-wide">Category</th>
                <th className="text-left px-6 py-3 text-xs font-semibold text-[#6B6B6B] uppercase tracking-wide">Price</th>
                <th className="text-left px-6 py-3 text-xs font-semibold text-[#6B6B6B] uppercase tracking-wide">Status</th>
                <th className="text-right px-6 py-3 text-xs font-semibold text-[#6B6B6B] uppercase tracking-wide">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#E5DDD4]">
              {products.map((product) => {
                const category = product.category || categories.find((c) => c.id === product.category_id);
                return (
                  <tr key={product.id} className="hover:bg-[#F7F3ED] transition-colors duration-150">
                    <td className="px-6 py-4">
                      <div>
                        <p className="font-medium text-[#171717]">{product.name}</p>
                        {product.is_featured && (
                          <span className="text-xs text-[#C89B3C] font-medium">★ Featured</span>
                        )}
                      </div>
                    </td>
                    <td className="px-6 py-4 text-[#6B6B6B]">{category?.name || "—"}</td>
                    <td className="px-6 py-4 text-[#6B6B6B]">{product.price_label || "Contact for price"}</td>
                    <td className="px-6 py-4">
                      <span
                        className={`inline-block px-2.5 py-1 rounded-full text-xs font-medium ${
                          product.is_archived
                            ? "bg-[#EFE7DB] text-[#6B6B6B]"
                            : product.is_available
                            ? "bg-green-50 text-green-700"
                            : "bg-red-50 text-red-600"
                        }`}
                      >
                        {product.is_archived ? "Archived" : product.is_available ? "Available" : "Unavailable"}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-right">
                      <div className="flex items-center justify-end gap-2">
                        <Link
                          href={`/admin/products/${product.id}/edit`}
                          className="text-xs font-medium text-[#C89B3C] hover:text-[#b08830] transition-colors"
                        >
                          Edit
                        </Link>
                        <button className="text-xs font-medium text-red-500 hover:text-red-700 transition-colors">
                          Delete
                        </button>
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      ) : (
        <div className="bg-white rounded-2xl border border-dashed border-[#E5DDD4] p-16 text-center">
          <div className="w-16 h-16 rounded-full bg-[#EFE7DB] flex items-center justify-center mx-auto mb-4">
            <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="#C89B3C" strokeWidth="1.5" aria-hidden="true">
              <path strokeLinecap="round" strokeLinejoin="round" d="M20.25 7.5l-.625 10.632a2.25 2.25 0 01-2.247 2.118H6.622a2.25 2.25 0 01-2.247-2.118L3.75 7.5M10 11.25h4M3.375 7.5h17.25c.621 0 1.125-.504 1.125-1.125v-1.5c0-.621-.504-1.125-1.125-1.125H3.375c-.621 0-1.125.504-1.125 1.125v1.5c0 .621.504 1.125 1.125 1.125z" />
            </svg>
          </div>
          <h3 className="font-heading text-lg font-semibold text-[#171717] mb-2">No Products Yet</h3>
          <p className="text-sm text-[#6B6B6B] mb-6 max-w-xs mx-auto">
            Add your first product to start building your catalog. Products will appear on the public site.
          </p>
          <Link
            href="/admin/products/new"
            className="inline-flex items-center gap-2 px-6 py-2.5 rounded-full bg-[#C89B3C] text-white text-sm font-semibold hover:bg-[#b08830] transition-colors duration-200"
          >
            + Add Your First Product
          </Link>
        </div>
      )}
    </div>
  );
}
