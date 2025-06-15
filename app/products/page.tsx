// app/products/page.tsx
import { fetchDrupalProducts } from "@/lib/drupal-api";
import { ProductsPage } from "@/components/products/ProductsPage";

// This is a server component that fetches data at build time or request time
export default async function Products() {
  console.log("🏗️ Products page: Starting data fetch...");

  // Fetch products from Drupal
  const drupalProducts = await fetchDrupalProducts();

  // Fallback data in case Drupal is not available
  const fallbackProducts = [
    {
      id: "1",
      title: "Sample Product",
      description: "This is a fallback product when Drupal is not available",
      price: "$19.99",
      category: "Sample",
      image: "/placeholder.svg",
      slug: "/product/sample",
    },
  ];

  // Use Drupal products if available, otherwise use fallback
  const products =
    drupalProducts.length > 0 ? drupalProducts : fallbackProducts;

  console.log("📋 Products page: Using", products.length, "products");

  return (
    <ProductsPage
      initialProducts={products}
      title="Our Products"
      description="Explore our sustainable fashion products and initiatives"
    />
  );
}
