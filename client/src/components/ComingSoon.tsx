import { ArrowLeft } from "lucide-react";
import type { LucideIcon } from "lucide-react";
import { Link } from "wouter";
import AppLayout from "@/components/layout/AppLayout";

interface ComingSoonProps {
  title: string;
  breadcrumb: string;
  icon: LucideIcon;
  description: string;
}

/**
 * Placeholder for a nav destination that isn't built yet. Keeps every
 * sidebar link navigable (per project spec section 1) without pretending
 * the feature exists. Swap for the real page component when it's built —
 * the route in App.tsx doesn't need to change.
 */
export default function ComingSoon({ title, breadcrumb, icon: Icon, description }: ComingSoonProps) {
  return (
    <AppLayout title={title} breadcrumb={breadcrumb}>
      <div className="flex flex-col items-center justify-center text-center py-20 sm:py-28">
        <div className="grid place-items-center w-16 h-16 rounded-2xl bg-primary/10 text-primary mb-6">
          <Icon size={28} />
        </div>
        <h2
          className="text-xl font-semibold tracking-tight mb-2"
          style={{ fontFamily: "'Space Grotesk', sans-serif" }}
        >
          {title} is coming soon
        </h2>
        <p className="text-muted-foreground max-w-md mb-8 text-sm leading-relaxed">{description}</p>
        <Link href="/home" className="button button-primary button-small">
          <ArrowLeft size={15} /> Back to Home
        </Link>
      </div>
    </AppLayout>
  );
}
