import Link from "next/link";

import { OPERATIONS } from "@/constants/operations";
import { OperationIcon } from "@/components/operationIcon";

export default function HomePage() {
  return (
    <main className="animate-fade-in">
      {/* Hero Section */}
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 pt-12 sm:pt-16 pb-8 text-center">
        <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent leading-tight">
          Math Helper
        </h1>
        <p className="text-slate-600 text-lg sm:text-xl mt-4 max-w-2xl mx-auto">
          Everyday maths made easy. Pick an operation below to get started —
          each one gives you the answer <em>and</em> explains how it works.
        </p>
      </div>

      {/* Operations Grid */}
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 pb-16">
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {OPERATIONS.map((op) => (
            <Link
              key={op.id}
              href={op.href}
              className="group block bg-white/80 backdrop-blur-sm rounded-2xl shadow-lg p-6 border border-white/50 hover:shadow-xl hover:-translate-y-1 transition-all duration-200"
            >
              <div
                className={`w-12 h-12 rounded-xl ${op.iconBgColor} flex items-center justify-center mb-4 ${op.iconBgHoverColor} transition-colors duration-200`}
              >
                <OperationIcon
                  operationId={op.id}
                  className={`w-6 h-6 ${op.iconColor}`}
                />
              </div>
              <h3
                className={`text-lg font-semibold text-slate-900 ${op.hoverTextColor} transition-colors duration-200`}
              >
                {op.title}
              </h3>
              <p className="text-sm text-slate-600 mt-1">{op.description}</p>
            </Link>
          ))}
        </div>
      </div>
    </main>
  );
}
