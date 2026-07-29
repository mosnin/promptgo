import { ImageResponse } from "next/og";
import { getCategory } from "@/lib/categories";
import { getTool, tools } from "@/lib/tools";
import { site } from "@/lib/site";

export const alt = "Tool preview";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

/**
 * Per tool social card.
 *
 * Every page having its own image matters more here than on most sites: the
 * catalogue is 253 near identical layouts, so a shared card would make every
 * share of every tool look like a share of the same page. The card leads with
 * the conversion itself, drawn the way the tool cards on the site draw it, so a
 * link pasted into Slack answers "which converter" before anyone clicks.
 *
 * Generated at build time, one static PNG per route, so there is no runtime
 * cost and nothing to cache invalidate.
 */
export function generateStaticParams() {
  return tools.map((tool) => ({ category: tool.category, tool: tool.slug }));
}

export default async function ToolOpengraphImage({
  params,
}: {
  params: Promise<{ category: string; tool: string }>;
}) {
  const { tool: slug } = await params;
  const tool = getTool(slug);
  const category = tool ? getCategory(tool.category) : undefined;

  const accent = category?.accent ?? "#5cc8ff";
  const from = tool?.accepts?.[0]?.replace(/^\./, "").toUpperCase() ?? "FILE";
  const to = tool?.outputs?.replace(/^\./, "").toUpperCase() ?? "RESULT";
  const showConversion = Boolean(tool?.outputs);

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
            top: -260,
            left: 300,
            width: 760,
            height: 640,
            background: `radial-gradient(circle, ${accent}44 0%, rgba(15,16,21,0) 70%)`,
            display: "flex",
          }}
        />

        <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
          <div
            style={{
              padding: "8px 16px",
              borderRadius: 999,
              border: "1px solid #2b2f3a",
              background: "#191b22",
              fontSize: 22,
              color: accent,
              letterSpacing: "0.1em",
              textTransform: "uppercase",
              display: "flex",
            }}
          >
            {category?.name ?? "Tools"}
          </div>
          <div style={{ fontSize: 24, color: "#7c8395", display: "flex" }}>{site.name}</div>
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: 28 }}>
          {showConversion && (
            <div style={{ display: "flex", alignItems: "center", gap: 28 }}>
              <div
                style={{
                  fontSize: 64,
                  fontWeight: 600,
                  color: "#f7f8fb",
                  letterSpacing: "-0.03em",
                  display: "flex",
                }}
              >
                {from}
              </div>
              <div style={{ display: "flex", alignItems: "center", width: 160, height: 2 }}>
                <div style={{ width: "100%", height: 2, background: accent, display: "flex" }} />
              </div>
              <div
                style={{
                  fontSize: 64,
                  fontWeight: 600,
                  color: accent,
                  letterSpacing: "-0.03em",
                  display: "flex",
                }}
              >
                {to}
              </div>
            </div>
          )}

          <div
            style={{
              fontSize: showConversion ? 52 : 72,
              lineHeight: 1.06,
              letterSpacing: "-0.035em",
              color: "#f7f8fb",
              fontWeight: 600,
              maxWidth: 1000,
              display: "flex",
            }}
          >
            {tool?.name ?? site.name}
          </div>
        </div>

        <div style={{ display: "flex", fontSize: 24, color: "#9aa1b1" }}>
          Runs in your browser. No upload, no signup, no file size limit.
        </div>
      </div>
    ),
    size,
  );
}
