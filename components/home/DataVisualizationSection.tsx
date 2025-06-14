"use client";

import { motion } from "framer-motion";
import { Globe } from "lucide-react";
import { DataVisualization } from "@/components/data-visualization";

interface DataVisualizationSectionProps {
  title?: string;
  description?: string;
}

export function DataVisualizationSection({
  title = "Global Clothing Trade Data 🌍",
  description = "Visualizing the impact of second-hand clothing trade across borders and economies.",
}: DataVisualizationSectionProps) {
  return (
    <section className="w-full py-16 md:py-24 lg:py-32">
      <div className="container px-4 md:px-6">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="flex flex-col items-center space-y-6 text-center"
        >
          <div className="space-y-2">
            <h2 className="text-3xl font-bold tracking-tight sm:text-4xl flex items-center justify-center gap-2">
              <Globe className="w-6 h-6 text-blue-500" />
              {title}
            </h2>
            <p className="max-w-[700px] text-gray-600 md:text-lg">
              {description}
            </p>
          </div>
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.4, duration: 0.6 }}
            className="w-full max-w-5xl mx-auto"
          >
            <DataVisualization />
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
