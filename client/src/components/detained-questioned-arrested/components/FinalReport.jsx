
import {
  Trophy,
  CheckCircle2,
  AlertTriangle,
  XCircle,
  Scale,
  BookOpen,
  RotateCcw,
  ArrowLeft,
  ShieldCheck
} from "lucide-react";

const evaluations = {
  0: {
    A: {
      status: "good",
      label: "Good decision",
      reason:
        "Asking whether you are free to leave or being detained is a sensible way to clarify your position. It avoids assuming that every police interaction is an arrest.",
      better:
        "Continue to remain calm and ask the officer to explain the reason for the interaction. Remember that this question does not, by itself, determine whether a police direction is lawful.",
    },
    B: {
      status: "risky",
      label: "Risky decision",
      reason:
        "Walking away without first understanding the situation may create difficulty if the police are exercising a lawful power. The legal position depends on the circumstances.",
      better:
        "Politely ask why you are being stopped and whether you are free to leave. Do not physically resist a lawful direction.",
    },
    C: {
      status: "caution",
      label: "Needs clarification",
      reason:
        "Being approached or questioned does not automatically mean you have been arrested. Assuming that you are under arrest can cause unnecessary confusion.",
      better:
        "Ask clearly whether you are under arrest or whether the officer only wants to speak with you. If arrested, ask for the grounds.",
    }
  },

  1: {
    A: {
      status: "good",
      label: "Good decision",
      reason:
        "You correctly distinguished a voluntary request from a formal legal requirement. Not every request to visit a police station means that you are under arrest.",
      better:
        "Ask whether you are being requested to attend voluntarily or whether the police are requiring your attendance under a specific legal provision.",
    },
    B: {
      status: "good",
      label: "Good decision",
      reason:
        "Section 179 of the BNSS provides for an investigating police officer to require certain persons acquainted with the facts of a case to attend through an order in writing, subject to the section's conditions and exceptions.",
      better:
        "Ask what legal provision is being used and read the written order carefully. Section 179 also contains protections for specified categories of persons.",
    },
    C: {
      status: "risky",
      label: "Risky decision",
      reason:
        "A blanket refusal may be inappropriate if the police have lawfully required your attendance as a witness. Innocence alone does not cancel every lawful investigative requirement.",
      better:
        "First clarify whether the request is voluntary or a lawful written requirement. If you receive a notice or order, understand its legal basis and seek legal advice if necessary.",
    }
  },

  2: {
    A: {
      status: "good",
      label: "Good decision",
      reason:
        "Answering truthfully based on what you actually know is appropriate. You should not guess, invent facts or claim to remember something you do not remember.",
      better:
        "Give truthful answers based on your personal knowledge. Clearly say when you do not know or cannot remember. Remember the protection in Section 180(2) of the BNSS.",
    },
    B: {
      status: "incorrect",
      label: "Incorrect decision",
      reason:
        "Making up an answer can mislead an investigation and create serious legal complications. You should never invent facts simply to end questioning.",
      better:
        "Answer truthfully. If you do not know an answer, say so. If a question may expose you to a criminal charge, penalty or forfeiture, understand the protection under Section 180(2) of the BNSS.",
    },
    C: {
      status: "good",
      label: "Good decision",
      reason:
        "You recognised that there are legal protections against compelled self-incrimination. Section 180(2) of the BNSS protects a person examined by police from being required to answer certain self-incriminating questions. Article 20(3) separately protects an accused person from compelled self-incrimination.",
      better:
        "Continue to distinguish between the protection under Section 180(2) and the constitutional protection under Article 20(3). If you are unsure about your position, seek legal advice.",
    }
  },

  3: {
    A: {
      status: "good",
      label: "Good decision",
      reason:
        "You asked for the grounds of arrest and requested access to a lawyer. Article 22(1) of the Constitution protects an arrested person’s right to be informed of the grounds of arrest and to consult and be defended by a lawyer of their choice.",
      better:
        "Stay calm, ask for the grounds of arrest, request legal assistance and inform someone you trust where appropriate.",
    },
    B: {
      status: "incorrect",
      label: "Incorrect decision",
      reason:
        "Police cannot ordinarily keep an arrested person in custody at the station indefinitely without following the law. Article 22(2) generally requires an arrested and detained person to be produced before the nearest magistrate within 24 hours, excluding necessary journey time.",
      better:
        "Ask to be informed of the grounds of arrest, seek legal assistance and remember the constitutional requirement of production before a magistrate.",
    },
    C: {
      status: "risky",
      label: "Risky decision",
      reason:
        "Signing a document without reading or understanding it can create serious problems. You should not sign blank documents or documents whose contents you do not understand.",
      better:
        "Read the document carefully, ask for an explanation and seek legal advice where necessary. Do not sign a blank or unexplained document.",
    }
  }
};

