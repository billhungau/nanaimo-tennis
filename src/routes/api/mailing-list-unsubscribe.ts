import { createFileRoute } from "@tanstack/react-router";
import { z } from "zod";

const unsubscribeSchema = z.object({ token: z.string().uuid() });

export const Route = createFileRoute("/api/mailing-list-unsubscribe")({
  server: {
    handlers: {
      POST: async ({ request }) => {
        let data: z.infer<typeof unsubscribeSchema>;
        try {
          data = unsubscribeSchema.parse(await request.json());
        } catch {
          return Response.json({ error: "Invalid unsubscribe link" }, { status: 400 });
        }

        const { supabaseAdmin } = await import("@/integrations/supabase/client.server");
        const db = supabaseAdmin as any;
        const { data: subscriber, error: lookupError } = await db
          .from("mailing_list_subscribers")
          .select("id,status")
          .eq("unsubscribe_token", data.token)
          .maybeSingle();

        if (lookupError) {
          console.error("Mailing list unsubscribe lookup failed", lookupError);
          return Response.json({ error: "Unsubscribe request failed" }, { status: 500 });
        }

        if (!subscriber) return Response.json({ error: "Invalid unsubscribe link" }, { status: 404 });
        if (subscriber.status === "unsubscribed") return Response.json({ success: true });

        const { error: updateError } = await db
          .from("mailing_list_subscribers")
          .update({ status: "unsubscribed", unsubscribed_at: new Date().toISOString() })
          .eq("id", subscriber.id);

        if (updateError) {
          console.error("Mailing list unsubscribe update failed", updateError);
          return Response.json({ error: "Unsubscribe request failed" }, { status: 500 });
        }

        return Response.json({ success: true });
      },
    },
  },
});
