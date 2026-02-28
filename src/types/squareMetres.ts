export type LengthUnit = "mm" | "cm" | "m" | "km";

export interface SquareMetresResult {
  areaM2: number;
  areaFormatted: string;
  isRounded: boolean;
  lengthInMetres: number;
  widthInMetres: number;
  explanation: SquareMetresExplanationStep[];
  supplementary: SupplementaryUnit[];
}

export interface SquareMetresExplanationStep {
  type: "conversion" | "multiplication" | "why";
  label?: string;
  content: string;
  formula?: string;
  reason?: string;
}

export interface SupplementaryUnit {
  unit: string;
  value: string;
  isRounded: boolean;
}
