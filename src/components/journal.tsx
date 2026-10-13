/* eslint-disable @next/next/no-img-element */
import Link from "next/link";
import { type Story, shopUrl } from "@/content/stories";
export function StoreLink({ children, href = shopUrl, className }: { children: React.ReactNode; href?: string; className?: string }) {
  return <a href={href} className={className} target="_blank" rel="noopener noreferrer">{children}</a>;
}
function Navigation() {
  return <nav className="nav" aria-label="Main navigation"><Link href="/">The Journal</Link><Link href="/stories">Our Stories</Link><Link href="/#latest">The Pieces</Link><Link href="/#community">Community</Link><Link href="/#culture">Culture</Link><Link href="/#about">About</Link><StoreLink className="shop-link">Shop NYNTH ↗</StoreLink></nav>;
}
export function Header() {
  return <><a className="skip" href="#main">Skip to content</a><div className="wrap topline"><span>Independent style. A shared point of view.</span><a className="dashboard-link" href="/reference/admin.html">Dashboard preview ↗</a></div><header className="site-header"><div className="wrap header"><Link className="brand" href="/" aria-label="NYNTH Journal home"><img width="83" height="54" src="https://www.nynthworld.com/assets/nynth-logo-BCCfQr9n.png" alt="NYNTH — Stay Above"/><span>Journal</span></Link><div className="desktop-nav"><Navigation/></div><details className="mobile-menu"><summary>Menu</summary><Navigation/></details></div></header></>;
}
export function Footer() {
  return <footer><div className="wrap"><div className="footer-inner"><div><p>NYNTH JOURNAL — STYLE. SOUND. CULTURE.</p><p>© 2026 NYNTH World · Design preview · Sample editorial content.</p></div><div className="footer-links"><StoreLink>The store</StoreLink><StoreLink href="https://www.instagram.com/nynthworld/">Instagram</StoreLink><Link href="/stories">All stories</Link><a href="/reference/admin.html">Dashboard preview ↗</a><a href="#main">Back to top ↑</a></div></div><div className="footer-word" aria-hidden="true">STAY ABOVE.</div></div></footer>;
}
export function StoryImage({ story, article = false }: { story: Story; article?: boolean }) {
  if (story.id === "newman") return <div className={`newman-portrait ${article ? "founder-image" : ""}`} role="img" aria-label={story.alt}/>;
  const dimensions = story.id === "winners" ? [2000, 755] : story.id === "michael-spyder" ? [800, 1068] : story.id === "nynth-perspective" ? [800, 1067] : [800, 800];
  if (story.image) return <img src={story.image} alt={story.alt} loading={article ? "eager" : "lazy"} width={dimensions[0]} height={dimensions[1]} className={article ? "article-image" : undefined}/>;
  return <div className="placeholder"><small>{story.category}</small><strong>{story.title}</strong><small>Editorial photography to come</small></div>;
}
export function StoryCard({ story, variant = "story-tile" }: { story: Story; variant?: string }) {
  return <Link className={variant} href={`/stories/${story.id}`}><div className={variant === "card" ? "photo" : "cover"}><StoryImage story={story}/></div><span className="category">{story.edit || story.category}</span><h3>{story.title}</h3><p>{story.summary}</p><span className="read">Read story ↗</span></Link>;
}
export function SectionHeading({ label, title, children }: { label: string; title: string; children?: React.ReactNode }) {
  return <div className="section-head"><div><p className="eyebrow gold">{label}</p><h2>{title}</h2></div>{children}</div>;
}
