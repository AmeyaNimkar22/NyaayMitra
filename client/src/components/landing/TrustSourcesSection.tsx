import {
  BookOpen,
  Gavel,
  HeartHandshake,
  Landmark,
  ShieldCheck,
} from "lucide-react";

const sources = [
  { icon: BookOpen, title: "The Constitution", subtitle: "Fundamental Rights" },
  { icon: Landmark, title: "India Code", subtitle: "Official Central Acts" },
  { icon: Gavel, title: "e-Courts Services", subtitle: "Judgments & Causelists" },
  { icon: HeartHandshake, title: "NALSA Desk", subtitle: "Free Legal Aid Access" },
  { icon: ShieldCheck, title: "BNS & BNSS 2024", subtitle: "Updated Criminal Codes" },
];

const helplines = [
  { label: "National Cyber Crime Helpline", number: "1930" },
  { label: "NALSA Legal Aid Helpline", number: "15100" },
  { label: "National Consumer Helpline", number: "1915" },
];

export default function TrustSourcesSection() {
  return (
    <section id="trusted-sources" className="w-full py-20 bg-background scroll-mt-20">
      <div className="max-w-[1200px] mx-auto px-4 lg:px-10 text-center">
        <span className="text-xs font-semibold uppercase tracking-wider text-primary">
          Grounding &amp; Integrity
        </span>
        <h2
          className="text-2xl sm:text-3xl text-foreground mt-2 mb-4 font-medium"
          style={{ fontFamily: "'Newsreader', serif" }}
        >
          Anchored in verified public authorities
        </h2>
        <p className="text-muted-foreground max-w-2xl mx-auto mb-12">
          NyaayMitra synthesizes legal awareness exclusively from official gazettes, open
          judicial portals, and statutory welfare frameworks.
        </p>

        <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
          {sources.map((s, i) => (
            <div
              key={s.title}
              className={
                "p-5 rounded-2xl bg-card flex flex-col items-center justify-center shadow-sm border border-border/60" +
                (i === sources.length - 1 ? " col-span-2 md:col-span-1" : "")
              }
            >
              <s.icon size={30} className="text-primary mb-2" />
              <span className="text-sm font-bold text-foreground">{s.title}</span>
              <span className="text-[11px] text-muted-foreground mt-0.5">{s.subtitle}</span>
            </div>
          ))}
        </div>

        <div className="mt-12 p-4 rounded-xl bg-card/70 inline-flex flex-wrap items-center justify-center gap-6 text-sm text-foreground border border-border/60">
          {helplines.map((h) => (
            <span key={h.label} className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-primary" />
              <span>
                {h.label}: <strong className="font-bold">{h.number}</strong>
              </span>
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}
