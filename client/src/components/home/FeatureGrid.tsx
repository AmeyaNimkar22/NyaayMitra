import { Camera, Gamepad2, Scale } from "lucide-react";
import FeatureCard from "./FeatureCard";

export default function FeatureGrid() {
  return (
    <section className="mb-10">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
        <FeatureCard
          variant="primary"
          icon={Scale}
          title="Legal Advisor"
          description="Have a legal or civic question? Ask in your own words."
          cta="Ask a question"
          href="/advisor"
          badge="AI Powered"
        />
        <FeatureCard
          variant="secondary"
          icon={Gamepad2}
          title="Learn Through Games"
          description="Test your knowledge of rights, laws, and everyday civic situations."
          cta="Play & Learn"
          href="/games"
          badge="Interactive"
          delay={0.08}
        />
        <FeatureCard
          variant="secondary"
          icon={Camera}
          title="Scan & Learn"
          description="Scan a public place and discover your rights, responsibilities, and what to avoid."
          cta="Scan a place"
          href="/scan-learn"
          badge="Camera & Upload"
          delay={0.16}
        />
      </div>
    </section>
  );
}
