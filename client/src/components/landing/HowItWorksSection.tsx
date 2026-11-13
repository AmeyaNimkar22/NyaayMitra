import { motion } from "framer-motion";
import { CheckCircle2, FileEdit, Mic, ScrollText } from "lucide-react";
import type { LucideIcon } from "lucide-react";

const steps: { number: string; icon: LucideIcon; title: string; description: string; footnote: string; footIcon: LucideIcon }[] = [
  {
    number: "01",
    icon: FileEdit,
    title: "Ask",
    description:
      "Describe your situation in any language — spoken or typed. You don't need legal terminology or section numbers.",
    footnote: "Voice input supported in Hindi & English",
    footIcon: Mic,
  },
  {
    number: "02",
    icon: ScrollText,
    title: "Understand",
    description:
      "Receive a plain-language summary anchored directly in statutory law, Supreme Court rulings, and local consumer acts.",
    footnote: "Grounded in official India Code",
    footIcon: CheckCircle2,
  },
  {
    number: "03",
    icon: CheckCircle2,
    title: "Act",
    description:
      "Download pre-filled response templates, view immediate compliance checklists, and take verified procedural next steps.",
    footnote: "Actionable document drafts ready",
    footIcon: CheckCircle2,
  },
];

export default function HowItWorksSection() {
  return (
    <section className="w-full bg-muted py-20">
      <div className="max-w-[1200px] mx-auto px-4 lg:px-10">
        <div className="text-center max-w-2xl mx-auto mb-16">
          <span className="text-xs font-semibold uppercase tracking-wider text-primary">
            Demystifying Legal Action
          </span>
          <h2
            className="text-3xl sm:text-4xl text-foreground mt-2 mb-4 font-medium"
            style={{ fontFamily: "'Newsreader', serif" }}
          >
            Three simple steps to legal clarity
          </h2>
          <p className="text-muted-foreground">
            Navigating justice in India shouldn&apos;t feel intimidating. We break complex legal
            codices into direct, actionable steps.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {steps.map((step, i) => (
            <motion.div
              key={step.number}
              className="flex flex-col p-8 rounded-2xl bg-card shadow-sm border border-border/60"
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 0.5, delay: i * 0.1, ease: [0.23, 1, 0.32, 1] }}
            >
              <div className="flex items-center justify-between mb-6">
                <span
                  className="text-4xl text-primary/25 font-medium"
                  style={{ fontFamily: "'Newsreader', serif" }}
                >
                  {step.number}
                </span>
                <div className="w-10 h-10 rounded-full bg-accent flex items-center justify-center text-primary">
                  <step.icon size={20} />
                </div>
              </div>
              <h3 className="text-lg font-semibold text-foreground mb-2">{step.title}</h3>
              <p className="text-sm text-muted-foreground leading-relaxed">{step.description}</p>
              <div className="mt-6 pt-4 text-xs text-muted-foreground flex items-center gap-1.5 border-t border-border/60">
                <step.footIcon size={13} className="text-secondary-foreground" />
                {step.footnote}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
