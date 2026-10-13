"use client";
import { useState } from "react";
export function StoryFilter({ items, categories, gridClass = "story-grid" }: { items: { id: string; category: string; content: React.ReactNode }[]; categories: string[]; gridClass?: string }) {
  const [selected, setSelected] = useState("All");
  const count = items.filter(item => selected === "All" || item.category === selected).length;
  return <><div className="filters" role="group" aria-label="Filter stories">{["All", ...categories].map(category => <button key={category} aria-pressed={selected === category} onClick={() => setSelected(category)}>{category}</button>)}</div><p className="section-foot" role="status">{count} story preview{count === 1 ? "" : "s"}</p><div className={gridClass}>{items.map(item => <div key={item.id} hidden={selected !== "All" && item.category !== selected}>{item.content}</div>)}</div>{count === 0 && <p className="editor-note">No stories in this category yet.</p>}</>;
}
