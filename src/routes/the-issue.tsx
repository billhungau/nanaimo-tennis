import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight, ArrowUpRight, Check } from "lucide-react";
import { Button } from "@/components/ui/button";
import { SectionHeading } from "@/components/page-elements";

const cityAnnouncementUrl = "https://www.nanaimo.ca/NewsReleases/NR261020CouncilVotesToRetainTennisBubbleAsPartOfNewLandAcquisition.html";

export const Route = createFileRoute("/the-issue")({
  head: () => ({ meta: [
    { title: "Current Status | Nanaimo Tennis" },
    { name: "description", content: "Current status of the Westwood Lake indoor tennis facility after Nanaimo City Council voted to retain the tennis bubble." },
    { property: "og:title", content: "Current status of indoor tennis at Westwood Lake" },
    { property: "og:description", content: "Council has voted to retain the bubble. An operating agreement and reopening arrangements are still being developed." },
    { property: "og:type", content: "article" },
    { property: "og:url", content: "https://www.nanaimotennis.ca/the-issue" },
    { name: "twitter:card", content: "summary_large_image" },
  ], links: [{ rel: "canonical", href: "https://www.nanaimotennis.ca/the-issue" }] }),
  component: IssuePage,
});

function IssuePage() {
  const currentSteps = [
    "Council has voted to support retaining the tennis bubble.",
    "The City is working with the Nanaimo Area Indoor Tennis Society (NAITS) to develop the Licence of Use Agreement and operating model.",
    "The operating arrangement is to be cost-neutral to the City.",
    "A portion of court time is to be available for public booking.",
    "The current club is scheduled to cease operations November 1.",
    "The City is scheduled to take ownership December 18.",
  ];

  const openQuestions = [
    "When will the agreement be approved?",
    "When will the indoor courts reopen?",
    "How much court time will be available for public booking?",
    "What will the fees and booking process be?",
    "What arrangement will follow the initial operating term?",
  ];

  return <>
    <section className="relative overflow-hidden bg-primary text-primary-foreground">
      <img
        src="/20260927_132803.jpg"
        alt="Indoor tennis courts inside the Westwood Lake facility"
        className="absolute inset-0 size-full object-cover object-center"
      />
      <div className="absolute inset-0 bg-primary/78" />
      <div className="page-wrap relative py-16 sm:py-20">
        <p className="eyebrow text-primary-foreground/75">Current status</p>
        <h1 className="mt-4 max-w-4xl font-serif text-4xl leading-tight sm:text-6xl">Council has voted to retain the Westwood tennis bubble.</h1>
        <div className="mt-6 max-w-3xl text-base leading-7 text-primary-foreground/88 sm:text-lg">
          <p>On October 14, 2026, Nanaimo City Council voted to support retaining the bubble at 2367 Arbot Road. In formal correspondence dated October 16, the City confirmed that it wants to work with the Nanaimo Area Indoor Tennis Society (NAITS) to develop the draft Licence of Use Agreement and operating model. The City announced Council's retention decision publicly on October 20.</p>
        </div>
        <div className="mt-7 flex flex-wrap gap-3">
          <Button asChild size="lg" className="bg-background text-foreground hover:bg-background/90"><a href={cityAnnouncementUrl} target="_blank" rel="noreferrer">Read the City announcement<ArrowUpRight /></a></Button>
          <Button asChild size="lg" variant="outline" className="border-primary-foreground/45 bg-transparent text-primary-foreground hover:bg-primary-foreground/10 hover:text-primary-foreground"><Link to="/timeline">View timeline<ArrowRight /></Link></Button>
        </div>
      </div>
    </section>

    <section className="section-space">
      <div className="page-wrap grid gap-12 lg:grid-cols-[.8fr_1.2fr]">
        <div><SectionHeading eyebrow="Where things stand" title="The direction has changed. The transition is not complete."/></div>
        <div>
          <p className="leading-8 text-muted-foreground">The City's September announcement contemplated removal of the bubble. Council has since changed direction and now supports retaining it. The City has formally moved into the next phase with NAITS, asking the Society to work with staff on the draft operating agreement and operating model. The City's October 16 correspondence identifies NAITS as the organization it intends to work with to develop the operating agreement.</p>
          <p className="mt-5 leading-8 text-muted-foreground">Public access will not continue uninterrupted. The current club is scheduled to close November 1, and the facility will be unavailable during the transition. Public access would resume only after an agreement is approved and the facility is ready for operation.</p>
        </div>
      </div>
    </section>

    <section className="section-space bg-secondary">
      <div className="page-wrap">
        <SectionHeading eyebrow="Confirmed in the public record" title="What Council has directed"/>
        <div className="mt-7 grid gap-3 md:grid-cols-2">
          {currentSteps.map((item) => <div className="flex gap-4 border border-border bg-card px-4 py-4" key={item}><span className="grid size-6 shrink-0 place-items-center rounded-full bg-accent text-accent-foreground"><Check className="size-3.5"/></span><p className="text-sm font-medium leading-6">{item}</p></div>)}
        </div>
      </div>
    </section>

    <section className="relative overflow-hidden text-primary-foreground">
      <img
        src="/20260927_132624.jpg"
        alt="Exterior of the Westwood Lake indoor tennis facility"
        className="absolute inset-0 size-full object-cover object-center"
      />
      <div className="absolute inset-0 bg-primary/82" />
      <div className="page-wrap relative section-space grid gap-12 lg:grid-cols-[.8fr_1.2fr]">
        <div className="[&_.eyebrow]:text-primary-foreground/70 [&_h2]:text-primary-foreground">
          <SectionHeading eyebrow="What happens next" title="An operating agreement still has to be completed."/>
        </div>
        <div className="space-y-5 text-base leading-8 text-primary-foreground/82">
          <p>The City is working with NAITS to develop a comprehensive operating agreement that is cost-neutral to the City. Under Council's direction, the non-profit operator will be responsible for ongoing operating, maintenance, capital costs and liability associated with the facility.</p>
          <p>Council has also directed that a portion of court time be made available for public booking. The detailed booking model, fees and reopening date have not yet been announced.</p>
        </div>
      </div>
    </section>

    <section className="section-space bg-secondary">
      <div className="page-wrap grid gap-12 lg:grid-cols-[.75fr_1.25fr]">
        <div><SectionHeading eyebrow="Still unresolved" title="Important details remain to be determined."/><Button asChild className="mt-8"><Link to="/evidence">See the evidence<ArrowRight /></Link></Button></div>
        <div className="border-t border-border">{openQuestions.map((item) => <article key={item} className="border-b border-border py-6"><p className="text-sm leading-6 text-muted-foreground">{item}</p></article>)}</div>
      </div>
    </section>

    <section className="section-space">
      <div className="page-wrap grid gap-12 lg:grid-cols-[.8fr_1.2fr]">
        <SectionHeading eyebrow="How we got here" title="The earlier campaign remains part of the public record."/>
        <div>
          <p className="leading-8 text-muted-foreground">The September announcement, community petition, media coverage, candidate questionnaire and public advocacy documented concerns about removing Nanaimo's only indoor tennis facility before alternatives were assessed. Those materials remain available in the Timeline, Evidence and Sources sections as historical context.</p>
          <div className="mt-6 flex flex-wrap gap-3">
            <Button asChild variant="outline"><Link to="/timeline">View timeline<ArrowRight /></Link></Button>
            <Button asChild variant="ghost"><Link to="/sources">Browse sources<ArrowRight /></Link></Button>
          </div>
        </div>
      </div>
    </section>
  </>;
}
