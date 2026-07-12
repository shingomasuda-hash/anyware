import Link from "next/link";
import SectionLabel from "@/components/ui/SectionLabel";
import { companyFacts } from "@/data/company";

export default function CompanyGateway() {
  const shown = companyFacts.filter((f) => f.value).slice(0, 3);

  return (
    <div className="border-b border-line py-16 sm:py-20 lg:border-b-0 lg:border-r lg:py-24 lg:pr-12">
      <SectionLabel eyebrow="WHO WE ARE" />
      <h3 className="type-display mt-6 text-2xl text-ink sm:text-3xl">COMPANY</h3>
      <p className="type-jp-body mt-4 max-w-sm text-sm text-ink/70">
        地域創生、ブランディング・PR、事業伴走、飲食、水耕栽培。5つの事業を横断するAnyWareの会社概要。
      </p>
      <dl className="mt-8 space-y-3">
        {shown.map((fact) => (
          <div key={fact.label} className="flex gap-4 text-sm">
            <dt className="w-24 shrink-0 text-ink/40">{fact.label}</dt>
            <dd className="text-ink/80">{fact.value}</dd>
          </div>
        ))}
      </dl>
      <Link
        href="/company"
        className="type-label mt-8 inline-flex items-center gap-2 text-[11px] text-ink hover:opacity-60"
      >
        会社概要を見る →
      </Link>
    </div>
  );
}
