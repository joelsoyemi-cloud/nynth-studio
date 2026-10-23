'use server';
import { redirect } from 'next/navigation';
import { revalidatePath } from 'next/cache';
import { configured, sessionClient } from '@/lib/supabase/server';
import { requireEditor } from '@/lib/studio';
import { parseDraft, imageExtension } from '@/lib/editorial-validation';
const loginError=(message:string)=>redirect('/studio/login?message='+encodeURIComponent(message));
export async function login(form:FormData){
  if(!configured())loginError('Studio setup is pending.');
  const db=await sessionClient();
  const {error}=await db.auth.signInWithPassword({email:String(form.get('email')??'').trim(),password:String(form.get('password')??'')});
  if(error)loginError('Unable to sign in. Check your details and try again.');
  redirect('/studio');
}
export async function logout(){if(configured()){const db=await sessionClient();await db.auth.signOut();}redirect('/studio/login');}
export async function saveStory(form:FormData){
  const {db,user,role}=await requireEditor();
  let id='';
  try {
    const draft=parseDraft(form);id=draft.id;
    const {data:existing,error:readError}=await db.from('journal_stories').select('author_id,status').eq('id',id).maybeSingle();
    if(readError)throw new Error('Unable to check the existing story.');
    const mode=String(form.get('mode'));
    if(mode==='new'&&existing)throw new Error('That slug is already in use.');
    if(mode==='edit'&&!existing)throw new Error('Story not found or permission denied.');
    if(role!=='admin'&&(draft.status==='published'||draft.featured||(existing&&(existing.author_id!==user.id||existing.status==='published'))))throw new Error('Only the administrator can publish or feature stories.');
    if(draft.cover_path && role!=='admin' && !draft.cover_path.startsWith(user.id+'/'))throw new Error('Choose one of your own uploads.');
    const upload=form.get('upload');
    if(upload instanceof File&&upload.size){
      if(upload.size>3*1024*1024)throw new Error('Choose an image smaller than 3 MB.');
      const bytes=new Uint8Array(await upload.arrayBuffer());const ext=imageExtension(bytes);
      if(!ext)throw new Error('Choose a JPEG, PNG or WebP image.');
      const path=`${user.id}/${crypto.randomUUID()}.${ext}`;
      const {error}=await db.storage.from('journal-media').upload(path,bytes,{contentType:ext==='jpg'?'image/jpeg':`image/${ext}`,upsert:false});
      if(error)throw new Error('Image upload failed. Please try again.');
      draft.cover_path=path;
    }
    const payload={...draft,updated_at:new Date().toISOString()};
    const result=existing?await db.from('journal_stories').update(payload).eq('id',id).select('id').single():await db.from('journal_stories').insert({...payload,author_id:user.id}).select('id').single();
    if(result.error)throw new Error('Save failed. Check permissions and whether the slug is already used.');
  } catch(e){redirect(`/studio/edit${id && form.get('mode')==='edit'?'?id='+encodeURIComponent(id)+'&':'?'}message=${encodeURIComponent(e instanceof Error?e.message:'Unable to save.')}`);}
  revalidatePath('/');revalidatePath('/stories');revalidatePath('/stories/'+id);revalidatePath('/studio');
  redirect('/studio?message=Story%20saved.');
}
export async function changeStatus(form:FormData){
  const {db,role}=await requireEditor();
  if(role!=='admin')redirect('/studio?message=Administrator%20access%20required.');
  const id=String(form.get('id'));const status=String(form.get('status'));
  if(!['draft','published'].includes(status))redirect('/studio');
  const {error}=await db.from('journal_stories').update({status,updated_at:new Date().toISOString()}).eq('id',id).select('id').single();
  if(error)redirect('/studio?message=Status%20change%20failed.');
  revalidatePath('/');revalidatePath('/stories');revalidatePath('/stories/'+id);revalidatePath('/studio');redirect('/studio');
}

export async function setPassword(form:FormData){
 const {db}=await requireEditor();const password=String(form.get('password')??'');
 if(password.length<12)redirect('/studio?message=Use%20at%20least%2012%20characters.');
 const {error}=await db.auth.updateUser({password});
 redirect('/studio?message='+encodeURIComponent(error?'Password update failed. Try signing in again.':'Password updated.'));
}
