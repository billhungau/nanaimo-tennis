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

const questionSummaries = [
  "Pause removal until public consultation and a feasibility review are completed?",
  "Evaluate nonprofit, lease, partnership or other operating models before removal?",
  "What role should year-round indoor racquet-sport facilities play in long-term recreation planning?",
];

const currentOfficeHolders: Record<string, string> = {
  "Leonard Eugene Krog": "Incumbent Mayor",
  "Sheryl Armstrong": "Current Councillor",
  "Hilary Eastmure": "Current Councillor",
  "Ben Geselbracht": "Current Councillor",
  "Erin Colleen Hemmens": "Current Councillor",
  "Paul Manly": "Current Councillor",
  "Janice Perrino": "Current Councillor",
  "Ian Thorpe": "Current Councillor",
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
  const [questionsOpen, setQuestionsOpen] = useState(false);
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

    const unique = new Map<string, CandidateRecord>();
    for (const candidate of filtered) {
      const key = `${candidate.name.trim().toLowerCase()}::${candidate.office.toLowerCase()}`;
      const current = unique.get(key);
      if (!current || (current.response_status !== "received" && candidate.response_status === "received")) {
        unique.set(key, candidate);
      }
    }

    return Array.from(unique.values()).sort((a, b) => a.name.localeCompare(b.name));
  }, [candidates, filter, query]);

  const mayoralCandidates = shown.filter((candidate) => candidate.office === "Mayor");
  const councilCandidates = shown.filter((candidate) => candidate.office === "Council");

  function renderCandidate(candidate: CandidateRecord) {
    const received = candidate.response_status === "received";
    const responses = [candidate.q1_response, candidate.q2_response, candidate.q3_response];
    const hasResponses = responses.some(Boolean);
    const currentRole = currentOfficeHolders[candidate.name];

    return <article key={candidate.id} className={`border-b border-border last:border-0 ${received ? "bg-primary/[0.065]" : "bg-card"}`}>
      <div className="grid grid-cols-[minmax(0,1fr)_auto] items-center gap-x-3 gap-y-1 px-4 py-3 sm:px-5 md:grid-cols-[minmax(0,3fr)_minmax(10rem,1.25fr)_7.5rem] md:gap-3 md:py-4">
        <div className="min-w-0">
          <div className="flex min-w-0 flex-wrap items-center gap-2">
            <h3 className="truncate font-serif text-base sm:text-lg">{candidate.name}</h3>
            {currentRole && <span className="shrink-0 rounded-sm border border-border bg-secondary/70 px-2 py-0.5 text-[10px] font-medium text-muted-foreground sm:text-[11px]">{currentRole}</span>}
          </div>
        </div>
        <span className={`${received
          ? "justify-self-end border-primary/30 bg-primary/15 text-primary md:justify-self-start"
          : "justify-self-end border-border bg-secondary/60 text-muted-foreground md:justify-self-start"} rounded-sm border px-2 py-1 text-[11px] font-medium sm:text-xs`}>
          {received ? "Response received" : "No response"}
        </span>
        <Button
          variant="ghost"
          size="sm"
          className="col-span-2 h-auto justify-start px-0 py-1 text-xs md:col-span-1 md:h-9 md:justify-end md:py-2 md:text-sm"
          onClick={() => setOpen(open === candidate.id ? null : candidate.id)}
          aria-expanded={open === candidate.id}
        >
          {received ? "Read response" : "Details"}<ChevronDown className={open === candidate.id ? "rotate-180" : ""}/>
        </Button>
      </div>
      {open === candidate.id && <div className={`border-t border-border px-4 py-5 sm:px-5 sm:py-6 ${received ? "bg-primary/[0.035]" : "bg-secondary/50"}`}>
        {received && hasResponses ? <div className="space-y-6">
          {candidateQuestions.map((question, index) => <div key={question}><p className="text-xs font-bold uppercase tracking-wide text-muted-foreground">Question {index + 1}</p><p className="mt-2 whitespace-pre-line text-sm leading-6">{responses[index] || "No response provided for this question."}</p></div>)}
          <p className="text-xs text-muted-foreground">Response received {candidate.response_date ?? "date not recorded"}. Responses are published as provided.</p>
          {candidate.response_source && <p className="text-xs"><a href={candidate.response_source} target="_blank" rel="noreferrer" className="font-semibold underline underline-offset-4">View response source</a></p>}
        </div> : <p className="text-sm text-muted-foreground">No response has been recorded yet. This page will be updated if a response is provided.</p>}
      </div>}
    </article>;
  }

  function renderCandidateSection(title: string, description: string, items: CandidateRecord[]) {
    if (items.length === 0) return null;

    return <section className="mt-8 first:mt-8">
      <div className="mb-3">
        <h2 className="font-serif text-xl sm:text-2xl">{title}</h2>
        <p className="mt-1 text-sm text-muted-foreground">
          {description} <span aria-hidden="true">·</span> {items.length} {items.length === 1 ? "candidate" : "candidates"}
        </p>
      </div>

      <div className="overflow-hidden border border-border bg-card">
        <div className="hidden grid-cols-[minmax(0,3fr)_minmax(10rem,1.25fr)_7.5rem] gap-4 border-b border-border bg-secondary px-5 py-3 text-xs font-bold uppercase text-muted-foreground md:grid">
          <span>Candidate</span><span>Response status</span><span>Response</span>
        </div>
        {items.map(renderCandidate)}
      </div>
    </section>;
  }

  return <>
    <PageIntro eyebrow="2026 municipal election" title="Where do Nanaimo's candidates stand?">
      <p>Every mayoral and council candidate is being asked the same three questions about the future of year-round indoor tennis. Responses are published without endorsement, ranking or editorial scoring so residents can read candidates' positions directly.</p>
    </PageIntro>

    <section className="border-b border-border bg-card py-6 sm:py-8">
      <div className="page-wrap">
        <div>
          <p className="eyebrow">Same questions for every candidate</p>
          <h2 className="mt-2 font-serif text-2xl sm:text-3xl">The 3 questions we asked</h2>
        </div>

        <div className="mt-5 grid gap-3 md:grid-cols-3">
          {questionSummaries.map((summary, index) => <div key={summary} className="flex gap-3 border border-border bg-secondary/35 p-4">
            <span className="flex size-7 shrink-0 items-center justify-center rounded-full border border-border bg-background text-xs font-bold">{index + 1}</span>
            <p className="text-sm leading-6">{summary}</p>
          </div>)}
        </div>

        <Button type="button" variant="ghost" className="mt-3 h-auto px-0 py-2 text-sm" onClick={() => setQuestionsOpen((value) => !value)} aria-expanded={questionsOpen}>
          {questionsOpen ? "Hide full wording" : "Read full wording"}<ChevronDown className={questionsOpen ? "rotate-180" : ""}/>
        </Button>

        {questionsOpen && <div className="mt-2 border-t border-border">
          {candidateQuestions.map((question, index) => <article className="grid gap-2 border-b border-border py-5 md:grid-cols-[7rem_1fr]" key={question}>
            <p className="text-xs font-bold uppercase tracking-wide text-muted-foreground">Question {index + 1}</p>
            <p className="text-sm leading-6">{question}</p>
          </article>)}
        </div>}
      </div>
    </section>

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

        {!loading && !loadError && <>
          {renderCandidateSection("Mayoral candidates", "Candidates for Mayor", mayoralCandidates)}
          {renderCandidateSection("Council candidates", "Candidates for Nanaimo City Council", councilCandidates)}
        </>}

        {!loading && !loadError && shown.length === 0 && <p className="py-12 text-center text-sm text-muted-foreground">No candidates match this search.</p>}
        <p className="mt-4 text-xs text-muted-foreground">Candidate names are drawn from the City of Nanaimo's official nomination documents. Candidates are listed alphabetically within each office. Incumbency labels identify current City office-holders as of September 2026 and are provided as factual context only.</p>
      </div>
    </section>
  </>;
}
