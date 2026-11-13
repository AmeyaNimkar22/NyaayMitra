
import { useState } from "react";
import { ArrowLeft, ArrowRight, CheckCircle2, XCircle } from "lucide-react";

export default function QuizScreen({
  bundle,
  onBack,
  onComplete,
}) {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [answers, setAnswers] = useState([]);
  const questions = bundle?.questions ?? [];

  // Show this message if the bundle has no questions yet
  if (questions.length === 0) {
    return (
      <div className="bg-card border border-border rounded-xl p-8 text-center space-y-4">
        <h2 className="text-xl font-semibold text-foreground">
          Questions coming soon!
        </h2>

        <p className="text-muted-foreground text-sm">
          This quiz bundle is not ready yet.
        </p>

        <button
          onClick={onBack}
          className="text-primary font-medium hover:underline"
        >
          Back to bundles
        </button>
      </div>
    );
  }

  const question = questions[currentQuestion];

  const isAnswered = selectedAnswer !== null;
  const isCorrect = selectedAnswer === question.correctAnswer;

  const handleAnswer = (option) => {
    if (isAnswered) return;

    setSelectedAnswer(option);

    setAnswers((previous) => [
      ...previous,
      {
        question: question.question,
        selectedAnswer: option,
        correctAnswer: question.correctAnswer,
        isCorrect: option === question.correctAnswer,
        explanation: question.explanation,
      },
    ]);
  };

  const handleNext = () => {
    if (currentQuestion === questions.length - 1) {
      onComplete(answers);
      return;
    }

    setCurrentQuestion((previous) => previous + 1);
    setSelectedAnswer(null);
  };

  const progress = ((currentQuestion + 1) / questions.length) * 100;

  return (
    <div className="max-w-3xl mx-auto space-y-6">

      {/* Header */}
      <div className="flex items-center justify-between gap-3">
        <button
          onClick={onBack}
          className="flex items-center gap-2 text-sm text-muted-foreground hover:text-primary"
        >
          <ArrowLeft size={17} />
          Exit Quiz
        </button>

        <span className="text-sm font-medium text-muted-foreground">
          Question {currentQuestion + 1} of {questions.length}
        </span>
      </div>

      {/* Progress */}
      <div className="w-full h-2 bg-muted rounded-full overflow-hidden">
        <div
          className="h-full bg-primary rounded-full transition-all duration-300"
          style={{ width: `${progress}%` }}
        />
      </div>

      {/* Quiz Card */}
      <div className="bg-card border border-border rounded-xl p-5 md:p-7 space-y-6">

        <div className="space-y-2">
          <p className="text-xs font-semibold uppercase tracking-wider text-primary">
            {bundle.title}
          </p>

          <h2 className="text-xl md:text-2xl font-semibold text-foreground leading-relaxed">
            {question.question}
          </h2>
        </div>

        {/* Options */}
        <div className="space-y-3">
          {question.options.map((option, index) => {
            const isSelected = selectedAnswer === option;
            const isCorrectOption = option === question.correctAnswer;

            let optionStyle =
              "border-border hover:border-primary hover:bg-muted";

            if (isAnswered && isCorrectOption) {
              optionStyle = "border-green-500 bg-green-500/10";
            } else if (isAnswered && isSelected && !isCorrect) {
              optionStyle = "border-red-500 bg-red-500/10";
            }

            return (
              <button
                key={option}
                disabled={isAnswered}
                onClick={() => handleAnswer(option)}
                className={`w-full flex items-center gap-3 text-left p-4 rounded-lg border transition-all ${optionStyle}`}
              >
                <span className="w-8 h-8 shrink-0 rounded-full bg-muted flex items-center justify-center text-sm font-semibold text-foreground">
                  {String.fromCharCode(65 + index)}
                </span>

                <span className="flex-1 text-sm md:text-base text-foreground">
                  {option}
                </span>

                {isAnswered && isCorrectOption && (
                  <CheckCircle2 className="text-green-600 shrink-0" size={20} />
                )}

                {isSelected && !isCorrect && (
                  <XCircle className="text-red-500 shrink-0" size={20} />
                )}
              </button>
            );
          })}
        </div>

        {/* Answer Feedback */}
        {isAnswered && (
          <div
            className={`rounded-lg p-4 space-y-2 ${
              isCorrect
                ? "bg-green-500/10 border border-green-500/30"
                : "bg-red-500/10 border border-red-500/30"
            }`}
          >
            <div className="flex items-center gap-2 font-semibold text-foreground">
              {isCorrect ? (
                <CheckCircle2 size={19} className="text-green-600" />
              ) : (
                <XCircle size={19} className="text-red-500" />
              )}

              {isCorrect ? "Correct Answer!" : "Not quite!"}
            </div>

            {!isCorrect && (
              <p className="text-sm text-foreground">
                Correct answer: <strong>{question.correctAnswer}</strong>
              </p>
            )}

            <p className="text-sm text-muted-foreground leading-relaxed">
              {question.explanation}
            </p>
          </div>
        )}

        {/* Next Button */}
        {isAnswered && (
          <button
            onClick={handleNext}
            className="w-full flex items-center justify-center gap-2 bg-primary text-primary-foreground rounded-lg py-3 font-semibold hover:opacity-90 transition-opacity"
          >
            {currentQuestion === questions.length - 1
              ? "View Results"
              : "Next Question"}

            <ArrowRight size={18} />
          </button>
        )}
      </div>
    </div>
  );
}
