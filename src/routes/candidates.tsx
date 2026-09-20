import { createFileRoute } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import { ChevronDown, Search } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { PageIntro } from "@/components/page-elements";
import { candidateQuestions, candidates } from "@/lib/civic-data";

type Filter = "All" | "Mayor" | "Council";

export const Route = createFileRoute("/candidates")({
  head: () => ({ meta: [
    { title: "2026 Candidate Positions | Indoor Tennis Nanaimo" },
    { name: "description", content: "Read Nanaimo mayoral and council candidate responses to the same three questions about year-round indoor tennis." },
    { property: "og:title", content: "Where do Nanaimo's 2026 candidates stand?" },
    { property: "og:description", content: "Candidate responses presented verbatim, without endorsement or ranking." },
    { property: "og:type", content: "website" },
    { property: "og:url", content: "https://nanaimo-tennis.lovable.app/candidates" },
    { name: "twitter:card", content: "summary_large_image" },
  ], links: [{ rel: "canonical", href: "https://nanaimo-tennis.lovable.app/candidates" }] }),
  component: CandidatesPage,
});

function CandidatesPage() {
  const [filter, setFilter] = useState<Filter>("All");
  const [query, setQuery] = useState("");
  const [open, setOpen] = useState<string | null>(null);

  const shown = useMemo(() => candidates.filter((candidate) => {
    const matchesOffice = filter === "All" || candidate.office === filter;
    const matchesQuery = candidate.name.toLowerCase().includes(query.trim().toLowerCase());
    return matchesOffice && matchesQuery;
  }), [filter, query]);

  return <>
    <PageIntro eyebrow="2026 municipal election" title="Where do Nanaimo's candidates stand?">
      <p>Every mayoral and council candidate is being asked the same questions. Responses are published without endorsement, ranking or editorial scoring so residents can read candidates' positions directly.</p>
    </PageIntro>

    <section className="section-space">
      <div className="page-wrap">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex flex-wrap gap-2" role="group" aria-label="Filter candidates">
            {(["All","Mayor","Council"] as Filter[]).map((item) => <Button key={item} variant={filter === item ? "default" : "outline"} onClick={() => setFilter(item)}>{item}</Button>)}
          </div>
          <div className="relative w-full sm:max-w-xs">
            <Search className="absolute left-3 top-3 size-4 text-muted-foreground" />
            <Input value={query} onChange={(event) => setQuery(event.target.value)} placeholder="Search candidate" className="pl-10" aria-label="Search candidate" />
          </div>
        </div>

        <div className="mt-8 overflow-hidden border border-border bg-card">
          <div className="hidden grid-cols-[1.4fr_.7fr_1fr_8rem] gap-4 border-b border-border bg-secondary px-5 py-3 text-xs font-bold uppercase text-muted-foreground md:grid">
            <span>Candidate</span><span>Office</span><span>Response status</span><span>Response</span>
          </div>
          {shown.map((candidate) => {
            const received = candidate.responseStatus === "received";
            return <article key={candidate.name} className="border-b border-border last:border-0">
              <div className="grid items-center gap-3 px-5 py-5 md:grid-cols-[1.4fr_.7fr_1fr_8rem]">
                <h2 className="font-serif text-lg">{candidate.name}</h2>
                <p className="text-sm text-muted-foreground">{candidate.office}</p>
                <span className="w-fit rounded-sm border border-border bg-secondary px-2 py-1 text-xs font-medium">{received ? "Response received" : "No response received"}</span>
                <Button variant="ghost" className="justify-start px-0 md:justify-end" onClick={() => setOpen(open === candidate.name ? null : candidate.name)}>{received ? "Read response" : "Details"}<ChevronDown className={open === candidate.name ? "rotate-180" : ""}/></Button>
              </div>
              {open === candidate.name && <div className="border-t border-border bg-secondary/50 px-5 py-6">
                {received && candidate.responses ? <div className="space-y-6">
                  {candidateQuestions.map((question, index) => <div key={question}><p className="text-xs font-bold uppercase tracking-wide text-muted-foreground">Question {index + 1}</p><p className="mt-2 text-sm leading-6">{candidate.responses?.[index]}</p></div>)}
                  <p className="text-xs text-muted-foreground">Response received {candidate.responseDate ?? "date not recorded"}. Responses are published as provided.</p>
                </div> : <p className="text-sm text-muted-foreground">No response received as of September 19, 2026. This page will be updated if a response is provided.</p>}
              </div>}
            </article>;
          })}
        </div>
        {shown.length === 0 && <p className="py-12 text-center text-sm text-muted-foreground">No candidates match this search.</p>}
        <p className="mt-4 text-xs text-muted-foreground">Candidate names are drawn from the City of Nanaimo's official nomination documents. Candidates are listed alphabetically.</p>
      </div>
    </section>

    <section className="section-space bg-secondary">
      <div className="page-wrap">
        <h2 className="font-serif text-3xl">Questions sent to every candidate</h2>
        <p className="mt-3 max-w-3xl text-sm leading-6 text-muted-foreground">The same wording is used for every candidate. Full responses are presented without endorsement or ranking.</p>
        <div className="mt-8 border-t border-border">{candidateQuestions.map((question, index) => <article className="grid gap-3 border-b border-border py-7 md:grid-cols-[9rem_1fr]" key={question}><p className="text-xs font-bold uppercase tracking-wide text-muted-foreground">Question {index + 1}</p><p className="text-sm leading-7">{question}</p></article>)}</div>
      </div>
    </section>
  </>;
}
