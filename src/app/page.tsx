"use client";

import { useEffect } from "react";
import { useFastingStore } from "@/stores/fasting-store";
import { FastingTimer } from "@/components/fasting/fasting-timer";
import { PresetSelector } from "@/components/fasting/preset-selector";
import { HydrationTracker } from "@/components/fasting/hydration-tracker";

export default function Home() {
  const { isRunning, init } = useFastingStore();

  useEffect(() => {
    init();
  }, [init]);

  return (
    <div className="flex flex-col items-center gap-6 w-full">
      <h1 className="text-2xl font-bold text-sky-400">Water Fasting</h1>

      {isRunning ? <FastingTimer /> : <PresetSelector />}

      <HydrationTracker />
    </div>
  );
}
