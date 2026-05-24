import type { Metadata } from "next";
import { Instrument_Serif, DM_Mono } from "next/font/google";
import { buildPageMetadata } from "@/lib/metadata";

const instrumentSerif = Instrument_Serif({
  variable: "--font-instrument-serif",
  subsets: ["latin"],
  weight: "400",
  style: ["normal", "italic"],
  display: "swap",
});

const dmMono = DM_Mono({
  variable: "--font-dm-mono",
  subsets: ["latin"],
  weight: ["400", "500"],
  style: ["normal", "italic"],
  display: "swap",
});

export const metadata: Metadata = buildPageMetadata({
  title: "PixelAgent",
  description:
    "A live-DOM annotation and edit tool that feeds your AI agent surgical diffs instead of screenshot guesswork.",
  path: "/pixelagent",
});

export default function PixelAgentLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className={`${instrumentSerif.variable} ${dmMono.variable}`}>
      {children}
    </div>
  );
}
