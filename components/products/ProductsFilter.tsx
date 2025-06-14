"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Product } from "@/types/product";

interface ProductsFilterProps {
  products: Product[];
  onFilterChange: (filteredProducts: Product[]) => void;
  className?: string;
}

export function ProductsFilter({
  products,
  onFilterChange,
  className = "",
}: ProductsFilterProps) {
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);

  // Get unique categories
  const categories = Array.from(new Set(products.map((p) => p.category)));

  const handleCategoryToggle = (category: string) => {
    const newSelectedCategories = selectedCategories.includes(category)
      ? selectedCategories.filter((c) => c !== category)
      : [...selectedCategories, category];

    setSelectedCategories(newSelectedCategories);

    // Filter products
    const filteredProducts =
      newSelectedCategories.length === 0
        ? products
        : products.filter((product) =>
            newSelectedCategories.includes(product.category)
          );

    onFilterChange(filteredProducts);
  };

  const clearFilters = () => {
    setSelectedCategories([]);
    onFilterChange(products);
  };

  return (
    <div className={`space-y-4 ${className}`}>
      <div className="flex flex-wrap gap-2">
        <span className="text-sm font-medium">Filter by category:</span>
        {categories.map((category) => (
          <Badge
            key={category}
            variant={
              selectedCategories.includes(category) ? "default" : "outline"
            }
            className="cursor-pointer border border-green-600 text-black hover:bg-green-100"
            onClick={() => handleCategoryToggle(category)}
          >
            {category}
          </Badge>
        ))}
      </div>

      {selectedCategories.length > 0 && (
        <div className="flex items-center gap-2">
          <span className="text-sm text-muted-foreground">
            {selectedCategories.length} filter
            {selectedCategories.length > 1 ? "s" : ""} applied
          </span>
          <Button variant="ghost" size="sm" onClick={clearFilters}>
            Clear all
          </Button>
        </div>
      )}
    </div>
  );
}
