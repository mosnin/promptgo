import { ImageResponse } from "next/og";
import { getCategory } from "@/lib/categories";
import { getPrompt, prompts } from "@/lib/prompts";
import { site } from "@/lib/site";

export const alt = "Prompt preview";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

/**
 * Per prompt social card.
 *
 * Every page having its own image matters more here than on most sites: the
 * catalogue is 253 near identical layouts, so a shared card would make every
 * share of every prompt look like a share of the same page. The card leads with
 * the task type and variable count, drawn the way the prompt cards do, so a
 * link pasted into Slack answers "which prompt" before anyone clicks.
 *
 * Generated at build time, one static PNG per route, so there is no runtime
 * cost and nothing to cache invalidate.
 */
export function generateStaticParams() {
  return prompts.map((prompt) => ({ category: prompt.category, prompt: prompt.slug }));
}

export default async function ToolOpengraphImage({
  params,
}: {
  params: Promise<{ category: string; prompt: string }>;
}) {
  const { prompt: slug } = await params;
  const prompt = getPrompt(slug);
  const category = prompt ? getCategory(prompt.category) : undefined;

  const accent = category?.accent ?? "#5cc8ff";
  const from = (prompt?.taskType ?? "prompt").toUpperCase();
  const to = prompt ? `${prompt.prompt.variables.length} VARS` : "READY";
  const showConversion = Boolean(prompt);

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
            {category?.name ?? "Prompts"}
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
            {prompt?.name ?? site.name}
          </div>
        </div>

        <div style={{ display: "flex", fontSize: 24, color: "#9aa1b1" }}>
          Tested on current models. Free to copy, no signup required.
        </div>
      </div>
    ),
    size,
  );
}
