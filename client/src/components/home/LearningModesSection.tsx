import { Link } from "wouter";
import { Camera, Gamepad2 } from "lucide-react";
import type { LucideIcon } from "lucide-react";

const modes: { icon: LucideIcon; title: string; description: string; cta: string; href: string }[] = [
  {
    icon: Gamepad2,
    title: "Play & Learn",
    description: "Test yourself with quick civic and legal games.",
    cta: "Explore games",
    href: "/games",
  },
  {
    icon: Camera,
    title: "Scan & Learn",
    description: "Point your camera at a public place and learn your rights there.",
    cta: "Scan a place",
    href: "/scan-learn",
  },
];

export default function LearningModesSection() {
  return (
    <section className="mb-10">
      <div className="mb-4">
        <h3 className="text-2xl font-semibold text-foreground" style={{ fontFamily: "'Newsreader', serif" }}>
          Choose how you want to learn
        </h3>
        <p className="text-xs sm:text-sm text-muted-foreground mt-0.5">
          Pick your preferred mode to explore rights, public responsibilities, and civic guidelines.
        </p>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        {modes.map((mode) => (
          <div
            key={mode.title}
            className="bg-card rounded-2xl border border-border p-5 sm:p-6 shadow-sm flex flex-col justify-between group hover:border-primary/40 hover:-translate-y-0.5 transition-all duration-200"
          >
            <div>
              <div className="flex items-center gap-3 mb-3">
                <div className="w-10 h-10 rounded-xl bg-accent border border-border flex items-center justify-center text-primary shadow-sm">
                  <mode.icon size={20} strokeWidth={1.8} />
                </div>
                <h4
                  className="text-xl font-semibold text-foreground group-hover:text-primary transition-colors"
                  style={{ fontFamily: "'Newsreader', serif" }}
                >
                  {mode.title}
                </h4>
              </div>
              <p className="text-sm text-muted-foreground leading-relaxed mb-5">{mode.description}</p>
            </div>
            <div>
              <Link
                href={mode.href}
                className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-accent hover:bg-accent/70 text-primary border border-border text-xs sm:text-sm font-semibold transition-all group-hover:border-primary/50"
              >
                <span>{mode.cta}</span>
                <span>→</span>
              </Link>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
