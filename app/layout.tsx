import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "NERV | Tactical AI for Mission Planning and Edge Intelligence",
  description: "NERV is a next-generation Tactical AI platform engineered for autonomous mission planning, real-time decision support, and edge AI processing in contested, disconnected, and multi-domain environments.",
  keywords: ["tactical AI", "TAK", "ATAK", "mission planning", "edge intelligence", "defense technology"],
  authors: [{ name: "NERV Systems" }],
  openGraph: {
    title: "NERV | Tactical AI for Mission Planning",
    description: "Next-generation Tactical AI platform for autonomous mission planning and edge intelligence",
    url: "https://www.nervsystems.com",
    siteName: "NERV Systems",
    type: "website",
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
        {children}
      </body>
    </html>
  );
}
