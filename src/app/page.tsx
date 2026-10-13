import Link from "next/link";
import { DecryptedText } from "@/components/decrypted-text";
export default function Home() {
  return <>
    <a className="skip" href="#main">Skip to content</a>
    <header><Link className="brand" href="/">NYNTH<span>WORLD / JOURNAL</span></Link><nav aria-label="Main"><a href="/reference/index.html">Approved mockup ↗</a><a href="/reference/admin.html">Studio preview ↗</a></nav></header>
    <main id="main">
      <section className="intro"><p className="eyebrow">THE NEXT CHAPTER / REACT FOUNDATION</p><h1>Built on belief.<br/><em>Made to</em> <DecryptedText text="STAY ABOVE."/></h1><div className="intro-bottom"><p>Fashion. Passion. Possibility.<br/>The stories and people behind NYNTH World.</p><a className="button" href="/reference/index.html">Explore the approved journal ↗</a></div></section>
      <section className="campaign" aria-label="NYNTH campaign"><div className="campaign-copy"><p className="eyebrow">NYNTH WORLD</p><h2>The world only<br/>needs winners.</h2></div></section>
      <section className="next"><p className="eyebrow">A FOUNDATION FOR WHAT COMES NEXT</p><div className="columns"><article><span>01 / THE JOURNAL</span><h2>Stories with feeling.</h2><p>Newman’s perspective, the pieces and the culture. The approved design is preserved in the reference preview.</p></article><article><span>02 / THE STUDIO</span><h2>Your editorial desk.</h2><p>Preview the dashboard and product-story workflow. Publishing and store syncing will be connected in a later phase.</p></article><article><span>03 / THE MOVEMENT</span><h2>Purpose in motion.</h2><p>A restrained animation system: expressive headings, considered reveals and interactions that support the story.</p></article></div></section>
    </main><footer><strong>NYNTH WORLD</strong><p>React foundation preview · Not a live publishing system</p><a href="https://www.nynthworld.com/">Visit the store ↗</a></footer>
  </>;
}
