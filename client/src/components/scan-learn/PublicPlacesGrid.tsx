import { motion } from "framer-motion";
import {
  Landmark,
  Siren,
  HeartPulse,
  Bus,
  Banknote,
  Store,
  School,
  TrafficCone,
} from "lucide-react";
import type { LucideIcon } from "lucide-react";
import { publicPlaceCategories } from "@/lib/scanLearnService";

const ICONS: Record<string, LucideIcon> = {
  "govt-office": Landmark,
  "police-station": Siren,
  hospital: HeartPulse,
  transport: Bus,
  bank: Banknote,
  "service-center": Store,
  school: School,
  traffic: TrafficCone,
};

export default function PublicPlacesGrid() {
  return (
    <section className="w-full">
      <div className="flex flex-col md:flex-row md:items-end justify-between mb-6 gap-2">
        <div className="flex flex-col gap-1">
          <span className="text-xs font-semibold text-primary uppercase tracking-widest">
            Comprehensive Recognition
          </span>
          <h2 className="text-2xl font-medium text-foreground" style={{ fontFamily: "'Newsreader', serif" }}>
            Public places you can scan
          </h2>
        </div>
        <p className="text-sm text-muted-foreground max-w-md">
          NyaayMitra translates institutional signboards, building facades, and citizen counters
          into actionable civic rights.
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {publicPlaceCategories.map((place, i) => {
          const Icon = ICONS[place.key] ?? Landmark;
          return (
            <motion.div
              key={place.key}
              className="group p-4 rounded-2xl bg-card hover:bg-muted transition-all duration-200 shadow-sm flex flex-col justify-between min-h-[160px] border border-border/60"
              initial={{ opacity: 0, y: 14 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.4, delay: (i % 4) * 0.06 }}
            >
              <div className="flex items-center justify-between">
                <div className="w-10 h-10 rounded-xl bg-accent flex items-center justify-center text-primary group-hover:scale-105 transition-transform">
                  <Icon size={20} />
                </div>
                <span className="text-[11px] text-muted-foreground">{place.tag}</span>
              </div>
              <div className="flex flex-col mt-3">
                <span className="text-sm font-semibold text-foreground">{place.title}</span>
                <span className="text-xs text-muted-foreground mt-1">{place.description}</span>
              </div>
            </motion.div>
          );
        })}
      </div>
    </section>
  );
}
