import { createFileRoute } from "@tanstack/react-router";
import { Link } from "@tanstack/react-router";
import { ArrowRight, ArrowUpRight, Compass, MessageSquareText, Scale, Search, type LucideIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { SectionHeading, SourceLink } from "@/components/page-elements";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import heroImage from "@/assets/indoor-tennis-community.jpg";
import { timeline } from "@/lib/civic-data";

const petitionUrl = "https://www.change.org/p/urge-nanaimo-to-preserve-westwood-lake-indoor-tennis-courts";
const cbcVideoUrl = "https://www.youtube.com/watch?v=oCYB8IJWwFI";
const cbcEmbedUrl = "https://www.youtube.com/embed/oCYB8IJWwFI";

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
    ["Year-round access", "Indoor courts provide dependable recreational access during Nanaimo's wet fall and winter months."],
    ["Junior and community programming", "The facility has supported children's instruction, adult recreation and programming beyond club membership."],
    ["Replacement would take time", "If the facility is removed, comparable indoor capacity would require future planning, funding and construction."],
  ];
  const faqs: Array<[string, string]> = [
    ["Are you asking the City to reverse the property purchase?", "No. The land purchase and the future of the existing indoor tennis facility are separate questions. This site focuses on whether the indoor facility should be assessed before it is removed."],
    ["Are you asking taxpayers to subsidize a private tennis club?", "No specific operating model is being proposed. Options such as nonprofit, lease and partnership models can be evaluated before a decision is made."],
    ["Why act now?", "Once the indoor structure is removed, retaining the existing facility is no longer an option. A temporary pause would allow additional information to be gathered first."],
  ];
  const facts = ["4 indoor courts", "Year-round access", "Junior & adult programs", "City recreation programming"];

  return <>
    <section className="relative min-h-[560px] overflow-hidden bg-primary text-primary-foreground sm:min-h-[680px]">
      <img src={heroImage} alt="Community players on indoor tennis courts beneath an air-supported roof" width={1920} height={1088} className="absolute inset-0 size-full object-cover" />
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
            <iframe
              className="size-full"
              src={cbcEmbedUrl}
              title="CBC News coverage of Westwood Lake indoor tennis"
              loading="lazy"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
              referrerPolicy="strict-origin-when-cross-origin"
              allowFullScreen
            />
          </div>
          <div className="border-t border-border px-4 py-3 text-xs leading-5 text-muted-foreground">CBC News · September 20, 2026</div>
        </div>
        <div className="lg:col-start-1 lg:row-start-2">
          <div className="border-l-4 border-accent bg-secondary/70 p-4 text-sm leading-6 sm:p-5">
            <span className="font-semibold">The immediate issue is the gap:</span> the existing indoor facility is planned to be removed before any future replacement facility is available.
          </div>
          <div className="mt-4 flex flex-wrap items-center gap-2 sm:gap-3">
            <Button asChild variant="outline"><a href={cbcVideoUrl} target="_blank" rel="noreferrer">Watch on YouTube<ArrowUpRight /></a></Button>
            <Button asChild variant="ghost" className="px-2 sm:px-4"><Link to="/sources">See source library<ArrowRight /></Link></Button>
          </div>
        </div>
      </div>
    </section>

    <section className="py-12 sm:section-space"><div className="page-wrap grid gap-8 lg:grid-cols-[.8fr_1.2fr] lg:gap-12"><div className="[&_h2]:!text-3xl sm:[&_h2]:!text-4xl"><SectionHeading eyebrow="The central question" title="The question is not whether the City should own the land."/></div><div className="space-y-5 text-base leading-8 text-muted-foreground sm:space-y-6"><p>The acquisition of land beside Westwood Lake Park and the future of the existing indoor recreation facility are separate policy questions.</p><div className="border-l-4 border-accent bg-secondary p-5 font-serif text-lg leading-7 text-foreground sm:p-7 sm:text-xl sm:leading-8">Should an existing indoor recreation facility be removed before public consultation is completed and alternative operating models have been assessed?</div></div></div></section>
    <section className="bg-secondary py-12 sm:section-space"><div className="page-wrap"><SectionHeading eyebrow="The community request" title="A pause, not a permanent commitment." copy="We are not asking the City to commit to operating a municipal tennis club. We are asking that removal be deferred while the facility, community demand and alternative operating models are properly assessed."/><div className="mt-8 grid grid-cols-2 gap-px overflow-hidden border border-border bg-border sm:mt-10 lg:grid-cols-4">{principles.map(([Icon, title, text]) => <article key={title as string} className="bg-card p-4 sm:p-6"><Icon className="size-5 text-ring"/><h3 className="mt-5 font-semibold sm:mt-8">{title as string}</h3><p className="mt-2 text-xs leading-5 text-muted-foreground sm:text-sm sm:leading-6">{text as string}</p></article>)}</div></div></section>
    <section className="py-12 sm:section-space"><div className="page-wrap grid gap-8 lg:grid-cols-[.7fr_1.3fr] lg:gap-12"><SectionHeading eyebrow="Why this matters" title="What year-round indoor tennis contributes"/><div className="border-t border-border">{reasons.map(([title,text]) => <article className="grid gap-2 border-b border-border py-5 md:grid-cols-[.7fr_1.3fr] md:gap-3 md:py-7" key={title}><h3 className="font-serif text-xl">{title}</h3><p className="text-sm leading-6 text-muted-foreground">{text}</p></article>)}</div></div></section>

    <section className="bg-card py-12 sm:section-space">
      <div className="page-wrap grid gap-8 lg:grid-cols-[.7fr_1.3fr] lg:gap-12">
        <SectionHeading eyebrow="Latest developments" title="What has happened most recently"/>
        <div className="border-t border-border">
          <article className="grid gap-2 border-b-2 border-border py-5 md:grid-cols-[8rem_1fr] md:gap-3 md:py-6"><p className="text-sm font-semibold">Sep 25, 2026</p><div><h3 className="font-serif text-xl">Candidate questionnaire results published</h3><p className="mt-2 text-sm leading-6 text-muted-foreground">25 of 44 candidates responded to the Nanaimo Tennis questionnaire. Responses have been coded by question for easier review, alongside each candidate's original response.</p><Link to="/candidates" className="mt-3 inline-flex items-center gap-1 text-sm font-semibold hover:text-ring">View results<ArrowRight className="size-4"/></Link></div></article>
          <article className="grid gap-2 border-b border-border py-5 md:grid-cols-[8rem_1fr] md:gap-3 md:py-6"><p className="text-sm font-semibold">Sep 17, 2026</p><div><h3 className="font-serif text-xl">Public petition launched</h3><p className="mt-2 text-sm leading-6 text-muted-foreground">A community-organized petition asks City Council to preserve the indoor courts while alternatives are considered.</p><a href={petitionUrl} target="_blank" rel="noreferrer" className="mt-3 inline-flex items-center gap-1 text-sm font-semibold hover:text-ring">View petition<ArrowUpRight className="size-4"/></a></div></article>
          <article className="grid gap-2 border-b border-border py-5 md:grid-cols-[8rem_1fr] md:gap-3 md:py-6"><p className="text-sm font-semibold">Sep 16, 2026</p><div><h3 className="font-serif text-xl">City announces acquisition</h3><p className="mt-2 text-sm leading-6 text-muted-foreground">The City announces the purchase of the Westwood Lake Tennis Club property and says the bubble will be removed.</p></div></article>
        </div>
        <div className="lg:col-start-2"><Button asChild variant="outline"><Link to="/timeline">View full timeline<ArrowRight /></Link></Button></div>
      </div>
    </section>

    <section className="border-y border-border bg-secondary/50 py-10 sm:py-12">
      <div className="page-wrap flex flex-col justify-between gap-5 md:flex-row md:items-center">
        <div><p className="eyebrow">2026 municipal election · Questionnaire results</p><h2 className="mt-2 font-serif text-2xl sm:text-3xl">Candidate questionnaire results are now available.</h2><p className="mt-2 max-w-2xl text-sm leading-6 text-muted-foreground">25 of 44 mayoral and council candidates responded during the September 19–25 questionnaire period. Each response has been coded question-by-question for easier comparison, with the candidates' full verbatim responses available for review.</p><p className="mt-2 max-w-2xl text-xs leading-5 text-muted-foreground">The coding uses descriptive categories such as Support, Conditional, Unclear and Does not support. It is not a rating, ranking or endorsement.</p></div>
        <Button asChild variant="outline" className="w-fit shrink-0"><Link to="/candidates">View questionnaire results<ArrowRight /></Link></Button>
      </div>
    </section>

    <section className="hidden section-space overflow-hidden bg-primary text-primary-foreground md:block"><div className="page-wrap"><SectionHeading eyebrow="Key dates" title="How the situation is unfolding"/><div className="mt-12 grid gap-px bg-primary-foreground/20 lg:grid-cols-6">{timeline.map((item) => <article key={`${item.date}-${item.title}`} className="bg-primary p-5"><p className="text-[10px] font-bold uppercase tracking-[.12em] text-primary-foreground/45">{item.status}</p><p className="mt-2 text-xs font-semibold text-primary-foreground/55">{item.date} {item.year}</p><h3 className="mt-4 font-serif text-lg">{item.title}</h3><p className="mt-3 text-xs leading-5 text-primary-foreground/70">{item.text}</p>{item.source && <div className="mt-4 [&_a]:text-primary-foreground"><SourceLink href={item.source.url}/></div>}</article>)}</div><Button asChild variant="outline" className="mt-8 border-primary-foreground/40 bg-transparent text-primary-foreground hover:bg-primary-foreground/10 hover:text-primary-foreground"><Link to="/timeline">View full timeline</Link></Button></div></section>
    <section className="bg-secondary py-12 sm:section-space"><div className="page-wrap grid gap-8 lg:grid-cols-[.7fr_1.3fr] lg:gap-12"><SectionHeading eyebrow="Frequently asked" title="Clear answers to common questions"/><Accordion type="single" collapsible>{faqs.map(([q,a]) => <AccordionItem key={q} value={q}><AccordionTrigger className="py-4 text-base sm:py-5">{q}</AccordionTrigger><AccordionContent className="max-w-3xl pb-5 leading-7 text-muted-foreground sm:pb-6">{a}</AccordionContent></AccordionItem>)}</Accordion></div></section>
    <section className="bg-accent"><div className="page-wrap flex flex-col items-start justify-between gap-5 py-9 md:flex-row md:items-center md:py-12"><div><p className="eyebrow text-accent-foreground/65">Stay informed</p><h2 className="mt-2 font-serif text-3xl text-accent-foreground">Participate in the conversation.</h2></div><div className="flex flex-wrap gap-3"><Button asChild size="lg"><Link to="/get-involved">Ways to take part<ArrowRight /></Link></Button><Button asChild size="lg" variant="outline"><a href={petitionUrl} target="_blank" rel="noreferrer">Public petition<ArrowUpRight /></a></Button></div></div></section>
  </>;
}
