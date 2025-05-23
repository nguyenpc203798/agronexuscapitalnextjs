import "./globals.css";
import type { Metadata } from "next";
import { Quicksand } from "next/font/google";
import Providers from "@/components/Providers";

const quicksand = Quicksand({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: {
    template: "%s | Agronexus Capital",
    default: "Agronexus Capital - Professional agricultural business",
  },
  description: "Providing Professional agricultural business for companies of all sizes in Vietnam",
  keywords: ["business", "trading", "consulting", "vietnam", "ho chi minh", "professional services"],
  authors: [{ name: "Agronexus Capital" }],
  creator: "Agronexus Capital",
  publisher: "Agronexus Capital",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  metadataBase: new URL("https://agronexuscapital.com"),
  alternates: {
    canonical: "/",
    languages: {
      "en-US": "/en-US",
      "vi-VN": "/vi-VN",
    },
  },
  icons: {
    icon: [
      { url: '/images/logo/smalllogo.png' },
      { url: '/images/logo/smalllogo.png', type: 'image/png', sizes: '32x32' },
      { url: '/images/logo/smalllogo.png', type: 'image/png', sizes: '16x16' },
    ],
    apple: [
      { url: '/images/logo/smalllogo.png' },
      { url: '/images/logo/smalllogo.png', sizes: '180x180', type: 'image/png' },
    ],
    shortcut: { url: '/images/logo/smalllogo.png' },
    other: [
      {
        rel: 'apple-touch-icon-precomposed',
        url: '/images/logo/smalllogo.png',
      },
      {
        rel: 'mask-icon',
        url: '/images/logo/smalllogo.png',
        color: '#00843D',
      },
    ],
  },
  manifest: '/manifest.json',
  openGraph: {
    title: "Agronexus Capital",
    description: "Providing Professional agricultural business for companies of all sizes in Vietnam",
    url: "https://agronexuscapital.com",
    siteName: "Agronexus Capital",
    locale: "en_US",
    type: "website",
    images: [
      {
        url: "https://agronexuscapital.com/images/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "Agronexus Capital - Professional agricultural business",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Agronexus Capital",
    description: "Providing Professional agricultural business for companies of all sizes in Vietnam",
    images: ["https://agronexuscapital.com/images/twitter-image.jpg"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={quicksand.className}>
        <Providers>{children}</Providers>
      </body>
    </html>
  );
} 