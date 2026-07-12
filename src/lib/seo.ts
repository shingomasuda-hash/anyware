import type { Metadata } from "next";
import { siteConfig } from "@/data/site";

type PageSeoInput = {
  title: string;
  description: string;
  path: string;
  ogImagePath?: string;
  noIndex?: boolean;
};

export function buildMetadata({
  title,
  description,
  path,
  ogImagePath,
  noIndex,
}: PageSeoInput): Metadata {
  const url = `${siteConfig.baseUrl}${path}`;
  const image = ogImagePath ?? siteConfig.ogImagePath;

  return {
    title,
    description,
    alternates: {
      canonical: url,
    },
    robots: noIndex
      ? { index: false, follow: false }
      : { index: true, follow: true },
    openGraph: {
      title,
      description,
      url,
      siteName: siteConfig.brandName,
      locale: "ja_JP",
      type: "website",
      images: [{ url: image, width: 1200, height: 630 }],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [image],
    },
  };
}

export function organizationJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: siteConfig.legalName,
    alternateName: siteConfig.brandName,
    url: siteConfig.baseUrl,
    logo: `${siteConfig.baseUrl}${siteConfig.ogImagePath}`,
    description: siteConfig.defaultDescription,
    areaServed: siteConfig.contact.businessArea,
  };
}

export function articleJsonLd({
  title,
  description,
  path,
  datePublished,
}: {
  title: string;
  description: string;
  path: string;
  datePublished: string;
}) {
  return {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: title,
    description,
    datePublished,
    url: `${siteConfig.baseUrl}${path}`,
    publisher: {
      "@type": "Organization",
      name: siteConfig.legalName,
    },
  };
}

export function breadcrumbJsonLd(items: { name: string; path: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      item: `${siteConfig.baseUrl}${item.path}`,
    })),
  };
}
