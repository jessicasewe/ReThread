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

  return (
    <Link
      href={href}
      className={`text-sm font-medium transition-colors hover:text-primary ${
        pathname === href ? "text-primary" : "text-muted-foreground"
      }`}
      onClick={onClick}
    >
      {label}
    </Link>
  );
}
