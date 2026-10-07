import type { Metadata } from "next";
import Image from 'next/image';
import { notFound } from 'next/navigation';
import TacticalNav from '@/components/TacticalNav';
import Footer from '@/components/Footer';
import { defaultLocale } from '@/i18n/config';

// Unlisted team page: not linked from navigation, excluded from the sitemap,
// and marked noindex. Reachable only by direct URL. English only.

export const metadata: Metadata = {
  title: "Team | NERV Systems",
  robots: {
    index: false,
    follow: false,
    nocache: true,
    googleBot: { index: false, follow: false, noimageindex: true },
  },
};

const team = [
  {
    name: 'Dr Peter Finn',
    image: '/img/team/peter-finn.jpg',
    roles: [
      'Founder',
      'Lead Security Officer',
      'Researcher, Marine Corps Cyber Auxiliary',
    ],
  },
  {
    name: 'Leo Lu',
    image: '/img/team/leo-lu.jpg',
    roles: ['Chief Scientist'],
    bio: 'Former BAE Systems Principal Scientist and MIT Lincoln Laboratory. Sensor fusion, signals processing, EO/IR detect-classify-track, radar, and EW.',
  },
  {
    name: 'Christopher Lo',
    image: '/img/team/christopher-lo.jpg',
    roles: ['Advisor'],
    bio: 'West Point and Naval Postgraduate School. 23-year military career including multinational coalition operations. Serial entrepreneur.',
  },
];

export default async function CrewPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  if (locale !== defaultLocale) notFound();

  return (
    <main className="min-h-screen bg-tactical-bg">
      <TacticalNav />
      <section className="relative pt-32 pb-24 bg-tactical-bg overflow-hidden">
        <div className="absolute inset-0 grid-bg opacity-10"></div>

        <div className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="font-mono text-sm text-tactical-accent mb-4 uppercase tracking-[0.2em]">
            Personnel
          </div>
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-16">
            The NERV Team
          </h1>

          <div className="grid gap-8 md:grid-cols-3">
            {team.map((member, i) => (
              <div
                key={member.name}
                className="hud-corner tactical-border bg-tactical-surface p-6"
              >
                <div className="relative aspect-square mb-6 overflow-hidden border border-tactical-accent/20">
                  <Image
                    src={member.image}
                    alt={member.name}
                    fill
                    sizes="(min-width: 768px) 33vw, 100vw"
                    className="object-cover grayscale-[30%]"
                  />
                </div>
                <div className="font-mono text-xs text-tactical-accent mb-2">
                  {String(i + 1).padStart(2, '0')}
                </div>
                <h2 className="text-2xl font-bold text-white mb-3">
                  {member.name}
                </h2>
                <ul className="font-mono text-sm text-tactical-text space-y-1 mb-4">
                  {member.roles.map((role) => (
                    <li key={role}>
                      <span className="text-tactical-accent">▸</span> {role}
                    </li>
                  ))}
                </ul>
                {member.bio && (
                  <p className="text-tactical-textDim leading-relaxed">
                    {member.bio}
                  </p>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>
      <Footer />
    </main>
  );
}
