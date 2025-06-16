import { NextResponse } from 'next/server';
import { transformDrupalProducts } from "@/lib/transform-products";

interface ApiCountryData {
  type: string;
  id: string;
  attributes: {
    title: string;
    field_gdp_per_item_per_capita_us: string;
    field_country_role: string;
    field_gdp_per_capita_usd: string;
    field_items_per_capita: number;
    field_metric_tons_of_clothing: string;
    field_population: number;
  };
}

interface CountryData {
  country: string;
  metricTons: number;
  population: number;
  gdpPerCapita: number;
  itemsPerCapita: number;
  gdpPerCapitaPerItem: number;
}

interface DrupalArticleData {
  type: string;
  id: string;
  attributes: {
    title: string;
    body: {
      value: string;
      processed: string;
    };
    created: string;
    changed: string;
    status: boolean;
  };
  relationships: {
    field_image?: {
      data?: {
        id: string;
        type: string;
      };
    };
    field_tags?: {
      data?: Array<{
        id: string;
        type: string;
      }>;
    };
    uid?: {
      data?: {
        id: string;
        type: string;
      };
    };
  };
}

interface TransformedArticle {
  id: string;
  title: string;
  description: string;
  content: string;
  date: string;
  author: string;
  category: string;
  image: string | null;
  tags: string[];
}

// Transform Drupal article data to frontend format
const transformDrupalArticles = (data: any): TransformedArticle[] => {
  if (!data.data || !Array.isArray(data.data)) {
    return [];
  }

  return data.data.map((item: DrupalArticleData) => {
    // Extract image URL from included data
    let imageUrl = null;
    if (item.relationships?.field_image?.data?.id && data.included) {
      const imageFile = data.included.find(
        (inc: any) => inc.id === item.relationships.field_image?.data?.id && inc.type === 'file--file'
      );
      if (imageFile?.attributes?.uri?.url) {
        imageUrl = `${process.env.NEXT_PUBLIC_DRUPAL_API || process.env.NEXT_PUBLIC_DRUPAL_URL}${imageFile.attributes.uri.url}`;
      }
    }

    // Extract tags from included data
    const tags: string[] = [];
    if (item.relationships?.field_tags?.data && data.included) {
      item.relationships.field_tags.data.forEach((tagRef: any) => {
        const tag = data.included.find(
          (inc: any) => inc.id === tagRef.id && inc.type === 'taxonomy_term--article_tags'
        );
        if (tag?.attributes?.name) {
          tags.push(tag.attributes.name);
        }
      });
    }

    // Extract author from included data
    let author = 'Unknown Author';
    if (item.relationships?.uid?.data?.id && data.included) {
      const userRecord = data.included.find(
        (inc: any) => inc.id === item.relationships.uid?.data?.id && inc.type === 'user--user'
      );
      if (userRecord?.attributes?.display_name || userRecord?.attributes?.name) {
        author = userRecord.attributes.display_name || userRecord.attributes.name;
      }
    }

    return {
      id: item.id,
      title: item.attributes.title,
      description: item.attributes.body?.processed?.replace(/<[^>]*>/g, '') || '',
      content: item.attributes.body?.processed || '',
      date: item.attributes.created,
      author: author,
      category: tags[0] || 'General',
      image: imageUrl,
      tags: tags,
    };
  });
};

// Transform clothing trade API data
const transformClothingTradeData = (apiData: ApiCountryData[]): { receiving: CountryData[], sending: CountryData[] } => {
  const receiving: CountryData[] = [];
  const sending: CountryData[] = [];

  apiData.forEach(item => {
    const country: CountryData = {
      country: item.attributes.title,
      metricTons: parseFloat(item.attributes.field_metric_tons_of_clothing),
      population: item.attributes.field_population,
      gdpPerCapita: parseFloat(item.attributes.field_gdp_per_capita_usd),
      itemsPerCapita: item.attributes.field_items_per_capita,
      gdpPerCapitaPerItem: parseFloat(item.attributes.field_gdp_per_item_per_capita_us),
    };

    if (item.attributes.field_country_role === 'receiving') {
      receiving.push(country);
    } else if (item.attributes.field_country_role === 'sending') {
      sending.push(country);
    }
  });

  return { receiving, sending };
};

