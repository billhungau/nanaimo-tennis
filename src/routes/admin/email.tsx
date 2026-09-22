import { createFileRoute, Link } from "@tanstack/react-router";
import { useEffect, useMemo, useRef, useState, type FormEvent } from "react";
import { Bold, CheckCircle2, Mail, RotateCcw, Save, Search, Send } from "lucide-react";
import type { Session } from "@supabase/supabase-js";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { candidateQuestions } from "@/lib/civic-data";
import { renderEmailMarkdown } from "@/lib/email-format";
import { supabase } from "@/lib/supabase";

const ADMIN_USER_ID = "05c2f47c-b22d-4d0d-8d14-9c03c33a4472";
const DEFAULT_SUBJECT = "Nanaimo Tennis – 2026 candidate questionnaire";
const DEFAULT_BODY = `Hello {{name}},

Nanaimo Tennis is an independent community information initiative publishing candidate positions on the future of year-round indoor tennis in Nanaimo.

We are asking every mayoral and council candidate the same three questions. Responses are published without endorsement, ranking or editorial scoring.

1. ${candidateQuestions[0]}

2. ${candidateQuestions[1]}

3. ${candidateQuestions[2]}

Please reply directly to this email with your answers. Your response will be attributed to you and published as provided, subject only to basic formatting for readability.

Candidate information page: {{candidate_page}}

Thank you,
Nanaimo Tennis
{{site_url}}`;

type Candidate = {
  id: string;
  name: string;
  office: "Mayor" | "Council";
  email: string | null;
  internal_notes: string | null;
  response_status: "received" | "not_received";
  response_date: string | null;
};

type SavedTemplate = {
  subject: string;
  body: string;
};

function latestTimestamp(notes: string | null, phrase: string) {
  if (!notes) return null;
  const escaped = phrase.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
  const matches = [...notes.matchAll(new RegExp(`\\[([^\\]]+)\\] ${escaped}`, "g"))];
  return matches.at(-1)?.[1] ?? null;
}

function templateFromSession(session: Session | null): SavedTemplate | null {
  const value = session?.user.user_metadata?.candidate_email_template;
  if (!value || typeof value !== "object") return null;
  const subject = typeof value.subject === "string" ? value.subject : null;
  const body = typeof value.body === "string" ? value.body : null;
  return subject && body ? { subject, body } : null;
}

function personalizePreview(value: string) {
  return value
    .replaceAll("{{name}}", "Candidate Name")
    .replaceAll("{{candidate_page}}", "https://www.nanaimotennis.ca/candidates")
    .replaceAll("{{site_url}}", "https://www.nanaimotennis.ca");
}

export const Route = createFileRoute("/admin/email")({
  head: () => ({ meta: [{ title: "Candidate Email | Nanaimo Tennis" }, { name: "robots", content: "noindex,nofollow" }] }),
  component: CandidateEmailPage,
});

