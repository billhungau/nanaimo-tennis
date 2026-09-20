import { createFileRoute } from "@tanstack/react-router";
import { z } from "zod";

const subscribeSchema = z.object({
  name: z.string().trim().max(100).optional().default(""),
  email: z.string().trim().email().max(255),
  consent: z.literal(true),
  source: z.enum(["homepage", "get-involved"]).default("homepage"),
});

export const Route = createFileRoute("/api/mailing-list")({
  server: {
    handlers: {
      POST: async ({ request }) => {
        let data: z.infer<typeof subscribeSchema>;
        try {
          data = subscribeSchema.parse(await request.json());
        } catch {
          return Response.json({ error: "Invalid subscription" }, { status: 400 });
        }

        const email = data.email.toLowerCase();
        const now = new Date().toISOString();
        const unsubscribeToken = crypto.randomUUID();
        const { supabaseAdmin } = await import("@/integrations/supabase/client.server");
        const db = supabaseAdmin as any;

        const { data: existing, error: lookupError } = await db
          .from("mailing_list_subscribers")
          .select("id,status,unsubscribe_token")
          .eq("email", email)
          .maybeSingle();

        if (lookupError) {
          console.error("Mailing list lookup failed", lookupError);
          return Response.json({ error: "Subscription could not be saved" }, { status: 500 });
        }

        let token = unsubscribeToken;
        let shouldSendWelcome = true;

        if (existing) {
          token = existing.unsubscribe_token || unsubscribeToken;
          shouldSendWelcome = existing.status !== "active";
          const { error: updateError } = await db
            .from("mailing_list_subscribers")
            .update({
              name: data.name || null,
              status: "active",
              consented_at: now,
              unsubscribed_at: null,
              source: data.source,
              unsubscribe_token: token,
            })
            .eq("id", existing.id);

          if (updateError) {
            console.error("Mailing list update failed", updateError);
            return Response.json({ error: "Subscription could not be saved" }, { status: 500 });
          }
        } else {
          const { error: insertError } = await db.from("mailing_list_subscribers").insert({
            name: data.name || null,
            email,
            status: "active",
            consented_at: now,
            source: data.source,
            unsubscribe_token: token,
          });

          if (insertError) {
            console.error("Mailing list insert failed", insertError);
            return Response.json({ error: "Subscription could not be saved" }, { status: 500 });
          }
        }

        if (shouldSendWelcome) {
          try {
            const { escapeHtml, getEmailConfig, sendResendEmail } = await import("@/lib/email.server");
            const { siteUrl } = getEmailConfig();
            const unsubscribeUrl = `${siteUrl}/unsubscribe?token=${encodeURIComponent(token)}`;
            const greeting = data.name ? `Hi ${escapeHtml(data.name)},` : "Hello,";

            await sendResendEmail({
              to: email,
              subject: "You're subscribed to Nanaimo Tennis updates",
              html: `
                <p>${greeting}</p>
                <p>Thanks for joining the Nanaimo Tennis mailing list. We'll send occasional updates about indoor tennis, community events and ways to participate in Nanaimo.</p>
                <p>You can unsubscribe at any time using the link below.</p>
                <p><a href="${unsubscribeUrl}">Unsubscribe from Nanaimo Tennis updates</a></p>
                <p style="color:#666;font-size:12px">Nanaimo Tennis · Nanaimo, BC · You subscribed at nanaimotennis.ca.</p>
              `,
              text: `${data.name ? `Hi ${data.name},` : "Hello,"}\n\nThanks for joining the Nanaimo Tennis mailing list. We'll send occasional updates about indoor tennis, community events and ways to participate in Nanaimo.\n\nUnsubscribe: ${unsubscribeUrl}\n\nNanaimo Tennis · Nanaimo, BC · You subscribed at nanaimotennis.ca.`,
            });
          } catch (mailError) {
            console.error("Mailing list subscription saved but welcome email failed", mailError);
          }
        }

        return Response.json({ success: true });
      },
    },
  },
});
