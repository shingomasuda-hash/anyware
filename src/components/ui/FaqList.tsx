type FaqItem = { q: string; a: string };

export default function FaqList({ items }: { items: FaqItem[] }) {
  return (
    <dl className="divide-y divide-line border-y border-line">
      {items.map((item) => (
        <div key={item.q} className="py-6">
          <dt className="type-jp-heading flex gap-3 text-base text-ink">
            <span className="type-display text-ink/30">Q</span>
            {item.q}
          </dt>
          <dd className="type-jp-body mt-3 flex gap-3 text-sm leading-relaxed text-ink/70">
            <span className="type-display text-ink/20">A</span>
            {item.a}
          </dd>
        </div>
      ))}
    </dl>
  );
}
