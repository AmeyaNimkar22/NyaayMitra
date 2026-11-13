import { useState } from "react";
import { motion } from "framer-motion";
import {
  ArrowRight,
  Award,
  BadgeCheck,
  Flame,
  Home,
  Landmark,
  ShieldCheck,
  ShoppingBag,
} from "lucide-react";
import type { LucideIcon } from "lucide-react";
import { cn } from "@/lib/utils";

const challenges: {
  icon: LucideIcon;
  tag: string;
  title: string;
  description: string;
  meta: string;
  xp: string;
}[] = [
  {
    icon: ShieldCheck,
    tag: "Most Popular",
    title: "Cyber Safety & Fraud",
    description:
      "Protect yourself and your family from online scams, OTP frauds, and unauthorized UPI debits.",
    meta: "5 questions · Easy",
    xp: "+50 XP",
  },
  {
    icon: ShoppingBag,
    tag: "Essential",
    title: "Consumer Rights",
    description: "Know your warranty remedies, dark pattern traps, and right to refund on defective goods.",
    meta: "5 questions · Quick Quiz",
    xp: "+60 XP",
  },
  {
    icon: Landmark,
    tag: "Core Civic",
    title: "Constitution Basics",
    description:
      "Master Article 19 freedoms, Article 21 right to life & privacy, and emergency constitutional remedies.",
    meta: "6 questions · Moderate",
    xp: "+75 XP",
  },
  {
    icon: Home,
    tag: "Practical",
    title: "Tenant & Housing Rights",
    description: "Learn eviction notice protections under Model Tenancy Act, deposit returns, and repair disputes.",
    meta: "4 questions · Quick Challenge",
    xp: "+45 XP",
  },
];

const options = [
  {
    id: "a",
    text: "The right to be protected against marketing of goods hazardous to life",
    correct: true,
  },
  { id: "b", text: "Mandatory waiver of all product dispute fees in private forums", correct: false },
  {
    id: "c",
    text: "Right to automatic police arrest of store managers for delayed deliveries",
    correct: false,
  },
  { id: "d", text: "Right to demand non-taxed cash transactions without digital invoices", correct: false },
];

