
import { useState } from "react";

import CaseIntro from "./components/CaseIntro";
import ScenePanel from "./components/ScenePanel";
import FinalReport from "./components/FinalReport";

import policeEncounterStages from "./data/case001";

export default function DetainedGame({ onExit }) {
  const [gameStarted, setGameStarted] = useState(false);
  const [currentStage, setCurrentStage] = useState(0);
  const [selectedChoice, setSelectedChoice] = useState(null);
  const [decisionHistory, setDecisionHistory] = useState([]);

  const handleChoice = (choice) => {
    setSelectedChoice(choice);

    setDecisionHistory((previous) => [
      ...previous,
      {
        stageIndex: currentStage,
        choiceId: choice.id,
        choiceText: choice.text
      }
    ]);
  };

  const handleContinue = () => {
    setSelectedChoice(null);

    if (currentStage < policeEncounterStages.length - 1) {
      setCurrentStage((previous) => previous + 1);
    } else {
      setGameStarted(false);
      setCurrentStage(policeEncounterStages.length);
    }
  };

  const handleRestart = () => {
    setCurrentStage(0);
    setSelectedChoice(null);
    setDecisionHistory([]);
    setGameStarted(true);
  };

  const isFinished = currentStage >= policeEncounterStages.length;

  return (
    <div className="min-h-screen bg-background text-foreground">

      {!gameStarted && !isFinished && (
        <CaseIntro onStart={() => setGameStarted(true)} />
      )}

      {gameStarted && !isFinished && (
        <ScenePanel
          stage={policeEncounterStages[currentStage]}
          stageNumber={currentStage + 1}
          totalStages={policeEncounterStages.length}
          selectedChoice={selectedChoice}
          onSelect={handleChoice}
          onContinue={handleContinue}
        />
      )}

      {isFinished && (
        <FinalReport
          decisionHistory={decisionHistory}
          stages={policeEncounterStages}
          onRestart={handleRestart}
          onExit={onExit}
        />
      )}

    </div>
  );
}
