create table if not exists public.mailing_list_subscribers (
  id uuid primary key default gen_random_uuid(),
  name text,
  email text not null unique,
  status text not null default 'active' check (status in ('active', 'unsubscribed')),
  source text not null default 'homepage',
  consented_at timestamptz not null default now(),
  unsubscribed_at timestamptz,
  unsubscribe_token uuid not null unique default gen_random_uuid(),
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

alter table public.mailing_list_subscribers enable row level security;

create index if not exists mailing_list_subscribers_status_idx
  on public.mailing_list_subscribers (status);

create or replace function public.set_mailing_list_updated_at()
returns trigger
language plpgsql
security invoker
set search_path = public
as $$
begin
  new.updated_at = now();
  return new;
end;
$$;

drop trigger if exists mailing_list_subscribers_updated_at on public.mailing_list_subscribers;
create trigger mailing_list_subscribers_updated_at
before update on public.mailing_list_subscribers
for each row execute function public.set_mailing_list_updated_at();
