import { HomePage } from "@/components/home-page";
import { business, services } from "@/lib/site-config";

const jsonLd = {
  "@context": "https://schema.org",
  "@type": ["LocalBusiness", "HomeAndConstructionBusiness"],
  name: business.name,
  areaServed: business.market,
  telephone: `+${business.phoneNormalized}`,
  url: "https://ge-cleaning-services.vercel.app",
  sameAs: [business.instagram],
  contactPoint: [
    {
      "@type": "ContactPoint",
      telephone: `+${business.phoneNormalized}`,
      contactType: "customer service",
      availableLanguage: "English",
      areaServed: business.market,
    },
  ],
  hasOfferCatalog: {
    "@type": "OfferCatalog",
    name: "Cleaning Services",
    itemListElement: services.map((service) => ({
      "@type": "Offer",
      itemOffered: {
        "@type": "Service",
        name: service,
        areaServed: business.market,
      },
    })),
  },
};

export default function Page() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <HomePage />
    </>
  );
}
