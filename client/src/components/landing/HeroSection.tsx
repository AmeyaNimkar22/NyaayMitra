import { motion } from "framer-motion";
import { ArrowRight, Gamepad2 } from "lucide-react";

const trustCounters = [
  { value: "100%", label: "Pro-Bono & Free" },
  { value: "22+", label: "Indian Languages" },
  { value: "500+", label: "Simplified Acts & Rules" },
  { value: "BNS Ready", label: "New Criminal Codes" },
];

/** Static line-art civic emblem: a 24-spoke wheel with the Taraju (scales of
 * justice) centered inside it. Deliberately does NOT rotate or spin —
 * only a single gentle fade/scale-in on mount. */
function JusticeEmblem() {
  return (
    <motion.div
      aria-hidden="true"
      className="absolute inset-0 pointer-events-none flex items-center justify-center -top-12 sm:-top-8 select-none"
      initial={{ opacity: 0, scale: 0.96 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 1.1, ease: [0.23, 1, 0.32, 1] }}
    >
      <svg
        className="w-[420px] h-[420px] sm:w-[600px] sm:h-[600px] lg:w-[760px] lg:h-[760px] text-muted-foreground"
        viewBox="0 0 400 400"
        fill="none"
      >
        <g opacity="0.14" stroke="currentColor" strokeWidth="0.85">
          <circle cx="200" cy="200" r="188" />
          <circle cx="200" cy="200" r="172" strokeDasharray="2 3" />
          <circle cx="200" cy="200" r="130" strokeWidth="0.5" />
          <circle cx="200" cy="200" r="42" />
          <line x1="200" y1="200" x2="200" y2="12" />
          <line x1="200" y1="200" x2="248.7" y2="18.4" />
          <line x1="200" y1="200" x2="294" y2="36" />
          <line x1="200" y1="200" x2="332.9" y2="67.1" />
          <line x1="200" y1="200" x2="364" y2="106" />
          <line x1="200" y1="200" x2="381.6" y2="151.3" />
          <line x1="200" y1="200" x2="388" y2="200" />
          <line x1="200" y1="200" x2="381.6" y2="248.7" />
          <line x1="200" y1="200" x2="364" y2="294" />
          <line x1="200" y1="200" x2="332.9" y2="332.9" />
          <line x1="200" y1="200" x2="294" y2="364" />
          <line x1="200" y1="200" x2="248.7" y2="381.6" />
          <line x1="200" y1="200" x2="200" y2="388" />
          <line x1="200" y1="200" x2="151.3" y2="381.6" />
          <line x1="200" y1="200" x2="106" y2="364" />
          <line x1="200" y1="200" x2="67.1" y2="332.9" />
          <line x1="200" y1="200" x2="36" y2="294" />
          <line x1="200" y1="200" x2="18.4" y2="248.7" />
          <line x1="200" y1="200" x2="12" y2="200" />
          <line x1="200" y1="200" x2="18.4" y2="151.3" />
          <line x1="200" y1="200" x2="36" y2="106" />
          <line x1="200" y1="200" x2="67.1" y2="67.1" />
          <line x1="200" y1="200" x2="106" y2="36" />
          <line x1="200" y1="200" x2="151.3" y2="18.4" />
        </g>
        <g opacity="0.32" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.6">
          <line strokeWidth="2.2" x1="200" y1="130" x2="200" y2="270" />
          <circle cx="200" cy="126" r="5.5" fill="currentColor" fillOpacity="0.2" />
          <path d="M182 270 L218 270" strokeWidth="2.5" />
          <path d="M188 274 L212 274" strokeWidth="1.8" />
          <line strokeWidth="2.2" x1="140" y1="148" x2="260" y2="148" />
          <circle cx="200" cy="148" r="3.5" fill="currentColor" />
          <circle cx="140" cy="148" r="2.5" fill="currentColor" />
          <circle cx="260" cy="148" r="2.5" fill="currentColor" />
          <line strokeWidth="1.1" x1="140" y1="148" x2="122" y2="198" />
          <line strokeWidth="1.1" x1="140" y1="148" x2="158" y2="198" />
          <path d="M118 198 Q140 216 162 198 Z" fill="currentColor" fillOpacity="0.12" />
          <line strokeWidth="1.1" x1="260" y1="148" x2="242" y2="198" />
          <line strokeWidth="1.1" x1="260" y1="148" x2="278" y2="198" />
          <path d="M238 198 Q260 216 282 198 Z" fill="currentColor" fillOpacity="0.12" />
        </g>
      </svg>
    </motion.div>
  );
}

export default function HeroSection() {
  return (
    <section id="top" className="relative w-full overflow-hidden bg-background pt-32 pb-20 lg:pt-40 lg:pb-28 scroll-mt-20">
      <JusticeEmblem />

      <motion.div
        className="relative max-w-[1200px] mx-auto px-4 lg:px-10 flex flex-col items-center text-center z-10"
        initial={{ opacity: 0, y: 18 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: [0.23, 1, 0.32, 1] }}
      >
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-accent mb-6 shadow-sm">
          <span className="w-2 h-2 rounded-full bg-primary animate-pulse" />
          <span className="text-[11px] uppercase tracking-wider font-semibold text-foreground">
            Free Public Civic &amp; Legal Resource
          </span>
        </div>

        <h1
          className="max-w-4xl text-[2.25rem] sm:text-5xl lg:text-6xl leading-[1.05] tracking-tight text-foreground mb-5 font-medium"
          style={{ fontFamily: "'Newsreader', serif" }}
        >
          Know your rights. <br className="hidden sm:inline" />
          Know your <span className="italic text-primary">next step.</span>
        </h1>

        <p className="text-lg text-muted-foreground max-w-2xl mb-10 leading-relaxed">
          Understand Indian laws and constitutional protections in simple, jargon-free language.
          From tenancy notices to consumer claims, get reliable civic guidance instantly.
        </p>

        <div className="flex flex-col sm:flex-row items-center gap-4 w-full sm:w-auto mb-14">
          <a
            href="#civic-advisor"
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2.5 px-8 py-3.5 rounded-xl bg-primary text-primary-foreground font-semibold hover:bg-[#c94b0c] active:scale-[0.99] transition-all shadow-sm"
          >
            Ask Legal Advisor
            <ArrowRight size={19} />
          </a>
          <a
            href="#civic-games"
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-7 py-3.5 rounded-xl bg-card text-foreground hover:bg-accent transition-all font-medium shadow-sm border border-border"
          >
            <Gamepad2 size={18} className="text-primary" />
            Play Civic Challenges
          </a>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6 w-full max-w-3xl pt-6">
          {trustCounters.map((c) => (
            <div key={c.label} className="flex flex-col items-center p-3 rounded-xl bg-card/80 backdrop-blur-sm shadow-sm">
              <span className="text-lg font-semibold text-foreground">{c.value}</span>
              <span className="text-[11px] text-muted-foreground text-center">{c.label}</span>
            </div>
          ))}
        </div>
      </motion.div>
    </section>
  );
}
