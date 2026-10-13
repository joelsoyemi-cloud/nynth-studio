import type { Metadata } from "next";
import { MotionProvider } from "@/components/motion-provider";
import "./globals.css";
export const metadata: Metadata = { title: "NYNTH World — Stay Above", description: "Fashion, belief and the people behind NYNTH. React foundation preview." };
export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <html lang="en"><body><MotionProvider>{children}</MotionProvider></body></html>;
}
