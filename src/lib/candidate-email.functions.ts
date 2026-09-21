import { createServerFn } from "@tanstack/react-start";
import { z } from "zod";
import { renderEmailMarkdown, stripEmailMarkdown } from "@/lib/email-format";

const ADMIN_USER_ID = "05c2f47c-b22d-4d0d-8d14-9c03c33a4472";

const sendCandidateSchema = z.object({
  candidateId: z.string().uuid(),
  accessToken: z.string().min(20),
  subject: z.string().trim().min(1).max(200),
  body: z.string().trim().min(20).max(12000),
});

function personalize(value: string, candidateName: string, siteUrl: string) {
  return value
    .replaceAll("{{name}}", candidateName)
    .replaceAll("{{candidate_page}}", `${siteUrl}/candidates`)
    .replaceAll("{{site_url}}", siteUrl);
}

export const sendCandidateQuestionnaire = createServerFn({ method: "POST" })
  .inputValidator((data) => sendCandidateSchema.parse(data))
  .handler(async ({ data }) => {
    const { supabaseAdmin } = await import("@/integrations/supabase/client.server");
    const { getEmailConfig, sendResendEmail } = await import("@/lib/email.server");

    const { data: userData, error: userError } = await supabaseAdmin.auth.getUser(data.accessToken);
    if (userError || userData.user?.id !== ADMIN_USER_ID) throw new Error("Not authorized");

    const db = supabaseAdmin as any;
    const { data: candidate, error } = await db
      .from("candidates")
      .select("id,name,email,internal_notes,outreach_notes")
      .eq("id", data.candidateId)
      .single();

    if (error || !candidate) throw new Error("Candidate could not be loaded");
    if (!candidate.email) throw new Error("No email address is recorded for this candidate");

    const { replyDomain, siteUrl } = getEmailConfig();
    const replyTo = `candidate-${candidate.id}@${replyDomain}`;
    const subject = personalize(data.subject, candidate.name, siteUrl);
    const formattedBody = personalize(data.body, candidate.name, siteUrl);
    const text = stripEmailMarkdown(formattedBody);
    const html = renderEmailMarkdown(formattedBody);

    const messageId = await sendResendEmail({
      to: candidate.email,
      subject,
      replyTo,
      idempotencyKey: `candidate-questionnaire/${candidate.id}/${new Date().toISOString()}`,
      text,
      html,
    });

    const sentAt = new Date().toISOString();
    const note = `[${sentAt}] Candidate questionnaire sent to ${candidate.email}. Subject: ${subject}. Resend ID: ${messageId}`;
    const internalNotes = [candidate.internal_notes, note].filter(Boolean).join("\n\n");
    const outreachNotes = [candidate.outreach_notes, `Email sent to ${candidate.email}. Resend ID: ${messageId}`].filter(Boolean).join("\n");

    const { error: trackingError } = await db.from("candidates").update({
      internal_notes: internalNotes,
      outreach_method: "email",
      outreach_status: "sent",
      outreach_at: sentAt,
      outreach_notes: outreachNotes,
    }).eq("id", candidate.id);

    if (trackingError) {
      console.error("Candidate email sent but outreach tracking update failed", trackingError);
    }

    return {
      success: true,
      sentAt,
      messageId,
      to: candidate.email,
      subject,
      trackingUpdated: !trackingError,
    };
  });
