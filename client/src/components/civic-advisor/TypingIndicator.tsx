export default function TypingIndicator() {
  return (
    <div className="flex items-center gap-3 pl-14 text-muted-foreground text-sm">
      <span className="font-medium text-xs tracking-wide">NyaayMitra is thinking</span>
      <div className="inline-flex items-center gap-1">
        <span className="w-1.5 h-1.5 rounded-full bg-primary animate-bounce [animation-delay:-0.3s]" />
        <span className="w-1.5 h-1.5 rounded-full bg-primary animate-bounce [animation-delay:-0.15s]" />
        <span className="w-1.5 h-1.5 rounded-full bg-primary animate-bounce" />
      </div>
    </div>
  );
}
