'use client';

import { useTranslations } from 'next-intl';

export default function PartnersSection() {
  const t = useTranslations('partners');

  const partners = [
    {
      name: t('items.nvidia.name'),
      description: t('items.nvidia.description'),
      logo: "/img/brands/partners/NVIDIA Inception Program.jpeg",
      link: "https://www.nvidia.com/en-us/startups/",
      placeholder: false
    },
    {
      name: t('items.nus.name'),
      description: t('items.nus.description'),
      logo: "/img/brands/partners/B71_BrandSig_RGB.png",
      secondaryLogo: "/img/brands/partners/nus-logo.png",
      link: "https://enterprise.nus.edu.sg/",
      placeholder: false
    },
    {
      name: t('items.kcl.name'),
      description: t('items.kcl.description'),
      logo: "/img/brands/partners/king's college london (kcl) war studies.jpg",
      link: "https://www.kcl.ac.uk/warstudies",
      placeholder: false
    },
    {
      name: t('items.autodesk.name'),
      description: t('items.autodesk.description'),
      logo: "/img/brands/partners/autodesk foundation.jpg",
      link: "https://www.autodesk.org/",
      placeholder: false
    }
  ];

  return (
    <section id="partners" className="relative py-16 bg-tactical-surface border-t border-white/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="mb-12 text-center">
          <h3 className="text-2xl font-bold text-white mb-3">
            {t('title')}
          </h3>
          <p className="text-tactical-textDim text-sm max-w-3xl mx-auto">
            {t('description')}
          </p>
        </div>

        {/* Partners Grid */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
          {partners.map((partner, index) => (
            <a
              key={index}
              href={partner.link}
              target="_blank"
              rel="noopener noreferrer"
              className="group tactical-border p-6 bg-white/5 hover:bg-white/10 transition-all duration-300 text-center"
            >
              {/* Logo Placeholder */}
              {partner.placeholder ? (
                <div className="h-20 flex items-center justify-center mb-4 bg-white/5 rounded border border-white/10">
                  <span className="text-tactical-textDim text-xs font-mono">
                    {partner.name} Logo
                  </span>
                </div>
              ) : partner.secondaryLogo ? (
                <div className="h-20 flex items-center justify-center gap-3 mb-4">
                  <img
                    src={partner.logo}
                    alt={partner.name}
                    className="max-h-full max-w-[45%] object-contain"
                  />
                  <img
                    src={partner.secondaryLogo}
                    alt={partner.name}
                    className="max-h-full max-w-[45%] object-contain"
                  />
                </div>
              ) : (
                <div className="h-20 flex items-center justify-center mb-4">
                  <img
                    src={partner.logo}
                    alt={partner.name}
                    className="max-h-full max-w-full object-contain"
                  />
                </div>
              )}

              {/* Partner Name */}
              <h4 className="font-bold text-white mb-2 group-hover:text-tactical-accent transition-colors">
                {partner.name}
              </h4>

              {/* Description */}
              <p className="text-xs text-tactical-textDim">
                {partner.description}
              </p>
            </a>
          ))}
        </div>

      </div>
    </section>
  );
}
