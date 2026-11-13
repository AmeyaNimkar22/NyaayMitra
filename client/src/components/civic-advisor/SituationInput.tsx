import { Mic, Paperclip, Send } from "lucide-react";
import type { KeyboardEvent } from "react";

interface SituationInputProps {
  value: string;
  onChange: (value: string) => void;
  onSend: () => void;
  disabled?: boolean;
}

export default function SituationInput({ value, onChange, onSend, disabled }: SituationInputProps) {
  function handleKeyDown(e: KeyboardEvent<HTMLTextAreaElement>) {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      if (value.trim() && !disabled) onSend();
    }
  }

  return (
    <div className="sticky bottom-4 z-10 pt-4">
      <div className="bg-card border border-border rounded-3xl p-2.5 shadow-lg focus-within:ring-2 focus-within:ring-primary/25 transition-all">
        <label className="sr-only" htmlFor="citizenAdvisorInput">
          Describe your situation
        </label>
        <textarea
          id="citizenAdvisorInput"
          rows={2}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder="Describe your situation here in plain words..."
          className="w-full bg-transparent px-3.5 pt-2 pb-1 border-0 focus:ring-0 focus:outline-none text-foreground placeholder:text-muted-foreground text-[15px] resize-none leading-relaxed"
        />
        <div className="flex items-center justify-between gap-2 px-2 pt-1">
          <div className="flex items-center gap-1 sm:gap-2">
            <button
              type="button"
              title="Speak in Hindi or English"
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-background hover:bg-muted text-foreground border border-border/60 text-xs font-medium transition-colors"
            >
              <Mic size={16} className="text-primary" />
              <span className="hidden sm:inline">Voice inquiry (Hindi/English)</span>
              <span className="sm:hidden">Voice</span>
            </button>
            <button
              type="button"
              title="Attach document or notice"
              className="inline-flex items-center justify-center w-8 h-8 rounded-full hover:bg-muted text-muted-foreground hover:text-foreground transition-colors"
            >
              <Paperclip size={17} />
            </button>
          </div>
          <button
            type="button"
            onClick={onSend}
            disabled={disabled || !value.trim()}
            className="inline-flex items-center justify-center gap-1.5 px-4 sm:px-5 py-2 rounded-full bg-primary hover:bg-[#c94b0c] text-primary-foreground font-semibold text-sm shadow-sm transition-all disabled:opacity-40 disabled:pointer-events-none"
          >
            <span>Send</span>
            <Send size={15} />
          </button>
        </div>
      </div>
      <p className="text-center text-[12px] text-muted-foreground mt-2.5 leading-snug px-4">
        NyaayMitra provides general legal and civic awareness. It is not a substitute for formal
        legal representation or advocate-client advice.
      </p>
    </div>
  );
}
