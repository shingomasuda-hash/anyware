# IMAGE GENERATION PROMPTS — 画像差し替えガイド

現状、サイト内のすべてのビジュアルは **CSS / SVG（コード生成）による仮素材**です。
権利関係が確認できる実写素材が用意でき次第、以下の一覧に従って差し替えてください。
すべての画像は「同一の建築・照明・素材・時間帯（夕方〜夜への移行直前）・カメラレンズの
ルール」で統一すると、指示書のトンマナ（建築模型／映画のセット／高級ホテル内装／
美術館の展示空間）に合った一貫性が生まれます。

差し替え時は `next/image` の使用、WebP/AVIF形式、`alt`属性の付与を必須とします。

## 優先度A：ファーストビュー

| # | 用途 | 現在の実装 | 推奨サイズ/比率 | 生成プロンプト（例） |
|---|---|---|---|---|
| 1 | ホーム ヒーロー背景（建築断面全景） | `DistrictIllustration.tsx`（SVG） | 2400×1600px（3:2） | "Architectural cross-section diorama of a warm, boutique creative company building at dusk, five connected rooms visible from outside, soft interior lighting, rounded modern architecture, miniature model photography style, warm amber and deep green color palette, cinematic lighting, high detail, no text, no logos" |
| 2 | OGP画像 | `src/app/og/route.tsx`（next/og動的生成） | 1200×630px | 現状のまま運用可。差し替える場合は同トーンで作成 |

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
