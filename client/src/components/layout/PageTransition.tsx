import { motion } from "framer-motion";
import { useLocation } from "wouter";
import type { ReactNode } from "react";

/**
 * Wraps page content in a subtle fade + upward-move entrance.
 * Keyed by the current route so it replays whenever the user
 * navigates between authenticated pages (Home -> Advisor -> Learn...).
 */
export default function PageTransition({ children }: { children: ReactNode }) {
  const [location] = useLocation();

  return (
    <motion.div
      key={location}
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.35, ease: [0.23, 1, 0.32, 1] }}
    >
      {children}
    </motion.div>
  );
}
