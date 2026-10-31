import { ImageResponse } from "next/og";

export const runtime = "edge";
export const alt = "SkillSpector Checklist: Scan Agent Skills Before Installing";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function SkillSpectorOgImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          background: "#0f172a",
          color: "#f8fafc",
          padding: "72px 80px",
          fontFamily: "sans-serif",
        }}
      >
        <div style={{ fontSize: 24, color: "#818cf8", fontWeight: 700 }}>
          AGENT TOOLS
        </div>
        <div
          style={{
            marginTop: 24,
            fontSize: 64,
            lineHeight: 1.1,
            fontWeight: 800,
          }}
        >
          SkillSpector Checklist
        </div>
        <div style={{ marginTop: 20, fontSize: 30, color: "#cbd5e1" }}>
          Scan agent skills before installing
        </div>
        <div style={{ display: "flex", gap: 16, marginTop: 40 }}>
          <div
            style={{
              background: "#1e293b",
              border: "1px solid #334155",
              borderRadius: 12,
              padding: "16px 20px",
              fontSize: 22,
            }}
          >
            5-minute checklist
          </div>
          <div
            style={{
              background: "#1e293b",
              border: "1px solid #334155",
              borderRadius: 12,
              padding: "16px 20px",
              fontSize: 22,
            }}
          >
            3 questions per finding
          </div>
          <div
            style={{
              background: "#1e293b",
              border: "1px solid #334155",
              borderRadius: 12,
              padding: "16px 20px",
              fontSize: 22,
            }}
          >
            Do not auto-block
          </div>
        </div>
      </div>
    ),
    { width: 1200, height: 630 },
  );
}
