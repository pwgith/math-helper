"use client";

import { useState } from "react";

import type {
  PercentageCalculationType,
  PercentageResult,
} from "@/types/percentage";
import { calculatePercentage } from "@/lib/percentage";

const CALCULATION_TYPES: {
  value: PercentageCalculationType;
  label: string;
}[] = [
  { value: "percentage", label: "% of Number" },
  { value: "discount", label: "Discount" },
  { value: "increase", label: "Increase" },
];

const TYPE_LABELS: Record<
  PercentageCalculationType,
  { base: string; placeholder: string }
> = {
  percentage: { base: "Number", placeholder: "e.g. 150" },
  discount: { base: "Original Number", placeholder: "e.g. 100" },
  increase: { base: "Original Number", placeholder: "e.g. 200" },
};

export function PercentageCalculator() {
  const [currentType, setCurrentType] =
    useState<PercentageCalculationType>("percentage");
  const [percentageValue, setPercentageValue] = useState("");
  const [baseNumber, setBaseNumber] = useState("");
  const [percentageError, setPercentageError] = useState("");
  const [baseError, setBaseError] = useState("");
  const [result, setResult] = useState<PercentageResult | null>(null);

  const handleTypeSwitch = (type: PercentageCalculationType) => {
    setCurrentType(type);
    setPercentageValue("");
    setBaseNumber("");
    setPercentageError("");
    setBaseError("");
    setResult(null);
  };

  const clearErrors = () => {
    setPercentageError("");
    setBaseError("");
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    clearErrors();
    setResult(null);

    let valid = true;

    // Validate percentage
    const pctTrimmed = percentageValue.trim();
    if (!pctTrimmed) {
      setPercentageError("Percentage is required.");
      valid = false;
    } else if (isNaN(Number(pctTrimmed))) {
      setPercentageError("Please enter a valid number.");
      valid = false;
    }

    // Validate base
    const baseTrimmed = baseNumber.trim();
    const config = TYPE_LABELS[currentType];
    if (!baseTrimmed) {
      setBaseError(`${config.base} is required.`);
      valid = false;
    } else if (isNaN(Number(baseTrimmed))) {
      setBaseError("Please enter a valid number.");
      valid = false;
    } else if (
      (currentType === "discount" || currentType === "increase") &&
      Number(baseTrimmed) < 0
    ) {
      setBaseError("Value must not be negative.");
      valid = false;
    }

    if (!valid) return;

    const pct = Number(pctTrimmed);
    const base = Number(baseTrimmed);
    const calcResult = calculatePercentage(currentType, pct, base);
    setResult(calcResult);
  };

  const config = TYPE_LABELS[currentType];

  return (
    <div className="w-full max-w-lg space-y-6 animate-fade-in">
      {/* Form Card */}
      <div className="w-full max-w-lg bg-white/80 backdrop-blur-sm rounded-2xl shadow-xl p-6 sm:p-8 border border-white/50">
        <div className="text-center mb-6">
          <h1 className="text-2xl sm:text-3xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
            Percentage Calculator
          </h1>
          <p className="text-slate-600 text-sm mt-2">
            Calculate percentages, discounts, and increases — with a
            step-by-step explanation.
          </p>
        </div>

        {/* Calculation Type Selector */}
        <div
          className="bg-slate-100 rounded-xl p-1.5 grid grid-cols-3 gap-1 mb-6"
          role="tablist"
          aria-label="Calculation type"
        >
          {CALCULATION_TYPES.map((type) => {
            const isActive = currentType === type.value;
            return (
              <button
                key={type.value}
                type="button"
                role="tab"
                aria-selected={isActive}
                onClick={() => handleTypeSwitch(type.value)}
                className={`py-2.5 px-3 text-sm rounded-lg cursor-pointer transition-all duration-200 ${
                  isActive
                    ? "bg-white text-blue-600 shadow-sm font-semibold"
                    : "text-slate-500 font-medium hover:text-slate-700"
                }`}
              >
                {type.label}
              </button>
            );
          })}
        </div>

        {/* Form */}
        <form className="space-y-5" onSubmit={handleSubmit} noValidate>
          <div className="space-y-1.5">
            <label
              className="block text-sm font-medium text-slate-700"
              htmlFor="percentageValue"
            >
              Percentage (%)
            </label>
            <input
              className={`w-full px-4 py-3 rounded-xl border bg-white text-slate-900 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 ${
                percentageError
                  ? "border-red-400 focus:ring-red-500"
                  : "border-slate-200"
              }`}
              type="text"
              id="percentageValue"
              inputMode="decimal"
              placeholder="e.g. 20"
              aria-required="true"
              value={percentageValue}
              onChange={(e) => setPercentageValue(e.target.value)}
            />
            {percentageError && (
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
                <span>{percentageError}</span>
              </div>
            )}
          </div>

          <div className="space-y-1.5">
            <label
              className="block text-sm font-medium text-slate-700"
              htmlFor="baseNumber"
            >
              {config.base}
            </label>
            <input
              className={`w-full px-4 py-3 rounded-xl border bg-white text-slate-900 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 ${
                baseError
                  ? "border-red-400 focus:ring-red-500"
                  : "border-slate-200"
              }`}
              type="text"
              id="baseNumber"
              inputMode="decimal"
              placeholder={config.placeholder}
              aria-required="true"
              value={baseNumber}
              onChange={(e) => setBaseNumber(e.target.value)}
            />
            {baseError && (
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
                <span>{baseError}</span>
              </div>
            )}
          </div>

          <button
            type="submit"
            className="inline-flex items-center justify-center font-semibold rounded-xl transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 bg-gradient-to-r from-blue-600 to-indigo-600 text-white px-6 py-3 hover:from-blue-700 hover:to-indigo-700 focus:ring-blue-500 shadow-lg shadow-blue-500/25 w-full"
          >
            Calculate
          </button>
        </form>
      </div>

      {/* Result Section */}
      {result && (
        <div className="w-full max-w-lg bg-white/80 backdrop-blur-sm rounded-2xl shadow-xl p-6 sm:p-8 border border-white/50 animate-fade-in">
          {/* Result */}
          <div className="text-center mb-6">
            <p className="text-sm font-medium text-slate-500 mb-1">
              {result.resultLabel}
            </p>
            <p className="text-4xl sm:text-5xl font-bold text-slate-900">
              {result.isRounded ? "≈ " : ""}
              {result.result}
            </p>
          </div>

          <hr className="border-slate-200 mb-6" />

          {/* Explanation */}
          <div>
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
                if (step.type === "step") {
                  return (
                    <div key={i} className="bg-slate-50 rounded-lg p-3 space-y-2">
                      <p>
                        <strong>{step.title}:</strong> {step.content}
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

              {/* Shortcut Tip */}
              <div className="bg-emerald-50 rounded-lg p-3 border border-emerald-200 space-y-1">
                <p className="text-emerald-800">
                  <strong>💡 Shortcut:</strong>{" "}
                  {result.shortcutTip.description}
                </p>
                <p className="text-emerald-700 text-sm font-mono">
                  {result.shortcutTip.formula}
                </p>
              </div>

              {/* Zero base note */}
              {result.isZeroBase && (
                <div className="p-4 rounded-xl text-sm flex items-start gap-3 bg-blue-50 text-blue-700 border border-blue-200">
                  <svg
                    className="w-4 h-4 flex-shrink-0 mt-0.5"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path
                      fillRule="evenodd"
                      d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z"
                      clipRule="evenodd"
                    />
                  </svg>
                  <span>
                    Any percentage of zero is zero — multiplying zero by anything
                    always gives zero.
                  </span>
                </div>
              )}

              {/* Rounding note */}
              {result.isRounded && (
                <div className="bg-amber-50 rounded-lg p-3 border border-amber-100 text-xs text-amber-700">
                  <strong>Note:</strong> The result has been rounded to 2
                  decimal places because the exact value has more digits than
                  are practical to display.
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
