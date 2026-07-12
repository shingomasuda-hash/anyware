/**
 * 支援実績データ。
 *
 * 重要: 本セッションの実行環境ではネットワークポリシーにより any-ware.jp への
 * 直接アクセスができず、検索エンジン経由で確認できた「記事タイトル」以上の
 * 本文（課題・支援内容の詳細・数値の文脈）は確認できていない。
 * 数値やタイトルは検索結果に実在した文字列のみを採用し、課題/支援内容/変化の
 * 詳細文章は創作せず「確認中」として扱う。公開前に必ず一次情報で本文を差し替えること。
 * 詳細は CONTENT_MAPPING.md を参照。
 */

export type Work = {
  slug: string;
  title: string;
  clientLabel: string; // 確認できた範囲の業種・屋号表記
  category: "regional" | "branding" | "partner" | "food" | "hydroponics";
  resultHeadline: string; // 旧サイトの記事タイトルに実在した成果表現をそのまま採用
  summary: string;
  confirmed: boolean;
  oldSiteRef: string; // 旧サイトの参照URL（構造確認用。本文移行時に照合すること）
  date: string; // 確認できた公開時期（YYYY-MM-DD、日不明分は01固定と明記）
};

export const works: Work[] = [
  {
    slug: "kominka-cafe-instagram",
    title: "古民家カフェ「静カフェ」：SNS運用で売上600%アップを実現",
    clientLabel: "古民家カフェ",
    category: "branding",
    resultHeadline: "リール投稿で再生165万回・売上600％増",
    summary:
      "飲食店のSNS運用支援における事例。旧サイトに掲載されていた記事タイトルより、リール投稿の再生回数と売上増加率が確認できる。本文の詳細（支援期間・具体的施策）は現時点で未確認のため、公開時は一次情報での確認を推奨する。",
    confirmed: true,
    oldSiteRef: "https://any-ware.jp/2025/04/03/",
    date: "2025-04-03",
  },
  {
    slug: "centara-grand-hotel-osaka-instagram",
    title: "外資系ホテルのSNS戦略：センタラグランドホテル大阪",
    clientLabel: "センタラグランドホテル大阪",
    category: "branding",
    resultHeadline: "フォロワー3,000人増、集客・問い合わせ増加",
    summary:
      "外資系ホテルのInstagram運用支援における事例。旧サイトの記事タイトルよりフォロワー増加数が確認できる。本文詳細は未確認のため、公開時は一次情報での確認を推奨する。",
    confirmed: true,
    oldSiteRef: "https://any-ware.jp/2025/04/11/",
    date: "2025-04-11",
  },
  {
    slug: "manufacturing-tiktok-branding",
    title: "BtoB製造業のSNS挑戦：TikTokを活用したブランディング",
    clientLabel: "BtoB製造業（社名未確認）",
    category: "branding",
    resultHeadline: "TikTok活用で採用・認知向上をサポート",
    summary:
      "BtoB製造業に対するTikTokブランディング支援の事例。社名は検索結果の要約に含まれていたが原文タイトルでは確認できなかったため、本サイトでは非表示としている。公開時は一次情報で正式名称を確認すること。",
    confirmed: true,
    oldSiteRef: "https://any-ware.jp/2025/05/12/",
    date: "2025-05-12",
  },
  {
    slug: "regional-launch-first-month-profit",
    title: "地方で事前のPRも行わず、初月から黒字化を達成",
    clientLabel: "地方飲食店（屋号未確認）",
    category: "food",
    resultHeadline: "初月から黒字化を達成",
    summary:
      "地方での飲食店立ち上げ支援に関する事例。旧サイトの記事タイトルより「事前PRなしで初月から黒字化」という成果が確認できる。詳細な業態・施策内容は未確認のため、公開時は一次情報での確認を推奨する。",
    confirmed: true,
    oldSiteRef: "https://any-ware.jp/18/",
    date: "2024-01-01",
  },
];

export const getWorkBySlug = (slug: string) => works.find((w) => w.slug === slug);
