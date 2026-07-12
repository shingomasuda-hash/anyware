import { consultationAreas } from "@/data/contact";

export type ContactPayload = {
  area: string;
  company: string;
  name: string;
  email: string;
  phone: string;
  message: string;
  agree: boolean;
  // honeypot: 人間の目には見えないフィールド。値が入っていればbotとみなす。
  website: string;
};

export type ContactErrors = Partial<Record<keyof ContactPayload, string>>;

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const PHONE_RE = /^[0-9+\-()\s]{9,20}$/;

export function validateContact(payload: Partial<ContactPayload>): ContactErrors {
  const errors: ContactErrors = {};

  if (!payload.area || !consultationAreas.includes(payload.area as (typeof consultationAreas)[number])) {
    errors.area = "相談領域を選択してください。";
  }

  if (!payload.name || payload.name.trim().length === 0) {
    errors.name = "お名前を入力してください。";
  } else if (payload.name.length > 100) {
    errors.name = "お名前が長すぎます。";
  }

  if (!payload.email || payload.email.trim().length === 0) {
    errors.email = "メールアドレスを入力してください。";
  } else if (!EMAIL_RE.test(payload.email)) {
    errors.email = "メールアドレスの形式が正しくありません。";
  }

  if (payload.phone && !PHONE_RE.test(payload.phone)) {
    errors.phone = "電話番号の形式が正しくありません。";
  }

  if (!payload.message || payload.message.trim().length < 10) {
    errors.message = "相談内容を10文字以上でご記入ください。";
  } else if (payload.message.length > 4000) {
    errors.message = "相談内容が長すぎます。";
  }

  if (!payload.agree) {
    errors.agree = "プライバシーポリシーへの同意が必要です。";
  }

  if (payload.company && payload.company.length > 200) {
    errors.company = "会社名が長すぎます。";
  }

  return errors;
}

export function isSpam(payload: Partial<ContactPayload>): boolean {
  return Boolean(payload.website && payload.website.trim().length > 0);
}