function QuizPreview() {
  const [selected, setSelected] = useState<string | null>(null);
  const selectedOption = options.find((o) => o.id === selected);

  return (
    <div className="p-6 sm:p-8 rounded-2xl bg-background shadow-sm border border-border">
      <div className="flex items-center justify-between mb-3 text-xs text-muted-foreground">
        <span className="font-semibold text-foreground">Question 3 of 5</span>
        <span className="text-primary font-bold">+15 XP for Correct Answer</span>
      </div>
      <div className="w-full h-2 rounded-full bg-accent overflow-hidden mb-6">
        <div className="h-full bg-primary rounded-full" style={{ width: "60%" }} />
      </div>

      <h4 className="text-lg font-semibold text-foreground mb-6 leading-snug">
        Which of the following is an explicit right guaranteed under the Consumer Protection Act,
        2019?
      </h4>

      <div className="space-y-3 mb-6">
        {options.map((option) => {
          const isSelected = selected === option.id;
          const showAsCorrect = isSelected && option.correct;
          const showAsWrong = isSelected && !option.correct;
          return (
            <button
              key={option.id}
              type="button"
              onClick={() => setSelected(option.id)}
              className={cn(
                "w-full text-left p-4 rounded-xl border-2 flex items-start justify-between gap-3 transition-all text-sm",
                showAsCorrect && "bg-accent border-primary text-foreground",
                showAsWrong && "bg-destructive/10 border-destructive text-foreground",
                !isSelected && "bg-muted hover:bg-accent border-transparent text-muted-foreground"
              )}
            >
              <div className="flex items-start gap-3">
                <span
                  className={cn(
                    "w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold shrink-0 mt-0.5",
                    isSelected ? "bg-primary text-primary-foreground" : "bg-card text-muted-foreground"
                  )}
                >
                  {option.id.toUpperCase()}
                </span>
                <span className={isSelected ? "font-medium text-foreground" : ""}>{option.text}</span>
              </div>
              {showAsCorrect && <BadgeCheck size={22} className="text-primary shrink-0" />}
            </button>
          );
        })}
      </div>

      {selectedOption && (
        <div className="p-4 rounded-xl bg-muted border border-border/60 mb-6">
          <div className="flex items-start gap-2.5">
            <BadgeCheck size={20} className={cn("shrink-0 mt-0.5", selectedOption.correct ? "text-primary" : "text-destructive")} />
            <div>
              <strong className={cn("text-sm block mb-1", selectedOption.correct ? "text-primary" : "text-destructive")}>
                {selectedOption.correct
                  ? "Correct! Section 2(9) Consumer Protection Act, 2019"
                  : "Not quite — try another option"}
              </strong>
              <p className="text-sm text-muted-foreground leading-relaxed">
                Section 2(9) of the Consumer Protection Act explicitly guarantees protection
                against hazardous products, the right to be informed about quality, quantity, and
                standard, and the statutory right to seek redressal against unfair trade practices.
              </p>
            </div>
          </div>
        </div>
      )}

      <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-2 border-t border-border/60">
        <a href="#civic-games" className="inline-flex items-center gap-2 text-sm text-primary font-semibold hover:underline">
          View Full Quiz Platform
          <ArrowRight size={15} />
        </a>
        <button
          type="button"
          disabled={!selected}
          className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-2.5 rounded-xl bg-primary text-primary-foreground text-sm font-semibold hover:bg-[#c94b0c] transition-colors shadow-sm disabled:opacity-40 disabled:pointer-events-none"
        >
          Next Question
          <ArrowRight size={15} />
        </button>
      </div>
    </div>
  );
}

export default function GamifiedLearningSection() {
  return (
    <section id="civic-games" className="w-full py-20 bg-muted scroll-mt-20">
      <div className="max-w-[1200px] mx-auto px-4 lg:px-10">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
          <div>
            <span className="text-xs font-semibold uppercase tracking-wider text-primary">
              Citizen Civic Challenges
            </span>
            <h2
              className="text-3xl sm:text-4xl text-foreground mt-2 mb-3 font-medium"
              style={{ fontFamily: "'Newsreader', serif" }}
            >
              Learn. Play. Know Your Rights.
            </h2>
            <p className="text-muted-foreground max-w-2xl leading-relaxed">
              Test what you know with quick challenges about your rights and everyday law. Build
              your civic confidence one question at a time.
            </p>
          </div>

          <div className="flex items-center gap-3 bg-card px-4 py-2.5 rounded-2xl shadow-sm shrink-0 border border-border">
            <div className="w-10 h-10 rounded-xl bg-accent flex items-center justify-center text-primary">
              <Award size={22} />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-sm font-bold text-foreground leading-tight">Level 4: Civic Explorer</span>
                <span className="px-2 py-0.5 rounded-full bg-secondary text-secondary-foreground text-[11px] font-semibold flex items-center gap-1">
                  <Flame size={11} /> 7-Day Streak
                </span>
              </div>
              <span className="text-xs text-muted-foreground">820 XP · 180 XP to Level 5 (Civic Guardian)</span>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-14">
          {challenges.map((c, i) => (
            <motion.div
              key={c.title}
              className="flex flex-col p-6 rounded-2xl bg-card hover:bg-accent transition-all group shadow-sm hover:shadow-md border border-transparent hover:border-primary/20"
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.45, delay: i * 0.07 }}
            >
              <div className="flex items-center justify-between mb-4">
                <div className="w-12 h-12 rounded-xl bg-accent flex items-center justify-center text-primary group-hover:scale-105 transition-transform">
                  <c.icon size={24} strokeWidth={1.8} />
                </div>
                <span
                  className={cn(
                    "inline-flex items-center px-2.5 py-0.5 rounded-full text-[11px] font-semibold",
                    i === 0 ? "bg-primary/10 text-primary font-bold" : "bg-muted text-secondary-foreground"
                  )}
                >
                  {c.tag}
                </span>
              </div>
              <h3 className="text-base font-semibold text-foreground mb-2">{c.title}</h3>
              <p className="text-xs text-muted-foreground leading-relaxed mb-4 flex-1">{c.description}</p>
              <div className="flex items-center justify-between text-xs text-muted-foreground pt-3 border-t border-border/60 mb-4">
                <span>{c.meta}</span>
                <span className="text-primary font-semibold">{c.xp}</span>
              </div>
              <a
                href="#civic-games"
                className="w-full inline-flex items-center justify-center gap-1.5 py-2.5 px-4 rounded-xl bg-primary text-primary-foreground text-sm font-semibold hover:bg-[#c94b0c] transition-colors shadow-sm"
              >
                Start Challenge
                <ArrowRight size={15} />
              </a>
            </motion.div>
          ))}
        </div>

        <motion.div
          className="p-6 sm:p-10 rounded-3xl bg-card shadow-md border border-border"
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.5 }}
        >
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            <div className="lg:col-span-4 flex flex-col justify-between h-full">
              <div>
                <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-accent text-primary text-xs font-semibold uppercase tracking-wider mb-4">
                  <Award size={15} /> Interactive Civic Check
                </div>
                <h3
                  className="text-xl font-semibold text-foreground mb-3"
                  style={{ fontFamily: "'Newsreader', serif" }}
                >
                  Live Experience Preview
                </h3>
                <p className="text-muted-foreground leading-relaxed mb-6">
                  Experience our dignified, scenario-driven challenges. Each question is grounded
                  in official legislation so you learn your actionable rights.
                </p>
              </div>
              <div className="p-4 rounded-2xl bg-muted space-y-3">
                <div className="flex items-center justify-between text-xs text-muted-foreground">
                  <span>Current Topic</span>
                  <span className="font-semibold text-foreground">Consumer Protection Act, 2019</span>
                </div>
                <div className="flex items-center justify-between text-xs text-muted-foreground">
                  <span>Difficulty</span>
                  <span className="font-semibold text-foreground">Everyday Citizen (Practical)</span>
                </div>
                <div className="flex items-center justify-between text-xs text-muted-foreground">
                  <span>Pass Mark</span>
                  <span className="font-semibold text-foreground">80% for Certified Badge</span>
                </div>
              </div>
            </div>

            <div className="lg:col-span-8">
              <QuizPreview />
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
