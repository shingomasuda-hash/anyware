# DESIGN SYSTEM — THE UPDATE DISTRICT

株式会社AnyWareのコーポレートサイトにおけるデザイントークンとビジュアル文法。

## コンセプト

サイト全体を「AnyWareが育てる地域経済圏」を象った、ひとつの巨大な建築空間（THE UPDATE
DISTRICT）として構成する。5つの事業＝5つの部屋（TOWN / SIGNAL / WITH / TABLE / GROW）が
ひとつの建物の断面図としてつながり、最終的に光と線で接続され「バラバラな事業ではなく、
ひとつの循環である」ことを視覚的に示す。

3D表現（Three.js / React Three Fiber）は採用していない。表示速度・安定性・実装確実性を
優先し、CSS + SVGレイヤーによる**2.5D建築断面表現**を採用した（指示書 9章・21章の
「品質・速度・安定性を優先し、CSS/SVG/画像レイヤーの2.5D表現が適切な場合はそちらを優先する」
という判断基準に基づく）。

## カラートークン

`src/app/globals.css` の `:root` と `tailwind.config.ts` に定義。

| 変数 | 値 | 用途 |
|---|---|---|
| `--color-ink` | `#171817` | 基本の黒（純黒は使わない） |
| `--color-charcoal` | `#242522` | ダーク背景のセカンダリ |
| `--color-bone` | `#F1EBDD` | ウォームな背景（セクション区切り） |
| `--color-warm-white` | `#FAF7F0` | 基本の明背景・本文用紙面 |
| `--color-moss` | `#526348` | TOWN（地域創生）のアクセント |
| `--color-deep-green` | `#253A2B` | MVVセクション背景など深緑 |
| `--color-bronze` | `#9A714A` | SIGNAL（ブランディング・PR）のアクセント／ANYWARE立体文字の側面色 |
| `--color-clay` | `#A76445` | TABLE（飲食）・CTA全般のアクセント |
| `--color-water` | `#9EBCB5` | GROW（水耕栽培）のアクセント |
| `--color-line` | `rgba(23,24,23,0.16)` | ボーダー・区切り線 |

原色のグラデーションや紫/青のAI感あるグラデーションは使用していない。

## タイポグラフィ

- 英語見出し・巨大タイポ: **Manrope**（`next/font/google`、`--font-display`）
- 日本語本文・見出し: **Noto Sans JP**（`next/font/google`、`--font-jp`）
- いずれも商用利用・Web配信可能なオープンソースフォント（Google Fonts配信）。
- クラス:
  - `.type-display` … 英語建築的見出し（font-weight 700, letter-spacing -0.01em）
  - `.type-jp-heading` … 日本語見出し
  - `.type-jp-body` … 日本語本文（line-height 1.9、読みやすさ優先）
  - `.type-label` … 小さな英語ラベル（letter-spacing 0.22em、全セクション共通の「小さな英語カテゴリー」表現）
- サイズは `clamp()` を多用し、PC〜モバイルで滑らかに変化させている（例:
  `text-[clamp(2.6rem,9vw,6rem)]`）。

## 立体文字表現（ArchitecturalWord）

`src/components/ui/ArchitecturalWord.tsx`。CSSの`text-shadow`を多層に重ねることで
「彫刻・看板・建築物の一部としての立体文字」を表現している（3D CSS transformやWebGLは
不使用。パフォーマンスと表示崩れの少なさを優先）。

## 建築空間イラスト

`src/components/home/DistrictIllustration.tsx`（俯瞰・全景）と
`src/components/home/BusinessZoneScene.tsx`（個別事業のクローズアップ）。
SVGによる断面図として、5つの部屋・窓明かり・什器・植物・湯気・水耕栽培ラック等を
シンボリックに表現している。実写素材への差し替え手順は
`IMAGE_GENERATION_PROMPTS.md` を参照。

## モーション設計

- 使用ライブラリ: なし（GSAPは未導入。IntersectionObserverとCSS
  transitionのみで、指示書が要求するスクロール演出の大部分を実装できたため、
  「必要最小限」の原則に従い依存を増やしていない）。
- `useInView`フック（`src/lib/useInView.ts`）でセクション単位のフェード＋トランスレーション。
- Hero（`HeroDistrict.tsx`）のみ、スクロール位置に応じた視点接近（scale/translateY）と
  マウス追従パララックス（最大12px程度）を実装。`prefers-reduced-motion: reduce` では
  完全に無効化される。
- `motion-safe-only` クラス＋`@media (prefers-reduced-motion: reduce)` により、
  グレインアニメーション・湯気・葉の揺れ・シマー等の無限ループアニメーションも停止する。

## コンポーネント構成

`src/components/` 配下に指示書のコンポーネント一覧を概ね反映：
`layout/`（SiteHeader, MobileMenu, SiteFooter）、`home/`（HeroDistrict,
DistrictIllustration, BusinessZoneScene, BusinessDistrict, BusinessZone,
PhilosophySection, EcosystemFlow, WorksArchive, RealBusiness, MVVSection,
CompanyGateway, RecruitGateway, ContactGateway）、`ui/`（SectionLabel,
MagneticLink, ArchitecturalWord, GrainOverlay, PageIntro, Breadcrumbs, FaqList,
ContactCta）、`motion/MotionProvider`（reduced-motion判定のcontext提供）、
`forms/ContactForm`。

## レスポンシブ方針

- Desktop（1280px+）: 建築空間をフルに活用、横スクロールカルーセルで事業を巡る。
- Tablet（768–1279px）: カード幅を`vw`基準で縮小、タッチ操作前提。
- Mobile（767px以下）: 縦スクロール中心に再構成。3Dシーンの単純縮小はせず、
  各事業は縦積みのカードとして独立して閲覧できるようにしている。`100svh`/`100dvh`相当の
  単位（Tailwindの`min-h-[100svh]`）を使用し、モバイルブラウザのUIバーによる
  レイアウトジャンプを避けている。
