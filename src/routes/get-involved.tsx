import { createFileRoute } from "@tanstack/react-router";
import { useState, type FormEvent } from "react";
import { ArrowUpRight, CheckCircle2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { PageIntro } from "@/components/page-elements";

export const Route = createFileRoute("/get-involved")({
  head: () => ({ meta: [
    { title: "Get Involved | Nanaimo Tennis" },
    { name: "description", content: "Take part in the civic conversation about the future of year-round indoor tennis in Nanaimo." },
    { property: "og:title", content: "Participate in the conversation" },
    { property: "og:description", content: "Join community updates, read the public petition, contact Council, attend a meeting or share your experience with indoor tennis." },
    { property: "og:type", content: "website" },
    { property: "og:url", content: "https://www.nanaimotennis.ca/get-involved" },
    { name: "twitter:card", content: "summary_large_image" },
  ], links: [{ rel: "canonical", href: "https://www.nanaimotennis.ca/get-involved" }] }),
  component: GetInvolvedPage,
});

function GetInvolvedPage() {
  const [consent, setConsent] = useState(false);
  const [state, setState] = useState<"idle"|"sending"|"sent"|"error">("idle");

  async function submit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setState("sending");
    const formElement = e.currentTarget;
    const form = new FormData(formElement);

    try {
      const response = await fetch("/api/community-story", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: String(form.get("name") || ""),
          email: String(form.get("email") || ""),
          relationship: String(form.get("relationship") || ""),
          story: String(form.get("story") || ""),
          consentToPublish: consent,
        }),
      });

      if (!response.ok) throw new Error("Submission failed");

      setState("sent");
      formElement.reset();
      setConsent(false);
    } catch {
      setState("error");
    }
  }

  const actions = [
    ["Join community updates on Google Groups", "https://groups.google.com/g/fitin2"],
    ["Read and sign the public petition", "https://www.change.org/p/urge-nanaimo-to-preserve-westwood-lake-indoor-tennis-courts"],
    ["Contact Mayor & Council", "https://www.nanaimo.ca/your-government/city-council"],
    ["Attend a Council meeting", "https://www.nanaimo.ca/your-government/city-council/council-meetings"],
    ["Apply to appear as a delegation", "https://www.nanaimo.ca/your-government/city-council/council-meetings/appearing-as-a-delegation"],
  ];

  return <>
    <PageIntro eyebrow="Get involved" title="Participate in the conversation.">
      <p>Learn from the public record, join community updates, share your experience and take part respectfully in Nanaimo's civic process.</p>
    </PageIntro>
    <section className="section-space">
      <div className="page-wrap grid gap-10 lg:grid-cols-[.7fr_1.3fr] lg:gap-12">
        <div>
          <h2 className="font-serif text-3xl">Civic participation</h2>
          <div className="mt-5 grid gap-2 sm:mt-6">
            {actions.map(([label,url]) => <a key={label} href={url} target="_blank" rel="noreferrer" className="group flex items-center justify-between border border-border bg-card px-4 py-4 text-sm font-semibold transition-colors hover:border-ring hover:text-ring sm:px-5">{label}<ArrowUpRight className="size-4 shrink-0 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5"/></a>)}
          </div>
          <p className="mt-4 text-xs leading-5 text-muted-foreground sm:mt-5">The Google Group is the community update and coordination channel. Other external links go to the City of Nanaimo or the community-organized Change.org petition. This site does not endorse candidates or tell residents how to vote.</p>
        </div>
        <div className="civic-card p-5 sm:p-8">
          <p className="text-xs font-bold uppercase tracking-[.14em] text-muted-foreground">Community experiences</p>
          <h2 className="mt-3 font-serif text-3xl">How has indoor tennis affected you or your family?</h2>
          <p className="mt-3 text-sm leading-6 text-muted-foreground">Submissions are reviewed before any public use. Nothing is published automatically.</p>
          {state === "sent" ? <div className="mt-7 flex gap-3 border border-border bg-secondary p-5 sm:mt-8"><CheckCircle2 className="size-5 text-ring"/><div><p className="font-semibold">Thank you for sharing your experience.</p><p className="mt-1 text-sm text-muted-foreground">Your submission has been received for review.</p></div></div> : <form onSubmit={submit} className="mt-6 grid gap-4 sm:mt-8 sm:gap-5">
            <div className="grid gap-4 sm:grid-cols-2 sm:gap-5"><div><Label htmlFor="name">Name</Label><Input id="name" name="name" required maxLength={100} className="mt-1.5 sm:mt-2"/></div><div><Label htmlFor="email">Email</Label><Input id="email" name="email" type="email" required maxLength={255} className="mt-1.5 sm:mt-2"/></div></div>
            <div><Label htmlFor="relationship">Connection to the issue</Label><Input id="relationship" name="relationship" required maxLength={160} className="mt-1.5 sm:mt-2" placeholder="Player, parent, coach, neighbour, Nanaimo resident…"/></div>
            <div><Label htmlFor="story">Your story</Label><Textarea id="story" name="story" required minLength={20} maxLength={5000} className="mt-1.5 min-h-28 sm:mt-2 sm:min-h-36"/></div>
            <div className="flex items-start gap-3 pt-1"><Checkbox id="consent" checked={consent} onCheckedChange={(value) => setConsent(value === true)}/><Label htmlFor="consent" className="text-sm font-normal leading-5">I consent to this story being considered for public publication. My email will not be published.</Label></div>
            <p className="text-xs leading-5 text-muted-foreground">Your name, email and submission are used only to review and verify community stories for this project. Public publication requires the consent above.</p>
            {state === "error" && <p className="text-sm text-destructive">Your story could not be submitted. Please check the fields and try again.</p>}
            <Button type="submit" disabled={state === "sending"} className="mt-1 w-fit">{state === "sending" ? "Submitting…" : "Submit for review"}</Button>
          </form>}
        </div>
      </div>
    </section>
  </>;
}
