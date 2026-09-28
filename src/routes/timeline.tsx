import { createFileRoute } from "@tanstack/react-router";
import { SourceLink } from "@/components/page-elements";
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
    <section className="relative overflow-hidden bg-primary text-primary-foreground">
      <img
        src="/20260927_132624.jpg"
        alt="Exterior of the Westwood Lake indoor tennis facility"
        className="absolute inset-0 size-full object-cover object-center"
      />
      <div className="absolute inset-0 bg-primary/78" />
      <div className="page-wrap relative py-16 sm:py-20">
        <p className="text-xs font-bold uppercase tracking-[.14em] text-primary-foreground/70">Timeline</p>
        <h1 className="mt-4 max-w-4xl font-serif text-4xl leading-tight sm:text-6xl">A clear chronology of what has happened—and what comes next.</h1>
        <div className="mt-6 max-w-3xl text-base leading-7 text-primary-foreground/85 sm:text-lg">
          <p>Dates below distinguish events that have occurred from scheduled, expected and future steps.</p>
        </div>
      </div>
    </section>
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
