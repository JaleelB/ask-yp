import Header from "@/components/header";
import "./globals.css";
import { Inter } from "next/font/google";
import { Toaster } from "@/components/ui/toaster"
import { siteConfig } from "@/lib/site-config";
import { Analytics } from '@vercel/analytics/react';


const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: {
    default: siteConfig.name
  },
  description: siteConfig.description,
  keywords: [
    "AskYP",
    "AI chatbot",
    "local business",
    "Yelp integration",
    "restaurant recommendations",
    "business reviews",
    "local insights",
    "AI-powered search",
    "nearby services",
    "customer ratings",
    "Yelp-based search",
    "chatbot recommendations",
    "best local businesses"
  ],
  authors: [
    {
      name: "jaleelb",
      url: "https://jaleelbennett.com",
    },
  ],
  creator: "jaleelb",
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "white" },
    { media: "(prefers-color-scheme: dark)", color: "black" },
  ],
  openGraph: {
    type: "website",
    locale: "en_US",
    url: siteConfig.url,
    title: siteConfig.name,
    description: siteConfig.description,
    siteName: siteConfig.name,
    images: [
      {
        url: `${siteConfig.url}/web-shot.png`,
        width: 1200,
        height: 715,
        alt: siteConfig.name,
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: siteConfig.name,
    description: siteConfig.description,
    images: [`${siteConfig.url}/web-shot.png`],
    creator: "@jal_eelll",
  }
}


export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {

  return (
    <html lang="en">
      <body className={inter.className}>
        <div className="flex h-screen flex-col overflow-hidden">
          <Header/>
          {children}
          <Toaster />
          <Analytics />
        </div>
      </body>
    </html>
  );
}