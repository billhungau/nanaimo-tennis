import { useState, type FormEvent } from "react";
import { CheckCircle2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

type MailingListSignupProps = {
  source: "homepage" | "get-involved";
  compact?: boolean;
};

export function MailingListSignup({ source, compact = false }: MailingListSignupProps) {
  const [consent, setConsent] = useState(false);
  const [state, setState] = useState<"idle" | "sending" | "sent" | "error">("idle");

  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (!consent) return;

    setState("sending");
    const formElement = event.currentTarget;
    const form = new FormData(formElement);

    try {
      const response = await fetch("/api/mailing-list", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: String(form.get("name") || ""),
          email: String(form.get("email") || ""),
          consent: true,
          source,
        }),
      });

      if (!response.ok) throw new Error("Subscription failed");

      setState("sent");
      formElement.reset();
      setConsent(false);
    } catch {
      setState("error");
    }
  }

  if (state === "sent") {
    return (
      <div className="flex items-start gap-3 border border-border bg-secondary/70 p-4">
        <CheckCircle2 className="mt-0.5 size-5 shrink-0 text-ring" />
        <div>
          <p className="font-semibold">You're on the list.</p>
          <p className="mt-1 text-sm leading-6 text-muted-foreground">We'll send occasional updates about indoor tennis and community participation in Nanaimo.</p>
        </div>
      </div>
    );
  }

  return (
    <form onSubmit={submit} className={compact ? "grid gap-3" : "grid gap-4"}>
      <div className={compact ? "grid gap-3 sm:grid-cols-2" : "grid gap-4 sm:grid-cols-2"}>
        <div>
          <Label htmlFor={`mailing-name-${source}`}>Name <span className="font-normal text-muted-foreground">(optional)</span></Label>
          <Input id={`mailing-name-${source}`} name="name" maxLength={100} autoComplete="name" className="mt-1.5" />
        </div>
        <div>
          <Label htmlFor={`mailing-email-${source}`}>Email</Label>
          <Input id={`mailing-email-${source}`} name="email" type="email" required maxLength={255} autoComplete="email" className="mt-1.5" />
        </div>
      </div>

      <div className="flex items-start gap-3">
        <Checkbox id={`mailing-consent-${source}`} checked={consent} onCheckedChange={(value) => setConsent(value === true)} />
        <Label htmlFor={`mailing-consent-${source}`} className="text-xs font-normal leading-5 text-muted-foreground">
          I agree to receive email updates from Nanaimo Tennis. I can unsubscribe at any time.
        </Label>
      </div>

      {state === "error" && <p className="text-sm text-destructive">We couldn't add you to the list. Please try again.</p>}

      <Button type="submit" disabled={!consent || state === "sending"} className="w-fit">
        {state === "sending" ? "Joining…" : "Join Nanaimo Tennis"}
      </Button>
    </form>
  );
}
