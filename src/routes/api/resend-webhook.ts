import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/api/resend-webhook")({
  server: {
    handlers: {
      POST: async ({ request }) => {
        const payload = await request.text();
        const { escapeHtml, getEmailConfig, getReceivedEmail, sendResendEmail, verifyResendWebhook } = await import("@/lib/email.server");

        if (!verifyResendWebhook(payload, request.headers)) {
          return new Response("Invalid webhook signature", { status: 401 });
        }

        let event: any;
        try {
          event = JSON.parse(payload);
        } catch {
          return new Response("Invalid JSON", { status: 400 });
        }

        if (event?.type !== "email.received") return Response.json({ ok: true });

        const emailId = String(event?.data?.email_id || "");
        const recipients = Array.isArray(event?.data?.to) ? event.data.to.map(String) : [];
        const isTestReply = recipients.some((address: string) => /candidate-test@/i.test(address));
        const candidateId = recipients
          .map((address: string) => address.match(/candidate-([0-9a-f-]{36})@/i)?.[1])
          .find(Boolean);

        const received = emailId ? await getReceivedEmail(emailId).catch(() => null) : null;
        const from = String(received?.from || event?.data?.from || "Unknown sender");
        const subject = String(received?.subject || event?.data?.subject || "(no subject)");
        const text = String(received?.text || "").trim();
        const excerpt = text ? text.slice(0, 4000) : "Email received. View the full message in the Resend dashboard.";

        if (isTestReply) {
          try {
            const { adminEmail } = getEmailConfig();
            if (adminEmail) {
              await sendResendEmail({
                to: adminEmail,
                subject: `[TEST candidate reply] ${subject}`,
                replyTo: from.includes("<") ? from.match(/<([^>]+)>/)?.[1] || undefined : from,
                html: `
                  <h2>Test candidate reply received</h2>
                  <p><strong>From:</strong> ${escapeHtml(from)}</p>
                  <p><strong>Subject:</strong> ${escapeHtml(subject)}</p>
                  <p><strong>Message:</strong></p>
                  <p>${escapeHtml(excerpt).replace(/\n/g, "<br>")}</p>
                  <p>This confirms the Resend inbound webhook and admin notification path are working.</p>
                `,
                text: `Test candidate reply received\nFrom: ${from}\nSubject: ${subject}\n\n${excerpt}`,
              });
            }
          } catch (mailError) {
            console.error("Test candidate reply received but admin notification failed", mailError);
          }
          return Response.json({ ok: true, matched: true, test: true });
        }

        if (!candidateId) return Response.json({ ok: true, matched: false });

        const { supabaseAdmin } = await import("@/integrations/supabase/client.server");
        const db = supabaseAdmin as any;
        const { data: candidate } = await db
          .from("candidates")
          .select("id,name,email,internal_notes")
          .eq("id", candidateId)
          .single();

        if (!candidate) return Response.json({ ok: true, matched: false });

        const receivedAt = String(event?.created_at || new Date().toISOString());
        const note = `[${receivedAt}] Email reply received from ${from}\nSubject: ${subject}\n${excerpt}`;
        const internalNotes = [candidate.internal_notes, note].filter(Boolean).join("\n\n");
        await db.from("candidates").update({ internal_notes: internalNotes }).eq("id", candidate.id);

        try {
          const { adminEmail } = getEmailConfig();
          if (adminEmail) {
            await sendResendEmail({
              to: adminEmail,
              subject: `[Candidate reply] ${candidate.name}: ${subject}`,
              replyTo: candidate.email || undefined,
              html: `
                <h2>Candidate email reply received</h2>
                <p><strong>Candidate:</strong> ${escapeHtml(candidate.name)}</p>
                <p><strong>From:</strong> ${escapeHtml(from)}</p>
                <p><strong>Subject:</strong> ${escapeHtml(subject)}</p>
                <p><strong>Message:</strong></p>
                <p>${escapeHtml(excerpt).replace(/\n/g, "<br>")}</p>
                <p>The reply has also been noted in the private candidate administration record.</p>
                <p><strong>Reply:</strong> Use your email client's Reply button to respond directly to ${escapeHtml(candidate.email || from)}.</p>
              `,
              text: `Candidate: ${candidate.name}\nFrom: ${from}\nSubject: ${subject}\n\n${excerpt}\n\nReply to this notification to respond directly to ${candidate.email || from}.`,
            });
          }
        } catch (mailError) {
          console.error("Candidate reply stored but admin notification failed", mailError);
        }

        return Response.json({ ok: true, matched: true });
      },
    },
  },
});
