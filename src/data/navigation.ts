export type NavItem = {
  label: string;
  labelJp: string;
  href: string;
};

export const primaryNav: NavItem[] = [
  { label: "ABOUT", labelJp: "私たちについて", href: "/about" },
  { label: "BUSINESS", labelJp: "事業内容", href: "/business" },
  { label: "WORKS", labelJp: "実績", href: "/works" },
  { label: "NEWS", labelJp: "お知らせ", href: "/news" },
  { label: "COMPANY", labelJp: "会社概要", href: "/company" },
  { label: "RECRUIT", labelJp: "採用情報", href: "/recruit" },
];

export const contactNav: NavItem = {
  label: "CONTACT",
  labelJp: "相談する",
  href: "/contact",
};

export const footerLegalNav: NavItem[] = [
  { label: "PRIVACY", labelJp: "プライバシーポリシー", href: "/privacy" },
];
