export type CompanyFact = {
  label: string;
  value: string | null; // null = 未確認。UIでは「確認中」と表示する。
};

// 現行サイト(any-ware.jp)は本セッションの環境からアクセスできず、
// 会社概要の一次情報を直接確認できなかった。確認できた事実のみ value を設定し、
// それ以外は null のままにしている。正式な値が判明次第、直接この値を更新すること。
export const companyFacts: CompanyFact[] = [
  { label: "商号", value: "株式会社AnyWare" },
  { label: "事業エリア", value: "大阪・京都エリアを中心に活動" },
  { label: "設立", value: null },
  { label: "代表者", value: null },
  { label: "資本金", value: null },
  { label: "所在地", value: null },
  { label: "電話番号", value: null },
  { label: "事業内容", value: "地域創生・地域共創／ブランディング・PR／事業伴走・コンサルティング／飲食店事業・飲食店支援／水耕栽培事業" },
];

export const mvv = {
  mission: {
    label: "MISSION",
    labelJp: "ミッション",
    body: "世の中をアップデートする。",
  },
  vision: {
    label: "VISION",
    labelJp: "ビジョン",
    body: "“経済圏”にうねりを与え、育てる。",
  },
  value: {
    label: "VALUE",
    labelJp: "バリュー",
    body: ["余白を、遊び場に。", "常識を、編集する。"],
  },
};

export const ecosystemFlow = [
  { step: "01", title: "FIND", titleJp: "見つける", body: "まだ言語化されていない魅力や課題を見つける。" },
  { step: "02", title: "EDIT", titleJp: "編集する", body: "情報、価値、強みを整理し、選ばれる理由へ編集する。" },
  { step: "03", title: "DESIGN", titleJp: "設計する", body: "ブランド、導線、体験、事業の形を設計する。" },
  { step: "04", title: "MOVE", titleJp: "動かす", body: "Web、SNS、広告、イベント、店舗などを実際に動かす。" },
  { step: "05", title: "GROW", titleJp: "育てる", body: "数値と現場を見ながら改善し、継続的に育てる。" },
];

export const recruitCopy = {
  headline: "BUILD THE NEXT DISTRICT WITH US.",
  headlineJp: "まだない仕事も、まだない事業も、自分たちでつくっていく。",
  body: [
    "AnyWareは、地域創生、ブランディング・PR、事業伴走、飲食、水耕栽培という複数の事業領域を横断しています。",
    "決められた仕事をこなすのではなく、地域や事業の可能性を見つけ、形にし、現場で育てるところまで携わることができます。",
    "職種や役割の垣根を越えて、事業をつくる側に回りたい人を求めています。",
  ],
  points: [
    {
      title: "裁量",
      body: "企画から実行、現場運営までを任される裁量があります。",
    },
    {
      title: "領域の広さ",
      body: "Web・PRだけでなく、飲食店運営や水耕栽培など、現場を伴う事業にも関わることができます。",
    },
    {
      title: "現場感",
      body: "机上の提案だけでなく、自社事業の現場で得た知見を活かしながら働けます。",
    },
  ],
};
