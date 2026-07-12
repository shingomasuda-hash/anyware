import Link from "next/link";
import SectionLabel from "@/components/ui/SectionLabel";
import { works } from "@/data/works";
import { businesses } from "@/data/businesses";

export default function WorksArchive() {
  return (
    <section id="works" className="bg-charcoal py-24 sm:py-32" aria-labelledby="works-heading">
      <div
        className="mx-auto flex max-w-[1600px] flex-col gap-6 sm:flex-row sm:items-end sm:justify-between"
        style={{ paddingInline: "var(--page-gutter)" }}
      >
        <div>
          <SectionLabel eyebrow="MOVEMENT WE CREATED" tone="light" />
          <h2
            id="works-heading"
            className="type-display mt-6 text-[clamp(1.8rem,4.2vw,2.9rem)] leading-[1.1] text-warm-white"
          >
            生まれた変化。
          </h2>
        </div>
        <Link
          href="/works"
          className="type-label inline-flex items-center gap-2 text-[11px] text-warm-white/70 hover:text-warm-white"
        >
          VIEW ALL WORKS →
        </Link>
      </div>

      <div
        className="no-scrollbar mt-12 flex snap-x snap-mandatory gap-5 overflow-x-auto pb-4"
        style={{ paddingInline: "var(--page-gutter)" }}
      >
        {works.map((work, index) => {
          const category = businesses.find((b) => b.slug === work.category);
          return (
            <Link
              key={work.slug}
              href={`/works/${work.slug}`}
              className="group relative flex w-[85vw] shrink-0 snap-start flex-col justify-between overflow-hidden rounded-md border border-warm-white/10 bg-ink p-8 text-warm-white sm:w-[60vw] md:w-[42vw] lg:w-[30vw]"
            >
              <div>
                <span className="type-display text-5xl text-warm-white/15">
                  {String(index + 1).padStart(2, "0")}
                </span>
                <span className="type-label mt-6 block text-[10px] text-warm-white/50">
                  {category?.zoneName ?? ""}
                </span>
              </div>
              <div>
                <p className="type-jp-heading mt-8 text-lg leading-snug">{work.title}</p>
                <p className="type-jp-body mt-3 text-sm text-warm-white/60">
                  {work.resultHeadline}
                </p>
                <span className="type-label mt-6 inline-flex items-center gap-2 text-[11px] text-warm-white/80 transition-opacity group-hover:opacity-60">
                  READ CASE →
                </span>
              </div>
            </Link>
          );
        })}
      </div>
    </section>
  );
}
