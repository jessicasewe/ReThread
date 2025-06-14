"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { ArrowRight, LucideIcon } from "lucide-react";

interface Tag {
  icon: LucideIcon;
  label: string;
}

interface FeatureCardProps {
  title: string;
  description: string;
  buttonText: string;
  href: string;
  icon: LucideIcon;
  iconColor?: string;
  tags: Tag[];
  delay?: number;
  direction?: "left" | "right";
}

export function FeatureCard({
  title,
  description,
  buttonText,
  href,
  icon: Icon,
  iconColor = "text-green-600",
  tags,
  delay = 0,
  direction = "left",
}: FeatureCardProps) {
  const initialX = direction === "left" ? -30 : 30;

  return (
    <motion.div
      initial={{ opacity: 0, x: initialX }}
      whileInView={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.6, delay }}
      viewport={{ once: true }}
      className="group relative bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden border border-gray-100"
    >
      <div className="absolute inset-0 bg-gradient-to-br from-green-50 to-green-50 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
      <div className="relative p-8 md:p-10">
        <div className="flex items-center justify-between mb-6">
          <div className="p-3 bg-gray-100 rounded-xl group-hover:bg-gray-200 transition-colors duration-300">
            <Icon className={`w-8 h-8 ${iconColor}`} />
          </div>
          <ArrowRight className="w-5 h-5 text-gray-400 group-hover:text-gray-600 group-hover:translate-x-1 transition-all duration-300" />
        </div>

        <h3 className="text-2xl md:text-3xl font-bold tracking-tight mb-4 group-hover:text-gray-900 transition-colors duration-300">
          {title}
        </h3>

        <p className="text-gray-600 mb-6 leading-relaxed">{description}</p>

        <div className="flex items-center gap-4 mb-6 text-sm text-gray-500">
          {tags.map(({ icon: TagIcon, label }, index) => (
            <div key={index} className="flex items-center gap-1">
              <TagIcon className="w-4 h-4" />
              <span>{label}</span>
            </div>
          ))}
        </div>

        <Link href={href} className="block">
          <Button
            variant="outline"
            className="w-full group-hover:bg-gray-800 group-hover:text-white group-hover:border-gray-800 transition-all duration-300"
          >
            {buttonText}
            <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform duration-300" />
          </Button>
        </Link>
      </div>
    </motion.div>
  );
}
