import { ArrowUpRight, FileText } from "lucide-react";
import type { ReactNode } from "react";
import { Button } from "@/components/ui/button";

export function PageIntro({ eyebrow, title, children }: { eyebrow: string; title: string; children: ReactNode }) {
  return <section className="border-b border-border bg-secondary"><div className="page-wrap py-16 sm:py-20"><p className="eyebrow">{eyebrow}</p><h1 className="mt-4 max-w-4xl font-serif text-4xl leading-tight sm:text-6xl">{title}</h1><div className="mt-6 max-w-3xl text-base leading-7 text-muted-foreground sm:text-lg">{children}</div></div></section>;
}

export function SectionHeading({ eyebrow, title, copy }: { eyebrow?: string; title: string; copy?: string }) {
  return <div className="max-w-3xl">{eyebrow && <p className="eyebrow">{eyebrow}</p>}<h2 className="mt-3 font-serif text-3xl leading-tight sm:text-5xl">{title}</h2>{copy && <p className="mt-5 text-base leading-7 text-muted-foreground">{copy}</p>}</div>;
}

export function SourceLink({ href, label = "View source" }: { href: string; label?: string }) {
  return <Button asChild variant="link" className="h-auto justify-start p-0 text-xs"><a href={href} target="_blank" rel="noreferrer">{label}<ArrowUpRight /></a></Button>;
}

export function EmptyFact({ children }: { children: ReactNode }) {
  return <div className="flex gap-3 border-b border-border py-4 last:border-0"><FileText className="mt-0.5 size-4 shrink-0 text-muted-foreground"/><div><p className="text-sm font-medium">{children}</p><p className="mt-1 text-xs text-muted-foreground">Information not yet publicly available</p></div></div>;
}