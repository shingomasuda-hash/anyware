import { works } from "./works";

export type NewsPost = {
  slug: string;
  title: string;
  category: "お知らせ" | "導入事例" | "コラム";
  date: string;
  excerpt: string;
  body: string[];
  relatedWorkSlug?: string;
};

// 実績記事は旧サイトでも /news/ 配下の投稿として運用されていたため、
// works.ts のデータを新着情報にも展開する（重複入力を避けるため単一情報源から生成）。
const caseStudyPosts: NewsPost[] = works.map((w) => ({
  slug: w.slug,
  title: w.title,
  category: "導入事例",
  date: w.date,
  excerpt: w.resultHeadline,
  body: [w.summary],
  relatedWorkSlug: w.slug,
}));

export const newsPosts: NewsPost[] = [
  {
    slug: "corporate-site-renewal",
    title: "コーポレートサイトをリニューアルしました",
    category: "お知らせ",
    date: "2026-07-12",
    excerpt:
      "地域創生、ブランディング・PR、事業伴走、飲食店事業、水耕栽培――5つの事業のつながりを伝えるコーポレートサイトへリニューアルしました。",
    body: [
      "株式会社AnyWareのコーポレートサイトをリニューアルしました。",
      "地域創生・地域共創、ブランディング・PR、事業伴走・コンサルティング、飲食店事業、水耕栽培事業。5つの事業がそれぞれ独立しているのではなく、地域の経済圏を動かすひとつの流れとしてつながっていることを、サイトを通じてお伝えしていきます。",
      "今後も事業内容や実績を随時更新してまいります。",
    ],
  },
  ...caseStudyPosts,
];

export const getNewsBySlug = (slug: string) => newsPosts.find((n) => n.slug === slug);
