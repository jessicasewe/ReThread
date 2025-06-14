"use client";

import Link from "next/link";
import Image from "next/image";
import ReThread from "@/app/assets/rethred.jpg";

export function Logo() {
  return (
    <Link
      href="/"
      className="font-bold text-2xl text-primary flex items-center gap-2"
    >
      <Image
        src={ReThread}
        alt="ReThread Logo"
        width={40}
        height={40}
        className="rounded-full"
      />
      Rethread
    </Link>
  );
}