function CandidateEmailPage() {
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
  const [subject, setSubject] = useState(DEFAULT_SUBJECT);
  const [body, setBody] = useState(DEFAULT_BODY);
  const [savedSubject, setSavedSubject] = useState(DEFAULT_SUBJECT);
  const [savedBody, setSavedBody] = useState(DEFAULT_BODY);
  const [savingTemplate, setSavingTemplate] = useState(false);
  const [testEmail, setTestEmail] = useState("");
  const [sendingTest, setSendingTest] = useState(false);
  const bodyRef = useRef<HTMLTextAreaElement | null>(null);

  const isAdmin = session?.user.id === ADMIN_USER_ID;
  const templateChanged = subject !== savedSubject || body !== savedBody;

  useEffect(() => {
    supabase.auth.getSession().then(({ data }) => { setSession(data.session); setAuthReady(true); });
    const { data: listener } = supabase.auth.onAuthStateChange((_event, nextSession) => { setSession(nextSession); setAuthReady(true); });
    return () => listener.subscription.unsubscribe();
  }, []);

  useEffect(() => {
    if (!isAdmin) return;
    const saved = templateFromSession(session);
    const nextSubject = saved?.subject ?? DEFAULT_SUBJECT;
    const nextBody = saved?.body ?? DEFAULT_BODY;
    setSubject(nextSubject);
    setBody(nextBody);
    setSavedSubject(nextSubject);
    setSavedBody(nextBody);
    void loadCandidates();
  }, [isAdmin]);

  async function loadCandidates() {
    setLoading(true);
    const { data, error } = await (supabase as any).from("candidates").select("id,name,office,email,internal_notes,response_status,response_date").order("name", { ascending: true });
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

  async function saveTemplate() {
    if (!subject.trim() || !body.trim()) {
      setMessage("Template cannot be saved with an empty subject or body.");
      return;
    }

    setSavingTemplate(true);
    setMessage("");
    const { data, error } = await supabase.auth.updateUser({ data: { candidate_email_template: { subject, body } } });

    if (error) {
      setMessage(`Template save failed: ${error.message}`);
      setSavingTemplate(false);
      return;
    }

    setSavedSubject(subject);
    setSavedBody(body);
    setMessage("Email template saved.");
    if (data.user) setSession((current) => current ? { ...current, user: data.user } : current);
    setSavingTemplate(false);
  }

  function applyBold() {
    const textarea = bodyRef.current;
    if (!textarea) return;

    const start = textarea.selectionStart;
    const end = textarea.selectionEnd;
    const selected = body.slice(start, end);
    const inner = selected || "bold text";
    const replacement = `**${inner}**`;
    const nextBody = `${body.slice(0, start)}${replacement}${body.slice(end)}`;
    setBody(nextBody);

    requestAnimationFrame(() => {
      textarea.focus();
      const selectionStart = start + 2;
      textarea.setSelectionRange(selectionStart, selectionStart + inner.length);
    });
  }

  async function postEmail(payload: Record<string, unknown>) {
    if (!session?.access_token) throw new Error("Not signed in");
    const response = await fetch("/api/candidate-email", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${session.access_token}`,
      },
      body: JSON.stringify(payload),
    });
    const result = await response.json().catch(() => ({})) as { error?: string; to?: string };
    if (!response.ok) throw new Error(result.error || "Email could not be sent");
    return result;
  }

  async function sendTest() {
    if (!testEmail.trim()) return;
    setSendingTest(true);
    setMessage("");
    try {
      const result = await postEmail({ mode: "test", testEmail: testEmail.trim(), subject, body });
      setMessage(`Test email sent to ${result.to || testEmail.trim()}.`);
    } catch (error) {
      setMessage(`Test send failed: ${error instanceof Error ? error.message : "Unknown error"}`);
    } finally {
      setSendingTest(false);
    }
  }

  async function send(candidate: Candidate) {
    if (!candidate.email) return;
    setSendingId(candidate.id);
    setMessage("");
    try {
      const result = await postEmail({ mode: "candidate", candidateId: candidate.id, subject, body });
      setMessage(`Questionnaire sent to ${candidate.name} at ${result.to || candidate.email}.`);
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

  const previewHtml = renderEmailMarkdown(personalizePreview(body));

  if (!authReady) return <div className="page-wrap py-16 text-sm text-muted-foreground">Checking administrator session…</div>;

  if (!session) return <section className="py-16 sm:py-24"><div className="page-wrap max-w-md">
    <p className="eyebrow">Private administration</p><h1 className="mt-3 font-serif text-4xl">Candidate email</h1>
    <p className="mt-4 text-sm text-muted-foreground">Sign in to manage candidate email outreach.</p>
    <form className="mt-8 space-y-4" onSubmit={signIn}>
      <div><label className="mb-2 block text-sm font-medium">Email</label><Input type="email" value={loginEmail} onChange={(e) => setLoginEmail(e.target.value)} required /></div>
      <div><label className="mb-2 block text-sm font-medium">Password</label><Input type="password" value={password} onChange={(e) => setPassword(e.target.value)} required /></div>
      {authError && <p className="text-sm text-destructive">{authError}</p>}<Button type="submit">Sign in</Button>
    </form>
  </div></section>;

  if (!isAdmin) return <div className="page-wrap py-16"><h1 className="font-serif text-3xl">Access not authorized</h1></div>;

  return <section className="py-12 sm:py-16"><div className="page-wrap max-w-6xl">
    <div className="flex flex-col gap-4 border-b border-border pb-6 sm:flex-row sm:items-end sm:justify-between">
      <div><p className="eyebrow">Private administration</p><h1 className="mt-2 font-serif text-4xl">Candidate email outreach</h1><p className="mt-2 max-w-2xl text-sm leading-6 text-muted-foreground">Review and edit the message before sending it to individual candidates. Replies are routed back through Resend and noted in the private candidate record.</p></div>
      <div className="flex flex-wrap gap-2"><Button asChild variant="outline"><Link to="/admin">Admin portal</Link></Button><Button variant="outline" onClick={() => supabase.auth.signOut()}>Sign out</Button></div>
    </div>

    <div className="mt-8 grid gap-8 lg:grid-cols-[1.05fr_.95fr]">
      <section className="border border-border bg-card p-5 sm:p-7">
        <div className="flex flex-wrap items-start justify-between gap-3">
          <div><p className="eyebrow">Email draft</p><h2 className="mt-2 font-serif text-2xl">Message sent to candidates</h2></div>
          <div className="flex flex-wrap gap-2">
            <Button variant="outline" size="sm" onClick={() => { setSubject(DEFAULT_SUBJECT); setBody(DEFAULT_BODY); }}><RotateCcw className="size-4" />Reset default</Button>
            <Button size="sm" onClick={saveTemplate} disabled={savingTemplate || !templateChanged || !subject.trim() || !body.trim()}><Save className="size-4" />{savingTemplate ? "Saving…" : templateChanged ? "Save template" : "Saved"}</Button>
          </div>
        </div>
        <div className="mt-6 space-y-5">
          <div><label className="mb-2 block text-sm font-medium">Subject</label><Input value={subject} onChange={(e) => setSubject(e.target.value)} maxLength={200} /></div>
          <div>
            <div className="mb-2 flex flex-wrap items-center justify-between gap-2">
              <label className="block text-sm font-medium">Body</label>
              <Button type="button" variant="outline" size="sm" onClick={applyBold}><Bold className="size-4" />Bold</Button>
            </div>
            <Textarea ref={bodyRef} value={body} onChange={(e) => setBody(e.target.value)} className="min-h-[34rem] font-mono text-sm leading-6" maxLength={12000} />
            <p className="mt-2 text-xs leading-5 text-muted-foreground">Select text and click <strong>Bold</strong>, or type <code>**text**</code>. Raw HTML is not accepted.</p>
          </div>
          <div className="flex flex-wrap items-center justify-between gap-2 text-xs leading-5 text-muted-foreground">
            <p>Available placeholders: <code>{"{{name}}"}</code>, <code>{"{{candidate_page}}"}</code>, <code>{"{{site_url}}"}</code>.</p>
            <p>{templateChanged ? "Unsaved changes" : "Template saved"}</p>
          </div>
          <div className="border-t border-border pt-5">
            <p className="text-sm font-semibold">Send a test</p>
            <p className="mt-1 text-xs leading-5 text-muted-foreground">Sends the current draft to your test address without changing any candidate record.</p>
            <div className="mt-3 flex flex-col gap-2 sm:flex-row">
              <Input type="email" value={testEmail} onChange={(e) => setTestEmail(e.target.value)} placeholder="you@example.com" className="sm:max-w-sm" />
              <Button type="button" variant="outline" onClick={sendTest} disabled={sendingTest || !testEmail.trim() || !subject.trim() || !body.trim()}><Send className="size-4" />{sendingTest ? "Sending…" : "Send test email"}</Button>
            </div>
          </div>
        </div>
      </section>

      <section>
        <div className="border border-border bg-secondary/40 p-5">
          <p className="eyebrow">Preview</p>
          <p className="mt-3 text-xs font-semibold uppercase tracking-wide text-muted-foreground">Subject</p>
          <p className="mt-1 text-sm font-semibold">{subject.replaceAll("{{name}}", "Candidate Name")}</p>
          <div className="mt-5 border-t border-border pt-5 text-sm leading-6 [&_p]:mb-4 [&_p:last-child]:mb-0" dangerouslySetInnerHTML={{ __html: previewHtml }} />
        </div>

        <div className="mt-8 relative max-w-sm"><Search className="absolute left-3 top-3 size-4 text-muted-foreground"/><Input value={query} onChange={(e) => setQuery(e.target.value)} placeholder="Search candidate name or email" className="pl-10" /></div>
        {message && <p className={`mt-4 text-sm ${message.startsWith("Send failed") || message.startsWith("Test send failed") || message.startsWith("Unable") || message.startsWith("Template save failed") ? "text-destructive" : "text-muted-foreground"}`}>{message}</p>}

        <div className="mt-6 overflow-hidden border border-border bg-card">
          {loading && <p className="p-6 text-sm text-muted-foreground">Loading…</p>}
          {!loading && shown.length === 0 && <p className="p-6 text-sm text-muted-foreground">No candidates match this search.</p>}
          {!loading && shown.map((candidate) => {
            const lastSent = latestTimestamp(candidate.internal_notes, "Candidate questionnaire sent");
            const lastReply = latestTimestamp(candidate.internal_notes, "Email reply received");
            const responseReceived = candidate.response_status === "received";
            return <article key={candidate.id} className="grid gap-4 border-b border-border p-5 last:border-0 sm:grid-cols-[1fr_auto] sm:items-center">
              <div>
                <div className="flex flex-wrap items-center gap-2">
                  <h2 className="font-serif text-lg">{candidate.name}</h2>
                  <span className="text-xs text-muted-foreground">{candidate.office}</span>
                  {responseReceived && <span className="inline-flex items-center gap-1 rounded-sm border border-primary/25 bg-primary/10 px-2 py-0.5 text-[11px] font-semibold text-primary"><CheckCircle2 className="size-3" />Response received</span>}
                </div>
                <p className="mt-1 text-sm text-muted-foreground">{candidate.email || "No email recorded"}</p>
                <div className="mt-2 flex flex-wrap gap-x-5 gap-y-1 text-xs text-muted-foreground">
                  <span>{lastSent ? `Last sent: ${new Date(lastSent).toLocaleString()}` : "Not sent yet"}</span>
                  {responseReceived && candidate.response_date
                    ? <span className="font-medium text-primary">Response recorded: {new Date(`${candidate.response_date}T12:00:00`).toLocaleDateString()}</span>
                    : lastReply && <span>Reply received: {new Date(lastReply).toLocaleString()}</span>}
                </div>
              </div>
              <Button onClick={() => send(candidate)} disabled={!candidate.email || sendingId === candidate.id || !subject.trim() || !body.trim()} variant={lastSent || responseReceived ? "outline" : "default"}><Mail className="size-4" />{sendingId === candidate.id ? "Sending…" : responseReceived ? "Send again" : lastSent ? "Send again" : "Send questionnaire"}</Button>
            </article>;
          })}
        </div>
      </section>
    </div>
  </div></section>;
}