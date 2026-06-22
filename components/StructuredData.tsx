/**
 * StructuredData Component
 *
 * Provides Schema.org JSON-LD structured data for improved SEO and rich snippets.
 * Includes Organization, WebSite schemas to help search engines understand the business.
 */

export default function StructuredData() {
  const baseUrl = "https://www.nervsystems.com";

  // Organization Schema
  const organizationSchema = {
    "@context": "https://schema.org",
    "@type": "Organization",
    "@id": `${baseUrl}/#organization`,
    "name": "NERV Systems",
    "legalName": "NERV Systems",
    "url": baseUrl,
    "logo": {
      "@type": "ImageObject",
      "url": `${baseUrl}/img/nerv-logo.png`,
      "caption": "NERV Systems Logo"
    },
    "description": "Advanced TAK/ATAK solutions with AI mission planning for defense, HADR, and emergency response. NERVA AI assistant for disaster relief coordination, search & rescue, and humanitarian operations. Managed TAK hosting, deployment consulting, and training for Asia Pacific.",
    "email": "contact@nervsystems.com",
    "areaServed": {
      "@type": "Place",
      "name": "Asia Pacific"
    },
    "knowsAbout": [
      "TAK Solutions",
      "ATAK Platform",
      "AI Mission Planning",
      "Tactical AI",
      "Edge Computing",
      "Drone Integration",
      "Defense Technology",
      "Team Awareness Kit",
      "HADR Operations",
      "Humanitarian Assistance and Disaster Relief",
      "Emergency Response Coordination",
      "Search and Rescue Technology",
      "Disaster Relief Operations",
      "Crisis Response",
      "Emergency Management",
      "AI Agent Security",
      "Verifiable AI Safety",
      "Namespace Isolation",
      "Formally Verified Systems",
      "Secure AI Agent Runtime"
    ],
    "sameAs": [
      "https://github.com/NERVsystems",
      "https://www.youtube.com/@nervsystems",
      "https://x.com/NERVSysOffical"
    ],
    "memberOf": [
      {
        "@type": "Organization",
        "name": "NVIDIA Inception"
      },
      {
        "@type": "Organization",
        "name": "NUS Enterprise"
      },
      {
        "@type": "Organization",
        "name": "King's College London"
      },
      {
        "@type": "Organization",
        "name": "European Defense Tech Hub"
      },
      {
        "@type": "Organization",
        "name": "Singapore Defence Tech Hackathon"
      }
    ],
    "funder": {
      "@type": "Organization",
      "name": "Autodesk Foundation",
      "url": "https://www.autodesk.org/"
    },
    "makesOffer": [
      {
        "@type": "Offer",
        "itemOffered": {
          "@type": "Service",
          "name": "TAK Server Hosting",
          "description": "Managed TAK hosting solutions"
        }
      },
      {
        "@type": "Offer",
        "itemOffered": {
          "@type": "Service",
          "name": "TAK Deployment Consulting",
          "description": "Expert TAK deployment and integration consulting"
        }
      },
      {
        "@type": "Offer",
        "itemOffered": {
          "@type": "Service",
          "name": "TAK Training",
          "description": "TAK platform training for Asia Pacific region"
        }
      },
      {
        "@type": "Offer",
        "itemOffered": {
          "@type": "SoftwareApplication",
          "name": "NERVA AI Assistant",
          "description": "AI-powered mission planning and tactical decision support",
          "applicationCategory": "BusinessApplication",
          "operatingSystem": "TAK, ATAK"
        }
      },
      {
        "@type": "Offer",
        "itemOffered": {
          "@type": "Service",
          "name": "HADR Operations Support",
          "description": "TAK solutions for humanitarian assistance, disaster relief, emergency response, and search & rescue operations"
        }
      },
      {
        "@type": "Offer",
        "itemOffered": {
          "@type": "SoftwareApplication",
          "name": "InferNode",
          "description": "Lightweight, distributed runtime for AI agents with formally verified namespace isolation. Each agent's reach is defined by an inspectable configuration and enforced by the operating system.",
          "applicationCategory": "DeveloperApplication",
          "operatingSystem": "Linux, Edge"
        }
      }
    ]
  };

  // WebSite Schema with Search Action
  const webSiteSchema = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "@id": `${baseUrl}/#website`,
    "url": baseUrl,
    "name": "NERV Systems",
    "description": "AI-Powered TAK Platform for Mission Success",
    "publisher": {
      "@id": `${baseUrl}/#organization`
    },
    "inLanguage": "en-US"
  };

  // Software Application Schema for NERVA
  const softwareSchema = {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    "@id": `${baseUrl}/#nerva`,
    "name": "NERVA",
    "applicationCategory": "BusinessApplication",
    "description": "AI assistant for mission planning, autonomous operations, and intelligent decision support integrated with TAK/ATAK platforms",
    "operatingSystem": "TAK, ATAK",
    "offers": {
      "@type": "Offer",
      "price": "0",
      "priceCurrency": "USD",
      "availability": "https://schema.org/InStock"
    },
    "provider": {
      "@id": `${baseUrl}/#organization`
    },
    "featureList": [
      "AI Mission Planning",
      "Autonomous Operations",
      "TAK Integration",
      "Edge AI Computing",
      "Drone Integration",
      "Tactical Decision Support",
      "HADR Coordination",
      "Search and Rescue Operations",
      "Disaster Response Planning",
      "Emergency Management"
    ]
  };

  // Software Application Schema for InferNode
  const infernodeSchema = {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    "@id": `${baseUrl}/#infernode`,
    "name": "InferNode",
    "applicationCategory": "DeveloperApplication",
    "description": "Lightweight, distributed runtime for AI agents with formally verified namespace isolation. Each agent's reach is defined by an inspectable configuration—reviewable by humans, checkable by machines, and enforced by the operating system itself.",
    "operatingSystem": "Linux, Edge",
    "url": "https://infernode.io",
    "sameAs": [
      "https://infernode.io",
      "https://github.com/pdfinn/infernode.io"
    ],
    "license": "https://opensource.org/licenses/MIT",
    "offers": {
      "@type": "Offer",
      "price": "0",
      "priceCurrency": "USD",
      "availability": "https://schema.org/InStock"
    },
    "provider": {
      "@id": `${baseUrl}/#organization`
    },
    "featureList": [
      "Formally Verified Namespace Isolation",
      "TLA+ / SPIN / CBMC Verification",
      "Inspectable Agent Configuration",
      "OS-Enforced Boundaries",
      "Distributed Agent Runtime",
      "Edge Deployment",
      "Open Source (MIT Licensed)"
    ]
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(webSiteSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(softwareSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(infernodeSchema) }}
      />
    </>
  );
}
