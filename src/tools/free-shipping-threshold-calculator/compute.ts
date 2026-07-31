import type { ComputeFn, ToolSelfTest } from "@/lib/tool-types";

/**
 * Compares a cart's current value against a store's free shipping threshold.
 *
 * The remaining amount is simply the threshold minus the current cart value,
 * floored at $0: a cart cannot be more unlocked than "unlocked", so once the
 * cart value meets or passes the threshold there is nothing left to add.
 * When the threshold has already been met, the result reports how far over
 * it the cart is instead, since that is the useful number once free shipping
 * is already guaranteed. When it has not been met, the result reports the
 * shipping cost that applies if the shopper checks out without adding more,
 * which is the number that makes the remaining amount worth comparing
 * against in the first place.
 */
export const compute: ComputeFn = (inputs) => {
  const cartValue = toNumber(inputs.cartValue);
  const threshold = toNumber(inputs.threshold);
  const shippingCost = toNumber(inputs.shippingCost);

  if (!Number.isFinite(cartValue) || !Number.isFinite(threshold) || !Number.isFinite(shippingCost)) {
    return { kind: "error", message: "Enter the cart value, free shipping threshold and shipping cost as numbers." };
  }

  if (cartValue < 0 || threshold < 0 || shippingCost < 0) {
    return { kind: "error", message: "Cart value, threshold and shipping cost cannot be negative." };
  }

  const remaining = Math.max(0, threshold - cartValue);

  if (remaining === 0) {
    const overage = Math.max(0, cartValue - threshold);
    return {
      kind: "value",
      headline: { label: "Free shipping status", value: "Free shipping unlocked" },
      secondary: [{ label: "Amount over threshold", value: formatCurrency(overage) }],
      notes: [
        "The cart value has met or passed the free shipping threshold, so shipping cost no longer applies at this cart value.",
      ],
    };
  }

  return {
    kind: "value",
    headline: { label: "Free shipping status", value: `${formatCurrency(remaining)} more for free shipping` },
    secondary: [
      { label: "Current cart value", value: formatCurrency(cartValue) },
      { label: "Free shipping threshold", value: formatCurrency(threshold) },
      { label: "Shipping cost if not reached", value: formatCurrency(shippingCost) },
    ],
    notes: [
      "Adding items worth this amount or more to the cart before checkout would unlock free shipping instead of paying the shipping cost above.",
    ],
  };
};

function toNumber(value: unknown): number {
  return typeof value === "number" ? value : Number(value);
}

function formatCurrency(value: number): string {
  return `$${value.toFixed(2)}`;
}

export const selfTests: ToolSelfTest[] = [
  {
    name: "a cart below the threshold reports the remaining amount and shipping cost",
    inputs: { cartValue: 42, threshold: 75, shippingCost: 6.99 },
    check: (result) =>
      result.kind === "value" &&
      result.headline.value === "$33.00 more for free shipping" &&
      result.secondary?.[0].value === "$42.00" &&
      result.secondary?.[1].value === "$75.00" &&
      result.secondary?.[2].value === "$6.99",
  },
  {
    name: "a cart exactly at the threshold unlocks free shipping with $0 over",
    inputs: { cartValue: 75, threshold: 75, shippingCost: 6.99 },
    check: (result) =>
      result.kind === "value" &&
      result.headline.value === "Free shipping unlocked" &&
      result.secondary?.[0].value === "$0.00",
  },
  {
    name: "a cart above the threshold unlocks free shipping and notes the overage",
    inputs: { cartValue: 90, threshold: 75, shippingCost: 6.99 },
    check: (result) =>
      result.kind === "value" &&
      result.headline.value === "Free shipping unlocked" &&
      result.secondary?.[0].value === "$15.00",
  },
  {
    name: "a threshold of $0 always unlocks free shipping regardless of cart value",
    inputs: { cartValue: 12, threshold: 0, shippingCost: 4.5 },
    check: (result) =>
      result.kind === "value" &&
      result.headline.value === "Free shipping unlocked" &&
      result.secondary?.[0].value === "$12.00",
  },
  {
    name: "a negative cart value is rejected as an error",
    inputs: { cartValue: -5, threshold: 75, shippingCost: 6.99 },
    check: (result) => result.kind === "error",
  },
  {
    name: "a negative shipping cost is rejected as an error",
    inputs: { cartValue: 42, threshold: 75, shippingCost: -1 },
    check: (result) => result.kind === "error",
  },
];