const statusStyles = {
  good: {
    icon: CheckCircle2,
    color: "text-green-600",
    background: "bg-green-500/10",
    border: "border-green-500/30"
  },
  risky: {
    icon: AlertTriangle,
    color: "text-amber-600",
    background: "bg-amber-500/10",
    border: "border-amber-500/30"
  },
  caution: {
    icon: AlertTriangle,
    color: "text-amber-600",
    background: "bg-amber-500/10",
    border: "border-amber-500/30"
  },
  incorrect: {
    icon: XCircle,
    color: "text-red-600",
    background: "bg-red-500/10",
    border: "border-red-500/30"
  }
};

export default function FinalReport({
  decisionHistory,
  stages,
  onRestart,
  onExit
}) {
  const report = stages.map((stage, index) => {
    const decision = decisionHistory.find(
      (item) => item.stageIndex === index
    );

    const choice = stage.choices.find(
      (item) => item.id === decision?.choiceId
    );

    const evaluation =
      evaluations[index]?.[decision?.choiceId] || {
        status: "caution",
        label: "Review this decision",
        reason: "This decision needs to be reviewed against the applicable legal provisions.",
        better: "Seek clarification and understand the relevant legal safeguards."
      };

    return {
      stage,
      choice,
      evaluation,
      index
    };
  });

  const goodCount = report.filter(
    (item) => item.evaluation.status === "good"
  ).length;

  const riskyCount = report.filter(
    (item) =>
      item.evaluation.status === "risky" ||
      item.evaluation.status === "caution"
  ).length;

  const incorrectCount = report.filter(
    (item) => item.evaluation.status === "incorrect"
  ).length;

  const allGood = goodCount === stages.length;

  return (
    <div className="min-h-screen bg-background px-3 py-6 text-foreground sm:px-6 sm:py-10">
      <div className="mx-auto w-full max-w-4xl space-y-6">

        {/* REPORT HEADER */}
        <div className="rounded-2xl border border-border bg-card p-6 text-center shadow-sm sm:p-8">
          <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-2xl bg-primary/10 text-primary">
            <Trophy size={32} />
          </div>

          <p className="text-xs font-bold tracking-[0.2em] text-primary">
            YOUR FINAL DECISION REPORT
          </p>

          <h1 className="mt-3 text-2xl font-extrabold sm:text-3xl">
            {allGood ? "Excellent Decision-Making!" : "Your Encounter Review"}
          </h1>

          <p className="mx-auto mt-3 max-w-2xl text-sm leading-7 text-muted-foreground">
            You have completed all four stages. Here is a detailed review
            of your choices, the legal reasoning behind them and what you
            should remember in a real-life situation.
          </p>

          <div className="mt-6 grid grid-cols-3 gap-2 sm:gap-4">
            <div className="rounded-xl bg-green-500/10 p-3">
              <p className="text-2xl font-extrabold text-green-600">
                {goodCount}
              </p>
              <p className="mt-1 text-[10px] font-bold sm:text-xs">
                GOOD DECISIONS
              </p>
            </div>

            <div className="rounded-xl bg-amber-500/10 p-3">
              <p className="text-2xl font-extrabold text-amber-600">
                {riskyCount}
              </p>
              <p className="mt-1 text-[10px] font-bold sm:text-xs">
                NEED CAUTION
              </p>
            </div>

            <div className="rounded-xl bg-red-500/10 p-3">
              <p className="text-2xl font-extrabold text-red-600">
                {incorrectCount}
              </p>
              <p className="mt-1 text-[10px] font-bold sm:text-xs">
                INCORRECT
              </p>
            </div>
          </div>

          <p className="mt-4 text-xs text-muted-foreground">
            These categories are educational feedback, not a legal assessment
            of your conduct in a real police encounter.
          </p>
        </div>

        {/* DECISION-BY-DECISION REVIEW */}
        <div className="space-y-4">
          <div>
            <p className="text-xs font-bold tracking-widest text-primary">
              DECISION BREAKDOWN
            </p>
            <h2 className="mt-1 text-xl font-extrabold">
              Review Your Choices
            </h2>
          </div>

          {report.map((item) => {
            const { stage, choice, evaluation, index } = item;
            const style = statusStyles[evaluation.status];
            const StatusIcon = style.icon;

            if (!choice) return null;

            return (
              <div
                key={index}
                className="overflow-hidden rounded-2xl border border-border bg-card"
              >
                {/* STAGE HEADING */}
                <div className="flex flex-wrap items-center justify-between gap-3 border-b border-border p-4 sm:p-5">
                  <div>
                    <p className="text-xs font-bold tracking-widest text-primary">
                      STAGE {index + 1}
                    </p>
                    <h3 className="mt-1 text-lg font-extrabold">
                      {stage.title}
                    </h3>
                    <p className="mt-1 text-xs text-muted-foreground">
                      {stage.location}
                    </p>
                  </div>

                  <span
                    className={`flex items-center gap-2 rounded-full border px-3 py-2 text-xs font-bold ${style.color} ${style.background} ${style.border}`}
                  >
                    <StatusIcon size={15} />
                    {evaluation.label}
                  </span>
                </div>

                <div className="space-y-4 p-4 sm:p-5">

                  {/* PLAYER CHOICE */}
                  <div className="rounded-xl bg-muted/40 p-4">
                    <p className="mb-2 text-xs font-bold tracking-widest text-muted-foreground">
                      YOUR CHOICE
                    </p>
                    <p className="text-sm font-semibold leading-6">
                      {choice.text}
                    </p>
                  </div>

                  {/* WHY */}
                  <div>
                    <p className="mb-2 flex items-center gap-2 text-sm font-bold">
                      <Scale size={17} className="text-primary" />
                      WHY THIS DECISION?
                    </p>
                    <p className="text-sm leading-7 text-muted-foreground">
                      {evaluation.reason}
                    </p>
                  </div>

                  {/* CONSEQUENCE */}
                  <div>
                    <p className="mb-2 flex items-center gap-2 text-sm font-bold">
                      <AlertTriangle size={17} className="text-primary" />
                      WHAT HAPPENED?
                    </p>
                    <p className="text-sm leading-7 text-muted-foreground">
                      {choice.response}
                    </p>
                  </div>

                  {/* BETTER RESPONSE */}
                  <div className="rounded-xl border border-primary/30 bg-primary/5 p-4">
                    <p className="mb-2 flex items-center gap-2 text-sm font-bold text-primary">
                      <ShieldCheck size={17} />
                      WHAT COULD YOU DO?
                    </p>
                    <p className="text-sm leading-7 text-muted-foreground">
                      {evaluation.better}
                    </p>
                  </div>

                  {/* LEGAL PROVISION */}
                  <div className="border-t border-border pt-4">
                    <p className="mb-2 flex items-center gap-2 text-sm font-bold">
                      <BookOpen size={17} className="text-primary" />
                      RELEVANT LAW
                    </p>

                    <p className="text-sm font-semibold">
                      {stage.legalInsight.law}
                    </p>

                    <p className="mt-2 text-sm leading-7 text-muted-foreground">
                      {stage.legalInsight.explanation}
                    </p>

                    <a
                      href={stage.legalInsight.source}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="mt-3 inline-flex text-sm font-bold text-primary underline underline-offset-4"
                    >
                      Read Official Law →
                    </a>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* KEY TAKEAWAYS */}
        <div className="rounded-2xl border border-primary/30 bg-primary/5 p-5 sm:p-6">
          <div className="mb-4 flex items-center gap-2">
            <ShieldCheck className="text-primary" size={22} />
            <h2 className="text-lg font-extrabold">
              What You Should Remember
            </h2>
          </div>

          <div className="space-y-3 text-sm leading-7 text-muted-foreground">
            <p>
              <strong className="text-foreground">1. A police interaction is not automatically an arrest.</strong>
              {" "}Understand whether you are being questioned, required to attend or formally arrested.
            </p>

            <p>
              <strong className="text-foreground">2. Understand attendance requirements.</strong>
              {" "}A lawful written requirement to attend as a witness is different from a voluntary request.
            </p>

            <p>
              <strong className="text-foreground">3. Do not invent answers.</strong>
              {" "}Answer truthfully, while understanding the legal protection against compelled self-incrimination.
            </p>

            <p>
              <strong className="text-foreground">4. Know your rights after arrest.</strong>
              {" "}You have important safeguards relating to the grounds of arrest, legal representation and production before a magistrate.
            </p>
          </div>
        </div>

        {/* LEGAL DISCLAIMER */}
        <div className="rounded-xl border border-border bg-card p-4">
          <p className="text-xs leading-6 text-muted-foreground">
            <strong className="text-foreground">Educational disclaimer:</strong>
            {" "}This simulation is intended for legal awareness and general education. Actual police powers, procedures and individual rights depend on the facts and applicable law. It is not a substitute for advice from a qualified lawyer.
          </p>
        </div>

        {/* ACTIONS */}
        <div className="grid gap-3 sm:grid-cols-2">
          <button
            onClick={onRestart}
            className="flex items-center justify-center gap-2 rounded-xl bg-primary px-5 py-4 font-bold text-primary-foreground transition hover:opacity-90"
          >
            <RotateCcw size={18} />
            Play Again
          </button>

          <button
            onClick={onExit}
            className="flex items-center justify-center gap-2 rounded-xl border border-border px-5 py-4 font-semibold transition hover:bg-muted"
          >
            <ArrowLeft size={18} />
            Back to Games
          </button>
        </div>

      </div>
    </div>
  );
}
