// lib/drupal-api.ts
const DRUPAL_BASE_URL = process.env.NEXT_PUBLIC_DRUPAL_API; // Make sure this matches your env variable
const API_BASE_URL = `${DRUPAL_BASE_URL}/jsonapi`;

// For development: ignore SSL certificate errors
const isDevMode = process.env.NODE_ENV === 'development';
if (isDevMode && typeof process !== 'undefined') {
  process.env["NODE_TLS_REJECT_UNAUTHORIZED"] = "0";
}

// Add validation to catch this issue early
if (!DRUPAL_BASE_URL) {
  console.error("❌ DRUPAL_BASE_URL is not configured. Please check your environment variables.");
  console.error("Looking for: NEXT_PUBLIC_DRUPAL_API");
  console.error("Current value:", DRUPAL_BASE_URL);
  console.error("All NEXT_PUBLIC env vars:", Object.keys(process.env).filter(key => key.startsWith('NEXT_PUBLIC')));
}

// Simple auth interface - adjust based on your Drupal setup
interface DrupalAuth {
  username: string;
  password: string;
}

class DrupalAPI {
  private authToken: string | null = null;

  // Basic authentication (you might use OAuth2 or other methods)
  async authenticate(auth: DrupalAuth): Promise<boolean> {
    if (!DRUPAL_BASE_URL) {
      console.error("❌ Cannot authenticate: DRUPAL_BASE_URL is not configured");
      return false;
    }

    try {
      console.log("🔐 Authenticating with Drupal...");
      console.log("🌐 Using URL:", `${DRUPAL_BASE_URL}/user/login?_format=json`);

      // For development, create fetch options that ignore SSL issues
      const fetchOptions: RequestInit = {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: auth.username,
          pass: auth.password,
        }),
      };

      // Add agent for Node.js environments to ignore SSL
      if (typeof window === 'undefined' && isDevMode) {
        const https = require('https');
        (fetchOptions as any).agent = new https.Agent({
          rejectUnauthorized: false
        });
      }

      const response = await fetch(
        `${DRUPAL_BASE_URL}/user/login?_format=json`,
        fetchOptions
      );

