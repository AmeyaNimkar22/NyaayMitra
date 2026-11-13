import AppLayout from "@/components/layout/AppLayout";
import WelcomeSection from "@/components/home/WelcomeSection";
import FeatureGrid from "@/components/home/FeatureGrid";
import ProgressSection from "@/components/home/ProgressSection";
import TopicChips from "@/components/home/TopicChips";
import ContinueLearningCard from "@/components/home/ContinueLearningCard";
import LearningModesSection from "@/components/home/LearningModesSection";

export default function Home() {
  return (
    <AppLayout title="Home" breadcrumb="Home">
      <WelcomeSection />
      <FeatureGrid />
      {/* "Your Progress" must sit immediately below the 3 feature cards */}
      <ProgressSection />
      <TopicChips />
      <ContinueLearningCard />
      <LearningModesSection />
    </AppLayout>
  );
}
