import type { Metadata } from "next";
import "./globals.css";
import Analytics from "@/components/Analytics";

export const metadata: Metadata = {
  title: "NERV Systems | AI-Powered TAK Platform for Mission Success",
  description: "Advanced TAK/ATAK solutions with AI mission planning, autonomous operations, and intelligent drone integration. NERVA AI assistant, managed TAK hosting, deployment consulting, and training for Asia Pacific. TAK-native autonomous decision support.",
  keywords: [
    "TAK solutions",
    "ATAK platform",
    "AI-powered TAK",
    "intelligent ATAK",
    "TAK server hosting",
    "TAK deployment consulting",
    "TAK training Asia Pacific",
    "managed TAK hosting",
    "NERVA AI assistant",
    "tactical AI",
    "mission planning",
    "edge AI",
    "drone integration TAK",
    "TAK plugin development",
    "Team Awareness Kit",
    "TAK Singapore",
    "TAK Asia",
    "autonomous mission planning",
    "defense technology",
    "tactical edge computing"
  ],
  authors: [{ name: "NERV Systems" }],
  openGraph: {
    title: "NERV Systems | AI-Powered TAK Platform for Mission Success",
    description: "Advanced TAK/ATAK solutions with AI mission planning, autonomous operations, and intelligent drone integration. Managed hosting, consulting & training for Asia Pacific.",
    url: "https://www.nervsystems.com",
    siteName: "NERV Systems",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "NERV Systems | AI-Powered TAK Platform",
    description: "TAK/ATAK solutions with AI mission planning and autonomous operations",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
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
      <body className="antialiased">
        <Analytics gaId={process.env.NEXT_PUBLIC_GA_ID} />
        {children}
      </body>
    </html>
  );
}
