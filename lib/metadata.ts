import type { Metadata } from "next";
import { SITE_URL } from "./site";

type SiteMetadataOptions = {
  title: string;
  description: string;
  path?: string;
};

export function buildPageMetadata({
  title,
  description,
  path = "",
}: SiteMetadataOptions): Metadata {
  const url = `${SITE_URL}${path}`;
  const fullTitle = path === "" || path === "/" ? title : `${title} · AI Garage`;

  return {
    title: fullTitle,
    description,
    metadataBase: new URL(SITE_URL),
    alternates: { canonical: url },
    openGraph: {
      type: "website",
      locale: "en_US",
      url,
      siteName: "AI Garage",
      title: fullTitle,
      description,
    },
    twitter: {
      card: "summary_large_image",
      title: fullTitle,
      description,
    },
  };
}
