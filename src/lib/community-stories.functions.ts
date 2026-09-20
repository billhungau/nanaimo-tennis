import { createServerFn } from "@tanstack/react-start";
import { z } from "zod";

const storySchema = z.object({
  name: z.string().trim().min(1).max(100),
  email: z.string().trim().email().max(255),
  relationship: z.string().trim().min(1).max(160),
  story: z.string().trim().min(20).max(5000),
  consentToPublish: z.boolean(),
});

export const submitCommunityStory = createServerFn({ method: "POST" })
  .inputValidator((data) => storySchema.parse(data))
  .handler(async ({ data }) => {
    const { supabaseAdmin } = await import("@/integrations/supabase/client.server");
    const { error } = await supabaseAdmin.from("community_stories").insert({
      name: data.name,
      email: data.email,
      relationship: data.relationship,
      story: data.story,
      consent_to_publish: data.consentToPublish,
      review_status: "pending",
    });
    if (error) throw new Error("Submission could not be saved");

    try {
      const { escapeHtml, getEmailConfig, sendResendEmail } = await import("@/lib/email.server");
      const { adminEmail } = getEmailConfig();
      if (adminEmail) {
        await sendResendEmail({
          to: adminEmail,
          subject: `[Nanaimo Tennis] New community story from ${data.name}`,
          replyTo: data.email,
          html: `
            <h2>New community story submission</h2>
            <p><strong>Name:</strong> ${escapeHtml(data.name)}</p>
            <p><strong>Email:</strong> ${escapeHtml(data.email)}</p>
            <p><strong>Connection:</strong> ${escapeHtml(data.relationship)}</p>
            <p><strong>Consent to consider for publication:</strong> ${data.consentToPublish ? "Yes" : "No"}</p>
            <p><strong>Story:</strong></p>
            <p>${escapeHtml(data.story).replace(/\n/g, "<br>")}</p>
          `,
          text: `Name: ${data.name}\nEmail: ${data.email}\nConnection: ${data.relationship}\nConsent to consider for publication: ${data.consentToPublish ? "Yes" : "No"}\n\n${data.story}`,
        });
      }
    } catch (mailError) {
      // The submission is already safely stored; an email outage should not make the user resubmit.
      console.error("Community story saved but admin email notification failed", mailError);
    }

    return { success: true };
  });
