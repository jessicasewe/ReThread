"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import {
  Globe,
  ShoppingBag,
  BookOpen,
  Heart,
  Users,
  Recycle,
  ArrowRight,
} from "lucide-react";
import { DataVisualization } from "@/components/data-visualization";
import { useEffect, useRef } from "react";
import { motion } from "framer-motion";
import ReThread from "@/app/assets/rethred.jpg";
import Image from "next/image";

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
                  Global Clothing Trade Data 🌍
                </h2>
                <p className="max-w-[700px] text-gray-600 md:text-lg">
                  Visualizing the impact of second-hand clothing trade across
                  borders and economies.
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
                Explore Our Impact
              </h2>
              <p className="text-gray-600 max-w-2xl mx-auto text-lg">
                Discover sustainable fashion solutions and stay informed about
                the global clothing trade revolution.
              </p>
            </motion.div>

            <div className="grid gap-8 lg:grid-cols-2 lg:gap-12 max-w-6xl mx-auto">
              <motion.div
                initial={{ opacity: 0, x: -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
                viewport={{ once: true }}
                className="group relative bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden border border-gray-100"
              >
                <div className="absolute inset-0 bg-gradient-to-br from-green-50 to-green-50 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                <div className="relative p-8 md:p-10">
                  <div className="flex items-center justify-between mb-6">
                    <div className="p-3 bg-gray-100 rounded-xl group-hover:bg-gray-200 transition-colors duration-300">
                      <ShoppingBag className="w-8 h-8 text-green-600" />
                    </div>
                    <ArrowRight className="w-5 h-5 text-gray-400 group-hover:text-gray-600 group-hover:translate-x-1 transition-all duration-300" />
                  </div>

                  <h3 className="text-2xl md:text-3xl font-bold tracking-tight mb-4 group-hover:text-gray-900 transition-colors duration-300">
                    Sustainable Products
                  </h3>

                  <p className="text-gray-600 mb-6 leading-relaxed">
                    Explore our curated collection of eco-friendly fashion
                    products, sustainable initiatives, and circular economy
                    solutions that are reshaping the global clothing industry.
                  </p>

                  <div className="flex items-center gap-4 mb-6 text-sm text-gray-500">
                    <div className="flex items-center gap-1">
                      <Recycle className="w-4 h-4" />
                      <span>Eco-Friendly</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Globe className="w-4 h-4" />
                      <span>Global Impact</span>
                    </div>
                  </div>

                  <Link href="/products" className="block">
                    <Button
                      variant="outline"
                      className="w-full group-hover:bg-gray-800 group-hover:text-white group-hover:border-gray-800 transition-all duration-300"
                    >
                      View Products
                      <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform duration-300" />
                    </Button>
                  </Link>
                </div>
              </motion.div>

              {/* Articles Card */}
              <motion.div
                initial={{ opacity: 0, x: 30 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: 0.4 }}
                viewport={{ once: true }}
                className="group relative bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden border border-gray-100"
              >
                <div className="absolute inset-0 bg-gradient-to-br from-green-50 to-green-50 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                <div className="relative p-8 md:p-10">
                  <div className="flex items-center justify-between mb-6">
                    <div className="p-3 bg-gray-100 rounded-xl group-hover:bg-gray-200 transition-colors duration-300">
                      <BookOpen className="w-8 h-8 text-green-700" />
                    </div>
                    <ArrowRight className="w-5 h-5 text-gray-400 group-hover:text-gray-700 group-hover:translate-x-1 transition-all duration-300" />
                  </div>

                  <h3 className="text-2xl md:text-3xl font-bold tracking-tight mb-4 group-hover:text-gray-900 transition-colors duration-300">
                    Insights & Research
                  </h3>

                  <p className="text-gray-600 mb-6 leading-relaxed">
                    Stay informed with the latest research, articles, and
                    insights about sustainable fashion, global clothing trade
                    patterns, and the social impact of second-hand clothing
                    markets.
                  </p>

                  <div className="flex items-center gap-4 mb-6 text-sm text-gray-500">
                    <div className="flex items-center gap-1">
                      <BookOpen className="w-4 h-4" />
                      <span>Research</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Users className="w-4 h-4" />
                      <span>Community</span>
                    </div>
                  </div>

                  <Link href="/articles" className="block">
                    <Button
                      variant="outline"
                      className="w-full group-hover:bg-gray-800 group-hover:text-white group-hover:border-gray-800 transition-all duration-300"
                    >
                      Read Articles
                      <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform duration-300" />
                    </Button>
                  </Link>
                </div>
              </motion.div>
            </div>
          </div>
        </section>
      </main>

      <footer className="w-full bg-gradient-to-r from-white to-gray-100 relative overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div
            className="absolute inset-0"
            style={{
              backgroundImage: `linear-gradient(45deg, transparent 40%, rgba(255,255,255,0.1) 50%, transparent 60%)`,
              backgroundSize: "20px 20px",
            }}
          ></div>
        </div>

        <div className="relative z-10">
          <div className="border-b border-gray-800">
            <div className="container px-4 md:px-6 py-8">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                viewport={{ once: true }}
                className="flex flex-col md:flex-row items-center justify-between gap-6"
              >
                <div className="text-center md:text-left">
                  <h3 className="text-2xl font-bold text-gray-800 mb-2 flex items-center gap-2">
                    <div className="p-2 bg-white/10 rounded-lg">
                      <Image
                        src={ReThread}
                        alt="ReThread Logo"
                        width={40}
                        height={40}
                        className="rounded-full"
                      />
                    </div>
                    Rethread
                  </h3>
                  <p className="text-green-800 max-w-md">
                    Transforming the global fashion landscape through
                    sustainable second-hand clothing trade and data-driven
                    insights.
                  </p>
                </div>

                <div className="flex items-center gap-4">
                  <div className="text-center">
                    <div className="text-2xl font-bold text-gray-800">50+</div>
                    <div className="text-xs text-green-800">Countries</div>
                  </div>
                  <div className="w-px h-12 bg-gray-700"></div>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-gray-800">1M+</div>
                    <div className="text-xs text-green-800">
                      Garments Tracked
                    </div>
                  </div>
                  <div className="w-px h-12 bg-gray-700"></div>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-gray-800">100%</div>
                    <div className="text-xs text-green-800">Sustainable</div>
                  </div>
                </div>
              </motion.div>
            </div>
          </div>

          {/* Bottom section */}
          <div className="container px-4 md:px-6 py-6">
            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              viewport={{ once: true }}
              className="flex flex-col md:flex-row items-center justify-between gap-4"
            >
              <div className="flex items-center gap-2 text-gray-400">
                <Heart className="w-4 h-4 text-red-400" />
                <span className="text-sm">
                  Made with care for a sustainable future
                </span>
              </div>

              <div className="flex flex-col md:flex-row items-center gap-4 text-center">
                <p className="text-sm text-gray-400">
                  &copy; {new Date().getFullYear()} Rethread. All rights
                  reserved.
                </p>
                <p className="text-xs text-gray-500 flex items-center gap-2">
                  A project for
                  <span className="text-green-800 font-medium">
                    The Or Foundation
                  </span>
                  <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                </p>
              </div>
            </motion.div>
          </div>
        </div>
      </footer>
    </div>
  );
}
