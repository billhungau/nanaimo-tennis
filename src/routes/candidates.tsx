import { createFileRoute } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import { ChevronDown, Search } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { PageIntro } from "@/components/page-elements";
import { candidateQuestions } from "@/lib/civic-data";
import { supabase } from "@/lib/supabase";

type Filter = "All" | "Mayor" | "Council";
type ResponseFilter = "all" | "received" | "not_received";
type PositionCode = "support" | "conditional" | "unclear" | "oppose";
type CodeField = "q1_code" | "q2_code" | "q3_code";

type CandidateRecord = {
  id: string;
  name: string;
  office: "Mayor" | "Council";
  response_status: "received" | "not_received";
  response_date: string | null;
  q1_response: string | null;
  q2_response: string | null;
  q3_response: string | null;
  q1_code: PositionCode | null;
  q2_code: PositionCode | null;
  q3_code: PositionCode | null;
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

const codeMeta: Record<PositionCode, { label: string; className: string }> = {
  support: { label: "Support", className: "border-blue-200 bg-blue-50 text-blue-800" },
  conditional: { label: "Conditional", className: "border-amber-200 bg-amber-50 text-amber-800" },
  unclear: { label: "Unclear", className: "border-orange-200 bg-orange-50 text-orange-800" },
  oppose: { label: "Does not support", className: "border-purple-200 bg-purple-50 text-purple-800" },
};

function normalizeCandidateName(name: string) {
  return name
    .normalize("NFKD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[’'`]/g, "")
    .replace(/[^a-zA-Z0-9]+/g, " ")
    .trim()
    .toLowerCase();
}

const officeHoldersByKey = new Map(
  Object.entries(currentOfficeHolders).map(([name, role]) => [normalizeCandidateName(name), role]),
);

export const Route = createFileRoute("/candidates")({
  loader: async () => {
    const { data, error } = await supabase
      .from("candidates")
      .select("id,name,office,response_status,response_date,q1_response,q2_response,q3_response,q1_code,q2_code,q3_code,response_source,last_updated")
      .order("name", { ascending: true });

    if (error) {
      console.error("Unable to load public candidate data", error);
      return { candidates: [] as CandidateRecord[], unavailable: true };
    }

    return { candidates: (data ?? []) as CandidateRecord[], unavailable: false };
  },
  head: () => ({
    meta: [
      { title: "2026 Candidate Positions | Nanaimo Tennis" },
      { name: "description", content: "Read Nanaimo mayoral and council candidate responses to the same three questions about year-round indoor tennis." },
      { property: "og:title", content: "Where do Nanaimo's 2026 candidates stand?" },
      { property: "og:description", content: "Candidate responses presented verbatim, without endorsement or ranking." },
      { property: "og:type", content: "website" },
      { property: "og:url", content: "https://www.nanaimotennis.ca/candidates" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
    links: [{ rel: "canonical", href: "https://www.nanaimotennis.ca/candidates" }],
  }),
  component: CandidatesPage,
});

function CandidatesPage() {
  const { candidates, unavailable } = Route.useLoaderData();
  const [filter, setFilter] = useState<Filter>("All");
  const [responseFilter, setResponseFilter] = useState<ResponseFilter>("all");
  const [query, setQuery] = useState("");
  const [open, setOpen] = useState<string | null>(null);
  const [questionsOpen, setQuestionsOpen] = useState(false);

  const uniqueCandidates = useMemo(() => {
    const unique = new Map<string, CandidateRecord>();

    for (const candidate of candidates) {
      const key = `${normalizeCandidateName(candidate.name)}::${candidate.office.toLowerCase()}`;
      const current = unique.get(key);

      if (!current) {
        unique.set(key, candidate);
        continue;
      }

      if (current.response_status !== "received" && candidate.response_status === "received") {
        unique.set(key, candidate);
        continue;
      }

      if (current.response_status === candidate.response_status) {
        const currentUpdated = Date.parse(current.last_updated || "") || 0;
        const candidateUpdated = Date.parse(candidate.last_updated || "") || 0;
        if (candidateUpdated > currentUpdated) unique.set(key, candidate);
      }
    }

    return Array.from(unique.values());
  }, [candidates]);

  const receivedCount = uniqueCandidates.filter((candidate) => candidate.response_status === "received").length;
  const awaitingCount = uniqueCandidates.length - receivedCount;

  const shown = useMemo(() => {
    return uniqueCandidates
      .filter((candidate) => {
        const matchesOffice = filter === "All" || candidate.office === filter;
        const matchesResponse = responseFilter === "all" || candidate.response_status === responseFilter;
        const matchesQuery = candidate.name.toLowerCase().includes(query.trim().toLowerCase());
        return matchesOffice && matchesResponse && matchesQuery;
      })
      .sort((a, b) => {
        if (a.response_status !== b.response_status) return a.response_status === "received" ? -1 : 1;
        return a.name.localeCompare(b.name);
      });
  }, [uniqueCandidates, filter, responseFilter, query]);

  const mayoralCandidates = shown.filter((candidate) => candidate.office === "Mayor");
  const councilCandidates = shown.filter((candidate) => candidate.office === "Council");

  const resultCounts = useMemo(() => {
    const fields: CodeField[] = ["q1_code", "q2_code", "q3_code"];
    return fields.map((field) => {
      const counts: Record<PositionCode, number> = { support: 0, conditional: 0, unclear: 0, oppose: 0 };
      uniqueCandidates
        .filter((candidate) => candidate.response_status === "received")
        .forEach((candidate) => {
          const code = candidate[field];
          if (code) counts[code] += 1;
        });
      return counts;
    });
  }, [uniqueCandidates]);

  function renderResponseText(text: string | null) {
    if (!text) {
      return <p className="text-[15px] leading-7 text-muted-foreground sm:text-base">No response provided for this question.</p>;
    }

    const paragraphs = text
      .split(/\n\s*\n/)
      .map((paragraph) => paragraph.trim())
      .filter(Boolean);

    return <div className="space-y-4 text-[15px] leading-7 text-foreground/90 sm:text-base sm:leading-7">
      {paragraphs.map((paragraph, index) => <p key={index} className="whitespace-pre-line">{paragraph}</p>)}
    </div>;
  }

  function renderCodePill(question: "Q1" | "Q2" | "Q3", code: PositionCode) {
    const meta = codeMeta[code];
    return <span className={`inline-flex shrink-0 items-center gap-1 rounded-full border px-2 py-1 text-[10px] font-semibold sm:text-[11px] md:px-1.5 md:py-0.5 md:text-[10px] ${meta.className}`}>
      <span className="size-1.5 rounded-full bg-current" aria-hidden="true" />
      {question} {meta.label}
    </span>;
  }

  function renderCandidate(candidate: CandidateRecord) {
    const received = candidate.response_status === "received";
    const responses = [candidate.q1_response, candidate.q2_response, candidate.q3_response];
    const codes = [candidate.q1_code, candidate.q2_code, candidate.q3_code];
    const hasResponses = responses.some(Boolean);
    const nameKey = normalizeCandidateName(candidate.name);
    const currentRole = officeHoldersByKey.get(nameKey);
    const candidateKey = `${nameKey}::${candidate.office.toLowerCase()}`;
    const isOpen = open === candidateKey;

    return <article key={candidateKey} className="border-b border-border bg-card last:border-0">
      <div className="grid grid-cols-1 gap-2 px-4 py-3.5 sm:px-5 md:grid-cols-[minmax(0,2.2fr)_minmax(22rem,2.2fr)_7.5rem] md:items-center md:gap-3 md:py-4">
        <div className="min-w-0">
          <div className="flex flex-wrap items-center gap-2">
            <h3 className="font-serif text-base leading-snug sm:text-lg">{candidate.name}</h3>
            {currentRole && <span className="shrink-0 rounded-sm border border-border bg-secondary/70 px-2 py-0.5 text-[10px] font-medium text-muted-foreground sm:text-[11px]">{currentRole}</span>}
          </div>
        </div>

        <div className="flex flex-wrap gap-1.5 md:flex-nowrap md:justify-start md:gap-1 md:whitespace-nowrap">
          {received ? <>
            {codes.map((code, index) => code
              ? <span key={index}>{renderCodePill(`Q${index + 1}` as "Q1" | "Q2" | "Q3", code)}</span>
              : <span key={index} className="inline-flex shrink-0 items-center rounded-full border border-border bg-secondary/50 px-2 py-1 text-[10px] font-semibold text-muted-foreground sm:text-[11px] md:px-1.5 md:py-0.5 md:text-[10px]">Q{index + 1} Not coded</span>)}
          </> : <span className="rounded-sm border border-border bg-secondary/50 px-2 py-1 text-[11px] font-medium text-muted-foreground sm:text-xs">No response yet</span>}
        </div>

        <Button
          variant="ghost"
          size="sm"
          className="h-auto w-fit justify-start px-0 py-1 text-xs md:ml-auto md:h-9 md:justify-end md:py-2 md:text-sm"
          onClick={() => setOpen(isOpen ? null : candidateKey)}
          aria-expanded={isOpen}
        >
          {received ? (isOpen ? "Hide response" : "Read response") : (isOpen ? "Hide details" : "Details")}
          <ChevronDown className={`transition-transform ${isOpen ? "rotate-180" : ""}`} />
        </Button>
      </div>

      <div hidden={!isOpen} className="border-t border-border bg-secondary/25 px-4 py-6 sm:px-6 sm:py-8">
        {received && hasResponses ? <div className="mx-auto max-w-4xl">
          <div className="rounded-sm border border-border bg-background px-4 py-1 sm:px-7 sm:py-2">
            {candidateQuestions.map((question, index) => <section key={question} className="border-b border-border py-6 last:border-0 sm:py-7">
              <div className="flex flex-wrap items-center gap-2">
                <p className="text-[11px] font-bold uppercase tracking-[.14em] text-muted-foreground">Question {index + 1}</p>
                {codes[index] && renderCodePill(`Q${index + 1}` as "Q1" | "Q2" | "Q3", codes[index] as PositionCode)}
              </div>
              <h4 className="mt-2 max-w-3xl text-sm font-semibold leading-6 text-foreground sm:text-[15px]">{question}</h4>
              <div className="mt-4 max-w-3xl">{renderResponseText(responses[index])}</div>
            </section>)}
          </div>

          <div className="mt-4 flex flex-col gap-2 border-t border-border pt-4 text-xs leading-5 text-muted-foreground sm:flex-row sm:items-center sm:justify-between">
            <p>Response received {candidate.response_date ?? "date not recorded"}. Responses are published as provided.</p>
            {candidate.response_source && <p><a href={candidate.response_source} target="_blank" rel="noreferrer" className="font-semibold text-foreground underline underline-offset-4">View response source</a></p>}
          </div>
        </div> : <div className="mx-auto max-w-3xl rounded-sm border border-border bg-background p-5 sm:p-6">
          <p className="text-sm leading-6 text-muted-foreground">No response has been recorded yet. This page will be updated if a response is provided.</p>
        </div>}
      </div>
    </article>;
  }

  function renderCandidateSection(title: string, description: string, items: CandidateRecord[]) {
    if (items.length === 0) return null;

    return <section className="mt-9 first:mt-8">
      <div className="mb-3 flex flex-col gap-1 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <h2 className="font-serif text-xl sm:text-2xl">{title}</h2>
          <p className="mt-1 text-sm text-muted-foreground">{description}</p>
        </div>
        <p className="text-xs font-medium text-muted-foreground">{items.length} {items.length === 1 ? "candidate" : "candidates"}</p>
      </div>

      <div className="overflow-hidden rounded-sm border border-border bg-card shadow-sm">
        <div className="hidden grid-cols-[minmax(0,2.2fr)_minmax(22rem,2.2fr)_7.5rem] gap-4 border-b border-border bg-secondary/70 px-5 py-3 text-[11px] font-bold uppercase tracking-[.08em] text-muted-foreground md:grid">
          <span>Candidate</span>
          <span>Response coding</span>
          <span className="text-right">Response</span>
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
          {questionsOpen ? "Hide full wording" : "Read full wording"}
          <ChevronDown className={questionsOpen ? "rotate-180" : ""} />
        </Button>

        {questionsOpen && <div className="mt-2 border-t border-border">
          {candidateQuestions.map((question, index) => <article className="grid gap-2 border-b border-border py-5 md:grid-cols-[7rem_1fr]" key={question}>
            <p className="text-xs font-bold uppercase tracking-wide text-muted-foreground">Question {index + 1}</p>
            <p className="max-w-3xl text-sm leading-6">{question}</p>
          </article>)}
        </div>}
      </div>
    </section>

    <section className="border-b border-border bg-secondary/20 py-7 sm:py-10">
      <div className="page-wrap">
        <p className="eyebrow">Questionnaire results</p>
        <div className="mt-2 flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between">
          <h2 className="font-serif text-2xl sm:text-3xl">Results among candidates who responded</h2>
          <p className="text-sm text-muted-foreground"><strong className="text-foreground">{receivedCount} of {uniqueCandidates.length}</strong> candidates responded · {uniqueCandidates.length ? Math.round((receivedCount / uniqueCandidates.length) * 1000) / 10 : 0}%</p>
        </div>

        <div className="mt-5 grid gap-3 md:grid-cols-3">
          {[
            ["Q1", "Pause removal"],
            ["Q2", "Evaluate alternatives"],
            ["Q3", "Long-term planning"],
          ].map(([question, title], index) => {
            const counts = resultCounts[index];
            return <article key={question} className="border border-border bg-card p-4 sm:p-5">
              <p className="text-[11px] font-bold uppercase tracking-[.12em] text-muted-foreground">{question}</p>
              <h3 className="mt-1 font-serif text-lg">{title}</h3>
              <div className="mt-4 space-y-2 text-sm">
                {(["support", "conditional", "unclear", "oppose"] as PositionCode[]).map((code) => {
                  const percentage = receivedCount ? Math.round((counts[code] / receivedCount) * 100) : 0;
                  const textClass = codeMeta[code].className.split(" ").find((item) => item.startsWith("text-")) ?? "";
                  return <div key={code} className="flex items-center justify-between gap-3">
                    <span className={`inline-flex items-center gap-2 ${textClass}`}><span className="size-2 rounded-full bg-current" />{codeMeta[code].label}</span>
                    <strong>{counts[code]} <span className="font-normal text-muted-foreground">({percentage}%)</span></strong>
                  </div>;
                })}
              </div>
            </article>;
          })}
        </div>

        <p className="mt-4 max-w-4xl text-xs leading-5 text-muted-foreground">Results summarize the {receivedCount} candidates who responded. {awaitingCount} candidates have not responded and are shown separately below. Categories summarize the position expressed in each response. They are descriptive codes, not ratings or endorsements.</p>

        <details className="mt-3 text-sm">
          <summary className="cursor-pointer font-semibold text-foreground">How responses were categorized</summary>
          <div className="mt-3 max-w-4xl space-y-2 border-l-2 border-border pl-4 text-sm leading-6 text-muted-foreground">
            <p><strong className="text-foreground">Support:</strong> the response clearly supports the proposition. <strong className="text-foreground">Conditional:</strong> support depends on feasibility, cost, safety, consultation or another stated condition.</p>
            <p><strong className="text-foreground">Unclear:</strong> the response does not establish a sufficiently clear position. <strong className="text-foreground">Does not support:</strong> the response clearly opposes the proposition.</p>
            <p>Each question was coded separately, so a candidate can receive different codes for Q1, Q2 and Q3. Candidates who did not respond are excluded from the response distributions and are reported separately; non-response is never interpreted as a position.</p>
          </div>
        </details>
      </div>
    </section>

    <section className="section-space">
      <div className="page-wrap">
        <div className="mb-6">
          <p className="eyebrow">Candidate responses</p>
          <h2 className="mt-2 font-serif text-2xl sm:text-3xl">Explore candidate responses</h2>
          {!unavailable && <div className="mt-4 flex flex-wrap gap-x-5 gap-y-2 border-b border-border pb-5 text-sm text-muted-foreground">
            <span><strong className="font-semibold text-foreground">{receivedCount}</strong> responses received</span>
            <span><strong className="font-semibold text-foreground">{awaitingCount}</strong> awaiting response</span>
            <span><strong className="font-semibold text-foreground">{uniqueCandidates.length}</strong> candidates listed</span>
          </div>}
        </div>

        <div className="grid gap-4 lg:grid-cols-[1fr_auto] lg:items-end">
          <div className="space-y-3">
            <div className="flex flex-wrap gap-2" role="group" aria-label="Filter candidates by office">
              {(["All", "Mayor", "Council"] as Filter[]).map((item) => <Button key={item} size="sm" variant={filter === item ? "default" : "outline"} onClick={() => setFilter(item)}>{item}</Button>)}
            </div>
            <div className="flex flex-wrap gap-2" role="group" aria-label="Filter candidates by response status">
              <Button size="sm" variant={responseFilter === "all" ? "secondary" : "ghost"} onClick={() => setResponseFilter("all")}>All responses</Button>
              <Button size="sm" variant={responseFilter === "received" ? "secondary" : "ghost"} onClick={() => setResponseFilter("received")}>Responses received</Button>
              <Button size="sm" variant={responseFilter === "not_received" ? "secondary" : "ghost"} onClick={() => setResponseFilter("not_received")}>No response yet</Button>
            </div>
          </div>

          <div className="relative w-full lg:w-72">
            <Search className="absolute left-3 top-3 size-4 text-muted-foreground" />
            <Input value={query} onChange={(event) => setQuery(event.target.value)} placeholder="Search candidate" className="pl-10" aria-label="Search candidate" />
          </div>
        </div>

        {unavailable && <div className="mt-8 border border-border bg-card px-5 py-10 text-center text-sm text-muted-foreground">Candidate data is temporarily unavailable. Please try again shortly.</div>}

        {!unavailable && <>
          {renderCandidateSection("Mayoral candidates", "Candidates for Mayor", mayoralCandidates)}
          {renderCandidateSection("Council candidates", "Candidates for Nanaimo City Council", councilCandidates)}
        </>}

        {!unavailable && shown.length === 0 && <p className="py-12 text-center text-sm text-muted-foreground">No candidates match these filters.</p>}

        <p className="mt-4 text-xs leading-5 text-muted-foreground">Candidate names are drawn from the City of Nanaimo's official nomination documents. Responding candidates are shown first, followed by candidates who have not responded; each group is alphabetical within each office. Incumbency labels identify current City office-holders as of September 2026 and are provided as factual context only.</p>
      </div>
    </section>
  </>;
}
