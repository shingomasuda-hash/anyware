export const consultationAreas = [
  "地域創生について",
  "ブランディング、PRについて",
  "事業伴走について",
  "飲食について",
  "水耕栽培について",
  "採用について",
  "その他",
] as const;

export type ConsultationArea = (typeof consultationAreas)[number];
