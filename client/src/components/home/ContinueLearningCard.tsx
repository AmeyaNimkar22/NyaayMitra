import { Link } from "wouter";
import { continueLearningItem } from "@/lib/mockData";

export default function ContinueLearningCard() {
  return (
    <section className="mb-10 bg-card rounded-2xl border border-border p-5 sm:p-6 shadow-sm">
      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-primary" />
          <h3 className="text-xl font-semibold text-foreground" style={{ fontFamily: "'Newsreader', serif" }}>
            Continue learning
          </h3>
        </div>
        <span className="text-xs font-semibold text-primary bg-accent px-2.5 py-0.5 rounded-full">
          In Progress
        </span>
      </div>

      <div className="bg-background border border-border rounded-xl p-4 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="flex-1">
          <div className="flex items-center justify-between gap-3 mb-2">
            <h4 className="text-base font-semibold text-foreground">{continueLearningItem.title}</h4>
            <span className="text-sm font-bold text-primary">{continueLearningItem.percent}%</span>
          </div>
          <div className="w-full bg-border/70 rounded-full h-2 overflow-hidden">
            <div
              className="bg-primary h-2 rounded-full transition-all duration-500 ease-out"
              style={{ width: `${continueLearningItem.percent}%` }}
            />
          </div>
        </div>
        <div className="flex items-center justify-end sm:pl-4 sm:border-l sm:border-border">
          <Link
            href="/learn"
            className="inline-flex items-center gap-1.5 px-4 py-2 rounded-lg bg-primary hover:bg-[#c94b0c] text-primary-foreground text-xs font-bold transition-all shadow-sm group"
          >
            <span>Continue</span>
            <span className="transform group-hover:translate-x-0.5 transition-transform">→</span>
          </Link>
        </div>
      </div>
    </section>
  );
}
