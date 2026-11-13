import { useState } from "react";
import { motion } from "framer-motion";
import {
  BadgeCheck,
  BookOpen,
  Lock,
  Mic,
  Scale,
  Send,
  Share2,
  HelpCircle,
  FileText,
  Lightbulb,
  ListTodo,
} from "lucide-react";

const scenarios = [
  "E-commerce app refusing refund for damaged appliance",
  "Police officer refusing to register Zero FIR for stolen phone",
  "Employer withholding relieving letter & final PF clearance",
];

const checklist = [
  {
    title: "Verify Notice Medium & Timeline:",
    body: "Ensure whether the notice was delivered via registered post, email, or simple text. A valid legal notice must specify precise reasons.",
  },
  {
    title: "Preserve Evidence:",
    body: "Collate digital copies of your registered Rent Agreement, bank transfer receipts of rent, and maintenance deposit acknowledgments.",
  },
  {
    title: "Issue Formal Written Reply:",
    body: "Respond formally within 7 days refuting unjustified abrupt eviction, citing contractual notice clauses and timely rent payment history.",
  },
];

const defaultQuery =
  "I received a notice from my landlord asking me to vacate in 7 days without prior notice. What should I do under Indian tenancy laws?";

export default function AdvisorPreviewSection() {
  const [query, setQuery] = useState(defaultQuery);

  return (
    <section id="civic-advisor" className="w-full py-20 bg-background scroll-mt-20">
      <div className="max-w-[1200px] mx-auto px-4 lg:px-10">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
          <div>
            <span className="text-xs font-semibold uppercase tracking-wider text-primary">
              Interactive Citizen Advisory Desk
            </span>
            <h2
              className="text-3xl sm:text-4xl text-foreground mt-2 font-medium"
              style={{ fontFamily: "'Newsreader', serif" }}
            >
              Have a legal question?
            </h2>
            <p className="text-muted-foreground mt-2 max-w-xl">
              See how the Legal Advisor untangles real Indian legal disputes with calm empathy and
              statutory precision.
            </p>
          </div>
          <div className="flex items-center gap-2 text-muted-foreground text-xs">
            <Lock size={15} className="text-primary" /> Encrypted &amp; Privacy-First Session
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Left: input + example scenarios */}
          <motion.div
            className="lg:col-span-5 flex flex-col gap-5"
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.5 }}
          >
            <div className="p-6 rounded-2xl bg-card shadow-md border border-border/60">
              <label className="block text-sm font-semibold text-foreground mb-2">Your Civic Query</label>
              <div className="relative mb-4">
                <textarea
                  className="w-full p-4 rounded-xl bg-background text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-primary/25 resize-none shadow-inner border border-border/60"
                  rows={4}
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  placeholder="E.g., Can landlord deduct full security deposit for painting?"
                />
                <button
                  className="absolute bottom-3 right-3 p-1.5 rounded-lg bg-accent text-muted-foreground hover:text-primary transition-colors"
                  aria-label="Speech input"
                  type="button"
                >
                  <Mic size={18} />
                </button>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-xs text-muted-foreground">
                  Language: <strong className="text-foreground">English (EN)</strong>
                </span>
                <button
                  type="button"
                  className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-primary text-primary-foreground font-semibold text-sm hover:bg-[#c94b0c] transition-all shadow-sm"
                >
                  Analyze Situation
                  <Send size={16} />
                </button>
              </div>
            </div>

            <div className="p-6 rounded-2xl bg-accent/40">
              <h4 className="text-sm font-semibold text-foreground mb-3">
                Or try frequent citizen scenarios:
              </h4>
              <div className="space-y-2">
                {scenarios.map((s) => (
                  <button
                    key={s}
                    type="button"
                    onClick={() => setQuery(s)}
                    className="w-full text-left p-3 rounded-xl bg-card hover:bg-accent transition-all flex items-center justify-between text-sm text-muted-foreground shadow-sm"
                  >
                    <span>{s}</span>
                  </button>
                ))}
              </div>
            </div>
          </motion.div>

          {/* Right: structured guidance response */}
          <motion.div
            className="lg:col-span-7 flex flex-col p-6 sm:p-9 rounded-2xl bg-card shadow-lg border border-border/60"
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.5, delay: 0.12 }}
          >
            <div className="flex items-center justify-between pb-5 mb-6 bg-muted p-4 rounded-xl gap-3">
              <div className="flex items-center gap-3 min-w-0">
                <div className="w-10 h-10 rounded-xl bg-primary/12 text-primary flex items-center justify-center shrink-0">
                  <Scale size={20} />
                </div>
                <div className="min-w-0">
                  <span className="text-sm font-semibold text-foreground block leading-tight">
                    Legal Advisory Counsel
                  </span>
                  <span className="text-xs text-muted-foreground truncate block">
                    Assessed under Tenancy Frameworks &amp; TPA
                  </span>
                </div>
              </div>
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-card text-secondary-foreground text-xs shrink-0">
                <BadgeCheck size={14} className="text-primary" /> Verified Citation
              </div>
            </div>

            <div className="mb-6">
              <h3 className="text-sm font-bold text-foreground flex items-center gap-2 mb-2.5">
                <Lightbulb size={18} className="text-primary" />
                Here is what this generally means:
              </h3>
              <p className="text-sm text-muted-foreground leading-relaxed">
                Under Indian law, a landlord{" "}
                <strong className="text-foreground font-semibold">
                  cannot unilaterally evict a tenant within 7 days
                </strong>{" "}
                without formal cause or without adhering to the notice period specified in your
                registered rental agreement. Both state rent control legislations and Section 106
                of the Transfer of Property Act mandate a standard notice period (typically 15 to
                30 days) before eviction proceedings can begin.
              </p>
            </div>

            <div className="mb-6 bg-muted/70 p-5 rounded-xl">
              <h4 className="text-sm font-bold text-foreground flex items-center gap-2 mb-3">
                <ListTodo size={18} className="text-primary" />
                Your Immediate Action Checklist:
              </h4>
              <div className="space-y-3">
                {checklist.map((item, i) => (
                  <div key={item.title} className="flex items-start gap-3">
                    <span className="w-5 h-5 rounded-full bg-primary text-primary-foreground flex items-center justify-center text-[11px] font-bold shrink-0 mt-0.5">
                      {i + 1}
                    </span>
                    <p className="text-sm text-muted-foreground">
                      <strong className="text-foreground font-medium">{item.title}</strong> {item.body}
                    </p>
                  </div>
                ))}
              </div>
            </div>

            <div className="p-4 rounded-xl bg-accent/40 mb-6">
              <div className="flex items-start gap-3">
                <BookOpen size={20} className="text-primary shrink-0 mt-0.5" />
                <div>
                  <span className="text-xs uppercase tracking-wider text-muted-foreground block mb-1">
                    Applicable Indian Statutes
                  </span>
                  <p className="text-sm text-foreground font-medium">
                    Section 106, Transfer of Property Act, 1882 &amp; Model Tenancy Act, 2021
                    (Eviction Protection &amp; Notice Norms)
                  </p>
                  <p className="text-xs text-muted-foreground mt-1">
                    Supreme Court precedent in <em>Ramesh Kumar v. Kesho Ram (1992)</em> clarifies
                    that tenant eviction must follow due process of local Rent Authority courts.
                  </p>
                </div>
              </div>
            </div>

            <div className="flex flex-wrap items-center gap-3 pt-2 mb-5">
              <button
                type="button"
                className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-primary text-primary-foreground text-sm font-semibold hover:bg-[#c94b0c] transition-colors shadow-sm"
              >
                <FileText size={17} />
                Draft Written Reply Template
              </button>
              <button
                type="button"
                className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-background text-foreground hover:bg-accent text-sm font-medium transition-colors shadow-sm border border-border/60"
              >
                <HelpCircle size={17} className="text-muted-foreground" />
                Ask Follow-up Question
              </button>
              <button
                type="button"
                aria-label="Share guidance"
                className="p-2.5 rounded-xl bg-background text-muted-foreground hover:text-foreground transition-colors shadow-sm border border-border/60"
              >
                <Share2 size={18} />
              </button>
            </div>

            <p className="pt-4 flex items-start gap-2.5 text-muted-foreground text-xs border-t border-border/60">
              <BadgeCheck size={15} className="text-primary shrink-0 mt-0.5" />
              Guidance generated for civic awareness &amp; procedural understanding under Indian
              statutes. Not a substitute for formal legal counsel.
            </p>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
