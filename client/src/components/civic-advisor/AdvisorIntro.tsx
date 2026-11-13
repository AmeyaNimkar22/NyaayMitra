import { Scale } from "lucide-react";

const scenarios = [
  "How do I file an FIR?",
  "My landlord won't return my deposit.",
  "What are my consumer rights?",
  "I received a legal notice.",
  "Someone is threatening me online.",
];

export default function AdvisorIntro({ onPick }: { onPick: (text: string) => void }) {
  return (
    <header className="text-center mb-8">
      <div className="inline-flex items-center justify-center w-12 h-12 rounded-2xl bg-secondary/50 text-primary mb-3.5 border border-border shadow-sm">
        <Scale size={24} strokeWidth={1.8} />
      </div>
      <h1
        className="text-3xl sm:text-4xl text-foreground tracking-tight mb-2.5 font-medium"
        style={{ fontFamily: "'Newsreader', serif" }}
      >
        How can we help you today?
      </h1>
      <p className="text-lg text-muted-foreground max-w-xl mx-auto leading-relaxed">
        Tell us what happened in your own words. You don&apos;t need to know any legal terms or
        section numbers.
      </p>
      <div className="flex flex-wrap items-center justify-center gap-2 mt-5">
        {scenarios.map((s) => (
          <button
            key={s}
            type="button"
            onClick={() => onPick(s)}
            className="px-3.5 py-1.5 rounded-full bg-card border border-border text-muted-foreground hover:border-primary/50 hover:bg-secondary/40 hover:text-foreground transition-all text-sm font-medium"
          >
            {s}
          </button>
        ))}
      </div>
    </header>
  );
}
