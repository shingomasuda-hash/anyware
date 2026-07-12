import type { Metadata } from "next";
import { buildMetadata } from "@/lib/seo";
import Breadcrumbs from "@/components/ui/Breadcrumbs";
import PageIntro from "@/components/ui/PageIntro";
import ContactForm from "@/components/forms/ContactForm";

export const metadata: Metadata = buildMetadata({
  title: "CONTACT｜お問い合わせ｜株式会社AnyWare",
  description:
    "株式会社AnyWareへのお問い合わせ。地域創生、ブランディング・PR、事業伴走、飲食、水耕栽培、採用など、まとまっていない段階のご相談もお気軽にどうぞ。",
  path: "/contact",
});

export default function ContactPage() {
  return (
    <>
      <Breadcrumbs items={[{ name: "TOP", path: "/" }, { name: "CONTACT", path: "/contact" }]} />
      <PageIntro
        eyebrow="LET'S MOVE SOMETHING"
        title="まだ整理できていない相談から、一緒に始めましょう。"
        lead="Web、SNS、採用、事業づくり、地域での取り組み、飲食、水耕栽培など、相談内容がまとまっていない段階でも構いません。"
        topOffset={false}
      />

      <section className="bg-warm-white pb-24 sm:pb-32">
        <div className="relative mx-auto max-w-[760px]" style={{ paddingInline: "var(--page-gutter)" }}>
          <ContactForm />
        </div>
      </section>
    </>
  );
}
