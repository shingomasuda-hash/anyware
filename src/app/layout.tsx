import type { Metadata, Viewport } from "next";
import { Manrope, Noto_Sans_JP } from "next/font/google";
import "./globals.css";
import { siteConfig } from "@/data/site";
import { buildMetadata, organizationJsonLd } from "@/lib/seo";
import SiteHeader from "@/components/layout/SiteHeader";
import SiteFooter from "@/components/layout/SiteFooter";
import GrainOverlay from "@/components/ui/GrainOverlay";
import MotionProvider from "@/components/motion/MotionProvider";

const display = Manrope({
  subsets: ["latin"],
  weight: ["500", "600", "700", "800"],
  variable: "--font-display",
  display: "swap",
});

const jp = Noto_Sans_JP({
  subsets: ["latin"],
  weight: ["400", "500", "700", "900"],
  variable: "--font-jp",
  display: "swap",
});

export const metadata: Metadata = {
  ...buildMetadata({
    title: siteConfig.defaultTitle,
    description: siteConfig.defaultDescription,
    path: "/",
  }),
  metadataBase: new URL(siteConfig.baseUrl),
  icons: {
    icon: "/favicon.svg",
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: siteConfig.themeColor,
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ja" className={`${display.variable} ${jp.variable}`}>
      <body className="type-jp-body">
        <script
          type="application/ld+json"
          // eslint-disable-next-line react/no-danger
          dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationJsonLd()) }}
        />
        <a href="#main-content" className="skip-link">
          本文へスキップ
        </a>
        <MotionProvider>
          <SiteHeader />
          <main id="main-content">{children}</main>
          <SiteFooter />
        </MotionProvider>
        <GrainOverlay />
      </body>
    </html>
  );
}
