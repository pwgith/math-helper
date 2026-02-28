import type {
  UnitId,
  UnitInfo,
  UnitGroup,
  UnitCategory,
  UnitConversionResult,
  ConversionExplanationStep,
} from "@/types/unitConversion";

/** All supported units with metadata. */
const UNITS: Record<UnitId, UnitInfo> = {
  mm: { id: "mm", label: "Millimetres (mm)", shortLabel: "mm", category: "length" },
  cm: { id: "cm", label: "Centimetres (cm)", shortLabel: "cm", category: "length" },
  m: { id: "m", label: "Metres (m)", shortLabel: "m", category: "length" },
  km: { id: "km", label: "Kilometres (km)", shortLabel: "km", category: "length" },
  in: { id: "in", label: "Inches (in)", shortLabel: "in", category: "length" },
  ft: { id: "ft", label: "Feet (ft)", shortLabel: "ft", category: "length" },
  yd: { id: "yd", label: "Yards (yd)", shortLabel: "yd", category: "length" },
  mi: { id: "mi", label: "Miles (mi)", shortLabel: "mi", category: "length" },
  mg: { id: "mg", label: "Milligrams (mg)", shortLabel: "mg", category: "weight" },
  g: { id: "g", label: "Grams (g)", shortLabel: "g", category: "weight" },
  kg: { id: "kg", label: "Kilograms (kg)", shortLabel: "kg", category: "weight" },
  lb: { id: "lb", label: "Pounds (lb)", shortLabel: "lb", category: "weight" },
  oz: { id: "oz", label: "Ounces (oz)", shortLabel: "oz", category: "weight" },
  ml: { id: "ml", label: "Millilitres (ml)", shortLabel: "ml", category: "volume" },
  l: { id: "l", label: "Litres (l)", shortLabel: "l", category: "volume" },
  gal: { id: "gal", label: "Gallons (gal)", shortLabel: "gal", category: "volume" },
  pt: { id: "pt", label: "Pints (pt)", shortLabel: "pt", category: "volume" },
  C: { id: "C", label: "Celsius (°C)", shortLabel: "°C", category: "temperature" },
  F: { id: "F", label: "Fahrenheit (°F)", shortLabel: "°F", category: "temperature" },
  K: { id: "K", label: "Kelvin (K)", shortLabel: "K", category: "temperature" },
};

/** Grouped units for rendering selects. */
export const UNIT_GROUPS: UnitGroup[] = [
  {
    category: "length",
    label: "Length",
    units: [UNITS.mm, UNITS.cm, UNITS.m, UNITS.km, UNITS.in, UNITS.ft, UNITS.yd, UNITS.mi],
  },
  {
    category: "weight",
    label: "Weight",
    units: [UNITS.mg, UNITS.g, UNITS.kg, UNITS.lb, UNITS.oz],
  },
  {
    category: "volume",
    label: "Volume",
    units: [UNITS.ml, UNITS.l, UNITS.gal, UNITS.pt],
  },
  {
    category: "temperature",
    label: "Temperature",
    units: [UNITS.C, UNITS.F, UNITS.K],
  },
];

/**
 * Conversion factors to a base unit within each category.
 * Length → metres, Weight → grams, Volume → millilitres.
 */
const TO_BASE: Record<string, number> = {
  mm: 0.001, cm: 0.01, m: 1, km: 1000,
  in: 0.0254, ft: 0.3048, yd: 0.9144, mi: 1609.344,
  mg: 0.001, g: 1, kg: 1000, lb: 453.5924, oz: 28.3495,
  ml: 1, l: 1000, gal: 3785.41, pt: 473.176,
};

const CATEGORY_LABELS: Record<UnitCategory, string> = {
  length: "length",
  weight: "weight",
  volume: "volume",
  temperature: "temperature",
};

/**
 * Formats a number to up to 4 decimal places, trimming trailing zeros.
 */
function formatNum(n: number): string {
  return parseFloat(n.toFixed(4)).toString();
}

/**
 * Returns true if rounding to 4 decimal places changes the value.
 */
function wasRounded(n: number): boolean {
  return parseFloat(n.toFixed(4)) !== n;
}

/**
 * Gets the UnitInfo for a given unit ID.
 */
export function getUnitInfo(unitId: UnitId): UnitInfo {
  return UNITS[unitId];
}

/**
 * Capitalises the first letter of a string.
 */
function capitalise(s: string): string {
  return s.charAt(0).toUpperCase() + s.slice(1);
}

/**
 * Converts a temperature value between C, F, and K.
 */
function convertTemperature(value: number, from: UnitId, to: UnitId): number {
  // Convert to Celsius first
  let celsius: number;
  if (from === "C") celsius = value;
  else if (from === "F") celsius = ((value - 32) * 5) / 9;
  else celsius = value - 273.15; // K

  // Convert from Celsius to target
  if (to === "C") return celsius;
  if (to === "F") return (celsius * 9) / 5 + 32;
  return celsius + 273.15; // K
}

interface TempFormula {
  formula: string;
  steps: string;
  why: string;
}

/**
 * Returns temperature conversion formula details.
 */
