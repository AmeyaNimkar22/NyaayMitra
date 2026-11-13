import { motion } from "framer-motion";
import { ArrowRight, ArrowUpRight, BookOpen, Gamepad2, MessageSquare } from "lucide-react";
import type { LucideIcon } from "lucide-react";

const actions: { icon: LucideIcon; title: string; description: string; cta: string; href: string }[] = [
  {
    icon: MessageSquare,
    title: "Ask a Question",
    description:
      "Describe any legal notice, dispute, or civic query to receive clear, step-by-step guidance in simple terms.",
    cta: "Get Instant Guidance",
    href: "#civic-advisor",
  },
  {
    icon: BookOpen,
    title: "Know Your Rights",
    description:
      "Explore essential rights regarding tenancy, police interactions, consumer refunds, workplace safety, and digital fraud.",
    cta: "Browse 8 Core Areas",
    href: "#know-your-rights",
  },
  {
    icon: Gamepad2,
    title: "Civic Challenges",
    description:
      "Take 3-minute quizzes on consumer protection, cyber safety, and citizen rights. Build confidence and earn civic XP.",
    cta: "Play & Learn Now",
    href: "#civic-games",
  },
];

export default function QuickActionsSection() {
  return (
    <section className="relative w-full max-w-[1200px] mx-auto px-4 lg:px-10 -mt-10 lg:-mt-14 z-20 mb-16">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
        {actions.map((action, i) => (
          <motion.a
            key={action.title}
            href={action.href}
            className="group flex flex-col p-7 rounded-2xl bg-card hover:bg-accent transition-all duration-200 shadow-md hover:shadow-lg border border-border/60"
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.5, delay: i * 0.08, ease: [0.23, 1, 0.32, 1] }}
          >
            <div className="w-12 h-12 rounded-xl bg-accent flex items-center justify-center text-primary mb-5 group-hover:scale-105 transition-transform">
              <action.icon size={26} strokeWidth={1.8} />
            </div>
            <div className="flex items-center justify-between mb-2">
              <h3 className="text-lg font-semibold text-foreground">{action.title}</h3>
              <ArrowUpRight
                size={18}
                className="text-muted-foreground group-hover:text-primary group-hover:translate-x-1 group-hover:-translate-y-1 transition-all"
              />
            </div>
            <p className="text-sm text-muted-foreground leading-relaxed">{action.description}</p>
            <div className="mt-4 pt-4 flex items-center gap-2 text-sm text-primary font-semibold">
              <span>{action.cta}</span>
              <ArrowRight size={14} />
            </div>
          </motion.a>
        ))}
      </div>
    </section>
  );
}
