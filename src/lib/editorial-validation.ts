export type Draft = {id:string;title:string;summary:string;body:string[];category:string;section:'people'|'pieces';edit:string|null;image:string|null;alt:string;cover_path:string|null;status:'draft'|'submitted'|'published';featured:boolean};
export function parseDraft(form:FormData):Draft {
  const value=(key:string)=>String(form.get(key)??'').trim();
  const id=value('id');
  if(!/^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(id)||id.length>100) throw new Error('Use a short lowercase slug with hyphens.');
  const title=value('title'),summary=value('summary'),body=value('body').split(/\n\s*\n/).map(p=>p.trim()).filter(Boolean);
  if(!title||title.length>200||summary.length>600||!body.length||body.join('').length>60000) throw new Error('Add a title and story text. Title: 200 characters; summary: 600; body: 60,000.');
  const category=value('category');
  if(!category||category.length>80||value('alt').length>500) throw new Error('Check the category and image description.');
  const image=value('image')||null;
  if(image){try {const u=new URL(image);if(u.protocol!=='https:')throw new Error();} catch {throw new Error('Image links must use HTTPS.');}}
  const section=value('section'); if(section!=='people'&&section!=='pieces')throw new Error('Choose a story section.');
  const status=value('status');if(!['draft','submitted','published'].includes(status))throw new Error('Choose a valid status.');
  const cover_path=value('cover_path')||null;
  if(cover_path && !/^[a-f0-9-]{36}\/[a-f0-9-]{36}\.(jpg|png|webp)$/.test(cover_path))throw new Error('Invalid uploaded image.');
  return {id,title,summary,body,category,section,edit:value('edit')||null,image,alt:value('alt'),cover_path,status:status as Draft['status'],featured:form.get('featured')==='on'};
}
export function imageExtension(bytes:Uint8Array):'jpg'|'png'|'webp'|null {
  if(bytes[0]===255&&bytes[1]===216&&bytes[2]===255)return 'jpg';
  if([137,80,78,71,13,10,26,10].every((b,i)=>bytes[i]===b))return 'png';
  if(String.fromCharCode(...bytes.slice(0,4))==='RIFF'&&String.fromCharCode(...bytes.slice(8,12))==='WEBP')return 'webp';
  return null;
}
