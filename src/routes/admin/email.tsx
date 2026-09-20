import { createFileRoute } from "@tanstack/react-router";
import { useServerFn } from "@tanstack/react-start";
import { useEffect, useMemo, useState, type FormEvent } from "react";
import { Mail, Search } from "lucide-react";
import type { Session } from "@supabase/supabase-js";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { sendCandidateQuestionnaire } from "@/lib/candidate-email.functions";
import { supabase } from "@/lib/supabase";

const ADMIN_USER_ID = "05c2f47c-b22d-4d0d-8d14-9c03c33a4472";

type Candidate = {
  id: string;
  name: string;
  office: "Mayor" | "Council";
  email: string | null;
  internal_notes: string | null;
};

function latestTimestamp(notes: string | null, phrase: string) {
  if (!notes) return null;
  const escaped = phrase.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
  const matches = [...notes.matchAll(new RegExp(`\\[([^\\]]+)\\] ${escaped}`, "g"))];
  return matches.at(-1)?.[1] ?? null;
}

export const Route = createFileRoute("/admin/email")({
  head: () => ({ meta: [{ title: "Candidate Email | Nanaimo Tennis" }, { name: "robots", content: "noindex,nofollow" }] }),
  component: CandidateEmailPage,
});

function CandidateEmailPage() {
  const sendQuestionnaire = useServerFn(sendCandidateQuestionnaire);
  const [session, setSession] = useState<Session | null>(null);
  const [authReady, setAuthReady] = useState(false);
  const [loginEmail, setLoginEmail] = useState("");
  const [password, setPassword] = useState("");
  const [authError, setAuthError] = useState("");
  const [candidates, setCandidates] = useState<Candidate[]>([]);
  const [query, setQuery] = useState("");
  const [loading, setLoading] = useState(false);
  const [sendingId, setSendingId] = useState<string | null>(null);
  const [message, setMessage] = useState("");

  const isAdmin = session?.user.id === ADMIN_USER_ID;

  useEffect(() => {
    supabase.auth.getSession().then(({ data }) => { setSession(data.session); setAuthReady(true); });
    const { data: listener } = supabase.auth.onAuthStateChange((_event, nextSession) => { setSession(nextSession); setAuthReady(true); });
    return () => listener.subscription.unsubscribe();
  }, []);

  useEffect(() => { if (isAdmin) void loadCandidates(); }, [isAdmin]);

  async function loadCandidates() {
    setLoading(true);
    const { data, error } = await (supabase as any).from("candidates").select("id,name,office,email,internal_notes").order("name", { ascending: true });
    if (error) setMessage(`Unable to load candidates: ${error.message}`);
    else setCandidates((data ?? []) as Candidate[]);
    setLoading(false);
  }

  async function signIn(event: FormEvent) {
    event.preventDefault();
    setAuthError("");
    const { error } = await supabase.auth.signInWithPassword({ email: loginEmail, password });
    if (error) setAuthError(error.message);
  }

  async function send(candidate: Candidate) {
    if (!session?.access_token || !candidate.email) return;
    setSendingId(candidate.id);
    setMessage("");
    try {
      const result = await sendQuestionnaire({ data: { candidateId: candidate.id, accessToken: session.access_token } });
      setMessage(`Questionnaire sent to ${candidate.name} at ${result.to}.`);
      await loadCandidates();
    } catch (error) {
      setMessage(`Send failed for ${candidate.name}: ${error instanceof Error ? error.message : "Unknown error"}`);
    } finally {
      setSendingId(null);
    }
  }

  const shown = useMemo(() => {
    const term = query.trim().toLowerCase();
    return candidates.filter((candidate) => !term || candidate.name.toLowerCase().includes(term) || (candidate.email ?? "").toLowerCase().includes(term));
  }, [candidates, query]);

  if (!authReady) return <div className="page-wrap py-16 text-sm text-muted-foreground">Checking administrator session…</div>;

  if (!session) return <section className="py-16 sm:py-24"><div className="page-wrap max-w-md">
    <p className="eyebrow">Private administration</p><h1 className="mt-3 font-serif text-4xl">Candidate email</h1>
    <p className="mt-4 text-sm text-muted-foreground">Sign in to send the standardized candidate questionnaire.</p>
    <form className="mt-8 space-y-4" onSubmit={signIn}>
      <div><label className="mb-2 block text-sm font-medium">Email</label><Input type="email" value={loginEmail} onChange={(e) => setLoginEmail(e.target.value)} required /></div>
      <div><label className="mb-2 block text-sm font-medium">Password</label><Input type="password" value={password} onChange={(e) => setPassword(e.target.value)} required /></div>
      {authError && <p className="text-sm text-destructive">{authError}</p>}<Button type="submit">Sign in</Button>
    </form>
  </div></section>;

  if (!isAdmin) return <div className="page-wrap py-16"><h1 className="font-serif text-3xl">Access not authorized</h1></div>;

  return <section className="py-12 sm:py-16"><div className="page-wrap max-w-5xl">
    <div className="flex flex-col gap-4 border-b border-border pb-6 sm:flex-row sm:items-end sm:justify-between">
      <div><p className="eyebrow">Private administration</p><h1 className="mt-2 font-serif text-4xl">Candidate email outreach</h1><p className="mt-2 max-w-2xl text-sm leading-6 text-muted-foreground">Each candidate receives the same three questions. Replies are routed back through Resend and noted in the private candidate record.</p></div>
      <Button variant="outline" onClick={() => supabase.auth.signOut()}>Sign out</Button>
    </div>

    <div className="mt-8 relative max-w-sm"><Search className="absolute left-3 top-3 size-4 text-muted-foreground"/><Input value={query} onChange={(e) => setQuery(e.target.value)} placeholder="Search name or email" className="pl-10" /></div>
    {message && <p className={`mt-4 text-sm ${message.startsWith("Send failed") || message.startsWith("Unable") ? "text-destructive" : "text-muted-foreground"}`}>{message}</p>}

    <div className="mt-6 overflow-hidden border border-border bg-card">
      {loading && <p className="p-6 text-sm text-muted-foreground">Loading…</p>}
      {!loading && shown.map((candidate) => {
        const lastSent = latestTimestamp(candidate.internal_notes, "Candidate questionnaire sent");
        const lastReply = latestTimestamp(candidate.internal_notes, "Email reply received");
        return <article key={candidate.id} className="grid gap-4 border-b border-border p-5 last:border-0 sm:grid-cols-[1fr_auto] sm:items-center">
          <div><div className="flex flex-wrap items-center gap-2"><h2 className="font-serif text-lg">{candidate.name}</h2><span className="text-xs text-muted-foreground">{candidate.office}</span></div>
            <p className="mt-1 text-sm text-muted-foreground">{candidate.email || "No email recorded"}</p>
            <div className="mt-2 flex flex-wrap gap-x-5 gap-y-1 text-xs text-muted-foreground"><span>{lastSent ? `Last sent: ${new Date(lastSent).toLocaleString()}` : "Not sent yet"}</span>{lastReply && <span>Reply received: {new Date(lastReply).toLocaleString()}</span>}</div>
          </div>
          <Button onClick={() => send(candidate)} disabled={!candidate.email || sendingId === candidate.id} variant={lastSent ? "outline" : "default"}><Mail className="size-4" />{sendingId === candidate.id ? "Sending…" : lastSent ? "Send again" : "Send questionnaire"}</Button>
        </article>;
      })}
    </div>
  </div></section>;
}
