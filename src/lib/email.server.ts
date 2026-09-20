import { createHmac, timingSafeEqual } from "node:crypto";

type SendEmailInput = {
  to: string | string[];
  subject: string;
  html: string;
  text?: string;
  replyTo?: string;
  idempotencyKey?: string;
};

export function escapeHtml(value: string) {
  return value.replace(/[&<>'"]/g, (char) => ({
    "&": "&amp;",
    "<": "&lt;",
    ">": "&gt;",
    "'": "&#39;",
    '"': "&quot;",
  })[char] ?? char);
}

export function getEmailConfig() {
  const apiKey = process.env["RESEND_API_KEY"];
  const from = process.env["RESEND_FROM_EMAIL"];
  const adminEmail = process.env["ADMIN_EMAIL"];
  const replyDomain = process.env["CANDIDATE_REPLY_DOMAIN"] || "reply.nanaimotennis.ca";
  const siteUrl = process.env["PUBLIC_SITE_URL"] || "https://www.nanaimotennis.ca";

  if (!apiKey) throw new Error("RESEND_API_KEY is not configured");
  if (!from) throw new Error("RESEND_FROM_EMAIL is not configured");

  return { apiKey, from, adminEmail, replyDomain, siteUrl };
}

export async function sendResendEmail(input: SendEmailInput) {
  const { apiKey, from } = getEmailConfig();
  const response = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${apiKey}`,
      "Content-Type": "application/json",
      ...(input.idempotencyKey ? { "Idempotency-Key": input.idempotencyKey } : {}),
    },
    body: JSON.stringify({
      from,
      to: Array.isArray(input.to) ? input.to : [input.to],
      subject: input.subject,
      html: input.html,
      ...(input.text ? { text: input.text } : {}),
      ...(input.replyTo ? { reply_to: input.replyTo } : {}),
    }),
  });

  const body = await response.json().catch(() => ({})) as { id?: string; message?: string; name?: string };
  if (!response.ok || !body.id) {
    throw new Error(body.message || body.name || `Resend returned ${response.status}`);
  }
  return body.id;
}

export async function getReceivedEmail(emailId: string) {
  const { apiKey } = getEmailConfig();
  const response = await fetch(`https://api.resend.com/emails/receiving/${encodeURIComponent(emailId)}`, {
    headers: { Authorization: `Bearer ${apiKey}` },
  });
  if (!response.ok) return null;
  return response.json() as Promise<{
    id?: string;
    from?: string;
    to?: string[];
    subject?: string;
    text?: string | null;
    html?: string | null;
    message_id?: string | null;
  }>;
}

export function verifyResendWebhook(payload: string, headers: Headers) {
  const secret = process.env["RESEND_WEBHOOK_SECRET"];
  const id = headers.get("svix-id");
  const timestamp = headers.get("svix-timestamp");
  const signature = headers.get("svix-signature");
  if (!secret || !id || !timestamp || !signature) return false;

  const ts = Number(timestamp);
  if (!Number.isFinite(ts) || Math.abs(Date.now() / 1000 - ts) > 5 * 60) return false;

  try {
    const encodedSecret = secret.startsWith("whsec_") ? secret.slice(6) : secret;
    const key = Buffer.from(encodedSecret, "base64");
    const signed = `${id}.${timestamp}.${payload}`;
    const expected = createHmac("sha256", key).update(signed).digest("base64");

    return signature.split(" ").some((part) => {
      const [version, value] = part.split(",", 2);
      if (version !== "v1" || !value) return false;
      const a = Buffer.from(expected);
      const b = Buffer.from(value);
      return a.length === b.length && timingSafeEqual(a, b);
    });
  } catch {
    return false;
  }
}
