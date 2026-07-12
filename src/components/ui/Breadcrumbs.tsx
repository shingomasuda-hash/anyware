import Link from "next/link";
import { breadcrumbJsonLd } from "@/lib/seo";

export type Crumb = { name: string; path: string };

export default function Breadcrumbs({ items }: { items: Crumb[] }) {
  return (
    <nav aria-label="パンくずリスト" className="bg-warm-white">
      <script
        type="application/ld+json"
        // eslint-disable-next-line react/no-danger
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd(items)) }}
      />
      <ol
        className="mx-auto flex max-w-[1200px] flex-wrap items-center gap-2 pt-[calc(var(--header-height)+1.25rem)] text-xs text-ink/50"
        style={{ paddingInline: "var(--page-gutter)" }}
      >
        {items.map((item, index) => (
          <li key={item.path} className="flex items-center gap-2">
            {index > 0 && <span aria-hidden="true">/</span>}
            {index === items.length - 1 ? (
              <span aria-current="page" className="text-ink/80">
                {item.name}
              </span>
            ) : (
              <Link href={item.path} className="hover:text-ink">
                {item.name}
              </Link>
            )}
          </li>
        ))}
      </ol>
    </nav>
  );
}
