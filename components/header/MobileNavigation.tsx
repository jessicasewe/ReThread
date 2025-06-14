"use client";

import { NavigationMenu } from "./NavigationMenu";
// import { UserActions } from "./UserActions";

interface Route {
  href: string;
  label: string;
}

interface MobileNavigationProps {
  isOpen: boolean;
  routes: Route[];
  adminRoutes: Route[];
  editorRoutes: Route[];
  user: any;
  logout: () => void;
  onClose: () => void;
}

export function MobileNavigation({
  isOpen,
  routes,
  adminRoutes,
  editorRoutes,
  user,
  logout,
  onClose,
}: MobileNavigationProps) {
  if (!isOpen) return null;

  return (
    <div className="md:hidden">
      <div className="flex flex-col space-y-3 p-4 bg-background border-t">
        <NavigationMenu
          routes={routes}
          adminRoutes={adminRoutes}
          editorRoutes={editorRoutes}
          user={user}
          onLinkClick={onClose}
        />
        {/* <UserActions
          user={user}
          logout={logout}
          isMobile={true}
          onAction={onClose}
        /> */}
      </div>
    </div>
  );
}
