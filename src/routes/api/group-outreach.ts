import { createFileRoute } from "@tanstack/react-router";
import { z } from "zod";
import { renderEmailMarkdown, stripEmailMarkdown } from "@/lib/email-format";
const ADMIN_USER_ID = "05c2f47c-b22d-4d0d-8d14-9c03c33a4472";
const schema=z.object({contactId:z.string().uuid(),subject:z.string().trim().min(1).max(200),body:z.string().trim().min(20).max(12000),groupLink:z.string().url().startsWith("https://").max(1000)});
export const Route=createFileRoute("/api/group-outreach")({server:{handlers:{POST:async({request})=>{
 const token=(request.headers.get("authorization")||"").replace(/^Bearer /,"");if(!token)return Response.json({error:"Not authorized"},{status:401});
 const parsed=schema.safeParse(await request.json().catch(()=>null));if(!parsed.success)return Response.json({error:"Invalid request"},{status:400});
 const {supabaseAdmin}=await import("@/integrations/supabase/client.server");
 const {getEmailConfig,sendResendEmail}=await import("@/lib/email.server");
 const {data:userData,error:userError}=await supabaseAdmin.auth.getUser(token);
 if(userError||userData.user?.id!==ADMIN_USER_ID)return Response.json({error:"Not authorized"},{status:403});
 const db=supabaseAdmin as any;
 const {data:contact,error}=await db.from("group_contacts").select("id,email,name,suppressed,membership_status,reply_status").eq("id",parsed.data.contactId).single();
 if(error||!contact)return Response.json({error:"Contact not found"},{status:404});
 if(contact.suppressed||contact.membership_status==="joined"||contact.reply_status==="replied")return Response.json({error:"Contact excluded from reminders"},{status:409});
 const {replyDomain}=getEmailConfig();
 const groupSender=process.env["RESEND_FROM_EMAIL_TO_PENDING_INVITATION"];
 if(!groupSender)return Response.json({error:"Pending invitation sender is not configured"},{status:503});
 const subject=parsed.data.subject;
 const formatted=parsed.data.body.replaceAll("{{group_link}}",parsed.data.groupLink).replaceAll("{{name}}",contact.name||"");
 // Mark only after provider accepts the message; never record delivery/read without delivery webhook evidence.
 const messageId=await sendResendEmail({to:contact.email,subject,from:groupSender,replyTo:`group-${contact.id}@${replyDomain}`,text:stripEmailMarkdown(formatted),html:renderEmailMarkdown(formatted),idempotencyKey:`group-reminder/${contact.id}/${new Date().toISOString()}`});
 const {error:logError}=await db.from("group_outreach_events").insert({contact_id:contact.id,event_type:"sent",provider_id:messageId,note:"Resend accepted reminder"});
 if(logError){console.error("Reminder accepted but event insert failed",logError);return Response.json({messageId,error:"Email accepted, but tracking failed; check Resend before attempting again"},{status:207})}
 return Response.json({messageId,accepted:true});
 }}}});
