import { useState } from "react";
import { ArrowRight, Bookmark, Check, ChevronDown, Scale } from "lucide-react";
import type { AdvisorGuidance } from "@/lib/civicAdvisorService";

export default function GuidanceResponse({ guidance }: { guidance: AdvisorGuidance }) {
  const [sourcesOpen, setSourcesOpen] = useState(false);
  const [saved, setSaved] = useState(false);

  return (
    <div className="flex items-start gap-3 sm:gap-4">
      <div className="w-10 h-10 rounded-2xl bg-muted border border-border flex items-center justify-center text-primary shrink-0 shadow-sm mt-1">
        <Scale size={20} />
      </div>

      <article className="flex-1 min-w-0 bg-card border border-border rounded-2xl rounded-tl-sm p-6 sm:p-7 shadow-sm text-foreground">
        <div className="flex items-center justify-between pb-3.5 mb-5 border-b border-border gap-3">
          <div className="flex items-center gap-2 min-w-0">
            <span className="font-semibold text-foreground truncate">NyaayMitra Civic Guide</span>
            <span className="text-xs px-2 py-0.5 rounded-md bg-muted text-primary font-semibold tracking-wide whitespace-nowrap">
              Plain-Language Guidance
            </span>
          </div>
          <button
            type="button"
            onClick={() => setSaved((v) => !v)}
            className="text-muted-foreground hover:text-foreground text-xs inline-flex items-center gap-1 transition-colors shrink-0"
          >
            <Bookmark size={16} className={saved ? "fill-primary text-primary" : ""} />
            <span className="hidden sm:inline">{saved ? "Saved" : "Save"}</span>
          </button>
        </div>

        <section className="mb-5 text-left">
          <h2 className="text-lg font-semibold text-foreground mb-2 flex items-center gap-2">
            <span className="w-1.5 h-1.5 rounded-full bg-primary" />
            Here&apos;s what this may mean
          </h2>
          <p className="text-sm text-foreground leading-relaxed">{guidance.summary}</p>
        </section>

        <section className="mb-5 bg-muted/60 rounded-xl p-4 border border-border/60 text-left">
          <h2 className="text-lg font-semibold text-foreground mb-2.5 flex items-center gap-2">
            <span className="w-1.5 h-1.5 rounded-full bg-primary" />
            Your possible rights
          </h2>
          <ul className="space-y-2 text-sm text-muted-foreground">
            {guidance.rights.map((right) => (
              <li key={right.title} className="flex items-start gap-2.5">
                <Check size={17} className="text-primary mt-0.5 shrink-0" />
                <span>
                  <strong className="text-foreground">{right.title}</strong> {right.body}
                </span>
              </li>
            ))}
          </ul>
        </section>

        <section className="mb-5 text-left">
          <h2 className="text-lg font-semibold text-foreground mb-3 flex items-center gap-2">
            <span className="w-1.5 h-1.5 rounded-full bg-primary" />
            What you can do next
          </h2>
          <ol className="space-y-3 text-sm text-foreground">
            {guidance.nextSteps.map((step, i) => (
              <li key={step.title} className="flex items-start gap-3">
                <span className="w-6 h-6 rounded-full bg-secondary text-secondary-foreground text-xs font-bold flex items-center justify-center shrink-0 mt-0.5">
                  {i + 1}
                </span>
                <span>
                  <strong>{step.title}</strong> {step.body}
                </span>
              </li>
            ))}
          </ol>
        </section>

        <div className="pt-3 border-t border-border flex flex-wrap items-center justify-between gap-3 text-sm">
          <a href="#" className="inline-flex items-center gap-1 text-primary font-semibold hover:underline">
            <span>{guidance.learnMoreLabel}</span>
            <ArrowRight size={15} />
          </a>
          <button
            type="button"
            onClick={() => setSourcesOpen((v) => !v)}
            className="inline-flex items-center gap-1 text-muted-foreground hover:text-foreground text-xs"
          >
            <ChevronDown size={13} className={`transition-transform ${sourcesOpen ? "rotate-180" : ""}`} />
            <span>{guidance.sourceSummary}</span>
          </button>
        </div>
        {sourcesOpen && (
          <div className="mt-2.5 p-3 rounded-lg bg-background text-xs text-muted-foreground leading-relaxed border border-border/60 text-left">
            {guidance.sourceDetail}
          </div>
        )}
      </article>
    </div>
  );
}
