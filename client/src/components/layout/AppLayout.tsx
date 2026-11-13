import { useEffect, type ReactNode } from "react";
import TopNav from "./TopNav";
import PageTransition from "./PageTransition";

interface AppLayoutProps {
  title: string;
  breadcrumb?: string;
  children: ReactNode;
}

/**
 * Persistent authenticated application shell. The sidebar has been
 * replaced by a horizontal TopNav (see TopNav.tsx) so page content gets
 * the full width. `title` no longer renders a visible header bar — the
 * active nav pill already shows "where you are" — but it still sets the
 * browser tab title for wayfinding.
 */
export default function AppLayout({ title, children }: AppLayoutProps) {
  useEffect(() => {
    document.title = `${title} · NyaayMitra`;
  }, [title]);

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <TopNav />
      <main className="flex-1">
        <div className="max-w-[1400px] mx-auto w-full px-4 sm:px-8 lg:px-12 py-8 sm:py-10">
          <PageTransition>{children}</PageTransition>
        </div>
      </main>
    </div>
  );
}
