import { Link, useRouterState } from "@tanstack/react-router";
import { Menu, X } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { Button } from "@/components/ui/button";

const nav = [
  ["Membership", "/membership"], ["Current Status", "/the-issue"], ["Timeline", "/timeline"],
  ["Evidence", "/evidence"], ["Sources", "/sources"],
] as const;
const mobileNav = [...nav, ["Get Updates", "/join"], ["Get Involved", "/get-involved"], ["Election Archive", "/candidates"]] as const;

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
    <div className="page-wrap flex h-14 items-center justify-between gap-3 sm:h-18 sm:gap-5">
      <Link to="/" className="flex min-w-0 items-center gap-2 sm:gap-3" aria-label="Friends of Indoor Tennis in Nanaimo home">
        <picture className="contents"><source type="image/webp" srcSet="/optimized/nanaimo-tennis-logo-48.webp 1x, /optimized/nanaimo-tennis-logo-96.webp 2x" /><img src="/nanaimo-tennis-logo.png" width={44} height={44} alt="Friends of Indoor Tennis in Nanaimo" className="size-9 shrink-0 object-contain sm:size-11" /></picture>
        <span className="truncate text-sm font-semibold text-foreground sm:hidden">Nanaimo Tennis</span><span className="hidden text-sm font-semibold text-foreground sm:inline sm:text-base">Friends of Indoor Tennis in Nanaimo</span>
      </Link>
      <nav className="hidden items-center gap-5 xl:flex" aria-label="Main navigation">
        {nav.map(([label, to]) => <Link key={to} to={to} className={pathname === to ? "nav-link text-foreground" : "nav-link"}>{label}</Link>)}
      </nav>
      <div className="hidden xl:block"><Button asChild variant="outline"><Link to="/membership">Early Bird Membership</Link></Button></div>
      <Button variant="ghost" size="icon" className="xl:hidden" aria-label={open ? "Close menu" : "Open menu"} aria-expanded={open} onClick={() => setOpen(!open)}>{open ? <X /> : <Menu />}</Button>
    </div>
    {open && <nav className="border-t border-border bg-background px-5 py-4 xl:hidden" aria-label="Mobile navigation">
      <div className="mx-auto grid max-w-3xl gap-1">{mobileNav.map(([label, to]) => <Link key={to} to={to} onClick={() => setOpen(false)} className="rounded-sm px-3 py-3 text-sm font-medium text-foreground hover:bg-muted">{label}</Link>)}</div>
    </nav>}
  </header>;
}

export function SiteFooter() {
  return <footer className="border-t border-border bg-primary text-primary-foreground">
    <div className="page-wrap grid gap-10 py-12 md:grid-cols-[1.4fr_1fr]">
      <div><p className="font-serif text-2xl">Friends of Indoor Tennis in Nanaimo (FITIN)</p><p className="mt-3 max-w-xl text-sm leading-6 text-primary-foreground/75">NAITS membership information and a public archive of the campaign for year-round indoor tennis in Nanaimo.</p></div>
      <nav className="grid grid-cols-2 gap-3 text-sm md:justify-self-end"><Link to="/membership">Membership</Link><Link to="/join">Get Updates</Link><Link to="/sources">Sources</Link><Link to="/candidates">2026 Election Archive</Link><Link to="/contact">Contact</Link></nav>
    </div>
    <div className="border-t border-primary-foreground/15"><div className="page-wrap py-5 text-xs leading-5 text-primary-foreground/65">This website is not affiliated with the City of Nanaimo, Westwood Lake Tennis Club, Tennis Canada, or any political candidate or party.</div></div>
  </footer>;
}