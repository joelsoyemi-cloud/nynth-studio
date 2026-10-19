import 'server-only';
import { redirect } from 'next/navigation';
import { configured, sessionClient } from './supabase/server';
export async function requireEditor() {
  if (!configured()) redirect('/studio/login');
  const db = await sessionClient();
  const {data:{user},error} = await db.auth.getUser();
  if(error || !user) redirect('/studio/login');
  const {data:member,error:membershipError} = await db.from('editorial_members').select('role').eq('user_id',user.id).maybeSingle();
  if(membershipError || !member) redirect('/studio/login?message=Access%20is%20limited%20to%20invited%20editors.');
  return {db,user,role:member.role as 'admin'|'contributor'};
}
