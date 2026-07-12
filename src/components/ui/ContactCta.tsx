import Link from "next/link";

export default function ContactCta({
  title = "まだ整理できていない相談から、一緒に始めましょう。",
  body = "Web、SNS、採用、事業づくり、地域での取り組み、飲食、水耕栽培など、相談内容がまとまっていない段階でも構いません。",
}: {
  title?: string;
  body?: string;
}) {
  return (
    <section className="bg-clay py-20 text-warm-white sm:py-24" aria-labelledby="contact-cta-heading">
      <div className="mx-auto max-w-[900px] text-center" style={{ paddingInline: "var(--page-gutter)" }}>
        <h2 id="contact-cta-heading" className="type-jp-heading text-2xl leading-snug sm:text-3xl">
          {title}
        </h2>
        <p className="type-jp-body mx-auto mt-5 max-w-lg text-sm text-warm-white/85">{body}</p>
        <Link
          href="/contact"
          className="type-label mt-8 inline-flex rounded-full bg-warm-white px-8 py-3.5 text-[11px] text-ink transition-transform hover:-translate-y-0.5"
        >
          相談の入口をつくる
        </Link>
      </div>
    </section>
  );
}
