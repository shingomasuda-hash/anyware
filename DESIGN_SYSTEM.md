# DESIGN SYSTEM — THE ANYWARE HOUSE (v2)

株式会社AnyWareのコーポレートサイトにおけるデザイントークンとビジュアル文法。
v2で「THE UPDATE DISTRICT」から全面的なビジュアル刷新を行い、コンセプトを
**THE ANYWARE HOUSE** に更新した。文章・情報構成・ルーティング・SEO・フォーム機能は
v1から維持し、アートディレクション／レイアウト／モーションのみを刷新している。
刷新前の課題分析は `DESIGN_AUDIT.md` を参照。

## コンセプト

AnyWareの5つの事業を、ひとつの建築＝AnyWare Houseの中に存在する部屋として表現する。

- 地域創生 → **TOWN COMMONS**
- ブランディング・PR → **SIGNAL STUDIO**
- 事業伴走 → **PARTNER ROOM**
- 飲食 → **TABLE & KITCHEN**
- 水耕栽培 → **GREEN LAB**

ドーム型の断面構造を持つひとつの建物として、5部屋を横に並べたSVGで構成し
（`DistrictIllustration.tsx`）、床の案内サイン、屋根に埋め込まれた灯り、部屋ごとに異なる
色温度、ガラス反射、間仕切り柱、地面の影などのディテールで「建築模型／映画のセット」の
質感を狙っている。

3D表現（Three.js / React Three Fiber）は採用していない。表示速度・安定性・実装確実性を
優先し、CSS + SVGレイヤーによる**2.5D建築断面表現**を採用した。

## カラートークン

`src/app/globals.css` の `:root` と `tailwind.config.ts` に定義。

| 変数 | 値 | 用途 |
|---|---|---|
| `--color-ink` | `#171915` | 基本の黒（純黒は使わない） |
| `--color-charcoal` | `#232620` | ダーク背景のセカンダリ |
| `--color-night-green` | `#101611` | 最も暗い外部・夜の背景 |
| `--color-deep-green` | `#202B22` | MVV・REAL BUSINESS背景など深緑 |
| `--color-bone` | `#DFD5C2` | ウォームな背景（セクション区切り） |
| `--color-warm-white` | `#F5F0E5` | 基本の明背景・本文用紙面 |
| `--color-wood` | `#8B5E3C` | 什器・木部の質感 |
| `--color-bronze` | `#A47A4E` | SIGNAL STUDIOのアクセント／立体文字の側面色 |
| `--color-moss` | `#526849` | TOWN COMMONSのアクセント |
| `--color-leaf` | `#789366` | 植物・GREEN LABの葉 |
| `--color-water` | `#9CBDB5` | GREEN LABの水・淡い水色 |
| `--color-clay` | `#B56F4B` | TABLE & KITCHENのアクセント |
| `--color-amber-light` | `#F1B86B` | 室内照明・サイン・CTAのハイライト |
| `--color-line` / `--color-line-light` | 半透明の濃色／淡色 | 明背景／暗背景それぞれの区切り線 |

原色のグラデーションや紫/青のAI感あるグラデーションは使用していない。

## タイポグラフィ

- 英語見出し・巨大タイポ: **Manrope**（`next/font/google`、`--font-display`）
- 日本語本文・見出し: **Noto Sans JP**（`next/font/google`、`--font-jp`）
- クラス: `.type-display` / `.type-jp-heading` / `.type-jp-body` / `.type-label`
- サイズは `clamp()` を多用（例: `text-[clamp(3rem,12vw,9.5rem)]`）。

## 質感ユーティリティ（`globals.css`）

- `.surface-glass` … ガラス面の斜め反射ハイライト
- `.surface-vignette` … 中央に視線を集める放射状ビネット
- `.sign-plate` … 案内板・サインのようなCTAボタン（枠線＋内側ハイライト＋ホバーで琥珀色に）
- `.light-glow` / `.texture-wood` / `.fade-mask-b` / `.fade-mask-t` … 光だまり・木目・
  上下フェードマスク

SVGフィルター（`feGaussianBlur`によるソフトグロー）、`mix-blend-mode: screen`
（ガラス反射・グレイン）、`clip-path`（WORKSセクションのマスク開閉）も使用している。

