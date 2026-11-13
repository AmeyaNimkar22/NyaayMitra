
import type { ComponentType } from "react";
import {
  CivicChallengeIllustration,
  KnowYourRightsIllustration,
  LawOrMythIllustration,
  QuickQuizIllustration,
  WhatWouldYouDoIllustration,
} from "@/components/games/illustrations";

export interface QuizOption {
  id: "A" | "B" | "C" | "D";
  text: string;
  correct: boolean;
  feedback: string;
}

export interface QuizQuestion {
  prompt: string;
  options: QuizOption[];
}

export interface Game {
  id: string;
  title: string;
  description: string;
  questionCount: number;
  Illustration: ComponentType;
}

export const games: Game[] = [
  {
    id: "nyaaydarshan",
    title: "NyaayDarshan",
    description:
      "Explore a virtual Indian courtroom, discover who sits where, and understand what happens during a hearing.",
    questionCount: 6,
    Illustration: CivicChallengeIllustration,
  },
  {
    id: "myth-or-fact",
    title: "Myth or Fact?",
    description:
      "Bust common legal misconceptions through rapid-fire true or false questions with verified explanations.",
    questionCount: 5,
    Illustration: LawOrMythIllustration,
  },
  {
    id: "courtroom-simulator",
    title: "Courtroom Simulator",
    description:
      "Step into the shoes of a judge, lawyer, or witness and make decisions as a mock case unfolds.",
    questionCount: 5,
    Illustration: WhatWouldYouDoIllustration,
  },
  {
    id: "detained-questioned-arrested",
    title: "Detained, Questioned or Arrested?",
    description:
      "Understand the difference between detention, questioning, and arrest, and discover the rights that apply to each.",
    questionCount: 4,
    Illustration: KnowYourRightsIllustration,
  },
  {
    id: "law-quiz",
    title: "Law Quiz",
    description:
      "Challenge yourself with a timed quiz covering everyday legal awareness, fundamental rights, and important laws.",
    questionCount: 5,
    Illustration: QuickQuizIllustration,
  },
];

/**
 * TEMPORARY MOCK QUIZ CONTENT
 *
 * This is the existing shared question bank.
 * It is not yet the final question bank for the five games.
 *
 * Each game will eventually have its own questions and
 * gameplay logic.
 */

export const sampleQuestions: QuizQuestion[] = [
  {
    prompt:
      "You are stopped by a police officer. Which of the following is a basic right of a citizen?",
    options: [
      {
        id: "A",
        text: "You have the right to know the reason or legal grounds for being stopped.",
        correct: true,
        feedback:
          "Correct. Citizens have rights regarding the grounds of police action and applicable legal procedures.",
      },
      {
        id: "B",
        text: "You must immediately hand over your unlocked phone without inquiry.",
        correct: false,
        feedback:
          "Incorrect. Personal devices and digital data are protected by the right to privacy, subject to applicable law.",
      },
      {
        id: "C",
        text: "You have no right to question an officer's uniform credentials.",
        correct: false,
        feedback:
          "Incorrect. You can ask an officer to identify themselves.",
      },
      {
        id: "D",
        text: "You cannot inform a family member or legal representative.",
        correct: false,
        feedback:
          "Incorrect. Arrested persons have important rights concerning communication with relatives and access to legal assistance.",
      },
    ],
  },
  {
    prompt:
      "Your landlord wants you to vacate the flat. What is generally required first?",
    options: [
      {
        id: "A",
        text: "A verbal request is enough — you must leave immediately.",
        correct: false,
        feedback:
          "Incorrect. Eviction must follow the applicable tenancy law and due process.",
      },
      {
        id: "B",
        text: "A proper written notice, following applicable legal requirements.",
        correct: true,
        feedback:
          "Correct. Notice and eviction requirements depend on the applicable tenancy law and agreement.",
      },
      {
        id: "C",
        text: "The landlord can change the locks while you're out.",
        correct: false,
        feedback:
          "Incorrect. A landlord cannot simply bypass lawful eviction procedures.",
      },
      {
        id: "D",
        text: "Nothing — landlords can evict tenants at will.",
        correct: false,
        feedback:
          "Incorrect. Tenants have legal protections against unlawful eviction.",
      },
    ],
  },
  {
    prompt:
      "Which number should you call to report cyber financial fraud in India?",
    options: [
      {
        id: "A",
        text: "100",
        correct: false,
        feedback:
          "Incorrect. This is associated with the general police emergency helpline.",
      },
      {
        id: "B",
        text: "1930",
        correct: true,
        feedback:
          "Correct. 1930 is India's helpline for reporting financial cyber fraud.",
      },
      {
        id: "C",
        text: "108",
        correct: false,
        feedback:
          "Incorrect. This is an ambulance emergency number.",
      },
      {
        id: "D",
        text: "1800",
        correct: false,
        feedback:
          "Incorrect. This is not the dedicated national cyber financial fraud helpline.",
      },
    ],
  },
];
