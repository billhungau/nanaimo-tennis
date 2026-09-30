import { createFileRoute } from "@tanstack/react-router";
import { AlertCircle } from "lucide-react";
import { EmptyFact, PageIntro, SourceLink } from "@/components/page-elements";
import { sources, unknowns } from "@/lib/civic-data";

export const Route = createFileRoute("/evidence")({
  head: () => ({ meta: [
    { title: "Evidence | Nanaimo Tennis" },
    { name: "description", content: "Verified facts, source documents and clearly identified information gaps about indoor tennis at Westwood Lake." },
    { property: "og:title", content: "What do we know about Westwood indoor tennis?" },
    { property: "og:description", content: "An evidence-first record of verified facts and unanswered questions." },
    { property: "og:type", content: "article" },
    { property: "og:url", content: "https://www.nanaimotennis.ca/evidence" },
    { name: "twitter:card", content: "summary_large_image" },
  ], links: [{ rel: "canonical", href: "https://www.nanaimotennis.ca/evidence" }] }),
  component: EvidencePage,
});

function EvidencePage() {
  const facts = [
    ["The City announced a $2.88-million purchase of the 2.85-acre property.", sources[3]],
    ["The club is expected to cease operations November 1, 2026.", sources[3]],
    ["The indoor tennis bubble is expected to be removed after closure.", sources[3]],
    ["The City is expected to take possession December 18, 2026.", sources[5]],
    ["The City has said long-term uses will involve planning and community engagement.", sources[3]],
  ];

  const registrationData = [
    { year: "2023", registrations: 410, courses: 56, spaces: 628 },
    { year: "2024", registrations: 564, courses: 75, spaces: 864 },
    { year: "2025", registrations: 669, courses: 100, spaces: 1105 },
  ];
  const maxRegistrations = Math.max(...registrationData.map((item) => item.registrations));

  return <>
    <PageIntro eyebrow="Evidence" title="What do we actually know?">
      <p>Claims are kept short, sources are shown directly, and information that has not been published is identified rather than inferred.</p>
    </PageIntro>

    <section id="city-registration-data" className="section-space pb-0">
      <div className="page-wrap">
        <div className="civic-card overflow-hidden">
          <div className="border-b border-border p-5 sm:p-7">
            <p className="eyebrow">City recreation records · 2023–2025</p>
            <h2 className="mt-3 max-w-3xl font-serif text-3xl sm:text-4xl">Tennis-program registrations increased as the City expanded programming.</h2>
            <p className="mt-4 max-w-3xl text-base leading-7 text-muted-foreground">Records supplied by the City of Nanaimo tennis coordinator show 410 registrations in 2023, 564 in 2024 and 669 in 2025. That is a 63% increase in registrations from 2023 to 2025. Over the same period, listed offerings increased from 56 to 100 and programmed spaces increased from 628 to 1,105.</p>
          </div>

          <div className="grid gap-px bg-border md:grid-cols-3">
            {registrationData.map((item) => <article key={item.year} className="bg-card p-5 sm:p-6">
              <p className="text-xs font-bold uppercase tracking-[.12em] text-muted-foreground">{item.year}</p>
              <p className="mt-2 font-serif text-4xl font-bold tabular-nums">{item.registrations}</p>
              <p className="mt-1 text-sm font-semibold">registrations</p>
              <div className="mt-5 h-2 overflow-hidden rounded-full bg-secondary" aria-hidden="true"><div className="h-full bg-primary" style={{ width: `${(item.registrations / maxRegistrations) * 100}%` }} /></div>
              <p className="mt-4 text-xs leading-5 text-muted-foreground">{item.courses} listed offerings · {item.spaces.toLocaleString()} programmed spaces</p>
            </article>)}
          </div>

          <div className="border-t border-border bg-secondary/55 p-5 sm:p-6">
            <p className="max-w-4xl text-sm leading-6 text-muted-foreground"><strong className="text-foreground">Context:</strong> Across 2023–2025, the records show 1,643 registrations against 2,597 programmed spaces, a 63.3% aggregate fill rate. These figures document participation in City tennis programming, but they do not by themselves measure demand specifically for year-round indoor courts.</p>
            <div className="mt-4"><SourceLink href="/Registration%20Summary%202021-2025.pdf" label="View original registration records" /></div>
          </div>
        </div>
      </div>
    </section>

    <section className="section-space pb-0">
      <div className="page-wrap">
        <div className="civic-card p-5 sm:p-7">
          <h2 className="font-serif text-2xl sm:text-3xl">What the Beban Park plan says</h2>
          <p className="mt-4 max-w-3xl text-base leading-7 text-muted-foreground">A 2025 City staff report identifies a possible indoor activity pavilion at Beban Park that could accommodate tennis, badminton, pickleball and basketball. The report places potential borrowing for the broader Beban Park Master Plan across 2027–2032, with low confidence in its cost estimate. It does not set a date for an indoor tennis facility to open. Council subsequently deferred consideration of Beban Park improvements while priority projects undergo further design and costing.</p>
          <div className="mt-5 flex flex-wrap gap-x-6 gap-y-3">
            <SourceLink href="https://www.nanaimo.ca/docs/your-government/projects/rpt_fa250917nanaimobuildsforthefutureplanupdatewithattachments.pdf#page=11" label="City staff report, pp. 8–11" />
            <SourceLink href="https://www.nanaimo.ca/your-government/city-council/council-meetings/summaries/lists/summaries/october-6-2025-regular-council-summary" label="Council decision, October 6" />
          </div>
        </div>
      </div>
    </section>
    <section className="section-space">
      <div className="page-wrap grid gap-12 lg:grid-cols-[1.2fr_.8fr]">
        <div>
          <div className="flex flex-wrap items-end justify-between gap-3 sm:gap-4">
            <h2 className="font-serif text-3xl">Verified in the public record</h2>
            <p className="text-xs text-muted-foreground">City source reviewed: September 23, 2026</p>
          </div>
          <div className="mt-5 border-t border-border sm:mt-6">{facts.map(([finding, source]) => {
            const item = source as typeof sources[number];
            return <article className="border-b border-border py-5 sm:py-6" key={finding as string}>
              <h3 className="text-base font-semibold leading-7">{finding as string}</h3>
              <div className="mt-2.5 flex flex-wrap items-center gap-x-3 gap-y-2 text-xs text-muted-foreground sm:mt-3">
                <span>{item.publisher}</span><span>{item.date}</span>{item.primary && <span className="rounded-sm bg-secondary px-2 py-1 font-semibold text-foreground">Primary source</span>}<SourceLink href={item.url}/>
              </div>
            </article>;
          })}</div>
        </div>
        <aside className="civic-card h-fit p-5 sm:p-6">
          <div className="flex items-center gap-3"><AlertCircle className="size-5 shrink-0 text-ring"/><h2 className="font-serif text-2xl">What we still don't know</h2></div>
          <p className="mt-3 text-sm leading-6 text-muted-foreground">These details may materially affect the decision. They are not established in the City announcement reviewed September 23, 2026; other documents may exist or be published later.</p>
          <div className="mt-4">{unknowns.map((item) => <EmptyFact key={item}>{item}</EmptyFact>)}</div>
          <p className="mt-5 border-t border-border pt-5 text-xs leading-5 text-muted-foreground">Review this record when the City publishes new plans or documents. Update the review date only after checking the linked source and revising affected facts and information gaps.</p>
        </aside>
      </div>
    </section>
  </>;
}
