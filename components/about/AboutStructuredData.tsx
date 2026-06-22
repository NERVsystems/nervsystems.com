/**
 * AboutStructuredData
 *
 * Page-specific Schema.org JSON-LD for the About page: an AboutPage node
 * tied to the global Organization/WebSite entities, plus a BreadcrumbList.
 */
import { defaultLocale } from '@/i18n/config';

const baseUrl = 'https://www.nervsystems.com';

export default function AboutStructuredData({ locale }: { locale: string }) {
  const homeUrl = locale === defaultLocale ? baseUrl : `${baseUrl}/${locale}`;
  const aboutUrl = `${homeUrl}/about`;

  const aboutPageSchema = {
    "@context": "https://schema.org",
    "@type": "AboutPage",
    "@id": `${aboutUrl}#aboutpage`,
    "url": aboutUrl,
    "name": "About NERV Systems",
    "description": "NERV Systems builds AI-augmented TAK/ATAK technology for defence and life-saving missions, with work aligned to the UN Sustainable Development Goals.",
    "isPartOf": { "@id": `${baseUrl}/#website` },
    "about": { "@id": `${baseUrl}/#organization` },
    "inLanguage": locale,
  };

  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": [
      {
        "@type": "ListItem",
        "position": 1,
        "name": "Home",
        "item": homeUrl,
      },
      {
        "@type": "ListItem",
        "position": 2,
        "name": "About",
        "item": aboutUrl,
      },
    ],
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(aboutPageSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />
    </>
  );
}
