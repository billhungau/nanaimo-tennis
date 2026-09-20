import { Link, useRouterState } from "@tanstack/react-router";
import { Menu, X } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { Button } from "@/components/ui/button";

const nav = [
  ["The Issue", "/the-issue"], ["Timeline", "/timeline"], ["Evidence", "/evidence"],
  ["Candidate Positions", "/candidates"], ["Sources", "/sources"], ["Get Involved", "/get-involved"],
] as const;

export function SiteHeader() {
  const [open, setOpen] = useState(false);
  const headerRef = useRef<HTMLElement>(null);
  const pathname = useRouterState({ select: (state) => state.location.pathname });

  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  useEffect(() => {
    if (!open) return;

    function handlePointerDown(event: PointerEvent) {
      if (headerRef.current && !headerRef.current.contains(event.target as Node)) {
        setOpen(false);
      }
    }

    document.addEventListener("pointerdown", handlePointerDown);
    return () => document.removeEventListener("pointerdown", handlePointerDown);
  }, [open]);

  return <header ref={headerRef} className="sticky top-0 z-50 border-b border-border/80 bg-background/95 backdrop-blur">
    <div className="page-wrap flex h-18 items-center justify-between gap-5">
      <Link to="/" className="flex items-center gap-3" aria-label="Nanaimo Tennis home">
        <img src="/nanaimo-tennis-logo.png" alt="Nanaimo Tennis" className="size-11 shrink-0 object-contain" />
        <span className="text-sm font-semibold text-foreground sm:text-base">Nanaimo Tennis</span>
      </Link>
      <nav className="hidden items-center gap-5 xl:flex" aria-label="Main navigation">
        {nav.map(([label, to]) => <Link key={to} to={to} className={pathname === to ? "nav-link text-foreground" : "nav-link"}>{label}</Link>)}
      </nav>
      <div className="hidden xl:block"><Button asChild variant="outline"><Link to="/the-issue">Read the proposal</Link></Button></div>
      <Button variant="ghost" size="icon" className="xl:hidden" aria-label={open ? "Close menu" : "Open menu"} aria-expanded={open} onClick={() => setOpen(!open)}>{open ? <X /> : <Menu />}</Button>
    </div>
    {open && <nav className="border-t border-border bg-background px-5 py-4 xl:hidden" aria-label="Mobile navigation">
      <div className="mx-auto grid max-w-3xl gap-1">{nav.map(([label, to]) => <Link key={to} to={to} onClick={() => setOpen(false)} className="rounded-sm px-3 py-3 text-sm font-medium text-foreground hover:bg-muted">{label}</Link>)}</div>
    </nav>}
  </header>;
}

export function SiteFooter() {
  return <footer className="border-t border-border bg-primary text-primary-foreground">
    <div className="page-wrap grid gap-10 py-12 md:grid-cols-[1.4fr_1fr]">
      <div><p className="font-serif text-2xl">Nanaimo Tennis</p><p className="mt-3 max-w-xl text-sm leading-6 text-primary-foreground/75">An independent community information initiative about the future of year-round tennis in Nanaimo.</p></div>
      <nav className="grid grid-cols-2 gap-3 text-sm md:justify-self-end"><Link to="/sources">Sources</Link><Link to="/candidates">Candidate Positions</Link><Link to="/contact">Contact</Link></nav>
    </div>
    <div className="border-t border-primary-foreground/15"><div className="page-wrap py-5 text-xs leading-5 text-primary-foreground/65">This website is not affiliated with the City of Nanaimo, Westwood Lake Tennis Club, Tennis Canada, or any political candidate or party.</div></div>
  </footer>;
}