import { createFileRoute } from "@tanstack/react-router";
import { z } from "zod";

const contactSchema = z.object({
  name: z.string().trim().min(1).max(100),
  email: z.string().trim().email().max(255),
  subject: z.string().trim().min(1).max(160),
  message: z.string().trim().min(10).max(5000),
  website: z.string().max(0).optional(),
});

export const Route = createFileRoute("/api/contact")({
  server: {
    handlers: {
      POST: async ({ request }) => {
        let payload: unknown;
        try {
          payload = await request.json();
        } catch {
          return Response.json({ ok: false, error: "Invalid request" }, { status: 400 });
        }

        const parsed = contactSchema.safeParse(payload);
        if (!parsed.success) {
          return Response.json({ ok: false, error: "Please check the form fields and try again." }, { status: 400 });
        }

        const data = parsed.data;
        try {
          const { escapeHtml, getEmailConfig, sendResendEmail } = await import("@/lib/email.server");
          const { adminEmail } = getEmailConfig();
          if (!adminEmail) throw new Error("ADMIN_EMAIL is not configured");

          await sendResendEmail({
            to: adminEmail,
            subject: `[Nanaimo Tennis] ${data.subject}`,
            html: `
              <h2>New Nanaimo Tennis contact message</h2>
              <p><strong>Name:</strong> ${escapeHtml(data.name)}</p>
              <p><strong>Email:</strong> ${escapeHtml(data.email)}</p>
              <p><strong>Subject:</strong> ${escapeHtml(data.subject)}</p>
              <p><strong>Message:</strong></p>
              <p>${escapeHtml(data.message).replace(/\n/g, "<br>")}</p>
            `,
            text: `Name: ${data.name}\nEmail: ${data.email}\nSubject: ${data.subject}\n\n${data.message}`,
            replyTo: data.email,
          });

          return Response.json({ ok: true });
        } catch (error) {
          console.error("Contact email failed", error);
          return Response.json({ ok: false, error: "Your message could not be sent. Please try again." }, { status: 500 });
        }
      },
    },
  },
});
