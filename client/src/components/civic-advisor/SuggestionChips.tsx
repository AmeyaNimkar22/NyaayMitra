const suggestions = ["Consumer rights", "Cyber safety", "Police & FIR", "Legal notice", "Tenancy rights"];

export default function SuggestionChips({ onPick }: { onPick: (text: string) => void }) {
  return (
    <div className="mt-8 pt-5 border-t border-border flex flex-wrap items-center gap-2">
      <span className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mr-1">
        Try asking next:
      </span>
      {suggestions.map((s) => (
        <button
          key={s}
          type="button"
          onClick={() => onPick(s)}
          className="text-sm px-3 py-1 rounded-full bg-card border border-border text-muted-foreground hover:border-primary/60 hover:text-primary transition-all"
        >
          {s}
        </button>
      ))}
    </div>
  );
}
