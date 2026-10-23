'use client';
export default function ErrorPage({reset}:{reset:()=>void}){return <main id="main" className="wrap"><section className="page-intro"><h1>Temporarily unavailable.</h1><p>We couldn’t load the journal. Please try again shortly.</p><button className="btn" onClick={reset}>Try again</button></section></main>;}
