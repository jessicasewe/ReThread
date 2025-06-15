import { Product } from "@/types/product";
import { DrupalProduct } from "./drupal-api";

export function transformDrupalProduct(
  drupalProduct: DrupalProduct,
  included: any[] = []
): Product {
  // Find category name from included data
  const categoryData = included.find(
    (item) =>
      item.type === "taxonomy_term--product_categories" &&
      item.id === drupalProduct.relationships.field_category.data?.id
  );

  // Find image URL from included data
  const imageData = included.find(
    (item) =>
      item.type === "file--file" &&
      item.id === drupalProduct.relationships.field_product_image.data?.id
  );

  return {
    id: drupalProduct.id,
    title: drupalProduct.attributes.title,
    description:
      drupalProduct.attributes.field_description.processed ||
      drupalProduct.attributes.field_description.value,
    price: `$${drupalProduct.attributes.field_price.toFixed(2)}`,
    category: categoryData?.attributes.name || "Uncategorized",
    image: imageData?.attributes.uri?.url || "",
  };
}

export function transformDrupalProducts(response: any): Product[] {
  const { data, included = [] } = response;

  return data.map((product: DrupalProduct) =>
    transformDrupalProduct(product, included)
  );
}
