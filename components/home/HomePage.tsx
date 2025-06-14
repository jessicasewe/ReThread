"use client";

import { VideoSection } from "./VideoSection";
import { DataVisualizationSection } from "./DataVisualizationSection";
import { FeaturesSection } from "./FeaturesSection";
import { Footer } from "./Footer";

export default function HomePage() {
  return (
    <div className="flex flex-col min-h-screen">
      <main className="flex-1">
        <VideoSection />
        <DataVisualizationSection />
        <FeaturesSection />
      </main>
      <Footer />
    </div>
  );
}
