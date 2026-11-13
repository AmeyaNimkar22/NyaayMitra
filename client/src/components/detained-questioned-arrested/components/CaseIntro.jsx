
import { ShieldAlert, FileText, MapPin, Clock, ArrowRight } from "lucide-react";

export default function CaseIntro({ onStart }) {
  return (
    <div className="min-h-[75vh] flex items-center justify-center p-4">
      <div className="w-full max-w-3xl overflow-hidden rounded-2xl border border-border bg-card shadow-xl">

        {/* Case Header */}
        <div className="flex items-center justify-between border-b border-border bg-muted/50 px-6 py-4">
          <div className="flex items-center gap-2">
            <FileText className="text-primary" size={20} />
            <span className="text-sm font-bold tracking-widest">
              NYAAYMITRA / CASE FILE
            </span>
          </div>

          <span className="rounded-full border border-red-500/30 bg-red-500/10 px-3 py-1 text-xs font-bold text-red-500">
            CLASSIFIED
          </span>
        </div>

        {/* Main Content */}
        <div className="p-6 sm:p-10">

          <div className="mb-6 flex items-center gap-3">
            <div className="rounded-xl bg-primary/10 p-3">
              <ShieldAlert className="text-primary" size={30} />
            </div>

            <div>
              <p className="text-xs font-semibold tracking-widest text-muted-foreground">
                INVESTIGATION SIMULATION
              </p>
             
            </div>
          </div>

          <h1 className="mb-3 text-3xl font-extrabold sm:text-4xl">
            Detained, Questioned or Arrested?
          </h1>

          <p className="mb-8 text-base leading-relaxed text-muted-foreground">
            One ordinary evening. One unexpected encounter with the police.
            Do you know what your rights are when an officer stops you?
          </p>

          {/* Case Details */}
          <div className="mb-8 grid gap-3 sm:grid-cols-3">

            <div className="rounded-xl border border-border bg-muted/30 p-4">
              <MapPin size={18} className="mb-2 text-primary" />
              <p className="text-xs text-muted-foreground">LOCATION</p>
              <p className="font-semibold">City Street</p>
            </div>

            <div className="rounded-xl border border-border bg-muted/30 p-4">
              <Clock size={18} className="mb-2 text-primary" />
              <p className="text-xs text-muted-foreground">TIME</p>
              <p className="font-semibold">8:45 PM</p>
            </div>

            <div className="rounded-xl border border-border bg-muted/30 p-4">
              <ShieldAlert size={18} className="mb-2 text-primary" />
              <p className="text-xs text-muted-foreground">YOUR ROLE</p>
              <p className="font-semibold">The Citizen</p>
            </div>

          </div>

          {/* Mission */}
          <div className="mb-8 rounded-xl border-l-4 border-primary bg-primary/5 p-5">
            <p className="mb-2 text-sm font-bold">YOUR MISSION</p>
            <p className="text-sm leading-relaxed text-muted-foreground">
              Navigate a police encounter, make decisions, understand the
              consequences and discover the legal rights available to you
              under Indian law.
            </p>
          </div>

          {/* Start */}
          <button
            onClick={onStart}
            className="flex w-full items-center justify-center gap-3 rounded-xl bg-primary px-6 py-4 font-bold text-primary-foreground transition hover:opacity-90"
          >
            Enter the Case
            <ArrowRight size={20} />
          </button>

          <p className="mt-4 text-center text-xs text-muted-foreground">
            Make your decisions carefully. Every choice matters.
          </p>

        </div>
      </div>
    </div>
  );
}
