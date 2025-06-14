"use client";

import { useState } from "react";
import { useAuth } from "@/hooks/use-auth";
import { useNavigationRoutes } from "@/hooks/use-navigation-routes";
import { Logo } from "./Logo";
import { NavigationMenu } from "./NavigationMenu";
import { MobileMenuButton } from "./MobileMenuButton";
import { MobileNavigation } from "./MobileNavigation";

export function Header() {
  const { user, logout } = useAuth() as any;
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { routes, adminRoutes, editorRoutes } = useNavigationRoutes();

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const closeMenu = () => {
    setIsMenuOpen(false);
  };

  return (
    <header className="sticky top-0 z-40 w-full border-b bg-white">
      <div className="container flex h-20 items-center justify-between px-4 md:px-8">
        <Logo />

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center space-x-4 lg:space-x-6">
          <NavigationMenu
            routes={routes}
            adminRoutes={adminRoutes}
            editorRoutes={editorRoutes}
            user={user}
          />
        </nav>

        <MobileMenuButton isOpen={isMenuOpen} onToggle={toggleMenu} />
      </div>

      <MobileNavigation
        isOpen={isMenuOpen}
        routes={routes}
        adminRoutes={adminRoutes}
        editorRoutes={editorRoutes}
        user={user}
        logout={logout}
        onClose={closeMenu}
      />
    </header>
  );
}
