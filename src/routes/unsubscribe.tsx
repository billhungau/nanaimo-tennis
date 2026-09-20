import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { CheckCircle2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { PageIntro } from "@/components/page-elements";

export const Route = createFileRoute("/unsubscribe")({
  validateSearch: (search: Record<string, unknown>) => ({
    token: typeof search.token === "string" ? search.token : "",
  }),
  head: () => ({
    meta: [
      { title: "Unsubscribe | Nanaimo Tennis" },
      { name: "robots", content: "noindex,nofollow" },
    ],
  }),
  component: UnsubscribePage,
});

function UnsubscribePage() {
  const { token } = Route.useSearch();
  const [state, setState] = useState<"idle" | "sending" | "done" | "error">("idle");

  async function unsubscribe() {
    if (!token) {
      setState("error");
      return;
    }

    setState("sending");
    try {
      const response = await fetch("/api/mailing-list-unsubscribe", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ token }),
      });
      if (!response.ok) throw new Error("Unsubscribe failed");
      setState("done");
    } catch {
      setState("error");
    }
  }

  return <>
    <PageIntro eyebrow="Email preferences" title="Unsubscribe from Nanaimo Tennis updates.">
      <p>You can stop receiving mailing-list updates at any time.</p>
    </PageIntro>
    <section className="section-space">
      <div className="page-wrap max-w-2xl">
        {state === "done" ? (
          <div className="flex gap-3 border border-border bg-secondary p-5">
            <CheckCircle2 className="size-5 shrink-0 text-ring" />
            <div><p className="font-semibold">You've been unsubscribed.</p><p className="mt-1 text-sm leading-6 text-muted-foreground">You will no longer receive Nanaimo Tennis mailing-list updates.</p></div>
          </div>
        ) : (
          <div className="civic-card p-6 sm:p-8">
            <h2 className="font-serif text-2xl">Confirm unsubscribe</h2>
            <p className="mt-3 text-sm leading-6 text-muted-foreground">This only affects mailing-list updates. It does not delete any community story or other submission you may have made separately.</p>
            {state === "error" && <p className="mt-4 text-sm text-destructive">This unsubscribe link is invalid or could not be processed.</p>}
            <Button onClick={unsubscribe} disabled={state === "sending" || !token} className="mt-5">
              {state === "sending" ? "Unsubscribing…" : "Unsubscribe"}
            </Button>
          </div>
        )}
      </div>
    </section>
  </>;
}
