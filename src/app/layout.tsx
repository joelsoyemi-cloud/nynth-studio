/* App Router root layout loads the approved fonts for every route. */
/* eslint-disable @next/next/no-page-custom-font */
import type { Metadata } from "next";
import { MotionProvider } from "@/components/motion-provider";
import "./globals.css";
import "./journal.css";
import { Header, Footer } from "@/components/journal";
export const metadata: Metadata = { title: { default: "NYNTH Journal — Style. Sound. Culture.", template: "%s | NYNTH World" }, description: "Inside the world of NYNTH. Discover the pieces, people and ideas shaping a new wave of style." };
export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <html lang="en"><head><link rel="preconnect" href="https://fonts.googleapis.com"/><link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous"/><link href="https://fonts.googleapis.com/css2?family=DM+Sans:wght@400;500;600;700&family=Libre+Caslon+Display&display=swap" rel="stylesheet"/></head><body><MotionProvider><Header/>{children}<Footer/></MotionProvider></body></html>;
}
