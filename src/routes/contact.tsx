import { createFileRoute } from "@tanstack/react-router";
import { useState, type FormEvent } from "react";
import { CheckCircle2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { PageIntro } from "@/components/page-elements";

export const Route = createFileRoute("/contact")({
  head: () => ({
    meta: [
      { title: "Contact | Nanaimo Tennis" },
      { name: "description", content: "Contact the Nanaimo Tennis community information initiative." },
      { property: "og:url", content: "https://www.nanaimotennis.ca/contact" },
      { name: "robots", content: "index,follow" },
    ],
    links: [{ rel: "canonical", href: "https://www.nanaimotennis.ca/contact" }],
  }),
  component: ContactPage,
});

function ContactPage() {
  const [state, setState] = useState<"idle" | "sending" | "sent" | "error">("idle");

  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setState("sending");
    const formElement = event.currentTarget;
    const form = new FormData(formElement);

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: String(form.get("name") || ""),
          email: String(form.get("email") || ""),
          subject: String(form.get("subject") || ""),
          message: String(form.get("message") || ""),
          website: String(form.get("website") || ""),
        }),
      });

      if (!response.ok) throw new Error("Contact request failed");

      formElement.reset();
      setState("sent");
    } catch {
      setState("error");
    }
  }

  return <>
    <PageIntro eyebrow="Contact" title="Get in touch.">
      <p>Questions about the website, source material or community submissions can be sent here.</p>
    </PageIntro>
    <section className="section-space">
      <div className="page-wrap max-w-2xl">
        <div className="civic-card p-5 sm:p-8">
          {state === "sent" ? <div className="flex gap-3 p-2"><CheckCircle2 className="mt-0.5 size-5 text-ring"/><div><h2 className="font-serif text-2xl">Message sent</h2><p className="mt-2 text-sm text-muted-foreground">Thank you. Your message has been sent to the site administrator.</p><Button className="mt-6" variant="outline" onClick={() => setState("idle")}>Send another message</Button></div></div> : <form onSubmit={submit} className="grid gap-4 sm:gap-5">
            <div className="grid gap-4 sm:grid-cols-2 sm:gap-5">
              <div><Label htmlFor="name">Name</Label><Input id="name" name="name" required maxLength={100} className="mt-2" /></div>
              <div><Label htmlFor="email">Email</Label><Input id="email" name="email" type="email" required maxLength={255} className="mt-2" /></div>
            </div>
            <div><Label htmlFor="subject">Subject</Label><Input id="subject" name="subject" required maxLength={160} className="mt-2" /></div>
            <div><Label htmlFor="message">Message</Label><Textarea id="message" name="message" required minLength={10} maxLength={5000} className="mt-2 min-h-32" /></div>
            <div className="hidden" aria-hidden="true"><Label htmlFor="website">Website</Label><Input id="website" name="website" tabIndex={-1} autoComplete="off" /></div>
            {state === "error" && <p className="text-sm text-destructive">Your message could not be sent. Please try again.</p>}
            <Button type="submit" disabled={state === "sending"} className="w-fit">{state === "sending" ? "Sending…" : "Send message"}</Button>
          </form>}
        </div>
      </div>
    </section>
  </>;
}
