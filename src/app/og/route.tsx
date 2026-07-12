import { ImageResponse } from "next/og";
import { siteConfig } from "@/data/site";

export const runtime = "edge";

export async function GET() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "1200px",
          height: "630px",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          padding: "80px",
          background:
            "linear-gradient(160deg, #171817 0%, #253A2B 55%, #171817 100%)",
          color: "#F1EBDD",
          fontFamily: "sans-serif",
        }}
      >
        <div
          style={{
            fontSize: 22,
            letterSpacing: 6,
            color: "#9A714A",
            marginBottom: 24,
            display: "flex",
          }}
        >
          {siteConfig.category}
        </div>
        <div style={{ fontSize: 108, fontWeight: 800, letterSpacing: -2, display: "flex" }}>
          AnyWare
        </div>
        <div style={{ fontSize: 30, marginTop: 28, opacity: 0.85, display: "flex" }}>
          余白から、まちを動かす。
        </div>
      </div>
    ),
    { width: 1200, height: 630 }
  );
}
