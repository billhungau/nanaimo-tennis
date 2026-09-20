import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight, Check } from "lucide-react";
import { Button } from "@/components/ui/button";
import { PageIntro, SectionHeading } from "@/components/page-elements";

export const Route = createFileRoute("/the-issue")({
  head: () => ({ meta: [
    { title: "The Issue | Indoor Tennis Nanaimo" },
    { name: "description", content: "Understand the separate questions of Nanaimo's Westwood Lake land acquisition and the planned removal of its indoor tennis facility." },
    { property: "og:title", content: "The issue: indoor tennis at Westwood Lake" },
    { property: "og:description", content: "A clear distinction between the land purchase and the future of the indoor courts." },
    { property: "og:type", content: "article" },
    { property: "og:url", content: "https://nanaimo-tennis.lovable.app/the-issue" },
    { name: "twitter:card", content: "summary_large_image" },
  ], links: [{ rel: "canonical", href: "https://nanaimo-tennis.lovable.app/the-issue" }] }),
  component: IssuePage,
});

function IssuePage() {
  const asks = [
    "Assess the physical condition and remaining useful life",
    "Review operating and maintenance costs",
    "Measure demand for year-round indoor tennis",
    "Consider nonprofit, lease and partnership models",
    "Complete meaningful public consultation",
  ];
  const models = [
    ["Nonprofit operator", "A community nonprofit could potentially lease or operate the facility."],
    ["Lease to an experienced operator", "The City could retain ownership while leasing recreational operations."],
    ["Public-private partnership", "Operating responsibility and financial risk could potentially be shared."],
    ["Temporary continuation", "The facility could remain while Nanaimo develops a broader recreation strategy."],
  ];

  return <>
    <PageIntro eyebrow="The issue" title="Two decisions, considered separately.">
      <p>The acquisition of land beside Westwood Lake Park and the future of the existing indoor recreation facility are separate policy questions. Acquiring the property does not, by itself, determine whether the indoor courts should be removed.</p>
    </PageIntro>

    <section className="section-space">
      <div className="page-wrap grid gap-12 lg:grid-cols-2">
        <div>
          <SectionHeading title="What has been announced"/>
          <p className="mt-6 leading-8 text-muted-foreground">The City announced the $2.88-million acquisition on September 16, 2026. The City says the club will cease operations November 1 and that the indoor bubble will be removed. Reporting places expected City possession on December 18.</p>
          <p className="mt-5 leading-8 text-muted-foreground">The City has also indicated that future uses will be shaped through broader planning and community engagement.</p>
        </div>
        <div className="civic-card p-7"><p className="eyebrow">The request</p><blockquote className="mt-5 font-serif text-2xl leading-9">Before an existing year-round recreation facility is removed, pause, consult the community, and evaluate whether there is a practical way to retain indoor tennis.</blockquote></div>
      </div>
    </section>

    <section className="section-space bg-secondary">
      <div className="page-wrap grid gap-12 lg:grid-cols-[.8fr_1.2fr]">
        <SectionHeading eyebrow="A limited, practical step" title="What a pause would allow"/>
        <div className="space-y-3">{asks.map((ask) => <div className="flex gap-4 border-b border-border py-4" key={ask}><span className="grid size-6 shrink-0 place-items-center rounded-full bg-primary text-primary-foreground"><Check className="size-3.5"/></span><p className="text-sm font-medium">{ask}</p></div>)}</div>
      </div>
    </section>

    <section className="section-space">
      <div className="page-wrap grid gap-12 lg:grid-cols-[.75fr_1.25fr]">
        <div><SectionHeading eyebrow="Options that could be evaluated" title="Retaining indoor tennis would not necessarily require direct City operation."/><p className="mt-6 max-w-xl text-sm italic leading-6 text-muted-foreground">These are options for evaluation, not predetermined recommendations. Their feasibility would require financial, legal and operational analysis.</p><Button asChild className="mt-8"><Link to="/evidence">See what is known<ArrowRight /></Link></Button></div>
        <div className="border-t border-border">{models.map(([title,text]) => <article key={title} className="grid gap-3 border-b border-border py-7 md:grid-cols-[.8fr_1.2fr]"><h3 className="font-serif text-xl">{title}</h3><p className="text-sm leading-6 text-muted-foreground">{text}</p></article>)}</div>
      </div>
    </section>
  </>;
}
