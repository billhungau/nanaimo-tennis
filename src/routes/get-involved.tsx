import { createFileRoute } from "@tanstack/react-router";
import { useServerFn } from "@tanstack/react-start";
import { useState, type FormEvent } from "react";
import { ArrowUpRight, CheckCircle2 } from "lucide-react";
import { submitCommunityStory } from "@/lib/community-stories.functions";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { PageIntro } from "@/components/page-elements";

export const Route = createFileRoute("/get-involved")({
  head: () => ({ meta: [
    { title: "Get Involved | Indoor Tennis Nanaimo" },
    { name: "description", content: "Take part in the civic conversation about the future of year-round indoor tennis in Nanaimo." },
    { property: "og:title", content: "Participate in the conversation" },
    { property: "og:description", content: "Read the public petition, contact Council, attend a meeting or share your experience with indoor tennis." },
    { property: "og:type", content: "website" },
    { property: "og:url", content: "https://nanaimo-tennis.lovable.app/get-involved" },
    { name: "twitter:card", content: "summary_large_image" },
  ], links: [{ rel: "canonical", href: "https://nanaimo-tennis.lovable.app/get-involved" }] }),
  component: GetInvolvedPage,
});

function GetInvolvedPage() {
  const saveStory = useServerFn(submitCommunityStory);
  const [consent, setConsent] = useState(false);
  const [state, setState] = useState<"idle"|"sending"|"sent"|"error">("idle");

  async function submit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setState("sending");
    const formElement = e.currentTarget;
    const form = new FormData(formElement);
    try {
      await saveStory({ data: {
        name: String(form.get("name")),
        email: String(form.get("email")),
        relationship: String(form.get("relationship")),
        story: String(form.get("story")),
        consentToPublish: consent,
      } });
      setState("sent");
      formElement.reset();
      setConsent(false);
    } catch {
      setState("error");
    }
  }

  const actions = [
    ["Read and sign the public petition", "https://www.change.org/p/urge-nanaimo-to-preserve-westwood-lake-indoor-tennis-courts"],
    ["Contact Mayor & Council", "https://www.nanaimo.ca/your-government/city-council"],
    ["Attend a Council meeting", "https://www.nanaimo.ca/your-government/city-council/council-meetings"],
    ["Apply to appear as a delegation", "https://www.nanaimo.ca/your-government/city-council/council-meetings/appearing-as-a-delegation"],
  ];

  return <>
    <PageIntro eyebrow="Get involved" title="Participate in the conversation.">
      <p>Learn from the public record, share your experience and take part respectfully in Nanaimo's civic process.</p>
    </PageIntro>
    <section className="section-space">
      <div className="page-wrap grid gap-12 lg:grid-cols-[.7fr_1.3fr]">
        <div>
          <h2 className="font-serif text-3xl">Civic participation</h2>
          <div className="mt-6 border-t border-border">{actions.map(([label,url]) => <a key={label} href={url} target="_blank" rel="noreferrer" className="flex items-center justify-between border-b border-border py-4 text-sm font-semibold hover:text-ring">{label}<ArrowUpRight className="size-4"/></a>)}</div>
          <p className="mt-5 text-xs leading-5 text-muted-foreground">External links go to the City of Nanaimo or the community-organized Change.org petition. This site does not endorse candidates or tell residents how to vote.</p>
        </div>
        <div className="civic-card p-6 sm:p-8">
          <h2 className="font-serif text-3xl">How has indoor tennis affected you or your family?</h2>
          <p className="mt-3 text-sm leading-6 text-muted-foreground">Submissions are reviewed before any public use. Nothing is published automatically.</p>
          {state === "sent" ? <div className="mt-8 flex gap-3 border border-border bg-secondary p-5"><CheckCircle2 className="size-5 text-ring"/><div><p className="font-semibold">Thank you for sharing your experience.</p><p className="mt-1 text-sm text-muted-foreground">Your submission has been received for review.</p></div></div> : <form onSubmit={submit} className="mt-8 grid gap-5">
            <div className="grid gap-5 sm:grid-cols-2"><div><Label htmlFor="name">Name</Label><Input id="name" name="name" required maxLength={100} className="mt-2"/></div><div><Label htmlFor="email">Email</Label><Input id="email" name="email" type="email" required maxLength={255} className="mt-2"/></div></div>
            <div><Label htmlFor="relationship">Connection to the issue</Label><Input id="relationship" name="relationship" required maxLength={160} className="mt-2" placeholder="Player, parent, coach, neighbour, Nanaimo resident…"/></div>
            <div><Label htmlFor="story">Your story</Label><Textarea id="story" name="story" required minLength={20} maxLength={5000} className="mt-2 min-h-36"/></div>
            <div className="flex items-start gap-3"><Checkbox id="consent" checked={consent} onCheckedChange={(value) => setConsent(value === true)}/><Label htmlFor="consent" className="text-sm font-normal leading-5">I consent to this story being considered for public publication. My email will not be published.</Label></div>
            <p className="text-xs leading-5 text-muted-foreground">Your name, email and submission are used only to review and verify community stories for this project. Public publication requires the consent above.</p>
            {state === "error" && <p className="text-sm text-destructive">Your story could not be submitted. Please check the fields and try again.</p>}
            <Button type="submit" disabled={state === "sending"} className="w-fit">{state === "sending" ? "Submitting…" : "Submit for review"}</Button>
          </form>}
        </div>
      </div>
    </section>
  </>;
}
