import { createFileRoute } from "@tanstack/react-router";
import { MailingListSignup } from "@/components/mailing-list-signup";
import { PageIntro } from "@/components/page-elements";

export const Route = createFileRoute("/join")({
  head: () => ({
    meta: [
      { title: "Join Nanaimo Tennis | Community Updates" },
      { name: "description", content: "Join the Nanaimo Tennis mailing list for occasional updates about indoor tennis, community events and ways to participate in Nanaimo." },
      { property: "og:title", content: "Join Nanaimo Tennis" },
      { property: "og:description", content: "Stay connected with updates about indoor tennis and community participation in Nanaimo." },
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
    <PageIntro eyebrow="Stay connected" title="Join Nanaimo Tennis.">
      <p>Nanaimo's tennis community is spread across clubs, public courts, leagues, families and recreational players. Join the mailing list for occasional updates and opportunities to participate.</p>
    </PageIntro>
    <section className="section-space">
      <div className="page-wrap grid gap-10 lg:grid-cols-[.8fr_1.2fr] lg:gap-12">
        <div>
          <h2 className="font-serif text-3xl">One community, one update list.</h2>
          <p className="mt-4 max-w-xl text-sm leading-7 text-muted-foreground">The list is open to anyone interested in year-round tennis and recreation in Nanaimo. Updates may include public information, community events and opportunities to participate. Joining the list does not imply support for any candidate or political party.</p>
        </div>
        <div className="civic-card p-5 sm:p-8">
          <p className="text-xs font-bold uppercase tracking-[.14em] text-muted-foreground">Email updates</p>
          <h2 className="mt-3 font-serif text-3xl">Stay in the loop.</h2>
          <p className="mt-3 text-sm leading-6 text-muted-foreground">We will only send occasional Nanaimo Tennis updates. Your email address is not published or shared through the public website.</p>
          <div className="mt-6 sm:mt-8"><MailingListSignup source="get-involved" /></div>
        </div>
      </div>
    </section>
  </>;
}
