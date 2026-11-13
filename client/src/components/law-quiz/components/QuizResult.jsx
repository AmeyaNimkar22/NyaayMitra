
import { Trophy, CheckCircle2, XCircle, RotateCcw, ArrowLeft } from "lucide-react";

export default function QuizResult({
  bundle,
  answers,
  onRetry,
  onBack,
}) {
  const correctCount = answers.filter(
    (answer) => answer.isCorrect
  ).length;

  const incorrectCount = answers.length - correctCount;
  const score = correctCount * 10;

  const percentage = answers.length
    ? Math.round((correctCount / answers.length) * 100)
    : 0;

  let message = "Keep practising! Every attempt helps you learn.";

  if (percentage === 100) {
    message = "Excellent! You know your legal rights really well.";
  } else if (percentage >= 70) {
    message = "Great job! You have a good understanding of this topic.";
  } else if (percentage >= 40) {
    message = "Good effort! A little more practice will help.";
  }

  return (
    <div className="max-w-3xl mx-auto space-y-6">

      {/* Result Header */}
      <div className="text-center space-y-3">
        <div className="mx-auto w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center">
          <Trophy size={32} className="text-primary" />
        </div>

        <h2 className="text-2xl md:text-3xl font-bold text-foreground">
          Quiz Completed!
        </h2>

        <p className="text-muted-foreground">
          {bundle.title}
        </p>
      </div>

      {/* Score */}
      <div className="bg-card border border-border rounded-xl p-6 text-center space-y-2">
        <p className="text-sm text-muted-foreground">
          Your Score
        </p>

        <div className="text-4xl font-bold text-primary">
          {score}
          <span className="text-lg text-muted-foreground"> / 100</span>
        </div>

        <p className="text-sm text-muted-foreground">
          {percentage}% accuracy
        </p>

        <p className="text-sm font-medium text-foreground pt-2">
          {message}
        </p>
      </div>

      {/* Statistics */}
      <div className="grid grid-cols-2 gap-4">
        <div className="bg-green-500/10 border border-green-500/20 rounded-xl p-4 text-center">
          <CheckCircle2 className="mx-auto text-green-600 mb-2" size={24} />

          <p className="text-2xl font-bold text-foreground">
            {correctCount}
          </p>

          <p className="text-sm text-muted-foreground">
            Correct Answers
          </p>
        </div>

        <div className="bg-red-500/10 border border-red-500/20 rounded-xl p-4 text-center">
          <XCircle className="mx-auto text-red-500 mb-2" size={24} />

          <p className="text-2xl font-bold text-foreground">
            {incorrectCount}
          </p>

          <p className="text-sm text-muted-foreground">
            Incorrect Answers
          </p>
        </div>
      </div>

      {/* Answer Review */}
      <div className="bg-card border border-border rounded-xl p-5 space-y-4">
        <h3 className="font-semibold text-lg text-foreground">
          Review Your Answers
        </h3>

        {answers.map((answer, index) => (
          <div
            key={index}
            className="border-b border-border last:border-0 pb-4 last:pb-0 space-y-2"
          >
            <div className="flex items-start gap-2">
              {answer.isCorrect ? (
                <CheckCircle2
                  size={18}
                  className="text-green-600 shrink-0 mt-1"
                />
              ) : (
                <XCircle
                  size={18}
                  className="text-red-500 shrink-0 mt-1"
                />
              )}

              <p className="font-medium text-sm text-foreground">
                {index + 1}. {answer.question}
              </p>
            </div>

            <div className="pl-6 space-y-1 text-sm">
              <p className="text-muted-foreground">
                Your answer:{" "}
                <span className="text-foreground font-medium">
                  {answer.selectedAnswer}
                </span>
              </p>

              {!answer.isCorrect && (
                <p className="text-green-600">
                  Correct answer: {answer.correctAnswer}
                </p>
              )}

              <p className="text-muted-foreground leading-relaxed pt-1">
                {answer.explanation}
              </p>
            </div>
          </div>
        ))}
      </div>

      {/* Actions */}
      <div className="flex flex-col sm:flex-row gap-3">
        <button
          onClick={onRetry}
          className="flex-1 flex items-center justify-center gap-2 bg-primary text-primary-foreground rounded-lg py-3 font-semibold hover:opacity-90"
        >
          <RotateCcw size={17} />
          Try Again
        </button>

        <button
          onClick={onBack}
          className="flex-1 flex items-center justify-center gap-2 border border-border bg-card text-foreground rounded-lg py-3 font-semibold hover:bg-muted"
        >
          <ArrowLeft size={17} />
          Back to Topics
        </button>
      </div>
    </div>
  );
}
