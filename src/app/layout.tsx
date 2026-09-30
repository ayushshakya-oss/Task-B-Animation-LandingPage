import type { Metadata } from "next";
import "./globals.css";
import { nohemi, oakesGrotesk, manrope, outfit } from "./fonts";

export const metadata: Metadata = {
  title: "Interactive Micro-Animations Showcase | GSAP & Next.js",
  description: "High-fidelity interactive UI implementations featuring vertical rolling tickers, draggable inertia gallery, and morphing course showcase accordion.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${nohemi.variable} ${oakesGrotesk.variable} ${manrope.variable} ${outfit.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col font-manrope">{children}</body>
    </html>
  );
}