const getFallbackClothingData = () => {
  const fallbackReceiving = [
    {
      country: "Mozambique",
      metricTons: 191570,
      population: 32163040,
      gdpPerCapita: 500,
      itemsPerCapita: 31,
      gdpPerCapitaPerItem: 16,
    },
    {
      country: "Ghana",
      metricTons: 149181,
      population: 31732130,
      gdpPerCapita: 2445,
      itemsPerCapita: 25,
      gdpPerCapitaPerItem: 99,
    },
    {
      country: "Togo",
      metricTons: 63042,
      population: 8478240,
      gdpPerCapita: 992,
      itemsPerCapita: 39,
      gdpPerCapitaPerItem: 25,
    },
    {
      country: "Haiti",
      metricTons: 26233,
      population: 11541680,
      gdpPerCapita: 1815,
      itemsPerCapita: 12,
      gdpPerCapitaPerItem: 152,
    },
  ];

  const fallbackSending = [
    {
      country: "USA",
      metricTons: 720846,
      population: 331893740,
      gdpPerCapita: 69288,
      itemsPerCapita: 11,
      gdpPerCapitaPerItem: 6076,
    },
    {
      country: "Germany",
      metricTons: 436426,
      population: 83129290,
      gdpPerCapita: 50802,
      itemsPerCapita: 28,
      gdpPerCapitaPerItem: 1843,
    },
    {
      country: "United Kingdom",
      metricTons: 335152,
      population: 67326570,
      gdpPerCapita: 47334,
      itemsPerCapita: 26,
      gdpPerCapitaPerItem: 1811,
    },
    {
      country: "France",
      metricTons: 157790,
      population: 67499340,
      gdpPerCapita: 43519,
      itemsPerCapita: 12,
      gdpPerCapitaPerItem: 3546,
    },
  ];

  return { receiving: fallbackReceiving, sending: fallbackSending };
};

