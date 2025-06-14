"use client";

import { NavigationLink } from "./NavigationLink";

interface Route {
  href: string;
  label: string;
}

interface NavigationMenuProps {
  routes: Route[];
  adminRoutes: Route[];
  editorRoutes: Route[];
  user: any;
  onLinkClick?: () => void;
}

export function NavigationMenu({
  routes,
  adminRoutes,
  editorRoutes,
  user,
  onLinkClick,
}: NavigationMenuProps) {
  return (
    <>
      {routes.map((route) => (
        <NavigationLink
          key={route.href}
          href={route.href}
          label={route.label}
          onClick={onLinkClick}
        />
      ))}

      {user &&
        user.role === "admin" &&
        adminRoutes.map((route) => (
          <NavigationLink
            key={route.href}
            href={route.href}
            label={route.label}
            onClick={onLinkClick}
          />
        ))}

      {user &&
        (user.role === "admin" || user.role === "editor") &&
        editorRoutes.map((route) => (
          <NavigationLink
            key={route.href}
            href={route.href}
            label={route.label}
            onClick={onLinkClick}
          />
        ))}
    </>
  );
}
