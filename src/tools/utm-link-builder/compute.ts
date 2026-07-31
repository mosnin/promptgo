import type { ComputeFn, ToolSelfTest } from "@/lib/tool-types";

/**
 * Builds a UTM tagged URL from a base URL and the five standard parameters.
 *
 * Existing query parameters on the base URL are preserved and the utm_*
 * parameters are appended after them, using the platform's own URL and
 * URLSearchParams so the encoding is exactly what a browser or ad platform
 * would produce, not a hand rolled string concatenation.
 */
export const compute: ComputeFn = (inputs) => {
  const baseUrl = String(inputs.baseUrl ?? "").trim();
  const source = String(inputs.source ?? "").trim();
  const medium = String(inputs.medium ?? "").trim();
  const campaign = String(inputs.campaign ?? "").trim();
  const term = String(inputs.term ?? "").trim();
  const content = String(inputs.content ?? "").trim();

  if (!baseUrl) {
    return { kind: "error", message: "Enter the destination URL the link should point to." };
  }

  let url: URL;
  try {
    url = new URL(baseUrl);
  } catch {
    return { kind: "error", message: `"${baseUrl}" is not a valid URL. Include the protocol, for example https://.` };
  }

  if (!source || !medium || !campaign) {
    return { kind: "error", message: "Source, medium and campaign are required. Term and content are optional." };
  }

  url.searchParams.set("utm_source", source);
  url.searchParams.set("utm_medium", medium);
  url.searchParams.set("utm_campaign", campaign);
  if (term) url.searchParams.set("utm_term", term);
  if (content) url.searchParams.set("utm_content", content);

  return {
    kind: "text",
    label: "Tracking URL",
    value: url.toString(),
    monospace: true,
    notes: [
      "Analytics platforms treat utm_source, utm_medium and utm_campaign as case sensitive, so keep the casing consistent across every link in the same campaign.",
      "utm_term and utm_content are left out of the URL entirely when blank, rather than appended empty.",
    ],
  };
};

export const selfTests: ToolSelfTest[] = [
  {
    name: "builds a correct link from a clean base URL",
    inputs: {
      baseUrl: "https://example.com/spring-sale",
      source: "newsletter",
      medium: "email",
      campaign: "spring_sale_2026",
      term: "",
      content: "",
    },
    check: (result) =>
      result.kind === "text" &&
      result.value ===
        "https://example.com/spring-sale?utm_source=newsletter&utm_medium=email&utm_campaign=spring_sale_2026",
  },
  {
    name: "preserves an existing query string rather than breaking it",
    inputs: {
      baseUrl: "https://example.com/product?variant=blue",
      source: "google",
      medium: "cpc",
      campaign: "brand",
      term: "",
      content: "",
    },
    check: (result) =>
      result.kind === "text" &&
      result.value.startsWith("https://example.com/product?variant=blue&utm_source=google"),
  },
  {
    name: "overwrites an existing utm_source rather than duplicating it",
    inputs: {
      baseUrl: "https://example.com/?utm_source=old",
      source: "newsletter",
      medium: "email",
      campaign: "test",
      term: "",
      content: "",
    },
    check: (result) => {
      if (result.kind !== "text") return false;
      const occurrences = result.value.split("utm_source=").length - 1;
      return occurrences === 1 && result.value.includes("utm_source=newsletter");
    },
  },
  {
    name: "leaves term and content out entirely when blank",
    inputs: {
      baseUrl: "https://example.com",
      source: "x",
      medium: "social",
      campaign: "launch",
      term: "",
      content: "",
    },
    check: (result) =>
      result.kind === "text" && !result.value.includes("utm_term") && !result.value.includes("utm_content"),
  },
  {
    name: "includes term and content when both are given",
    inputs: {
      baseUrl: "https://example.com",
      source: "google",
      medium: "cpc",
      campaign: "brand",
      term: "running shoes",
      content: "ad-a",
    },
    check: (result) =>
      result.kind === "text" &&
      result.value.includes("utm_term=running") &&
      result.value.includes("utm_content=ad-a"),
  },
  {
    name: "rejects a missing or malformed destination URL",
    inputs: { baseUrl: "not a url", source: "x", medium: "y", campaign: "z", term: "", content: "" },
    check: (result) => result.kind === "error",
  },
  {
    name: "rejects a blank required field",
    inputs: { baseUrl: "https://example.com", source: "", medium: "email", campaign: "z", term: "", content: "" },
    check: (result) => result.kind === "error",
  },
];
