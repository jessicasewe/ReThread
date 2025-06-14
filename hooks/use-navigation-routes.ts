export function useNavigationRoutes() {
  const routes = [
    { href: "/", label: "Home" },
    { href: "/products", label: "Products" },
    { href: "/articles", label: "Articles" },
    { href: "/data", label: "Data Visualization" },
  ];

  const adminRoutes = [
    { href: "/admin/dashboard", label: "Dashboard" },
    { href: "/admin/users", label: "Users" },
  ];

  const editorRoutes = [
    { href: "/admin/products", label: "Manage Products" },
    { href: "/admin/articles", label: "Manage Articles" },
  ];

  return { routes, adminRoutes, editorRoutes };
}
