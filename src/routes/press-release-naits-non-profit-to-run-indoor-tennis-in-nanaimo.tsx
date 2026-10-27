import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";

export const Route = createFileRoute("/press-release-naits-non-profit-to-run-indoor-tennis-in-nanaimo")({
  head: () => ({
    meta: [
      { title: "NAITS Non-Profit to Run Indoor Tennis in Nanaimo | Nanaimo Tennis" },
      { name: "description", content: "NAITS press release on future operation of the Westwood indoor tennis facility in Nanaimo." },
      { property: "og:title", content: "NAITS Non-Profit to Run Indoor Tennis in Nanaimo" },
      { property: "og:description", content: "The City of Nanaimo is developing an operating agreement with the Nanaimo Area Indoor Tennis Society for the Westwood tennis bubble." },
      { property: "og:type", content: "article" },
      { property: "og:url", content: "https://www.nanaimotennis.ca/press-release-naits-non-profit-to-run-indoor-tennis-in-nanaimo" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
    links: [{ rel: "canonical", href: "https://www.nanaimotennis.ca/press-release-naits-non-profit-to-run-indoor-tennis-in-nanaimo" }],
  }),
  component: PressReleasePage,
});

function PressReleasePage() {
  return (
    <>
      <section className="border-b border-border bg-primary text-primary-foreground">
        <div className="page-wrap py-14 sm:py-18">
          <p className="text-xs font-bold uppercase tracking-[.14em] text-primary-foreground/70">Press release · October 27, 2026</p>
          <h1 className="mt-4 max-w-4xl font-serif text-4xl leading-tight sm:text-6xl">NAITS Non-Profit to Run Indoor Tennis in Nanaimo</h1>
        </div>
      </section>

      <section className="section-space">
        <article className="page-wrap max-w-4xl">
          <div className="space-y-6 text-base leading-8 text-foreground/90 sm:text-lg sm:leading-9">
            <p>The City of Nanaimo has consented to working with the non-profit Nanaimo Area Indoor Tennis Society (NAITS) to operate the tennis bubble at 2367 Arbot Road. Contrary to some reports, the city is not actively searching for a non-profit organization to run the facility.</p>

            <p>The city has purchased the property and will take ownership Dec.18, 2026. They are currently developing an operating agreement with NAITS, with the organization anticipated to take over operations of the bubble at the former Westwood Tennis Club on January 1, 2027. The club will cease business November 1, 2026.</p>

            <p>NAITS and others in the tennis community strongly lobbied Nanaimo’s mayor and council to preserve indoor tennis when it was learned that the property had been sold to the city and that the bubble would be removed.</p>

            <p>NAITS will be responsible for ongoing operating, maintenance, and capital costs of the facility, and must ensure that courts are available for public booking. Details will be available closer to the date when NAITS takes over operations.</p>

            <p>Founded by a group of local tennis enthusiasts in 2020, NAITS’ goal is to "Preserve, promote and operate publicly-accessible indoor tennis facilities in Nanaimo and region".</p>

            <p>For more information about NAITS and indoor tennis in Nanaimo, please see nanaimotennis.ca, or contact <a className="font-semibold underline underline-offset-4" href="mailto:communications@nanaimotennis.ca">communications@nanaimotennis.ca</a>.</p>
          </div>

          <div className="mt-10 border-t border-border pt-6">
            <Button asChild variant="outline">
              <Link to="/"><ArrowLeft />Back to home</Link>
            </Button>
          </div>
        </article>
      </section>
    </>
  );
}
