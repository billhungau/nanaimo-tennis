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

const earlyBirdFaq = [
  { question: "How much does membership cost, and is it charged monthly?", answer: "Each advertised Early Bird fee is the total for January 1–March 31, 2027 (three months), not a monthly payment. Tax is included." },
  { question: "When does the Early Bird offer end?", answer: "Assuming operations begin January 1, 2027, the offer ends no later than December 31, 2026. NAITS may withdraw it earlier without advance notice." },
  { question: "Can I pay for six months instead of three?", answer: "Yes. Pay twice the listed three-month fee to cover January–March AND October–December 2027. These are non-consecutive periods: April–September is not included. Indicate the six-month selection on your application." },
  { question: "Does Couple membership include juniors?", answer: "No. The Couple category is intended for couples without junior tennis players in their immediate family. Individual adult membership includes one junior; Family membership includes unlimited juniors." },
  { question: "Why does an Individual adult membership include a junior?", answer: "NAITS has retained the historical Westwood approach of including one junior with an adult membership to encourage youth participation. The Early Bird offer does not list a separate adult-only price." },
  { question: "How do I submit my application and payment?", answer: "Complete both the Membership Application and Waiver. You can email completed files and send an e-transfer to pmt.NAITS@outlook.com, scan and email printed forms with an e-transfer, or mail printed forms with a cheque or money order. Full instructions and PDF links are in the How to Join section above." },
  { question: "What if my mailed application arrives after the deadline?", answer: "NAITS has said it will honour the Early Bird price if you email pmt.NAITS@outlook.com when you mail the forms, even if they arrive just after the offer ends." },
  { question: "What happens if NAITS cannot reach an agreement with the City?", answer: "NAITS promises a full refund of Early Bird membership fees if it cannot conclude a satisfactory operating contract with the City by December 31, 2026. Other cancellation terms have not been specified." },
];

