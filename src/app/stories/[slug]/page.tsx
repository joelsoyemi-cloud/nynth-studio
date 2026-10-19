import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { getPublishedStories, getPublishedStory } from "@/lib/published-stories";
import { configured } from "@/lib/supabase/server";
export const dynamic = "force-dynamic";
import { StoryImage, StoryCard, StoreLink, SectionHeading } from "@/components/journal";
type Props = { params: Promise<{slug: string}> };

export async function generateMetadata({params}: Props): Promise<Metadata> {
  const story = await getPublishedStory((await params).slug);
  if (!story) return {title: "Story not found"};
  return { title: story.title, description: story.summary, openGraph: {title: story.title, description: story.summary, type: "article", ...(story.image ? {images: [{url: story.image, alt: story.alt}]} : {})} };
}
export default async function ArticlePage({params}: Props) {
  const stories = await getPublishedStories();
  const story = await getPublishedStory((await params).slug);
  if (!story) notFound();
  return <main id="main" className="wrap"><article className="reading-column"><header className="story-header"><div className="breadcrumb"><Link href="/stories">All Stories</Link> / {story.category}</div><span className="category">{story.category}</span><h1>{story.title}</h1><p className="dek">{story.summary}</p><p className="meta">{story.id === "michael-spyder" ? "Michael Spyder · NYNTH ambassador" : story.id === "newman" ? "Newman Yange · Founder of NYNTH World" : "NYNTH Editorial"} / {configured() ? "NYNTH Journal" : "Story preview"}</p></header>{(story.image || story.id === "newman") && <figure className="article-figure"><StoryImage story={story} article/><figcaption className="caption">{story.id === "newman" ? "Newman Yange · Founder of NYNTH World." : story.id === "michael-spyder" ? "Michael Spyder wearing NYNTH World." : "Photography from NYNTH World."}</figcaption></figure>}<div className="article-body">{!configured() && <p className="editor-note">Sample editorial copy for design review. Final writing and approved photography will be supplied by Newman.</p>}{story.body.map(paragraph => <p key={paragraph}>{paragraph}</p>)}{!configured() && story.id === "newman" && <>{[{id:"the-beginning", title:"Where it begins.", text:"Newman’s account of why he started NYNTH and what inspired its beginnings will complete this chapter."},{id:"building-nynth", title:"Building NYNTH.", text:"Newman’s experiences, creative process and milestones will complete this chapter."},{id:"stay-above", title:"What it means to Stay Above.", text:"Newman’s personal explanation of Stay Above will complete this chapter."}].map((chapter, index) => <section className="chapter" id={chapter.id} key={chapter.id}><span className="category">0{index + 1} / The founder’s story</span><h2>{chapter.title}</h2><p className="editor-note">{chapter.text}</p></section>)}</>}<blockquote>Stay Above.</blockquote><StoreLink className="btn">Explore NYNTH World ↗</StoreLink></div></article><section className="section"><SectionHeading label="Keep exploring" title="More from NYNTH"/><div className="people-grid">{stories.filter(item => item.id !== story.id).slice(0,3).map(item => <StoryCard key={item.id} story={item}/>)}</div></section></main>;
}
