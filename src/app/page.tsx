"use client";

import { useEffect } from "react";
import { useFastingStore } from "@/stores/fasting-store";
import { FastingTimer } from "@/components/fasting/fasting-timer";
import { StartFast } from "@/components/fasting/start-fast";
import { HydrationTracker } from "@/components/fasting/hydration-tracker";

export default function Home() {
  const { isRunning, init } = useFastingStore();

  useEffect(() => {
    init();
  }, [init]);

  return (
    <div className="flex flex-col items-center gap-8 w-full bg-obsidian-gradient min-h-[calc(100vh-6rem)]">
      {/* Premium header */}
      <div className="text-center pt-2">
        <h1 className="text-2xl font-extralight tracking-ultra-wide text-white/90 glow-text">
          WATER FASTING
        </h1>
        <div className="mt-1.5 h-px w-16 mx-auto bg-gradient-to-r from-transparent via-electric/40 to-transparent" />
      </div>

      {isRunning ? <FastingTimer /> : <StartFast />}

      <HydrationTracker />
    </div>
  );
}
