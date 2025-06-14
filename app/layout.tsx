import type React from "react";
import "@/app/globals.css";
import { Inter } from "next/font/google";
import { ThemeProvider } from "@/components/theme-provider";
import { Header } from "@/components/header/Header";
import { AuthProvider } from "@/components/auth-provider";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Rethread - The Or Foundation",
  description: "Exploring the global impact of second-hand clothing trade",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <AuthProvider>
          <ThemeProvider
            attribute="class"
            defaultTheme="light"
            enableSystem
            disableTransitionOnChange
          >
            <Header />
            {children}
          </ThemeProvider>
        </AuthProvider>
      </body>
    </html>
  );
}
