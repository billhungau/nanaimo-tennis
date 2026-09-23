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
    ["The club is expected to cease operations November 1, 2026.", sources[2]],
    ["The indoor tennis bubble is expected to be removed after closure.", sources[2]],
    ["The City is expected to take possession December 18, 2026.", sources[4]],
    ["The City has said long-term uses will involve planning and community engagement.", sources[2]],
  ];

  return <>
    <PageIntro eyebrow="Evidence" title="What do we actually know?">
      <p>Claims are kept short, sources are shown directly, and information that has not been published is identified rather than inferred.</p>
    </PageIntro>
    <section className="section-space">
      <div className="page-wrap grid gap-12 lg:grid-cols-[1.2fr_.8fr]">
        <div>
          <div className="flex flex-wrap items-end justify-between gap-3 sm:gap-4">
            <h2 className="font-serif text-3xl">Verified in the public record</h2>
            <p className="text-xs text-muted-foreground">Last checked: September 19, 2026</p>
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
          <p className="mt-3 text-sm leading-6 text-muted-foreground">These details may materially affect the decision. No public documentation was located as of September 19, 2026.</p>
          <div className="mt-4">{unknowns.map((item) => <EmptyFact key={item}>{item}</EmptyFact>)}</div>
          <p className="mt-5 border-t border-border pt-5 text-xs leading-5 text-muted-foreground">Where information has not been publicly established, this site labels it as unknown rather than speculating.</p>
        </aside>
      </div>
    </section>
  </>;
}
