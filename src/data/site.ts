/**
 * サイト全体で共有する基本設定。
 * 会社の連絡先・SNS等はここでのみ管理し、コンポーネント側へ直接ハードコードしない。
 * 値が未確定の項目は null とし、UI側で「準備中」等に出し分ける。
 */

export const siteConfig = {
  legalName: "株式会社AnyWare",
  brandName: "AnyWare",
  category: "REGIONAL CREATIVE COMPANY",
  baseUrl: "https://any-ware.jp",
  locale: "ja-JP",
  defaultTitle:
    "株式会社AnyWare｜地域創生・ブランディングPR・事業伴走・飲食・水耕栽培",
  defaultDescription:
    "株式会社AnyWareは、地域創生、ブランディング・PR、事業伴走、飲食店事業、水耕栽培を通じ、地域や企業に眠る価値を事業として育てるREGIONAL CREATIVE COMPANYです。",
  ogImagePath: "/og",
  themeColor: "#171817",

  // 未確認のため null。判明次第 CONTENT_MAPPING.md の手順に従い入力すること。
  contact: {
    email: process.env.NEXT_PUBLIC_CONTACT_EMAIL ?? null,
    phone: null as string | null,
    address: null as string | null,
    businessArea: "大阪・京都エリアを中心に活動",
  },

  // 現行サイトから確認できたSNSアカウントは無し（要確認）。
  social: {
    x: null as string | null,
    instagram: null as string | null,
    facebook: null as string | null,
    note: null as string | null,
  },
} as const;

export type SiteConfig = typeof siteConfig;
