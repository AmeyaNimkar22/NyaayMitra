import { useEffect, useState } from "react";
import { Link, useLocation } from "wouter";
import { motion } from "framer-motion";
import {
  Bell,
  ChevronDown,
  LogOut,
  Menu,
  Search,
  Settings,
  Shield,
  UserRound,
} from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Sheet, SheetContent, SheetTitle } from "@/components/ui/sheet";
import { useAuth } from "@/contexts/AuthContext";
import { primaryNav, secondaryNav } from "@/lib/navigation";
import { cn } from "@/lib/utils";

function Logo() {
  return (
    <Link
      href="/home"
      className="inline-flex items-center gap-2.5 shrink-0"
      style={{ fontFamily: "'Space Grotesk', sans-serif" }}
    >
      <span className="brand-mark" aria-hidden="true">
        <Shield size={17} strokeWidth={1.8} />
      </span>
      <span className="font-bold tracking-[0.14em] text-sm text-foreground hidden sm:inline">
        NYAAYMITRA
      </span>
    </Link>
  );
}

function DesktopNav() {
  const [location] = useLocation();

  return (
    <nav className="hidden lg:flex items-center gap-1 rounded-full border border-border bg-card/60 p-1">
      {primaryNav.map((item) => {
        const active = location === item.href;
        return (
          <Link
            key={item.href}
            href={item.href}
            className={cn(
              "relative flex items-center gap-1.5 rounded-full px-3.5 py-2 text-sm font-medium transition-colors duration-200",
              active ? "text-primary" : "text-muted-foreground hover:text-foreground"
            )}
          >
            {active && (
              <motion.span
                layoutId="topnav-active-pill"
                className="absolute inset-0 rounded-full bg-accent"
                transition={{ type: "spring", stiffness: 380, damping: 32 }}
              />
            )}
            <item.icon size={15} strokeWidth={1.9} className="relative z-10" />
            <span className="relative z-10 whitespace-nowrap">{item.label}</span>
          </Link>
        );
      })}
    </nav>
  );
}

function ProfileMenu() {
  const { user, logout } = useAuth();
  const [, setLocation] = useLocation();
  const initials = user?.name?.charAt(0).toUpperCase() ?? "U";

  function handleLogout() {
    logout();
    setLocation("/");
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger className="flex items-center gap-2 pl-1.5 sm:pl-2 pr-1 sm:pr-2.5 h-10 rounded-full border border-border hover:bg-accent transition-colors outline-none">
        <span className="grid place-items-center w-7 h-7 rounded-full bg-primary/12 text-primary text-xs font-semibold shrink-0">
          {initials}
        </span>
        <span className="hidden sm:block text-sm font-medium">{user?.name}</span>
        <ChevronDown size={14} className="hidden sm:block text-muted-foreground" />
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-52">
        <DropdownMenuLabel className="font-normal">
          <p className="text-sm font-medium truncate">{user?.name}</p>
          <p className="text-xs text-muted-foreground truncate">{user?.email}</p>
        </DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuItem asChild>
          <Link href="/profile">
            <UserRound size={15} /> Profile
          </Link>
        </DropdownMenuItem>
        <DropdownMenuItem asChild>
          <Link href="/settings">
            <Settings size={15} /> Settings
          </Link>
        </DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem variant="destructive" onClick={handleLogout}>
          <LogOut size={15} /> Log out
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

function MobileMenu() {
  const [open, setOpen] = useState(false);
  const { user, logout } = useAuth();
  const [location, setLocation] = useLocation();

  function handleLogout() {
    setOpen(false);
    logout();
    setLocation("/");
  }

  return (
    <>
      <button
        onClick={() => setOpen(true)}
        className="lg:hidden grid place-items-center w-10 h-10 rounded-full border border-border text-foreground"
        aria-label="Open menu"
      >
        <Menu size={18} />
      </button>

      <Sheet open={open} onOpenChange={setOpen}>
        <SheetContent side="right" className="w-72 p-0 flex flex-col py-5 gap-0">
          <SheetTitle className="sr-only">Navigation</SheetTitle>
          <div className="px-4 mb-4">
            <Logo />
          </div>
          <nav className="flex-1 flex flex-col gap-1 px-3 overflow-y-auto">
            {primaryNav.map((item) => {
              const active = location === item.href;
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={() => setOpen(false)}
                  className={cn(
                    "flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-colors",
                    active ? "bg-accent text-primary" : "text-muted-foreground hover:bg-accent hover:text-foreground"
                  )}
                >
                  <item.icon size={17} strokeWidth={1.9} />
                  {item.label}
                </Link>
              );
            })}
            <div className="my-2 h-px bg-border" />
            {secondaryNav.map((item) => {
              const active = location === item.href;
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={() => setOpen(false)}
                  className={cn(
                    "flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-colors",
                    active ? "bg-accent text-primary" : "text-muted-foreground hover:bg-accent hover:text-foreground"
                  )}
                >
                  <item.icon size={17} strokeWidth={1.9} />
                  {item.label}
                </Link>
              );
            })}
          </nav>
          <div className="px-3 mt-2 pt-3 border-t border-border">
            <div className="flex items-center gap-3 px-3 py-2 mb-1">
              <span className="grid place-items-center w-8 h-8 rounded-full bg-primary/12 text-primary text-xs font-semibold shrink-0">
                {user?.name?.charAt(0).toUpperCase() ?? "U"}
              </span>
              <span className="min-w-0">
                <span className="block text-sm font-medium truncate">{user?.name}</span>
                <span className="block text-xs text-muted-foreground truncate">{user?.email}</span>
              </span>
            </div>
            <button
              onClick={handleLogout}
              className="flex w-full items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium text-destructive hover:bg-destructive/10 transition-colors"
            >
              <LogOut size={17} strokeWidth={1.9} /> Log out
            </button>
          </div>
        </SheetContent>
      </Sheet>
    </>
  );
}

export default function TopNav() {
  const [scrolled, setScrolled] = useState(false);

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
        "sticky top-0 z-40 border-b transition-all duration-300",
        scrolled
          ? "bg-background/92 backdrop-blur-md border-border shadow-sm"
          : "bg-background/75 backdrop-blur-sm border-transparent"
      )}
    >
      <div className="max-w-[1400px] mx-auto w-full px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between gap-4">
        <Logo />
        <DesktopNav />
        <div className="flex items-center gap-2 shrink-0">
          <button
            className="hidden md:grid place-items-center w-9 h-9 rounded-full hover:bg-accent text-muted-foreground transition-colors"
            aria-label="Search"
          >
            <Search size={16} />
          </button>
          <button
            className="hidden md:grid relative place-items-center w-9 h-9 rounded-full hover:bg-accent text-muted-foreground transition-colors"
            aria-label="Notifications"
          >
            <Bell size={16} />
            <span className="absolute top-2.5 right-2.5 w-1.5 h-1.5 rounded-full bg-[#b8945f]" />
          </button>
          <div className="hidden lg:block">
            <ProfileMenu />
          </div>
          <MobileMenu />
        </div>
      </div>
    </header>
  );
}