## 立体文字表現（ArchitecturalWord）

`src/components/ui/ArchitecturalWord.tsx`。`text-shadow`を多層に重ね、さらに反対方向へ
1pxの琥珀色ハイライトを加えることで「上から光が当たる立体オブジェクト」を表現している。
ヒーローでは建物手前・床に立つ位置に配置し、下部を画面外へ意図的にクロップし、
鉢植え・ポディウムなどの前景要素で一部を隠すことで空間内オブジェクトとして統合した。

## 建築空間イラスト

- `DistrictIllustration.tsx` … ドーム断面の建物全景。屋根の灯り、5部屋、部屋ごとの什器
  （RoomProps）、壁面サインプレート、`showConnections`による部屋間の接続線、`litCount`
  による順次点灯を実装。ヒーロー／MVV／モバイルメニューの背景で再利用。
- `BusinessZoneScene.tsx` … 1部屋を大きく見せるクローズアップ。奥壁・側壁・床の三面で
  奥行きを表現し、部屋種別ごとに異なる什器・光源・動きを描画。BUSINESS セクションの
  ピン留めツアーと `/business/[slug]` 詳細ページ、WORKSセクションの背景で共用。
- `DistantSkyline.tsx` / `ForegroundProps.tsx` … ヒーロー専用の遠景（街並み・星）と
  前景（鉢植え・低い塀）レイヤー。

## モーション設計

- 使用ライブラリ: なし（GSAP/Three.jsは未導入）。`IntersectionObserver`ベースの
  `useInView`フック（`src/lib/useInView.ts`）とCSS transitionの組み合わせのみで、
  カメラ視点移動・マスク開閉・照明の点灯・視差・接続線の描画を実装している。
- Hero: マウス位置に応じてレイヤーごとに異なる速度（遠景0.3倍・建物0.55倍・前景1倍・
  巨大文字0.6倍）で追従するパララックスと、スクロール量に応じた建物のスケール変化。
- BUSINESS: `position: sticky`を使ったピン留めスクロール（デスクトップ）。スクロール
  位置から現在の部屋インデックスを計算し、背景シーンとテキストパネルをクロスフェード。
  モバイル／タブレットは通常のスタック（縦スクロール）に切り替える。
- WORKS: 各実績パネルは`clip-path: inset()`のワイプで出現。**注意点**:
  `IntersectionObserver`の対象要素自体に`clip-path`を適用すると、描画面積が0になり
  判定が発火しなくなる（実装中に発見した不具合）。refは素の外枠に、clip-pathは内側の
  別要素に分離することで回避している。
- `motion-safe-only`クラス＋`@media (prefers-reduced-motion: reduce)`で、
  グレイン・湯気・葉の揺れ・シマー・パララックス・視点移動をすべて無効化する。

## コンポーネント構成

`src/components/home/`: HeroDistrict, DistrictIllustration, DistantSkyline,
ForegroundProps, InteriorScene, PhilosophySection, BusinessDistrict,
BusinessZoneScene, WorksArchive, EcosystemFlow, RealBusiness, MVVSection,
CompanyGateway, RecruitGateway, ContactGateway。
`src/components/layout/`: SiteHeader, MobileMenu（建物案内図スタイル）, SiteFooter。
`src/components/ui/`: SectionLabel, MagneticLink, ArchitecturalWord, GrainOverlay,
PageIntro, Breadcrumbs, FaqList, ContactCta。

## レスポンシブ方針

- Desktop（1280px+）/ Tablet（768–1279px）: 建築空間をフルに活用。BUSINESSセクションは
  ピン留めスクロールで5部屋を巡る。
- Mobile（767px以下）: 建物全体を単純縮小せず、ヒーローはCSSのオーバーサイズ表示
  （`w-[230%]` + `overflow-hidden`）で建物の一部を大きくズームして見せる。BUSINESSは
  ピン留めをやめ、各部屋を`min-h-[100svh]`で縦に連続させる構成に切り替える。
  `100svh`を使用し、モバイルブラウザのUIバーによるレイアウトジャンプを避けている。
