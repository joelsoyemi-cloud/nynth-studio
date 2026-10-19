import {NextResponse,type NextRequest} from 'next/server';
import {configured,sessionClient} from '@/lib/supabase/server';
export async function GET(request:NextRequest){
 const url=new URL(request.url);const token_hash=url.searchParams.get('token_hash');const type=url.searchParams.get('type');
 if(configured()&&token_hash&&type==='invite'){
  const db=await sessionClient();const {error}=await db.auth.verifyOtp({token_hash,type:'invite'});
  if(!error)return NextResponse.redirect(new URL('/studio',url.origin));
 }
 return NextResponse.redirect(new URL('/studio/login?message=Invalid%20or%20expired%20invitation.',url.origin));
}
