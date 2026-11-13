import { motion } from "framer-motion";
import { games, type Game } from "@/lib/gamesData";
import GameCard from "./GameCard";

export default function GameGrid({ onPlay }: { onPlay: (game: Game) => void }) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      {games.map((game, i) => (
        <motion.div
          key={game.id}
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: i * 0.06 }}
        >
          <GameCard game={game} onPlay={onPlay} />
        </motion.div>
      ))}
    </div>
  );
}
