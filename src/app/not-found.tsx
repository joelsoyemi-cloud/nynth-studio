import Link from "next/link";
export default function NotFound() {
  return <main id="main" className="wrap page-intro"><span className="eyebrow gold">404 / NYNTH JOURNAL</span><h1>Story not found.</h1><p>This page is not in the journal.</p><Link className="btn back-link" href="/stories">Browse all stories</Link></main>;
}
