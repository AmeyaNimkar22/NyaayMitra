import { Link } from "wouter";
import { Target } from "lucide-react";
import { mockUserStats } from "@/lib/mockData";

export default function ProgressSection() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-12 gap-5 items-stretch mb-10">
      <section className="md:col-span-8 bg-card rounded-2xl border border-border p-5 shadow-sm flex flex-col justify-between">
        <div className="flex items-center justify-between mb-3.5">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-primary" />
            <h3 className="text-sm font-bold text-foreground uppercase tracking-wide">Your progress</h3>
          </div>
        </div>

        <div className="grid grid-cols-3 gap-3">
          <div className="bg-background border border-border rounded-xl p-3 text-center">
            <div className="text-lg sm:text-xl font-bold text-foreground">{mockUserStats.topicsCompleted}</div>
            <div className="text-[11px] sm:text-xs text-muted-foreground font-medium">Topics explored</div>
          </div>
          <div className="bg-background border border-border rounded-xl p-3 text-center">
            <div className="text-lg sm:text-xl font-bold text-primary flex items-center justify-center gap-1">
              <span>{mockUserStats.streak}</span>
              <span className="text-xs font-normal text-primary">days</span>
            </div>
            <div className="text-[11px] sm:text-xs text-muted-foreground font-medium">Learning streak</div>
          </div>
          <div className="bg-background border border-border rounded-xl p-3 text-center">
            <div className="text-sm sm:text-base font-bold text-foreground truncate">Level {mockUserStats.level}</div>
            <div className="text-[11px] sm:text-xs text-muted-foreground font-medium truncate">{mockUserStats.levelTitle}</div>
          </div>
        </div>
      </section>

      <section className="md:col-span-4 bg-background rounded-2xl border border-border p-5 shadow-sm flex flex-col justify-between group hover:border-primary/40 transition-colors">
        <div>
          <div className="flex items-center gap-2 mb-1.5">
            <Target size={16} className="text-primary" />
            <span className="text-xs font-bold text-muted-foreground uppercase tracking-wider">Quick Quiz</span>
          </div>
          <h4 className="text-sm sm:text-base font-semibold text-foreground">Want to test what you know?</h4>
          <p className="text-xs text-muted-foreground mt-1">Try a quick civic quiz.</p>
        </div>
        <div className="pt-3 mt-2">
          <Link
            href="/games"
            className="inline-flex items-center justify-between w-full px-3 py-2 rounded-xl bg-card border border-border group-hover:border-primary group-hover:bg-accent text-xs font-bold text-primary transition-all"
          >
            <span>Play a game</span>
            <span>→</span>
          </Link>
        </div>
      </section>
    </div>
  );
}
