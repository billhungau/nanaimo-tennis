import { createFileRoute } from "@tanstack/react-router";
import { Link } from "@tanstack/react-router";
import { ArrowRight, ArrowUpRight, Compass, MessageSquareText, Scale, Search, type LucideIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { SectionHeading, SourceLink } from "@/components/page-elements";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import heroImage from "@/assets/indoor-tennis-community.jpg";
import { timeline } from "@/lib/civic-data";

const petitionUrl = "https://www.change.org/p/urge-nanaimo-to-preserve-westwood-lake-indoor-tennis-courts";

export const Route = createFileRoute("/")({
  head: () => ({ meta: [
    { title: "Future of Indoor Tennis in Nanaimo | Westwood Lake Tennis Courts" },
    { name: "description", content: "Independent information about the future of indoor tennis at Westwood Lake in Nanaimo, including City documents, news coverage, community proposals and 2026 municipal candidate positions." },
    { property: "og:title", content: "Future of Indoor Tennis in Nanaimo" },
    { property: "og:description", content: "An independent, evidence-led guide to the Westwood Lake tennis facility and the choices ahead." },
    { property: "og:type", content: "website" }, { property: "og:url", content: "https://nanaimo-tennis.lovable.app/" }, { name: "twitter:card", content: "summary_large_image" },
  ], links: [{ rel: "canonical", href: "https://nanaimo-tennis.lovable.app/" }] }),
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
    ["Why can't players simply use outdoor courts?", "Outdoor courts remain valuable, but they do not provide dependable year-round access during Nanaimo's wet fall and winter months."],
    ["Why act now?", "Once the indoor structure is removed, retaining the existing facility is no longer an option. A temporary pause would allow additional information to be gathered first."],
    ["Does this website oppose expansion of Westwood Lake Park?", "No. Expanding public parkland and assessing whether an existing recreation facility can continue are separate questions."],
  ];
  return <>
    <section className="relative min-h-[680px] overflow-hidden bg-primary text-primary-foreground">
      <img src={heroImage} alt="Community players on indoor tennis courts beneath an air-supported roof" width={1920} height={1088} className="absolute inset-0 size-full object-cover" />
      <div className="absolute inset-0 bg-primary/75" />
      <div className="page-wrap relative flex min-h-[680px] items-end py-16 sm:py-20">
        <div className="max-w-4xl reveal"><p className="mb-5 text-xs font-bold uppercase tracking-[.14em] text-primary-foreground/70">A community information initiative · Nanaimo, BC</p><h1 className="font-serif text-4xl leading-[1.13] sm:text-6xl lg:text-7xl">Before an existing indoor tennis facility is removed, let's examine the alternatives.</h1><p className="mt-7 max-w-3xl text-base leading-7 text-primary-foreground/85 sm:text-lg">The City of Nanaimo has purchased the Westwood Lake Tennis Club property. Before the existing indoor courts are removed, this site asks that the facility, community demand and practical operating alternatives be assessed through the public process.</p><div className="mt-8 flex flex-wrap gap-3"><Button asChild size="lg" className="bg-background text-foreground hover:bg-background/90"><Link to="/the-issue">Understand the issue<ArrowRight /></Link></Button><Button asChild size="lg" variant="outline" className="border-primary-foreground/45 bg-transparent text-primary-foreground hover:bg-primary-foreground/10 hover:text-primary-foreground"><Link to="/candidates">See candidate positions</Link></Button></div></div>
      </div>
    </section>
    <section className="border-b border-border bg-card"><div className="page-wrap grid grid-cols-2 divide-x divide-y divide-border py-0 md:grid-cols-5 md:divide-y-0">{["4 indoor courts", "Year-round access", "Junior & adult programs", "City recreation programming", "Club closure expected Nov. 1"].map((fact) => <div key={fact} className="px-4 py-5 text-center text-xs font-semibold sm:text-sm">{fact}</div>)}</div><p className="page-wrap border-t border-border py-3 text-center text-xs text-muted-foreground">Figures and dates link to their original sources throughout this site.</p></section>

    <section className="border-b border-border bg-secondary/70">
      <div className="page-wrap flex flex-col justify-between gap-6 py-8 md:flex-row md:items-center">
        <div className="max-w-3xl"><p className="eyebrow">Community response</p><h2 className="mt-2 font-serif text-2xl">A public petition is asking the City to preserve the indoor courts while alternatives are assessed.</h2><p className="mt-2 text-sm leading-6 text-muted-foreground">The petition was launched September 17 and is hosted independently on Change.org.</p></div>
        <Button asChild variant="outline" className="shrink-0"><a href={petitionUrl} target="_blank" rel="noreferrer">Read the public petition<ArrowUpRight /></a></Button>
      </div>
    </section>

    <section className="section-space"><div className="page-wrap grid gap-12 lg:grid-cols-[.8fr_1.2fr]"><SectionHeading eyebrow="The central question" title="The question is not whether the City should own the land."/><div className="space-y-6 text-base leading-8 text-muted-foreground"><p>The acquisition of land beside Westwood Lake Park and the future of the existing indoor recreation facility are separate policy questions.</p><div className="border-l-4 border-accent bg-secondary p-7 font-serif text-xl leading-8 text-foreground">Should an existing indoor recreation facility be removed before public consultation is completed and alternative operating models have been assessed?</div></div></div></section>
    <section className="section-space bg-secondary"><div className="page-wrap"><SectionHeading eyebrow="The community request" title="A pause, not a permanent commitment." copy="We are not asking the City to commit to operating a municipal tennis club. We are asking that removal be deferred while the facility, community demand and alternative operating models are properly assessed."/><div className="mt-10 grid gap-px overflow-hidden border border-border bg-border sm:grid-cols-2 lg:grid-cols-4">{principles.map(([Icon, title, text]) => <article key={title as string} className="bg-card p-6"><Icon className="size-5 text-ring"/><h3 className="mt-8 font-semibold">{title as string}</h3><p className="mt-2 text-sm leading-6 text-muted-foreground">{text as string}</p></article>)}</div></div></section>
    <section className="section-space"><div className="page-wrap grid gap-12 lg:grid-cols-[.7fr_1.3fr]"><SectionHeading eyebrow="Why this matters" title="What year-round indoor tennis contributes"/><div className="border-t border-border">{reasons.map(([title,text]) => <article className="grid gap-3 border-b border-border py-7 md:grid-cols-[.7fr_1.3fr]" key={title}><h3 className="font-serif text-xl">{title}</h3><p className="text-sm leading-6 text-muted-foreground">{text}</p></article>)}</div></div></section>

    <section className="section-space bg-card">
      <div className="page-wrap grid gap-12 lg:grid-cols-[.7fr_1.3fr]">
        <SectionHeading eyebrow="Latest developments" title="What has happened most recently"/>
        <div className="border-t border-border">
          <article className="grid gap-3 border-b border-border py-6 md:grid-cols-[8rem_1fr]"><p className="text-sm font-semibold">Sep 17, 2026</p><div><h3 className="font-serif text-xl">Public petition launched</h3><p className="mt-2 text-sm leading-6 text-muted-foreground">A community-organized petition asks City Council to preserve the indoor courts while alternatives are considered.</p><a href={petitionUrl} target="_blank" rel="noreferrer" className="mt-3 inline-flex items-center gap-1 text-sm font-semibold hover:text-ring">View petition<ArrowUpRight className="size-4"/></a></div></article>
          <article className="grid gap-3 border-b border-border py-6 md:grid-cols-[8rem_1fr]"><p className="text-sm font-semibold">Sep 16, 2026</p><div><h3 className="font-serif text-xl">City announces acquisition</h3><p className="mt-2 text-sm leading-6 text-muted-foreground">The City announces the purchase of the Westwood Lake Tennis Club property and says the bubble will be removed.</p></div></article>
        </div>
      </div>
    </section>

    <section className="section-space overflow-hidden bg-primary text-primary-foreground"><div className="page-wrap"><SectionHeading eyebrow="Key dates" title="How the situation is unfolding"/><div className="mt-12 grid gap-px bg-primary-foreground/20 lg:grid-cols-6">{timeline.map((item) => <article key={`${item.date}-${item.title}`} className="bg-primary p-5"><p className="text-[10px] font-bold uppercase tracking-[.12em] text-primary-foreground/45">{item.status}</p><p className="mt-2 text-xs font-semibold text-primary-foreground/55">{item.date} {item.year}</p><h3 className="mt-4 font-serif text-lg">{item.title}</h3><p className="mt-3 text-xs leading-5 text-primary-foreground/70">{item.text}</p>{item.source && <div className="mt-4 [&_a]:text-primary-foreground"><SourceLink href={item.source.url}/></div>}</article>)}</div><Button asChild variant="outline" className="mt-8 border-primary-foreground/40 bg-transparent text-primary-foreground hover:bg-primary-foreground/10 hover:text-primary-foreground"><Link to="/timeline">View full timeline</Link></Button></div></section>
    <section className="section-space bg-secondary"><div className="page-wrap grid gap-12 lg:grid-cols-[.7fr_1.3fr]"><SectionHeading eyebrow="Frequently asked" title="Clear answers to common questions"/><Accordion type="single" collapsible>{faqs.map(([q,a]) => <AccordionItem key={q} value={q}><AccordionTrigger className="py-5 text-base">{q}</AccordionTrigger><AccordionContent className="max-w-3xl pb-6 leading-7 text-muted-foreground">{a}</AccordionContent></AccordionItem>)}</Accordion></div></section>
    <section className="bg-accent"><div className="page-wrap flex flex-col items-start justify-between gap-6 py-12 md:flex-row md:items-center"><div><p className="eyebrow text-accent-foreground/65">Stay informed</p><h2 className="mt-2 font-serif text-3xl text-accent-foreground">Participate in the conversation.</h2></div><div className="flex flex-wrap gap-3"><Button asChild size="lg"><Link to="/get-involved">Ways to take part<ArrowRight /></Link></Button><Button asChild size="lg" variant="outline"><a href={petitionUrl} target="_blank" rel="noreferrer">Public petition<ArrowUpRight /></a></Button></div></div></section>
  </>;
}
