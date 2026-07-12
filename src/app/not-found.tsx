import Link from "next/link";

export default function NotFound() {
  return (
    <section className="flex min-h-[70svh] flex-col items-center justify-center bg-warm-white px-6 text-center">
      <p className="type-label text-[11px] text-ink/50">404</p>
      <h1 className="type-display mt-4 text-[clamp(1.8rem,5vw,3rem)] text-ink">
        このページは見つかりませんでした。
      </h1>
      <p className="type-jp-body mt-4 max-w-md text-sm text-ink/60">
        URLが変更、削除されたか、入力に誤りがある可能性があります。トップページから改めてお探しください。
      </p>
      <Link
        href="/"
        className="type-label mt-8 inline-flex rounded-full bg-ink px-7 py-3.5 text-[11px] text-warm-white transition-transform hover:-translate-y-0.5"
      >
        TOPへ戻る
      </Link>
    </section>
  );
}
