"use client";
import { useEffect, useRef, useState } from "react";
import { useInView, useReducedMotion } from "motion/react";
const glyphs = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
export function DecryptedText({text}: {text: string}) {
  const ref = useRef<HTMLSpanElement>(null);
  const visible = useInView(ref, {once:true});
  const reduced = useReducedMotion();
  const [frame, setFrame] = useState(text);
  useEffect(() => {
    if (!visible || reduced !== false) return;
    let tick = 0;
    const timer = window.setInterval(() => {
      tick += 1;
      const revealed = Math.floor(tick / 2);
      setFrame([...text].map((c,i) => c === " " || i < revealed ? c : glyphs[Math.floor(Math.random()*glyphs.length)]).join(""));
      if (revealed >= text.length) window.clearInterval(timer);
    }, 35);
    return () => window.clearInterval(timer);
  }, [visible, reduced, text]);
  return <span ref={ref} className="decrypt"><span className="sr-only">{text}</span><span aria-hidden="true">{reduced ? text : frame}</span></span>;
}
