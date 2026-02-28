export type PercentageCalculationType =
  | "percentage"
  | "discount"
  | "increase";

export interface PercentageResult {
  result: number;
  resultLabel: string;
  isRounded: boolean;
  explanation: ExplanationStep[];
  shortcutTip: ShortcutTip;
  isZeroBase: boolean;
}

export interface ExplanationStep {
  type: "step" | "why" | "note";
  title?: string;
  content: string;
  formula?: string;
}

export interface ShortcutTip {
  multiplier: number;
  description: string;
  formula: string;
}
