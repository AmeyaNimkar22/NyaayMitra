import LandingNavbar from "@/components/landing/LandingNavbar";
import HeroSection from "@/components/landing/HeroSection";
import QuickActionsSection from "@/components/landing/QuickActionsSection";
import HowItWorksSection from "@/components/landing/HowItWorksSection";
import AdvisorPreviewSection from "@/components/landing/AdvisorPreviewSection";
import KnowYourRightsSection from "@/components/landing/KnowYourRightsSection";
import LearningSection from "@/components/landing/LearningSection";
import GamifiedLearningSection from "@/components/landing/GamifiedLearningSection";
import TrustSourcesSection from "@/components/landing/TrustSourcesSection";
import LandingFooter from "@/components/landing/LandingFooter";

export default function Landing() {
  return (
    <div className="w-full bg-background">
      <LandingNavbar />
      <main className="w-full">
        <HeroSection />
        <QuickActionsSection />
        <HowItWorksSection />
        <AdvisorPreviewSection />
        <KnowYourRightsSection />
        <LearningSection />
        <GamifiedLearningSection />
        <TrustSourcesSection />
      </main>
      <LandingFooter />
    </div>
  );
}
