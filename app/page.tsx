"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ArrowRight, Play } from "lucide-react";
import { DataVisualization } from "@/components/data-visualization";
import { useEffect, useRef } from "react";

function VideoSection() {
  const videoRef = useRef<HTMLVideoElement>(null);
  const START_TIME = 15;
  const END_TIME = 35;

  useEffect(() => {
    const video = videoRef.current;

    if (video) {
      const handleLoadedMetadata = () => {
        video.currentTime = START_TIME;
        video.play();
      };

      const handleTimeUpdate = () => {
        if (video.currentTime >= END_TIME) {
          video.currentTime = START_TIME;
          video.play();
        }
      };

      video.addEventListener("loadedmetadata", handleLoadedMetadata);
      video.addEventListener("timeupdate", handleTimeUpdate);

      return () => {
        video.removeEventListener("loadedmetadata", handleLoadedMetadata);
        video.removeEventListener("timeupdate", handleTimeUpdate);
      };
    }
  }, []);

  return (
    <section className="w-full py-12 md:py-24 lg:py-32 bg-black relative overflow-hidden">
      <div className="absolute inset-0">
        <video
          ref={videoRef}
          src="/videos/hero-vid.mp4"
          muted
          playsInline
          className="w-full h-full object-cover aspect-video"
          style={{
            filter: "brightness(0.6)",
            pointerEvents: "none",
          }}
        />
      </div>
      <div className="relative z-10 container px-4 md:px-6">
        <div className="flex flex-col items-center space-y-6 text-center">
          <div className="space-y-4">
            <h2 className="text-4xl font-bold tracking-tighter sm:text-6xl text-white">
              Global Fashion in Motion
            </h2>
            <p className="max-w-[800px] text-gray-200 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
              Witness the journey of second-hand clothing as it travels across
              continents.
            </p>
          </div>
        </div>
      </div>
      <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent"></div>
    </section>
  );
}

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen">
      <main className="flex-1">
        <VideoSection />

        <section className="w-full py-12 md:py-24 lg:py-32 bg-gray-50">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center space-y-4 text-center">
              <div className="space-y-2">
                <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl">
                  Global Clothing Trade Data
                </h2>
                <p className="max-w-[700px] text-gray-500 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                  Visualizing the impact of second-hand clothing trade across
                  countries
                </p>
              </div>
              <div className="w-full max-w-4xl mx-auto">
                <DataVisualization />
              </div>
            </div>
          </div>
        </section>

        <section className="w-full py-12 md:py-24 lg:py-32 bg-white">
          <div className="container px-4 md:px-6">
            <div className="grid gap-6 lg:grid-cols-2 lg:gap-12">
              <div className="space-y-4">
                <h2 className="text-3xl font-bold tracking-tighter">
                  Products
                </h2>
                <p className="text-gray-500">
                  Explore our collection of sustainable fashion products and
                  initiatives.
                </p>
                <Link href="/products">
                  <Button variant="outline">View Products</Button>
                </Link>
              </div>
              <div className="space-y-4">
                <h2 className="text-3xl font-bold tracking-tighter">
                  Articles
                </h2>
                <p className="text-gray-500">
                  Read the latest articles about sustainable fashion and global
                  clothing trade.
                </p>
                <Link href="/articles">
                  <Button variant="outline">Read Articles</Button>
                </Link>
              </div>
            </div>
          </div>
        </section>
      </main>
      <footer className="w-full py-6 bg-gray-100">
        <div className="container px-4 md:px-6">
          <div className="flex flex-col items-center justify-center space-y-2 text-center">
            <p className="text-sm text-gray-500">
              &copy; {new Date().getFullYear()} Rethread. All rights reserved.
            </p>
            <p className="text-xs text-gray-500">
              A project for The Or Foundation
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}
