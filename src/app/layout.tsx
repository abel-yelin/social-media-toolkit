import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import ClientBody from "./ClientBody";
import { SessionProvider } from "@/components/SessionProvider";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "AI Comments - Smart Social Media Comment Management Tools | Instagram, TikTok, YouTube Analytics",
  description: "AI Comments provides powerful social media comment management tools. Export comments from Instagram, TikTok, YouTube, Facebook. AI-powered giveaway picker, comment generator, and analytics. Free to use.",
  keywords: ["social media tools", "comment management", "Instagram tools", "TikTok tools", "YouTube comments", "giveaway picker", "AI comments", "social media analytics", "comment export", "influencer tools"],
  authors: [{ name: "AI Comments Team" }],
  creator: "AI Comments",
  publisher: "AI Comments",
  robots: "index, follow",
  viewport: "width=device-width, initial-scale=1",
  themeColor: "#3B82F6",
  category: "Social Media Tools",
  openGraph: {
    type: "website",
    locale: "en_US",
    alternateLocale: ["zh_CN"],
    url: "https://www.aicomments.online",
    siteName: "AI Comments",
    title: "AI Comments - Smart Social Media Comment Management Tools",
    description: "Professional social media comment management and analytics platform. Export comments, run giveaways, and generate AI-powered content across multiple platforms.",
    images: [
      {
        url: "https://www.aicomments.online/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "AI Comments - Smart Social Media Comment Management Tools",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    site: "@aicomments",
    creator: "@aicomments",
    title: "AI Comments - Smart Social Media Comment Management Tools",
    description: "Professional social media comment management and analytics platform. Export comments, run giveaways, and generate AI-powered content across multiple platforms.",
    images: ["https://www.aicomments.online/twitter-card.jpg"],
  },
  verification: {
    google: "your-google-verification-code",
    other: {
      bing: "your-bing-verification-code",
    },
  },
  alternates: {
    canonical: "https://www.aicomments.online",
    languages: {
      "en-US": "https://www.aicomments.online",
      "zh-CN": "https://www.aicomments.online/zh",
    },
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${geistSans.variable} ${geistMono.variable}`}>
      <head>
        {/* SEO Meta Tags */}
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=5" />
        <meta name="format-detection" content="telephone=no" />

        {/* Structured Data */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "SoftwareApplication",
              "name": "AI Comments",
              "url": "https://www.aicomments.online",
              "description": "Professional social media comment management and analytics platform",
              "applicationCategory": "BusinessApplication",
              "operatingSystem": "Web",
              "offers": {
                "@type": "Offer",
                "price": "0",
                "priceCurrency": "USD",
                "availability": "https://schema.org/InStock"
              },
              "aggregateRating": {
                "@type": "AggregateRating",
                "ratingValue": "4.6",
                "reviewCount": "1000"
              },
              "featureList": [
                "Instagram Comment Export",
                "TikTok Comment Analytics",
                "YouTube Comment Management",
                "Smart Giveaway Picker",
                "AI Comment Generation"
              ]
            })
          }}
        />

        {/* Favicon */}
        <link rel="icon" href="/favicon.ico" />
        <link rel="apple-touch-icon" href="/apple-touch-icon.png" />

        {/* Preconnect for performance */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="" />

        {/* DNS Prefetch */}
        <link rel="dns-prefetch" href="//www.google-analytics.com" />
      </head>
      <body suppressHydrationWarning className="antialiased">
        <SessionProvider>
          <ClientBody>{children}</ClientBody>
        </SessionProvider>
      </body>
    </html>
  );
}
