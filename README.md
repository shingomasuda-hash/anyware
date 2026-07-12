# 株式会社AnyWare コーポレートサイト

コンセプト「THE UPDATE DISTRICT」— 地域創生、ブランディング・PR、事業伴走、飲食、水耕栽培という
5つの事業を、ひとつの建築空間の断面図として体験できるブランド体験型コーポレートサイトです。

## 目次

- [使用技術](#使用技術)
- [ローカル起動方法](#ローカル起動方法)
- [build方法](#build方法)
- [Vercelへのデプロイ](#vercelへのデプロイ)
- [環境変数](#環境変数)
- [お問い合わせフォームの設定](#お問い合わせフォームの設定)
- [コンテンツの更新箇所](#コンテンツの更新箇所)
- [画像の差し替え](#画像の差し替え)
- [ページ構成](#ページ構成)
- [既存サイトからの移行内容](#既存サイトからの移行内容)
- [未確定情報・今後確認が必要な事項](#未確定情報今後確認が必要な事項)
- [実装・確認結果](#実装確認結果)

## 使用技術

- Next.js 14（App Router） / TypeScript / Tailwind CSS
- next/font（Manrope, Noto Sans JP）
- next/og（動的OGP画像生成）
- モーション: IntersectionObserverベースの独自フック（`useInView`）＋CSS transition。
  GSAPやThree.js / React Three Fiberは、パフォーマンスと安定性を優先し**採用していません**
  （詳細は `DESIGN_SYSTEM.md` を参照）。建築空間の表現はSVG/CSSによる2.5Dレイヤーで実現しています。
- CMSなし。コンテンツは `src/data/*.ts` に分離されたデータファイルで一元管理しています。

## ローカル起動方法

```bash
npm install
npm run dev
# http://localhost:3000
```

## build方法

```bash
npm run typecheck   # tsc --noEmit
npm run lint         # next lint
npm run build         # next build
npm run start          # 本番ビルドの起動確認
```

すべて `npm run build` 時点でエラーなく通ることを確認済みです（本ドキュメント末尾参照）。

## Vercelへのデプロイ

1. GitHubリポジトリをVercelにインポートする。
2. Framework Presetは自動で「Next.js」が選択されます。
3. `.env.example` を参考に環境変数をVercelの Project Settings → Environment Variables に設定する。
4. デプロイ後、`https://<プロジェクト>.vercel.app` で確認し、問題なければ独自ドメイン
   （`any-ware.jp`）をVercelに接続する。
5. DNS切り替え後、`src/data/site.ts` の `baseUrl` が正しいことを確認する（現在
   `https://any-ware.jp` を設定済み）。

## 環境変数

`.env.example` を `.env.local` にコピーして設定してください。

| 変数名 | 必須 | 説明 |
|---|---|---|
| `RESEND_API_KEY` | フォーム送信に必須 | [Resend](https://resend.com) のAPIキー |
| `CONTACT_TO_EMAIL` | フォーム送信に必須 | 問い合わせを受信する社内メールアドレス |
| `CONTACT_FROM_EMAIL` | フォーム送信に必須 | Resendで送信ドメイン認証済みの送信元アドレス |
| `NEXT_PUBLIC_CONTACT_EMAIL` | 任意 | サイト上に公開連絡先として表示する場合に設定 |

**これらを設定しない場合、お問い合わせフォームは「送信設定が完了していません」という
正直なエラーメッセージを表示し、送信できたふりはしません。**（指示書の要件どおり）

## お問い合わせフォームの設定

1. Resendでアカウントを作成し、送信元ドメイン（`any-ware.jp` 等）の認証を行う。
2. APIキーを発行し `RESEND_API_KEY` に設定。
3. `CONTACT_FROM_EMAIL`（認証済みドメインのアドレス）と `CONTACT_TO_EMAIL`（受信先）を設定。
4. 実装: `src/app/api/contact/route.ts`（サーバー側バリデーション・honeypot・簡易レート制限）、
   `src/components/forms/ContactForm.tsx`（クライアント側バリデーション・送信中/成功/失敗表示）。
5. レート制限はメモリ内実装のためベストエフォートです。サーバーレス環境では複数インスタンス
   をまたいだ完全な制限にはならないため、本番運用では追加でWAF等の対策を推奨します。

## コンテンツの更新箇所

すべて `src/data/` 配下のファイルを編集するだけで反映されます。コンポーネント内に
直接ハードコードされたテキストはありません（コピーやCTA文言など一部の固定演出コピーを除く）。

| ファイル | 内容 |
|---|---|
| `src/data/site.ts` | サイト全体設定（会社名、meta、連絡先、SNS） |
| `src/data/businesses.ts` | 5事業の詳細（役割、課題、進め方、FAQ等） |
| `src/data/works.ts` | 支援実績 |
| `src/data/news.ts` | お知らせ・コラム |
| `src/data/company.ts` | 会社概要の事実情報、MVV、採用コピー |
| `src/data/navigation.ts` | グローバルナビゲーション |
| `src/data/contact.ts` | 問い合わせフォームの相談領域選択肢 |

## 画像の差し替え

`IMAGE_GENERATION_PROMPTS.md` を参照してください。現在はすべてSVG/CSSによる仮素材です。

## ページ構成

```
/                    ホーム（建築空間の旅）
/about               AnyWareについて・思想・MVV
/business            事業一覧
/business/regional      地域創生・地域共創
/business/branding      ブランディング・PR
/business/partner       事業伴走・コンサルティング
/business/food          飲食店事業・飲食店支援
/business/hydroponics   水耕栽培事業
/works, /works/[slug]   支援実績
/news, /news/[slug]     お知らせ
/company             会社概要
/recruit             採用情報
/contact             お問い合わせ
/privacy             プライバシーポリシー
/sitemap.xml, /robots.txt, /og（OGP画像）, 404ページ
```

## 既存サイトからの移行内容

本セッションの実行環境では any-ware.jp への直接アクセスがネットワークポリシーにより
できなかったため、旧サイトの完全なクロールはできていません。検索エンジン経由で
確認できた内容のみを転記し、確認できない実績・数値・会社情報は創作せず「確認中」
としています。**詳細は `CONTENT_MAPPING.md` を必ずお読みください。**

## 未確定情報・今後確認が必要な事項

- 会社の正式な所在地・電話番号・代表者名・設立年・資本金
- お問い合わせ送信先メールアドレス、SNSアカウント
- Googleアナリティクス等の計測タグ
- 旧サイトの正確なURL一覧と301リダイレクト設定（`next.config.mjs` の `redirects()` は
  現在空です）
- プライバシーポリシー本文の法務確認（現在は一般的な雛形）
- 採用情報の具体的な募集職種
- 実績記事本文の正確な内容（現在はタイトルと検索結果由来の成果数値のみ掲載）

いずれも `CONTENT_MAPPING.md` に詳細と対応手順を記載しています。

## 実装・確認結果

- `npm run typecheck` / `npm run lint` / `npm run build`：エラーなし。
- Playwright（Chromium）で以下の全ページ × 全ビューポート幅（1440 / 1280 / 1024 / 768 / 430 /
  390 / 375px）を検証：横スクロール発生なし、コンソールエラーなし、hydrationエラーなし。
- モバイルメニューの開閉・ESCキーでのクローズ・フォーカス制御を確認。
- `prefers-reduced-motion: reduce` 環境でのロード確認（スクロール連動演出・自動ループ
  アニメーションが停止することをCSSレベルで保証）。
- 404ページの表示を確認。
- お問い合わせフォームのクライアント側バリデーション（未入力送信時のエラー表示）を確認。
- 実際のブラウザでのビジュアル確認（デスクトップ／モバイル、複数ページ）をスクリーンショットで実施。

### 既知の制約

- Three.js等のWebGLは不使用。3D表現はCSS/SVGによる2.5D表現に置き換えています
  （指示書が許容する代替方針）。
- 画像はすべて仮素材（SVG/CSSコード生成）です。実写差し替えが必要です。
- Lighthouseスコアの計測は、このセッションの実行環境の制約により実施していません。
  本番相当環境（Vercel Preview等）でのCore Web Vitals計測を推奨します。
