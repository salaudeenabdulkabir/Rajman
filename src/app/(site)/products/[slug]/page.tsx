import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { fetchProductBySlug, fetchProducts } from "@/lib/data";
import { buildProductWhatsAppUrl, buildGenericWhatsAppUrl } from "@/lib/utils";
import { ROUTES } from "@/lib/constants";

interface Props {
  params: Promise<{ slug: string }>;
}

export const dynamic = "force-dynamic";

export default async function ProductDetailPage({ params }: Props) {
  const { slug } = await params;
  const product = await fetchProductBySlug(slug);

  if (!product || product.is_archived) notFound();

  const allProducts = await fetchProducts();
  const relatedProducts = allProducts
    .filter((p) => p.category_id === product.category_id && p.id !== product.id && !p.is_archived)
    .slice(0, 3);

  return (
    <div>
      {/* Breadcrumb */}
      <div className="bg-[#F7F3ED] border-b border-[#E5DDD4] py-4">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <nav className="flex items-center gap-2 text-xs text-[#6B6B6B]" aria-label="Breadcrumb">
            <Link href={ROUTES.home} className="hover:text-[#C89B3C] transition-colors">Home</Link>
            <span>/</span>
            <Link href={ROUTES.products} className="hover:text-[#C89B3C] transition-colors">Products</Link>
            <span>/</span>
            <span className="text-[#171717] font-medium">{product.name}</span>
          </nav>
        </div>
      </div>

      {/* Product Detail */}
      <section className="py-12 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-start">
            {/* Images */}
            <div className="space-y-4">
              <div className="aspect-square rounded-2xl overflow-hidden bg-[#EFE7DB] relative">
                {product.images[0] ? (
                  <Image
                    src={product.images[0].url}
                    alt={product.images[0].alt_text || product.name}
                    fill
                    className="object-cover"
                    priority
                    sizes="(max-width: 1024px) 100vw, 50vw"
                  />
                ) : (
                  <div className="absolute inset-0 flex items-center justify-center">
                    <svg width="64" height="64" viewBox="0 0 24 24" fill="none" stroke="#C89B3C" strokeWidth="1" opacity="0.3" aria-hidden="true">
                      <rect x="3" y="3" width="18" height="18" rx="2" />
                      <circle cx="8.5" cy="8.5" r="1.5" />
                      <polyline points="21 15 16 10 5 21" />
                    </svg>
                  </div>
                )}
              </div>
              {/* Thumbnail strip */}
              {product.images.length > 1 && (
                <div className="flex gap-3">
                  {product.images.slice(0, 4).map((img, i) => (
                    <div key={img.id} className="relative w-20 h-20 rounded-xl overflow-hidden border border-[#E5DDD4]">
                      <Image src={img.url} alt={img.alt_text || `Image ${i + 1}`} fill className="object-cover" sizes="80px" />
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Info */}
            <div>
              {product.category && (
                <p className="text-xs font-semibold uppercase tracking-widest text-[#C89B3C] mb-3">
                  {product.category.name}
                </p>
              )}
              <h1 className="font-heading text-3xl sm:text-4xl font-bold text-[#171717] mb-4">
                {product.name}
              </h1>
              {product.short_description && (
                <p className="text-base text-[#6B6B6B] leading-relaxed mb-6">
                  {product.short_description}
                </p>
              )}
              <div className="py-4 border-t border-b border-[#EFE7DB] mb-6">
                <p className="text-2xl font-bold text-[#171717]">
                  {product.price_label || "Contact for price"}
                </p>
                {!product.is_available && (
                  <span className="inline-block mt-2 px-3 py-1 rounded-full bg-[#EFE7DB] text-xs font-medium text-[#6B6B6B]">
                    Currently Unavailable
                  </span>
                )}
              </div>

              {product.full_description && (
                <div className="mb-8">
                  <h2 className="font-semibold text-[#171717] mb-3 text-sm">About This Product</h2>
                  <p className="text-sm text-[#6B6B6B] leading-relaxed">{product.full_description}</p>
                </div>
              )}

              {product.tags.length > 0 && (
                <div className="flex flex-wrap gap-2 mb-8">
                  {product.tags.map((tag) => (
                    <span key={tag} className="px-3 py-1 rounded-full bg-[#F7F3ED] border border-[#E5DDD4] text-xs text-[#6B6B6B]">
                      {tag}
                    </span>
                  ))}
                </div>
              )}

              <div className="flex flex-col sm:flex-row gap-3">
                <a
                  href={buildProductWhatsAppUrl(product.name)}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex-1 inline-flex items-center justify-center gap-2 py-3.5 rounded-full bg-[#C89B3C] text-white font-semibold text-sm hover:bg-[#b08830] transition-colors duration-200 shadow-sm"
                >
                  <WhatsAppIcon />
                  Order on WhatsApp
                </a>
                <a
                  href={buildGenericWhatsAppUrl()}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex-1 inline-flex items-center justify-center gap-2 py-3.5 rounded-full border-2 border-[#171717] text-[#171717] font-semibold text-sm hover:bg-[#171717] hover:text-white transition-all duration-200"
                >
                  Ask a Question
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Related Products */}
      {relatedProducts.length > 0 && (
        <section className="py-16 bg-[#F7F3ED]">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="font-heading text-2xl font-semibold text-[#171717] mb-8">You Might Also Like</h2>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
              {relatedProducts.map((p) => (
                <Link key={p.id} href={`${ROUTES.products}/${p.slug}`} className="group bg-white rounded-2xl overflow-hidden border border-[#E5DDD4] hover:border-[#C89B3C] hover:shadow-md transition-all duration-300 p-5">
                  <p className="font-heading text-base font-semibold text-[#171717]">{p.name}</p>
                  <p className="text-xs text-[#C89B3C] mt-1">{p.price_label || "Contact for price"}</p>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}
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
