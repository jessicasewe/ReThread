"use client";

import { useState, useMemo } from "react";
import { Product } from "@/types/product";

export function useProducts(initialProducts: Product[]) {
  const [filteredProducts, setFilteredProducts] =
    useState<Product[]>(initialProducts);
  const [searchQuery, setSearchQuery] = useState("");

  const searchedProducts = useMemo(() => {
    if (!searchQuery) return filteredProducts;

    return filteredProducts.filter(
      (product) =>
        product.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        product.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
        product.category.toLowerCase().includes(searchQuery.toLowerCase())
    );
  }, [filteredProducts, searchQuery]);

  return {
    products: searchedProducts,
    filteredProducts,
    setFilteredProducts,
    searchQuery,
    setSearchQuery,
  };
}
