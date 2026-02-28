import type { Metadata } from "next";
import { Inter } from "next/font/google";

import "@/styles/globals.css";
import { NavBar } from "@/components/navBar";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Math Helper",
  description:
    "Everyday maths made easy. Calculate percentages, square metres, and convert units — with step-by-step explanations.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body
        className={`${inter.className} bg-gradient-to-br from-slate-50 via-blue-50 to-slate-100 min-h-screen`}
      >
        <NavBar />
        {children}
      </body>
    </html>
  );
}
