import { motion } from "framer-motion";
import {
  ArrowRight,
  Landmark,
  ShoppingBag,
  Users,
  ShieldAlert,
  Home,
  Briefcase,
  Siren,
  ClipboardCheck,
} from "lucide-react";
import type { LucideIcon } from "lucide-react";

const categories: { icon: LucideIcon; title: string; description: string }[] = [
  {
    icon: Landmark,
    title: "Constitutional Rights",
    description:
      "Fundamental freedoms, Article 19 expression, Article 21 right to life & privacy, and anti-discrimination laws.",
  },
  {
    icon: ShoppingBag,
    title: "Consumer Rights",
    description:
      "Defective goods remedies, false advertising claims, unfair trade practices, and filing on NCH/E-Daakhil.",
  },
  {
    icon: Users,
    title: "Women & Child Rights",
    description:
      "Domestic violence protections, maternity benefit act, POSH committee guidelines, and POCSO awareness.",
  },
  {
    icon: ShieldAlert,
    title: "Cyber Safety & Fraud",
    description:
      "UPI frauds, identity theft, 1930 National Cybercrime helpline procedures, and IT Act data privacy provisions.",
  },
  {
    icon: Home,
    title: "Property & Housing",
    description:
      "Tenant eviction safeguards, ancestral inheritance succession, RERA buyer remedies against builders.",
  },
  {
    icon: Briefcase,
    title: "Workplace Rights",
    description:
      "EPF & Gratuity withdrawal rules, illegal termination notices, minimum wage compliance, and work hour standards.",
  },
  {
    icon: Siren,
    title: "Police & FIR Procedures",
    description:
      "Right to know arrest grounds, D.K. Basu guidelines, Zero FIR provisions, and bailable vs non-bailable offences.",
  },
  {
    icon: ClipboardCheck,
    title: "Government Services",
    description:
      "Right to Information (RTI) filing guides, Ration card updates, Aadhaar privacy rights, and citizen charters.",
  },
];

export default function KnowYourRightsSection() {
  return (
    <section id="know-your-rights" className="w-full py-20 bg-muted scroll-mt-20">
      <div className="max-w-[1200px] mx-auto px-4 lg:px-10">
        <div className="text-center max-w-2xl mx-auto mb-16">
          <span className="text-xs font-semibold uppercase tracking-wider text-primary">
            Citizen Knowledge Base
          </span>
          <h2
            className="text-3xl sm:text-4xl text-foreground mt-2 mb-3 font-medium"
            style={{ fontFamily: "'Newsreader', serif" }}
          >
            Know Your Fundamental &amp; Statutory Rights
          </h2>
          <p className="text-muted-foreground">
            Clear, jargon-free explanations of Indian laws that protect your dignity, safety, and
            property every day.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {categories.map((cat, i) => (
            <motion.div
              key={cat.title}
              className="flex flex-col p-6 rounded-2xl bg-card hover:bg-accent transition-all group shadow-sm hover:shadow-md border border-border/60"
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.45, delay: (i % 4) * 0.06 }}
            >
              <div className="w-12 h-12 rounded-xl bg-accent flex items-center justify-center text-primary mb-4 group-hover:scale-105 transition-transform">
                <cat.icon size={24} strokeWidth={1.8} />
              </div>
              <h3 className="text-base font-semibold text-foreground mb-2">{cat.title}</h3>
              <p className="text-xs text-muted-foreground leading-relaxed flex-1">
                {cat.description}
              </p>
              <div className="mt-4 pt-3 flex items-center justify-between text-primary text-sm font-semibold">
                <span>Learn more</span>
                <ArrowRight size={15} className="group-hover:translate-x-1 transition-transform" />
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
