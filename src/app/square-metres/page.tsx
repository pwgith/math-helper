import type { Metadata } from "next";

import { SquareMetresCalculator } from "@/components/squareMetresCalculator";

export const metadata: Metadata = {
  title: "Square Metres Calculator — Math Helper",
  description:
    "Calculate area in square metres from length and width measurements in any supported unit — with a full breakdown and equivalent areas.",
};

export default function SquareMetresPage() {
  return (
    <main className="min-h-[calc(100vh-4rem)] flex items-center justify-center px-4 sm:px-6 lg:px-8 py-8">
      <SquareMetresCalculator />
    </main>
  );
}
