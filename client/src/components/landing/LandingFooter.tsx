import { BadgeCheck, Lock, Shield } from "lucide-react";

const columns = [
  {
    heading: "For Citizens",
    links: [
      { label: "Ask Legal Advisor", href: "#civic-advisor" },
      { label: "Know Your Rights", href: "#know-your-rights" },
      { label: "Citizen Learning Center", href: "#know-your-rights" },
      { label: "Civic Challenges / Games", href: "#civic-games" },
      { label: "My Progress", href: "#civic-games" },
    ],
  },
  {
    heading: "Legal Resources",
    links: [
      { label: "Acts & Statutes", href: "#know-your-rights" },
      { label: "Key Court Judgments", href: "#trusted-sources" },
      { label: "Government Schemes & Subsidies", href: "#know-your-rights" },
      { label: "Legal Terms Simplified", href: "#know-your-rights" },
    ],
  },
  {
    heading: "About & Trust",
    links: [
      { label: "Our Public Mission", href: "#top" },
      { label: "Contact Civic Desk", href: "#top" },
      { label: "Privacy & Data Sovereignty", href: "#top" },
      { label: "Terms of Public Access", href: "#top" },
    ],
  },
];

export default function LandingFooter() {
  return (
    <footer className="w-full bg-muted">
      <div className="max-w-[1200px] mx-auto px-4 lg:px-10 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
          <div>
            <span
              className="text-lg font-semibold text-foreground"
              style={{ fontFamily: "'Newsreader', serif" }}
            >
              NyaayMitra
            </span>
            <p className="text-sm text-muted-foreground leading-relaxed mt-3 mb-4">
              Empowering Indian citizens with accessible, culturally-grounded legal literacy and
              empathetic civic guidance.
            </p>
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-accent/60 text-xs text-secondary-foreground font-medium">
              <BadgeCheck size={14} className="text-primary" /> Civic Empowerment Initiative
            </span>
          </div>

          {columns.map((col) => (
            <div key={col.heading}>
              <h3 className="text-base font-semibold text-foreground mb-4">{col.heading}</h3>
              <ul className="space-y-2 text-sm text-muted-foreground">
                {col.links.map((link) => (
                  <li key={link.label}>
                    <a href={link.href} className="hover:text-primary transition-colors">
                      {link.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="bg-card rounded-xl p-4 mb-8 border border-border/60">
          <div className="flex items-start gap-3">
            <Shield size={20} className="text-primary shrink-0 mt-0.5" />
            <p className="text-xs text-muted-foreground leading-relaxed">
              <strong className="font-semibold text-foreground">Statutory Legal Disclaimer:</strong>{" "}
              Information provided on NyaayMitra is curated strictly for legal literacy,
              procedural guidance, and civic awareness purposes. It does not constitute formal
              legal counsel or attorney-client privileged advice under the Advocates Act, 1961.
            </p>
          </div>
        </div>

        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-4 text-xs text-muted-foreground border-t border-border/60">
          <div>© 2026 NyaayMitra. Built for Public Civic Awareness &amp; Accessible Justice.</div>
          <div className="flex items-center gap-4">
            <span className="flex items-center gap-1.5">
              <Shield size={14} className="text-secondary-foreground" /> Digital India Aligned
            </span>
            <span className="flex items-center gap-1.5">
              <Lock size={14} className="text-secondary-foreground" /> Privacy First
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
}
