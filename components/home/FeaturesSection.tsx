"use client";
import { motion } from "framer-motion";
import { ShoppingBag, BookOpen, Recycle, Globe, Users, LucideIcon } from "lucide-react";
import { FeatureCard } from "./FeatureCard";
import { useState, useEffect } from "react";

// Icon mapping
const iconMap: Record<string, LucideIcon> = {
  'shopping-bag': ShoppingBag,
  'book-open': BookOpen,
  'recycle': Recycle,
  'globe': Globe,
  'users': Users,
};

interface DrupalFeature {
  id: string;
  title: string;
  field_description: {
    value: string;
    processed: string;
  };
  field_button_text: string;
  field_link_url: {
    uri: string;
    title: string;
  };
  field_icon: string;
  field_icon_color: string;
  field_animation_delay: number;
  field_animation_direction: string;
  field_feature_tags?: {
    data: Array<{
      id: string;
      attributes: {
        name: string;
      };
    }>;
  };
}

interface ProcessedFeature {
  title: string;
  description: string;
  buttonText: string;
  href: string;
  icon: LucideIcon;
  iconColor: string;
  tags: Array<{
    icon: LucideIcon;
    label: string;
  }>;
  delay: number;
  direction: "left" | "right";
}

interface FeaturesSectionProps {
  title?: string;
  description?: string;
}

export function FeaturesSection({
  title = "Explore Our Impact",
  description = "Discover sustainable fashion solutions and stay informed about the global clothing trade revolution.",
}: FeaturesSectionProps) {
  const [features, setFeatures] = useState<ProcessedFeature[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetchFeatures();
  }, []);

  const fetchFeatures = async () => {
    try {
      const response = await fetch('/api/test-drupal');
      
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Failed to fetch features');
      }

      const data = await response.json();
      

      console.log('Raw API response:', data);
      console.log('Data.data:', data.data);
      if (data.data && data.data.length > 0) {
        console.log('First item:', data.data[0]);
        console.log('First item relationships:', data.data[0].relationships);
      }
      
      const processedFeatures = data.data.map((item: any) => processFeature(item, data?.included || []));
      
      setFeatures(processedFeatures);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred');
      console.error('Error fetching features:', err);
      
    } finally {
      setLoading(false);
    }
  };

  const processFeature = (item: any, included: any[] = []): ProcessedFeature => {
  const attributes = item.attributes;

  const tags: Array<{ icon: LucideIcon; label: string }> = [];
  
  const featureTags = item.relationships?.field_feature_tags?.data;
  if (featureTags) {
    const tagsArray = Array.isArray(featureTags) ? featureTags : [featureTags];
    
    tagsArray.forEach((tagRef: any) => {
      const tagData = included?.find((inc: any) => 
        inc.type === 'taxonomy_term--feature_tags' && inc.id === tagRef.id
      );
      if (tagData && tagData.attributes?.name) {
        const tagName = tagData.attributes.name;
        let tagIcon = Recycle;
        if (tagName.toLowerCase().includes('eco')) tagIcon = Recycle;
        else if (tagName.toLowerCase().includes('global')) tagIcon = Globe;
        else if (tagName.toLowerCase().includes('research')) tagIcon = BookOpen;
        else if (tagName.toLowerCase().includes('community')) tagIcon = Users;
        
        tags.push({
          icon: tagIcon,
          label: tagName
        });
      }
    });
  }

  return {
    title: attributes.title,
    description: attributes.field_description || '',
    buttonText: attributes.field_button_text || 'Learn More',
    href: attributes.field_button_link?.uri?.replace('internal:', '') || '#',
    icon: iconMap[attributes.field_icon?.replace(/_/g, '-')] || ShoppingBag,
    iconColor: attributes.field_icon_color || 'text-green-600',
    tags,
    delay: parseFloat(attributes.field_animation_delay) || 0.2,
    direction: (attributes.field_animation_direction === 'right' ? 'right' : 'left') as "left" | "right"
  };
};


  if (loading) {
    return (
      <section className="w-full py-16 md:py-24 lg:py-32">
        <div className="container px-4 md:px-6">
          <div className="text-center">
            <div className="animate-pulse">
              <div className="h-8 bg-gray-200 rounded w-64 mx-auto mb-4"></div>
              <div className="h-4 bg-gray-200 rounded w-96 mx-auto"></div>
            </div>
          </div>
        </div>
      </section>
    );
  }

  if (error && features.length === 0) {
    return (
      <section className="w-full py-16 md:py-24 lg:py-32">
        <div className="container px-4 md:px-6">
          <div className="text-center text-red-600">
            Error loading features: {error}
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="w-full py-16 md:py-24 lg:py-32 relative overflow-hidden">
      <div className="absolute inset-0 opacity-5">
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: "radial-gradient(circle at 2px 2px, #000 1px, transparent 0)",
            backgroundSize: "30px 30px",
          }}
        ></div>
      </div>
      <div className="container px-4 md:px-6 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl md:text-4xl font-bold tracking-tight mb-4">
            {title}
          </h2>
          <p className="text-gray-600 max-w-2xl mx-auto text-lg">
            {description}
          </p>
        </motion.div>
        <div className="grid gap-8 lg:grid-cols-2 lg:gap-12 max-w-6xl mx-auto">
          {features.map((feature, index) => (
            <FeatureCard key={index} {...feature} />
          ))}
        </div>
      </div>
    </section>
  );
}