import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight, Mail, ShieldCheck } from "lucide-react";
import { Button } from "@/components/ui/button";

const rates = [
  { name: "Junior", detail: "Under age 19", amount: "$120" },
  { name: "Individual adult", detail: "Includes one junior", amount: "$270" },
  { name: "Couple", detail: "Two-person membership", amount: "$335" },
  { name: "Family", detail: "Includes unlimited juniors", amount: "$400" },
  { name: "Out of town", detail: "Outside the Regional District of Nanaimo", amount: "$180" },
];

export const Route = createFileRoute("/membership")({
  head: () => ({
    meta: [
      { title: "Early Bird Membership | Nanaimo Area Indoor Tennis Society" },
      { name: "description", content: "NAITS Early Bird membership rates for January to March 2027, including current operating-agreement status, refund guarantee and application information." },
      { property: "og:title", content: "NAITS Early Bird Membership · January–March 2027" },
      { property: "og:description", content: "Help support year-round indoor tennis in Nanaimo. See founding membership rates and current terms." },
      { property: "og:url", content: "https://www.nanaimotennis.ca/membership" },
    ],
    links: [{ rel: "canonical", href: "https://www.nanaimotennis.ca/membership" }],
  }),
  component: MembershipPage,
});

function MembershipPage() {
  return <>
    <section className="relative overflow-hidden bg-primary text-primary-foreground">
      <img src="/20260927_132803.jpg" alt="Westwood indoor tennis courts" className="absolute inset-0 size-full object-cover" />
      <div className="absolute inset-0 bg-primary/85" />
      <div className="page-wrap relative py-16 sm:py-24">
        <p className="text-xs font-bold uppercase tracking-[.14em] text-primary-foreground/75">Nanaimo Area Indoor Tennis Society · NAITS</p>
        <h1 className="mt-4 max-w-4xl font-serif text-4xl leading-tight sm:text-6xl">Early Bird Membership</h1>
        <p className="mt-5 max-w-2xl text-lg leading-8 text-primary-foreground/85">Be a founding member and help build the future of accessible, year-round indoor tennis in Nanaimo.</p>
        <div className="mt-6 inline-flex border border-primary-foreground/30 bg-primary-foreground/10 px-4 py-2 text-sm font-semibold">Membership period: January 1 – March 31, 2027</div>
      </div>
    </section>
    <section className="section-space bg-background">
      <div className="page-wrap">
        <div className="max-w-3xl">
          <p className="eyebrow">Founding membership</p>
          <h2 className="mt-2 font-serif text-3xl sm:text-4xl">Support the next chapter at Westwood Lake.</h2>
          <p className="mt-4 leading-7 text-muted-foreground">NAITS has been selected by the City of Nanaimo to take over operations of the four-court air dome at Westwood Lake. A final operating agreement is still being negotiated. Early Bird membership is offered for the initial three-month period to help NAITS prepare for operations.</p>
        </div>
        <div className="mt-8 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {rates.map((rate) => <article key={rate.name} className="civic-card flex flex-col justify-between p-6">
            <div><h3 className="font-serif text-2xl">{rate.name}</h3><p className="mt-2 text-sm text-muted-foreground">{rate.detail}</p></div>
            <div className="mt-7"><p className="font-serif text-4xl font-bold">{rate.amount}</p><p className="mt-1 text-xs text-muted-foreground">Total for Jan–Mar 2027</p></div>
          </article>)}
        </div>
        <p className="mt-4 text-sm leading-6 text-muted-foreground">These discounted rates are available during NAITS's limited initial launch period. An exact closing date has not been announced in the information sheet.</p>
      </div>
    </section>
    <section className="border-y border-border bg-secondary py-12 sm:py-16">
      <div className="page-wrap grid gap-8 lg:grid-cols-2">
        <div><p className="eyebrow">Current status</p><h2 className="mt-2 font-serif text-3xl">Membership details are still being finalized.</h2><p className="mt-4 leading-7 text-muted-foreground">NAITS is in active negotiations with the City of Nanaimo about the operating contract. Specific membership benefits, booking arrangements and court-use fees cannot yet be confirmed. NAITS will keep members informed as details are finalized.</p></div>
        <div className="civic-card p-6 sm:p-8"><ShieldCheck className="size-8 text-ring" /><h2 className="mt-4 font-serif text-2xl">Full refund if an agreement cannot be reached</h2><p className="mt-3 text-sm leading-7 text-muted-foreground">NAITS promises to return Early Bird membership fees in full if it cannot conclude a satisfactory operating contract with the City of Nanaimo, in any case no later than December 31, 2026. This guarantee addresses failure to reach the operating agreement; other cancellation terms have not been specified.</p></div>
      </div>
    </section>
    <section className="section-space">
      <div className="page-wrap grid gap-6 lg:grid-cols-[1fr_auto] lg:items-center">
        <div><p className="eyebrow">How to join</p><h2 className="mt-2 font-serif text-3xl">Request the membership application.</h2><p className="mt-4 max-w-2xl text-sm leading-7 text-muted-foreground">The information sheet instructs applicants to complete the accompanying membership application form and return it with payment. The form and payment instructions are not currently provided on this website; contact Mark Chase for details before sending payment.</p><p className="mt-3 text-sm">Mark Chase · <a className="underline underline-offset-4" href="mailto:mark.chase.66@gmail.com">mark.chase.66@gmail.com</a> · <a className="underline underline-offset-4" href="tel:+12507139128">250-713-9128</a></p></div>
        <Button asChild size="lg"><a href="mailto:mark.chase.66@gmail.com?subject=NAITS%20Early%20Bird%20Membership%20Application"><Mail />Request application</a></Button>
      </div>
    </section>
    <section className="bg-accent py-8"><div className="page-wrap flex flex-wrap items-center justify-between gap-4"><p className="font-serif text-xl text-accent-foreground">Interested in community updates as well?</p><Button asChild><Link to="/join">Stay informed<ArrowRight /></Link></Button></div></section>
  </>;
}
