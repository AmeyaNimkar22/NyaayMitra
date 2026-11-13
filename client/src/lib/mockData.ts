import {
  Briefcase,
  GraduationCap,
  Landmark,
  Scale,
  Shield,
  ShoppingCart,
  Trophy,
} from "lucide-react";

// All of this is mock data (project spec section 20). Shapes are kept
// deliberately simple so they can be replaced by real API responses
// later without touching the components that consume them.

export const mockUserStats = {
  level: 4,
  levelTitle: "Civic Explorer",
  xp: 820,
  nextLevelXp: 1000,
  streak: 7,
  topicsCompleted: 12,
  quizAccuracy: 85,
};

export const learningProgress = [
  { topic: "Cyber Safety", icon: Shield, percent: 90 },
  { topic: "Consumer Rights", icon: ShoppingCart, percent: 70 },
  { topic: "Fundamental Rights", icon: Scale, percent: 65 },
  { topic: "Civic Responsibilities", icon: Landmark, percent: 60 },
  { topic: "Employment Rights", icon: Briefcase, percent: 40 },
];

export const continueLearningItem = {
  category: "Civic Knowledge",
  title: "Know Your Rights",
  description:
    "Learn how to identify suspicious messages, phishing attempts, and common digital scams.",
  percent: 60,
};

export const recommended = [
  {
    icon: Shield,
    category: "Cyber Safety",
    title: "Protect Yourself Online",
    difficulty: "Beginner",
  },
  {
    icon: Scale,
    category: "Civic Knowledge",
    title: "Know Your Fundamental Rights",
    difficulty: "Beginner",
  },
  {
    icon: ShoppingCart,
    category: "Consumer Rights",
    title: "Understanding Consumer Rights",
    difficulty: "Intermediate",
  },
];

export const recentActivity: {
  type: "quiz" | "badge";
  title: string;
  meta?: string;
  time: string;
}[] = [
  { type: "quiz", title: 'Completed "Cyber Safety Basics"', meta: "+100 XP", time: "Today" },
  { type: "quiz", title: "Completed Consumer Rights Quiz", meta: "+150 XP", time: "Yesterday" },
  { type: "badge", title: 'Earned "Rights Explorer" badge', time: "2 days ago" },
];

export const achievements = [
  { icon: Shield, label: "Cyber Safe", unlocked: true },
  { icon: Scale, label: "Rights Explorer", unlocked: true },
  { icon: GraduationCap, label: "Civic Starter", unlocked: true },
  { icon: Trophy, label: "Consumer Champion", unlocked: false },
];
