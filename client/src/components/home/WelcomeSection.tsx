import { motion } from "framer-motion";
import { useAuth } from "@/contexts/AuthContext";

function getGreeting() {
  const hour = new Date().getHours();
  if (hour < 12) return "Good morning";
  if (hour < 17) return "Good afternoon";
  return "Good evening";
}

export default function WelcomeSection() {
  const { user } = useAuth();

  return (
    <motion.section
      className="mb-8"
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-accent border border-border text-primary text-[11px] font-bold uppercase tracking-wider mb-2.5">
        <span className="w-1.5 h-1.5 rounded-full bg-primary" />
        Citizen Home
      </div>
      <h1
        className="text-3xl sm:text-4xl lg:text-[40px] font-normal text-foreground tracking-tight leading-tight"
        style={{ fontFamily: "'Newsreader', serif" }}
      >
        {getGreeting()}, {user?.name ?? "there"}{" "}
        <span className="inline-block hover:rotate-12 transition-transform duration-200">👋</span>
      </h1>
      <p className="text-base sm:text-lg text-muted-foreground mt-1">
        What would you like to do today?
      </p>
    </motion.section>
  );
}
