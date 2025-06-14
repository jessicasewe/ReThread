"use client";

import { Product } from "@/types/product";
import { ProductCard } from "./ProductCard";

interface ProductGridProps {
  products: Product[];
  columns?: {
    default?: number;
    md?: number;
    lg?: number;
    xl?: number;
  };
  gap?: number;
  onProductClick?: (product: Product) => void;
}

export function ProductGrid({
  products,
  columns = { default: 1, md: 2, lg: 3 },
  gap = 8,
  onProductClick,
}: ProductGridProps) {
  if (products.length === 0) {
    return (
      <div className="text-center py-12">
        <p className="text-muted-foreground">No products found.</p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      {products.map((product) => (
        <ProductCard
          key={product.id}
          product={product}
          onCardClick={onProductClick}
        />
      ))}
    </div>
  );
}
