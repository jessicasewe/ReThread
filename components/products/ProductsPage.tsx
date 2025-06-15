"use client";

import { Product } from "@/types/product";
import { useProducts } from "@/hooks/use-products";
import { ProductsHeader } from "./ProductsHeader";
import { ProductsFilter } from "./ProductsFilter";
import { ProductGrid } from "./ProductGrid";

interface ProductsPageProps {
  initialProducts: Product[];
  title?: string;
  description?: string;
  showFilters?: boolean;
}

export function ProductsPage({
  initialProducts,
  title,
  description,
  showFilters = true,
}: ProductsPageProps) {
  const { products, setFilteredProducts } = useProducts(initialProducts);

  const handleProductClick = (product: Product) => {
    console.log("Product clicked:", product);
  };

  return (
    <div className="container mx-auto px-6 py-12">
      <div className="flex flex-col gap-8">
        <ProductsHeader title={title} description={description} />

        {showFilters && (
          <ProductsFilter
            products={initialProducts}
            onFilterChange={setFilteredProducts}
          />
        )}

        <ProductGrid products={products} onProductClick={handleProductClick} />
      </div>
    </div>
  );
}
