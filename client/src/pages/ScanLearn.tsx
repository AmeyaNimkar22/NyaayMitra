import { useState } from "react";
import { motion } from "framer-motion";
import { ScanFace } from "lucide-react";
import AppLayout from "@/components/layout/AppLayout";
import ScanViewfinder from "@/components/scan-learn/ScanViewfinder";
import PlaceGuideCard from "@/components/scan-learn/PlaceGuideCard";
import PublicPlacesGrid from "@/components/scan-learn/PublicPlacesGrid";
import type { PlaceGuide } from "@/lib/scanLearnService";

export default function ScanLearn() {
  const [guide, setGuide] = useState<PlaceGuide | null>(null);

  return (
    <AppLayout title="Scan & Learn" breadcrumb="Home / Scan & Learn">
      <section className="w-full pb-12">
        <motion.div
          className="bg-card rounded-2xl p-5 md:p-8 shadow-sm border border-border"
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <div className="max-w-3xl mb-8">
            <div className="inline-flex items-center gap-1.5 text-primary mb-1">
              <ScanFace size={17} />
              <span className="text-xs font-semibold uppercase tracking-wider">
                Contextual Vision Recognition
              </span>
            </div>
            <h1 className="text-2xl font-medium text-foreground" style={{ fontFamily: "'Newsreader', serif" }}>
              Scan &amp; Learn
            </h1>
            <p className="text-sm sm:text-base text-muted-foreground mt-1">
              Point your camera at any public institution, civic establishment, or administrative
              desk to discover relevant information from our verified knowledge database.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            <div className="lg:col-span-5">
              <ScanViewfinder onResult={setGuide} />
            </div>

            <div className="lg:col-span-7">
              {guide ? (
                <PlaceGuideCard guide={guide} />
              ) : (
                <div className="h-full flex flex-col items-center justify-center text-center gap-2 bg-muted rounded-2xl p-10 text-muted-foreground">
                  <ScanFace size={28} className="text-primary/60" />
                  <p className="text-sm max-w-xs">
                    Once you take or upload a photo, your civic guidance for that place will
                    appear here.
                  </p>
                </div>
              )}
            </div>
          </div>
        </motion.div>
      </section>

      <PublicPlacesGrid />
    </AppLayout>
  );
}
