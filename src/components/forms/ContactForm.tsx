"use client";

import { useRef, useState } from "react";
import Link from "next/link";
import { consultationAreas } from "@/data/contact";
import { validateContact, type ContactErrors, type ContactPayload } from "@/lib/contactValidation";

const initialState: ContactPayload = {
  area: "",
  company: "",
  name: "",
  email: "",
  phone: "",
  message: "",
  agree: false,
  website: "",
};

type SubmitStatus = "idle" | "submitting" | "success" | "error";

export default function ContactForm() {
  const [values, setValues] = useState<ContactPayload>(initialState);
  const [errors, setErrors] = useState<ContactErrors>({});
  const [status, setStatus] = useState<SubmitStatus>("idle");
  const [topMessage, setTopMessage] = useState<string | null>(null);
  const lastSubmitRef = useRef(0);

  const update = <K extends keyof ContactPayload>(key: K, value: ContactPayload[K]) => {
    setValues((prev) => ({ ...prev, [key]: value }));
  };

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();

    // 連続送信防止（フロント側の簡易ガード）
    const now = Date.now();
    if (now - lastSubmitRef.current < 4000) return;
    lastSubmitRef.current = now;

    const clientErrors = validateContact(values);
    setErrors(clientErrors);
    if (Object.keys(clientErrors).length > 0) {
      setTopMessage("入力内容をご確認ください。");
      return;
    }

    setStatus("submitting");
    setTopMessage(null);

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(values),
      });
      const data = await res.json();

      if (!res.ok) {
        setStatus("error");
        setErrors(data.errors ?? {});
        setTopMessage(data.message ?? "送信に失敗しました。時間をおいて再度お試しください。");
        return;
      }

      setStatus("success");
      setValues(initialState);
      setErrors({});
    } catch {
      setStatus("error");
      setTopMessage("通信エラーが発生しました。時間をおいて再度お試しください。");
    }
  };

  if (status === "success") {
    return (
      <div role="status" className="rounded-md border border-line bg-bone/60 p-8 text-center">
        <p className="type-jp-heading text-lg text-ink">お問い合わせありがとうございます。</p>
        <p className="type-jp-body mt-3 text-sm text-ink/70">
          内容を確認のうえ、担当者よりご連絡いたします。今しばらくお待しください。
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} noValidate className="space-y-8">
      {topMessage && (
        <p role="alert" className="rounded-md border border-clay/50 bg-clay/10 p-4 text-sm text-clay">
          {topMessage}
        </p>
      )}

      {/* honeypot: スクリーンリーダー・キーボード操作からは除外し、botのみが埋める想定 */}
      <div className="absolute left-[-9999px] top-auto h-px w-px overflow-hidden" aria-hidden="true">
        <label htmlFor="website">Website</label>
        <input
          id="website"
          name="website"
          type="text"
          tabIndex={-1}
          autoComplete="off"
          value={values.website}
          onChange={(e) => update("website", e.target.value)}
        />
      </div>

      <Field label="相談領域" htmlFor="area" required error={errors.area}>
        <select
          id="area"
          name="area"
          required
          aria-required="true"
          aria-invalid={Boolean(errors.area)}
          aria-describedby={errors.area ? "area-error" : undefined}
          value={values.area}
          onChange={(e) => update("area", e.target.value)}
          className="w-full rounded-md border border-line bg-warm-white px-4 py-3 text-sm text-ink"
        >
          <option value="" disabled>
            選択してください
          </option>
          {consultationAreas.map((area) => (
            <option key={area} value={area}>
              {area}
            </option>
          ))}
        </select>
      </Field>

      <div className="grid gap-8 sm:grid-cols-2">
        <Field label="会社名（任意）" htmlFor="company" error={errors.company}>
          <input
            id="company"
            name="company"
            type="text"
            autoComplete="organization"
            value={values.company}
            onChange={(e) => update("company", e.target.value)}
            className="w-full rounded-md border border-line bg-warm-white px-4 py-3 text-sm text-ink"
          />
        </Field>

        <Field label="お名前" htmlFor="name" required error={errors.name}>
          <input
            id="name"
            name="name"
            type="text"
            required
            aria-required="true"
            autoComplete="name"
            aria-invalid={Boolean(errors.name)}
            aria-describedby={errors.name ? "name-error" : undefined}
            value={values.name}
            onChange={(e) => update("name", e.target.value)}
            className="w-full rounded-md border border-line bg-warm-white px-4 py-3 text-sm text-ink"
          />
        </Field>

        <Field label="メールアドレス" htmlFor="email" required error={errors.email}>
          <input
            id="email"
            name="email"
            type="email"
            required
            aria-required="true"
            autoComplete="email"
            inputMode="email"
            aria-invalid={Boolean(errors.email)}
            aria-describedby={errors.email ? "email-error" : undefined}
            value={values.email}
            onChange={(e) => update("email", e.target.value)}
            className="w-full rounded-md border border-line bg-warm-white px-4 py-3 text-sm text-ink"
          />
        </Field>

        <Field label="電話番号（任意）" htmlFor="phone" error={errors.phone}>
          <input
            id="phone"
            name="phone"
            type="tel"
            autoComplete="tel"
            inputMode="tel"
            aria-invalid={Boolean(errors.phone)}
            aria-describedby={errors.phone ? "phone-error" : undefined}
            value={values.phone}
            onChange={(e) => update("phone", e.target.value)}
            className="w-full rounded-md border border-line bg-warm-white px-4 py-3 text-sm text-ink"
          />
        </Field>
      </div>

      <Field label="相談内容" htmlFor="message" required error={errors.message}>
        <textarea
          id="message"
          name="message"
          required
          aria-required="true"
          rows={6}
          aria-invalid={Boolean(errors.message)}
          aria-describedby={errors.message ? "message-error" : undefined}
          value={values.message}
          onChange={(e) => update("message", e.target.value)}
          className="w-full rounded-md border border-line bg-warm-white px-4 py-3 text-sm text-ink"
        />
      </Field>

      <div className="flex items-start gap-3">
        <input
          id="agree"
          name="agree"
          type="checkbox"
          required
          aria-required="true"
          aria-invalid={Boolean(errors.agree)}
          aria-describedby={errors.agree ? "agree-error" : undefined}
          checked={values.agree}
          onChange={(e) => update("agree", e.target.checked)}
          className="mt-1 h-4 w-4 shrink-0"
        />
        <label htmlFor="agree" className="type-jp-body text-sm text-ink/80">
          <Link href="/privacy" className="underline underline-offset-2">
            プライバシーポリシー
          </Link>
          に同意します。
        </label>
      </div>
      {errors.agree && (
        <p id="agree-error" className="text-xs text-clay">
          {errors.agree}
        </p>
      )}

      <button
        type="submit"
        disabled={status === "submitting"}
        className="type-label w-full rounded-full bg-ink px-8 py-4 text-[12px] text-warm-white transition-opacity hover:opacity-85 disabled:opacity-50 sm:w-auto"
      >
        {status === "submitting" ? "送信中…" : "送信する"}
      </button>
    </form>
  );
}

function Field({
  label,
  htmlFor,
  required,
  error,
  children,
}: {
  label: string;
  htmlFor: string;
  required?: boolean;
  error?: string;
  children: React.ReactNode;
}) {
  return (
    <div>
      <label htmlFor={htmlFor} className="type-jp-body mb-2 block text-sm text-ink">
        {label}
        {required && (
          <span className="ml-1 text-[10px] text-clay" aria-hidden="true">
            必須
          </span>
        )}
      </label>
      {children}
      {error && (
        <p id={`${htmlFor}-error`} role="alert" className="mt-2 text-xs text-clay">
          {error}
        </p>
      )}
    </div>
  );
}
