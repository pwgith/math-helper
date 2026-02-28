import type { Operation } from "@/types/operation";

export const OPERATIONS: Operation[] = [
  {
    id: "percentage",
    title: "Calculate Percentage",
    navLabel: "Percentage Calculator",
    shortNavLabel: "Percentage",
    description:
      "Find a percentage of a number, apply a discount, or calculate an increase — with step-by-step explanations.",
    href: "/percentage",
    iconColor: "text-blue-600",
    iconBgColor: "bg-blue-100",
    iconBgHoverColor: "group-hover:bg-blue-200",
    hoverTextColor: "group-hover:text-blue-600",
  },
  {
    id: "square-metres",
    title: "Calculate Square Metres",
    navLabel: "Square Metres Calculator",
    shortNavLabel: "Square Metres",
    description:
      "Work out an area from length and width measurements, with support for different units like cm, m, and km.",
    href: "/square-metres",
    iconColor: "text-emerald-600",
    iconBgColor: "bg-emerald-100",
    iconBgHoverColor: "group-hover:bg-emerald-200",
    hoverTextColor: "group-hover:text-emerald-600",
  },
  {
    id: "convert-units",
    title: "Convert Units",
    navLabel: "Unit Converter",
    shortNavLabel: "Unit Converter",
    description:
      "Convert between units of length, weight, volume, and temperature — with clear explanations of the conversion.",
    href: "/convert-units",
    iconColor: "text-amber-600",
    iconBgColor: "bg-amber-100",
    iconBgHoverColor: "group-hover:bg-amber-200",
    hoverTextColor: "group-hover:text-amber-600",
  },
];
