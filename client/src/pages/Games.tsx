
import { useState } from "react";
import { motion } from "framer-motion";
import { Gavel } from "lucide-react";

import AppLayout from "@/components/layout/AppLayout";
import GameGrid from "@/components/games/GameGrid";

// Generic quiz for other games
import QuizModal from "@/components/games/QuizModal";

// Standalone game experiences
import NyaayDarshan from "@/components/nyaaydarshan/NyaayDarshan";
import MythOrFact from "@/components/myth-or-fact/MythOrFact";
import DetainedGame from "@/components/detained-questioned-arrested/DetainedGame";
import LawQuiz from "@/components/law-quiz/LawQuiz";

import type { Game } from "@/lib/gamesData";

export default function Games() {
  const [activeGame, setActiveGame] = useState<Game | null>(null);

  if (activeGame?.id === "nyaaydarshan") {
    return (
      <AppLayout title="Games" breadcrumb="Home / Games">
        <NyaayDarshan onExit={() => setActiveGame(null)} />
      </AppLayout>
    );
  }

  if (activeGame?.id === "myth-or-fact") {
    return (
      <AppLayout title="Games" breadcrumb="Home / Games">
        <MythOrFact onExit={() => setActiveGame(null)} />
      </AppLayout>
    );
  }

  if (activeGame?.id === "detained-questioned-arrested") {
    return (
      <AppLayout title="Games" breadcrumb="Home / Games">
        <DetainedGame onExit={() => setActiveGame(null)} />
      </AppLayout>
    );
  }

  if (activeGame?.id === "law-quiz") {
    return (
      <AppLayout title="Games" breadcrumb="Home / Games">
        <LawQuiz onExit={() => setActiveGame(null)} />
      </AppLayout>
    );
  }

  return (
    <AppLayout title="Games" breadcrumb="Home / Games">
      <motion.header
        className="flex flex-col items-start max-w-2xl mb-10"
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <div className="inline-flex items-center gap-2 bg-accent px-3 py-1 rounded-full mb-3">
          <span className="w-2 h-2 rounded-full bg-primary" />
          <span className="text-xs font-semibold text-primary uppercase tracking-wider">
            Learn Through Play
          </span>
        </div>

        <h1
          className="text-3xl sm:text-4xl text-foreground tracking-tight mb-2 font-medium"
          style={{ fontFamily: "'Newsreader', serif" }}
        >
          Learn your rights. Play a little.
        </h1>

        <p className="text-lg text-muted-foreground leading-relaxed">
          Explore Indian laws, understand your rights, and test your
          legal knowledge through interactive games and real-life
          courtroom scenarios.
        </p>
      </motion.header>

      <section className="flex flex-col gap-5 mb-12">
        <div className="flex flex-col sm:flex-row sm:items-baseline justify-between gap-1 border-b border-border pb-3">
          <h2
            className="text-xl font-semibold text-foreground"
            style={{ fontFamily: "'Newsreader', serif" }}
          >
            Choose a game
          </h2>

          <p className="text-sm text-muted-foreground">
            Pick a topic and test what you know.
          </p>
        </div>

        <GameGrid onPlay={setActiveGame} />
      </section>

      <section className="p-6 sm:p-8 bg-muted rounded-2xl border border-border flex flex-col md:flex-row items-start md:items-center justify-between gap-5">
        <div className="flex items-start gap-4 max-w-xl">
          <div className="w-10 h-10 rounded-full bg-accent flex items-center justify-center text-primary shrink-0">
            <Gavel size={20} />
          </div>

          <div>
            <h4 className="text-base font-semibold text-foreground mb-1">
              Empowerment through understanding
            </h4>

            <p className="text-sm text-muted-foreground leading-relaxed">
              Understanding the law should not be complicated.
              Explore a virtual Indian courtroom, challenge common
              legal myths, experience courtroom decisions, and
              discover your rights through simple interactive
              experiences.
            </p>
          </div>
        </div>
      </section>

      {/* Generic quiz for the other games only */}
      <QuizModal
        game={activeGame}
        onClose={() => setActiveGame(null)}
      />
    </AppLayout>
  );
}
