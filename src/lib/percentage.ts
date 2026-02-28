import type {
  PercentageCalculationType,
  PercentageResult,
  ExplanationStep,
  ShortcutTip,
} from "@/types/percentage";

/**
 * Rounds a number to 2 decimal places.
 */
function round(num: number): number {
  return parseFloat(num.toFixed(2));
}

/**
 * Returns true if rounding to 2 decimal places changes the value.
 */
function wasRounded(num: number): boolean {
  return parseFloat(num.toFixed(2)) !== num;
}

/**
 * Calculates a percentage-based result with explanation and shortcut tip.
 */
export function calculatePercentage(
  type: PercentageCalculationType,
  percentage: number,
  base: number
): PercentageResult {
  const isZeroBase = base === 0;

  if (type === "percentage") {
    return calculatePercentageOfNumber(percentage, base, isZeroBase);
  } else if (type === "discount") {
    return calculatePercentageDiscount(percentage, base, isZeroBase);
  } else {
    return calculatePercentageIncrease(percentage, base, isZeroBase);
  }
}

function calculatePercentageOfNumber(
  percentage: number,
  base: number,
  isZeroBase: boolean
): PercentageResult {
  const result = (base * percentage) / 100;
  const multiplier = percentage / 100;

  const explanation: ExplanationStep[] = [
    {
      type: "step",
      title: "Step 1",
      content: "Divide the percentage by 100 to get a decimal.",
      formula: `${percentage} ÷ 100 = ${multiplier}`,
    },
    {
      type: "step",
      title: "Step 2",
      content: "Multiply the base number by the decimal.",
      formula: `${base} × ${multiplier} = ${round(result)}`,
    },
    {
      type: "why",
      content: `"Percent" means "per hundred". So ${percentage}% means ${percentage} out of every 100. Multiplying ${base} by ${percentage}/100 scales it down to that proportion.`,
    },
  ];

  const shortcutTip: ShortcutTip = {
    multiplier,
    description: `To find ${percentage}% of any number, multiply it by ${multiplier}.`,
    formula: `${base} × ${multiplier} = ${round(result)}`,
  };

  return {
    result: round(result),
    resultLabel: `${percentage}% of ${base}`,
    isRounded: wasRounded(result),
    explanation,
    shortcutTip,
    isZeroBase,
  };
}

function calculatePercentageDiscount(
  percentage: number,
  base: number,
  isZeroBase: boolean
): PercentageResult {
  const discountAmount = (base * percentage) / 100;
  const result = base - discountAmount;
  const keepPercentage = 100 - percentage;
  const multiplier = keepPercentage / 100;

  const explanation: ExplanationStep[] = [
    {
      type: "step",
      title: "Step 1",
      content: `Calculate the discount amount — ${percentage}% of ${base}.`,
      formula: `${base} × ${percentage}/100 = ${round(discountAmount)}`,
    },
    {
      type: "step",
      title: "Step 2",
      content: "Subtract the discount from the original price.",
      formula: `${base} − ${round(discountAmount)} = ${round(result)}`,
    },
    {
      type: "why",
      content: `A ${percentage}% discount means you pay ${keepPercentage}% of the original price. Removing ${percentage} parts out of every 100 from ${base} leaves you with ${round(result)}.`,
    },
  ];

  const shortcutTip: ShortcutTip = {
    multiplier,
    description: `100% is made up of ${percentage}% discount and ${keepPercentage}% keep — you're interested in the part you keep, so multiply by ${keepPercentage} ÷ 100 = ${multiplier}.`,
    formula: `${base} × ${multiplier} = ${round(result)}`,
  };

  return {
    result: round(result),
    resultLabel: `${base} after a ${percentage}% discount`,
    isRounded: wasRounded(result),
    explanation,
    shortcutTip,
    isZeroBase,
  };
}

function calculatePercentageIncrease(
  percentage: number,
  base: number,
  isZeroBase: boolean
): PercentageResult {
  const increaseAmount = (base * percentage) / 100;
  const result = base + increaseAmount;
  const totalPercentage = 100 + percentage;
  const multiplier = totalPercentage / 100;

  const explanation: ExplanationStep[] = [
    {
      type: "step",
      title: "Step 1",
      content: `Calculate the increase amount — ${percentage}% of ${base}.`,
      formula: `${base} × ${percentage}/100 = ${round(increaseAmount)}`,
    },
    {
      type: "step",
      title: "Step 2",
      content: "Add the increase to the original number.",
      formula: `${base} + ${round(increaseAmount)} = ${round(result)}`,
    },
    {
      type: "why",
      content: `A ${percentage}% increase means you end up with ${totalPercentage}% of the original value. Adding ${percentage} parts out of every 100 of ${base} gives ${round(result)}.`,
    },
  ];

  const shortcutTip: ShortcutTip = {
    multiplier,
    description: `A ${percentage}% increase means you have 100% + ${percentage}% = ${totalPercentage}% — that's ${totalPercentage} ÷ 100 = ${multiplier}.`,
    formula: `${base} × ${multiplier} = ${round(result)}`,
  };

  return {
    result: round(result),
    resultLabel: `${base} after a ${percentage}% increase`,
    isRounded: wasRounded(result),
    explanation,
    shortcutTip,
    isZeroBase,
  };
}
