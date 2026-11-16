import type { ReactNode } from "react";
import { AlertTriangle, Check, ExternalLink, FileText, Gavel, ScanText, ShieldCheck } from "lucide-react";
import type { PlaceGuide } from "@/lib/scanLearnService";

function Section({
  icon,
  title,
  tone = "primary",
  children,
}: {
  icon: ReactNode;
  title: string;
  tone?: "primary" | "destructive";
  children: ReactNode;
}) {
  return (
    <div className="p-4 rounded-xl bg-card shadow-sm flex flex-col gap-2 border border-border/40">
      <div
        className={`flex items-center gap-2 font-semibold text-xs uppercase tracking-wide ${
          tone === "destructive" ? "text-destructive" : "text-primary"
        }`}
      >
        {icon}
        <span>{title}</span>
      </div>
      {children}
    </div>
  );
}

function Chip({ children }: { children: ReactNode }) {
  return (
    <span className="inline-flex items-center px-2.5 py-1 rounded-md bg-card border border-border/60 text-[11px] text-foreground">
      {children}
    </span>
  );
}

function RefRow({ label, value }: { label: string; value?: ReactNode }) {
  if (!value) return null;
  return (
    <div className="flex flex-col">
      <span className="text-[11px] text-muted-foreground">{label}</span>
      <span className="text-sm text-foreground">{value}</span>
    </div>
  );
}

export default function PlaceGuideCard({ guide }: { guide: PlaceGuide }) {
  const isBackendResult = Boolean(guide.method);
  const title = guide.domain ?? guide.placeName;
  const topic = guide.topic ?? guide.placeSubtitle;
  const civicTitle = guide.infoTitle ?? guide.headline;
  const civicBody = guide.infoDescription ?? guide.intro;
  const steps = guide.whatYouCanDo.map((s) => [s.title, s.body].filter(Boolean).join(" "));

  return (
    <div className="flex flex-col gap-4 bg-muted p-6 rounded-2xl shadow-sm h-full">
      {/* ---- Header: scan results ---- */}
      <div className="flex flex-col gap-1 pb-3 border-b border-border/60">
        <span className="text-[11px] font-semibold uppercase tracking-wider text-primary">Scan results</span>
        <h3 className="text-lg font-semibold text-foreground" style={{ fontFamily: "'Newsreader', serif" }}>
          {title}
        </h3>
        {topic && <p className="text-xs text-muted-foreground">Topic: {topic}</p>}
        {isBackendResult && (
          <div className="flex flex-wrap gap-2 pt-2">
            <Chip>Method: {guide.method}</Chip>
            {guide.imageClass && <Chip>Image Class: {guide.imageClass}</Chip>}
            {guide.confidence !== undefined && <Chip>Confidence: {guide.confidence.toFixed(2)}%</Chip>}
          </div>
        )}
      </div>

      {guide.notice && (
        <div
          role="alert"
          className={`flex items-start gap-2.5 p-4 rounded-xl text-sm text-foreground border ${
            guide.notice.kind === "error" ? "bg-destructive/10 border-destructive/30" : "bg-card border-border"
          }`}
        >
          <AlertTriangle size={17} className="text-primary shrink-0 mt-0.5" />
          <p className="leading-relaxed">{guide.notice.message}</p>
        </div>
      )}

      {/* ---- Extracted text ---- */}
      {isBackendResult && (
        <Section icon={<ScanText size={15} />} title="Extracted text">
          {guide.detectedText ? (
            <p className="text-sm text-foreground whitespace-pre-line">{guide.detectedText}</p>
          ) : (
            <p className="text-sm text-muted-foreground">No readable text was extracted from this image.</p>
          )}
        </Section>
      )}

      {/* ---- Civic information ---- */}
      {(civicTitle || civicBody) && !guide.notice && (
        <Section icon={<ShieldCheck size={15} />} title="Civic information">
          {civicTitle && <p className="text-sm font-semibold text-foreground">{civicTitle}</p>}
          {civicBody && <p className="text-sm text-muted-foreground leading-relaxed">{civicBody}</p>}
          {!isBackendResult &&
            guide.rights.map((right, i) => (
              <p key={`${i}-${right.title}`} className="text-sm text-foreground">
                <strong>{right.title}</strong> {right.body}
              </p>
            ))}
        </Section>
      )}

      {/* ---- What you can do ---- */}
      {steps.length > 0 && (
        <Section icon={<Check size={15} />} title="What you can do">
          <ul className="flex flex-col gap-2">
            {steps.map((step, i) => (
              <li key={`${i}-${step}`} className="flex items-start gap-2.5 text-sm text-foreground">
                <Check size={15} className="text-primary shrink-0 mt-0.5" />
                <span>{step}</span>
              </li>
            ))}
          </ul>
        </Section>
      )}

      {/* ---- Don'ts ---- */}
      {guide.thingsToAvoid.length > 0 && (
        <Section icon={<AlertTriangle size={15} />} title="Don'ts" tone="destructive">
          <ul className="flex flex-col gap-2">
            {guide.thingsToAvoid.map((line, i) => (
              <li key={`${i}-${line}`} className="flex items-start gap-2.5 text-sm text-foreground">
                <span className="w-1.5 h-1.5 rounded-full bg-destructive shrink-0 mt-2" />
                <span>{line}</span>
              </li>
            ))}
          </ul>
        </Section>
      )}

      {/* ---- Reference details ---- */}
      {(guide.authority || guide.legalBasisType || guide.sourceName) && (
        <Section icon={<Gavel size={15} />} title="Reference details">
          <div className="flex flex-col gap-2.5">
            <RefRow label="Authority" value={guide.authority} />
            <RefRow label="Legal Basis Type" value={guide.legalBasisType} />
            <RefRow
              label="Source Name"
              value={
                guide.sourceName &&
                (guide.sourceUrl ? (
                  <a
                    href={guide.sourceUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1 hover:text-primary hover:underline"
                  >
                    {guide.sourceName} <ExternalLink size={12} />
                  </a>
                ) : (
                  guide.sourceName
                ))
              }
            />
            <RefRow label="Verified On" value={guide.verifiedDate} />
          </div>
        </Section>
      )}

      {/* ---- File name / footnote ---- */}
      {guide.filename ? (
        <div className="flex items-center gap-2 px-3 py-2 rounded-lg bg-accent/40 text-primary text-xs">
          <FileText size={13} />
          {guide.filename}
        </div>
      ) : (
        guide.footnote && (
          <div className="flex items-center gap-2 px-3 py-2 rounded-lg bg-accent/40 text-muted-foreground text-xs">
            <span className="text-primary">ℹ</span>
            {guide.footnote}
          </div>
        )
      )}
    </div>
  );
}
