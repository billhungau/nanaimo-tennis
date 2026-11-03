import { createFileRoute, Link } from "@tanstack/react-router";
import { useState, type FormEvent } from "react";
import { ArrowRight, ArrowUpRight, CheckCircle2, HeartHandshake, Mail, Users } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";

export const Route = createFileRoute("/get-involved")({
  head: () => ({ meta: [
    { title: "Get Involved | Nanaimo Tennis" },
    { name: "description", content: "Explore NAITS Early Bird membership, join Nanaimo indoor-tennis community updates, offer your help and share your experience." },
    { property: "og:title", content: "Help build the next chapter of indoor tennis" },
    { property: "og:description", content: "Explore NAITS membership, community updates, ways to help and the historical indoor-tennis campaign archive." },
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

  const archiveActions = [
    ["Original community petition", "https://www.change.org/p/urge-nanaimo-to-preserve-westwood-lake-indoor-tennis-courts"],
    ["City of Nanaimo Council", "https://www.nanaimo.ca/your-government/city-council"],
    ["Council meetings", "https://www.nanaimo.ca/your-government/city-council/council-meetings"],
  ];

  return <>
    <section className="relative overflow-hidden border-b border-border bg-primary text-primary-foreground">
      <img src="/20260927_132724.jpg" alt="Exterior of the Westwood Lake indoor tennis facility" className="absolute inset-0 size-full object-cover object-center" />
      <div className="absolute inset-0 bg-primary/78" />
      <div className="page-wrap relative py-16 sm:py-20">
        <p className="text-xs font-bold uppercase tracking-[.14em] text-primary-foreground/70">Get involved</p>
        <h1 className="mt-4 max-w-4xl font-serif text-4xl leading-tight sm:text-6xl">Help shape the next chapter of indoor tennis.</h1>
        <p className="mt-6 max-w-3xl text-base leading-7 text-primary-foreground/85 sm:text-lg">With the Westwood bubble retained and NAITS preparing for its next chapter, the focus is now on membership, community connections and the transition toward year-round indoor tennis. The City–NAITS operating agreement is not yet finalized.</p>
      </div>
    </section>
    <section className="section-space">
      <div className="page-wrap">
        <p className="eyebrow">Ways to participate</p>
        <h2 className="mt-2 font-serif text-3xl sm:text-4xl">Choose how you would like to help.</h2>
        <div className="mt-7 grid gap-4 md:grid-cols-3">
          <article className="civic-card flex flex-col p-6"><HeartHandshake className="size-7 text-ring" /><h3 className="mt-4 font-serif text-2xl">Become a founding member</h3><p className="mt-3 flex-1 text-sm leading-7 text-muted-foreground">Explore NAITS Early Bird memberships for January–March 2027, including rates, the optional October–December extension, refund terms and application instructions. Benefits remain subject to the operating agreement.</p><Button asChild className="mt-5 w-fit"><Link to="/membership">Explore membership<ArrowRight /></Link></Button></article>
          <article className="civic-card flex flex-col p-6"><Users className="size-7 text-ring" /><h3 className="mt-4 font-serif text-2xl">Stay connected</h3><p className="mt-3 flex-1 text-sm leading-7 text-muted-foreground">Follow the Friends of Indoor Tennis in Nanaimo Google Group for shared announcements and community discussion. This is separate from a paid NAITS membership.</p><Button asChild variant="outline" className="mt-5 w-fit"><a href="https://groups.google.com/g/fitin2" target="_blank" rel="noreferrer">Community updates<ArrowUpRight /></a></Button></article>
          <article className="civic-card flex flex-col p-6"><Mail className="size-7 text-ring" /><h3 className="mt-4 font-serif text-2xl">Offer support or ask questions</h3><p className="mt-3 flex-1 text-sm leading-7 text-muted-foreground">Interested in helping during the transition? Reach out to NAITS to ask what support may be useful. Volunteer roles and facility arrangements have not yet been confirmed here.</p><Button asChild variant="outline" className="mt-5 w-fit"><a href="mailto:mark.chase.66@gmail.com?subject=NAITS%20Community%20Support">Contact NAITS<ArrowUpRight /></a></Button></article>
        </div>
      </div>
    </section>
    <section className="border-t border-border bg-secondary py-12 sm:py-16">
      <div className="page-wrap grid gap-10 lg:grid-cols-[.7fr_1.3fr] lg:gap-12">
        <div>
          <p className="eyebrow">Community stories</p>
          <h2 className="mt-2 font-serif text-3xl">Keep the community voice visible.</h2>
          <p className="mt-4 text-sm leading-7 text-muted-foreground">The original advocacy campaign helped document why indoor tennis matters. You can still share your experience for review. This is not a membership application or an official facility booking request.</p>
        </div>
        <div className="civic-card p-5 sm:p-8">
          <p className="text-xs font-bold uppercase tracking-[.14em] text-muted-foreground">Community experiences</p>
          <h2 className="mt-3 font-serif text-3xl">What has indoor tennis meant to you or your family?</h2>
          <p className="mt-3 text-sm leading-6 text-muted-foreground">Submissions are reviewed before any public use. Nothing is published automatically.</p>
          {state === "sent" ? <div className="mt-7 flex gap-3 border border-border bg-secondary p-5 sm:mt-8"><CheckCircle2 className="size-5 text-ring"/><div><p className="font-semibold">Thank you for sharing your experience.</p><p className="mt-1 text-sm text-muted-foreground">Your submission has been received for review.</p></div></div> : <form onSubmit={submit} className="mt-6 grid gap-4 sm:mt-8 sm:gap-5">
            <div className="grid gap-4 sm:grid-cols-2 sm:gap-5"><div><Label htmlFor="name">Name</Label><Input id="name" name="name" required maxLength={100} className="mt-1.5 sm:mt-2"/></div><div><Label htmlFor="email">Email</Label><Input id="email" name="email" type="email" required maxLength={255} className="mt-1.5 sm:mt-2"/></div></div>
            <div><Label htmlFor="relationship">Connection to indoor tennis</Label><Input id="relationship" name="relationship" required maxLength={160} className="mt-1.5 sm:mt-2" placeholder="Player, parent, coach, neighbour, Nanaimo resident…"/></div>
            <div><Label htmlFor="story">Your story</Label><Textarea id="story" name="story" required minLength={20} maxLength={5000} className="mt-1.5 min-h-28 sm:mt-2 sm:min-h-36"/></div>
            <div className="flex items-start gap-3 pt-1"><Checkbox id="consent" checked={consent} onCheckedChange={(value) => setConsent(value === true)}/><Label htmlFor="consent" className="text-sm font-normal leading-5">I consent to this story being considered for public publication. My email will not be published.</Label></div>
            <p className="text-xs leading-5 text-muted-foreground">Your name, email and submission are used only to review and verify community stories for this project. Public publication requires the consent above.</p>
            {state === "error" && <p className="text-sm text-destructive">Your story could not be submitted. Please check the fields and try again.</p>}
            <Button type="submit" disabled={state === "sending"} className="mt-1 w-fit">{state === "sending" ? "Submitting…" : "Submit for review"}</Button>
          </form>}
        </div>
      </div>
    </section>
    <section className="border-t border-border bg-background py-10 sm:py-12">
      <div className="page-wrap">
        <p className="eyebrow">Historical campaign archive</p>
        <h2 className="mt-2 font-serif text-2xl sm:text-3xl">How the community helped preserve the bubble.</h2>
        <p className="mt-3 max-w-3xl text-sm leading-7 text-muted-foreground">The petition and Council advocacy were part of the earlier effort to preserve the Westwood facility. These links remain for the public record; they are not current membership application steps.</p>
        <div className="mt-5 flex flex-wrap gap-3">
          {archiveActions.map(([label, url]) => <a key={url} href={url} target="_blank" rel="noreferrer" className="inline-flex items-center gap-2 border border-border bg-card px-4 py-3 text-sm font-semibold hover:border-ring">{label}<ArrowUpRight className="size-4" /></a>)}
          <Button asChild variant="outline"><Link to="/timeline">Full timeline<ArrowRight /></Link></Button>
        </div>
      </div>
    </section>
  </>;
}
