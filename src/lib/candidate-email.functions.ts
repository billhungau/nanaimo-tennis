import { createServerFn } from "@tanstack/react-start";
import { z } from "zod";
import { candidateQuestions } from "@/lib/civic-data";

const ADMIN_USER_ID = "05c2f47c-b22d-4d0d-8d14-9c03c33a4472";

const sendCandidateSchema = z.object({
  candidateId: z.string().uuid(),
  accessToken: z.string().min(20),
});

function questionnaireText(name: string, siteUrl: string) {
  return `Hello ${name},

Nanaimo Tennis is an independent community information initiative publishing candidate positions on the future of year-round indoor tennis in Nanaimo.

We are asking every mayoral and council candidate the same three questions. Responses are published without endorsement, ranking or editorial scoring.

1. ${candidateQuestions[0]}

2. ${candidateQuestions[1]}

3. ${candidateQuestions[2]}

Please reply directly to this email with your answers. Your response will be attributed to you and published as provided, subject only to basic formatting for readability.

Candidate information page: ${siteUrl}/candidates

Thank you,
Nanaimo Tennis
${siteUrl}`;
}

export const sendCandidateQuestionnaire = createServerFn({ method: "POST" })
  .inputValidator((data) => sendCandidateSchema.parse(data))
  .handler(async ({ data }) => {
    const { supabaseAdmin } = await import("@/integrations/supabase/client.server");
    const { escapeHtml, getEmailConfig, sendResendEmail } = await import("@/lib/email.server");

    const { data: userData, error: userError } = await supabaseAdmin.auth.getUser(data.accessToken);
    if (userError || userData.user?.id !== ADMIN_USER_ID) throw new Error("Not authorized");

    const db = supabaseAdmin as any;
    const { data: candidate, error } = await db
      .from("candidates")
      .select("id,name,email,internal_notes")
      .eq("id", data.candidateId)
      .single();

    if (error || !candidate) throw new Error("Candidate could not be loaded");
    if (!candidate.email) throw new Error("No email address is recorded for this candidate");

    const { replyDomain, siteUrl } = getEmailConfig();
    const replyTo = `candidate-${candidate.id}@${replyDomain}`;
    const text = questionnaireText(candidate.name, siteUrl);
    const questionsHtml = candidateQuestions.map((question, index) => `<p><strong>${index + 1}.</strong> ${escapeHtml(question)}</p>`).join("");

    const messageId = await sendResendEmail({
      to: candidate.email,
      subject: "Nanaimo Tennis – 2026 candidate questionnaire",
      replyTo,
      idempotencyKey: `candidate-questionnaire/${candidate.id}/${new Date().toISOString().slice(0, 10)}`,
      text,
      html: `
        <p>Hello ${escapeHtml(candidate.name)},</p>
        <p>Nanaimo Tennis is an independent community information initiative publishing candidate positions on the future of year-round indoor tennis in Nanaimo.</p>
        <p>We are asking every mayoral and council candidate the same three questions. Responses are published without endorsement, ranking or editorial scoring.</p>
        ${questionsHtml}
        <p>Please reply directly to this email with your answers. Your response will be attributed to you and published as provided, subject only to basic formatting for readability.</p>
        <p><a href="${siteUrl}/candidates">View the candidate information page</a></p>
        <p>Thank you,<br>Nanaimo Tennis<br><a href="${siteUrl}">${siteUrl}</a></p>
      `,
    });

    const sentAt = new Date().toISOString();
    const note = `[${sentAt}] Candidate questionnaire sent to ${candidate.email}. Resend ID: ${messageId}`;
    const internalNotes = [candidate.internal_notes, note].filter(Boolean).join("\n\n");
    await db.from("candidates").update({ internal_notes: internalNotes }).eq("id", candidate.id);

    return { success: true, sentAt, messageId, to: candidate.email };
  });
