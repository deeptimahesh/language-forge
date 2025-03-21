import type { Metadata } from "next";
import { Inter, Montserrat } from "next/font/google";
import "./globals.css";

const montserrat = Montserrat({
  variable: "--font-montserrat",
  subsets: ["latin"],
  display: "swap",
  weight: ["400", "500", "600", "700"],
});

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Language Forge | Create Constructed Languages",
  description: "Create conlangs with AI-powered assistance. Perfect for worldbuilders, fiction writers, linguists, and language enthusiasts.",
  keywords: ["conlang", "constructed language", "worldbuilding", "linguistics", "language creation", "AI"],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="h-full">
      <body
        className={`${montserrat.variable} ${inter.variable} font-sans min-h-full`}
      >
        {children}
      </body>
    </html>
  );
}
