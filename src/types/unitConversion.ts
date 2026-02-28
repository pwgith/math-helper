export type UnitCategory = "length" | "weight" | "volume" | "temperature";

export type UnitId =
  | "mm" | "cm" | "m" | "km" | "in" | "ft" | "yd" | "mi"
  | "mg" | "g" | "kg" | "lb" | "oz"
  | "ml" | "l" | "gal" | "pt"
  | "C" | "F" | "K";

export interface UnitInfo {
  id: UnitId;
  label: string;
  shortLabel: string;
  category: UnitCategory;
}

export interface UnitGroup {
  category: UnitCategory;
  label: string;
  units: UnitInfo[];
}

export interface ConversionResult {
  type: "success";
  value: number;
  formatted: string;
  isRounded: boolean;
  fromLabel: string;
  toLabel: string;
  explanation: ConversionExplanationStep[];
}

export interface IncompatibleResult {
  type: "incompatible";
  message: string;
}

export type UnitConversionResult = ConversionResult | IncompatibleResult;

export interface ConversionExplanationStep {
  type: "factor" | "calculation" | "formula" | "why";
  content: string;
  formula?: string;
}
