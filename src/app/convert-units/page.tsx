import type { Metadata } from "next";

import { UnitConverter } from "@/components/unitConverter";

export const metadata: Metadata = {
  title: "Unit Converter — Math Helper",
  description:
    "Convert between units of length, weight, volume, and temperature — with clear explanations of how each conversion works.",
};

export default function ConvertUnitsPage() {
  return (
    <main className="min-h-[calc(100vh-4rem)] flex items-center justify-center px-4 sm:px-6 lg:px-8 py-8">
      <UnitConverter />
    </main>
  );
}
