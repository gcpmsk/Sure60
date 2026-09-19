// Cloudflare Pages Function. The service-role key NEVER enters the frontend bundle.
const json=(body,status=200)=>new Response(JSON.stringify(body),{status,headers:{'Content-Type':'application/json','Cache-Control':'no-store','X-Content-Type-Options':'nosniff'}});
async function hash(value){return Array.from(new Uint8Array(await crypto.subtle.digest('SHA-256',new TextEncoder().encode(value)))).map(x=>x.toString(16).padStart(2,'0')).join('')}
export async function onRequestPost({request,env}){
 if(!env.SUPABASE_URL||!env.SUPABASE_ANON_KEY||!env.SUPABASE_SERVICE_ROLE_KEY)return json({error:'Roll-number login is not configured. Use your email, or ask the admin to configure Cloudflare runtime secrets.'},503);
 if(request.headers.get('Origin')&&request.headers.get('Origin')!==new URL(request.url).origin)return json({error:'Request not allowed.'},403);
 if(Number(request.headers.get('Content-Length')||0)>4096)return json({error:'Request too large.'},413);
 try{
  const body=await request.text();if(body.length>4096)return json({error:'Request too large.'},413);
  const {username,password}=JSON.parse(body);
  if(typeof username!=='string'||!/^[a-zA-Z0-9_-]{3,30}$/.test(username)||typeof password!=='string'||!password||password.length>256)return json({error:'Invalid sign-in details.'},400);
  const base=env.SUPABASE_URL.replace(/\/$/,'');
  const headers={apikey:env.SUPABASE_SERVICE_ROLE_KEY,Authorization:`Bearer ${env.SUPABASE_SERVICE_ROLE_KEY}`,'Content-Type':'application/json'};
  const budget=await fetch(`${base}/rest/v1/rpc/consume_login_budget`,{method:'POST',headers,body:JSON.stringify({p_ip_hash:await hash(request.headers.get('CF-Connecting-IP')||'local'),p_username_hash:await hash(username.toLowerCase())})});
  if(!budget.ok)return json({error:'Sign-in temporarily unavailable. Try email login.'},503);
  if(!(await budget.json()))return json({error:'Too many attempts. Please wait 15 minutes.'},429);
  const found=await fetch(`${base}/rest/v1/profiles?username=eq.${encodeURIComponent(username.toLowerCase())}&select=email&limit=1`,{headers});
  if(!found.ok)return json({error:'Sign-in temporarily unavailable.'},503);
  const users=await found.json();
  // Still perform a password grant for missing usernames to reduce timing differences.
  const token=await fetch(`${base}/auth/v1/token?grant_type=password`,{method:'POST',headers:{apikey:env.SUPABASE_ANON_KEY,'Content-Type':'application/json'},body:JSON.stringify({email:users[0]?.email||'invalid-login@example.invalid',password})});
  const result=await token.json();if(!token.ok||!users.length)return json({error:'Incorrect credentials, or email is not yet confirmed.'},401);
  const profile=await fetch(`${base}/rest/v1/profiles?id=eq.${result.user.id}&select=approved&limit=1`,{headers});
  if(!profile.ok)return json({error:'Unable to verify account access.'},503);
  const p=await profile.json();if(!p[0]?.approved)return json({error:'Your account is awaiting admin verification.'},403);
  return json({access_token:result.access_token,refresh_token:result.refresh_token});
 }catch{return json({error:'Unable to sign in. Check your connection and try again.'},400)}
}
export function onRequestGet(){return json({error:'Method not allowed.'},405)}
