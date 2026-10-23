import 'server-only';
import { cache } from 'react';
import { stories as examples, type Story } from '@/content/stories';
import { configured, publicClient } from './supabase/server';
export const getPublishedStories = cache(async ():Promise<Story[]> => {
  if(!configured()) return examples;
  const db=publicClient();
  const {data,error}=await db.from('journal_stories').select('id,title,summary,body,category,section,edit,image,alt,cover_path').eq('status','published').order('featured',{ascending:false}).order('updated_at',{ascending:false});
  if(error) throw new Error('The journal is temporarily unavailable. Please try again.');
  return Promise.all((data??[]).map(async row=>{
    if(row.cover_path){const {data:signed,error}=await db.storage.from('journal-media').createSignedUrl(row.cover_path,3600);if(error)row.image=null;else row.image=signed.signedUrl;}
    return row as Story;
  }));
});
export async function getPublishedStory(id:string){return (await getPublishedStories()).find(s=>s.id===id);}
