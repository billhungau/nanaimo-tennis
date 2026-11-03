import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight, ShieldCheck } from "lucide-react";
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
      <div className="page-wrap relative py-8 sm:py-24">
        <p className="text-[10px] font-bold uppercase tracking-[.10em] text-primary-foreground/75 sm:text-xs sm:tracking-[.14em]">Nanaimo Area Indoor Tennis Society · NAITS</p>
        <h1 className="mt-2 max-w-4xl font-serif text-3xl leading-tight sm:mt-4 sm:text-6xl">Early Bird Membership</h1>
        <p className="mt-3 max-w-2xl text-sm leading-6 text-primary-foreground/85 sm:mt-5 sm:text-lg sm:leading-8">Be a founding member and help build the future of accessible, year-round indoor tennis in Nanaimo.</p>
        <div className="mt-4 inline-flex border border-primary-foreground/30 bg-primary-foreground/10 px-3 py-2 text-xs font-semibold sm:mt-6 sm:px-4 sm:text-sm">Membership period: January 1 – March 31, 2027</div>
        <div className="mt-4 flex flex-wrap gap-2 sm:mt-6"><Button asChild size="sm" className="bg-background text-foreground hover:bg-background/90"><a href="#application">Get application forms<ArrowRight /></a></Button><Button asChild size="sm" variant="outline" className="border-primary-foreground/50 bg-transparent text-primary-foreground hover:bg-primary-foreground/10"><a href="#rates">See rates</a></Button></div>
      </div>
    </section>
    <section id="rates" className="bg-background py-8 sm:py-16">
      <div className="page-wrap">
        <div className="max-w-3xl">
          <p className="eyebrow">Founding membership</p>
          <h2 className="mt-2 font-serif text-2xl leading-tight sm:text-4xl">Support the next chapter at Westwood Lake.</h2>
          <p className="mt-3 text-sm leading-6 text-muted-foreground sm:mt-4 sm:text-base sm:leading-7">NAITS has been selected by the City of Nanaimo to take over operations of the four-court air dome at Westwood Lake. A final operating agreement is still being negotiated. Early Bird membership is offered for the initial three-month period to help NAITS prepare for operations.</p>
        </div>
        <div className="mt-5 rounded-md border border-ring/30 bg-secondary p-3 text-sm font-semibold leading-6 sm:mt-7">All prices below are the total for the full 3-month membership period (January 1–March 31, 2027), NOT a monthly fee. Tax is included.</div>
        <div className="mt-3 grid gap-2 sm:mt-5 sm:grid-cols-2 sm:gap-3 lg:grid-cols-3">
          {rates.map((rate) => <article key={rate.name} className="civic-card flex flex-row items-center justify-between gap-3 p-3 sm:flex-col sm:items-stretch sm:p-6">
            <div><h3 className="font-serif text-lg sm:text-2xl">{rate.name}</h3><p className="mt-1 max-w-[12rem] text-xs leading-4 text-muted-foreground sm:mt-2 sm:max-w-none sm:text-sm sm:leading-6">{rate.detail}</p></div>
            <div className="shrink-0 text-right sm:mt-7 sm:text-left"><p className="text-[10px] font-bold uppercase tracking-wide text-muted-foreground sm:text-xs">3-month total</p><p className="font-serif text-2xl font-bold sm:text-4xl">{rate.amount}</p><p className="mt-0.5 text-[11px] font-medium text-foreground/75 sm:mt-1 sm:text-xs">Jan–Mar 2027 · tax included</p><p className="mt-2 border-t border-border pt-2 text-[11px] text-muted-foreground sm:mt-4 sm:text-sm"><span className="font-semibold">Optional 6-month total:</span> {rate.extended}</p></div>
          </article>)}
        </div>
        <p className="mt-4 text-sm leading-6 text-muted-foreground">Early Bird prices include tax. Assuming operations begin January 1, the offer closes no later than December 31, 2026; NAITS may withdraw it earlier without advance notice. Regular membership fees after the offer period will not include tax.</p>
        <div className="mt-6 border-l-4 border-ring bg-secondary p-5 text-sm leading-7">
          <strong>Optional six-month prepayment:</strong> Pay twice the three-month price for January–March <strong>and</strong> October–December 2027. These are two separate three-month periods; April–September are not included. Indicate on the application that you are paying for six months. NAITS is not offering April–September or post-2027 membership options while City negotiations continue.
        </div>
      </div>
    </section>
    <section className="border-y border-border bg-secondary py-8 sm:py-16">
      <div className="page-wrap grid gap-8 lg:grid-cols-2">
        <div><p className="eyebrow">Current status</p><h2 className="mt-2 font-serif text-3xl">Membership details are still being finalized.</h2><p className="mt-4 leading-7 text-muted-foreground">NAITS is in active negotiations with the City of Nanaimo about the operating contract. Specific membership benefits, booking arrangements and court-use fees cannot yet be confirmed. NAITS will keep members informed as details are finalized.</p></div>
        <div className="civic-card p-6 sm:p-8"><ShieldCheck className="size-8 text-ring" /><h2 className="mt-4 font-serif text-2xl">Full refund if an agreement cannot be reached</h2><p className="mt-3 text-sm leading-7 text-muted-foreground">NAITS promises to return Early Bird membership fees in full if it cannot conclude a satisfactory operating contract with the City of Nanaimo, in any case no later than December 31, 2026. This guarantee addresses failure to reach the operating agreement; other cancellation terms have not been specified.</p></div>
      </div>
    </section>
    <section id="application" className="py-8 sm:py-16">
      <div className="page-wrap">
        <p className="eyebrow">How to join</p>
        <h2 className="mt-2 font-serif text-2xl sm:text-4xl">Complete the application and waiver.</h2>
        <p className="mt-4 max-w-3xl text-sm leading-7 text-muted-foreground">Download or open both forms below, complete them, and choose one of the three submission methods announced by NAITS. Both the Membership Application and Waiver are required.</p>
        <div className="mt-5 flex flex-wrap gap-3">
          <Button asChild size="lg"><a href="https://drive.google.com/file/d/1Pe2l_YLzoeWfvrHp0NPjYb3DPai9NAnW/view?usp=drive_link" target="_blank" rel="noreferrer">Membership Application<ArrowRight /></a></Button>
          <Button asChild size="lg" variant="outline"><a href="https://drive.google.com/file/d/1nzUlVDyR0FOVa0GWl3k0NPf7KLdz9aU1/view?usp=sharing" target="_blank" rel="noreferrer">Waiver<ArrowRight /></a></Button>
        </div>
        <p className="mt-3 text-xs leading-5 text-muted-foreground">These links open Google Drive files. Use the download or print options to obtain copies. If access is restricted, contact <a className="underline" href="mailto:pmt.NAITS@outlook.com">pmt.NAITS@outlook.com</a>.</p>
        <div className="mt-8 grid gap-4 lg:grid-cols-3">
          <article className="civic-card p-6"><p className="eyebrow">Option 1</p><h3 className="mt-2 font-serif text-2xl">Paperless</h3><div className="mt-4 flex flex-wrap gap-2"><a href="https://drive.google.com/file/d/1Pe2l_YLzoeWfvrHp0NPjYb3DPai9NAnW/view?usp=drive_link" target="_blank" rel="noreferrer" className="text-sm font-semibold text-ring underline underline-offset-4">Application ↗</a><a href="https://drive.google.com/file/d/1nzUlVDyR0FOVa0GWl3k0NPf7KLdz9aU1/view?usp=sharing" target="_blank" rel="noreferrer" className="text-sm font-semibold text-ring underline underline-offset-4">Waiver ↗</a></div><ol className="mt-4 list-decimal space-y-2 pl-5 text-sm leading-6 text-muted-foreground"><li>Download, complete and save the application and waiver.</li><li><a className="font-semibold text-foreground underline" href="mailto:pmt.NAITS@outlook.com?subject=NAITS%20Membership%20Application">Email the completed files</a> to pmt.NAITS@outlook.com.</li><li>Send an e-transfer to the same email address.</li></ol></article>
          <article className="civic-card p-6"><p className="eyebrow">Option 2</p><h3 className="mt-2 font-serif text-2xl">Print, scan and email</h3><div className="mt-4 flex flex-wrap gap-2"><a href="https://drive.google.com/file/d/1Pe2l_YLzoeWfvrHp0NPjYb3DPai9NAnW/view?usp=drive_link" target="_blank" rel="noreferrer" className="text-sm font-semibold text-ring underline underline-offset-4">Application ↗</a><a href="https://drive.google.com/file/d/1nzUlVDyR0FOVa0GWl3k0NPf7KLdz9aU1/view?usp=sharing" target="_blank" rel="noreferrer" className="text-sm font-semibold text-ring underline underline-offset-4">Waiver ↗</a></div><ol className="mt-4 list-decimal space-y-2 pl-5 text-sm leading-6 text-muted-foreground"><li>Print and complete both forms.</li><li>Scan them into a PDF.</li><li><a className="font-semibold text-foreground underline" href="mailto:pmt.NAITS@outlook.com?subject=NAITS%20Membership%20Application">Email the scanned PDF</a> to pmt.NAITS@outlook.com and send payment by e-transfer to that address.</li></ol></article>
          <article className="civic-card p-6"><p className="eyebrow">Option 3</p><h3 className="mt-2 font-serif text-2xl">Postal mail</h3><div className="mt-4 flex flex-wrap gap-2"><a href="https://drive.google.com/file/d/1Pe2l_YLzoeWfvrHp0NPjYb3DPai9NAnW/view?usp=drive_link" target="_blank" rel="noreferrer" className="text-sm font-semibold text-ring underline underline-offset-4">Application ↗</a><a href="https://drive.google.com/file/d/1nzUlVDyR0FOVa0GWl3k0NPf7KLdz9aU1/view?usp=sharing" target="_blank" rel="noreferrer" className="text-sm font-semibold text-ring underline underline-offset-4">Waiver ↗</a></div><ol className="mt-4 list-decimal space-y-2 pl-5 text-sm leading-6 text-muted-foreground"><li>Print and complete the application and waiver.</li><li>Mail them with a cheque or money order payable to <strong>Nanaimo Area Indoor Tennis Society</strong>.</li><li>Record your cheque or money-order number on the membership sign-up sheet and email NAITS when you send it.</li></ol><address className="mt-4 border-t border-border pt-4 text-sm not-italic leading-6">NAITS<br />c/o Mark Chase<br />5756 Brookwood Dr<br />Nanaimo, BC V9T 5P2</address></article>
        </div>
        <p className="mt-5 text-sm leading-7 text-muted-foreground">For mailed applications, email <a className="font-semibold text-foreground underline" href="mailto:pmt.NAITS@outlook.com">pmt.NAITS@outlook.com</a> when posting your forms. NAITS says it will honour the Early Bird price if the mail arrives just after the offer ends, provided you emailed when you sent it.</p>
        <div className="mt-8 border-t border-border pt-5"><h3 className="font-serif text-xl">Questions?</h3><p className="mt-2 text-sm">Mark Chase · <a className="underline underline-offset-4" href="mailto:mark.chase.66@gmail.com">mark.chase.66@gmail.com</a> · <a className="underline underline-offset-4" href="tel:+12507139128">250-713-9128</a></p></div>
      </div>
    </section>
    <section className="bg-accent py-8"><div className="page-wrap flex flex-wrap items-center justify-between gap-4"><p className="font-serif text-xl text-accent-foreground">Interested in community updates as well?</p><Button asChild><Link to="/join">Stay informed<ArrowRight /></Link></Button></div></section>
  </>;
}
