import { ImageResponse } from "next/og";

export const alt = "AI Garage";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OpenGraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          padding: 80,
          background: "#0a0a0a",
          color: "#ffffff",
          fontFamily: "system-ui, sans-serif",
        }}
      >
        <div
          style={{
            fontSize: 20,
            letterSpacing: "0.12em",
            textTransform: "uppercase",
            color: "#7d8187",
            marginBottom: 24,
          }}
        >
          Side projects
        </div>
        <div style={{ fontSize: 72, fontWeight: 400, letterSpacing: "-0.02em" }}>
          AI Garage
        </div>
        <div style={{ fontSize: 28, color: "#dadbdf", marginTop: 20, maxWidth: 720 }}>
          AI-powered tools for builders — starting with PixelAgent.
        </div>
      </div>
    ),
    { ...size },
  );
}
