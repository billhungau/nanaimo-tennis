import { Link, useRouterState } from "@tanstack/react-router";
import { Menu, X } from "lucide-react";
import { useState } from "react";
import { Button } from "@/components/ui/button";

const nav = [
  ["The Issue", "/the-issue"], ["Timeline", "/timeline"], ["Evidence", "/evidence"],
  ["Candidate Positions", "/candidates"], ["Sources", "/sources"], ["Get Involved", "/get-involved"],
] as const;

function TennisMark() {
  return (
    <svg
      viewBox="0 0 48 48"
      aria-hidden="true"
      className="size-11 shrink-0 text-foreground"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <circle cx="24" cy="24" r="18" stroke="currentColor" strokeWidth="2" />
      <path
        d="M11.5 12.5c6.8 4.5 9.9 10.4 9.3 17.5-.3 3.7-1.6 7.2-4 10.5"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
      />
      <path
        d="M36.5 7.5c-6.8 4.5-9.9 10.4-9.3 17.5.3 3.7 1.6 7.2 4 10.5"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
      />
    </svg>
  );
}

export function SiteHeader() {
  const [open, setOpen] = useState(false);
  const pathname = useRouterState({ select: (state) => state.location.pathname });
  return <header className="sticky top-0 z-50 border-b border-border/80 bg-background/95 backdrop-blur">
    <div className="page-wrap flex h-18 items-center justify-between gap-5">
      <Link to="/" className="flex items-center gap-3" aria-label="Indoor Tennis Nanaimo home">
        <TennisMark />
        <span className="text-sm font-semibold text-foreground sm:text-base">Indoor Tennis Nanaimo</span>
      </Link>
      <nav className="hidden items-center gap-5 xl:flex" aria-label="Main navigation">
        {nav.map(([label, to]) => <Link key={to} to={to} className={pathname === to ? "nav-link text-foreground" : "nav-link"}>{label}</Link>)}
      </nav>
      <div className="hidden xl:block"><Button asChild variant="outline"><Link to="/the-issue">Read the proposal</Link></Button></div>
      <Button variant="ghost" size="icon" className="xl:hidden" aria-label={open ? "Close menu" : "Open menu"} onClick={() => setOpen(!open)}>{open ? <X /> : <Menu />}</Button>
    </div>
    {open && <nav className="border-t border-border bg-background px-5 py-4 xl:hidden" aria-label="Mobile navigation">
      <div className="mx-auto grid max-w-3xl gap-1">{nav.map(([label, to]) => <Link key={to} to={to} onClick={() => setOpen(false)} className="rounded-sm px-3 py-3 text-sm font-medium text-foreground hover:bg-muted">{label}</Link>)}</div>
    </nav>}
  </header>;
}

export function SiteFooter() {
  return <footer className="border-t border-border bg-primary text-primary-foreground">
    <div className="page-wrap grid gap-10 py-12 md:grid-cols-[1.4fr_1fr]">
      <div><p className="font-serif text-2xl">Indoor Tennis Nanaimo</p><p className="mt-3 max-w-xl text-sm leading-6 text-primary-foreground/75">An independent community information initiative about the future of year-round tennis in Nanaimo.</p></div>
      <nav className="grid grid-cols-2 gap-3 text-sm md:justify-self-end"><Link to="/sources">Sources</Link><Link to="/candidates">Candidate Positions</Link><Link to="/get-involved">Contact</Link></nav>
    </div>
    <div className="border-t border-primary-foreground/15"><div className="page-wrap py-5 text-xs leading-5 text-primary-foreground/65">This website is not affiliated with the City of Nanaimo, Westwood Lake Tennis Club, Tennis Canada, or any political candidate or party. Last updated: September 19, 2026.</div></div>
  </footer>;
}