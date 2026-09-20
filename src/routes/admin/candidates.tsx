import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useMemo, useState, type FormEvent } from "react";
import { Search } from "lucide-react";
import type { Session } from "@supabase/supabase-js";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { candidateQuestions } from "@/lib/civic-data";
import { supabase } from "@/lib/supabase";

const ADMIN_USER_ID = "05c2f47c-b22d-4d0d-8d14-9c03c33a4472";

const contactTypes = [
  ["", "Not specified"],
  ["campaign", "Campaign"],
  ["official_city", "Official City"],
  ["professional", "Professional/public"],
  ["shared_campaign", "Shared campaign/slate"],
  ["other_public", "Other public"],
] as const;

type CandidateRow = {
  id: string;
  name: string;
  office: "Mayor" | "Council";
  email: string | null;
  contact_type: string | null;
  contact_source: string | null;
  response_status: "received" | "not_received";
  response_date: string | null;
  q1_response: string | null;
  q2_response: string | null;
  q3_response: string | null;
  response_source: string | null;
  internal_notes: string | null;
  last_updated: string;
};

type CandidateDraft = Omit<CandidateRow, "last_updated">;

export const Route = createFileRoute("/admin/candidates")({
  head: () => ({
    meta: [
      { title: "Candidate Admin | Nanaimo Tennis" },
      { name: "robots", content: "noindex,nofollow" },
    ],
  }),
  component: CandidateAdminPage,
});

