import { createFileRoute, Link } from "@tanstack/react-router";
import { useEffect, useState, type FormEvent } from "react";
import type { Session } from "@supabase/supabase-js";
import { Mail, Users } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { supabase } from "@/lib/supabase";

const ADMIN_USER_ID = "05c2f47c-b22d-4d0d-8d14-9c03c33a4472";

export const Route = createFileRoute("/admin/")({
  head: () => ({ meta: [{ title: "Admin Portal | Nanaimo Tennis" }, { name: "robots", content: "noindex,nofollow" }] }),
  component: AdminPortalPage,
});

function AdminPortalPage() {
  const [session, setSession] = useState<Session | null>(null);
  const [authReady, setAuthReady] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [authError, setAuthError] = useState("");

  const isAdmin = session?.user.id === ADMIN_USER_ID;

  useEffect(() => {
    supabase.auth.getSession().then(({ data }) => { setSession(data.session); setAuthReady(true); });
    const { data: listener } = supabase.auth.onAuthStateChange((_event, nextSession) => { setSession(nextSession); setAuthReady(true); });
    return () => listener.subscription.unsubscribe();
  }, []);

  async function signIn(event: FormEvent) {
    event.preventDefault();
    setAuthError("");
    const { error } = await supabase.auth.signInWithPassword({ email, password });
    if (error) setAuthError(error.message);
  }

  if (!authReady) return <div className="page-wrap py-16 text-sm text-muted-foreground">Checking administrator session…</div>;

  if (!session) return <section className="py-16 sm:py-24"><div className="page-wrap max-w-md">
    <p className="eyebrow">Private administration</p>
    <h1 className="mt-3 font-serif text-4xl">Nanaimo Tennis admin</h1>
    <p className="mt-4 text-sm leading-6 text-muted-foreground">Sign in once to access candidate records and candidate email outreach.</p>
    <form className="mt-8 space-y-4" onSubmit={signIn}>
      <div><label className="mb-2 block text-sm font-medium">Email</label><Input type="email" value={email} onChange={(e) => setEmail(e.target.value)} required /></div>
      <div><label className="mb-2 block text-sm font-medium">Password</label><Input type="password" value={password} onChange={(e) => setPassword(e.target.value)} required /></div>
      {authError && <p className="text-sm text-destructive">{authError}</p>}
      <Button type="submit">Sign in</Button>
    </form>
  </div></section>;

  if (!isAdmin) return <section className="py-16"><div className="page-wrap max-w-xl"><p className="eyebrow">Private administration</p><h1 className="mt-3 font-serif text-4xl">Access not authorized</h1><p className="mt-4 text-sm text-muted-foreground">This authenticated account is not authorized to use the admin portal.</p><Button className="mt-6" variant="outline" onClick={() => supabase.auth.signOut()}>Sign out</Button></div></section>;

  return <section className="py-12 sm:py-16"><div className="page-wrap max-w-5xl">
    <div className="flex flex-col gap-4 border-b border-border pb-6 sm:flex-row sm:items-end sm:justify-between">
      <div><p className="eyebrow">Private administration</p><h1 className="mt-2 font-serif text-4xl">Admin portal</h1><p className="mt-2 max-w-2xl text-sm leading-6 text-muted-foreground">Manage candidate records and candidate email outreach from one place.</p></div>
      <Button variant="outline" onClick={() => supabase.auth.signOut()}>Sign out</Button>
    </div>

    <div className="mt-8 grid gap-5 md:grid-cols-2">
      <Link to="/admin/candidates" className="group border border-border bg-card p-6 transition hover:border-foreground/25 hover:bg-secondary/40 sm:p-8">
        <div className="flex size-10 items-center justify-center rounded-full bg-secondary"><Users className="size-5" /></div>
        <h2 className="mt-5 font-serif text-2xl">Candidate records</h2>
        <p className="mt-2 text-sm leading-6 text-muted-foreground">Manage contact details, response status, published answers and internal notes.</p>
        <p className="mt-5 text-sm font-semibold group-hover:underline">Open candidate records →</p>
      </Link>

      <Link to="/admin/email" className="group border border-border bg-card p-6 transition hover:border-foreground/25 hover:bg-secondary/40 sm:p-8">
        <div className="flex size-10 items-center justify-center rounded-full bg-secondary"><Mail className="size-5" /></div>
        <h2 className="mt-5 font-serif text-2xl">Candidate email outreach</h2>
        <p className="mt-2 text-sm leading-6 text-muted-foreground">Review and edit the email draft, send questionnaires and check whether replies have arrived.</p>
        <p className="mt-5 text-sm font-semibold group-hover:underline">Open email outreach →</p>
      </Link>
    </div>
  </div></section>;
}
