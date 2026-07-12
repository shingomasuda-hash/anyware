import Link from "next/link";
import SectionLabel from "@/components/ui/SectionLabel";
import { recruitCopy } from "@/data/company";

export default function RecruitGateway() {
  return (
    <div className="py-16 sm:py-20 lg:py-24 lg:pl-12">
      <SectionLabel eyebrow="JOIN ANYWARE" />
      <h3 className="type-display mt-6 text-2xl text-ink sm:text-3xl">RECRUIT</h3>
      <p className="type-jp-heading mt-4 max-w-sm text-base text-ink">
        {recruitCopy.headlineJp}
      </p>
      <ul className="mt-6 space-y-3">
        {recruitCopy.points.map((point) => (
          <li key={point.title} className="text-sm text-ink/70">
            <span className="font-semibold text-ink">{point.title}｜</span>
            {point.body}
          </li>
        ))}
      </ul>
      <Link
        href="/recruit"
        className="type-label mt-8 inline-flex items-center gap-2 text-[11px] text-ink hover:opacity-60"
      >
        採用情報を見る →
      </Link>
    </div>
  );
}
