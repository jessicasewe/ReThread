"use client";

import { useState } from "react";
import { Product } from "@/types/product";
import { useProducts } from "@/hooks/use-products";
import { ProductsHeader } from "./ProductsHeader";
import { ProductsFilter } from "./ProductsFilter";
import { ProductGrid } from "./ProductGrid";
import { ProductModal } from "./ProductModal";

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
  
  // Modal state management
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleProductClick = (product: Product) => {
    console.log("Product clicked:", product);
    setSelectedProduct(product);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedProduct(null);
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

      {/* Product Modal */}
      <ProductModal
        product={selectedProduct}
        open={isModalOpen}
        onClose={handleCloseModal}
      />
    </div>
  );
}