function CandidateAdminPage() {
  const [session, setSession] = useState<Session | null>(null);
  const [authReady, setAuthReady] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [authError, setAuthError] = useState("");
  const [candidates, setCandidates] = useState<CandidateRow[]>([]);
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [draft, setDraft] = useState<CandidateDraft | null>(null);
  const [query, setQuery] = useState("");
  const [loading, setLoading] = useState(false);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState("");

  const isAdmin = session?.user.id === ADMIN_USER_ID;

  useEffect(() => {
    if (!supabase) {
      setAuthReady(true);
      return;
    }

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
    if (!isAdmin) return;
    void loadCandidates();
  }, [isAdmin]);

  async function loadCandidates() {
    if (!supabase) return;
    setLoading(true);
    setMessage("");

    const { data, error } = await supabase
      .from("candidates")
      .select("id,name,office,email,contact_type,contact_source,response_status,response_date,q1_response,q2_response,q3_response,response_source,internal_notes,last_updated")
      .order("name", { ascending: true });

    if (error) {
      setMessage(`Unable to load candidates: ${error.message}`);
      setLoading(false);
      return;
    }

    const rows = (data ?? []) as CandidateRow[];
    setCandidates(rows);
    if (rows.length && !selectedId) selectCandidate(rows[0]);
    setLoading(false);
  }

  function selectCandidate(candidate: CandidateRow) {
    setSelectedId(candidate.id);
    setDraft({
      id: candidate.id,
      name: candidate.name,
      office: candidate.office,
      email: candidate.email,
      contact_type: candidate.contact_type,
      contact_source: candidate.contact_source,
      response_status: candidate.response_status,
      response_date: candidate.response_date,
      q1_response: candidate.q1_response,
      q2_response: candidate.q2_response,
      q3_response: candidate.q3_response,
      response_source: candidate.response_source,
      internal_notes: candidate.internal_notes,
    });
    setMessage("");
  }

  async function signIn(event: FormEvent) {
    event.preventDefault();
    if (!supabase) return;
    setAuthError("");

    const { error } = await supabase.auth.signInWithPassword({ email, password });
    if (error) setAuthError(error.message);
  }

  async function signOut() {
    if (!supabase) return;
    await supabase.auth.signOut();
    setCandidates([]);
    setSelectedId(null);
    setDraft(null);
  }

  async function saveCandidate() {
    if (!supabase || !draft) return;
    setSaving(true);
    setMessage("");

    const payload = {
      email: draft.email?.trim() || null,
      contact_type: draft.contact_type || null,
      contact_source: draft.contact_source?.trim() || null,
      response_status: draft.response_status,
      response_date: draft.response_status === "received" ? draft.response_date || null : null,
      q1_response: draft.response_status === "received" ? draft.q1_response || null : null,
      q2_response: draft.response_status === "received" ? draft.q2_response || null : null,
      q3_response: draft.response_status === "received" ? draft.q3_response || null : null,
      response_source: draft.response_status === "received" ? draft.response_source || null : null,
      internal_notes: draft.internal_notes || null,
    };

    const { error } = await supabase.from("candidates").update(payload).eq("id", draft.id);

    if (error) {
      setMessage(`Save failed: ${error.message}`);
      setSaving(false);
      return;
    }

    setMessage("Saved.");
    await loadCandidates();
    setSaving(false);
  }

  function markNoResponse() {
    if (!draft) return;
    setDraft({
      ...draft,
      response_status: "not_received",
      response_date: null,
      q1_response: null,
      q2_response: null,
      q3_response: null,
      response_source: null,
    });
    setMessage("Marked as no response in the form. Click Save to apply.");
  }

  const filtered = useMemo(() => {
    const term = query.trim().toLowerCase();
    return candidates.filter((candidate) => {
      if (!term) return true;
      return candidate.name.toLowerCase().includes(term) || (candidate.email ?? "").toLowerCase().includes(term);
    });
  }, [candidates, query]);

  if (!supabase) {
    return <div className="page-wrap py-16"><h1 className="font-serif text-3xl">Candidate admin</h1><p className="mt-4 text-sm text-muted-foreground">Supabase is not configured.</p></div>;
  }

  if (!authReady) {
    return <div className="page-wrap py-16 text-sm text-muted-foreground">Checking administrator session…</div>;
  }

  if (!session) {
    return <section className="py-16 sm:py-24">
      <div className="page-wrap max-w-md">
        <p className="eyebrow">Private administration</p>
        <h1 className="mt-3 font-serif text-4xl">Candidate responses</h1>
        <p className="mt-4 text-sm leading-6 text-muted-foreground">Sign in with the Supabase account authorized to manage candidate responses.</p>
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
    return <section className="py-16 sm:py-24"><div className="page-wrap max-w-xl"><p className="eyebrow">Private administration</p><h1 className="mt-3 font-serif text-4xl">Access not authorized</h1><p className="mt-4 text-sm leading-6 text-muted-foreground">This authenticated account is not authorized to manage candidate responses.</p><Button className="mt-6" variant="outline" onClick={signOut}>Sign out</Button></div></section>;
  }

  return <section className="py-12 sm:py-16">
    <div className="page-wrap">
      <div className="flex flex-col gap-4 border-b border-border pb-6 sm:flex-row sm:items-end sm:justify-between">
        <div><p className="eyebrow">Private administration</p><h1 className="mt-2 font-serif text-4xl">Candidate responses</h1><p className="mt-2 text-sm text-muted-foreground">Manage candidate contact details, response status and published answers.</p></div>
        <Button variant="outline" onClick={signOut}>Sign out</Button>
      </div>

      <div className="mt-8 grid gap-8 lg:grid-cols-[19rem_1fr]">
        <aside>
          <div className="relative"><Search className="absolute left-3 top-3 size-4 text-muted-foreground"/><Input value={query} onChange={(event) => setQuery(event.target.value)} placeholder="Search name or email" className="pl-10"/></div>
          <div className="mt-3 max-h-[70vh] overflow-y-auto border border-border bg-card">
            {loading && <p className="p-4 text-sm text-muted-foreground">Loading…</p>}
            {!loading && filtered.map((candidate) => <button key={candidate.id} type="button" onClick={() => selectCandidate(candidate)} className={`block w-full border-b border-border px-4 py-3 text-left last:border-0 ${selectedId === candidate.id ? "bg-secondary" : "hover:bg-secondary/60"}`}><span className="block font-medium">{candidate.name}</span><span className="mt-1 block text-xs text-muted-foreground">{candidate.office} · {candidate.response_status === "received" ? "Response received" : "No response"}</span><span className="mt-1 block truncate text-xs text-muted-foreground">{candidate.email || "No email recorded"}</span></button>)}
          </div>
        </aside>

        <main>
          {!draft ? <div className="border border-border bg-card p-8 text-sm text-muted-foreground">Select a candidate to edit.</div> : <div className="border border-border bg-card p-5 sm:p-8">
            <div className="flex flex-col gap-4 border-b border-border pb-6 sm:flex-row sm:items-start sm:justify-between">
              <div><h2 className="font-serif text-2xl">{draft.name}</h2><p className="mt-1 text-sm text-muted-foreground">{draft.office}</p></div>
              <div className="flex flex-wrap gap-2"><Button variant="outline" onClick={markNoResponse}>Mark no response</Button><Button onClick={saveCandidate} disabled={saving}>{saving ? "Saving…" : "Save"}</Button></div>
            </div>

            <section className="mt-6 border-b border-border pb-7">
              <h3 className="font-serif text-xl">Contact details</h3>
              <p className="mt-1 text-xs leading-5 text-muted-foreground">These fields are for administration and outreach. They are not shown on the public candidate page.</p>
              <div className="mt-5 grid gap-5 sm:grid-cols-2">
                <div><label className="mb-2 block text-sm font-medium">Email</label><Input type="email" value={draft.email ?? ""} onChange={(event) => setDraft({ ...draft, email: event.target.value })} placeholder="candidate@example.com"/></div>
                <div><label className="mb-2 block text-sm font-medium">Contact type</label><select className="h-10 w-full rounded-md border border-input bg-background px-3 text-sm" value={draft.contact_type ?? ""} onChange={(event) => setDraft({ ...draft, contact_type: event.target.value || null })}>{contactTypes.map(([value, label]) => <option key={value || "none"} value={value}>{label}</option>)}</select></div>
                <div className="sm:col-span-2"><label className="mb-2 block text-sm font-medium">Contact source</label><Input value={draft.contact_source ?? ""} onChange={(event) => setDraft({ ...draft, contact_source: event.target.value })} placeholder="Campaign website, City page, public profile, etc."/></div>
              </div>
            </section>

            <div className="mt-7 grid gap-5 sm:grid-cols-2">
              <div><label className="mb-2 block text-sm font-medium">Response status</label><select className="h-10 w-full rounded-md border border-input bg-background px-3 text-sm" value={draft.response_status} onChange={(event) => setDraft({ ...draft, response_status: event.target.value as CandidateDraft["response_status"] })}><option value="not_received">No response received</option><option value="received">Response received</option></select></div>
              <div><label className="mb-2 block text-sm font-medium">Response date</label><Input type="date" value={draft.response_date ?? ""} disabled={draft.response_status !== "received"} onChange={(event) => setDraft({ ...draft, response_date: event.target.value || null })}/></div>
            </div>

            <div className="mt-6 space-y-7">
              {["q1_response", "q2_response", "q3_response"].map((field, index) => <div key={field}><label className="block text-sm font-semibold">Question {index + 1}</label><p className="mt-1 text-xs leading-5 text-muted-foreground">{candidateQuestions[index]}</p><textarea className="mt-3 min-h-32 w-full rounded-md border border-input bg-background px-3 py-2 text-sm leading-6" value={(draft[field as keyof CandidateDraft] as string | null) ?? ""} disabled={draft.response_status !== "received"} onChange={(event) => setDraft({ ...draft, [field]: event.target.value })}/></div>)}

              <div><label className="mb-2 block text-sm font-medium">Response source</label><Input value={draft.response_source ?? ""} disabled={draft.response_status !== "received"} onChange={(event) => setDraft({ ...draft, response_source: event.target.value })} placeholder="Email, website URL, public statement, etc."/></div>
              <div><label className="mb-2 block text-sm font-medium">Internal notes</label><textarea className="min-h-24 w-full rounded-md border border-input bg-background px-3 py-2 text-sm leading-6" value={draft.internal_notes ?? ""} onChange={(event) => setDraft({ ...draft, internal_notes: event.target.value })} placeholder="Private notes — not shown on the public page"/></div>
            </div>

            {message && <p className={`mt-6 text-sm ${message.startsWith("Save failed") || message.startsWith("Unable") ? "text-destructive" : "text-muted-foreground"}`}>{message}</p>}
          </div>}
        </main>
      </div>
    </div>
  </section>;
}
