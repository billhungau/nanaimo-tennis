# Resend email setup

The site uses Resend for three flows:

1. Public `/contact` form → administrator email.
2. `/get-involved` community story → saved to Supabase, then administrator notification email.
3. Candidate outreach → standardized questionnaire sent from `/admin/email`; replies return through a Resend inbound subdomain and are noted in the private candidate record.

## Environment variables

Set these in the production hosting environment:

```text
RESEND_API_KEY=re_...
RESEND_FROM_EMAIL=Nanaimo Tennis <hello@nanaimotennis.ca>
ADMIN_EMAIL=your-admin-inbox@example.com
CANDIDATE_REPLY_DOMAIN=reply.nanaimotennis.ca
RESEND_WEBHOOK_SECRET=whsec_...
PUBLIC_SITE_URL=https://www.nanaimotennis.ca
```

Keep all values except `PUBLIC_SITE_URL` server-only. Do not prefix the Resend key or webhook secret with `VITE_`.

## Sending domain

In Resend, add and verify `nanaimotennis.ca` for outbound sending. Add the DNS records Resend provides in Cloudflare. If Cloudflare offers proxying for any mail-related record, keep it **DNS only**.

Use an address on the verified domain in `RESEND_FROM_EMAIL`, for example `Nanaimo Tennis <hello@nanaimotennis.ca>`.

## Candidate replies / inbound email

Use a subdomain such as `reply.nanaimotennis.ca` for inbound mail. This avoids changing the root domain's MX records and leaves future normal mailbox hosting independent of Resend.

In Resend, configure inbound email for `reply.nanaimotennis.ca` and add the MX record(s) Resend supplies to Cloudflare.

Candidate questionnaires use a unique Reply-To address:

```text
candidate-<candidate UUID>@reply.nanaimotennis.ca
```

The candidate UUID lets the webhook associate a reply with the correct candidate, including candidates who share campaign email addresses.

## Webhook

Create a Resend webhook for the `email.received` event:

```text
https://www.nanaimotennis.ca/api/resend-webhook
```

Copy the webhook signing secret into `RESEND_WEBHOOK_SECRET`.

The endpoint verifies the Svix/Resend signature, reads the received email through the Resend API, appends a private note to the candidate record, and sends the administrator a notification.

Inbound replies are **not** automatically published and do not automatically mark a candidate's questionnaire as complete. An administrator reviews the message and enters the candidate's answers before publication.

## Candidate outreach screen

Open:

```text
https://www.nanaimotennis.ca/admin/email
```

The page uses the existing Supabase administrator login. It shows whether the questionnaire has previously been sent and whether a reply has been received, based on the private candidate record.
