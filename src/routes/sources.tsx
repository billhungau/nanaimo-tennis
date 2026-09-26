import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { ArrowUpRight, Search } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { PageIntro, SourceLink } from "@/components/page-elements";
import { sources } from "@/lib/civic-data";

const categories = ["All", "City documents", "News", "Recreation records", "Health & recreation", "Historical records", "Community statements", "Candidate statements"] as const;

function sourceDateValue(date: string) {
  const yearOnly = date.match(/^\d{4}$/);
  if (yearOnly) return Date.UTC(Number(date), 0, 1);

  const parsed = Date.parse(date);
  return Number.isNaN(parsed) ? 0 : parsed;
}

export const Route = createFileRoute("/sources")({
  head: () => ({
    meta: [
      { title: "Source Library | Nanaimo Tennis" },
      { name: "description", content: "Search City documents, local reporting, historical records and candidate statements about indoor tennis in Nanaimo." },
      { property: "og:title", content: "Nanaimo Tennis source library" },
      { property: "og:description", content: "A searchable, transparent record of primary sources and responsible reporting." },
      { property: "og:type", content: "website" },
      { property: "og:url", content: "https://www.nanaimotennis.ca/sources" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
    links: [{ rel: "canonical", href: "https://www.nanaimotennis.ca/sources" }],
  }),
  component: SourcesPage,
});

function SourcesPage() {
  const [query,setQuery] = useState("");
  const [category,setCategory] = useState<(typeof categories)[number]>("All");
  const shown = sources
    .filter(s => (category === "All" || s.category === category) && `${s.title} ${s.publisher} ${s.summary}`.toLowerCase().includes(query.toLowerCase()))
    .slice()
    .sort((a, b) => sourceDateValue(b.date) - sourceDateValue(a.date));

  return <>
    <PageIntro eyebrow="Source library" title="Read the record for yourself.">
      <p>Primary sources are preferred. News coverage is summarized briefly and links to the original publisher; full articles are not reproduced.</p>
    </PageIntro>
    <section className="section-space pb-0">
      <div className="page-wrap">
        <div className="civic-card overflow-hidden p-5 sm:p-7">
          <p className="eyebrow">City planning record · September 2025</p>
          <h2 className="mt-3 font-serif text-2xl sm:text-3xl">When could Beban Park provide indoor tennis?</h2>
          <p className="mt-4 max-w-3xl text-base leading-7 text-muted-foreground">A City staff report includes a possible indoor activity pavilion at Beban Park that could serve tennis and other sports. The chart below shows a <strong className="text-foreground">potential 2027–2032 borrowing window for the broader Beban Park plan</strong>. It gives no construction date or opening date for indoor tennis. Council later deferred consideration of Beban Park improvements pending design and costing of higher-priority projects.</p>
          <figure className="mt-6">
            <div className="overflow-x-auto rounded-md border border-border bg-white">
              <img src="/beban-borrowing-timeline.png" alt="City staff report table: Beban Park Master Plan implementation is a tier-two project with low cost confidence and a potential borrowing window from 2027 through 2032." width="1240" height="705" className="block min-w-[760px] w-full" loading="lazy" />
            </div>
            <figcaption className="mt-3 text-sm leading-6 text-muted-foreground">Extract from the City's “Nanaimo Builds for the Future” staff report, page 11. The timeline is for borrowing associated with the entire Beban Park Master Plan, not a tennis facility completion date. Swipe sideways on a small screen to read the original table.</figcaption>
          </figure>
          <div className="mt-5 flex flex-wrap gap-x-6 gap-y-3">
            <a href="https://www.nanaimo.ca/docs/your-government/projects/rpt_fa250917nanaimobuildsforthefutureplanupdatewithattachments.pdf#page=11" target="_blank" rel="noreferrer" className="inline-flex items-center gap-1 text-sm font-semibold hover:text-ring">Read the staff report <ArrowUpRight className="size-4" /></a>
            <a href="https://www.nanaimo.ca/your-government/city-council/council-meetings/summaries/lists/summaries/october-6-2025-regular-council-summary" target="_blank" rel="noreferrer" className="inline-flex items-center gap-1 text-sm font-semibold hover:text-ring">Read Council's October 6 decision <ArrowUpRight className="size-4" /></a>
          </div>
        </div>
      </div>
    </section>
    <section className="section-space">
      <div className="page-wrap">
        <div className="relative max-w-xl">
          <Search className="absolute left-3 top-3 size-4 text-muted-foreground"/>
          <Input value={query} onChange={(e) => setQuery(e.target.value)} placeholder="Search sources" className="h-10 pl-10" aria-label="Search sources"/>
        </div>
        <div className="mt-4 flex flex-wrap gap-2">
          {categories.map((item) => <Button key={item} size="sm" variant={category === item ? "default" : "outline"} onClick={() => setCategory(item)}>{item}</Button>)}
        </div>
        <div className="mt-7 grid gap-3 sm:mt-8 sm:gap-4 lg:grid-cols-2">
          {shown.map((source) => <article className="civic-card flex flex-col p-4 sm:p-6" key={source.url}>
            <div className="flex items-start justify-between gap-3">
              <span className="text-[11px] font-semibold text-muted-foreground sm:text-xs">{source.category}</span>
              {source.primary && <span className="shrink-0 rounded-sm bg-secondary px-2 py-1 text-[10px] font-semibold sm:text-xs">Primary source</span>}
            </div>
            <h2 className="mt-3 font-serif text-xl leading-6 sm:mt-5 sm:leading-7">{source.title}</h2>
            <p className="mt-1.5 text-[11px] leading-5 text-muted-foreground sm:mt-2 sm:text-xs">{source.publisher} · {source.date}</p>
            <p className="mt-3 flex-1 text-sm leading-6 text-muted-foreground sm:mt-4">{source.summary}</p>
            <div className="mt-3 sm:mt-5"><SourceLink href={source.url} label="Original source"/></div>
          </article>)}
        </div>
        {shown.length === 0 && <p className="py-14 text-center text-sm text-muted-foreground">No sources match this search.</p>}
      </div>
    </section>
  </>;
}
