"use client";
import { useRef, useState } from "react";
export function Newsletter() {
  const [message, setMessage] = useState("Preview only. Email addresses are not collected.");
  return <div><form className="subscribe" onSubmit={event => { event.preventDefault(); setMessage("Thanks for trying the preview. No email was saved or sent."); event.currentTarget.reset(); }}><label className="sr-only" htmlFor="email">Email address</label><input id="email" type="email" placeholder="Your email address" required autoComplete="email"/><button type="submit">Count me in ↗</button></form><p className="form-note" role="status">{message}</p></div>;
}
export function Contribution() {
  const dialog = useRef<HTMLDialogElement>(null);
  const [preview, setPreview] = useState("");
  return <><button className="btn" onClick={() => { setPreview(""); dialog.current?.showModal(); }}>Share your perspective</button><dialog ref={dialog} aria-labelledby="contribution-title"><div className="dialog-top"><span className="eyebrow gold">The community desk</span><button onClick={() => dialog.current?.close()} aria-label="Close contribution preview">Close ✕</button></div><div className="dialog-body"><h2 id="contribution-title">Your perspective belongs here.</h2>{preview ? <><h3>{preview}</h3><p>This is a demonstration. Nothing has been sent or saved.</p></> : <form onSubmit={event => { event.preventDefault(); setPreview(String(new FormData(event.currentTarget).get("title"))); }}><p>Show us the look. Tell us the story.</p><label htmlFor="creator-name">Your name</label><input id="creator-name" required maxLength={80} autoComplete="name"/><label htmlFor="pitch-title">Story title</label><input id="pitch-title" name="title" required maxLength={140}/><label htmlFor="pitch">What is your story?</label><textarea id="pitch" required maxLength={2000}/><button className="btn" type="submit">Preview contribution</button><p className="form-note">Demo only — nothing is submitted or stored.</p></form>}</div></dialog></>;
}
