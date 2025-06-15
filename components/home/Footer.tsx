"use client";
import { useEffect, useState } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { Heart } from "lucide-react";
import { StatsCard } from "./StatsCard";
import { StaticImport } from "next/dist/shared/lib/get-img-props";

interface FooterProps {
  stats?: Array<{ value: string; label: string }>;
}

interface FooterBlock {
  logoImageUrl: string | StaticImport;
  siteTitle: string;
  description: string;
  creditsNote: string;
  yearNotice: string;
  attribution: string;
  logoImageId: string | null;
}

export function Footer({
  stats = [
    { value: "50+", label: "Countries" },
    { value: "1M+", label: "Garments Tracked" },
    { value: "100%", label: "Sustainable" },
  ],
}: FooterProps) {
  const [footerData, setFooterData] = useState<FooterBlock | null>(null);

  useEffect(() => {
    async function fetchFooter() {
      try {
        const res = await fetch("/api/test-drupal?type=footer");
        const json = await res.json();
        setFooterData(json.footer);
      } catch (err) {
        console.error("Error loading footer:", err);
      }
    }

    fetchFooter();
  }, []);

  if (!footerData) return null;

  return (
    <footer className="w-full bg-gradient-to-r from-white to-gray-100 relative overflow-hidden">
      {/* background visuals omitted for brevity */}
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
                    {footerData.logoImageId ? (
                      <Image
                        src={footerData.logoImageUrl}
                        alt="Logo"
                        width={40}
                        height={40}
                        className="rounded-full"
                      />
                    ) : null}
                  </div>
                  {footerData.siteTitle}
                </h3>
                <p className="text-green-800 max-w-md">
                  {footerData.description}
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
              <span className="text-sm">{footerData.creditsNote}</span>
            </div>

            <div className="flex flex-col md:flex-row items-center gap-4 text-center">
              <p className="text-sm text-gray-400">{footerData.yearNotice}</p>
              <p className="text-xs text-gray-500 flex items-center gap-2">
                A project for{" "}
                <span className="text-green-800 font-medium">
                  {footerData.attribution}
                </span>
              </p>
            </div>
          </motion.div>
        </div>
      </div>
    </footer>
  );
}
