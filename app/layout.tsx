import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "@/src/index.css";
import { Toaster } from "@/src/components/ui/toaster";
import { Toaster as Sonner } from "@/src/components/ui/sonner";
import { TooltipProvider } from "@/src/components/ui/tooltip";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Creative Developer & Designer Portfolio",
  description: "Full-stack developer portfolio showcasing innovative web solutions, 3D experiences, and cutting-edge design",
  keywords: ["web developer", "full-stack", "3D web", "React", "Three.js", "portfolio"],
  authors: [{ name: "Portfolio Owner" }],
  openGraph: {
    title: "Creative Developer & Designer Portfolio",
    description: "Innovative web solutions and cutting-edge design",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={inter.className} suppressHydrationWarning>
        <TooltipProvider>
          <Toaster />
          <Sonner />
          {children}
        </TooltipProvider>
      </body>
    </html>
  );
}
