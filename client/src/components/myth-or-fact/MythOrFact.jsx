
import { useState } from "react";
import {
  ArrowLeft,
  ArrowRight,
  BookOpen,
  CheckCircle2,
  XCircle,
  Trophy,
  RotateCcw,
  ExternalLink,
} from "lucide-react";

import cases from "./cases";

export default function MythOrFact({ onExit }) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [answers, setAnswers] = useState([]);
  const [isFinished, setIsFinished] = useState(false);

  const currentCase = cases[currentIndex];
  const totalQuestions = cases.length;
  const score = answers.filter(Boolean).length;

  const progress =
    ((currentIndex + (selectedAnswer ? 1 : 0)) / totalQuestions) * 100;

  const handleAnswer = (answer) => {
    if (selectedAnswer) return;

    const isCorrect = answer === currentCase.answer;

    setSelectedAnswer(answer);

    setAnswers((previous) => {
      const updated = [...previous];
      updated[currentIndex] = isCorrect;
      return updated;
    });
  };

  const handleNext = () => {
    if (currentIndex === totalQuestions - 1) {
      setIsFinished(true);
    } else {
      setCurrentIndex((previous) => previous + 1);
      setSelectedAnswer(null);
    }
  };

  const handleRestart = () => {
    setCurrentIndex(0);
    setSelectedAnswer(null);
    setAnswers([]);
    setIsFinished(false);
  };

  const handleExit = () => {
    if (onExit) onExit();
  };

  // Final result screen
  if (isFinished) {
    return (
      <div className="mx-auto w-full max-w-4xl px-4 py-6 sm:px-6">
        <button
          onClick={handleExit}
          className="mb-6 inline-flex items-center gap-2 text-sm text-muted-foreground transition hover:text-primary"
        >
          <ArrowLeft size={16} />
          Back to Games
        </button>

        <div className="rounded-2xl border border-border bg-card p-8 text-center shadow-sm sm:p-12">
          <div className="mx-auto mb-5 flex h-20 w-20 items-center justify-center rounded-full bg-accent">
            <Trophy size={38} className="text-primary" />
          </div>

          <p className="text-sm font-semibold uppercase tracking-widest text-primary">
            Game Completed
          </p>

          <h1
            className="mt-3 text-3xl font-bold text-foreground"
            style={{ fontFamily: "'Newsreader', serif" }}
          >
            Myth Buster!
          </h1>

          <p className="mt-3 text-muted-foreground">
            You've completed all {totalQuestions} statements.
          </p>

          <div className="mx-auto mt-8 max-w-sm rounded-2xl bg-muted p-6">
            <p className="text-sm font-medium text-muted-foreground">
              Your Final Score
            </p>

            <p className="mt-2 text-5xl font-bold text-primary">
              {score}
              <span className="text-2xl text-muted-foreground">
                /{totalQuestions}
              </span>
            </p>

            <p className="mt-3 text-sm font-medium text-foreground">
              {score === totalQuestions
                ? "Excellent! You're a legal facts expert."
                : score >= 3
                ? "Well done! You know your legal rights."
                : "Keep learning! Every fact makes you more aware."}
            </p>
          </div>

          <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row">
            <button
              onClick={handleRestart}
              className="inline-flex items-center justify-center gap-2 rounded-xl bg-primary px-6 py-3 text-sm font-semibold text-primary-foreground transition hover:opacity-90"
            >
              <RotateCcw size={16} />
              Play Again
            </button>

            <button
              onClick={handleExit}
              className="rounded-xl border border-border px-6 py-3 text-sm font-semibold text-foreground transition hover:bg-muted"
            >
              Back to Games
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="mx-auto w-full max-w-4xl px-4 py-5 sm:px-6">
      {/* Header */}
      <div className="mb-6 flex items-center justify-between gap-3">
        <button
          onClick={handleExit}
          className="inline-flex items-center gap-2 text-sm font-medium text-muted-foreground transition hover:text-primary"
        >
          <ArrowLeft size={16} />
          Back to Games
        </button>

        <span className="rounded-full bg-accent px-3 py-1.5 text-xs font-semibold text-primary">
          Myth or Fact?
        </span>
      </div>

      {/* Heading */}
      <div className="mb-6 text-center">
        <h1
          className="text-3xl font-bold tracking-tight text-foreground"
          style={{ fontFamily: "'Newsreader', serif" }}
        >
          Can You Spot the Truth?
        </h1>

        <p className="mt-2 text-sm text-muted-foreground">
          Read each statement and decide whether it is a myth or a fact.
        </p>
      </div>

      {/* Progress */}
      <div className="mb-6 rounded-xl border border-border bg-card p-4">
        <div className="mb-2 flex items-center justify-between">
          <span className="text-xs font-semibold text-foreground">
            Question {currentIndex + 1} of {totalQuestions}
          </span>

          <span className="text-xs font-medium text-muted-foreground">
            Score: {score}/{totalQuestions}
          </span>
        </div>

        <div className="h-2 overflow-hidden rounded-full bg-muted">
          <div
            className="h-full rounded-full bg-primary transition-all duration-500"
            style={{ width: `${progress}%` }}
          />
        </div>
      </div>

      {/* Flip Card */}
      <div className="mx-auto w-full max-w-2xl [perspective:1200px]">
        <div
          className={`relative min-h-[430px] rounded-2xl transition-transform duration-700 [transform-style:preserve-3d] ${
            selectedAnswer ? "[transform:rotateY(180deg)]" : ""
          }`}
        >
          {/* FRONT */}
          <div className="absolute inset-0 flex flex-col rounded-2xl border border-border bg-card p-6 shadow-md [backface-visibility:hidden] sm:p-9">
            <div className="flex items-center justify-between">
              <span className="rounded-full bg-accent px-3 py-1.5 text-xs font-bold uppercase tracking-wider text-primary">
                Legal Statement
              </span>

              <span className="text-xs text-muted-foreground">
                Question #{currentCase.id}
              </span>
            </div>

            <div className="flex flex-1 flex-col items-center justify-center py-8 text-center">
              <BookOpen size={30} className="mb-5 text-primary" />

              <h2
                className="text-xl font-semibold leading-relaxed text-foreground sm:text-2xl"
                style={{ fontFamily: "'Newsreader', serif" }}
              >
                "{currentCase.statement}"
              </h2>

              <p className="mt-5 text-sm text-muted-foreground">
                What do you think?
              </p>
            </div>

            {/* Answer Buttons */}
            <div className="grid grid-cols-2 gap-4">
              <button
                onClick={() => handleAnswer("MYTH")}
                disabled={!!selectedAnswer}
                className="rounded-xl border-2 border-border bg-background px-4 py-4 text-sm font-bold tracking-wider text-foreground transition hover:border-primary hover:bg-accent disabled:cursor-not-allowed"
              >
                MYTH
              </button>

              <button
                onClick={() => handleAnswer("FACT")}
                disabled={!!selectedAnswer}
                className="rounded-xl border-2 border-border bg-background px-4 py-4 text-sm font-bold tracking-wider text-foreground transition hover:border-primary hover:bg-accent disabled:cursor-not-allowed"
              >
                FACT
              </button>
            </div>
          </div>

          {/* BACK */}
          <div className="absolute inset-0 flex flex-col overflow-y-auto rounded-2xl border border-border bg-card p-6 shadow-md [backface-visibility:hidden] [transform:rotateY(180deg)] sm:p-8">
            {/* Correct / Incorrect */}
            <div className="mb-5 flex items-center gap-3">
              {selectedAnswer === currentCase.answer ? (
                <CheckCircle2 size={30} className="shrink-0 text-green-600" />
              ) : (
                <XCircle size={30} className="shrink-0 text-red-500" />
              )}

              <div>
                <p className="text-sm font-bold text-foreground">
                  {selectedAnswer === currentCase.answer
                    ? "Correct Answer!"
                    : "Not Quite!"}
                </p>

                <p className="text-xs text-muted-foreground">
                  You selected: {selectedAnswer}
                </p>
              </div>
            </div>

            {/* Correct Answer */}
            <div className="mb-5 rounded-xl bg-accent p-4">
              <p className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                The correct answer is
              </p>

              <h2 className="mt-1 text-2xl font-bold text-primary">
                {currentCase.answer}
              </h2>
            </div>

            {/* Explanation */}
            <div className="flex-1">
              <h3 className="mb-2 text-sm font-bold text-foreground">
                Why is this a {currentCase.answer.toLowerCase()}?
              </h3>

              <p className="text-sm leading-relaxed text-muted-foreground">
                {currentCase.explanation}
              </p>
            </div>

            {/* Legal Reference */}
            <div className="mt-5 rounded-xl border border-border bg-muted/50 p-4">
              <p className="mb-2 text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                Legal Reference
              </p>

              <p className="text-sm font-semibold leading-relaxed text-foreground">
                {currentCase.section}
              </p>

              <p className="mt-1 text-xs text-muted-foreground">
                {currentCase.sourceName}
              </p>

              <a
                href={currentCase.sourceUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-4 flex w-full items-center justify-center gap-2 rounded-xl bg-primary px-4 py-3 text-sm font-bold text-primary-foreground shadow-sm transition hover:opacity-90 focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2"
              >
                <ExternalLink size={17} />
                View Official Source
              </a>
            </div>

            {/* Next Button */}
            <button
              onClick={handleNext}
              className="mt-4 flex w-full items-center justify-center gap-2 rounded-xl bg-primary px-5 py-3 text-sm font-semibold text-primary-foreground transition hover:opacity-90"
            >
              {currentIndex === totalQuestions - 1
                ? "View My Score"
                : "Next Statement"}

              <ArrowRight size={17} />
            </button>
          </div>
        </div>
      </div>

      {/* Footer */}
      <p className="mt-5 text-center text-xs text-muted-foreground">
        Learn the law. Question the myths. Know your rights.
      </p>
    </div>
  );
}
