import type { Metadata, Viewport } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { Footer } from '@/components/ui/footer';
import { Navigation } from '@/components/ui/navigation';
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
  viewportFit: "cover",
  themeColor: "#3b82f6",
  colorScheme: "dark light",
};

export const metadata: Metadata = {
  title: "FlashLearn™ EMT - ProMedixEMS™",
  description: "Next-generation EMT flashcards built for modern EMS students. Master all 45 EMT chapters with adaptive learning and spaced repetition.",
  keywords: [
    "EMT",
    "Emergency Medical Technician", 
    "flashcards",
    "medical education",
    "EMS training",
    "certification prep",
    "ProMedixEMS",
    "adaptive learning",
    "spaced repetition"
  ],
  authors: [{ name: "Shaun Williamson", url: "https://promedixems.com" }],
  creator: "ProMedixEMS™",
  publisher: "ProMedixEMS™",
  applicationName: "FlashLearn™ EMT",
  category: "Education",
  classification: "Medical Education",
  manifest: "/manifest.json",
  appleWebApp: {
    capable: true,
    statusBarStyle: "black-translucent",
    title: "FlashLearn™ EMT",
    startupImage: [
      {
        url: "/apple-touch-startup-image-768x1004.png",
        media: "(device-width: 768px) and (device-height: 1024px) and (-webkit-device-pixel-ratio: 1)",
      },
      {
        url: "/apple-touch-startup-image-1536x2008.png", 
        media: "(device-width: 768px) and (device-height: 1024px) and (-webkit-device-pixel-ratio: 2)",
      },
      {
        url: "/apple-touch-startup-image-1668x2224.png",
        media: "(device-width: 834px) and (device-height: 1112px) and (-webkit-device-pixel-ratio: 2)",
      },
      {
        url: "/apple-touch-startup-image-2048x2732.png",
        media: "(device-width: 1024px) and (device-height: 1366px) and (-webkit-device-pixel-ratio: 2)",
      },
      {
        url: "/apple-touch-startup-image-828x1792.png",
        media: "(device-width: 414px) and (device-height: 896px) and (-webkit-device-pixel-ratio: 2)",
      },
      {
        url: "/apple-touch-startup-image-1242x2208.png",
        media: "(device-width: 414px) and (device-height: 736px) and (-webkit-device-pixel-ratio: 3)",
      },
      {
        url: "/apple-touch-startup-image-750x1334.png",
        media: "(device-width: 375px) and (device-height: 667px) and (-webkit-device-pixel-ratio: 2)",
      },
      {
        url: "/apple-touch-startup-image-1125x2436.png",
        media: "(device-width: 375px) and (device-height: 812px) and (-webkit-device-pixel-ratio: 3)",
      }
    ]
  },
  formatDetection: {
    telephone: false,
    date: false,
    address: false,
    email: false,
    url: false
  },
  icons: {
    icon: [
      { url: "/icon-16x16.png", sizes: "16x16", type: "image/png" },
      { url: "/icon-32x32.png", sizes: "32x32", type: "image/png" },
      { url: "/icon-192x192.png", sizes: "192x192", type: "image/png" },
      { url: "/icon-512x512.png", sizes: "512x512", type: "image/png" }
    ],
    apple: [
      { url: "/apple-touch-icon-57x57.png", sizes: "57x57", type: "image/png" },
      { url: "/apple-touch-icon-60x60.png", sizes: "60x60", type: "image/png" },
      { url: "/apple-touch-icon-72x72.png", sizes: "72x72", type: "image/png" },
      { url: "/apple-touch-icon-76x76.png", sizes: "76x76", type: "image/png" },
      { url: "/apple-touch-icon-114x114.png", sizes: "114x114", type: "image/png" },
      { url: "/apple-touch-icon-120x120.png", sizes: "120x120", type: "image/png" },
      { url: "/apple-touch-icon-144x144.png", sizes: "144x144", type: "image/png" },
      { url: "/apple-touch-icon-152x152.png", sizes: "152x152", type: "image/png" },
      { url: "/apple-touch-icon-180x180.png", sizes: "180x180", type: "image/png" }
    ]
  },
  openGraph: {
    type: "website",
    siteName: "FlashLearn™ EMT - ProMedixEMS™",
    title: "FlashLearn™ EMT - Master EMT Certification",
    description: "Next-generation EMT flashcards with adaptive learning. 700+ cards across 45 chapters. Built for modern EMS students.",
    images: [
      {
        url: "/og-image-1200x630.png",
        width: 1200,
        height: 630,
        alt: "FlashLearn™ EMT - Professional EMT Study Application"
      }
    ]
  },
  twitter: {
    card: "summary_large_image",
    site: "@ProMedixEMS",
    creator: "@ShaunWilliamson",
    title: "FlashLearn™ EMT - Master EMT Certification",
    description: "Next-generation EMT flashcards with adaptive learning. 700+ cards across 45 chapters.",
    images: ["/twitter-image-1200x600.png"]
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1
    }
  },
  other: {
    "mobile-web-app-capable": "yes",
    "msapplication-TileColor": "#3b82f6",
    "msapplication-TileImage": "/mstile-144x144.png",
    "msapplication-config": "/browserconfig.xml",
    "HandheldFriendly": "true",
    "MobileOptimized": "320"
  }
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        {/* Security Headers */}
        <meta httpEquiv="Content-Security-Policy" content="default-src 'self'; script-src 'self' 'unsafe-inline' 'unsafe-eval'; style-src 'self' 'unsafe-inline' https://fonts.googleapis.com; font-src 'self' https://fonts.gstatic.com; img-src 'self' data: https:; connect-src 'self' https:;" />
        <meta httpEquiv="X-Content-Type-Options" content="nosniff" />
        <meta httpEquiv="X-Frame-Options" content="DENY" />
        <meta httpEquiv="X-XSS-Protection" content="1; mode=block" />
        
        {/* Performance Hints */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link rel="dns-prefetch" href="https://fonts.googleapis.com" />
        <link rel="dns-prefetch" href="https://fonts.gstatic.com" />
        
        {/* Schema.org markup for educational apps */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "MobileApplication",
              "name": "FlashLearn™ EMT",
              "applicationCategory": "EducationalApplication",
              "operatingSystem": "iOS, Android, Web",
              "description": "Next-generation EMT flashcards built for modern EMS students. Master all 45 EMT chapters with adaptive learning.",
              "offers": {
                "@type": "Offer",
                "price": "14.99",
                "priceCurrency": "USD"
              },
              "author": {
                "@type": "Person",
                "name": "Shaun Williamson"
              },
              "publisher": {
                "@type": "Organization",
                "name": "ProMedixEMS™"
              },
              "aggregateRating": {
                "@type": "AggregateRating",
                "ratingValue": "4.8",
                "reviewCount": "150"
              }
            })
          }}
        />
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <div className="min-h-screen flex flex-col">
          <Navigation />
          <main className="flex-1">
            {children}
          </main>
          <Footer />
        </div>
      </body>
    </html>
  );
}
