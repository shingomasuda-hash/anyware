import type { Metadata } from "next";
import { siteConfig } from "@/data/site";
import { buildMetadata } from "@/lib/seo";
import HeroDistrict from "@/components/home/HeroDistrict";
import PhilosophySection from "@/components/home/PhilosophySection";
import BusinessDistrict from "@/components/home/BusinessDistrict";
import EcosystemFlow from "@/components/home/EcosystemFlow";
import WorksArchive from "@/components/home/WorksArchive";
import RealBusiness from "@/components/home/RealBusiness";
import MVVSection from "@/components/home/MVVSection";
import CompanyGateway from "@/components/home/CompanyGateway";
import RecruitGateway from "@/components/home/RecruitGateway";
import ContactGateway from "@/components/home/ContactGateway";

export const metadata: Metadata = buildMetadata({
  title: siteConfig.defaultTitle,
  description: siteConfig.defaultDescription,
  path: "/",
});

export default function HomePage() {
  return (
    <>
      <HeroDistrict />
      <PhilosophySection />
      <BusinessDistrict />
      <EcosystemFlow />
      <WorksArchive />
      <RealBusiness />
      <MVVSection />
      <section className="bg-warm-white" aria-label="会社概要と採用情報">
        <div
          className="mx-auto grid max-w-[1300px] lg:grid-cols-2"
          style={{ paddingInline: "var(--page-gutter)" }}
        >
          <CompanyGateway />
          <RecruitGateway />
        </div>
      </section>
      <ContactGateway />
    </>
  );
}
