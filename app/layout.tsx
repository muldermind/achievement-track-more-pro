"use client";

import Script from "next/script";
import "../styles/globals.css";
import { Analytics } from "@vercel/analytics/react"; // ✅ toegevoegd

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        {/* Uploadcare widget */}
        <Script
          src="https://ucarecdn.com/libs/widget/3.x/uploadcare.full.min.js"
          strategy="beforeInteractive"
          charSet="utf-8"
        />
        {/* Confetti library */}
        <Script
          src="https://cdn.jsdelivr.net/npm/canvas-confetti@1.6.0/dist/confetti.browser.min.js"
          strategy="beforeInteractive"
        />

        {/* ✅ PWA META TAGS */}
        <link rel="manifest" href="/manifest.json" />
        <meta name="theme-color" content="#1E3A8A" />
        <link rel="apple-touch-icon" href="/icons/icon-192x192.png" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
      </head>
      <body className="bg-black text-white font-sans">
        {children}
        <Analytics /> {/* ✅ toegevoegd */}
      </body>
    </html>
  );
}
