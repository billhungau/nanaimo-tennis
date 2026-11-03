import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight, ArrowUpRight } from "lucide-react";
import { Button } from "@/components/ui/button";

export const Route = createFileRoute("/about")({
  head: () => ({
    meta: [
      { title: "About FITIN | Friends of Indoor Tennis in Nanaimo" },
      { name: "description", content: "Learn about the Friends of Indoor Tennis in Nanaimo community initiative, its campaign history, and the separate role of the Nanaimo Area Indoor Tennis Society (NAITS)." },
      { property: "og:title", content: "About FITIN and NAITS | Nanaimo Indoor Tennis" },
      { property: "og:url", content: "https://www.nanaimotennis.ca/about" },
    ],
    links: [{ rel: "canonical", href: "https://www.nanaimotennis.ca/about" }],
  }),
  component: AboutPage,
});

function AboutPage() {
  return <>
    <section className="relative overflow-hidden bg-primary text-primary-foreground">
      <img src="/20260927_132803.jpg" alt="Indoor tennis courts at Westwood Lake" className="absolute inset-0 size-full object-cover" />
      <div className="absolute inset-0 bg-primary/85" />
      <div className="page-wrap relative py-12 sm:py-20">
        <p className="eyebrow text-primary-foreground/70">About this website</p>
        <h1 className="mt-3 max-w-3xl font-serif text-3xl sm:text-5xl">Friends of Indoor Tennis in Nanaimo (FITIN)</h1>
        <p className="mt-5 max-w-3xl text-sm leading-7 text-primary-foreground/85 sm:text-lg">A community information initiative that helped advocate for preservation of year-round indoor tennis at Westwood Lake.</p>
      </div>
    </section>
    <section className="py-10 sm:py-16">
      <div className="page-wrap grid gap-7 lg:grid-cols-2">
        <article className="civic-card p-6 sm:p-8"><p className="eyebrow">FITIN</p><h2 className="mt-2 font-serif text-3xl">Community advocacy and information</h2><p className="mt-4 text-sm leading-7 text-muted-foreground">Friends of Indoor Tennis in Nanaimo (FITIN) brought community members together to share information, raise concerns about the proposed loss of the tennis bubble, and document public decisions and supporting evidence. This website preserves that record and continues to share transition updates.</p><Button asChild variant="outline" className="mt-5"><Link to="/timeline">Explore the campaign timeline<ArrowRight /></Link></Button></article>
        <article className="civic-card p-6 sm:p-8"><p className="eyebrow">NAITS</p><h2 className="mt-2 font-serif text-3xl">Prospective facility operator</h2><p className="mt-4 text-sm leading-7 text-muted-foreground">The Nanaimo Area Indoor Tennis Society (NAITS) is a separate society selected by the City of Nanaimo to work toward an operating agreement for the four-court Westwood tennis bubble. NAITS is offering Early Bird memberships while agreement details and membership benefits are being finalized.</p><Button asChild className="mt-5"><Link to="/membership">NAITS membership information<ArrowRight /></Link></Button></article>
      </div>
      <div className="page-wrap mt-8"><div className="border-l-4 border-ring bg-secondary p-5 text-sm leading-7"><strong>Important distinction:</strong> Joining the FITIN Google Group provides community updates and discussion; it does not enroll you as a paid NAITS member. The City–NAITS operating agreement and the reopening date have not yet been finalized.</div></div>
    </section>
    <section className="border-t border-border bg-secondary py-10">
      <div className="page-wrap flex flex-wrap items-center justify-between gap-5"><div><h2 className="font-serif text-2xl">Stay involved</h2><p className="mt-2 text-sm text-muted-foreground">Follow community updates, offer support, or consult the original sources.</p></div><div className="flex flex-wrap gap-2"><Button asChild variant="outline"><Link to="/get-involved">Get involved<ArrowRight /></Link></Button><Button asChild variant="outline"><a href="https://groups.google.com/g/fitin2" target="_blank" rel="noreferrer">FITIN Google Group<ArrowUpRight /></a></Button></div></div>
    </section>
  </>;
}
