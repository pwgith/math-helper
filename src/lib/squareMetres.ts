import type {
  LengthUnit,
  SquareMetresResult,
  SquareMetresExplanationStep,
  SupplementaryUnit,
} from "@/types/squareMetres";

const TO_METRES: Record<LengthUnit, number> = {
  mm: 0.001,
  cm: 0.01,
  m: 1,
  km: 1000,
};

const UNIT_NAMES: Record<LengthUnit, string> = {
  mm: "millimetres",
  cm: "centimetres",
  m: "metres",
  km: "kilometres",
};

const FACTOR_EXPLANATIONS: Record<string, string> = {
  mm: "there are 1000 mm in a metre",
  cm: "there are 100 cm in a metre",
  km: "there are 1000 m in a kilometre",
};

/**
 * Formats a number to a reasonable precision, trimming trailing zeros.
 * Uses up to 10 decimal places to preserve significant digits for very small values.
 */
function formatNum(n: number): string {
  if (n === 0) return "0";
  // For very small numbers, use enough decimal places to show significant digits
  const abs = Math.abs(n);
  if (abs < 0.0001 && abs > 0) {
    return parseFloat(n.toPrecision(4)).toString();
  }
  return parseFloat(n.toFixed(4)).toString();
}

/**
 * Returns true if the formatted representation differs from the exact value.
 */
function wasRounded(n: number): boolean {
  return parseFloat(formatNum(n)) !== n;
}

/**
 * Calculates an area in square metres from length and width with unit support.
 */
export function calculateSquareMetres(
  lengthValue: number,
  lengthUnit: LengthUnit,
  widthValue: number,
  widthUnit: LengthUnit
): SquareMetresResult {
  const lengthInMetres = lengthValue * TO_METRES[lengthUnit];
  const widthInMetres = widthValue * TO_METRES[widthUnit];
  const areaM2 = lengthInMetres * widthInMetres;

  const explanation: SquareMetresExplanationStep[] = [];

  // Length conversion step
  if (lengthUnit !== "m") {
    const op = TO_METRES[lengthUnit] < 1 ? "÷" : "×";
    const factor =
      TO_METRES[lengthUnit] < 1
        ? 1 / TO_METRES[lengthUnit]
        : TO_METRES[lengthUnit];
    explanation.push({
      type: "conversion",
      label: "Convert length",
      content: `${lengthValue} ${lengthUnit} to metres`,
      formula: `${lengthValue} ${lengthUnit} ${op} ${factor} = ${formatNum(lengthInMetres)} m`,
      reason: `Because ${FACTOR_EXPLANATIONS[lengthUnit]}.`,
    });
  } else {
    explanation.push({
      type: "conversion",
      label: "Length",
      content: `${formatNum(lengthValue)} m (already in metres)`,
    });
  }

  // Width conversion step
  if (widthUnit !== "m") {
    const op = TO_METRES[widthUnit] < 1 ? "÷" : "×";
    const factor =
      TO_METRES[widthUnit] < 1
        ? 1 / TO_METRES[widthUnit]
        : TO_METRES[widthUnit];
    explanation.push({
      type: "conversion",
      label: "Convert width",
      content: `${widthValue} ${widthUnit} to metres`,
      formula: `${widthValue} ${widthUnit} ${op} ${factor} = ${formatNum(widthInMetres)} m`,
      reason: `Because ${FACTOR_EXPLANATIONS[widthUnit]}.`,
    });
  } else {
    explanation.push({
      type: "conversion",
      label: "Width",
      content: `${formatNum(widthValue)} m (already in metres)`,
    });
  }

  // Multiplication step
  explanation.push({
    type: "multiplication",
    label: "Multiply to get area",
    content: "",
    formula: `${formatNum(lengthInMetres)} m × ${formatNum(widthInMetres)} m = ${formatNum(areaM2)} m²`,
  });

  // Why it works
  explanation.push({
    type: "why",
    content:
      "Area is length × width. By first converting both measurements to metres, the product is in square metres (m²).",
  });

  // Supplementary unit conversions
  const mm2 = areaM2 * 1000000;
  const cm2 = areaM2 * 10000;
  const km2 = areaM2 * 0.000001;

  const supplementary: SupplementaryUnit[] = [
    { unit: "mm²", value: formatNum(mm2), isRounded: wasRounded(mm2) },
    { unit: "cm²", value: formatNum(cm2), isRounded: wasRounded(cm2) },
    { unit: "km²", value: formatNum(km2), isRounded: wasRounded(km2) },
  ];

  return {
    areaM2,
    areaFormatted: formatNum(areaM2),
    isRounded: wasRounded(areaM2),
    lengthInMetres,
    widthInMetres,
    explanation,
    supplementary,
  };
}
