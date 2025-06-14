"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

interface NavigationLinkProps {
  href: string;
  label: string;
  onClick?: () => void;
}

export function NavigationLink({ href, label, onClick }: NavigationLinkProps) {
  const pathname = usePathname();
  const isActive = pathname === href;

  return (
    <Link
      href={href}
      className={`text-sm font-medium transition-colors px-3 py-2 rounded-md ${
        isActive
          ? "bg-green-100 text-black"
          : "text-muted-foreground hover:text-primary"
      }`}
      onClick={onClick}
    >
      {label}
    </Link>
  );
}
