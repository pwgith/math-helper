"use client";

import { useState } from "react";

import type { UnitId, UnitConversionResult } from "@/types/unitConversion";
import { convertUnits, getUnitInfo, UNIT_GROUPS } from "@/lib/unitConversion";

export function UnitConverter() {
  const [inputValue, setInputValue] = useState("");
  const [fromUnit, setFromUnit] = useState<UnitId>("km");
  const [toUnit, setToUnit] = useState<UnitId>("mi");
  const [valueError, setValueError] = useState("");
  const [result, setResult] = useState<UnitConversionResult | null>(null);

  const clearErrors = () => {
    setValueError("");
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    clearErrors();
    setResult(null);

    const rawValue = inputValue.trim();

    // Validate
    if (!rawValue) {
      setValueError("Value is required.");
      return;
    }
    if (isNaN(Number(rawValue))) {
      setValueError("Please enter a valid number.");
      return;
    }

    const value = Number(rawValue);
    const conversionResult = convertUnits(value, fromUnit, toUnit);
    setResult(conversionResult);
  };

  return (
    <div className="w-full max-w-lg space-y-6 animate-fade-in">
      {/* Form Card */}
      <div className="w-full max-w-lg bg-white/80 backdrop-blur-sm rounded-2xl shadow-xl p-6 sm:p-8 border border-white/50">
        <div className="text-center mb-6">
          <h1 className="text-2xl sm:text-3xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
            Unit Converter
          </h1>
          <p className="text-slate-600 text-sm mt-2">
            Convert between length, weight, volume, and temperature units — with
            an explanation of the maths.
          </p>
        </div>

        <form className="space-y-5" onSubmit={handleSubmit} noValidate>
          {/* Value */}
          <div className="space-y-1.5">
            <label
              className="block text-sm font-medium text-slate-700"
              htmlFor="inputValue"
            >
              Value
            </label>
            <input
              className={`w-full px-4 py-3 rounded-xl border bg-white text-slate-900 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 ${
                valueError
                  ? "border-red-400 focus:ring-red-500"
                  : "border-slate-200"
              }`}
              type="text"
              id="inputValue"
              inputMode="decimal"
              placeholder="e.g. 5"
              aria-required="true"
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
            />
            {valueError && (
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
                <span>{valueError}</span>
              </div>
            )}
          </div>

          {/* From / To units */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="space-y-1.5">
              <label
                className="block text-sm font-medium text-slate-700"
                htmlFor="fromUnit"
              >
                From
              </label>
              <select
                className="w-full px-4 py-3 rounded-xl border border-slate-200 bg-white text-slate-700 text-sm font-medium focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 cursor-pointer"
                id="fromUnit"
                aria-label="Input unit"
                value={fromUnit}
                onChange={(e) => setFromUnit(e.target.value as UnitId)}
              >
                {UNIT_GROUPS.map((group) => (
                  <optgroup key={group.category} label={group.label}>
                    {group.units.map((unit) => (
                      <option key={unit.id} value={unit.id}>
                        {unit.label}
                      </option>
                    ))}
                  </optgroup>
                ))}
              </select>
            </div>

            <div className="space-y-1.5">
              <label
                className="block text-sm font-medium text-slate-700"
                htmlFor="toUnit"
              >
                To
              </label>
              <select
                className="w-full px-4 py-3 rounded-xl border border-slate-200 bg-white text-slate-700 text-sm font-medium focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 cursor-pointer"
                id="toUnit"
                aria-label="Output unit"
                value={toUnit}
                onChange={(e) => setToUnit(e.target.value as UnitId)}
              >
                {UNIT_GROUPS.map((group) => (
                  <optgroup key={group.category} label={group.label}>
                    {group.units.map((unit) => (
                      <option key={unit.id} value={unit.id}>
                        {unit.label}
                      </option>
                    ))}
                  </optgroup>
                ))}
              </select>
            </div>
          </div>

          <button
            type="submit"
            className="inline-flex items-center justify-center font-semibold rounded-xl transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 bg-gradient-to-r from-blue-600 to-indigo-600 text-white px-6 py-3 hover:from-blue-700 hover:to-indigo-700 focus:ring-blue-500 shadow-lg shadow-blue-500/25 w-full"
          >
            Convert
          </button>
        </form>
      </div>

      {/* Result Section */}
      {result?.type === "success" && (
        <div className="w-full max-w-lg bg-white/80 backdrop-blur-sm rounded-2xl shadow-xl p-6 sm:p-8 border border-white/50 animate-fade-in">
          <div className="text-center mb-6">
            <p className="text-sm font-medium text-slate-500 mb-1">
              {inputValue} {result.fromLabel} in {result.toLabel}
            </p>
            <p className="text-4xl sm:text-5xl font-bold text-slate-900">
              {result.isRounded ? "≈ " : ""}
              {result.formatted}
            </p>
            <p className="text-lg text-slate-500 mt-1">{result.toLabel}</p>
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
                return (
                  <div key={i} className="bg-slate-50 rounded-lg p-3 space-y-1">
                    <p>
                      <strong>{step.content}</strong>
                    </p>
                    {step.formula && (
                      <p className="font-mono text-slate-800">{step.formula}</p>
                    )}
                  </div>
                );
              })}

              {/* Rounding note */}
              {result.isRounded && (
                <div className="bg-amber-50 rounded-lg p-3 border border-amber-100 text-xs text-amber-700">
                  <strong>Note:</strong> The result has been rounded to 4 decimal
                  places because the exact value has more digits than are
                  practical to display.
                </div>
              )}
            </div>
          </div>
        </div>
      )}

      {/* Incompatible Units Warning */}
      {result?.type === "incompatible" && (
        <div className="w-full max-w-lg bg-white/80 backdrop-blur-sm rounded-2xl shadow-xl p-6 sm:p-8 border border-white/50 animate-fade-in">
          <div className="p-4 rounded-xl text-sm flex items-start gap-3 bg-amber-50 text-amber-700 border border-amber-200">
            <svg
              className="w-5 h-5 flex-shrink-0 mt-0.5"
              fill="currentColor"
              viewBox="0 0 20 20"
            >
              <path
                fillRule="evenodd"
                d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z"
                clipRule="evenodd"
              />
            </svg>
            <span>{result.message}</span>
          </div>
        </div>
      )}
    </div>
  );
}
