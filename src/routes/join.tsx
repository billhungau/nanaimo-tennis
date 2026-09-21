import { createFileRoute } from "@tanstack/react-router";
import { ArrowUpRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { PageIntro } from "@/components/page-elements";

const groupUrl = "https://groups.google.com/g/fitin2";

export const Route = createFileRoute("/join")({
  head: () => ({
    meta: [
      { title: "Community Updates | Nanaimo Tennis" },
      { name: "description", content: "Join the Friends of Indoor Tennis in Nanaimo Google Group for community updates, discussion and coordination about year-round indoor tennis." },
      { property: "og:title", content: "Nanaimo Tennis community updates" },
      { property: "og:description", content: "Stay connected through the Friends of Indoor Tennis in Nanaimo Google Group." },
      { property: "og:type", content: "website" },
      { property: "og:url", content: "https://www.nanaimotennis.ca/join" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
    links: [{ rel: "canonical", href: "https://www.nanaimotennis.ca/join" }],
  }),
  component: JoinPage,
});

function JoinPage() {
  return <>
    <PageIntro eyebrow="Stay connected" title="Join the community updates.">
      <p>The Friends of Indoor Tennis in Nanaimo Google Group is the central community channel for updates, discussion and coordination about year-round indoor tennis in Nanaimo.</p>
    </PageIntro>
    <section className="section-space">
      <div className="page-wrap grid gap-10 lg:grid-cols-[.8fr_1.2fr] lg:gap-12">
        <div>
          <h2 className="font-serif text-3xl">One place for community updates.</h2>
          <p className="mt-4 max-w-xl text-sm leading-7 text-muted-foreground">The group is open to people interested in indoor tennis and recreation in Nanaimo. Members can receive community updates, share information and coordinate participation. Joining the group does not imply support for any candidate or political party.</p>
        </div>
        <div className="civic-card p-5 sm:p-8">
          <p className="text-xs font-bold uppercase tracking-[.14em] text-muted-foreground">Friends of Indoor Tennis in Nanaimo</p>
          <h2 className="mt-3 font-serif text-3xl">Stay informed through the Google Group.</h2>
          <p className="mt-3 text-sm leading-6 text-muted-foreground">Community updates, City developments, meetings, media coverage and opportunities to participate can be shared through one centralized channel.</p>
          <div className="mt-6 sm:mt-8">
            <Button asChild size="lg"><a href={groupUrl} target="_blank" rel="noreferrer">Join the Google Group<ArrowUpRight /></a></Button>
          </div>
        </div>
      </div>
    </section>
  </>;
}
