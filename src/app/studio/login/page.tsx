import {configured} from '@/lib/supabase/server';
import {login} from '../actions';
export default async function Login({searchParams}:{searchParams:Promise<{message?:string}>}){
 const {message}=await searchParams;
 return <main id="main" className="studio-panel login-panel"><p className="eyebrow">NYNTH / PRIVATE EDITORIAL STUDIO</p><h1>Welcome back.</h1><p>This workspace is for invited editors only.</p>{message&&<p role="alert">{message}</p>}{!configured()?<p>Studio setup is pending. No database is connected yet.</p>:<form action={login}><label>Email<input name="email" type="email" autoComplete="username" required/></label><label>Password<input name="password" type="password" autoComplete="current-password" required/></label><button type="submit">Sign in</button></form>}</main>;
}
