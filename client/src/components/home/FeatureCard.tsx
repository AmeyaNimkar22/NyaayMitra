import { motion } from "framer-motion";
import { Link } from "wouter";
import { ArrowRight } from "lucide-react";
import type { LucideIcon } from "lucide-react";
import { cn } from "@/lib/utils";

interface FeatureCardProps {
  icon: LucideIcon;
  title: string;
  description: string;
  cta: string;
  href: string;
  badge: string;
  variant: "primary" | "secondary";
  cornerBadge?: string;
  delay?: number;
}

export default function FeatureCard({
  icon: Icon,
  title,
  description,
  cta,
  href,
  badge,
  variant,
  cornerBadge,
  delay = 0,
}: FeatureCardProps) {
  const isPrimary = variant === "primary";

  return (
    <motion.div
      className="relative h-full"
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay }}
      whileHover={{ y: -3 }}
    >
      {cornerBadge && (
        <div className="absolute -top-3 right-6 bg-primary text-primary-foreground text-[10px] font-bold tracking-widest uppercase px-3 py-0.5 rounded-full shadow-sm z-10">
          {cornerBadge}
        </div>
      )}
      <div
        className={cn(
          "group relative bg-card rounded-2xl p-6 flex flex-col justify-between h-full transition-all duration-200 shadow-sm",
          isPrimary
            ? "border-2 border-primary/40 hover:border-primary hover:shadow-md"
            : "border border-border hover:border-primary/40 hover:shadow-md"
        )}
      >
        <div>
          <div className="flex items-center justify-between mb-4">
            <div
              className={cn(
                "w-12 h-12 rounded-xl bg-accent border border-border flex items-center justify-center text-primary shadow-sm transition-colors duration-200",
                "group-hover:bg-primary group-hover:text-primary-foreground"
              )}
            >
              <Icon size={24} strokeWidth={1.8} className="transition-transform duration-200 group-hover:scale-110" />
            </div>
            <span
              className={cn(
                "text-xs font-medium px-2.5 py-1 rounded-md",
                isPrimary ? "text-primary bg-accent" : "text-muted-foreground bg-background border border-border"
              )}
            >
              {badge}
            </span>
          </div>
          <h2
            className="text-2xl font-semibold text-foreground mb-1.5 group-hover:text-primary transition-colors"
            style={{ fontFamily: "'Newsreader', serif" }}
          >
            {title}
          </h2>
          <p className="text-sm text-muted-foreground leading-relaxed mb-6">{description}</p>
        </div>

        <Link
          href={href}
          className={cn(
            "inline-flex items-center justify-center gap-2 w-full py-2.5 px-4 rounded-xl text-sm font-semibold tracking-wide transition-all shadow-sm group-hover:gap-3",
            isPrimary
              ? "bg-primary hover:bg-[#c94b0c] text-primary-foreground"
              : "bg-accent hover:bg-accent/70 text-primary border border-border"
          )}
        >
          <span>{cta}</span>
          <ArrowRight size={16} />
        </Link>
      </div>
    </motion.div>
  );
}
