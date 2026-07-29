import { ImageResponse } from "next/og";
import { site } from "@/lib/site";
import { totalPromptCount } from "@/lib/prompts";

export const alt = `${site.name}: ${site.tagline}`;
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

/**
 * Default social card. Individual prompt pages inherit this rather than each
 * generating a bespoke image, which keeps build times flat as the catalogue
 * grows past a hundred pages.
 */
export default function OpengraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          background: "#0f1015",
          padding: 72,
          position: "relative",
        }}
      >
        <div
          style={{
            position: "absolute",
            top: -240,
            left: 240,
            width: 760,
            height: 620,
            background:
              "radial-gradient(circle, rgba(92,200,255,0.34) 0%, rgba(15,16,21,0) 70%)",
            display: "flex",
          }}
        />

        <div style={{ display: "flex", alignItems: "center", gap: 18 }}>
          <div
            style={{
              width: 56,
              height: 56,
              borderRadius: 14,
              border: "1px solid #2b2f3a",
              background: "#191b22",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontSize: 26,
              fontWeight: 700,
              color: "#5cc8ff",
            }}
          >
            FK
          </div>
          <div style={{ fontSize: 34, color: "#f2f3f7", fontWeight: 600, display: "flex" }}>
            {site.name}
          </div>
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: 24 }}>
          <div
            style={{
              fontSize: 74,
              lineHeight: 1.04,
              letterSpacing: "-0.035em",
              color: "#f7f8fb",
              fontWeight: 600,
              maxWidth: 940,
              display: "flex",
            }}
          >
            {totalPromptCount}+ free file conversion prompts that run in your browser
          </div>
          <div style={{ fontSize: 30, color: "#9aa1b1", display: "flex" }}>
            No uploads. No signup. No file size limits.
          </div>
        </div>

        <div
          style={{
            display: "flex",
            gap: 14,
            fontSize: 22,
            color: "#7c8395",
            letterSpacing: "0.06em",
            textTransform: "uppercase",
          }}
        >
          <span>Images</span>
          <span>/</span>
          <span>PDF</span>
          <span>/</span>
          <span>Code</span>
          <span>/</span>
          <span>Data</span>
          <span>/</span>
          <span>Media</span>
        </div>
      </div>
    ),
    size,
  );
}
