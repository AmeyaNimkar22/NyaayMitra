import { useEffect, useState } from "react";
import { Link } from "wouter";
import { Bell, Camera, Gamepad2, Languages, Menu, Shield } from "lucide-react";
import { Sheet, SheetContent, SheetTitle } from "@/components/ui/sheet";
import { cn } from "@/lib/utils";

const navItems = [
  { label: "Home", href: "#top" },
  { label: "Legal Advisor", href: "#civic-advisor" },
  { label: "Scan & Learn", href: "/scan-learn", icon: Camera, isRoute: true },
  { label: "Games", href: "#civic-games", icon: Gamepad2 },
];

export default function LandingNavbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    function onScroll() {
      setScrolled(window.scrollY > 8);
    }
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={cn(
        "fixed top-0 inset-x-0 z-50 transition-all duration-300",
        scrolled ? "bg-background/90 backdrop-blur-md shadow-[0_12px_32px_-4px_rgba(44,33,26,0.08)]" : "bg-background/70 backdrop-blur-sm"
      )}
    >
      <div className="max-w-[1200px] mx-auto px-4 lg:px-10 h-20 flex items-center justify-between gap-4">
        <a href="#top" className="flex items-center gap-2.5 shrink-0">
          <span className="grid place-items-center w-9 h-9 rounded-xl bg-primary/10 text-primary border border-primary/20">
            <Shield size={18} strokeWidth={1.8} />
          </span>
          <span className="flex flex-col leading-tight">
            <span
              className="font-semibold text-foreground text-[17px]"
              style={{ fontFamily: "'Newsreader', serif" }}
            >
              NyaayMitra
            </span>
            <span className="text-[10px] uppercase tracking-wider text-muted-foreground">
              AI Civic &amp; Legal Advisor
            </span>
          </span>
        </a>

        <nav className="hidden xl:flex items-center gap-1">
          {navItems.map((item) =>
            item.isRoute ? (
              <Link
                key={item.label}
                href={item.href}
                className="px-3 py-1.5 rounded-lg text-sm font-medium text-muted-foreground hover:text-foreground hover:bg-accent transition-colors flex items-center gap-1.5"
              >
                {item.icon && <item.icon size={15} className="text-primary" />}
                {item.label}
              </Link>
            ) : (
              <a
                key={item.label}
                href={item.href}
                className="px-3 py-1.5 rounded-lg text-sm font-medium text-muted-foreground hover:text-foreground hover:bg-accent transition-colors flex items-center gap-1.5"
              >
                {item.icon && <item.icon size={15} className="text-primary" />}
                {item.label}
              </a>
            )
          )}
        </nav>

        <div className="flex items-center gap-2 shrink-0">
          <div className="hidden md:flex items-center gap-1.5 bg-card px-2.5 py-1.5 rounded-xl border border-border text-muted-foreground">
            <Languages size={16} />
            <select
              className="bg-transparent text-xs font-semibold text-muted-foreground focus:outline-none cursor-pointer pr-1"
              defaultValue="en"
              aria-label="Choose language"
            >
              <option value="en">English</option>
              <option value="hi">हिन्दी</option>
              <option value="bn">বাংলা</option>
              <option value="ta">தமிழ்</option>
              <option value="mr">मराठी</option>
            </select>
          </div>

          <button
            className="hidden sm:grid relative place-items-center w-9 h-9 rounded-xl text-muted-foreground hover:bg-accent hover:text-foreground transition-colors"
            aria-label="Notifications"
          >
            <Bell size={19} />
          </button>

          <Link
            href="/login"
            className="hidden sm:inline-flex items-center px-4 py-2 rounded-xl text-sm font-semibold text-foreground hover:bg-accent transition-colors"
          >
            Log in
          </Link>
          <Link
            href="/signup"
            className="inline-flex items-center px-4 sm:px-5 py-2 rounded-xl bg-primary text-primary-foreground text-sm font-semibold hover:bg-[#c94b0c] transition-colors shadow-sm"
          >
            Get Started
          </Link>

          <button
            onClick={() => setMobileOpen(true)}
            className="xl:hidden grid place-items-center w-9 h-9 rounded-xl border border-border text-foreground"
            aria-label="Open menu"
          >
            <Menu size={18} />
          </button>
        </div>
      </div>

      <Sheet open={mobileOpen} onOpenChange={setMobileOpen}>
        <SheetContent side="right" className="w-72 p-0 flex flex-col py-5">
          <SheetTitle className="sr-only">Navigation</SheetTitle>
          <div className="px-4 mb-4 flex items-center gap-2.5">
            <span className="grid place-items-center w-9 h-9 rounded-xl bg-primary/10 text-primary border border-primary/20">
              <Shield size={18} strokeWidth={1.8} />
            </span>
            <span className="font-semibold text-foreground" style={{ fontFamily: "'Newsreader', serif" }}>
              NyaayMitra
            </span>
          </div>
          <nav className="flex-1 flex flex-col gap-1 px-3">
            {navItems.map((item) =>
              item.isRoute ? (
                <Link
                  key={item.label}
                  href={item.href}
                  onClick={() => setMobileOpen(false)}
                  className="flex items-center gap-2.5 rounded-lg px-3 py-2.5 text-sm font-medium text-muted-foreground hover:bg-accent hover:text-foreground transition-colors"
                >
                  {item.icon && <item.icon size={16} className="text-primary" />}
                  {item.label}
                </Link>
              ) : (
                <a
                  key={item.label}
                  href={item.href}
                  onClick={() => setMobileOpen(false)}
                  className="flex items-center gap-2.5 rounded-lg px-3 py-2.5 text-sm font-medium text-muted-foreground hover:bg-accent hover:text-foreground transition-colors"
                >
                  {item.icon && <item.icon size={16} className="text-primary" />}
                  {item.label}
                </a>
              )
            )}
          </nav>
          <div className="px-3 pt-3 border-t border-border flex flex-col gap-2">
            <Link
              href="/login"
              onClick={() => setMobileOpen(false)}
              className="flex items-center justify-center rounded-xl px-4 py-2.5 text-sm font-semibold border border-border text-foreground"
            >
              Log in
            </Link>
            <Link
              href="/signup"
              onClick={() => setMobileOpen(false)}
              className="flex items-center justify-center rounded-xl px-4 py-2.5 text-sm font-semibold bg-primary text-primary-foreground"
            >
              Get Started
            </Link>
          </div>
        </SheetContent>
      </Sheet>
    </header>
  );
}
