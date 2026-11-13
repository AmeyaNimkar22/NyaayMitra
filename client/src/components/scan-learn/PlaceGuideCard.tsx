import { AlertTriangle, Check, Gavel, ListChecks } from "lucide-react";
import type { PlaceGuide } from "@/lib/scanLearnService";

export default function PlaceGuideCard({ guide }: { guide: PlaceGuide }) {
  return (
    <div className="flex flex-col gap-4 bg-muted p-6 rounded-2xl shadow-sm h-full">
      <div className="flex flex-col gap-1 pb-2">
        <span className="text-xs font-semibold uppercase tracking-wider text-primary">{guide.contextLabel}</span>
        <h3 className="text-lg font-semibold text-foreground" style={{ fontFamily: "'Newsreader', serif" }}>
          {guide.headline}
        </h3>
        <p className="text-sm text-muted-foreground">{guide.intro}</p>
      </div>

      <div className="flex flex-col gap-3">
        <div className="p-4 rounded-xl bg-card shadow-sm flex flex-col gap-2">
          <div className="flex items-center gap-2 text-primary font-semibold text-sm">
            <Gavel size={17} />
            <span className="tracking-tight uppercase">Your statutory rights</span>
          </div>
          <ul className="flex flex-col gap-2 pt-1">
            {guide.rights.map((right) => (
              <li key={right.title} className="flex items-start gap-2.5 text-sm text-foreground">
                <Check size={17} className="text-primary shrink-0 mt-0.5" />
                <span>
                  <strong>{right.title}</strong> {right.body}
                </span>
              </li>
            ))}
          </ul>
        </div>

        <div className="p-4 rounded-xl bg-card shadow-sm flex flex-col gap-2">
          <div className="flex items-center gap-2 text-foreground font-semibold text-sm">
            <ListChecks size={17} className="text-secondary-foreground" />
            <span className="tracking-tight uppercase">What you can do</span>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 pt-1">
            {guide.whatYouCanDo.map((item, i) => (
              <div key={item.title} className="p-2.5 bg-background rounded-lg flex flex-col gap-1">
                <span className="text-xs text-primary font-bold">
                  {i + 1}. {item.title}
                </span>
                <span className="text-xs text-muted-foreground">{item.body}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="p-4 rounded-xl bg-card shadow-sm flex flex-col gap-2">
          <div className="flex items-center gap-2 text-foreground font-semibold text-sm">
            <AlertTriangle size={17} className="text-destructive" />
            <span className="tracking-tight uppercase">Things to avoid</span>
          </div>
          <div className="flex flex-col gap-1.5">
            {guide.thingsToAvoid.map((line) => (
              <p key={line} className="flex items-center gap-2 text-sm text-foreground">
                <span className="w-1.5 h-1.5 rounded-full bg-destructive shrink-0" />
                {line}
              </p>
            ))}
          </div>
        </div>

        <div className="flex items-center gap-2 px-3 py-2 rounded-lg bg-accent/40 text-muted-foreground text-xs">
          <span className="text-primary">ℹ</span>
          {guide.footnote}
        </div>
      </div>
    </div>
  );
}
