import { createFileRoute } from "@tanstack/react-router";
import { Link } from "@tanstack/react-router";
import { ArrowRight, Compass, MessageSquareText, Scale, Search, type LucideIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { SectionHeading, SourceLink } from "@/components/page-elements";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import heroImage from "@/assets/indoor-tennis-community.jpg";
import lakeImage from "@/assets/westwood-lake-community.jpg";
import { timeline } from "@/lib/civic-data";

export const Route = createFileRoute("/")({
  head: () => ({ meta: [
    { title: "Future of Indoor Tennis in Nanaimo | Westwood Lake Tennis Courts" },
    { name: "description", content: "Independent information about the future of indoor tennis at Westwood Lake in Nanaimo, including City documents, news coverage, community proposals and 2026 municipal candidate positions." },
    { property: "og:title", content: "Future of Indoor Tennis in Nanaimo" },
    { property: "og:description", content: "An independent, evidence-led guide to the Westwood Lake tennis facility and the choices ahead." },
    { property: "og:type", content: "website" }, { property: "og:url", content: "/" }, { name: "twitter:card", content: "summary_large_image" },
  ], links: [{ rel: "canonical", href: "/" }] }),
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
    ["Year-round recreation", "Indoor tennis provides dependable recreational access during Nanaimo's wet winter months."],
    ["Junior development", "The facility has supported children's instruction and tennis development."],
    ["Community programming", "Programs have included recreational lessons and activities beyond club membership."],
    ["An existing asset", "Rebuilding comparable indoor infrastructure would require a site, capital and planning."],
    ["Growing community", "Nanaimo's growth increases long-term demand for recreation infrastructure."],
    ["An irreversible decision", "A pause preserves options. Removing the facility eliminates one of them."],
  ];
  const faqs: Array<[string, string]> = [
    ["Are you asking the City to reverse the property purchase?", "No. The land purchase and the future of the existing indoor tennis facility are separate questions. Our request is focused on preserving the option of year-round indoor tennis while the City's planning process takes place."],
    ["Are you asking taxpayers to subsidize a private tennis club?", "No specific operating model is being proposed. We are asking the City to evaluate alternatives including nonprofit, lease and partnership models before removing the facility."],
    ["Why can't players simply use outdoor courts?", "Outdoor courts remain valuable, but they do not provide dependable year-round access during Nanaimo's wet fall and winter months."],
    ["Why act now?", "Once the indoor structure is removed, preserving the existing facility is no longer an option. A temporary pause allows the City to gather information before making an irreversible decision."],
    ["Does this website oppose expansion of Westwood Lake Park?", "No. Expanding public parkland and evaluating whether an existing recreation facility can continue are not mutually exclusive."],
  ];
  return <>
    <section className="relative min-h-[680px] overflow-hidden bg-primary text-primary-foreground">
      <img src={heroImage} alt="Community players on indoor tennis courts beneath an air-supported roof" width={1920} height={1088} className="absolute inset-0 size-full object-cover" />
      <div className="absolute inset-0 bg-primary/75" />
      <div className="page-wrap relative flex min-h-[680px] items-end py-16 sm:py-20">
        <div className="max-w-4xl reveal"><p className="mb-5 text-xs font-bold uppercase tracking-[.14em] text-primary-foreground/70">A community information initiative · Nanaimo, BC</p><h1 className="font-serif text-4xl leading-[1.13] sm:text-6xl lg:text-7xl">Before Nanaimo loses indoor tennis, let's examine the alternatives.</h1><p className="mt-7 max-w-3xl text-base leading-7 text-primary-foreground/85 sm:text-lg">The City has purchased the Westwood Lake Tennis Club property. We support the investment in Westwood Lake Park—and ask for one additional step before the indoor courts disappear: pause, consult the community, and assess whether year-round tennis can be preserved.</p><div className="mt-8 flex flex-wrap gap-3"><Button asChild size="lg" className="bg-background text-foreground hover:bg-background/90"><Link to="/the-issue">Understand the issue<ArrowRight /></Link></Button><Button asChild size="lg" variant="outline" className="border-primary-foreground/45 bg-transparent text-primary-foreground hover:bg-primary-foreground/10 hover:text-primary-foreground"><Link to="/candidates">See candidate positions</Link></Button></div></div>
      </div>
    </section>
    <section className="border-b border-border bg-card"><div className="page-wrap grid grid-cols-2 divide-x divide-y divide-border py-0 md:grid-cols-5 md:divide-y-0">{["4 indoor courts", "Year-round tennis", "Junior & adult programming", "City recreation programs", "November 1 club closure"].map((fact) => <div key={fact} className="px-4 py-5 text-center text-xs font-semibold sm:text-sm">{fact}</div>)}</div><p className="page-wrap border-t border-border py-3 text-center text-xs text-muted-foreground">Figures and dates link to their original sources throughout this site.</p></section>
    <section className="section-space"><div className="page-wrap grid gap-12 lg:grid-cols-[.8fr_1.2fr]"><SectionHeading eyebrow="The central question" title="The question is not whether the City should own the land."/><div className="space-y-6 text-base leading-8 text-muted-foreground"><p>The City has acquired an important piece of land beside Westwood Lake Park. That decision can be considered separately from what happens to the recreation facilities already on the property.</p><div className="border-l-4 border-accent bg-secondary p-7 font-serif text-xl leading-8 text-foreground">Should Nanaimo permanently remove an existing indoor recreation facility before completing public consultation and examining whether it could remain viable under another operating model?</div></div></div></section>
    <section className="section-space bg-secondary"><div className="page-wrap"><SectionHeading eyebrow="The community request" title="A pause, not a permanent commitment." copy="We are not asking the City to commit today to operating a municipal tennis club. We are asking Council to defer removal while the facility is assessed, community demand is measured, operating options are reviewed and meaningful public consultation is completed."/><div className="mt-10 grid gap-px overflow-hidden border border-border bg-border sm:grid-cols-2 lg:grid-cols-4">{principles.map(([Icon, title, text]) => <article key={title as string} className="bg-card p-6"><Icon className="size-5 text-ring"/><h3 className="mt-8 font-semibold">{title as string}</h3><p className="mt-2 text-sm leading-6 text-muted-foreground">{text as string}</p></article>)}</div></div></section>
    <section className="section-space"><div className="page-wrap"><SectionHeading eyebrow="Why this matters" title="What year-round indoor tennis contributes"/><div className="mt-10 grid gap-4 md:grid-cols-2 lg:grid-cols-3">{reasons.map(([title,text], i) => <article className="civic-card p-6" key={title}><span className="text-xs font-bold text-muted-foreground">0{i+1}</span><h3 className="mt-8 font-serif text-xl">{title}</h3><p className="mt-3 text-sm leading-6 text-muted-foreground">{text}</p></article>)}</div></div></section>
    <section className="section-space overflow-hidden bg-primary text-primary-foreground"><div className="page-wrap"><SectionHeading eyebrow="Key dates" title="How the decision is unfolding"/><div className="mt-12 grid gap-px bg-primary-foreground/20 lg:grid-cols-6">{timeline.map((item) => <article key={item.date} className="bg-primary p-5"><p className="text-xs font-semibold text-primary-foreground/55">{item.date} {item.year}</p><h3 className="mt-4 font-serif text-lg">{item.title}</h3><p className="mt-3 text-xs leading-5 text-primary-foreground/70">{item.text}</p>{item.source && <div className="mt-4 [&_a]:text-primary-foreground"><SourceLink href={item.source.url}/></div>}</article>)}</div><Button asChild variant="outline" className="mt-8 border-primary-foreground/40 bg-transparent text-primary-foreground hover:bg-primary-foreground/10 hover:text-primary-foreground"><Link to="/timeline">View full timeline</Link></Button></div></section>
    <section className="section-space"><div className="page-wrap grid items-center gap-12 lg:grid-cols-2"><img src={lakeImage} loading="lazy" alt="Westwood Lake surrounded by evergreen forest" width={1600} height={1008} className="aspect-[8/5] w-full rounded-sm object-cover"/><div><SectionHeading eyebrow="A constructive path" title="Park expansion and careful assessment can coexist." copy="The land purchase may have benefits for Nanaimo. Before removing an existing indoor recreation facility, it is reasonable to understand its condition, value, demand and possible operating alternatives."/><Button asChild className="mt-7"><Link to="/evidence">Review the evidence<ArrowRight /></Link></Button></div></div></section>
    <section className="section-space bg-secondary"><div className="page-wrap grid gap-12 lg:grid-cols-[.7fr_1.3fr]"><SectionHeading eyebrow="Frequently asked" title="Clear answers to common questions"/><Accordion type="single" collapsible>{faqs.map(([q,a]) => <AccordionItem key={q} value={q}><AccordionTrigger className="py-5 text-base">{q}</AccordionTrigger><AccordionContent className="max-w-3xl pb-6 leading-7 text-muted-foreground">{a}</AccordionContent></AccordionItem>)}</Accordion></div></section>
    <section className="bg-accent"><div className="page-wrap flex flex-col items-start justify-between gap-6 py-12 md:flex-row md:items-center"><div><p className="eyebrow text-accent-foreground/65">Stay informed</p><h2 className="mt-2 font-serif text-3xl text-accent-foreground">Participate in the conversation.</h2></div><Button asChild size="lg"><Link to="/get-involved">Ways to take part<ArrowRight /></Link></Button></div></section>
  </>;
}
