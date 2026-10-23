import type { Metadata } from "next";
import { getPublishedStories } from "@/lib/published-stories";
export const dynamic = "force-dynamic";
import { StoryCard } from "@/components/journal";
import { StoryFilter } from "@/components/story-filter";
export const metadata: Metadata = { title: "All Stories", description: "The people, the pieces, and the belief behind them. Explore the NYNTH journal." };
export default async function StoriesPage() {
 const stories = await getPublishedStories();
  return <main id="main" className="wrap"><section className="page-intro"><span className="eyebrow gold">NYNTH WORLD / THE JOURNAL</span><h1>All Stories.</h1><p>The people, the pieces, and the belief behind them.<br/>Stories that embody what it means to Stay Above.</p></section><StoryFilter categories={[...new Set(stories.map(s => s.category))]} items={stories.map(story => ({id: story.id, category: story.category, content: <StoryCard story={story}/>}))}/></main>;
}
