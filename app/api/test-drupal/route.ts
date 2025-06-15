// app/api/test-drupal/route.ts
import { NextResponse } from "next/server";
import { transformDrupalProducts } from "@/lib/transform-products";

export async function GET() {
  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_DRUPAL_URL}/jsonapi/node/product?include=field_category,field_product_image`,
      {
        headers: {
          Accept: "application/vnd.api+json",
        },
      }
    );

    const data = await response.json();

    if (!response.ok) {
      return NextResponse.json(
        {
          success: false,
          error: `HTTP ${response.status}: ${response.statusText}`,
          data: data,
        },
        { status: response.status }
      );
    }

    const transformedProducts = transformDrupalProducts(data);

    return NextResponse.json({
      success: true,
      drupalUrl: process.env.NEXT_PUBLIC_DRUPAL_URL,
      rawDataCount: data.data?.length || 0,
      transformedCount: transformedProducts.length,
      rawData: data,
      transformedProducts: transformedProducts,
    });
  } catch (error) {
    return NextResponse.json(
      {
        success: false,
        error: error instanceof Error ? error.message : "Unknown error",
        drupalUrl: process.env.NEXT_PUBLIC_DRUPAL_URL,
      },
      { status: 500 }
    );
  }
}
