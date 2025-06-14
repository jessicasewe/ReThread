import { products } from "@/data/products";
import { ProductsPage } from "@/components/products/ProductsPage";

export default function Products() {
  return <ProductsPage initialProducts={products} />;
}