      if (response.ok) {
        const data = await response.json();
        this.authToken = data.csrf_token;
        console.log("✅ Authentication successful");
        return true;
      } else {
        console.error("❌ Authentication failed:", response.status);
        const errorText = await response.text();
        console.error("Error details:", errorText);
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

  // Fetch file details to get the actual image URL
  async getFileUrl(fileId: string): Promise<string> {
    if (!DRUPAL_BASE_URL) {
      console.error("❌ Cannot fetch file: DRUPAL_BASE_URL is not configured");
      return "/placeholder.svg";
    }

    try {
      console.log("🖼️ Fetching file details for ID:", fileId);

      const fetchOptions: RequestInit = {
        headers: this.getHeaders(),
      };

      // Add agent for Node.js environments to ignore SSL
      if (typeof window === 'undefined' && isDevMode) {
        const https = require('https');
        (fetchOptions as any).agent = new https.Agent({
          rejectUnauthorized: false
        });
      }

      const response = await fetch(`${API_BASE_URL}/file/file/${fileId}`, fetchOptions);

      if (!response.ok) {
        console.error("❌ Failed to fetch file details:", response.status);
        return "/placeholder.svg";
      }

      const data = await response.json();
      const fileUri = data.data.attributes.uri?.url;
      
      if (fileUri) {
        // If it's a relative path, make it absolute
        if (fileUri.startsWith('/')) {
          return `${DRUPAL_BASE_URL}${fileUri}`;
        }
        // If it's already absolute, return as is
        return fileUri;
      }

      console.error("❌ No file URI found in response");
      return "/placeholder.svg";
    } catch (error) {
      console.error("❌ Error fetching file details:", error);
      return "/placeholder.svg";
    }
  }

  // Fetch products from Drupal
  async getProducts(): Promise<any[]> {
    if (!DRUPAL_BASE_URL) {
      console.error("❌ Cannot fetch products: DRUPAL_BASE_URL is not configured");
      return [];
    }

    try {
      console.log("📦 Fetching products from Drupal...");
      console.log("🌐 Using URL:", `${API_BASE_URL}/node/product`);

      // For development, create fetch options that ignore SSL issues
      const fetchOptions: RequestInit = {
        headers: this.getHeaders(),
      };

      // Add agent for Node.js environments to ignore SSL
      if (typeof window === 'undefined' && isDevMode) {
        const https = require('https');
        (fetchOptions as any).agent = new https.Agent({
          rejectUnauthorized: false
        });
      }

      const response = await fetch(`${API_BASE_URL}/node/product`, fetchOptions);

      if (!response.ok) {
        console.error("❌ Failed to fetch products:", response.status);
        const errorText = await response.text();
        console.error("Error details:", errorText);
        return [];
      }

      const data = await response.json();
      console.log(
        "✅ Products fetched successfully:",
        data.data.length,
        "items"
      );

      return await this.transformProducts(data.data);
    } catch (error) {
      console.error("❌ Error fetching products:", error);
      return [];
    }
  }

  // Get a single product by ID
  async getProduct(id: string): Promise<any | null> {
    if (!DRUPAL_BASE_URL) {
      console.error("❌ Cannot fetch product: DRUPAL_BASE_URL is not configured");
      return null;
    }

    try {
      console.log("🔍 Fetching product by ID:", id);

      // For development, create fetch options that ignore SSL issues
      const fetchOptions: RequestInit = {
        headers: this.getHeaders(),
      };

      // Add agent for Node.js environments to ignore SSL
      if (typeof window === 'undefined' && isDevMode) {
        const https = require('https');
        (fetchOptions as any).agent = new https.Agent({
          rejectUnauthorized: false
        });
      }

      const response = await fetch(`${API_BASE_URL}/node/product/${id}`, fetchOptions);

      if (!response.ok) {
        console.error("❌ Failed to fetch product:", response.status);
        return null;
      }

      const data = await response.json();
      console.log("✅ Product fetched successfully");

      return await this.transformProduct(data.data);
    } catch (error) {
      console.error("❌ Error fetching product:", error);
      return null;
    }
  }

  // Transform Drupal JSON:API response to your Product type
  private async transformProducts(drupalProducts: any[]): Promise<any[]> {
    const transformedProducts = [];
    
    for (const product of drupalProducts) {
      const transformedProduct = await this.transformProduct(product);
      transformedProducts.push(transformedProduct);
    }
    
    return transformedProducts;
  }

  private async transformProduct(drupalProduct: any): Promise<any> {
    console.log("🔄 Transforming product:", drupalProduct.attributes.title);

    // Get the actual image URL
    const imageUrl = await this.getImageUrl(drupalProduct.relationships?.field_product_image);
    
    return {
      id: drupalProduct.id,
      title: drupalProduct.attributes.title,
      description: drupalProduct.attributes.field_description || "",
      price: `${drupalProduct.attributes.field_price || "0.00"}`,
      category: await this.getCategoryName(drupalProduct.relationships?.field_category),
      image: imageUrl,
      slug:
        drupalProduct.attributes.path?.alias || `/product/${drupalProduct.id}`,
    };
  }

  private async getImageUrl(imageRelationship: any): Promise<string> {
    // Handle Drupal JSON:API relationship structure for images
    if (imageRelationship?.data?.id) {
      const fileId = imageRelationship.data.id;
      return await this.getFileUrl(fileId);
    }
    return "/placeholder.svg";
  }

  private async getCategoryName(categoryRelationship: any): Promise<string> {
    // Fetch the actual category name from the taxonomy term
    if (categoryRelationship?.data?.id) {
      try {
        const categoryId = categoryRelationship.data.id;
        
        const fetchOptions: RequestInit = {
          headers: this.getHeaders(),
        };

        // Add agent for Node.js environments to ignore SSL
        if (typeof window === 'undefined' && isDevMode) {
          const https = require('https');
          (fetchOptions as any).agent = new https.Agent({
            rejectUnauthorized: false
          });
        }

        const response = await fetch(
          `${API_BASE_URL}/taxonomy_term/product_categories/${categoryId}`,
          fetchOptions
        );

        if (response.ok) {
          const data = await response.json();
          return data.data.attributes.name || "Category";
        }
      } catch (error) {
        console.error("❌ Error fetching category name:", error);
      }
    }
    return "Uncategorized";
  }
}

// Export singleton instance
export const drupalAPI = new DrupalAPI();

// Helper function for pages/components
export async function fetchDrupalProducts() {
  console.log("🚀 Starting Drupal product fetch...");

  // Validate environment variables
  if (!process.env.DRUPAL_USERNAME || !process.env.DRUPAL_PASSWORD) {
    console.error("❌ DRUPAL_USERNAME or DRUPAL_PASSWORD not configured");
    return [];
  }

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