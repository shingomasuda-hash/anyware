import { NextRequest, NextResponse } from "next/server";
import { validateContact, isSpam, type ContactPayload } from "@/lib/contactValidation";

export const runtime = "nodejs";

// ベストエフォートのレート制限。サーバーレス環境ではインスタンスごとにメモリが
// 分離されるため、複数インスタンスをまたぐ完全なレート制限にはならない。
// 本番運用では WAF やエッジ側のレート制限と併用することを推奨する。
const RATE_LIMIT_WINDOW_MS = 10 * 60 * 1000;
const RATE_LIMIT_MAX = 5;
const requestLog = new Map<string, number[]>();

function isRateLimited(ip: string): boolean {
  const now = Date.now();
  const timestamps = (requestLog.get(ip) ?? []).filter(
    (t) => now - t < RATE_LIMIT_WINDOW_MS
  );
  timestamps.push(now);
  requestLog.set(ip, timestamps);
  return timestamps.length > RATE_LIMIT_MAX;
}

export async function POST(request: NextRequest) {
  const ip = request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ?? "unknown";

  if (isRateLimited(ip)) {
    return NextResponse.json(
      { ok: false, message: "送信回数の上限に達しました。しばらくしてから再度お試しください。" },
      { status: 429 }
    );
  }

  let body: Partial<ContactPayload>;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ ok: false, message: "リクエストの形式が不正です。" }, { status: 400 });
  }

  // honeypot: bot からの送信は成功したふりをして静かに破棄する
  if (isSpam(body)) {
    return NextResponse.json({ ok: true });
  }

  const errors = validateContact(body);
  if (Object.keys(errors).length > 0) {
    return NextResponse.json({ ok: false, errors }, { status: 400 });
  }

  const apiKey = process.env.RESEND_API_KEY;
  const toEmail = process.env.CONTACT_TO_EMAIL;
  const fromEmail = process.env.CONTACT_FROM_EMAIL;

  if (!apiKey || !toEmail || !fromEmail) {
    console.error(
      "[contact] 送信先が未設定です。RESEND_API_KEY / CONTACT_TO_EMAIL / CONTACT_FROM_EMAIL を環境変数に設定してください。"
    );
    return NextResponse.json(
      {
        ok: false,
        message:
          "現在お問い合わせフォームの送信設定が完了していません。お手数ですが別の手段でご連絡ください。",
      },
      { status: 503 }
    );
  }

  const payload = body as ContactPayload;

  try {
    const res = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${apiKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        from: fromEmail,
        to: toEmail,
        reply_to: payload.email,
        subject: `【AnyWare お問い合わせ】${payload.area}`,
        text: [
          `相談領域: ${payload.area}`,
          `会社名: ${payload.company || "（未入力）"}`,
          `お名前: ${payload.name}`,
          `メールアドレス: ${payload.email}`,
          `電話番号: ${payload.phone || "（未入力）"}`,
          "",
          "相談内容:",
          payload.message,
        ].join("\n"),
      }),
    });

    if (!res.ok) {
      const detail = await res.text();
      console.error("[contact] Resend API error:", res.status, detail);
      return NextResponse.json(
        { ok: false, message: "送信に失敗しました。時間をおいて再度お試しください。" },
        { status: 502 }
      );
    }
  } catch (error) {
    console.error("[contact] send failed:", error);
    return NextResponse.json(
      { ok: false, message: "送信に失敗しました。時間をおいて再度お試しください。" },
      { status: 502 }
    );
  }

  return NextResponse.json({ ok: true });
}
