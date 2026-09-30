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
    { year: "2023", registrations: 410 },
    { year: "2024", registrations: 564 },
    { year: "2025", registrations: 669 },
  ];
  const maxRegistrations = 669;

  return <>
    <PageIntro eyebrow="Evidence" title="What do we actually know?">
      <p>Claims are kept short, sources are shown directly, and information that has not been published is identified rather than inferred.</p>
    </PageIntro>

    <section id="city-registration-data" className="section-space pb-0">
      <div className="page-wrap">
        <div className="civic-card overflow-hidden">
          <div className="grid lg:grid-cols-[.9fr_1.1fr]">
            <div className="border-b border-border p-5 sm:p-7 lg:border-b-0 lg:border-r">
              <p className="eyebrow">City recreation records · 2023–2025</p>
              <h2 className="mt-3 max-w-2xl font-serif text-3xl sm:text-4xl">Registrations rose 63% from 2023 to 2025.</h2>
              <p className="mt-4 max-w-2xl text-base leading-7 text-muted-foreground">City records show tennis-program registrations increasing from 410 to 669 while listed offerings also expanded.</p>
              <div className="mt-6 grid gap-2 text-sm leading-6 text-muted-foreground sm:grid-cols-2 lg:grid-cols-1 xl:grid-cols-2">
                <p><strong className="text-foreground">Listed offerings:</strong> 56 → 100</p>
                <p><strong className="text-foreground">Programmed spaces:</strong> 628 → 1,105</p>
              </div>
              <div className="mt-5"><SourceLink href="/Registration%20Summary%202021-2025.pdf" label="View original registration records" /></div>
            </div>

            <div className="bg-secondary/40 p-5 sm:p-7">
              <p className="text-xs font-bold uppercase tracking-[.12em] text-muted-foreground">Registrations by year</p>
              <div className="mt-6 grid h-52 grid-cols-3 items-end gap-4 border-b border-foreground/25 px-2 sm:h-60 sm:gap-8 sm:px-6" role="img" aria-label="Bar chart showing 410 registrations in 2023, 564 in 2024 and 669 in 2025">
                {registrationData.map((item) => <div key={item.year} className="flex h-full flex-col justify-end text-center">
                  <p className="mb-2 font-serif text-2xl font-bold tabular-nums sm:text-3xl">{item.registrations}</p>
                  <div className="mx-auto w-full max-w-20 bg-primary" style={{ height: `${(item.registrations / maxRegistrations) * 68}%` }} aria-hidden="true" />
                  <p className="mt-2 text-xs font-bold text-muted-foreground sm:text-sm">{item.year}</p>
                </div>)}
              </div>
              <p className="mt-4 text-xs leading-5 text-muted-foreground">Bars show the actual annual registration counts on a zero baseline.</p>
            </div>
          </div>

          <div className="border-t border-border bg-secondary/55 p-4 sm:p-6">
            <p className="max-w-4xl text-sm leading-6 text-muted-foreground"><strong className="text-foreground">Context:</strong> Across 2023–2025, the records show 1,643 registrations against 2,597 programmed spaces, a 63.3% aggregate fill rate. These figures document participation in City tennis programming, but they do not by themselves measure demand specifically for year-round indoor courts.</p>
          </div>
        </div>
      </div>
    </section>

    <section className="section-space pb-0">
      <div className="page-wrap">
        <div className="civic-card overflow-hidden">
          <div className="grid lg:grid-cols-[.9fr_1.1fr]">
            <div className="p-5 sm:p-7 lg:border-r lg:border-border">
              <p className="eyebrow">Beban Park planning record · 2025</p>
              <h2 className="mt-3 font-serif text-3xl sm:text-4xl">No indoor-tennis opening date is established.</h2>
              <p className="mt-4 max-w-2xl text-base leading-7 text-muted-foreground">A City staff report identifies a possible indoor activity pavilion at Beban Park that could accommodate tennis and other sports. Its 2027–2032 dates are a potential borrowing window for the broader Beban Park Master Plan, not a construction or opening schedule for indoor tennis.</p>
              <p className="mt-3 max-w-2xl text-sm leading-6 text-muted-foreground">Council subsequently deferred consideration of Beban Park improvements while priority projects undergo further design and costing.</p>
              <div className="mt-5 flex flex-wrap gap-x-6 gap-y-3">
                <SourceLink href="https://www.nanaimo.ca/docs/your-government/projects/rpt_fa250917nanaimobuildsforthefutureplanupdatewithattachments.pdf#page=11" label="City staff report, pp. 8–11" />
                <SourceLink href="https://www.nanaimo.ca/your-government/city-council/council-meetings/summaries/lists/summaries/october-6-2025-regular-council-summary" label="Council decision, October 6, 2025" />
              </div>
            </div>

            <div className="bg-secondary/40 p-5 sm:p-7">
              <p className="text-xs font-bold uppercase tracking-[.12em] text-muted-foreground">Potential borrowing window</p>
              <div className="mt-7 rounded-md border border-border bg-card p-5 sm:p-6">
                <p className="font-semibold">Beban Park Master Plan</p>
                <p className="mt-1 text-sm text-muted-foreground">Broader master plan · low confidence in cost estimate</p>
                <div className="mt-7 flex items-center gap-4 font-serif text-2xl font-bold tabular-nums sm:text-3xl">
                  <span>2027</span>
                  <div className="relative h-2 flex-1 rounded-full bg-primary" aria-hidden="true"><span className="absolute -left-1 -top-1 size-4 rounded-full bg-primary"/><span className="absolute -right-1 -top-1 size-4 rounded-full bg-primary"/></div>
                  <span>2032</span>
                </div>
                <div className="mt-6 border-l-4 border-accent bg-secondary/70 p-4 text-sm leading-6"><strong>Not an indoor-tennis completion date.</strong> The report does not establish when a replacement indoor tennis facility would be built or opened.</div>
              </div>
              <p className="mt-4 text-xs leading-5 text-muted-foreground">City of Nanaimo, “Nanaimo Builds for the Future” staff report, page 11.</p>
            </div>
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
