"use client";

import { motion } from "framer-motion";
import { Heart } from "lucide-react";
import Image from "next/image";
import ReThread from "@/app/assets/rethred.jpg";
import { StatsCard } from "./StatsCard";

interface FooterProps {
  stats?: Array<{ value: string; label: string }>;
}

export function Footer({
  stats = [
    { value: "50+", label: "Countries" },
    { value: "1M+", label: "Garments Tracked" },
    { value: "100%", label: "Sustainable" },
  ],
}: FooterProps) {
  return (
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
                  Transforming the global fashion landscape through sustainable
                  second-hand clothing trade and data-driven insights.
                </p>
              </div>

              <div className="flex items-center gap-4">
                {stats.map((stat, index) => (
                  <div key={index} className="flex items-center gap-4">
                    <StatsCard value={stat.value} label={stat.label} />
                    {index < stats.length - 1 && (
                      <div className="w-px h-12 bg-gray-700"></div>
                    )}
                  </div>
                ))}
              </div>
            </motion.div>
          </div>
        </div>

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
                &copy; {new Date().getFullYear()} Rethread. All rights reserved.
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
  );
}