function getTemperatureFormula(
  value: number,
  from: UnitId,
  to: UnitId,
  result: number
): TempFormula {
  const formulas: Record<string, TempFormula> = {
    "C-F": {
      formula: "°F = °C × 9/5 + 32",
      steps: `${value} × 9/5 + 32 = ${formatNum(result)}`,
      why: "The Fahrenheit scale uses smaller degrees (each °F is 5/9 of a °C) and offsets its zero point to 32 — the freezing point of water in Fahrenheit.",
    },
    "F-C": {
      formula: "°C = (°F − 32) × 5/9",
      steps: `(${value} − 32) × 5/9 = ${formatNum(result)}`,
      why: "To convert from Fahrenheit, first remove the 32-degree offset, then scale from the smaller Fahrenheit degrees to the larger Celsius degrees by multiplying by 5/9.",
    },
    "C-K": {
      formula: "K = °C + 273.15",
      steps: `${value} + 273.15 = ${formatNum(result)}`,
      why: "The Kelvin scale starts at absolute zero (−273.15 °C), so you simply shift the Celsius value up by 273.15.",
    },
    "K-C": {
      formula: "°C = K − 273.15",
      steps: `${value} − 273.15 = ${formatNum(result)}`,
      why: "Since Kelvin starts at absolute zero, subtracting 273.15 brings the value back to the Celsius scale.",
    },
    "F-K": {
      formula: "K = (°F − 32) × 5/9 + 273.15",
      steps: `(${value} − 32) × 5/9 + 273.15 = ${formatNum(result)}`,
      why: "First convert Fahrenheit to Celsius (remove offset and rescale), then shift to Kelvin by adding 273.15.",
    },
    "K-F": {
      formula: "°F = (K − 273.15) × 9/5 + 32",
      steps: `(${value} − 273.15) × 9/5 + 32 = ${formatNum(result)}`,
      why: "First convert Kelvin to Celsius (subtract 273.15), then scale to Fahrenheit and add the 32-degree offset.",
    },
  };

  const key = `${from}-${to}`;
  return formulas[key];
}

/**
 * Returns an explanation for why the conversion factor works.
 */
function getFactorExplanation(
  fromUnit: UnitId,
  toUnit: UnitId,
  factor: number
): string {
  if (factor >= 1) {
    return `There are ${formatNum(factor)} ${UNITS[toUnit].shortLabel} in every ${UNITS[fromUnit].shortLabel}, so multiply the value by ${formatNum(factor)} to convert.`;
  }
  return `One ${UNITS[fromUnit].shortLabel} is ${formatNum(factor)} ${UNITS[toUnit].shortLabel}, so multiply the value by this ratio to convert.`;
}

/**
 * Performs a unit conversion with explanation, or returns an incompatibility message.
 */
export function convertUnits(
  value: number,
  fromUnitId: UnitId,
  toUnitId: UnitId
): UnitConversionResult {
  const fromUnit = UNITS[fromUnitId];
  const toUnit = UNITS[toUnitId];

  // Check category compatibility
  if (fromUnit.category !== toUnit.category) {
    const fromCat = CATEGORY_LABELS[fromUnit.category];
    const toCat = CATEGORY_LABELS[toUnit.category];
    return {
      type: "incompatible",
      message: `${capitalise(fromUnit.label.split(" (")[0].toLowerCase())} measure ${fromCat} while ${toUnit.label.split(" (")[0].toLowerCase()} measure ${toCat} — these are different physical quantities, so converting between them is not meaningful.`,
    };
  }

  // Same unit
  if (fromUnitId === toUnitId) {
    return {
      type: "success",
      value,
      formatted: formatNum(value),
      isRounded: wasRounded(value),
      fromLabel: fromUnit.label.split(" (")[0].toLowerCase(),
      toLabel: toUnit.label.split(" (")[0].toLowerCase(),
      explanation: [
        {
          type: "calculation",
          content: "The input and output units are the same — no conversion needed.",
          formula: `${value} ${fromUnit.shortLabel} = ${formatNum(value)} ${toUnit.shortLabel}`,
        },
      ],
    };
  }

  const isTemp = fromUnit.category === "temperature";

  if (isTemp) {
    const result = convertTemperature(value, fromUnitId, toUnitId);
    const formulaInfo = getTemperatureFormula(value, fromUnitId, toUnitId, result);

    const explanation: ConversionExplanationStep[] = [
      {
        type: "formula",
        content: "Formula:",
        formula: formulaInfo.formula,
      },
      {
        type: "calculation",
        content: "Calculation:",
        formula: formulaInfo.steps,
      },
      {
        type: "why",
        content: formulaInfo.why,
      },
    ];

    return {
      type: "success",
      value: parseFloat(formatNum(result)),
      formatted: formatNum(result),
      isRounded: wasRounded(result),
      fromLabel: fromUnit.label.split(" (")[0].toLowerCase(),
      toLabel: toUnit.label.split(" (")[0].toLowerCase(),
      explanation,
    };
  }

  // Standard conversion via base unit
  const inBase = value * TO_BASE[fromUnitId];
  const result = inBase / TO_BASE[toUnitId];
  const factor = TO_BASE[fromUnitId] / TO_BASE[toUnitId];

  const explanation: ConversionExplanationStep[] = [
    {
      type: "factor",
      content: "Conversion factor:",
      formula: `1 ${fromUnit.shortLabel} = ${formatNum(factor)} ${toUnit.shortLabel}`,
    },
    {
      type: "calculation",
      content: "Calculation:",
      formula: `${value} × ${formatNum(factor)} = ${formatNum(result)}`,
    },
    {
      type: "why",
      content: getFactorExplanation(fromUnitId, toUnitId, factor),
    },
  ];

  return {
    type: "success",
    value: parseFloat(formatNum(result)),
    formatted: formatNum(result),
    isRounded: wasRounded(result),
    fromLabel: fromUnit.label.split(" (")[0].toLowerCase(),
    toLabel: toUnit.label.split(" (")[0].toLowerCase(),
    explanation,
  };
}
