
import { useState } from "react";

import quizBundles from "./data/quizData";

import BundleSelection from "./components/BundleSelection";
import QuizScreen from "./components/QuizScreen";
import QuizResult from "./components/QuizResult";

export default function LawQuiz({ onExit }) {
  const [selectedBundle, setSelectedBundle] = useState(null);
  const [answers, setAnswers] = useState([]);
  const [screen, setScreen] = useState("bundles");

  const handleSelectBundle = (bundle) => {
    setSelectedBundle(bundle);
    setAnswers([]);
    setScreen("quiz");
  };

  const handleComplete = (quizAnswers) => {
    setAnswers(quizAnswers);
    setScreen("result");
  };

  const handleRetry = () => {
    setAnswers([]);
    setScreen("quiz");
  };

  const handleBackToBundles = () => {
    setSelectedBundle(null);
    setAnswers([]);
    setScreen("bundles");
  };

  return (
    <div className="w-full max-w-6xl mx-auto px-4 py-6 md:py-8">

      {screen === "bundles" && (
        <BundleSelection
          bundles={quizBundles}
          onSelectBundle={handleSelectBundle}
        />
      )}

      {screen === "quiz" && selectedBundle && (
        <QuizScreen
          key={selectedBundle.id}
          bundle={selectedBundle}
          onBack={handleBackToBundles}
          onComplete={handleComplete}
        />
      )}

      {screen === "result" && selectedBundle && (
        <QuizResult
          bundle={selectedBundle}
          answers={answers}
          onRetry={handleRetry}
          onBack={handleBackToBundles}
        />
      )}

    </div>
  );
}
