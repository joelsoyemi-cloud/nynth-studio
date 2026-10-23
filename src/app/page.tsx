/* eslint-disable @next/next/no-img-element */
import Link from "next/link";
import { DecryptedText } from "@/components/decrypted-text";
import { SectionHeading, StoryCard, StoreLink } from "@/components/journal";
import { StoryFilter } from "@/components/story-filter";
import { Contribution, Newsletter } from "@/components/preview-forms";
import { getPublishedStories } from "@/lib/published-stories";
export const dynamic = "force-dynamic";
export default async function Home() {
  const stories = await getPublishedStories();
  const getStory = (id:string) => stories.find(s=>s.id===id);
  const campaign = getStory("winners")!;
  const profile = getStory("nynth-perspective")!;
  const people = stories.filter(s=>s.section==="people");
  const pieces = stories.filter(s=>s.section==="pieces");
  const products = [
    {id:'uniform',name:'NW — Winners',href:'7zzjQUsKs5mvSS2Lfzt2'},
    {id:'white',name:'NW — Pop White',href:'qF4N48d6WP3JnZvvdZdF'},
    {id:'details',name:'NW — Winners',href:'ek0jvKeP4haa2Oy5KNmS'},
  ].flatMap(p=>{const story=getStory(p.id);return story?.image?[{...p,story,image:story.image}]:[];});
  return <main id="main" className="wrap">
    <section className="masthead"><h1>Beyond the <em>clothes.</em></h1><p>The pieces. The people. The point of view.<br/>Welcome to the world of NYNTH.</p></section>
    {campaign && <section className="hero" aria-labelledby="hero-title"><img fetchPriority="high" src={campaign.image || undefined} alt={campaign.alt}/><span className="hero-label">NYNTH WORLD / THE COVER STORY</span><div className="hero-content"><div><span className="pill">The NYNTH edit</span><h2 id="hero-title">{campaign.title}</h2><p>{campaign.summary}</p></div><Link className="read-button" href="/stories/winners">Read the cover story <span className="circle" aria-hidden="true">↗</span></Link></div></section>}
    <div className="ticker"><span><b>01 /</b> Style without permission</span><span><b>02 /</b> Culture in motion</span><span><b>03 /</b> Made for your world</span><DecryptedText text="STAY ABOVE."/></div>
    <section className="section" id="our-stories"><SectionHeading label="The people. The passion. The point of view." title="Our Stories."><Link className="text-link" href="/stories">All stories ↗</Link></SectionHeading><div className="people-grid">{people.map(story => <StoryCard key={story.id} story={story}/>)}</div>{!people.length && <p>No stories published yet.</p>}</section>
    <section className="section" id="latest"><SectionHeading label="About our clothes" title="Behind the Pieces."/><StoryFilter gridClass="stories" categories={[...new Set(pieces.map(s=>s.edit || "Other"))]} items={pieces.map(story => ({ id: story.id, category: story.edit || "Other", content: <StoryCard story={story} variant="card"/> }))}/></section>
    {profile && <section className="section community" id="community"><Link className="community-art" href="/stories/nynth-perspective" aria-label="Read the NYNTH campaign profile"><img loading="lazy" src={profile.image || undefined} alt={profile.alt}/><div className="photo-caption"><span>THE PEOPLE BEHIND THE STYLE</span><span>NYNTH CAMPAIGN / 01</span></div></Link><div><p className="eyebrow gold">Our world, your perspective</p><h2>Good style<br/>has <em>company.</em></h2><p>A closer look at the people wearing NYNTH. Explore this campaign look and the personal perspective behind the style.</p><div className="community-actions"><Link className="btn" href="/stories/nynth-perspective">Read his story ↗</Link><Contribution/>{getStory("newman") && <Link className="btn btn-outline" href="/stories/newman">Meet the editor</Link>}</div><div className="creator"><div className="avatar">N</div><div><span>Curated by Newman Yange</span><small>NYNTH founder · Fashion & music</small></div></div></div></section>}
    <section className="section" id="culture"><SectionHeading label="Off the rack" title="Style meets culture."/><div className="notes">{["sound", "city"].filter(id=>Boolean(getStory(id))).map((id, index) => <Link className="note" href={`/stories/${id}`} key={id}><span className="number">0{index + 1}</span><div><span className="category">{id === "sound" ? "Sound & style" : "Street notes"}</span><h3>{getStory(id)!.title}</h3><span className="muted">{getStory(id)!.summary}</span></div></Link>)}</div></section>
    <section className="section" id="shop"><SectionHeading label="From the page to your wardrobe" title="Wear the story."><StoreLink className="text-link">Explore the collection ↗</StoreLink></SectionHeading><div className="shop-grid">{products.map(product => <StoreLink key={product.href} className="product" href={`https://www.nynthworld.com/product/${product.href}`}><div className="product-photo"><img loading="lazy" src={product.image} alt={product.story.alt}/></div><div className="product-title"><span>{product.name}</span><span>↗</span></div><p className="muted">Discover at NYNTH World</p></StoreLink>)}</div></section>
    <section className="section founder" id="about"><div className="newman-portrait" role="img" aria-label="Newman Yange, founder of NYNTH World"/><div><p className="eyebrow gold">The person behind NYNTH</p><h2>Meet Newman Yange.</h2><p>Musician. Fashion entrepreneur. Founder of NYNTH.</p><p>The journal brings those worlds together: the clothes, the sound, and the people making the brand their own.</p>{getStory("newman") && <Link className="text-link" href="/stories/newman">Read the founder’s story ↗</Link>}</div></section>
    <section className="newsletter"><div><p className="eyebrow gold">A little closer to NYNTH</p><h2>Stay in the loop.</h2><p>Fresh stories, new perspectives, and the next NYNTH drop.</p></div><Newsletter/></section>
  </main>;
}
