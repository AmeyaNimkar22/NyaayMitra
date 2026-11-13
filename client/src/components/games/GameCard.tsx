import { ArrowRight } from "lucide-react";
import type { Game } from "@/lib/gamesData";

export default function GameCard({ game, onPlay }: { game: Game; onPlay: (game: Game) => void }) {
  return (
    <div
      role="button"
      tabIndex={0}
      onClick={() => onPlay(game)}
      onKeyDown={(e) => {
        if (e.key === "Enter" || e.key === " ") onPlay(game);
      }}
      className="group cursor-pointer p-7 rounded-2xl bg-card border border-border hover:border-primary/60 hover:shadow-md transition-all duration-300 flex flex-col justify-between gap-6 hover:-translate-y-1"
    >
      <div className="flex items-start gap-4">
        <div className="w-20 h-20 rounded-2xl bg-muted border border-border p-1.5 flex items-center justify-center shrink-0 transition-all duration-300 group-hover:scale-105 group-hover:shadow-md overflow-hidden">
          <game.Illustration />
        </div>
        <div className="flex flex-col min-w-0">
          <h3 className="text-lg font-semibold text-foreground group-hover:text-primary transition-colors">
            {game.title}
          </h3>
          <p className="text-sm text-muted-foreground mt-1 line-clamp-2">{game.description}</p>
        </div>
      </div>
      <div className="flex items-center justify-between pt-3 border-t border-border/60 text-sm text-muted-foreground">
        <span>{game.questionCount} questions</span>
        <span className="font-semibold text-primary group-hover:translate-x-1 transition-transform inline-flex items-center gap-1">
          Play <ArrowRight size={15} />
        </span>
      </div>
    </div>
  );
}
