import type { Metadata } from "next";
import { buildMetadata } from "@/lib/seo";
import Breadcrumbs from "@/components/ui/Breadcrumbs";
import PageIntro from "@/components/ui/PageIntro";
import { siteConfig } from "@/data/site";

export const metadata: Metadata = buildMetadata({
  title: "プライバシーポリシー｜株式会社AnyWare",
  description: "株式会社AnyWareのプライバシーポリシー（個人情報の取り扱いについて）です。",
  path: "/privacy",
  noIndex: true,
});

export default function PrivacyPage() {
  return (
    <>
      <Breadcrumbs items={[{ name: "TOP", path: "/" }, { name: "PRIVACY", path: "/privacy" }]} />
      <PageIntro eyebrow="LEGAL" title="プライバシーポリシー" topOffset={false} />

      <section className="bg-warm-white pb-24 sm:pb-32">
        <div className="mx-auto max-w-[800px] space-y-8" style={{ paddingInline: "var(--page-gutter)" }}>
          <p className="type-jp-body rounded-md border border-line bg-bone/60 p-5 text-xs leading-relaxed text-ink/60">
            ※
            本ページは一般的なプライバシーポリシーの雛形です。旧サイトの正式なプライバシーポリシー本文は本セッションの実行環境からは確認できなかったため、内容の同一性は保証されません。公開前に必ず法務担当者の確認、または旧ページ本文との照合を行ってください。
          </p>

          <div className="type-jp-body space-y-6 text-sm leading-relaxed text-ink/80">
            <p>
              {siteConfig.legalName}（以下「当社」といいます）は、お客様の個人情報の重要性を認識し、個人情報の保護に関する法律その他関連法令等を遵守し、以下のとおりプライバシーポリシーを定めます。
            </p>

            <div>
              <h2 className="type-jp-heading mb-2 text-base text-ink">1. 個人情報の取得</h2>
              <p>
                当社は、お問い合わせフォームその他の方法により、氏名、会社名、メールアドレス、電話番号その他のお客様からご提供いただく情報を、適法かつ公正な手段によって取得します。
              </p>
            </div>

            <div>
              <h2 className="type-jp-heading mb-2 text-base text-ink">2. 個人情報の利用目的</h2>
              <p>
                取得した個人情報は、お問い合わせへの回答、ご相談内容の確認、サービス提供のための連絡、採用選考に関する連絡の目的の範囲内で利用します。
              </p>
            </div>

            <div>
              <h2 className="type-jp-heading mb-2 text-base text-ink">3. 個人情報の第三者提供</h2>
              <p>
                当社は、法令に基づく場合を除き、お客様の同意を得ずに個人情報を第三者に提供することはありません。
              </p>
            </div>

            <div>
              <h2 className="type-jp-heading mb-2 text-base text-ink">4. 個人情報の管理</h2>
              <p>
                当社は、個人情報への不正アクセス、紛失、破壊、改ざん、漏洩等を防止するため、必要かつ適切な安全管理措置を講じます。
              </p>
            </div>

            <div>
              <h2 className="type-jp-heading mb-2 text-base text-ink">5. 個人情報の開示・訂正・削除</h2>
              <p>
                お客様がご自身の個人情報の開示、訂正、削除等を求める場合は、お問い合わせフォームよりご連絡ください。当社は法令に従い、合理的な範囲で速やかに対応します。
              </p>
            </div>

            <div>
              <h2 className="type-jp-heading mb-2 text-base text-ink">6. アクセス解析について</h2>
              <p>
                当サイトでは、サービス向上のためアクセス解析ツールを使用する場合があります。アクセス解析ツールはCookie等を利用してデータを収集しますが、個人を特定する情報は含まれません。
              </p>
            </div>

            <div>
              <h2 className="type-jp-heading mb-2 text-base text-ink">7. プライバシーポリシーの変更</h2>
              <p>
                当社は、必要に応じて本ポリシーの内容を変更することがあります。変更後のプライバシーポリシーは、本ページに掲載した時点から効力を生じるものとします。
              </p>
            </div>

            <div>
              <h2 className="type-jp-heading mb-2 text-base text-ink">8. お問い合わせ窓口</h2>
              <p>
                個人情報の取り扱いに関するお問い合わせは、
                <a href="/contact" className="underline underline-offset-2">
                  お問い合わせフォーム
                </a>
                よりご連絡ください。
              </p>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
