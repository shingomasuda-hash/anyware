# IMAGE GENERATION PROMPTS — 画像差し替えガイド

ホームのファーストビュー（PC/SP）は、クライアントから支給された実写品質のメインビジュアル
（`public/images/hero/hero-pc.webp`, `public/images/hero/hero-mobile.webp`）を採用済みです。
それ以外のビジュアルは引き続き **CSS / SVG（コード生成）による仮素材**です。
権利関係が確認できる実写素材が用意でき次第、以下の一覧に従って差し替えてください。
すべての画像は「同一の建築・照明・素材・時間帯（夕方〜夜への移行直前）・カメラレンズの
ルール」で統一すると、ヒーロー画像のトンマナ（建築断面／暖色照明／巨大立体文字）に
合った一貫性が生まれます。

差し替え時は `next/image` の使用、WebP/AVIF形式、`alt`属性の付与を必須とします。

## 優先度A：ファーストビュー（対応済み）

| # | 用途 | 現在の実装 | サイズ | 備考 |
|---|---|---|---|---|
| 1 | ホーム ヒーロー背景 PC | `public/images/hero/hero-pc.webp`（`HeroDistrict.tsx`） | 1586×992px | クライアント支給の本番画像。767px超で表示 |
| 1' | ホーム ヒーロー背景 SP | `public/images/hero/hero-mobile.webp`（`HeroDistrict.tsx`） | 941×1672px | クライアント支給の本番画像。767px以下で表示（PC画像の縮小ではなく別カット） |
| 2 | OGP画像 | `src/app/og/route.tsx`（next/og動的生成） | 1200×630px | 上記ヒーロー画像を用いた静的OG画像に差し替えると統一感が増す（任意） |

## 優先度B：事業ゾーン（5点、`BusinessZoneScene.tsx` を差し替え）

| # | 事業 | 推奨サイズ | 生成プロンプト（例） |
|---|---|---|---|
| 3 | TOWN（地域創生） | 1600×2000px（4:5） | "Warm architectural cross-section of a small town square inside a building, community table, local map on the wall, string lights, people gathering, miniature diorama style, warm evening light" |
| 4 | SIGNAL（ブランディング・PR） | 1600×2000px | "Creative studio interior cross-section, large screen showing social content, camera equipment, posters on the wall, warm bronze accent lighting, diorama model photography style" |
| 5 | WITH（事業伴走） | 1600×2000px | "Control-room-like shared table interior, blueprints and sticky notes on the wall, people looking at data together, warm charcoal tones, architectural diorama style" |
| 6 | TABLE（飲食） | 1600×2000px | "Warm restaurant interior cross-section, open kitchen with steam, wooden counter, warm clay-orange lighting, diorama model photography style" |
| 7 | GROW（水耕栽培） | 1600×2000px | "Glass-walled hydroponic green lab cross-section, soft LED grow lights, vertical racks with leafy greens, water droplets, pale green-blue tones, diorama model photography style" |

## 優先度C：その他

| # | 用途 | 推奨サイズ | 備考 |
|---|---|---|---|
| 8 | 会社ロゴ（正方形マーク） | SVG推奨 | `public/favicon.svg` は仮の建築モチーフマーク。正式ロゴが確定次第差し替え、`src/app/layout.tsx` の `icons` も更新 |
| 9 | 支援実績（works）各記事のサムネイル | 1600×900px（16:9） | 実際の店舗・案件写真（権利確認済みのもの）を使用。`src/app/works/[slug]/page.tsx` の `BusinessZoneScene` 呼び出し箇所を `next/image` に差し替え |
| 10 | 採用ページ用ビジュアル | 1600×1200px | 現場感が伝わる実写（メンバーの活動風景等）を推奨 |

## 差し替え手順（共通）

1. 画像を `public/images/` 配下に配置（例: `public/images/hero-district.webp`）。
2. 対象コンポーネント内のSVG呼び出しを `next/image` に置き換える。
3. `alt` は装飾目的なら空文字＋`aria-hidden`、情報として意味を持つ場合は具体的な説明文を設定する。
4. Lighthouseのパフォーマンススコアを確認し、必要に応じて`priority`/`sizes`を調整する。
