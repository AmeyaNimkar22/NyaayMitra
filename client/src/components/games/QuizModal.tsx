import { useEffect, useState } from "react";
import { Check, Trophy, X } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogTitle,
} from "@/components/ui/dialog";
import { sampleQuestions, type Game } from "@/lib/gamesData";
import { cn } from "@/lib/utils";

interface QuizModalProps {
  game: Game | null;
  onClose: () => void;
}

export default function QuizModal({ game, onClose }: QuizModalProps) {
  const [questionIndex, setQuestionIndex] = useState(0);
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [completed, setCompleted] = useState(false);
  const [score, setScore] = useState(0);

  useEffect(() => {
    if (game) {
      setQuestionIndex(0);
      setSelectedId(null);
      setCompleted(false);
      setScore(0);
    }
  }, [game]);

  if (!game) return null;

  const question = sampleQuestions[questionIndex % sampleQuestions.length];
  const selectedOption = question.options.find((o) => o.id === selectedId);
  const isLastQuestion = questionIndex === game.questionCount - 1;

  function handleSelect(id: string) {
    if (selectedId) return; // lock after first pick, matches source behaviour
    setSelectedId(id);
    const option = question.options.find((o) => o.id === id);
    if (option?.correct) setScore((s) => s + 1);
  }

  function handleNext() {
    if (isLastQuestion) {
      setCompleted(true);
    } else {
      setQuestionIndex((i) => i + 1);
      setSelectedId(null);
    }
  }

  function handlePlayAgain() {
    setQuestionIndex(0);
    setSelectedId(null);
    setCompleted(false);
    setScore(0);
  }

  const progressPercent = completed ? 100 : ((questionIndex + 1) / game.questionCount) * 100;

  return (
    <Dialog open={!!game} onOpenChange={(open) => !open && onClose()}>
      <DialogContent className="max-w-2xl p-0 gap-0 overflow-hidden" showCloseButton={false}>
        <DialogTitle className="sr-only">{game.title} quiz</DialogTitle>

        <div className="px-6 py-4 border-b border-border bg-muted flex items-center justify-between gap-3">
          <div className="flex items-center gap-3 min-w-0">
            <span className="text-xs px-2.5 py-1 rounded-full bg-accent text-primary font-semibold uppercase tracking-wider shrink-0">
              {game.title}
            </span>
            {!completed && (
              <span className="text-sm text-muted-foreground shrink-0">
                Question {questionIndex + 1} of {game.questionCount}
              </span>
            )}
          </div>
          <button
            type="button"
            onClick={onClose}
            className="text-muted-foreground hover:text-foreground text-sm inline-flex items-center gap-1 transition-colors px-2 py-1 rounded-lg hover:bg-accent shrink-0"
          >
            <X size={15} /> Exit
          </button>
        </div>

        <div className="w-full h-1.5 bg-border">
          <div
            className="h-full bg-primary transition-all duration-300"
            style={{ width: `${progressPercent}%` }}
          />
        </div>

        {!completed ? (
          <div className="p-6 sm:p-8 flex flex-col gap-6">
            <div>
              <span className="text-xs font-semibold uppercase tracking-wider text-primary block mb-2">
                Civic Rights Scenario
              </span>
              <h2 className="text-xl font-semibold text-foreground" style={{ fontFamily: "'Newsreader', serif" }}>
                {question.prompt}
              </h2>
            </div>

            <div className="flex flex-col gap-3">
              {question.options.map((option) => {
                const isSelected = selectedId === option.id;
                return (
                  <button
                    key={option.id}
                    type="button"
                    onClick={() => handleSelect(option.id)}
                    className={cn(
                      "w-full text-left p-4 rounded-xl border transition-all flex items-start gap-3 group",
                      isSelected && option.correct && "border-primary bg-accent",
                      isSelected && !option.correct && "border-destructive bg-destructive/10",
                      !isSelected && "border-border bg-background hover:bg-muted"
                    )}
                  >
                    <span className="w-7 h-7 rounded-full bg-muted group-hover:bg-accent flex items-center justify-center text-sm font-semibold text-foreground shrink-0 mt-0.5">
                      {option.id}
                    </span>
                    <div className="flex flex-col">
                      <span className="text-sm font-medium text-foreground">{option.text}</span>
                      {isSelected && (
                        <div
                          className={cn(
                            "mt-1.5 text-sm font-semibold flex items-center gap-1.5",
                            option.correct ? "text-primary" : "text-destructive"
                          )}
                        >
                          {option.correct ? <Check size={15} /> : <X size={15} />}
                          <span className="font-normal">{option.feedback}</span>
                        </div>
                      )}
                    </div>
                  </button>
                );
              })}
            </div>

            {selectedOption && (
              <div className="p-4 bg-muted rounded-xl border border-border/60">
                <div className="flex items-start gap-2.5">
                  <span className="text-primary shrink-0 mt-0.5">ℹ</span>
                  <p className="text-sm text-muted-foreground">
                    <strong className="text-foreground font-semibold">Why it matters:</strong>{" "}
                    Understanding this helps you respond calmly and confidently in real situations.
                  </p>
                </div>
              </div>
            )}

            <div className="flex items-center justify-end pt-2 border-t border-border/60">
              <button
                type="button"
                onClick={handleNext}
                disabled={!selectedId}
                className="px-6 py-2 rounded-xl bg-primary text-primary-foreground font-semibold hover:bg-[#c94b0c] transition-all flex items-center gap-1.5 disabled:opacity-40 disabled:pointer-events-none"
              >
                {isLastQuestion ? "Finish" : "Next Question"} →
              </button>
            </div>
          </div>
        ) : (
          <div className="p-10 text-center flex flex-col items-center justify-center gap-4">
            <div className="w-16 h-16 rounded-full bg-accent text-primary flex items-center justify-center mx-auto">
              <Trophy size={32} />
            </div>
            <div className="flex flex-col gap-1">
              <span className="text-xs font-semibold uppercase tracking-widest text-primary">
                Session Completed
              </span>
              <h2 className="text-2xl font-semibold text-foreground" style={{ fontFamily: "'Newsreader', serif" }}>
                Game complete!
              </h2>
              <div className="flex items-center justify-center gap-2 mt-2">
                <span className="text-muted-foreground">Score:</span>
                <span className="text-xl font-bold text-primary">
                  {score} / {game.questionCount}
                </span>
              </div>
              <p className="text-sm text-muted-foreground max-w-sm mx-auto mt-2">
                Great job! Keep learning your rights. Regular review builds confidence during
                real-world civic encounters.
              </p>
            </div>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-3 w-full max-w-xs mx-auto pt-3">
              <button
                type="button"
                onClick={handlePlayAgain}
                className="w-full sm:w-auto px-6 py-2 rounded-xl bg-primary text-primary-foreground font-semibold hover:bg-[#c94b0c] transition-colors shadow-sm"
              >
                Play Again
              </button>
              <button
                type="button"
                onClick={onClose}
                className="w-full sm:w-auto px-6 py-2 rounded-xl bg-card text-foreground border border-border font-semibold hover:bg-muted transition-colors"
              >
                Back to Games
              </button>
            </div>
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
}
