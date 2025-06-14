"use client";

import { createContext, useContext, useState, useEffect } from "react";
import { useRouter, usePathname } from "next/navigation";

export type UserRole = "admin" | "editor" | "user";

export interface User {
  id: string;
  email: string;
  name: string;
  role: UserRole;
}

interface AuthContextType {
  user: User | null;
  login: (email: string, password: string) => Promise<void>;
  logout: () => void;
  isLoading: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

const MOCK_USERS = [
  {
    id: "1",
    email: "admin@rethread.org",
    password: "admin123",
    name: "Admin User",
    role: "admin" as UserRole,
  },
  {
    id: "2",
    email: "editor@rethread.org",
    password: "editor123",
    name: "Editor User",
    role: "editor" as UserRole,
  },
  {
    id: "3",
    email: "user@rethread.org",
    password: "user123",
    name: "Basic User",
    role: "user" as UserRole,
  },
];

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isClient, setIsClient] = useState(false);
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    setIsClient(true); // wait until we're on the client
  }, []);

  useEffect(() => {
    if (typeof window !== "undefined") {
      const storedUser = localStorage.getItem("user");
      if (storedUser) {
        setUser(JSON.parse(storedUser));
      }
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    if (!isLoading) {
      if (pathname?.startsWith("/admin") && (!user || user.role !== "admin")) {
        if (pathname.includes("/products") || pathname.includes("/articles")) {
          if (!user || (user.role !== "editor" && user.role !== "admin")) {
            router.push("/login?redirect=" + encodeURIComponent(pathname));
          }
        } else {
          router.push("/login?redirect=" + encodeURIComponent(pathname));
        }
      }
    }
  }, [pathname, user, isLoading]);

  const login = async (email: string, password: string) => {
    const foundUser = MOCK_USERS.find(
      (u) => u.email === email && u.password === password
    );

    if (foundUser) {
      const { password, ...userWithoutPassword } = foundUser;
      setUser(userWithoutPassword);
      localStorage.setItem("user", JSON.stringify(userWithoutPassword));
      return Promise.resolve();
    }

    return Promise.reject(new Error("Invalid email or password"));
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem("user");
    router.push("/");
  };

  if (!isClient) return null; // prevent SSR mismatch

  return (
    <AuthContext.Provider value={{ user, login, logout, isLoading }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
}

export { AuthContext };
