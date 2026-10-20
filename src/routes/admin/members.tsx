import { createFileRoute, Link } from "@tanstack/react-router";
import { useEffect, useMemo, useState, type FormEvent } from "react";
import type { Session } from "@supabase/supabase-js";
import { supabase } from "@/lib/supabase";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";

const ADMIN_USER_ID = "05c2f47c-b22d-4d0d-8d14-9c03c33a4472";
const DEFAULT_SUBJECT = "Nanaimo Tennis Google Group invitation – a quick follow-up";
const DEFAULT_BODY = "Hello,\n\nYou were recently invited to join the Nanaimo Tennis Google Group. Some invitations may be missed or filtered into spam. If you'd like to participate, please check your invitation or use the group joining link below:\n\n{{group_link}}\n\nIf you've already joined, thank you and please disregard this reminder. If you'd prefer not to receive another reminder, simply reply to let us know.\n\nThank you,\nNanaimo Tennis";
type Contact = {id:string;email:string;name:string|null;invitation_date:string|null;invitation_status:string;membership_status:string;reply_status:string;suppressed:boolean;notes:string|null;created_at:string};
type Event = {id:string;contact_id:string;event_type:string;occurred_at:string;note:string|null};
export const Route = createFileRoute("/admin/members")({head:()=>({meta:[{title:"Google Group Outreach | Nanaimo Tennis"},{name:"robots",content:"noindex,nofollow"}]}),component:MembersPage});
function MembersPage(){
 const [session,setSession]=useState<Session|null>(null);const [ready,setReady]=useState(false);
 const [email,setEmail]=useState("");const [password,setPassword]=useState("");const [message,setMessage]=useState("");
 const [contacts,setContacts]=useState<Contact[]>([]);const [events,setEvents]=useState<Event[]>([]);
 const [query,setQuery]=useState("");const [filter,setFilter]=useState("all");const [selected,setSelected]=useState<string[]>([]);
 const [loading,setLoading]=useState(false);const [sending,setSending]=useState(false);const [pendingImport,setPendingImport]=useState<{email:string;name:string|null;invitation_date:string|null}[]>([]);const [importing,setImporting]=useState(false);const [addOpen,setAddOpen]=useState(false);const [newEmail,setNewEmail]=useState("");const [newName,setNewName]=useState("");const [adding,setAdding]=useState(false);
 const [subject,setSubject]=useState(DEFAULT_SUBJECT);const [body,setBody]=useState(DEFAULT_BODY);const [groupLink,setGroupLink]=useState("");
 const isAdmin=session?.user.id===ADMIN_USER_ID;
 useEffect(()=>{void supabase.auth.getSession().then(({data})=>{setSession(data.session);setReady(true)});const {data}=supabase.auth.onAuthStateChange((_e,s)=>{setSession(s);setReady(true)});return ()=>data.subscription.unsubscribe()},[]);
 useEffect(()=>{if(isAdmin) void load()},[isAdmin]);
 async function load(){setLoading(true);const [a,b]=await Promise.all([supabase.from("group_contacts").select("*").order("email"),supabase.from("group_outreach_events").select("*").order("occurred_at",{ascending:false}).limit(5000)]);if(a.error||b.error)setMessage("Unable to load: "+(a.error?.message||b.error?.message));else {setContacts((a.data||[]) as Contact[]);setEvents((b.data||[]) as Event[])}setLoading(false)}
 async function update(id:string,patch:Partial<Contact>){const {error}=await supabase.from("group_contacts").update({...patch,updated_at:new Date().toISOString()}).eq("id",id);if(error)setMessage(error.message);else await load()}
 function parseCsv(raw:string){const lines=raw.replace(/^\uFEFF/,"").split(/\r?\n/).filter(Boolean);const parse=(line:string)=>{const cells:string[]=[];let v="",quoted=false;for(let i=0;i<line.length;i++){const c=line[i];if(c==='"'&&quoted&&line[i+1]==='"'){v+='"';i++}else if(c==='"')quoted=!quoted;else if(c===","&&!quoted){cells.push(v.trim());v=""}else v+=c}cells.push(v.trim());return cells};const rows=lines.map(parse),header=rows[0].map(x=>x.toLowerCase());const emailPattern=/^[^\s@]+@[^\s@]+\.[^\s@]+$/;
 // Google Groups exports may be arranged in repeated horizontal blocks:
 // username row, email row, Excel serial-date row, pending-status row.
 if(!header.some(x=>x.includes("email"))){
   const entries:{email:string;name:string|null;invitation_date:string|null}[]=[];
   for(let row=0;row<rows.length;row++)for(let col=0;col<rows[row].length;col++){
     const email=(rows[row][col]||"").trim().toLowerCase();
     if(!emailPattern.test(email))continue;
     const label=(rows[row-1]?.[col]||"").trim();
     const serial=Number(rows[row+1]?.[col]);
     const rawDate=rows[row+1]?.[col]||"";
     let invitation_date:string|null=null;
     if(serial>30000&&serial<100000)invitation_date=new Date(Math.round((serial-25569)*86400000)).toISOString();
     else if(rawDate&&!Number.isNaN(Date.parse(rawDate)))invitation_date=new Date(rawDate).toISOString();
     entries.push({email,name:label||null,invitation_date});
   }
   return entries;
 }
let col=header.findIndex(x=>x.includes("email"));if(col<0)col=0;const dateCol=header.findIndex(x=>x.includes("invitation")&&x.includes("date"));const nameCol=header.findIndex(x=>x==="name"||x==="username");return rows.slice(header.some(x=>x.includes("email"))?1:0).map(r=>({email:(r[col]||"").toLowerCase().trim(),name:nameCol>=0?(r[nameCol]||null):null,invitation_date:dateCol>=0&&r[dateCol]&&!Number.isNaN(Date.parse(r[dateCol]))?new Date(r[dateCol]).toISOString():null})).filter(r=>emailPattern.test(r.email))}

 async function previewFile(file:File){
   try {
     setMessage("");setPendingImport([]);
     let csv:string;
     if(/\.xlsx?$/i.test(file.name)){
       const readXlsxFile=(await import("read-excel-file")).default;
       const rows=await readXlsxFile(file);
       // Convert worksheet cells into quoted CSV so one parser handles all supported formats.
       csv=rows.map(row=>row.map(cell=>'"'+String(cell??"").replaceAll('"','""')+'"').join(",")).join("\n");
     } else if(/\.csv$/i.test(file.name)) csv=await file.text();
     else {setMessage("Select a CSV or XLSX file.");return}
     const unique=new Map(parseCsv(csv).map(row=>[row.email,row]));
     setPendingImport([...unique.values()]);
     setMessage("Ready to import "+unique.size+" unique valid email addresses. Review and confirm below.");
   }catch(error){setMessage("Unable to read spreadsheet: "+(error instanceof Error?error.message:"Unknown error"))}
 }
 async function confirmImport(){
   if(!pendingImport.length)return;setImporting(true);
   let count=0;
   for(let i=0;i<pendingImport.length;i+=100){
     const batch=pendingImport.slice(i,i+100);
     const {data,error}=await supabase.from("group_contacts").upsert(batch,{onConflict:"email",ignoreDuplicates:true}).select("id");
     if(error){setMessage("Import stopped: "+error.message);setImporting(false);return}
     count+=(data||[]).length;
   }
   setPendingImport([]);setImporting(false);
   setMessage("Imported "+count+" new records; existing records and outreach history were preserved.");
   await load();
 }

 async function addContact(e:FormEvent<HTMLFormElement>){
   e.preventDefault();
   const normalized=newEmail.trim().toLowerCase();
   if(!/^[^\\s@]+@[^\\s@]+\\.[^\\s@]+$/.test(normalized)){setMessage("Enter a valid email address.");return}
   if(contacts.some(c=>c.email===normalized)){setMessage("This email address already exists.");return}
   setAdding(true);
   const {error}=await supabase.from("group_contacts").insert({email:normalized,name:newName.trim()||null,invitation_status:"pending",membership_status:"unverified"});
   setAdding(false);
   if(error){setMessage(error.code==="23505"?"This email address already exists.":"Unable to add contact: "+error.message);return}
   setNewEmail("");setNewName("");setAddOpen(false);setMessage("Contact added successfully.");await load();
 }
 const lastSent=useMemo(()=>{const m=new Map<string,string>();for(const e of events)if(e.event_type==="sent"&&!m.has(e.contact_id))m.set(e.contact_id,e.occurred_at);return m},[events]);
 const visible=contacts.filter(c=>(c.email.includes(query.trim().toLowerCase())||(c.name||"").toLowerCase().includes(query.toLowerCase()))&&(filter==="all"||filter==="unsent"&&!lastSent.has(c.id)||filter==="sent"&&lastSent.has(c.id)||filter==="replied"&&c.reply_status==="replied"||filter==="joined"&&c.membership_status==="joined"||filter==="pending"&&c.membership_status!=="joined"));
 const eligible=visible.filter(c=>!c.suppressed&&c.membership_status!=="joined"&&c.reply_status!=="replied");
 const sendable=eligible.filter(c=>selected.includes(c.id));
 async function send(){if(!groupLink.startsWith("https://")){setMessage("Provide the valid HTTPS Google Group joining link before sending.");return}if(!sendable.length||!window.confirm("Send individual reminders to "+sendable.length+" selected contacts?"))return;setSending(true);let ok=0;let failed=0;for(const c of sendable){try{const result=await fetch("/api/group-outreach",{method:"POST",headers:{"Content-Type":"application/json",Authorization:"Bearer "+session?.access_token},body:JSON.stringify({contactId:c.id,subject,body,groupLink})});if(result.status===200)ok++;else failed++}catch{failed++}}setSending(false);setSelected([]);setMessage("Accepted for sending: "+ok+". Failed: "+failed+". Review event logs before retrying.");await load()}
 if(!ready)return <div className="page-wrap py-12">Checking administrator session…</div>;
 if(!session)return <div className="page-wrap max-w-md py-16"><h1 className="font-serif text-3xl">Private group outreach</h1><form className="mt-6 space-y-3" onSubmit={async e=>{e.preventDefault();const {error}=await supabase.auth.signInWithPassword({email,password});if(error)setMessage(error.message)}}><Input type="email" placeholder="Admin email" value={email} onChange={e=>setEmail(e.target.value)} required/><Input type="password" placeholder="Password" value={password} onChange={e=>setPassword(e.target.value)} required/><Button type="submit">Sign in</Button></form><p className="mt-4 text-sm">{message}</p></div>;
 if(!isAdmin)return <div className="page-wrap py-16">Access not authorized.</div>;
 return <div className="page-wrap py-12 space-y-7"><div className="flex flex-wrap justify-between gap-3"><div><p className="eyebrow">Private administration</p><h1 className="font-serif text-4xl">Google Group Outreach</h1><p className="mt-2 text-sm text-muted-foreground">Invitation, outreach, reply and membership tracking. No messages send without confirmation.</p></div><Button variant="outline" asChild><Link to="/admin">Admin portal</Link></Button></div>
 <div className="grid grid-cols-2 gap-3 md:grid-cols-4">{[["Contacts",contacts.length],["Follow-ups sent",lastSent.size],["Replied",contacts.filter(c=>c.reply_status==="replied").length],["Confirmed joined",contacts.filter(c=>c.membership_status==="joined").length]].map(([label,value])=><div key={label} className="border border-border bg-card p-4"><p className="text-xs text-muted-foreground">{label}</p><p className="mt-1 text-3xl font-semibold">{value}</p></div>)}</div>
 <section className="border border-border bg-card p-5 space-y-3"><h2 className="font-serif text-2xl">Import Google Groups export</h2><p className="text-sm text-muted-foreground">Choose Excel (.xlsx) or CSV (email column required). Review the preview, then explicitly confirm. Existing records and outreach history are preserved.</p><Input type="file" accept=".xlsx,.csv" onChange={e=>{const f=e.target.files?.[0];if(f)void previewFile(f)}}/>{pendingImport.length>0&&<div className="space-y-2 border border-border bg-secondary/30 p-4"><p className="font-semibold">{pendingImport.length} unique valid email addresses ready to import</p><p className="text-xs text-muted-foreground">Preview: {pendingImport.slice(0,4).map(r=>r.email).join(", ")}{pendingImport.length>4?" …":""}</p><Button disabled={importing} onClick={()=>void confirmImport()}>{importing?"Importing…":"Import "+pendingImport.length+" pending invitations"}</Button><Button variant="outline" disabled={importing} onClick={()=>{setPendingImport([]);setMessage("Import cancelled.")}}>Cancel</Button></div>}</section>
 <section className="border border-border bg-card p-5 space-y-3"><h2 className="font-serif text-2xl">Reconcile confirmed members</h2><p className="text-sm text-muted-foreground">Upload a CSV of actual Google Group members. Emails that match existing records will be marked joined; other records will remain unverified, not automatically marked absent.</p><Input type="file" accept=".csv,text/csv" onChange={async e=>{const f=e.target.files?.[0];if(!f)return;const emails=new Set(parseCsv(await f.text()).map(v=>v.email));const matches=contacts.filter(c=>emails.has(c.email));if(!window.confirm("Confirm "+matches.length+" existing contacts as joined?"))return;for(const c of matches){if(c.membership_status!=="joined")await supabase.from("group_contacts").update({membership_status:"joined",membership_verified_at:new Date().toISOString()}).eq("id",c.id)}setMessage("Confirmed "+matches.length+" matching contacts.");await load()}}/></section>
 <section className="border border-border bg-card p-5 space-y-4"><h2 className="font-serif text-2xl">Reminder template</h2><label className="block text-sm">Google Group joining link<Input value={groupLink} onChange={e=>setGroupLink(e.target.value)} placeholder="https://groups.google.com/g/..." /></label><label className="block text-sm">Subject<Input value={subject} onChange={e=>setSubject(e.target.value)} /></label><label className="block text-sm">Body<Textarea rows={10} value={body} onChange={e=>setBody(e.target.value)}/></label><p className="text-xs text-muted-foreground">Use <code>{"{{group_link}}"}</code>. Sending is restricted to selected, non-suppressed, non-joined contacts who have not replied.</p><Button disabled={sending||!sendable.length||!subject.trim()||!body.includes("{{group_link}}")} onClick={()=>void send()}>{sending?"Sending…":"Send to "+sendable.length+" selected recipients"}</Button></section>
 <section className="space-y-3"><div className="flex flex-wrap items-center justify-between gap-3"><h2 className="font-serif text-2xl">Contacts</h2><Button onClick={()=>setAddOpen(v=>!v)}>{addOpen?"Close":"Add contact"}</Button></div>
 {addOpen&&<form onSubmit={e=>void addContact(e)} className="grid gap-3 border border-border bg-card p-4 sm:grid-cols-[1fr_1fr_auto] sm:items-end"><label className="block text-sm">Email address (required)<Input type="email" required value={newEmail} onChange={e=>setNewEmail(e.target.value)} placeholder="name@example.com"/></label><label className="block text-sm">Name (optional)<Input value={newName} onChange={e=>setNewName(e.target.value)} placeholder="Contact name"/></label><Button type="submit" disabled={adding}>{adding?"Adding…":"Save contact"}</Button></form>}
 <div className="flex flex-wrap gap-2"><Input placeholder="Search emails or names" className="max-w-sm" value={query} onChange={e=>setQuery(e.target.value)}/><select className="rounded border border-input bg-background p-2 text-sm" value={filter} onChange={e=>setFilter(e.target.value)}>{[["all","All"],["pending","Not confirmed"],["unsent","Not sent"],["sent","Sent"],["replied","Replied"],["joined","Joined"]].map(([v,l])=><option key={v} value={v}>{l}</option>)}</select><Button variant="outline" onClick={()=>setSelected(eligible.map(c=>c.id))}>Select all eligible visible ({eligible.length})</Button><Button variant="outline" onClick={()=>setSelected(contacts.filter(c=>!c.suppressed&&c.membership_status!=="joined"&&c.reply_status!=="replied").map(c=>c.id))}>Select all eligible contacts</Button><Button variant="outline" onClick={()=>setSelected([])}>Deselect all</Button><span className="self-center text-xs text-muted-foreground">{selected.length} selected</span><Button variant="outline" onClick={()=>{const headers="email,invitation_status,membership_status,reply_status,last_sent,suppressed";const lines=contacts.map(c=>[c.email,c.invitation_status,c.membership_status,c.reply_status,lastSent.get(c.id)||"",c.suppressed].map(x=>'"'+String(x).replaceAll('"','""')+'"').join(","));const a=document.createElement("a");a.href=URL.createObjectURL(new Blob([[headers,...lines].join("\n")],{type:"text/csv"}));a.download="group-outreach.csv";a.click();URL.revokeObjectURL(a.href)}}>Export CSV</Button></div>
 <div className="overflow-x-auto border border-border"><table className="w-full min-w-[850px] text-sm"><thead className="bg-secondary/50 text-left"><tr><th className="p-3"><label className="flex items-center gap-2"><input aria-label="Select all eligible visible contacts" type="checkbox" checked={eligible.length>0&&eligible.every(c=>selected.includes(c.id))} onChange={e=>setSelected(current=>e.target.checked?[...new Set([...current,...eligible.map(c=>c.id)])]:current.filter(id=>!eligible.some(c=>c.id===id)))} />Select</label></th>{["Email","Last sent","Reply","Membership","Suppress","Notes"].map(x=><th key={x} className="p-3">{x}</th>)}</tr></thead><tbody>{visible.map(c=><tr key={c.id} className="border-t border-border"><td className="p-3"><input type="checkbox" disabled={c.suppressed||c.membership_status==="joined"||c.reply_status==="replied"} checked={selected.includes(c.id)} onChange={e=>setSelected(s=>e.target.checked?[...s,c.id]:s.filter(x=>x!==c.id))}/></td><td className="p-3">{c.email}</td><td className="p-3">{lastSent.has(c.id)?new Date(lastSent.get(c.id)!).toLocaleDateString():"Not sent"}</td><td className="p-3"><select aria-label={"Reply status "+c.email} className="border bg-background p-1" value={c.reply_status} onChange={e=>void update(c.id,{reply_status:e.target.value})}><option value="none">None</option><option value="replied">Replied</option></select></td><td className="p-3"><select aria-label={"Membership status "+c.email} className="border bg-background p-1" value={c.membership_status} onChange={e=>void update(c.id,{membership_status:e.target.value})}><option value="unverified">Unverified</option><option value="joined">Joined</option><option value="not_member">Not member</option></select></td><td className="p-3"><input type="checkbox" checked={c.suppressed} aria-label={"Suppress "+c.email} onChange={e=>void update(c.id,{suppressed:e.target.checked})}/></td><td className="p-3"><Input aria-label={"Notes "+c.email} key={c.id+String(c.notes)} defaultValue={c.notes||""} placeholder="Notes (save on blur)" onBlur={e=>{if(e.target.value!==(c.notes||""))void update(c.id,{notes:e.target.value})}}/></td></tr>)}</tbody></table></div><p className="text-xs text-muted-foreground">{loading?"Loading…":visible.length+" contacts shown"}</p></section>
 {message&&<div role="status" className="border border-border bg-secondary/50 p-4 text-sm">{message}</div>}
 </div>
}