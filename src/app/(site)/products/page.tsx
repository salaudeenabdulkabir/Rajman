import type { Metadata } from "next";
import { fetchProducts, fetchCategories } from "@/lib/data";
import ProductListClient from "@/components/site/ProductListClient";

export const metadata: Metadata = {
  title: "Products | Rajman Graphics Design and Print",
  description: "Browse our full collection of personalized photo frames, custom mugs, throw pillows, and event prints.",
};

export const dynamic = "force-dynamic";

export default async function ProductsPage() {
  const [products, categories] = await Promise.all([
    fetchProducts(),
    fetchCategories(),
  ]);

  return <ProductListClient initialProducts={products} initialCategories={categories} />;
}
