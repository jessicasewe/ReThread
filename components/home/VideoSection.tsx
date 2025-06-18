"use client";

import { useEffect, useRef } from "react";

interface VideoSectionProps {
  videoSrc?: string;
  startTime?: number;
  endTime?: number;
  title?: string;
  description?: string;
}

export function VideoSection({
  videoSrc = "/videos/hero-vid.mp4",
  startTime = 15,
  endTime = 35,
  title = "Global Fashion in Motion",
  description = "Witness the journey of second-hand clothing as it travels across continents.",
}: VideoSectionProps) {
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const video = videoRef.current;

    if (video) {
      const handleLoadedMetadata = () => {
        video.currentTime = startTime;
        video.play();
      };

      const handleTimeUpdate = () => {
        if (video.currentTime >= endTime) {
          video.currentTime = startTime;
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
  }, [startTime, endTime]);

  return (
    <section className="w-full min-h-[700px] bg-black relative overflow-hidden py-12 md:py-24 lg:py-32">
      <div className="absolute inset-0">
        <video
          ref={videoRef}
          src={videoSrc}
          muted
          autoPlay
          playsInline
          preload="auto"
          className="w-full h-full object-cover"
          style={{
            filter: "brightness(0.6)",
            pointerEvents: "none",
          }}
        />
      </div>
      <div className="relative z-10 container px-4 md:px-6">
        <div className="flex flex-col items-center space-y-6 text-center mt-32">
          <div className="space-y-4">
            <h2 className="text-4xl font-bold tracking-tighter sm:text-6xl text-white">
              {title}
            </h2>
            <p className="max-w-[800px] text-gray-200 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
              {description}
            </p>
          </div>
        </div>
      </div>
      <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent"></div>
    </section>
  );
}
