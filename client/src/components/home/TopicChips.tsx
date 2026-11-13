import { useLocation } from "wouter";
import { Briefcase, Home, Landmark, Lock, ShieldAlert, ShoppingBag } from "lucide-react";
import type { LucideIcon } from "lucide-react";

const topics: { key: string; label: string; icon: LucideIcon }[] = [
  { key: "police-fir", label: "Police & FIR", icon: ShieldAlert },
  { key: "consumer-rights", label: "Consumer Rights", icon: ShoppingBag },
  { key: "cyber-safety", label: "Cyber Safety", icon: Lock },
  { key: "workplace", label: "Workplace", icon: Briefcase },
  { key: "rent-property", label: "Rent & Property", icon: Home },
  { key: "govt-services", label: "Govt Services", icon: Landmark },
];

export default function TopicChips() {
  const [, setLocation] = useLocation();

  return (
    <section className="mb-10 bg-card/70 border border-border rounded-2xl p-5 sm:p-6 shadow-sm">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-4">
        <div>
          <h3 className="text-xl font-semibold text-foreground" style={{ fontFamily: "'Newsreader', serif" }}>
            What can I help you with?
          </h3>
          <p className="text-xs sm:text-sm text-muted-foreground">
            Select a topic to open the Legal Advisor with tailored plain-language guidance.
          </p>
        </div>
        <span className="text-xs text-muted-foreground self-start sm:self-auto font-medium">Quick tap prompts</span>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-2.5">
        {topics.map((topic) => (
          <button
            key={topic.key}
            type="button"
            onClick={() => setLocation(`/advisor?topic=${topic.key}`)}
            className="group flex items-center gap-2 px-3.5 py-2.5 rounded-xl bg-background border border-border hover:border-primary hover:bg-accent text-left transition-all"
          >
            <topic.icon size={17} className="text-primary shrink-0" />
            <span className="text-xs sm:text-sm font-semibold text-foreground group-hover:text-primary truncate">
              {topic.label}
            </span>
          </button>
        ))}
      </div>
    </section>
  );
}