const preliminaryFaq = [
  { question: "What advantages are members expected to receive?", answer: "The Board has approved a seven-day-plus-one-hour booking window and a member court rental rate of $18/hour, subject to implementation and the City agreement. Other possible benefits, including leagues, clinics, tournaments, lessons, socials and a ball machine, are not all finalized." },
  { question: "Can non-members book courts?", answer: "Yes. The Board approved a public booking window of up to 72 hours (three days) in advance and a public court rate of $38/hour, benchmarked against Victoria public facilities. The exact allocation of court time for public bookings and the booking platform are still to be finalized." },
  { question: "Will there be separate singles and doubles courts?", answer: "No separate singles-only or doubles-only courts are proposed. NAITS has approved a 1:1 or higher member-to-non-member booking ratio: for example, a member cannot book a doubles court for three or four non-members, or a singles court for two non-members. The booking system's final implementation remains to be announced." },
  { question: "Can a regular group reserve the same time every week?", answer: "The Board has adopted a block-booking policy for established regular groups, with a designated coordinator and player roster. Up to three courts may be reserved for a block, subject to limitations and cancellation rules. Spare players may be members or public users, with non-members charged the non-member rate for their share. Contact NAITS before assuming a block reservation is confirmed." },
  { question: "Will lessons and coaching be available?", answer: "NAITS has approved a proposed independent-contractor coaching model, including an approved-coach list and provision for individual and group lessons. The details of coaching accounts, monthly dues, rental rates and coach participation are still being finalized. Lessons are not yet open for booking." },
  { question: "Will the courts and bubble be maintained or improved?", answer: "The NAITS budget team has included a proposed maintenance allowance. The intention is to improve conditions gradually, subject to board approval, available funds and the length and terms of the City's agreement. No specific upgrade schedule is confirmed." },
  { question: "Is January 1, 2027 the confirmed opening date?", answer: "No. January 1 is the anticipated operating transition date. The facility can reopen only once an operating agreement is approved and the site is ready for use." },
];

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
        <div className="mt-4 flex flex-wrap gap-2 sm:mt-6"><Button asChild size="sm" className="bg-background text-foreground hover:bg-background/90"><a href="#application">Get application forms<ArrowRight /></a></Button><Button asChild size="sm" variant="outline" className="border-primary-foreground/50 bg-transparent text-primary-foreground hover:bg-primary-foreground/10"><a href="#rates">See rates</a></Button><Button asChild size="sm" variant="outline" className="border-primary-foreground/50 bg-transparent text-primary-foreground hover:bg-primary-foreground/10"><a href="#faq">Member FAQs</a></Button></div>
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
    <section id="court-booking" className="border-t border-border bg-background py-8 sm:py-14">
      <div className="page-wrap">
        <p className="eyebrow">NAITS Board update · November 2026</p>
        <h2 className="mt-2 font-serif text-2xl sm:text-4xl">Court booking and rental rates</h2>
        <p className="mt-3 max-w-3xl text-sm leading-7 text-muted-foreground">The NAITS Board has approved the following rates and advance-booking windows. These are planned operating policies—not an announcement that the facility has reopened or that reservations can be made yet.</p>
        <div className="mt-5 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
          {[{label:"Member court rate",value:"$18/hour",detail:"Approved court rental rate"},{label:"Public court rate",value:"$38/hour",detail:"Approved non-member rental rate"},{label:"Member advance booking",value:"7 days + 1 hour",detail:"Priority over public booking"},{label:"Public advance booking",value:"72 hours",detail:"3 days in advance"}].map((item) => <div key={item.label} className="civic-card p-4 sm:p-5"><p className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">{item.label}</p><p className="mt-2 font-serif text-2xl font-bold">{item.value}</p><p className="mt-2 text-xs leading-5 text-muted-foreground">{item.detail}</p></div>)}
        </div>
        <p className="mt-4 text-sm leading-7 text-muted-foreground">Regular group block bookings and the coaching model have also received Board approval, subject to their detailed rules and implementation. For more information, see the <a href="#faq" className="font-semibold text-foreground underline underline-offset-4">Membership FAQs</a>.</p>
      </div>
    </section>
    <section className="border-y border-border bg-secondary py-8 sm:py-16">
      <div className="page-wrap grid gap-8 lg:grid-cols-2">
        <div><p className="eyebrow">Current status</p><h2 className="mt-2 font-serif text-3xl">Key booking policies approved; opening still pending.</h2><p className="mt-4 leading-7 text-muted-foreground">The NAITS Board has approved member and public rental rates, advance-booking windows, and a framework for regular block bookings and coaching. The City operating agreement, public court-time allocation, booking-system rollout and opening date have not yet been finalized. The approved policies do not mean courts are currently open for booking.</p></div>
        <div className="civic-card p-6 sm:p-8"><ShieldCheck className="size-8 text-ring" /><h2 className="mt-4 font-serif text-2xl">Full refund if an agreement cannot be reached</h2><p className="mt-3 text-sm leading-7 text-muted-foreground">NAITS promises to return Early Bird membership fees in full if it cannot conclude a satisfactory operating contract with the City of Nanaimo, in any case no later than December 31, 2026. This guarantee addresses failure to reach the operating agreement; other cancellation terms have not been specified.</p></div>
      </div>
    </section>
    <section id="application" className="py-8 sm:py-16">
      <div className="page-wrap">
        <p className="eyebrow">How to join</p>
        <h2 className="mt-2 font-serif text-2xl sm:text-4xl">Complete the application and waiver.</h2>
        <p className="mt-4 max-w-3xl text-sm leading-7 text-muted-foreground">Download or open both forms below, complete them, and choose one of the three submission methods announced by NAITS. Both the Membership Application and Waiver are required.</p>
        <div className="mt-5 flex flex-wrap gap-3">
          <Button asChild size="lg"><a href="/NAITS%20Membership%20Application.pdf" target="_blank" rel="noreferrer">Membership Application<ArrowRight /></a></Button>
          <Button asChild size="lg" variant="outline"><a href="/NAITS%20Waiver%20and%20Release%20Agreement%20Final.pdf" target="_blank" rel="noreferrer">Waiver<ArrowRight /></a></Button>
        </div>
        <p className="mt-3 text-xs leading-5 text-muted-foreground">These links open the PDF forms hosted on this website. Download or print both forms before completing them. If access is restricted, contact <a className="underline" href="mailto:pmt.NAITS@outlook.com">pmt.NAITS@outlook.com</a>.</p>
        <div className="mt-8 grid gap-4 lg:grid-cols-3">
          <article className="civic-card p-6"><p className="eyebrow">Option 1</p><h3 className="mt-2 font-serif text-2xl">Paperless</h3><div className="mt-4 flex flex-wrap gap-2"><a href="/NAITS%20Membership%20Application.pdf" target="_blank" rel="noreferrer" className="text-sm font-semibold text-ring underline underline-offset-4">Application ↗</a><a href="/NAITS%20Waiver%20and%20Release%20Agreement%20Final.pdf" target="_blank" rel="noreferrer" className="text-sm font-semibold text-ring underline underline-offset-4">Waiver ↗</a></div><ol className="mt-4 list-decimal space-y-2 pl-5 text-sm leading-6 text-muted-foreground"><li>Download, complete and save the application and waiver.</li><li><a className="font-semibold text-foreground underline" href="mailto:pmt.NAITS@outlook.com?subject=NAITS%20Membership%20Application">Email the completed files</a> to pmt.NAITS@outlook.com.</li><li>Send an e-transfer to the same email address.</li></ol></article>
          <article className="civic-card p-6"><p className="eyebrow">Option 2</p><h3 className="mt-2 font-serif text-2xl">Print, scan and email</h3><div className="mt-4 flex flex-wrap gap-2"><a href="/NAITS%20Membership%20Application.pdf" target="_blank" rel="noreferrer" className="text-sm font-semibold text-ring underline underline-offset-4">Application ↗</a><a href="/NAITS%20Waiver%20and%20Release%20Agreement%20Final.pdf" target="_blank" rel="noreferrer" className="text-sm font-semibold text-ring underline underline-offset-4">Waiver ↗</a></div><ol className="mt-4 list-decimal space-y-2 pl-5 text-sm leading-6 text-muted-foreground"><li>Print and complete both forms.</li><li>Scan them into a PDF.</li><li><a className="font-semibold text-foreground underline" href="mailto:pmt.NAITS@outlook.com?subject=NAITS%20Membership%20Application">Email the scanned PDF</a> to pmt.NAITS@outlook.com and send payment by e-transfer to that address.</li></ol></article>
          <article className="civic-card p-6"><p className="eyebrow">Option 3</p><h3 className="mt-2 font-serif text-2xl">Postal mail</h3><div className="mt-4 flex flex-wrap gap-2"><a href="/NAITS%20Membership%20Application.pdf" target="_blank" rel="noreferrer" className="text-sm font-semibold text-ring underline underline-offset-4">Application ↗</a><a href="/NAITS%20Waiver%20and%20Release%20Agreement%20Final.pdf" target="_blank" rel="noreferrer" className="text-sm font-semibold text-ring underline underline-offset-4">Waiver ↗</a></div><ol className="mt-4 list-decimal space-y-2 pl-5 text-sm leading-6 text-muted-foreground"><li>Print and complete the application and waiver.</li><li>Mail them with a cheque or money order payable to <strong>Nanaimo Area Indoor Tennis Society</strong>.</li><li>Record your cheque or money-order number on the membership sign-up sheet and email NAITS when you send it.</li></ol><address className="mt-4 border-t border-border pt-4 text-sm not-italic leading-6">NAITS<br />c/o Mark Chase<br />5756 Brookwood Dr<br />Nanaimo, BC V9T 5P2</address></article>
        </div>
        <p className="mt-5 text-sm leading-7 text-muted-foreground">For mailed applications, email <a className="font-semibold text-foreground underline" href="mailto:pmt.NAITS@outlook.com">pmt.NAITS@outlook.com</a> when posting your forms. NAITS says it will honour the Early Bird price if the mail arrives just after the offer ends, provided you emailed when you sent it.</p>
        <div className="mt-8 border-t border-border pt-5"><h3 className="font-serif text-xl">Questions?</h3><p className="mt-2 text-sm">Mark Chase · <a className="underline underline-offset-4" href="mailto:mark.chase.66@gmail.com">mark.chase.66@gmail.com</a> · <a className="underline underline-offset-4" href="tel:+12507139128">250-713-9128</a></p></div>
      </div>
    </section>
    <section id="faq" className="border-t border-border bg-secondary py-10 sm:py-16">
      <div className="page-wrap max-w-5xl">
        <p className="eyebrow">Questions from prospective members</p>
        <h2 className="mt-2 font-serif text-3xl sm:text-4xl">Membership FAQs</h2>
        <p className="mt-4 max-w-3xl text-sm leading-7 text-muted-foreground">These answers combine the November 3 Early Bird announcement and board Secretary's response with Mark Chase's November 11 report of Board-approved booking and coaching policies. Approved policy does not mean operations have begun; remaining details may change as the City agreement and NAITS procedures are finalized.</p>
        <h3 className="mt-8 font-serif text-2xl">Early Bird offer and applications</h3>
        <div className="mt-3 divide-y divide-border border-y border-border bg-card">
          {earlyBirdFaq.map((item) => <details key={item.question} className="group px-4 py-4 sm:px-6"><summary className="flex cursor-pointer list-none items-start justify-between gap-4 font-semibold leading-6 [&::-webkit-details-marker]:hidden">{item.question}<span aria-hidden="true" className="text-xl leading-6 text-ring group-open:rotate-45">+</span></summary><p className="mt-3 max-w-3xl text-sm leading-7 text-muted-foreground">{item.answer}</p></details>)}
        </div>
        <h3 className="mt-9 font-serif text-2xl">Court bookings, coaching and benefits</h3>
        <p className="mt-2 max-w-3xl text-sm leading-7 text-muted-foreground">The booking rates and windows below reflect decisions approved by the NAITS Board. Other membership benefits, the coaching rollout and facility readiness remain subject to further decisions and the City operating agreement.</p>
        <div className="mt-3 divide-y divide-border border-y border-border bg-card">
          {preliminaryFaq.map((item) => <details key={item.question} className="group px-4 py-4 sm:px-6"><summary className="flex cursor-pointer list-none items-start justify-between gap-4 font-semibold leading-6 [&::-webkit-details-marker]:hidden">{item.question}<span aria-hidden="true" className="text-xl leading-6 text-ring group-open:rotate-45">+</span></summary><p className="mt-3 max-w-3xl text-sm leading-7 text-muted-foreground">{item.answer}</p></details>)}
        </div>
        <div className="mt-8 border-l-4 border-ring bg-background p-5">
          <h3 className="font-serif text-xl">Still have a question?</h3>
          <p className="mt-2 text-sm leading-7 text-muted-foreground">For now, questions can be posted in the FITIN community discussion group for routing to the appropriate NAITS team. Committee-specific @nanaimotennis.ca contact addresses will be added once confirmed.</p>
          <Button asChild variant="outline" className="mt-4"><a href="https://groups.google.com/g/fitin2" target="_blank" rel="noreferrer">Ask in the FITIN Google Group<ArrowRight /></a></Button>
        </div>
      </div>
    </section>
    <section className="bg-accent py-8"><div className="page-wrap flex flex-wrap items-center justify-between gap-4"><p className="font-serif text-xl text-accent-foreground">Interested in community updates as well?</p><Button asChild><Link to="/join">Stay informed<ArrowRight /></Link></Button></div></section>
  </>;
}
