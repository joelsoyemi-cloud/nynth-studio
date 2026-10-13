import type { Metadata } from "next";
import { stories } from "@/content/stories";
import { StoryCard } from "@/components/journal";
import { StoryFilter } from "@/components/story-filter";
export const metadata: Metadata = { title: "All Stories", description: "The people, the pieces, and the belief behind them. Explore the NYNTH journal." };
export default function StoriesPage() {
  return <main id="main" className="wrap"><section className="page-intro"><span className="eyebrow gold">NYNTH WORLD / THE JOURNAL</span><h1>All Stories.</h1><p>The people, the pieces, and the belief behind them.<br/>Stories that embody what it means to Stay Above.</p></section><StoryFilter categories={["The founder", "NYNTH Ambassador", "Product stories", "Style", "Culture", "The people"]} items={stories.map(story => ({id: story.id, category: story.category, content: <StoryCard story={story}/>}))}/></main>;
}
