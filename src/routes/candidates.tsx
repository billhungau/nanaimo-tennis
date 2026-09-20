import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useMemo, useState } from "react";
import { ChevronDown, Search } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { PageIntro } from "@/components/page-elements";
import { candidateQuestions } from "@/lib/civic-data";
import { supabase } from "@/lib/supabase";

type Filter = "All" | "Mayor" | "Council";
type CandidateRecord = {
  id: string;
  name: string;
  office: "Mayor" | "Council";
  response_status: "received" | "not_received";
  response_date: string | null;
  q1_response: string | null;
  q2_response: string | null;
  q3_response: string | null;
  response_source: string | null;
  last_updated: string;
};

export const Route = createFileRoute("/candidates")({
  head: () => ({ meta: [
    { title: "2026 Candidate Positions | Nanaimo Tennis" },
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
  const [candidates, setCandidates] = useState<CandidateRecord[]>([]);
  const [loading, setLoading] = useState(true);
  const [loadError, setLoadError] = useState<string | null>(null);

  useEffect(() => {
    let cancelled = false;
    const client = supabase;

    async function loadCandidates() {
      if (!client) {
        if (!cancelled) {
          setLoadError("Candidate data is temporarily unavailable because the Supabase connection is not configured.");
          setLoading(false);
        }
        return;
      }

      const { data, error } = await client
        .from("candidates")
        .select("id,name,office,response_status,response_date,q1_response,q2_response,q3_response,response_source,last_updated")
        .order("name", { ascending: true });

      if (cancelled) return;
      if (error) {
        console.error("Unable to load candidates from Supabase", error);
        setLoadError("Candidate data is temporarily unavailable. Please try again shortly.");
      } else {
        setCandidates((data ?? []) as CandidateRecord[]);
      }
      setLoading(false);
    }

    loadCandidates();
    return () => { cancelled = true; };
  }, []);

  const shown = useMemo(() => {
    const filtered = candidates.filter((candidate) => {
      const matchesOffice = filter === "All" || candidate.office === filter;
      const matchesQuery = candidate.name.toLowerCase().includes(query.trim().toLowerCase());
      return matchesOffice && matchesQuery;
    });

    // Guard against accidental duplicate candidate rows in the data source.
    const unique = new Map<string, CandidateRecord>();
    for (const candidate of filtered) {
      const key = `${candidate.name.trim().toLowerCase()}::${candidate.office.toLowerCase()}`;
      const current = unique.get(key);
      if (!current || (current.response_status !== "received" && candidate.response_status === "received")) {
        unique.set(key, candidate);
      }
    }
    return Array.from(unique.values());
  }, [candidates, filter, query]);

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

        {loading && <div className="mt-8 border border-border bg-card px-5 py-10 text-center text-sm text-muted-foreground">Loading candidate information…</div>}
        {!loading && loadError && <div className="mt-8 border border-border bg-card px-5 py-10 text-center text-sm text-muted-foreground">{loadError}</div>}

        {!loading && !loadError && <div className="mt-8 overflow-hidden border border-border bg-card">
          <div className="hidden grid-cols-[1.4fr_.7fr_1fr_8rem] gap-4 border-b border-border bg-secondary px-5 py-3 text-xs font-bold uppercase text-muted-foreground md:grid">
            <span>Candidate</span><span>Office</span><span>Response status</span><span>Response</span>
          </div>
          {shown.map((candidate) => {
            const received = candidate.response_status === "received";
            const responses = [candidate.q1_response, candidate.q2_response, candidate.q3_response];
            const hasResponses = responses.some(Boolean);
            return <article key={candidate.id} className="border-b border-border last:border-0">
              <div className={received
                ? "grid items-center gap-3 px-4 py-4 sm:px-5 sm:py-5 md:grid-cols-[1.4fr_.7fr_1fr_8rem]"
                : "grid grid-cols-[1fr_auto] items-center gap-x-3 gap-y-1 px-4 py-3.5 sm:px-5 md:grid-cols-[1.4fr_.7fr_1fr_8rem] md:gap-3 md:py-5"}>
                <div className="min-w-0">
                  <h2 className="truncate font-serif text-lg">{candidate.name}</h2>
                  {!received && <p className="mt-0.5 text-xs text-muted-foreground md:hidden">{candidate.office}</p>}
                </div>
                <p className={`${received ? "text-sm" : "hidden md:block md:text-sm"} text-muted-foreground`}>{candidate.office}</p>
                <span className={`${received ? "w-fit" : "justify-self-end md:justify-self-start"} rounded-sm border border-border bg-secondary px-2 py-1 text-[11px] font-medium sm:text-xs`}>{received ? "Response received" : "No response"}</span>
                <Button
                  variant="ghost"
                  size="sm"
                  className={received ? "justify-start px-0 md:justify-end" : "col-span-2 mt-1 h-auto justify-start px-0 py-1 text-xs md:col-span-1 md:mt-0 md:h-9 md:justify-end md:py-2 md:text-sm"}
                  onClick={() => setOpen(open === candidate.id ? null : candidate.id)}
                  aria-expanded={open === candidate.id}
                >
                  {received ? "Read response" : "Details"}<ChevronDown className={open === candidate.id ? "rotate-180" : ""}/>
                </Button>
              </div>
              {open === candidate.id && <div className="border-t border-border bg-secondary/50 px-4 py-5 sm:px-5 sm:py-6">
                {received && hasResponses ? <div className="space-y-6">
                  {candidateQuestions.map((question, index) => <div key={question}><p className="text-xs font-bold uppercase tracking-wide text-muted-foreground">Question {index + 1}</p><p className="mt-2 text-sm leading-6">{responses[index] || "No response provided for this question."}</p></div>)}
                  <p className="text-xs text-muted-foreground">Response received {candidate.response_date ?? "date not recorded"}. Responses are published as provided.</p>
                  {candidate.response_source && <p className="text-xs"><a href={candidate.response_source} target="_blank" rel="noreferrer" className="font-semibold underline underline-offset-4">View response source</a></p>}
                </div> : <p className="text-sm text-muted-foreground">No response received as of September 19, 2026. This page will be updated if a response is provided.</p>}
              </div>}
            </article>;
          })}
        </div>}
        {!loading && !loadError && shown.length === 0 && <p className="py-12 text-center text-sm text-muted-foreground">No candidates match this search.</p>}
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
