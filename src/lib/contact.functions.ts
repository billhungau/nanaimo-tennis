import { createServerFn } from "@tanstack/react-start";
import { z } from "zod";

const contactSchema = z.object({
  name: z.string().trim().min(1).max(100),
  email: z.string().trim().email().max(255),
  subject: z.string().trim().min(1).max(160),
  message: z.string().trim().min(10).max(5000),
  website: z.string().max(0).optional(),
});

export const sendContactMessage = createServerFn({ method: "POST" })
  .inputValidator((data) => contactSchema.parse(data))
  .handler(async ({ data }) => {
    const { escapeHtml, getEmailConfig, sendResendEmail } = await import("@/lib/email.server");
    const { adminEmail } = getEmailConfig();
    if (!adminEmail) throw new Error("ADMIN_EMAIL is not configured");

    const html = `
      <h2>New Nanaimo Tennis contact message</h2>
      <p><strong>Name:</strong> ${escapeHtml(data.name)}</p>
      <p><strong>Email:</strong> ${escapeHtml(data.email)}</p>
      <p><strong>Subject:</strong> ${escapeHtml(data.subject)}</p>
      <p><strong>Message:</strong></p>
      <p>${escapeHtml(data.message).replace(/\n/g, "<br>")}</p>
    `;

    await sendResendEmail({
      to: adminEmail,
      subject: `[Nanaimo Tennis] ${data.subject}`,
      html,
      text: `Name: ${data.name}\nEmail: ${data.email}\nSubject: ${data.subject}\n\n${data.message}`,
      replyTo: data.email,
    });

    return { success: true };
  });
