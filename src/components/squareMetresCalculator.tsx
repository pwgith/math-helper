"use client";

import { useState } from "react";

import type { LengthUnit, SquareMetresResult } from "@/types/squareMetres";
import { calculateSquareMetres } from "@/lib/squareMetres";

const UNITS: { value: LengthUnit; label: string }[] = [
  { value: "mm", label: "mm" },
  { value: "cm", label: "cm" },
  { value: "m", label: "m" },
  { value: "km", label: "km" },
];

export function SquareMetresCalculator() {
  const [lengthValue, setLengthValue] = useState("");
  const [lengthUnit, setLengthUnit] = useState<LengthUnit>("m");
  const [widthValue, setWidthValue] = useState("");
  const [widthUnit, setWidthUnit] = useState<LengthUnit>("m");
  const [lengthError, setLengthError] = useState("");
  const [widthError, setWidthError] = useState("");
  const [result, setResult] = useState<SquareMetresResult | null>(null);

  const clearErrors = () => {
    setLengthError("");
    setWidthError("");
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    clearErrors();
    setResult(null);

    let valid = true;

    // Validate length
    const lengthTrimmed = lengthValue.trim();
    if (!lengthTrimmed) {
      setLengthError("Length is required.");
      valid = false;
    } else if (isNaN(Number(lengthTrimmed))) {
      setLengthError("Please enter a valid number.");
      valid = false;
    } else if (Number(lengthTrimmed) <= 0) {
      setLengthError("Length must be greater than zero.");
      valid = false;
    }

    // Validate width
    const widthTrimmed = widthValue.trim();
    if (!widthTrimmed) {
      setWidthError("Width is required.");
      valid = false;
    } else if (isNaN(Number(widthTrimmed))) {
      setWidthError("Please enter a valid number.");
      valid = false;
    } else if (Number(widthTrimmed) <= 0) {
      setWidthError("Width must be greater than zero.");
      valid = false;
    }

    if (!valid) return;

    const calcResult = calculateSquareMetres(
      Number(lengthTrimmed),
      lengthUnit,
      Number(widthTrimmed),
      widthUnit
    );
    setResult(calcResult);
  };

  return (
    <div className="w-full max-w-lg space-y-6 animate-fade-in">
      {/* Form Card */}
      <div className="w-full max-w-lg bg-white/80 backdrop-blur-sm rounded-2xl shadow-xl p-6 sm:p-8 border border-white/50">
        <div className="text-center mb-6">
          <h1 className="text-2xl sm:text-3xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
            Square Metres Calculator
          </h1>
          <p className="text-slate-600 text-sm mt-2">
            Calculate area from length and width — each in any supported unit —
            with a full breakdown.
          </p>
        </div>

        <form className="space-y-5" onSubmit={handleSubmit} noValidate>
          {/* Length */}
          <div className="space-y-1.5">
            <label
              className="block text-sm font-medium text-slate-700"
              htmlFor="lengthValue"
            >
              Length
            </label>
            <div className="flex gap-2">
              <input
                className={`w-full px-4 py-3 rounded-xl border bg-white text-slate-900 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 flex-1 ${
                  lengthError
                    ? "border-red-400 focus:ring-red-500"
                    : "border-slate-200"
                }`}
                type="text"
                id="lengthValue"
                inputMode="decimal"
                placeholder="e.g. 150"
                aria-required="true"
                aria-label="Length value"
                value={lengthValue}
                onChange={(e) => setLengthValue(e.target.value)}
              />
              <select
                className="px-3 py-3 rounded-xl border border-slate-200 bg-white text-slate-700 text-sm font-medium focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 cursor-pointer"
                id="lengthUnit"
                aria-label="Length unit"
                value={lengthUnit}
                onChange={(e) => setLengthUnit(e.target.value as LengthUnit)}
              >
                {UNITS.map((u) => (
                  <option key={u.value} value={u.value}>
                    {u.label}
                  </option>
                ))}
              </select>
            </div>
            {lengthError && (
              <div
                className="text-red-600 text-xs mt-1 flex items-center gap-1"
                role="alert"
              >
                <svg
                  className="w-3.5 h-3.5 flex-shrink-0"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path
                    fillRule="evenodd"
                    d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z"
                    clipRule="evenodd"
                  />
                </svg>
                <span>{lengthError}</span>
              </div>
            )}
          </div>

          {/* Width */}
          <div className="space-y-1.5">
            <label
              className="block text-sm font-medium text-slate-700"
              htmlFor="widthValue"
            >
              Width
            </label>
            <div className="flex gap-2">
              <input
                className={`w-full px-4 py-3 rounded-xl border bg-white text-slate-900 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 flex-1 ${
                  widthError
                    ? "border-red-400 focus:ring-red-500"
                    : "border-slate-200"
                }`}
                type="text"
                id="widthValue"
                inputMode="decimal"
                placeholder="e.g. 5"
                aria-required="true"
                aria-label="Width value"
                value={widthValue}
                onChange={(e) => setWidthValue(e.target.value)}
              />
              <select
                className="px-3 py-3 rounded-xl border border-slate-200 bg-white text-slate-700 text-sm font-medium focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 cursor-pointer"
                id="widthUnit"
                aria-label="Width unit"
                value={widthUnit}
                onChange={(e) => setWidthUnit(e.target.value as LengthUnit)}
              >
                {UNITS.map((u) => (
                  <option key={u.value} value={u.value}>
                    {u.label}
                  </option>
                ))}
              </select>
            </div>
            {widthError && (
              <div
                className="text-red-600 text-xs mt-1 flex items-center gap-1"
                role="alert"
              >
                <svg
                  className="w-3.5 h-3.5 flex-shrink-0"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path
                    fillRule="evenodd"
                    d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z"
                    clipRule="evenodd"
                  />
                </svg>
                <span>{widthError}</span>
              </div>
            )}
          </div>

          <button
            type="submit"
            className="inline-flex items-center justify-center font-semibold rounded-xl transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 bg-gradient-to-r from-blue-600 to-indigo-600 text-white px-6 py-3 hover:from-blue-700 hover:to-indigo-700 focus:ring-blue-500 shadow-lg shadow-blue-500/25 w-full"
          >
            Calculate Area
          </button>
        </form>
      </div>

      {/* Result Section */}
      {result && (
        <div className="w-full max-w-lg bg-white/80 backdrop-blur-sm rounded-2xl shadow-xl p-6 sm:p-8 border border-white/50 animate-fade-in">
          {/* Primary result */}
          <div className="text-center mb-6">
            <p className="text-sm font-medium text-slate-500 mb-1">Area</p>
            <p className="text-4xl sm:text-5xl font-bold text-slate-900">
              {result.isRounded ? "≈ " : ""}
              {result.areaFormatted} m²
            </p>
          </div>

          <hr className="border-slate-200 mb-6" />

          {/* Explanation */}
          <div className="mb-6">
            <h2 className="text-sm font-semibold text-slate-700 mb-3 flex items-center gap-2">
              <svg
                className="w-4 h-4 text-blue-600"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
              How it works
            </h2>
            <div className="space-y-3 text-sm text-slate-600">
              {result.explanation.map((step, i) => {
                if (step.type === "conversion") {
                  return (
                    <div key={i} className="bg-slate-50 rounded-lg p-3 space-y-1">
                      <p>
                        <strong>{step.label}:</strong> {step.content}
                      </p>
                      {step.formula && (
                        <p className="font-mono text-slate-800">
                          {step.formula}
                        </p>
                      )}
                      {step.reason && (
                        <p className="text-xs text-slate-500">{step.reason}</p>
                      )}
                    </div>
                  );
                }
                if (step.type === "multiplication") {
                  return (
                    <div key={i} className="bg-slate-50 rounded-lg p-3 space-y-1">
                      <p>
                        <strong>{step.label}:</strong>
                      </p>
                      {step.formula && (
                        <p className="font-mono text-slate-800">
                          {step.formula}
                        </p>
                      )}
                    </div>
                  );
                }
                if (step.type === "why") {
                  return (
                    <div
                      key={i}
                      className="bg-blue-50 rounded-lg p-3 border border-blue-100"
                    >
                      <p>
                        <strong>Why it works:</strong> {step.content}
                      </p>
                    </div>
                  );
                }
                return null;
              })}

              {/* Rounding note */}
              {result.isRounded && (
                <div className="bg-amber-50 rounded-lg p-3 border border-amber-100 text-xs text-amber-700">
                  <strong>Note:</strong> The result has been rounded to 4
                  decimal places because the exact value has more digits than
                  are practical to display.
                </div>
              )}
            </div>
          </div>

          <hr className="border-slate-200 mb-6" />

          {/* Supplementary unit conversions */}
          <div>
            <h2 className="text-sm font-semibold text-slate-700 mb-3 flex items-center gap-2">
              <svg
                className="w-4 h-4 text-slate-500"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M4 8V4m0 0h4M4 4l5 5m11-1V4m0 0h-4m4 0l-5 5M4 16v4m0 0h4m-4 0l5-5m11 5v-4m0 4h-4m4 0l-5-5"
                />
              </svg>
              Also equal to
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              {result.supplementary.map((sup) => (
                <div
                  key={sup.unit}
                  className="bg-slate-50 rounded-lg p-3 text-center"
                >
                  <p className="text-xs text-slate-500 mb-0.5">{sup.unit}</p>
                  <p className="font-semibold text-slate-800 text-sm">
                    {sup.isRounded ? "≈ " : ""}
                    {sup.value}
                  </p>
                  {sup.isRounded && (
                    <p className="text-xs text-amber-600 mt-1">
                      Rounded to 4 d.p.
                    </p>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
