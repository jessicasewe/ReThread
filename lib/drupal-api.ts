// lib/drupal-api.ts
const DRUPAL_BASE_URL =
  process.env.NEXT_PUBLIC_DRUPAL_URL || "http://localhost:8000";
const API_BASE_URL = `${DRUPAL_BASE_URL}/jsonapi`;

// Simple auth interface - adjust based on your Drupal setup
interface DrupalAuth {
  username: string;
  password: string;
}

class DrupalAPI {
  private authToken: string | null = null;

  // Basic authentication (you might use OAuth2 or other methods)
  async authenticate(auth: DrupalAuth): Promise<boolean> {
    try {
      console.log("🔐 Authenticating with Drupal...");

      const response = await fetch(
        `${DRUPAL_BASE_URL}/user/login?_format=json`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            name: auth.username,
            pass: auth.password,
          }),
        }
      );

      if (response.ok) {
        const data = await response.json();
        this.authToken = data.csrf_token;
        console.log("✅ Authentication successful");
        return true;
      } else {
        console.error("❌ Authentication failed:", response.status);
        return false;
      }
    } catch (error) {
      console.error("❌ Auth error:", error);
      return false;
    }
  }

  // Get headers for authenticated requests
  private getHeaders(): HeadersInit {
    const headers: HeadersInit = {
      "Content-Type": "application/vnd.api+json",
      Accept: "application/vnd.api+json",
    };

    if (this.authToken) {
      headers["X-CSRF-Token"] = this.authToken;
    }

    return headers;
  }

  // Fetch products from Drupal
  async getProducts(): Promise<any[]> {
    try {
      console.log("📦 Fetching products from Drupal...");

      const response = await fetch(`${API_BASE_URL}/node/product`, {
        headers: this.getHeaders(),
      });

      if (!response.ok) {
        console.error("❌ Failed to fetch products:", response.status);
        return [];
      }

      const data = await response.json();
      console.log(
        "✅ Products fetched successfully:",
        data.data.length,
        "items"
      );

      return this.transformProducts(data.data);
    } catch (error) {
      console.error("❌ Error fetching products:", error);
      return [];
    }
  }

  // Get a single product by ID
  async getProduct(id: string): Promise<any | null> {
    try {
      console.log("🔍 Fetching product by ID:", id);

      const response = await fetch(`${API_BASE_URL}/node/product/${id}`, {
        headers: this.getHeaders(),
      });

      if (!response.ok) {
        console.error("❌ Failed to fetch product:", response.status);
        return null;
      }

      const data = await response.json();
      console.log("✅ Product fetched successfully");

      return this.transformProduct(data.data);
    } catch (error) {
      console.error("❌ Error fetching product:", error);
      return null;
    }
  }

  // Transform Drupal JSON:API response to your Product type
  private transformProducts(drupalProducts: any[]): any[] {
    return drupalProducts.map((product) => this.transformProduct(product));
  }

  private transformProduct(drupalProduct: any): any {
    console.log("🔄 Transforming product:", drupalProduct.attributes.title);

    return {
      id: drupalProduct.id,
      title: drupalProduct.attributes.title,
      description:
        drupalProduct.attributes.body?.processed ||
        drupalProduct.attributes.body?.value ||
        "",
      price: drupalProduct.attributes.field_price || "$0.00",
      category: drupalProduct.attributes.field_category || "Uncategorized",
      image: this.getImageUrl(drupalProduct.attributes.field_image),
      slug:
        drupalProduct.attributes.path?.alias || `/product/${drupalProduct.id}`,
    };
  }

  private getImageUrl(imageField: any): string {
    // Handle different image field structures
    if (imageField?.uri) {
      return `${DRUPAL_BASE_URL}${imageField.uri}`;
    }
    if (imageField?.url) {
      return imageField.url.startsWith("http")
        ? imageField.url
        : `${DRUPAL_BASE_URL}${imageField.url}`;
    }
    return "/placeholder.svg";
  }
}

// Export singleton instance
export const drupalAPI = new DrupalAPI();

// Helper function for pages/components
export async function fetchDrupalProducts() {
  console.log("🚀 Starting Drupal product fetch...");

  // If you need authentication, uncomment and configure:
  const isAuthenticated = await drupalAPI.authenticate({
    username: process.env.DRUPAL_USERNAME!,
    password: process.env.DRUPAL_PASSWORD!,
  });

  if (!isAuthenticated) {
    console.log("⚠️ Proceeding without authentication");
  }

  const products = await drupalAPI.getProducts();
  console.log("📊 Final product count:", products.length);

  return products;
}
