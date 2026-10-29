import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight, ArrowUpRight, CheckCircle2, Clock3 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { SectionHeading } from "@/components/page-elements";
import heroImage from "@/assets/indoor-tennis-community.jpg";
import { OptimizedImage } from "@/components/optimized-image";

const cityDecisionUrl = "https://www.nanaimo.ca/NewsReleases/NR261020CouncilVotesToRetainTennisBubbleAsPartOfNewLandAcquisition.html";
const cityLetterUrl = "/city-of-nanaimo-next-steps-westwood-tennis-bubble-2026-10-16.pdf";
const chekUrl = "https://cheknews.ca/nanaimo-backs-plan-to-keep-westwood-tennis-bubble-open-1354842/";
const nnnUrl = "https://nanaimonewsnow.com/2026/10/20/tennis-bubble-to-remain-as-city-of-nanaimo-continuing-westwood-lake-land-purchase/";
const cbcUrl = "https://www.cbc.ca/news/canada/british-columbia/nanaimo-indoor-tennis-continue-operations-now-as-public-facility-9.7021310";
const chlyUrl = "https://www.chly.ca/local-news/2026/10/27/aging-tennis-bubble-saved-by-community-advocates";
const petitionUrl = "https://www.change.org/p/urge-nanaimo-to-preserve-westwood-lake-indoor-tennis-courts";

export const Route = createFileRoute("/")({
  head: () => ({ meta: [
    { title: "Westwood Indoor Tennis | Current Status in Nanaimo" },
    { name: "description", content: "Current public record on the Westwood Lake tennis bubble after Nanaimo City Council voted to retain the facility and pursue a non-profit operating agreement." },
    { property: "og:title", content: "Council votes to retain the Westwood tennis bubble" },
    { property: "og:description", content: "Track the current status, evidence, sources and next steps for year-round indoor tennis in Nanaimo." },
    { property: "og:type", content: "website" },
    { property: "og:url", content: "https://www.nanaimotennis.ca/" },
    { name: "twitter:card", content: "summary_large_image" },
  ], links: [{ rel: "canonical", href: "https://www.nanaimotennis.ca/" }] }),
  component: Index,
});

