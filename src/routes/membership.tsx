import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight, Mail, ShieldCheck } from "lucide-react";
import { Button } from "@/components/ui/button";

const rates = [
  { name: "Junior", detail: "Under age 19", amount: "$120", extended: "$240" },
  { name: "Individual adult", detail: "Includes one junior", amount: "$270", extended: "$540" },
  { name: "Couple", detail: "Couples without junior players in their immediate family", amount: "$335", extended: "$670" },
  { name: "Family", detail: "Includes unlimited juniors", amount: "$400", extended: "$800" },
  { name: "Out of town", detail: "Outside the Regional District of Nanaimo", amount: "$180", extended: "$360" },
];

export const Route = createFileRoute("/membership")({
  head: () => ({
    meta: [
      { title: "Early Bird Membership | Nanaimo Area Indoor Tennis Society" },
      { name: "description", content: "NAITS Early Bird memberships for January–March 2027, with an optional October–December extension, tax-inclusive prices, application methods and refund terms." },
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
            <div className="mt-7"><p className="font-serif text-4xl font-bold">{rate.amount}</p><p className="mt-1 text-xs text-muted-foreground">January–March 2027 · tax included</p><p className="mt-4 border-t border-border pt-3 text-sm font-semibold">Optional six-month total: {rate.extended}</p></div>
          </article>)}
        </div>
        <p className="mt-4 text-sm leading-6 text-muted-foreground">Early Bird prices include tax. Assuming operations begin January 1, the offer closes no later than December 31, 2026; NAITS may withdraw it earlier without advance notice. Regular membership fees after the offer period will not include tax.</p>
        <div className="mt-6 border-l-4 border-ring bg-secondary p-5 text-sm leading-7">
          <strong>Optional six-month prepayment:</strong> Pay twice the three-month price for January–March <strong>and</strong> October–December 2027. These are two separate three-month periods; April–September are not included. Indicate on the application that you are paying for six months. NAITS is not offering April–September or post-2027 membership options while City negotiations continue.
        </div>
      </div>
    </section>
    <section className="border-y border-border bg-secondary py-12 sm:py-16">
      <div className="page-wrap grid gap-8 lg:grid-cols-2">
        <div><p className="eyebrow">Current status</p><h2 className="mt-2 font-serif text-3xl">Membership details are still being finalized.</h2><p className="mt-4 leading-7 text-muted-foreground">NAITS is in active negotiations with the City of Nanaimo about the operating contract. Specific membership benefits, booking arrangements and court-use fees cannot yet be confirmed. NAITS will keep members informed as details are finalized.</p></div>
        <div className="civic-card p-6 sm:p-8"><ShieldCheck className="size-8 text-ring" /><h2 className="mt-4 font-serif text-2xl">Full refund if an agreement cannot be reached</h2><p className="mt-3 text-sm leading-7 text-muted-foreground">NAITS promises to return Early Bird membership fees in full if it cannot conclude a satisfactory operating contract with the City of Nanaimo, in any case no later than December 31, 2026. This guarantee addresses failure to reach the operating agreement; other cancellation terms have not been specified.</p></div>
      </div>
    </section>
    <section className="section-space">
      <div className="page-wrap">
        <p className="eyebrow">How to join</p>
        <h2 className="mt-2 font-serif text-3xl sm:text-4xl">Complete the application and waiver.</h2>
        <p className="mt-4 max-w-3xl text-sm leading-7 text-muted-foreground">Both the Membership Application and Waiver must be completed. The downloadable forms have not yet been supplied to this website. Request copies using the button below, then choose one of the three submission methods announced by NAITS.</p>
        <Button asChild size="lg" className="mt-5"><a href="mailto:pmt.NAITS@outlook.com?subject=Request%20NAITS%20Membership%20Application%20and%20Waiver"><Mail />Request application and waiver</a></Button>
        <div className="mt-8 grid gap-4 lg:grid-cols-3">
          <article className="civic-card p-6"><p className="eyebrow">Option 1</p><h3 className="mt-2 font-serif text-2xl">Paperless</h3><ol className="mt-4 list-decimal space-y-2 pl-5 text-sm leading-6 text-muted-foreground"><li>Download, complete and save the application and waiver.</li><li>Email the completed files to <a className="break-all font-semibold text-foreground underline" href="mailto:pmt.NAITS@outlook.com">pmt.NAITS@outlook.com</a>.</li><li>Send an e-transfer to the same email address.</li></ol></article>
          <article className="civic-card p-6"><p className="eyebrow">Option 2</p><h3 className="mt-2 font-serif text-2xl">Print, scan and email</h3><ol className="mt-4 list-decimal space-y-2 pl-5 text-sm leading-6 text-muted-foreground"><li>Print and complete both forms.</li><li>Scan them into a PDF.</li><li>Email the PDF to <a className="break-all font-semibold text-foreground underline" href="mailto:pmt.NAITS@outlook.com">pmt.NAITS@outlook.com</a> and send payment by e-transfer to that address.</li></ol></article>
          <article className="civic-card p-6"><p className="eyebrow">Option 3</p><h3 className="mt-2 font-serif text-2xl">Postal mail</h3><ol className="mt-4 list-decimal space-y-2 pl-5 text-sm leading-6 text-muted-foreground"><li>Print and complete the application and waiver.</li><li>Mail them with a cheque or money order payable to <strong>Nanaimo Area Indoor Tennis Society</strong>.</li><li>Record your cheque or money-order number on the membership sign-up sheet and email NAITS when you send it.</li></ol><address className="mt-4 border-t border-border pt-4 text-sm not-italic leading-6">NAITS<br />c/o Mark Chase<br />5756 Brookwood Dr<br />Nanaimo, BC V9T 5P2</address></article>
        </div>
        <p className="mt-5 text-sm leading-7 text-muted-foreground">For mailed applications, email <a className="font-semibold text-foreground underline" href="mailto:pmt.NAITS@outlook.com">pmt.NAITS@outlook.com</a> when posting your forms. NAITS says it will honour the Early Bird price if the mail arrives just after the offer ends, provided you emailed when you sent it.</p>
        <div className="mt-8 border-t border-border pt-5"><h3 className="font-serif text-xl">Questions?</h3><p className="mt-2 text-sm">Mark Chase · <a className="underline underline-offset-4" href="mailto:mark.chase.66@gmail.com">mark.chase.66@gmail.com</a> · <a className="underline underline-offset-4" href="tel:+12507139128">250-713-9128</a></p></div>
      </div>
    </section>
    <section className="bg-accent py-8"><div className="page-wrap flex flex-wrap items-center justify-between gap-4"><p className="font-serif text-xl text-accent-foreground">Interested in community updates as well?</p><Button asChild><Link to="/join">Stay informed<ArrowRight /></Link></Button></div></section>
  </>;
}
