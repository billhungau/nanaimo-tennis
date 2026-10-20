-- Private Google Group outreach CRM. Run in the site's Supabase SQL editor before enabling UI.
create table if not exists public.group_contacts (
  id uuid primary key default gen_random_uuid(),
  email text not null,
  name text,
  invitation_date timestamptz,
  invitation_status text not null default 'pending' check (invitation_status in ('pending','joined','expired','unknown')),
  membership_status text not null default 'unverified' check (membership_status in ('unverified','joined','not_member')),
  membership_verified_at timestamptz,
  reply_status text not null default 'none' check (reply_status in ('none','replied')),
  replied_at timestamptz,
  suppressed boolean not null default false,
  notes text,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  constraint group_contacts_email_normalized check (email = lower(btrim(email))),
  constraint group_contacts_email_unique unique (email)
);
create table if not exists public.group_outreach_events (
  id uuid primary key default gen_random_uuid(),
  contact_id uuid not null references public.group_contacts(id) on delete cascade,
  event_type text not null check (event_type in ('sent','delivered','bounced','failed','replied','joined','imported','suppressed')),
  provider_id text,
  note text,
  occurred_at timestamptz not null default now(),
  unique (provider_id,event_type)
);
create index if not exists group_outreach_events_contact_idx on public.group_outreach_events(contact_id, occurred_at desc);
alter table public.group_contacts enable row level security;
alter table public.group_outreach_events enable row level security;
-- Admin access is allowed ONLY to the same explicitly authorized Supabase identity as the existing candidate admin.
drop policy if exists group_contacts_admin on public.group_contacts;
create policy group_contacts_admin on public.group_contacts for all to authenticated
 using (auth.uid() = '05c2f47c-b22d-4d0d-8d14-9c03c33a4472'::uuid)
 with check (auth.uid() = '05c2f47c-b22d-4d0d-8d14-9c03c33a4472'::uuid);
drop policy if exists group_events_admin on public.group_outreach_events;
create policy group_events_admin on public.group_outreach_events for all to authenticated
 using (auth.uid() = '05c2f47c-b22d-4d0d-8d14-9c03c33a4472'::uuid)
 with check (auth.uid() = '05c2f47c-b22d-4d0d-8d14-9c03c33a4472'::uuid);
