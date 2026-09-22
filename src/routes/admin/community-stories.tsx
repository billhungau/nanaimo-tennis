import { createFileRoute, Link } from "@tanstack/react-router";
import { useEffect, useMemo, useState, type FormEvent } from "react";
import { CheckCircle2, Mail, Search, XCircle } from "lucide-react";
import type { Session } from "@supabase/supabase-js";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { supabase } from "@/lib/supabase";

const ADMIN_USER_ID = "05c2f47c-b22d-4d0d-8d14-9c03c33a4472";

type ReviewStatus = "pending" | "approved" | "rejected";

type StoryRow = {
  id?: string;
  name: string;
  email: string;
  relationship: string;
  story: string;
  consent_to_publish: boolean;
  review_status: ReviewStatus | string;
  created_at?: string | null;
};

type StatusFilter = "all" | ReviewStatus;

export const Route = createFileRoute("/admin/community-stories")({
  head: () => ({
    meta: [
      { title: "Community Stories Admin | Nanaimo Tennis" },
      { name: "robots", content: "noindex,nofollow" },
    ],
  }),
  component: CommunityStoriesAdminPage,
});

function formatDate(value?: string | null) {
  if (!value) return "Date not recorded";
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return value;
  return date.toLocaleString();
}

function CommunityStoriesAdminPage() {
  const [session, setSession] = useState<Session | null>(null);
  const [authReady, setAuthReady] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [authError, setAuthError] = useState("");
  const [stories, setStories] = useState<StoryRow[]>([]);
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);
  const [query, setQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState<StatusFilter>("pending");
  const [loading, setLoading] = useState(false);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState("");

  const isAdmin = session?.user.id === ADMIN_USER_ID;

  useEffect(() => {
    supabase.auth.getSession().then(({ data }) => {
      setSession(data.session);
      setAuthReady(true);
    });
    const { data: listener } = supabase.auth.onAuthStateChange((_event, nextSession) => {
      setSession(nextSession);
      setAuthReady(true);
    });
    return () => listener.subscription.unsubscribe();
  }, []);

  useEffect(() => {
    if (isAdmin) void loadStories();
  }, [isAdmin]);

  async function loadStories() {
    setLoading(true);
    setMessage("");

    const { data, error } = await supabase
      .from("community_stories")
      .select("*");

    if (error) {
      setMessage(`Unable to load submissions: ${error.message}`);
      setStories([]);
      setSelectedIndex(null);
      setLoading(false);
      return;
    }

    const rows = ((data ?? []) as StoryRow[]).sort((a, b) => {
      const aTime = a.created_at ? new Date(a.created_at).getTime() : 0;
      const bTime = b.created_at ? new Date(b.created_at).getTime() : 0;
      return bTime - aTime;
    });

    setStories(rows);
    setSelectedIndex(rows.length ? 0 : null);
    setLoading(false);
  }

  async function signIn(event: FormEvent) {
    event.preventDefault();
    setAuthError("");
    const { error } = await supabase.auth.signInWithPassword({ email, password });
    if (error) setAuthError(error.message);
  }

  async function signOut() {
    await supabase.auth.signOut();
    setStories([]);
    setSelectedIndex(null);
  }

  async function setReviewStatus(status: ReviewStatus) {
    const story = selectedIndex === null ? null : stories[selectedIndex];
    if (!story) return;
    if (!story.id) {
      setMessage("This submission does not expose an ID, so its review status cannot be updated from the admin page.");
      return;
    }

    setSaving(true);
    setMessage("");
    const { error } = await supabase
      .from("community_stories")
      .update({ review_status: status })
      .eq("id", story.id);

    if (error) {
      setMessage(`Update failed: ${error.message}`);
      setSaving(false);
      return;
    }

    const next = stories.map((item, index) => index === selectedIndex ? { ...item, review_status: status } : item);
    setStories(next);
    setMessage(`Marked ${status}.`);
    setSaving(false);
  }

  const filtered = useMemo(() => {
    const term = query.trim().toLowerCase();
    return stories
      .map((story, index) => ({ story, index }))
      .filter(({ story }) => {
        const matchesStatus = statusFilter === "all" || story.review_status === statusFilter;
        const haystack = `${story.name} ${story.email} ${story.relationship} ${story.story}`.toLowerCase();
        return matchesStatus && (!term || haystack.includes(term));
      });
  }, [stories, query, statusFilter]);

  const selected = selectedIndex === null ? null : stories[selectedIndex] ?? null;
  const counts = useMemo(() => ({
    all: stories.length,
    pending: stories.filter((story) => story.review_status === "pending").length,
    approved: stories.filter((story) => story.review_status === "approved").length,
    rejected: stories.filter((story) => story.review_status === "rejected").length,
  }), [stories]);

  if (!authReady) return <div className="page-wrap py-16 text-sm text-muted-foreground">Checking administrator session…</div>;

  if (!session) {
    return <section className="py-16 sm:py-24">
      <div className="page-wrap max-w-md">
        <p className="eyebrow">Private administration</p>
        <h1 className="mt-3 font-serif text-4xl">Community stories</h1>
        <p className="mt-4 text-sm leading-6 text-muted-foreground">Sign in with the Supabase account authorized to review community submissions.</p>
        <form className="mt-8 space-y-4" onSubmit={signIn}>
          <div><label className="mb-2 block text-sm font-medium" htmlFor="admin-email">Email</label><Input id="admin-email" type="email" value={email} onChange={(event) => setEmail(event.target.value)} required /></div>
          <div><label className="mb-2 block text-sm font-medium" htmlFor="admin-password">Password</label><Input id="admin-password" type="password" value={password} onChange={(event) => setPassword(event.target.value)} required /></div>
          {authError && <p className="text-sm text-destructive">{authError}</p>}
          <Button type="submit">Sign in</Button>
        </form>
      </div>
    </section>;
  }

  if (!isAdmin) {
    return <section className="py-16 sm:py-24"><div className="page-wrap max-w-xl"><p className="eyebrow">Private administration</p><h1 className="mt-3 font-serif text-4xl">Access not authorized</h1><p className="mt-4 text-sm leading-6 text-muted-foreground">This authenticated account is not authorized to review community submissions.</p><Button className="mt-6" variant="outline" onClick={signOut}>Sign out</Button></div></section>;
  }

  return <section className="py-12 sm:py-16">
    <div className="page-wrap">
      <div className="flex flex-col gap-4 border-b border-border pb-6 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <p className="eyebrow">Private administration</p>
          <h1 className="mt-2 font-serif text-4xl">Community stories</h1>
          <p className="mt-2 text-sm text-muted-foreground">Review submissions from the Get Involved page. Nothing is published automatically.</p>
        </div>
        <div className="flex flex-wrap gap-2"><Button asChild variant="outline"><Link to="/admin/candidates">Candidate admin</Link></Button><Button variant="outline" onClick={signOut}>Sign out</Button></div>
      </div>

      <div className="mt-6 grid grid-cols-2 gap-2 sm:grid-cols-4">
        {(["all", "pending", "approved", "rejected"] as StatusFilter[]).map((status) => <button key={status} type="button" onClick={() => setStatusFilter(status)} className={`border px-4 py-3 text-left ${statusFilter === status ? "border-primary bg-primary/5" : "border-border bg-card hover:bg-secondary/40"}`}>
          <span className="block text-xs font-bold uppercase tracking-wide text-muted-foreground">{status}</span>
          <span className="mt-1 block font-serif text-2xl">{counts[status]}</span>
        </button>)}
      </div>

      <div className="mt-8 grid gap-8 lg:grid-cols-[22rem_1fr]">
        <aside>
          <div className="relative"><Search className="absolute left-3 top-3 size-4 text-muted-foreground"/><Input value={query} onChange={(event) => setQuery(event.target.value)} placeholder="Search name, email or story" className="pl-10"/></div>
          <div className="mt-3 max-h-[72vh] overflow-y-auto border border-border bg-card">
            {loading && <p className="p-4 text-sm text-muted-foreground">Loading…</p>}
            {!loading && filtered.length === 0 && <p className="p-4 text-sm text-muted-foreground">No submissions match this view.</p>}
            {!loading && filtered.map(({ story, index }) => <button key={story.id ?? `${story.email}-${index}`} type="button" onClick={() => { setSelectedIndex(index); setMessage(""); }} className={`block w-full border-b border-border px-4 py-4 text-left last:border-0 ${selectedIndex === index ? "bg-secondary" : "hover:bg-secondary/60"}`}>
              <div className="flex items-start justify-between gap-3"><span className="font-medium">{story.name}</span><span className={`shrink-0 rounded-sm border px-2 py-0.5 text-[10px] font-medium ${story.review_status === "approved" ? "border-primary/30 bg-primary/10" : story.review_status === "rejected" ? "border-border bg-secondary text-muted-foreground" : "border-amber-300 bg-amber-50 text-amber-900"}`}>{story.review_status || "pending"}</span></div>
              <span className="mt-1 block truncate text-xs text-muted-foreground">{story.email}</span>
              <span className="mt-1 block truncate text-xs text-muted-foreground">{story.relationship}</span>
              <span className="mt-2 block text-xs text-muted-foreground">{formatDate(story.created_at)}</span>
            </button>)}
          </div>
        </aside>

        <main>
          {!selected ? <div className="border border-border bg-card p-8 text-sm text-muted-foreground">Select a submission to review.</div> : <div className="border border-border bg-card p-5 sm:p-8">
            <div className="flex flex-col gap-4 border-b border-border pb-6 sm:flex-row sm:items-start sm:justify-between">
              <div>
                <div className="flex flex-wrap items-center gap-2"><h2 className="font-serif text-2xl">{selected.name}</h2>{selected.consent_to_publish ? <span className="rounded-sm border border-primary/30 bg-primary/10 px-2 py-1 text-xs font-medium">Consent to publish</span> : <span className="rounded-sm border border-border bg-secondary px-2 py-1 text-xs font-medium text-muted-foreground">No publication consent</span>}</div>
                <p className="mt-2 text-sm text-muted-foreground">{selected.relationship}</p>
                <p className="mt-1 text-xs text-muted-foreground">Submitted {formatDate(selected.created_at)}</p>
              </div>
              <a href={`mailto:${selected.email}`} className="inline-flex h-10 items-center gap-2 rounded-md border border-input bg-background px-4 text-sm font-medium hover:bg-accent hover:text-accent-foreground"><Mail className="size-4"/>Email submitter</a>
            </div>

            <section className="mt-6">
              <p className="text-xs font-bold uppercase tracking-[.14em] text-muted-foreground">Community experience</p>
              <div className="mt-3 max-w-3xl whitespace-pre-wrap text-[15px] leading-7">{selected.story}</div>
            </section>

            <section className="mt-8 border-t border-border pt-6">
              <div className="flex flex-wrap items-center gap-2">
                <Button onClick={() => setReviewStatus("approved")} disabled={saving} variant={selected.review_status === "approved" ? "default" : "outline"}><CheckCircle2 className="size-4"/>Approve</Button>
                <Button onClick={() => setReviewStatus("rejected")} disabled={saving} variant="outline"><XCircle className="size-4"/>Reject</Button>
                <Button onClick={() => setReviewStatus("pending")} disabled={saving} variant="ghost">Return to pending</Button>
              </div>
              <p className="mt-3 text-xs leading-5 text-muted-foreground">Review status is for internal administration only. Approval here does not automatically publish the submission on the public website.</p>
              {message && <p className="mt-3 text-sm font-medium">{message}</p>}
            </section>
          </div>}
        </main>
      </div>
    </div>
  </section>;
}