function Index() {
  const status = [
    ["Bubble", "Council supports retention", true],
    ["Operating partner", "NAITS · agreement in development", true],
    ["Current club", "Scheduled to close Nov. 1", false],
    ["Public access", "After approval and readiness", false],
  ] as const;

  const reasons = [
    ["Year-round access", "Reliable recreation through Nanaimo's wet fall and winter months."],
    ["Junior and community programming", "Children's instruction, adult recreation and broader community use."],
    ["Existing indoor capacity", "Four indoor courts already exist while longer-term recreation planning continues."],
  ];

  const news = [
    ["CHLY 101.7FM", "Aging tennis bubble saved by community advocates", chlyUrl, "News"],
    ["City of Nanaimo", "Council votes to retain tennis bubble as part of new land acquisition", cityDecisionUrl, "Primary source"],
    ["CBC News", "Nanaimo indoor tennis to continue operations as public facility", cbcUrl, "News"],
    ["CHEK News", "Nanaimo backs plan to keep Westwood tennis bubble open", chekUrl, "News"],
    ["NanaimoNewsNOW", "Tennis bubble to remain as City continues Westwood Lake land purchase", nnnUrl, "News"],
  ];

  return <>
    <section className="relative min-h-[560px] overflow-hidden bg-primary text-primary-foreground sm:min-h-[680px]">
      <img src={heroImage} alt="Community players on indoor tennis courts beneath an air-supported roof" width={1920} height={1088} fetchPriority="high" loading="eager" decoding="async" className="absolute inset-0 size-full object-cover" />
      <div className="absolute inset-0 bg-gradient-to-r from-primary/90 via-primary/82 to-primary/65" />
      <div className="page-wrap relative flex min-h-[560px] items-end py-10 sm:min-h-[680px] sm:py-20">
        <div className="max-w-4xl reveal">
          <h1 className="font-serif text-4xl leading-[1.1] sm:text-6xl lg:text-7xl">Council has voted to retain the Westwood tennis bubble.</h1>
          <div className="mt-5 inline-flex items-center border border-accent/60 bg-accent/90 px-3 py-1.5 text-xs font-bold uppercase tracking-[.12em] text-accent-foreground sm:mt-7">City working with NAITS</div>
          <p className="mt-4 max-w-3xl text-base leading-7 text-primary-foreground/88 sm:text-lg">The City of Nanaimo is now working with the <strong className="font-semibold text-primary-foreground">Nanaimo Area Indoor Tennis Society (NAITS)</strong> to develop the one-year Licence of Use Agreement for the facility's future operation. Council's direction requires a cost-neutral operating model and public access.</p>
          <div className="mt-6 flex flex-wrap gap-3 sm:mt-8">
            <Button asChild size="lg" className="bg-background text-foreground hover:bg-background/90"><Link to="/the-issue">Current status<ArrowRight /></Link></Button>
            <Button asChild size="lg" variant="outline" className="border-primary-foreground/45 bg-transparent text-primary-foreground hover:bg-primary-foreground/10 hover:text-primary-foreground"><a href={cityDecisionUrl} target="_blank" rel="noreferrer">City announcement<ArrowUpRight /></a></Button>
          </div>
        </div>
      </div>
    </section>

    <section className="border-y border-border bg-card">
      <div className="page-wrap grid md:grid-cols-4 md:divide-x md:divide-border">
        {status.map(([label, text, complete]) => <div key={label} className="flex min-h-[96px] gap-3 border-b border-border px-4 py-5 last:border-b-0 md:border-b-0">
          {complete ? <CheckCircle2 className="mt-0.5 size-5 shrink-0 text-ring" /> : <Clock3 className="mt-0.5 size-5 shrink-0 text-muted-foreground" />}
          <div><p className="text-[11px] font-bold uppercase tracking-[.12em] text-muted-foreground">{label}</p><p className="mt-1 text-sm font-semibold leading-5">{text}</p></div>
        </div>)}
      </div>
    </section>

    <section className="border-b border-border bg-background py-9 sm:py-11">
      <div className="page-wrap grid gap-6 lg:grid-cols-[.8fr_1.2fr] lg:items-center">
        <div>
          <p className="eyebrow">City–NAITS next step</p>
          <h2 className="mt-2 font-serif text-3xl leading-tight sm:text-4xl">The City is working with NAITS on operation of the facility.</h2>
        </div>
        <div>
          <p className="text-sm leading-7 text-muted-foreground">In formal correspondence dated October 16, the City confirmed that it wants to work with the Nanaimo Area Indoor Tennis Society (NAITS) to develop the draft one-year Licence of Use Agreement and operating model for the Westwood tennis bubble.</p>
          <p className="mt-3 text-sm leading-7 text-muted-foreground">The remaining work is to establish the detailed operating terms, public-booking arrangements and transition to reopening.</p>
          <div className="mt-5"><Button asChild variant="outline"><Link to="/press-release-naits-non-profit-to-run-indoor-tennis-in-nanaimo">Read the NAITS press release<ArrowRight /></Link></Button></div>
          <div className="mt-5"><Button asChild variant="outline"><a href={cityLetterUrl} target="_blank" rel="noreferrer">Read the October 16 City letter<ArrowUpRight /></a></Button></div>
        </div>
      </div>
    </section>

    <section className="border-b border-border bg-[#F7F0D7] py-10 sm:py-14">
      <div className="page-wrap">
        <div className="grid gap-6 lg:grid-cols-[.8fr_1.2fr] lg:items-end">
          <div>
            <p className="eyebrow">Latest coverage · October 27, 2026</p>
            <h2 className="mt-2 font-serif text-3xl leading-tight sm:text-4xl">Local reporting documents how the decision changed.</h2>
          </div>
          <p className="max-w-3xl text-sm leading-7 text-muted-foreground">CHLY's October 27 report quotes the City's Parks, Recreation and Culture director saying Council heard from indoor-tennis advocates and reconsidered removal of the bubble. The City, CBC, CHEK News and NanaimoNewsNOW have also reported on the retention decision and transition toward a non-profit operating arrangement.</p>
        </div>
        <div className="mt-7 grid gap-3 md:grid-cols-2">
          {news.map(([publisher, title, url, type]) => <article key={url} className="civic-card p-5 sm:p-6">
            <div className="flex items-center justify-between gap-3"><p className="text-xs font-semibold text-muted-foreground">{publisher}</p><span className="rounded-sm bg-secondary px-2 py-1 text-[10px] font-semibold">{type}</span></div>
            <h3 className="mt-3 font-serif text-xl leading-7">{title}</h3>
            <a href={url} target="_blank" rel="noreferrer" className="mt-4 inline-flex items-center gap-1 text-sm font-semibold hover:text-ring">Read source<ArrowUpRight className="size-4" /></a>
          </article>)}
        </div>
      </div>
    </section>

    <section className="relative overflow-hidden py-12 text-primary-foreground sm:section-space">
      <OptimizedImage src="/20260927_132803.jpg" widths={[640, 960, 1440, 1920]} sizes="100vw" loading="lazy" decoding="async" alt="Indoor tennis courts at the Westwood Lake facility" className="absolute inset-0 size-full object-cover object-center" />
      <div className="absolute inset-0 bg-primary/80" />
      <div className="page-wrap relative grid gap-8 lg:grid-cols-[.8fr_1.2fr] lg:gap-12">
        <div className="[&_h2]:!text-3xl [&_.eyebrow]:text-primary-foreground/70 sm:[&_h2]:!text-4xl"><SectionHeading eyebrow="What happens next" title="Retention has been decided. Reopening has not."/></div>
        <div className="space-y-5 text-base leading-8 text-primary-foreground/82">
          <p>City staff are now working with NAITS to develop the operating agreement. Council's direction is that the arrangement be cost-neutral to the City and include a portion of court time for public booking.</p>
          <div className="border-l-4 border-accent bg-background/95 p-5 text-foreground shadow-sm sm:p-6"><strong>The unresolved questions are operational:</strong> final agreement terms, reopening timing, public-booking allocation, fees and how community access will work in practice.</div>
          <Button asChild variant="outline" className="border-primary-foreground/40 bg-background/10 text-primary-foreground hover:bg-primary-foreground/10 hover:text-primary-foreground"><Link to="/the-issue">See current status<ArrowRight /></Link></Button>
        </div>
      </div>
    </section>

    <section className="relative overflow-hidden py-10 sm:py-12">
      <OptimizedImage src="/20260927_132624.jpg" widths={[640, 960, 1440, 1920]} sizes="100vw" loading="lazy" decoding="async" alt="Exterior of the Westwood Lake indoor tennis facility" className="absolute inset-0 size-full object-cover object-center" />
      <div className="absolute inset-0 bg-background/90" />
      <div className="page-wrap relative">
        <SectionHeading eyebrow="Why this matters" title="What year-round indoor tennis contributes"/>
        <div className="mt-7 grid gap-px overflow-hidden border border-foreground/15 bg-foreground/15 md:grid-cols-3">{reasons.map(([title,text]) => <article className="bg-background/95 p-5 sm:p-6" key={title}><h3 className="font-serif text-xl">{title}</h3><p className="mt-2 text-sm leading-6 text-foreground/70">{text}</p></article>)}</div>
      </div>
    </section>

    <section className="border-y border-border bg-card py-8 sm:py-10">
      <div className="page-wrap">
        <div className="grid gap-6 lg:grid-cols-[1fr_auto] lg:items-center">
          <div><p className="eyebrow">City recreation records · 2023–2025</p><h2 className="mt-2 font-serif text-3xl sm:text-4xl">City tennis registrations rose 63%.</h2><p className="mt-3 max-w-2xl text-sm leading-6 text-muted-foreground">City records show participation increasing as the number of tennis programs offered also expanded.</p></div>
          <Button asChild variant="outline" className="w-fit"><Link to="/evidence" hash="city-registration-data">View participation data<ArrowRight /></Link></Button>
        </div>
        <div className="mt-6 grid grid-cols-3 overflow-hidden border border-border bg-border">
          {[["2023","410"],["2024","564"],["2025","669"]].map(([year,value]) => <div key={year} className="bg-background p-4 text-center sm:p-5"><p className="text-[10px] font-bold uppercase tracking-[.12em] text-muted-foreground sm:text-xs">{year}</p><p className="mt-1 font-serif text-3xl font-bold tabular-nums sm:text-4xl">{value}</p></div>)}
        </div>
      </div>
    </section>

    <section className="bg-secondary py-12 sm:py-14">
      <div className="page-wrap grid gap-10 lg:grid-cols-[.8fr_1.2fr] lg:items-start">
        <div><SectionHeading eyebrow="How we got here" title="The campaign is now part of the historical record."/></div>
        <div>
          <p className="text-base leading-8 text-muted-foreground">In September, the City announced that the bubble would be removed. Community members responded with a petition, public advocacy, media coverage and a candidate questionnaire asking that alternatives be examined before an irreversible decision was made. CHLY later reported that the City said Council heard from indoor-tennis advocates and that this gave Council cause to reconsider retaining the bubble. Council subsequently voted to retain the facility.</p>
          <div className="mt-6 flex flex-wrap gap-3">
            <Button asChild variant="outline"><Link to="/timeline">View the full timeline<ArrowRight /></Link></Button>
            <Button asChild variant="ghost"><a href={petitionUrl} target="_blank" rel="noreferrer">Campaign petition archive<ArrowUpRight /></a></Button>
          </div>
        </div>
      </div>
    </section>

    <section className="border-y border-border bg-background py-8 sm:py-10">
      <div className="page-wrap flex flex-col justify-between gap-5 md:flex-row md:items-center">
        <div><p className="eyebrow">2026 municipal election archive</p><h2 className="mt-2 font-serif text-2xl sm:text-3xl">Candidate responses remain available as part of the public record.</h2><p className="mt-2 max-w-2xl text-sm leading-6 text-muted-foreground">The pre-election questionnaire asked candidates about the Westwood facility, alternative operating models and long-term indoor racquet-sport planning.</p></div>
        <Button asChild variant="outline" className="w-fit shrink-0"><Link to="/candidates">View election archive<ArrowRight /></Link></Button>
      </div>
    </section>

    <section className="bg-accent"><div className="page-wrap flex flex-col items-start justify-between gap-5 py-9 md:flex-row md:items-center"><div><p className="eyebrow text-accent-foreground/65">Stay informed</p><h2 className="mt-2 font-serif text-3xl text-accent-foreground">Follow the transition.</h2></div><Button asChild size="lg"><Link to="/join">Get updates<ArrowRight /></Link></Button></div></section>
  </>;
}
