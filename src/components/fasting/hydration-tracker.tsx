"use client";

import { useState, useEffect } from "react";
import { WATER_GOAL_ML, WATER_GLASS_ML } from "@/constants/fasting";
import { db } from "@/lib/db";

export function HydrationTracker() {
  const [todayMl, setTodayMl] = useState(0);
  const progress = Math.min((todayMl / WATER_GOAL_ML) * 100, 100);
  const glasses = Math.floor(todayMl / WATER_GLASS_ML);

  useEffect(() => {
    loadTodayHydration();
  }, []);

  /* Load today's water intake from IndexedDB */
  async function loadTodayHydration() {
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const entries = await db.hydration
      .where("timestamp")
      .aboveOrEqual(today)
      .toArray();
    const total = entries.reduce((sum, e) => sum + e.amountMl, 0);
    setTodayMl(total);
  }

  /* Record water intake */
  async function addWater(ml: number) {
    await db.hydration.add({
      sessionId: null,
      timestamp: new Date(),
      amountMl: ml,
    });
    setTodayMl((prev) => prev + ml);
  }

  return (
    <div className="w-full glass-card rounded-2xl p-5">
      {/* Header */}
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-sm font-light tracking-wider uppercase text-electric/80">
          Su Takibi
        </h3>
        <span className="text-[11px] font-light tracking-wide text-slate-text">
          {todayMl}ml / {WATER_GOAL_ML}ml
        </span>
      </div>

      {/* Progress bar with glow */}
      <div className="w-full h-1.5 bg-obsidian-border rounded-full overflow-hidden mb-4">
        <div
          className="h-full rounded-full transition-all duration-500"
          style={{
            width: `${progress}%`,
            background: "linear-gradient(90deg, #0070cc, #00a0ff)",
            boxShadow: "0 0 12px rgba(0, 160, 255, 0.3)",
          }}
        />
      </div>

      {/* LED-style glass indicators */}
      <div className="flex gap-1.5 mb-4">
        {Array.from({ length: 10 }).map((_, i) => (
          <div
            key={i}
            className={`flex-1 h-1.5 rounded-full transition-all duration-300 ${
              i < glasses
                ? ""
                : "bg-obsidian-border"
            }`}
            style={
              i < glasses
                ? {
                    background: "#00a0ff",
                    boxShadow: "0 0 6px rgba(0, 160, 255, 0.4)",
                    opacity: 0.7 + (i / 10) * 0.3,
                  }
                : undefined
            }
          />
        ))}
      </div>

      {/* Quick add buttons */}
      <div className="flex gap-2">
        {[
          { label: "+1 Bardak", ml: WATER_GLASS_ML },
          { label: "+2 Bardak", ml: WATER_GLASS_ML * 2 },
          { label: "+500ml", ml: 500 },
        ].map((btn) => (
          <button
            key={btn.label}
            onClick={() => addWater(btn.ml)}
            className="flex-1 py-2.5 rounded-xl text-[11px] font-light tracking-wider uppercase transition-all border border-electric/10 text-electric/60 hover:border-electric/25 hover:text-electric/80 hover:bg-electric/5 active:bg-electric/10"
          >
            {btn.label}
          </button>
        ))}
      </div>
    </div>
  );
}