export async function GET(request: Request) {
  const drupalBaseUrl = process.env.NEXT_PUBLIC_DRUPAL_API || process.env.NEXT_PUBLIC_DRUPAL_URL;
  
  try {
    const { searchParams } = new URL(request.url);
    const type = searchParams.get('type') || 'feature_cards';
    
    if (!drupalBaseUrl) {
      return NextResponse.json(
        { error: 'Drupal API URL not configured' },
        { status: 500 }
      );
    }

    let endpoint = '';
    let includeParams = '';

    // Determine endpoint based on type
    switch (type) {
      case 'feature_cards':
        endpoint = 'node/feature_card';
        includeParams = '?include=field_feature_tags';
        break;
      case 'products':
        endpoint = 'node/product';
        includeParams = '?include=field_category,field_product_image';
        break;
      case 'articles':
        endpoint = 'node/article';
        includeParams = '?include=field_image,field_tags,uid';
        break;
      case 'clothing_trade':
        endpoint = 'node/country_trade_impact';
        includeParams = '';
        break;
      case 'footer':
        endpoint = 'block_content/footer_info_block';
        includeParams = '?include=field_logo_image';
        break;
      default:
        return NextResponse.json(
          { error: 'Invalid type parameter. Use "feature_cards", "products", "articles", "clothing_trade", or "footer"' },
          { status: 400 }
        );
    }

    const response = await fetch(
      `${drupalBaseUrl}/jsonapi/${endpoint}${includeParams}`,
      {
        headers: {
          'Accept': 'application/vnd.api+json',
          'Content-Type': 'application/vnd.api+json',
        },
        // Add next.js specific caching if needed
        next: { revalidate: 300 },
      }
    );

    if (!response.ok) {
      console.error('Drupal API Error:', response.status, response.statusText);
      
      // Special handling for clothing trade data - provide fallback
      if (type === 'clothing_trade') {
        console.warn('Using fallback clothing trade data due to API error');
        const fallbackData = getFallbackClothingData();
        return NextResponse.json({
          success: true,
          usingFallback: true,
          error: `API Error: ${response.status} ${response.statusText}`,
          drupalUrl: drupalBaseUrl,
          data: fallbackData,
          rawDataCount: fallbackData.receiving.length + fallbackData.sending.length,
        });
      }

      const errorData = await response.json().catch(() => null);
      return NextResponse.json(
        { 
          error: `Failed to fetch from Drupal: ${response.status} ${response.statusText}`,
          details: errorData 
        },
        { status: response.status }
      );
    }

    const data = await response.json();

    // Handle different response formats based on type
    if (type === 'products') {
      const transformedProducts = transformDrupalProducts(data);
      return NextResponse.json({
        success: true,
        drupalUrl: drupalBaseUrl,
        rawDataCount: data.data?.length || 0,
        transformedCount: transformedProducts.length,
        rawData: data,
        transformedProducts: transformedProducts,
      });
    }

    if (type === 'articles') {
      const transformedArticles = transformDrupalArticles(data);
      return NextResponse.json({
        success: true,
        drupalUrl: drupalBaseUrl,
        rawDataCount: data.data?.length || 0,
        transformedCount: transformedArticles.length,
        articles: transformedArticles,
        rawData: data, // Include raw data for debugging
      });
    }

    if (type === 'clothing_trade') {
      try {
        const transformedData = transformClothingTradeData(data.data);
        return NextResponse.json({
          success: true,
          drupalUrl: drupalBaseUrl,
          rawDataCount: data.data?.length || 0,
          data: transformedData,
          receivingCountries: transformedData.receiving,
          sendingCountries: transformedData.sending,
          rawData: data, // Include raw data for debugging
        });
      } catch (transformError) {
        console.error('Error transforming clothing trade data:', transformError);
        console.warn('Using fallback clothing trade data due to transformation error');
        const fallbackData = getFallbackClothingData();
        return NextResponse.json({
          success: true,
          usingFallback: true,
          error: `Transformation Error: ${transformError instanceof Error ? transformError.message : 'Unknown error'}`,
          drupalUrl: drupalBaseUrl,
          data: fallbackData,
          rawDataCount: fallbackData.receiving.length + fallbackData.sending.length,
        });
      }
    }

    if (type === 'footer') {
      const footerBlock = data?.data?.[0];
      const logoRelationship = footerBlock?.relationships?.field_logo_image?.data;
      const logoImageId = logoRelationship?.id || null;

      // Find the corresponding image object in the included section
      const logoImage = data?.included?.find(
        (item: any) =>
          item.type === 'file--file' && item.id === logoImageId
      );

      const logoImageUrl = logoImage?.attributes?.uri?.url
        ? `${drupalBaseUrl}${logoImage.attributes.uri.url}`
        : null;

      return NextResponse.json({
        success: true,
        footer: {
          siteTitle: footerBlock?.attributes?.field_site_title,
          description: footerBlock?.attributes?.field_description,
          creditsNote: footerBlock?.attributes?.field_credits_note,
          yearNotice: footerBlock?.attributes?.field_year_notice,
          attribution: footerBlock?.attributes?.field_project_attribution,
          logoImageId,
          logoImageUrl,
        },
        raw: data,
      });
    }

    // Default response for feature_cards
    return NextResponse.json(data);
    
  } catch (error) {
    console.error('API Route Error:', error);
    
    const { searchParams } = new URL(request.url);
    const type = searchParams.get('type');
    
    if (type === 'clothing_trade') {
      console.warn('Using fallback clothing trade data due to network error');
      const fallbackData = getFallbackClothingData();
      return NextResponse.json({
        success: true,
        usingFallback: true,
        error: `Network Error: ${error instanceof Error ? error.message : 'Unknown error'}`,
        drupalUrl: drupalBaseUrl,
        data: fallbackData,
        rawDataCount: fallbackData.receiving.length + fallbackData.sending.length,
      });
    }

    return NextResponse.json(
      { 
        error: 'Internal server error',
        details: error instanceof Error ? error.message : 'Unknown error',
        drupalUrl: drupalBaseUrl 
      },
      { status: 500 }
    );
  }
}