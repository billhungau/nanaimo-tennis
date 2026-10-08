import { createFileRoute } from "@tanstack/react-router";
import { Link } from "@tanstack/react-router";
import { ArrowRight, ArrowUpRight, Compass, MessageSquareText, Scale, Search, type LucideIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { SectionHeading } from "@/components/page-elements";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import heroImage from "@/assets/indoor-tennis-community.jpg";
import { OptimizedImage } from "@/components/optimized-image";

const petitionUrl = "https://www.change.org/p/urge-nanaimo-to-preserve-westwood-lake-indoor-tennis-courts";
const cbcVideoUrl = "https://www.youtube.com/watch?v=oCYB8IJWwFI";
const cbcEmbedUrl = "https://www.youtube.com/embed/oCYB8IJWwFI";
const chekArticleUrl = "https://cheknews.ca/i-was-very-sad-players-fight-to-save-indoor-tennis-in-nanaimo-1352143/";
const chekVideoUrl = "https://cdn.jwplayer.com/videos/uOcT0IcT-1svo8HSH.mp4";

export const Route = createFileRoute("/")({
  head: () => ({ meta: [
    { title: "Future of Indoor Tennis in Nanaimo | Westwood Lake Tennis Courts" },
    { name: "description", content: "Independent information about the future of indoor tennis at Westwood Lake in Nanaimo, including City documents, news coverage, community proposals and 2026 municipal candidate positions." },
    { property: "og:title", content: "Future of Indoor Tennis in Nanaimo" },
    { property: "og:description", content: "An independent, evidence-led guide to the Westwood Lake tennis facility and the choices ahead." },
    { property: "og:type", content: "website" }, { property: "og:url", content: "https://www.nanaimotennis.ca/" }, { name: "twitter:card", content: "summary_large_image" },
  ], links: [{ rel: "canonical", href: "https://www.nanaimotennis.ca/" }] }),
  component: Index,
});

function Index() {
  const principles: Array<[LucideIcon, string, string]> = [
    [Search, "Assess", "Understand the facility's condition, useful life and costs."],
    [MessageSquareText, "Consult", "Hear from residents, users and the wider recreation community."],
    [Compass, "Explore options", "Test nonprofit, lease, partnership and community models."],
    [Scale, "Decide", "Make an informed public decision once the evidence is available."],
  ];
  const reasons: Array<[string, string]> = [
    ["Year-round access", "Reliable recreation through Nanaimo's wet fall and winter months."],
    ["Junior and community programming", "Children's instruction, adult recreation and broader community use."],
    ["Replacement would take time", "Comparable indoor capacity would require future planning, funding and construction."],
  ];
  const faqs: Array<[string, string]> = [
    ["Are you asking the City to reverse the property purchase?", "No. The land purchase and the future of the existing indoor tennis facility are separate questions. This site focuses on whether the indoor facility should be assessed before it is removed."],
    ["Are you asking taxpayers to subsidize a private tennis club?", "No specific operating model is being proposed. Options such as nonprofit, lease and partnership models can be evaluated before a decision is made."],
    ["Why act now?", "Once the indoor structure is removed, retaining the existing facility is no longer an option. A temporary pause would allow additional information to be gathered first."],
  ];
  const facts = ["4 indoor courts", "Year-round access", "Junior & adult programs", "City recreation programming"];

  return <>
    <Link
      to="/candidates"
      className="sticky top-18 z-40 block border-b border-[#D1AE35] bg-[#F2D36B] text-[#102A3D] shadow-sm transition-colors hover:bg-[#EBCB5A]"
      aria-label="Compare candidate positions on year-round indoor tennis before the October 17 Nanaimo election"
    >
      <div className="page-wrap flex flex-col gap-1 py-2.5 sm:flex-row sm:items-center sm:justify-between sm:gap-4 sm:py-3">
        <div className="flex min-w-0 flex-wrap items-center gap-x-2 gap-y-1">
          <span className="rounded-sm bg-[#102A3D] px-2 py-1 text-[10px] font-bold uppercase tracking-[.12em] text-[#F7F0D7]">Oct 17 · Nanaimo election</span>
          <span className="font-semibold">See where candidates stand on year-round indoor tennis.</span>
        </div>
        <div className="flex shrink-0 items-center gap-2 text-xs font-semibold sm:text-sm">
          <span>Compare candidate positions</span>
          <ArrowRight className="size-4" />
        </div>
      </div>
    </Link>

    <section className="relative min-h-[560px] overflow-hidden bg-primary text-primary-foreground sm:min-h-[680px]">
      <img src={heroImage} alt="Community players on indoor tennis courts beneath an air-supported roof" width={1920} height={1088} fetchPriority="high" loading="eager" decoding="async" className="absolute inset-0 size-full object-cover" />
      <div className="absolute inset-0 bg-primary/75" />
      <div className="page-wrap relative flex min-h-[560px] items-end py-10 sm:min-h-[680px] sm:py-20">
        <div className="max-w-4xl reveal"><p className="mb-4 text-xs font-bold uppercase tracking-[.14em] text-primary-foreground/70 sm:mb-5">A community information initiative · Nanaimo, BC</p><h1 className="font-serif text-4xl leading-[1.1] sm:text-6xl lg:text-7xl">Before an existing indoor tennis facility is removed, let's examine the alternatives.</h1><p className="mt-5 max-w-3xl text-base leading-7 text-primary-foreground/85 sm:mt-7 sm:text-lg">The City of Nanaimo has purchased the Westwood Lake Tennis Club property. Before the existing indoor courts are removed, this site asks that the facility, community demand and practical operating alternatives be assessed through the public process.</p><div className="mt-6 flex flex-wrap gap-3 sm:mt-8"><Button asChild size="lg" className="bg-background text-foreground hover:bg-background/90"><Link to="/the-issue">Understand the issue<ArrowRight /></Link></Button><Button asChild size="lg" variant="outline" className="border-primary-foreground/45 bg-transparent text-primary-foreground hover:bg-primary-foreground/10 hover:text-primary-foreground"><Link to="/candidates">View candidate results</Link></Button></div></div>
      </div>
    </section>

    <section className="border-y border-border bg-card">
      <div className="grid grid-cols-2 md:hidden">
        {facts.map((fact, index) => <div key={fact} className={`flex min-h-[72px] items-center justify-center px-3 py-3 text-center text-sm font-semibold leading-5 ${index < 2 ? "border-b border-border" : ""} ${index % 2 === 0 ? "border-r border-border" : ""}`}>{fact}</div>)}
        <div className="col-span-2 flex min-h-[82px] flex-col items-center justify-center border-t border-border bg-[#F2D36B] px-4 py-3 text-center text-[#102A3D]">
          <span className="text-[11px] font-bold uppercase tracking-[.14em] opacity-75">Expected club closure</span>
          <span className="mt-1 font-serif text-3xl font-bold leading-none">Nov. 1</span>
        </div>
      </div>
      <div className="page-wrap hidden md:grid md:grid-cols-[repeat(4,minmax(0,1fr))_1.15fr] md:divide-x md:divide-border">
        {facts.map((fact) => <div key={fact} className="flex min-h-[76px] items-center justify-center px-4 py-4 text-center text-sm font-semibold">{fact}</div>)}
        <div className="flex min-h-[76px] flex-col items-center justify-center bg-[#F2D36B] px-4 py-3 text-center text-[#102A3D]">
          <span className="text-xs font-bold uppercase tracking-[.14em] opacity-75">Expected club closure</span>
          <span className="mt-1 font-serif text-2xl font-bold leading-none">Nov. 1</span>
        </div>
      </div>
    </section>

    <section className="border-b border-border bg-[#F7F0D7] py-10 sm:py-14">
      <div className="page-wrap grid gap-7 lg:grid-cols-[1.05fr_.95fr] lg:items-center lg:gap-12">
        <div>
          <div className="flex flex-wrap items-center gap-3"><p className="eyebrow">Featured on CHEK News</p><span className="text-xs font-semibold text-muted-foreground">October 7, 2026</span></div>
          <h2 className="mt-3 font-serif text-3xl leading-tight sm:text-4xl">What happens to young tennis players during a three-year gap without indoor courts?</h2>
          <p className="mt-4 text-sm leading-7 text-foreground/80">CHEK News spoke with young players, their coach and the City about the planned Westwood Lake indoor tennis closure. The City expects a replacement facility at Beban Park in approximately three years, but has not identified a plan to keep the existing bubble operating in the meantime.</p>
          <p className="mt-3 text-sm leading-7 text-foreground/80">Head coach Whitman Tomusiak warned that a gap of this length could interrupt tennis development for a generation of young players. Community members have proposed an interim nonprofit lease; the City told CHEK that keeping the bubble open is not currently an option.</p>
        </div>
        <div className="overflow-hidden border border-border bg-background shadow-sm">
          <div className="relative aspect-video overflow-hidden bg-black">
            <button
              type="button"
              className="group absolute inset-0 z-10 size-full overflow-hidden text-white"
              aria-label="Play the CHEK News report"
              onClick={(event) => {
                const container = event.currentTarget.parentElement;
                const video = container?.querySelector("video");
                if (video) {
                  video.src = chekVideoUrl;
                  video.classList.remove("hidden");
                  event.currentTarget.classList.add("hidden");
                  video.play().catch(() => { /* Native controls remain available if autoplay is blocked. */ });
                }
              }}
            >
              <img src="/cbc%20news%20cover%20photo%202.webp" width={1280} height={720} loading="lazy" decoding="async" alt="CHEK News reporter at the Westwood Lake Tennis Club" className="absolute inset-0 size-full object-cover transition-transform duration-300 group-hover:scale-105" />
              
              <span className="absolute inset-0 flex flex-col items-center justify-center gap-3 px-4 text-center">
                <span className="flex size-16 items-center justify-center rounded-full border-2 border-white bg-black/35 text-3xl shadow-md" aria-hidden="true">▶</span>
                <span className="font-semibold drop-shadow-md">Play CHEK News report</span>
              </span>
            </button>
            <video className="hidden size-full bg-black" controls playsInline preload="none" aria-label="CHEK News report on the future of indoor tennis in Nanaimo" />
          </div>
          <div className="flex flex-wrap items-center justify-between gap-2 border-t border-border px-4 py-3 text-xs leading-5 text-muted-foreground">
            <span>CHEK News · Skye Ryan · October 7, 2026</span>
            <a href={chekArticleUrl} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1 font-semibold text-foreground hover:text-accent">Original CHEK story<ArrowUpRight className="size-3.5" /></a>
          </div>
        </div>
      </div>
    </section>

    <section className="border-b border-border bg-[#F7F0D7] py-8 sm:py-10">
      <div className="page-wrap grid gap-6 lg:grid-cols-[1.08fr_.92fr] lg:items-center lg:gap-10">
        <figure className="overflow-hidden border border-border bg-background shadow-sm">
          <OptimizedImage src="/1000045918.jpg" widths={[480, 750, 1080, 1440]} sizes="(min-width: 1024px) 50vw, 100vw" loading="lazy" decoding="async" alt="Community members holding tennis racquets and signs in support of indoor tennis outside Oliver Woods Community Centre" className="aspect-[4/3] size-full object-cover" />
          <figcaption className="border-t border-border px-4 py-3 text-xs leading-5 text-muted-foreground">Community members gather at Oliver Woods Community Centre on October 4, 2026, in support of retaining year-round indoor tennis in Nanaimo.</figcaption>
        </figure>
        <div>
          <div className="flex flex-wrap items-center gap-3">
            <p className="eyebrow">Council update</p>
            <span className="bg-[#F2D36B] px-2.5 py-1 text-[11px] font-bold uppercase tracking-[.12em] text-[#102A3D]">Oct 5, 2026</span>
          </div>
          <h2 className="mt-2 font-serif text-3xl sm:text-4xl">Council met in camera before the October 5 regular meeting.</h2>
          <p className="mt-3 text-sm leading-6 text-muted-foreground">City Council held an in-camera session before the October 5 regular Council meeting. The Westwood indoor tennis facility was not subsequently addressed through a public motion during the regular meeting. Details of any Westwood-related discussion or decision made in camera have not been made public.</p>
          <div className="mt-5 border-l-4 border-accent bg-background/80 p-4 text-sm leading-6">
            <p className="font-semibold text-foreground">What happens next</p>
            <p className="mt-1 text-muted-foreground">With the October 5 Council meeting concluded, the October 17 municipal election is the next opportunity for residents to consider the future of year-round indoor tennis in Nanaimo. Candidates have stated their positions on preserving the existing facility and planning for indoor racquet sports.</p>
          </div>
          <Button asChild variant="outline" className="mt-5"><Link to="/candidates">See where candidates stand<ArrowRight /></Link></Button>
        </div>
      </div>
    </section>

    <section className="border-b border-border bg-secondary/70">
      <div className="page-wrap flex flex-col justify-between gap-5 py-7 md:flex-row md:items-center md:py-8">
        <div className="max-w-3xl"><p className="eyebrow">Community response</p><h2 className="mt-2 font-serif text-2xl">A public petition is asking the City to preserve the indoor courts while alternatives are assessed.</h2><p className="mt-2 text-sm leading-6 text-muted-foreground">The petition was launched September 17 and is hosted independently on Change.org.</p></div>
        <Button asChild variant="outline" className="w-fit shrink-0"><a href={petitionUrl} target="_blank" rel="noreferrer">Read the public petition<ArrowUpRight /></a></Button>
      </div>
    </section>

    <section className="border-b border-border bg-card py-12 sm:py-16">
      <div className="page-wrap grid gap-6 lg:grid-cols-[.85fr_1.15fr] lg:items-start lg:gap-x-12 lg:gap-y-5">
        <div className="lg:col-start-1 lg:row-start-1">
          <p className="eyebrow">In the news</p>
          <h2 className="mt-2 max-w-xl font-serif text-3xl leading-tight sm:text-[2.15rem]">CBC News examines the future of indoor tennis in Nanaimo.</h2>
          <p className="mt-4 text-sm leading-7 text-muted-foreground">CBC News reports on the planned removal of the indoor tennis bubble, concerns about losing year-round programming, and the City's longer-term consideration of racquet-sport facilities at Beban Park.</p>
        </div>
        <div className="overflow-hidden border border-border bg-secondary shadow-sm lg:col-start-2 lg:row-span-2 lg:row-start-1">
          <div className="aspect-video">
            <iframe className="size-full" src={cbcEmbedUrl} title="CBC News coverage of Westwood Lake indoor tennis" loading="lazy" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerPolicy="strict-origin-when-cross-origin" allowFullScreen />
          </div>
          <div className="border-t border-border px-4 py-3 text-xs leading-5 text-muted-foreground">CBC News · September 20, 2026</div>
        </div>
        <div className="lg:col-start-1 lg:row-start-2">
          <div className="border-l-4 border-accent bg-secondary/70 p-4 text-sm leading-6 sm:p-5"><span className="font-semibold">The immediate issue is the gap:</span> the existing indoor facility is planned to be removed before any future replacement facility is available.</div>
          <div className="mt-4 flex flex-wrap items-center gap-2 sm:gap-3">
            <Button asChild variant="outline"><a href={cbcVideoUrl} target="_blank" rel="noreferrer">Watch on YouTube<ArrowUpRight /></a></Button>
            <Button asChild variant="ghost" className="px-2 sm:px-4"><Link to="/sources">See source library<ArrowRight /></Link></Button>
          </div>
        </div>
      </div>
    </section>

    <section className="relative overflow-hidden py-12 text-primary-foreground sm:section-space">
      <OptimizedImage src="/20260927_132803.jpg" widths={[640, 960, 1440, 1920]} sizes="100vw" loading="lazy" decoding="async" alt="Indoor tennis courts at the Westwood Lake facility" className="absolute inset-0 size-full object-cover object-center" />
      <div className="absolute inset-0 bg-primary/80" />
      <div className="page-wrap relative grid gap-8 lg:grid-cols-[.8fr_1.2fr] lg:gap-12">
        <div className="[&_h2]:!text-3xl [&_.eyebrow]:text-primary-foreground/70 sm:[&_h2]:!text-4xl"><SectionHeading eyebrow="The central question" title="The question is not whether the City should own the land."/></div>
        <div className="space-y-5 text-base leading-8 text-primary-foreground/82 sm:space-y-6"><p>The acquisition of land beside Westwood Lake Park and the future of the existing indoor recreation facility are separate policy questions.</p><div className="border-l-4 border-accent bg-background/95 p-5 font-serif text-lg leading-7 text-foreground shadow-sm sm:p-7 sm:text-xl sm:leading-8">Should an existing indoor recreation facility be removed before public consultation is completed and alternative operating models have been assessed?</div></div>
      </div>
    </section>

    <section className="bg-secondary py-12 sm:py-14"><div className="page-wrap"><SectionHeading eyebrow="The community request" title="A pause, not a permanent commitment." copy="We are not asking the City to commit to operating a municipal tennis club. We are asking that removal be deferred while the facility, community demand and alternative operating models are properly assessed."/><div className="mt-7 grid grid-cols-2 gap-px overflow-hidden border border-border bg-border lg:grid-cols-4">{principles.map(([Icon, title, text]) => <article key={title as string} className="bg-card p-4 sm:p-5"><Icon className="size-5 text-ring"/><h3 className="mt-4 font-semibold">{title as string}</h3><p className="mt-2 text-xs leading-5 text-muted-foreground sm:text-sm">{text as string}</p></article>)}</div></div></section>

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

    <section className="relative overflow-hidden py-12 text-primary-foreground sm:py-14">
      <OptimizedImage src="/20260927_132724.jpg" widths={[640, 960, 1440, 1920]} sizes="100vw" loading="lazy" decoding="async" alt="Exterior view of the Westwood Lake indoor tennis bubble" className="absolute inset-0 size-full object-cover object-center" />
      <div className="absolute inset-0 bg-primary/84" />
      <div className="page-wrap relative grid gap-8 lg:grid-cols-[.7fr_1.3fr] lg:gap-12">
        <div className="[&_.eyebrow]:text-primary-foreground/70"><SectionHeading eyebrow="Latest developments" title="What has happened most recently"/></div>
        <div className="border-t border-primary-foreground/25">
          <article className="grid gap-2 border-b-2 border-primary-foreground/30 py-5 md:grid-cols-[8rem_1fr] md:gap-3"><p className="text-sm font-semibold">Oct 7, 2026</p><div><h3 className="font-serif text-xl">CHEK News reports on junior players and the indoor tennis gap</h3><p className="mt-2 text-sm leading-6 text-primary-foreground/75">Young players and coaches describe the consequences of the planned closure. CHEK reports that the City anticipates a replacement at Beban Park in approximately three years and does not currently plan to keep the existing bubble operating.</p><a href={chekArticleUrl} target="_blank" rel="noopener noreferrer" className="mt-3 inline-flex items-center gap-1 text-sm font-semibold hover:text-accent">Watch report<ArrowUpRight className="size-4"/></a></div></article>
          <article className="grid gap-2 border-b-2 border-primary-foreground/30 py-5 md:grid-cols-[8rem_1fr] md:gap-3"><p className="text-sm font-semibold">Oct 5, 2026</p><div><h3 className="font-serif text-xl">Council meets in camera before regular meeting</h3><p className="mt-2 text-sm leading-6 text-primary-foreground/75">City Council held an in-camera session before the October 5 regular meeting. The Westwood indoor tennis facility was not subsequently addressed through a public motion during the regular meeting. Details of any Westwood-related discussion or decision made in camera have not been made public.</p></div></article>
          <article className="grid gap-2 border-b border-primary-foreground/25 py-5 md:grid-cols-[8rem_1fr] md:gap-3"><p className="text-sm font-semibold">Oct 4, 2026</p><div><h3 className="font-serif text-xl">Community gathers at Oliver Woods</h3><p className="mt-2 text-sm leading-6 text-primary-foreground/75">Indoor tennis supporters gathered at Oliver Woods and spoke with members of Council and municipal candidates ahead of the October 5 Council meeting.</p></div></article>
          <article className="grid gap-2 border-b border-primary-foreground/25 py-5 md:grid-cols-[8rem_1fr] md:gap-3"><p className="text-sm font-semibold">Sep 25, 2026</p><div><h3 className="font-serif text-xl">Candidate questionnaire results published</h3><p className="mt-2 text-sm leading-6 text-primary-foreground/75">32 of 44 candidates responded to the Nanaimo Tennis questionnaire. Responses have been coded by question for easier review, alongside each candidate's original response.</p><Link to="/candidates" className="mt-3 inline-flex items-center gap-1 text-sm font-semibold hover:text-accent">View results<ArrowRight className="size-4"/></Link></div></article>
          <article className="grid gap-2 border-b border-primary-foreground/25 py-5 md:grid-cols-[8rem_1fr] md:gap-3"><p className="text-sm font-semibold">Sep 17, 2026</p><div><h3 className="font-serif text-xl">Public petition launched</h3><p className="mt-2 text-sm leading-6 text-primary-foreground/75">A community-organized petition asks City Council to preserve the indoor courts while alternatives are considered.</p><a href={petitionUrl} target="_blank" rel="noreferrer" className="mt-3 inline-flex items-center gap-1 text-sm font-semibold hover:text-accent">View petition<ArrowUpRight className="size-4"/></a></div></article>
          <article className="grid gap-2 border-b border-primary-foreground/25 py-5 md:grid-cols-[8rem_1fr] md:gap-3"><p className="text-sm font-semibold">Sep 16, 2026</p><div><h3 className="font-serif text-xl">City announces acquisition</h3><p className="mt-2 text-sm leading-6 text-primary-foreground/75">The City announces the purchase of the Westwood Lake Tennis Club property and says the bubble will be removed.</p></div></article>
        </div>
        <div className="lg:col-start-2"><Button asChild variant="outline" className="border-primary-foreground/40 bg-background/10 text-primary-foreground hover:bg-primary-foreground/10 hover:text-primary-foreground"><Link to="/timeline">View full timeline<ArrowRight /></Link></Button></div>
      </div>
    </section>

    <section className="border-y border-border bg-secondary/50 py-8 sm:py-10">
      <div className="page-wrap flex flex-col justify-between gap-5 md:flex-row md:items-center">
        <div><p className="eyebrow">October 17, 2026 · Nanaimo municipal election</p><h2 className="mt-2 font-serif text-2xl sm:text-3xl">Before you vote, compare the candidates' positions on indoor tennis.</h2><p className="mt-2 max-w-2xl text-sm leading-6 text-muted-foreground"><span className="font-semibold text-foreground">32 of 44 candidates responded · 72.7%.</span> Candidates were asked about pausing removal of the Westwood indoor facility, evaluating alternative operating models, and the role of year-round racquet-sport facilities in Nanaimo's long-term recreation planning. Original responses are available to read alongside the question-by-question results.</p></div>
        <Button asChild variant="outline" className="w-fit shrink-0"><Link to="/candidates">View questionnaire results<ArrowRight /></Link></Button>
      </div>
    </section>

    <section className="bg-secondary py-10 sm:py-12"><div className="page-wrap grid gap-8 lg:grid-cols-[.7fr_1.3fr] lg:gap-12"><SectionHeading eyebrow="Frequently asked" title="Clear answers to common questions"/><Accordion type="single" collapsible>{faqs.map(([q,a]) => <AccordionItem key={q} value={q}><AccordionTrigger className="py-4 text-base">{q}</AccordionTrigger><AccordionContent className="max-w-3xl pb-5 leading-7 text-muted-foreground">{a}</AccordionContent></AccordionItem>)}</Accordion></div></section>
    <section className="bg-accent"><div className="page-wrap flex flex-col items-start justify-between gap-5 py-9 md:flex-row md:items-center"><div><p className="eyebrow text-accent-foreground/65">Stay informed</p><h2 className="mt-2 font-serif text-3xl text-accent-foreground">Participate in the conversation.</h2></div><div className="flex flex-wrap gap-3"><Button asChild size="lg"><Link to="/get-involved">Ways to take part<ArrowRight /></Link></Button><Button asChild size="lg" variant="outline"><a href={petitionUrl} target="_blank" rel="noreferrer">Public petition<ArrowUpRight /></a></Button></div></div></section>
  </>;
}