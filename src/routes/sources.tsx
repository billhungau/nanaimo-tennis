import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { Search } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { PageIntro, SourceLink } from "@/components/page-elements";
import { sources } from "@/lib/civic-data";

const categories = ["All", "City documents", "News", "Recreation records", "Historical records", "Community statements", "Candidate statements"] as const;

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
      { property: "og:url", content: "https://nanaimo-tennis.lovable.app/sources" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
    links: [{ rel: "canonical", href: "https://nanaimo-tennis.lovable.app/sources" }],
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
