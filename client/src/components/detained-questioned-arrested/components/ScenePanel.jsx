
import {
  MessageCircle,
  ShieldCheck,
  ArrowRight,
  AlertCircle,
  Shield,
  CheckCircle2,
  Scale,
  MapPin
} from "lucide-react";

import SceneArtwork from "./SceneArtwork";

const stageIcons = [MapPin, MessageCircle, Scale, Shield];

const stageLabels = [
  "ENCOUNTER",
  "REQUEST",
  "QUESTIONING",
  "ARREST"
];

export default function ScenePanel({
  stage,
  stageNumber,
  totalStages,
  selectedChoice,
  onSelect,
  onContinue
}) {
  return (
    <div className="mx-auto w-full max-w-7xl space-y-4 p-3 sm:p-5">

      {/* HEADER */}
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div>
          <p className="text-xs font-bold tracking-widest text-primary">
            INTERACTIVE LEGAL SIMULATION
          </p>
          <h1 className="mt-1 text-xl font-extrabold sm:text-2xl">
            Detained, Questioned or Arrested?
          </h1>
        </div>

        <div className="rounded-xl border border-border bg-card px-4 py-2">
          <p className="text-xs text-muted-foreground">
            CURRENT STAGE
          </p>
          <p className="font-bold">
            {String(stageNumber).padStart(2, "0")} /{" "}
            {String(totalStages).padStart(2, "0")}
          </p>
        </div>
      </div>

      {/* COMPACT PROGRESS TRACKER */}
      <div className="rounded-xl border border-border bg-card px-4 py-3">
        <div className="mb-3 flex items-center justify-between">
          <span className="text-xs font-bold sm:text-sm">
            YOUR JOURNEY
          </span>
          <span className="text-xs font-semibold text-primary">
            {Math.round((stageNumber / totalStages) * 100)}% completed
          </span>
        </div>

        <div className="flex gap-2">
          {stageLabels.slice(0, totalStages).map((label, index) => {
            const Icon = stageIcons[index];
            const active = index + 1 === stageNumber;
            const completed = index + 1 < stageNumber;

            return (
              <div key={label} className="min-w-0 flex-1">
                <div
                  className={`mb-2 h-1.5 rounded-full transition-all duration-500 ${
                    active || completed
                      ? "bg-primary"
                      : "bg-muted"
                  }`}
                />

                <div className="flex items-center justify-center gap-1 sm:justify-start sm:gap-2">
                  {completed ? (
                    <CheckCircle2 size={14} className="shrink-0 text-primary" />
                  ) : (
                    <Icon
                      size={14}
                      className={`shrink-0 ${
                        active ? "text-primary" : "text-muted-foreground"
                      }`}
                    />
                  )}

                  <span
                    className={`hidden text-[10px] font-bold sm:inline ${
                      active ? "text-primary" : "text-muted-foreground"
                    }`}
                  >
                    {label}
                  </span>

                  <span
                    className={`text-[9px] font-bold sm:hidden ${
                      active ? "text-primary" : "text-muted-foreground"
                    }`}
                  >
                    {index + 1}
                  </span>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* TWO COLUMN GAMEPLAY */}
      <div className="grid items-start gap-4 lg:grid-cols-[0.9fr_1.1fr]">

        {/* LEFT COLUMN: SCENE AND DIALOGUE */}
        <div className="space-y-4 lg:sticky lg:top-4">

          <SceneArtwork stageNumber={stageNumber} />

          {/* OFFICER DIALOGUE */}
          <div className="rounded-2xl border border-border bg-card p-4 sm:p-5">
            <div className="flex items-start gap-3">
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-primary/10 text-primary">
                <MessageCircle size={21} />
              </div>

              <div className="min-w-0">
                <p className="mb-2 text-xs font-bold tracking-widest text-primary">
                  OFFICER SAYS
                </p>

                <p className="text-sm font-medium leading-6 sm:text-base">
                  {stage.dialogue}
                </p>
              </div>
            </div>
          </div>

          {/* SCENE LOCATION */}
          <div className="flex items-center gap-2 px-1 text-xs text-muted-foreground">
            <MapPin size={14} className="text-primary" />
            <span>
              {stage.location || stageLabels[stageNumber - 1]}
            </span>
          </div>
        </div>

        {/* RIGHT COLUMN: DECISION AND FEEDBACK */}
        <div className="space-y-4">

          {/* QUESTION */}
          <div className="rounded-2xl border border-border bg-card p-4 sm:p-6">
            <p className="mb-2 text-xs font-bold tracking-widest text-primary">
              YOUR TURN
            </p>

            <h3 className="text-lg font-extrabold leading-snug sm:text-xl">
              {stage.question}
            </h3>

            <p className="mt-2 text-sm text-muted-foreground">
              Choose how you want to respond. Your decision will shape
              the next part of the encounter.
            </p>

            {/* CHOICES */}
            <div className="mt-5 grid gap-3">
              {stage.choices.map((choice) => {
                const isSelected = selectedChoice?.id === choice.id;
                const isDisabled = !!selectedChoice && !isSelected;

                return (
                  <button
                    key={choice.id}
                    disabled={!!selectedChoice}
                    onClick={() => onSelect(choice)}
                    className={`group flex w-full items-center gap-3 rounded-xl border p-3 text-left transition-all duration-200 sm:p-4 ${
                      isSelected
                        ? "border-primary bg-primary/10 ring-2 ring-primary/20"
                        : isDisabled
                        ? "border-border opacity-40"
                        : "border-border hover:-translate-y-0.5 hover:border-primary hover:bg-primary/5"
                    }`}
                  >
                    <div
                      className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-lg font-extrabold ${
                        isSelected
                          ? "bg-primary text-primary-foreground"
                          : "bg-muted text-primary group-hover:bg-primary group-hover:text-primary-foreground"
                      }`}
                    >
                      {choice.id}
                    </div>

                    <p className="min-w-0 flex-1 text-sm font-semibold leading-6">
                      {choice.text}
                    </p>

                    {isSelected ? (
                      <CheckCircle2
                        size={20}
                        className="shrink-0 text-primary"
                      />
                    ) : (
                      !selectedChoice && (
                        <ArrowRight
                          size={18}
                          className="shrink-0 text-muted-foreground transition group-hover:translate-x-1 group-hover:text-primary"
                        />
                      )
                    )}
                  </button>
                );
              })}
            </div>
          </div>

          {/* RESPONSE AND LEGAL LEARNING */}
          {selectedChoice && (
            <div className="space-y-4">

              {/* CONSEQUENCE */}
              <div className="rounded-2xl border border-border bg-card p-4 sm:p-5">
                <p className="mb-3 flex items-center gap-2 text-sm font-bold">
                  <MessageCircle size={18} className="text-primary" />
                  WHAT HAPPENS NEXT?
                </p>

                <p className="text-sm leading-7 text-muted-foreground">
                  {selectedChoice.response}
                </p>
              </div>

              {/* LEGAL INSIGHT */}
              <div className="rounded-2xl border border-primary/30 bg-primary/5 p-4 sm:p-5">
                <p className="mb-3 flex items-center gap-2 text-sm font-bold text-primary">
                  <ShieldCheck size={19} />
                  KNOW YOUR RIGHTS
                </p>

                <h4 className="mb-2 text-base font-extrabold sm:text-lg">
                  {stage.legalInsight.heading}
                </h4>

                <p className="text-sm leading-7 text-muted-foreground">
                  {stage.legalInsight.explanation}
                </p>

                <div className="mt-4 flex flex-wrap items-center justify-between gap-3 border-t border-border pt-4">
                  <span className="text-xs font-bold text-primary">
                    {stage.legalInsight.law}
                  </span>

                  <a
                    href={stage.legalInsight.source}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-sm font-bold text-primary underline underline-offset-4"
                  >
                    Read Official Law →
                  </a>
                </div>
              </div>

              {/* DECISION FEEDBACK */}
              <div className="flex gap-3 rounded-xl bg-muted/40 p-4">
                <AlertCircle
                  className="mt-0.5 shrink-0 text-primary"
                  size={20}
                />

                <div>
                  <p className="mb-1 text-sm font-bold">
                    LEARN FROM YOUR DECISION
                  </p>
                  <p className="text-sm leading-7 text-muted-foreground">
                    {selectedChoice.feedback}
                  </p>
                </div>
              </div>

              {/* CONTINUE */}
              <button
                onClick={onContinue}
                className="flex w-full items-center justify-center gap-2 rounded-xl bg-primary px-6 py-4 font-bold text-primary-foreground shadow-lg transition hover:-translate-y-0.5 hover:opacity-90"
              >
                Continue the Story
                <ArrowRight size={19} />
              </button>

            </div>
          )}

          {/* BEFORE SELECTION */}
          {!selectedChoice && (
            <div className="flex items-center gap-2 rounded-xl border border-dashed border-border p-3 text-xs text-muted-foreground">
              <Scale size={16} className="shrink-0 text-primary" />
              Select a response to discover its consequences and the law.
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
