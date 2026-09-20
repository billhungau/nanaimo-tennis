import { createFileRoute } from "@tanstack/react-router";
import { z } from "zod";

const ADMIN_USER_ID = "05c2f47c-b22d-4d0d-8d14-9c03c33a4472";

const schema = z.discriminatedUnion("mode", [
  z.object({
    mode: z.literal("candidate"),
    candidateId: z.string().uuid(),
    subject: z.string().trim().min(1).max(200),
    body: z.string().trim().min(20).max(12000),
  }),
  z.object({
    mode: z.literal("test"),
    testEmail: z.string().trim().email().max(255),
    subject: z.string().trim().min(1).max(200),
    body: z.string().trim().min(20).max(12000),
  }),
]);

function personalize(value: string, candidateName: string, siteUrl: string) {
  return value
    .replaceAll("{{name}}", candidateName)
    .replaceAll("{{candidate_page}}", `${siteUrl}/candidates`)
    .replaceAll("{{site_url}}", siteUrl);
}

function cleanSubject(value: string) {
  return value
    .replace(/^\s*\[TEST\]\s*/i, "")
    .replace(/^\s*\[TEST candidate reply\]\s*/i, "")
    .trim();
}

export const Route = createFileRoute("/api/candidate-email")({
  server: {
    handlers: {
      POST: async ({ request }) => {
        const authorization = request.headers.get("authorization") || "";
        const token = authorization.startsWith("Bearer ") ? authorization.slice(7) : "";
        if (!token) return Response.json({ error: "Not authorized" }, { status: 401 });

        let input: z.infer<typeof schema>;
        try {
          input = schema.parse(await request.json());
        } catch {
          return Response.json({ error: "Invalid request" }, { status: 400 });
        }

        const { supabaseAdmin } = await import("@/integrations/supabase/client.server");
        const { escapeHtml, getEmailConfig, sendResendEmail } = await import("@/lib/email.server");

        const { data: userData, error: userError } = await supabaseAdmin.auth.getUser(token);
        if (userError || userData.user?.id !== ADMIN_USER_ID) {
          return Response.json({ error: "Not authorized" }, { status: 401 });
        }

        const { replyDomain, siteUrl } = getEmailConfig();

        if (input.mode === "test") {
          const subject = cleanSubject(personalize(input.subject, "Candidate Name", siteUrl));
          const text = personalize(input.body, "Candidate Name", siteUrl);
          const html = text
            .split(/\n{2,}/)
            .map((paragraph) => `<p>${escapeHtml(paragraph).replaceAll("\n", "<br>")}</p>`)
            .join("");
          const replyTo = `candidate-test@${replyDomain}`;

          const messageId = await sendResendEmail({
            to: input.testEmail,
            subject,
            replyTo,
            text,
            html,
          });

          return Response.json({ success: true, to: input.testEmail, replyTo, messageId, subject });
        }

        const db = supabaseAdmin as any;
        const { data: candidate, error } = await db
          .from("candidates")
          .select("id,name,email,internal_notes")
          .eq("id", input.candidateId)
          .single();

        if (error || !candidate) return Response.json({ error: "Candidate could not be loaded" }, { status: 404 });
        if (!candidate.email) return Response.json({ error: "No email address is recorded for this candidate" }, { status: 400 });

        const replyTo = `candidate-${candidate.id}@${replyDomain}`;
        const subject = cleanSubject(personalize(input.subject, candidate.name, siteUrl));
        const text = personalize(input.body, candidate.name, siteUrl);
        const html = text
          .split(/\n{2,}/)
          .map((paragraph) => `<p>${escapeHtml(paragraph).replaceAll("\n", "<br>")}</p>`)
          .join("");

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
        await db.from("candidates").update({ internal_notes: internalNotes }).eq("id", candidate.id);

        return Response.json({ success: true, sentAt, messageId, to: candidate.email, subject });
      },
    },
  },
});
