import type { Metadata } from "next";

import { PercentageCalculator } from "@/components/percentageCalculator";

export const metadata: Metadata = {
  title: "Percentage Calculator — Math Helper",
  description:
    "Calculate a percentage of a number, apply a percentage discount, or calculate a percentage increase — with step-by-step explanations.",
};

export default function PercentagePage() {
  return (
    <main className="min-h-[calc(100vh-4rem)] flex items-center justify-center px-4 sm:px-6 lg:px-8 py-8">
      <PercentageCalculator />
    </main>
  );
}
