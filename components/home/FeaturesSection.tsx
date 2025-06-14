"use client";

import { motion } from "framer-motion";
import { ShoppingBag, BookOpen, Recycle, Globe, Users } from "lucide-react";
import { FeatureCard } from "./FeatureCard";

interface FeaturesSectionProps {
  title?: string;
  description?: string;
}

export function FeaturesSection({
  title = "Explore Our Impact",
  description = "Discover sustainable fashion solutions and stay informed about the global clothing trade revolution.",
}: FeaturesSectionProps) {
  const features = [
    {
      title: "Sustainable Products",
      description:
        "Explore our curated collection of eco-friendly fashion products, sustainable initiatives, and circular economy solutions that are reshaping the global clothing industry.",
      buttonText: "View Products",
      href: "/products",
      icon: ShoppingBag,
      iconColor: "text-green-600",
      tags: [
        { icon: Recycle, label: "Eco-Friendly" },
        { icon: Globe, label: "Global Impact" },
      ],
      delay: 0.2,
      direction: "left" as const,
    },
    {
      title: "Insights & Research",
      description:
        "Stay informed with the latest research, articles, and insights about sustainable fashion, global clothing trade patterns, and the social impact of second-hand clothing markets.",
      buttonText: "Read Articles",
      href: "/articles",
      icon: BookOpen,
      iconColor: "text-green-700",
      tags: [
        { icon: BookOpen, label: "Research" },
        { icon: Users, label: "Community" },
      ],
      delay: 0.4,
      direction: "right" as const,
    },
  ];

  return (
    <section className="w-full py-16 md:py-24 lg:py-32 relative overflow-hidden">
      <div className="absolute inset-0 opacity-5">
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: `radial-gradient(circle at 2px 2px, #000 1px, transparent 0)`,
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
