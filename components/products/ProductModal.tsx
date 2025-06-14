"use client";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Product } from "@/types/product";
import { ProductImage } from "./ProductImage";

interface ProductModalProps {
  product: Product | null;
  open: boolean;
  onClose: () => void;
}

export function ProductModal({ product, open, onClose }: ProductModalProps) {
  if (!product) return null;

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl bg-white">
        <DialogHeader>
          <DialogTitle>{product.title}</DialogTitle>
        </DialogHeader>
        <div className="flex flex-col gap-4">
          <ProductImage src={product.image} alt={product.title} />
          <p className="text-muted-foreground text-green-800">
            {product.category}
          </p>
          <p>{product.description}</p>
          <p className="font-semibold text-xl text-green-800">
            {product.price}
          </p>
        </div>
      </DialogContent>
    </Dialog>
  );
}
