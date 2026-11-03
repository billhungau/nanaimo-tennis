import { Link, useRouterState } from "@tanstack/react-router";
import { ChevronDown, Menu, X } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { Button } from "@/components/ui/button";

const nav = [
  ["Home", "/"], ["Current Status", "/the-issue"], ["Get Involved", "/get-involved"], ["About FITIN", "/about"],
] as const;
const resources = [
  ["Timeline", "/timeline"], ["Evidence", "/evidence"], ["Sources", "/sources"], ["2026 Election Archive", "/candidates"],
] as const;

export function SiteHeader() {
  const [open, setOpen] = useState(false);
  const [resourcesOpen, setResourcesOpen] = useState(false);
  const headerRef = useRef<HTMLElement>(null);
  const pathname = useRouterState({ select: (state) => state.location.pathname });

  useEffect(() => { setOpen(false); setResourcesOpen(false); }, [pathname]);

  useEffect(() => {
    if (!open) return;
    function handlePointerDown(event: PointerEvent) {
      if (headerRef.current && !headerRef.current.contains(event.target as Node)) setOpen(false);
    }
    document.addEventListener("pointerdown", handlePointerDown);
    return () => document.removeEventListener("pointerdown", handlePointerDown);
  }, [open]);

  return <header ref={headerRef} className="sticky top-0 z-50 border-b border-border/80 bg-background/95 backdrop-blur">
    <div className="page-wrap flex h-14 items-center justify-between gap-3 sm:h-18 sm:gap-5">
      <Link to="/" className="flex min-w-0 items-center gap-2 sm:gap-3" aria-label="Friends of Indoor Tennis in Nanaimo home">
        <picture className="contents"><source type="image/webp" srcSet="/optimized/nanaimo-tennis-logo-48.webp 1x, /optimized/nanaimo-tennis-logo-96.webp 2x" /><img src="/nanaimo-tennis-logo.png" width={44} height={44} alt="FITIN logo" className="size-9 shrink-0 object-contain sm:size-11" /></picture>
        <span className="max-w-[210px] text-xs font-semibold leading-4 text-foreground sm:hidden">Friends of Indoor Tennis in Nanaimo (FITIN)</span>
        <span className="hidden text-sm font-semibold text-foreground sm:inline sm:text-base">Friends of Indoor Tennis in Nanaimo (FITIN)</span>
      </Link>
      <nav className="hidden items-center gap-5 xl:flex" aria-label="Main navigation">
        {nav.map(([label,to]) => <Link key={to} to={to} className={pathname === to ? "nav-link text-foreground" : "nav-link"}>{label}</Link>)}
        <details className="group relative">
          <summary className="nav-link flex cursor-pointer list-none items-center gap-1 [&::-webkit-details-marker]:hidden">Resources<ChevronDown className="size-4 transition-transform group-open:rotate-180" /></summary>
          <div className="absolute right-0 top-full z-50 mt-3 min-w-56 border border-border bg-background p-2 shadow-lg">
            {resources.map(([label,to]) => <Link key={to} to={to} className="block rounded-sm px-3 py-2 text-sm text-foreground hover:bg-muted">{label}</Link>)}
          </div>
        </details>
      </nav>
      <div className="hidden xl:block"><Button asChild><Link to="/membership">Join NAITS</Link></Button></div>
      <Button variant="ghost" size="icon" className="xl:hidden" aria-label={open ? "Close menu" : "Open menu"} aria-expanded={open} aria-controls="mobile-site-navigation" onClick={() => setOpen(!open)}>{open ? <X /> : <Menu />}</Button>
    </div>
    {open && <nav id="mobile-site-navigation" className="border-t border-border bg-background px-5 py-4 xl:hidden" aria-label="Mobile navigation">
      <div className="mx-auto grid max-w-3xl gap-1">
        {nav.map(([label,to]) => <Link key={to} to={to} onClick={() => setOpen(false)} className="rounded-sm px-3 py-3 text-sm font-medium text-foreground hover:bg-muted">{label}</Link>)}
        <Link to="/join" onClick={() => setOpen(false)} className="rounded-sm px-3 py-3 text-sm font-medium text-foreground hover:bg-muted">Community Updates</Link>
        <button type="button" aria-expanded={resourcesOpen} onClick={() => setResourcesOpen(!resourcesOpen)} className="flex items-center justify-between rounded-sm px-3 py-3 text-left text-sm font-medium text-foreground hover:bg-muted">Resources & History<ChevronDown className={resourcesOpen ? "size-4 rotate-180" : "size-4"} /></button>
        {resourcesOpen && <div className="ml-3 grid border-l border-border pl-3">{resources.map(([label,to]) => <Link key={to} to={to} onClick={() => setOpen(false)} className="rounded-sm px-3 py-2.5 text-sm text-foreground hover:bg-muted">{label}</Link>)}</div>}
        <Button asChild className="mt-3 w-full"><Link to="/membership" onClick={() => setOpen(false)}>Join NAITS — Early Bird Membership</Link></Button>
      </div>
    </nav>}
  </header>;
}

export function SiteFooter() {
  return <footer className="border-t border-border bg-primary text-primary-foreground">
    <div className="page-wrap grid gap-8 py-10 md:grid-cols-[1.2fr_1fr_1fr] md:gap-10 md:py-12">
      <div>
        <p className="font-serif text-2xl">Friends of Indoor Tennis in Nanaimo (FITIN)</p>
        <p className="mt-3 max-w-md text-sm leading-6 text-primary-foreground/75">Community information about year-round indoor tennis at Westwood Lake, NAITS membership, and the campaign that helped preserve the facility.</p>
        <p className="mt-3 text-xs leading-5 text-primary-foreground/65">FITIN's Google Group is for community updates. Applying for paid NAITS membership is a separate process.</p>
      </div>
      <nav aria-label="Get connected footer links" className="grid content-start gap-3 text-sm">
        <p className="font-semibold text-primary-foreground">Get Connected</p>
        <Link to="/membership">NAITS Membership</Link>
        <Link to="/the-issue">Current Status</Link>
        <Link to="/get-involved">Get Involved</Link>
        <Link to="/join">Community Updates</Link>
        <Link to="/contact">Contact</Link>
      </nav>
      <nav aria-label="Resources footer links" className="grid content-start gap-3 text-sm">
        <p className="font-semibold text-primary-foreground">Resources & History</p>
        <Link to="/about">About FITIN</Link>
        <Link to="/timeline">Timeline</Link>
        <Link to="/evidence">Evidence</Link>
        <Link to="/sources">Sources</Link>
        <Link to="/candidates">2026 Election Archive</Link>
      </nav>
    </div>
    <div className="border-t border-primary-foreground/15"><div className="page-wrap py-5 text-xs leading-5 text-primary-foreground/65">This website is not affiliated with the City of Nanaimo, Westwood Lake Tennis Club, Tennis Canada, or any political candidate or party.</div></div>
  </footer>;
}
