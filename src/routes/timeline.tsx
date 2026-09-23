import { createFileRoute } from "@tanstack/react-router";
import { PageIntro, SourceLink } from "@/components/page-elements";
import { timeline } from "@/lib/civic-data";

export const Route = createFileRoute("/timeline")({
  head: () => ({ meta: [
    { title: "Timeline | Nanaimo Tennis" },
    { name: "description", content: "A sourced chronology of the Westwood Lake Tennis Club property acquisition, planned closure and public process." },
    { property: "og:title", content: "Westwood indoor tennis timeline" },
    { property: "og:description", content: "Key dates in the acquisition and future of the indoor tennis facility." },
    { property: "og:type", content: "article" },
    { property: "og:url", content: "https://www.nanaimotennis.ca/timeline" },
    { name: "twitter:card", content: "summary_large_image" },
  ], links: [{ rel: "canonical", href: "https://www.nanaimotennis.ca/timeline" }] }),
  component: TimelinePage,
});

function TimelinePage() {
  return <>
    <PageIntro eyebrow="Timeline" title="A clear chronology of what has happened—and what comes next.">
      <p>Dates below distinguish events that have occurred from scheduled, expected and future steps.</p>
    </PageIntro>
    <section className="section-space">
      <div className="page-wrap max-w-4xl">
        {timeline.map((item, index) => <article key={`${item.date}-${item.title}`} className="grid grid-cols-[4.25rem_1fr] gap-4 border-b border-border py-8 sm:grid-cols-[8rem_1fr] sm:gap-5">
          <div><p className="font-serif text-xl">{item.date}</p><p className="text-xs text-muted-foreground">{item.year}</p></div>
          <div>
            <div className="mb-3"><span className="rounded-sm bg-secondary px-2 py-1 text-[10px] font-bold uppercase tracking-[.12em] text-muted-foreground">{item.status}</span></div>
            <div className="flex items-start gap-2.5 sm:gap-3"><span className="mt-0.5 grid size-6 shrink-0 place-items-center rounded-full bg-secondary text-xs font-bold">{index + 1}</span><h2 className="font-serif text-[1.4rem] leading-[1.08] sm:text-2xl">{item.title}</h2></div>
            <p className="mt-3 leading-7 text-muted-foreground">{item.text}</p>
            {item.source && <div className="mt-3"><SourceLink href={item.source.url}/></div>}
          </div>
        </article>)}
      </div>
    </section>
  </>;
}
