import type { Metadata } from "next";
import { NextIntlClientProvider } from 'next-intl';
import { getMessages } from 'next-intl/server';
import { notFound } from 'next/navigation';
import { locales, defaultLocale } from '@/i18n/config';
import Analytics from "@/components/Analytics";
import StructuredData from "@/components/StructuredData";
import CookieNotice from "@/components/CookieNotice";

const baseUrl = 'https://www.nervsystems.com';

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;

  // Build canonical URL - for default locale (en), don't include /en/ prefix
  const canonicalUrl = locale === defaultLocale
    ? baseUrl
    : `${baseUrl}/${locale}`;

  // Build language alternates for hreflang tags
  const languages: Record<string, string> = {};
  locales.forEach((loc) => {
    languages[loc] = loc === defaultLocale ? baseUrl : `${baseUrl}/${loc}`;
  });

  return {
  metadataBase: new URL(baseUrl),
  title: "NERV Systems | AI-Powered TAK Platform for Mission Success",
  description: "Advanced TAK/ATAK solutions with AI mission planning for defense, HADR, and emergency response. NERVA AI assistant for autonomous operations, disaster relief coordination, and search & rescue. Managed TAK hosting, deployment consulting, and training for Asia Pacific.",
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
    "tactical edge computing",
    "MOSA compliant",
    "Modular Open System Architecture",
    "open systems architecture",
    "HADR operations",
    "humanitarian assistance disaster relief",
    "disaster response coordination",
    "emergency response TAK",
    "search and rescue technology",
    "crisis response platform",
    "humanitarian operations software",
    "disaster relief coordination",
    "emergency management TAK",
    "SAR operations",
    "OSINT platform",
    "open source intelligence",
    "OSINT tools",
    "geospatial intelligence",
    "GEOINT software",
    "intelligence analysis TAK",
    "investigative journalism tools",
    "OSINT mapping",
    "entity tracking",
    "multi-source intelligence fusion",
    "OSINT visualization",
    "research team collaboration",
    "intelligence gathering platform"
  ],
  authors: [{ name: "NERV Systems" }],
  alternates: {
    canonical: canonicalUrl,
    languages: languages,
  },
  icons: {
    icon: [
      { url: '/favicon-16x16.png', sizes: '16x16', type: 'image/png' },
      { url: '/favicon-32x32.png', sizes: '32x32', type: 'image/png' },
      { url: '/favicon.ico', sizes: 'any' }
    ],
    apple: [
      { url: '/apple-touch-icon.png', sizes: '180x180', type: 'image/png' }
    ],
    other: [
      { rel: 'manifest', url: '/site.webmanifest' }
    ]
  },
  openGraph: {
    title: "NERV Systems | AI-Powered TAK Platform for Mission Success",
    description: "TAK/ATAK solutions with AI mission planning for defense, HADR, and emergency response. Disaster relief coordination, search & rescue, and humanitarian operations across Asia Pacific.",
    url: canonicalUrl,
    siteName: "NERV Systems",
    type: "website",
    locale: locale,
    images: [
      {
        url: "/img/nerv-logo.png",
        width: 1200,
        height: 630,
        alt: "NERV Systems - AI-Powered TAK Platform",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "NERV Systems | AI-Powered TAK Platform",
    description: "TAK/ATAK solutions for defense, HADR, and emergency response. AI-powered disaster relief and search & rescue coordination.",
    images: ["/img/nerv-logo.png"],
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
}

export default async function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;

  // Ensure that the incoming `locale` is valid
  if (!locales.includes(locale as any)) {
    notFound();
  }

  // Providing all messages to the client side is the easiest way to get started
  const messages = await getMessages();

  return (
    <html lang={locale}>
      <body className="antialiased">
        <NextIntlClientProvider messages={messages}>
          <StructuredData />
          <Analytics gaId={process.env.NEXT_PUBLIC_GA_ID} />
          {children}
          <CookieNotice />
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
