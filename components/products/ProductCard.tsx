"use client";

import {
  Card,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { Product } from "@/types/product";
import { ProductImage } from "./ProductImage";

interface ProductCardProps {
  product: Product;
  showPrice?: boolean;
  showViewDetails?: boolean;
  onCardClick?: (product: Product) => void;
}

export function ProductCard({
  product,
  showPrice = true,
  showViewDetails = true,
  onCardClick,
}: ProductCardProps) {
  const handleCardClick = () => {
    if (onCardClick) {
      onCardClick(product);
    }
  };

  return (
    <Card
      className="overflow-hidden shadow-sm hover:shadow-md transition-shadow duration-200 cursor-pointer"
      onClick={handleCardClick}
    >
      <ProductImage src={product.image} alt={product.title} />

      <CardHeader>
        <div className="flex justify-between items-start gap-2">
          <CardTitle className="line-clamp-2">{product.title}</CardTitle>
          <Badge variant="secondary">{product.category}</Badge>
        </div>
        <CardDescription className="line-clamp-3">
          {product.description}
        </CardDescription>
      </CardHeader>

      {(showPrice || showViewDetails) && (
        <CardFooter className="flex justify-between items-center">
          {showPrice && <p className="font-medium text-lg">{product.price}</p>}
          {showViewDetails && (
            <Button
              size="sm"
              className="border border-green-600 text-black hover:bg-green-100"
              onClick={(e) => {
                e.stopPropagation();
                onCardClick?.(product);
              }}
            >
              View Details
            </Button>
          )}
        </CardFooter>
      )}
    </Card>
  );
}
