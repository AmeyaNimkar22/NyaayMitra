
import {
  Phone,
  ShieldCheck,
  Scale,
  ShoppingBag,
  Landmark,
  ArrowRight,
} from "lucide-react";

const bundleIcons = {
  "emergency-numbers": Phone,
  "cyber-safety": ShieldCheck,
  "police-rights": Scale,
  "consumer-rights": ShoppingBag,
  constitution: Landmark,
};

export default function BundleSelection({
  bundles,
  onSelectBundle,
}) {
  return (
    <div className="w-full space-y-6">
      {/* Heading */}
      <div className="text-center space-y-2">
        <h2 className="text-2xl md:text-3xl font-bold text-foreground">
          Choose Your Quiz
        </h2>

        <p className="text-muted-foreground text-sm md:text-base">
          Select a topic and test your legal awareness.
        </p>
      </div>

      {/* Bundle Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {bundles.map((bundle) => {
          const Icon =
            bundleIcons[bundle.id] || Scale;

          return (
            <button
              key={bundle.id}
              onClick={() => onSelectBundle(bundle)}
              className="group text-left bg-card border border-border rounded-xl p-5
                hover:border-primary hover:shadow-md
                transition-all duration-200"
            >
              <div className="flex items-start justify-between">
                <div className="p-3 rounded-lg bg-muted text-primary">
                  <Icon size={24} />
                </div>

                <ArrowRight
                  size={19}
                  className="text-muted-foreground
                    group-hover:text-primary
                    group-hover:translate-x-1
                    transition-all"
                />
              </div>

              <div className="mt-5 space-y-2">
                <h3 className="font-semibold text-foreground text-lg">
                  {bundle.title}
                </h3>

                <p className="text-sm text-muted-foreground leading-relaxed">
                  {bundle.description}
                </p>
              </div>

              <div className="mt-5 text-xs font-medium text-primary">
                10 Questions
              </div>
            </button>
          );
        })}
      </div>
    </div>
  );
}
