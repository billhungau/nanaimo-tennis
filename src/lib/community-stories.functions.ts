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
    return { success: true };
  });