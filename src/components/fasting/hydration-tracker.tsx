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

  async function addWater(ml: number) {
    await db.hydration.add({
      sessionId: null,
      timestamp: new Date(),
      amountMl: ml,
    });
    setTodayMl((prev) => prev + ml);
  }

  return (
    <div className="w-full bg-slate-900 rounded-2xl p-4">
      <div className="flex justify-between items-center mb-3">
        <h3 className="font-semibold text-sky-400">Su Takibi</h3>
        <span className="text-sm text-slate-400">
          {todayMl}ml / {WATER_GOAL_ML}ml
        </span>
      </div>

      {/* Progress bar */}
      <div className="w-full h-3 bg-slate-800 rounded-full overflow-hidden mb-3">
        <div
          className="h-full bg-sky-500 rounded-full transition-all duration-500"
          style={{ width: `${progress}%` }}
        />
      </div>

      {/* Glass indicators */}
      <div className="flex gap-1 mb-3">
        {Array.from({ length: 10 }).map((_, i) => (
          <div
            key={i}
            className={`flex-1 h-2 rounded-full ${
              i < glasses ? "bg-sky-500" : "bg-slate-800"
            }`}
          />
        ))}
      </div>

      {/* Quick add buttons */}
      <div className="flex gap-2">
        <button
          onClick={() => addWater(WATER_GLASS_ML)}
          className="flex-1 bg-sky-600/20 hover:bg-sky-600/30 active:bg-sky-600/40 text-sky-400 rounded-xl py-2.5 text-sm font-medium transition-colors"
        >
          +1 Bardak
        </button>
        <button
          onClick={() => addWater(WATER_GLASS_ML * 2)}
          className="flex-1 bg-sky-600/20 hover:bg-sky-600/30 active:bg-sky-600/40 text-sky-400 rounded-xl py-2.5 text-sm font-medium transition-colors"
        >
          +2 Bardak
        </button>
        <button
          onClick={() => addWater(500)}
          className="flex-1 bg-sky-600/20 hover:bg-sky-600/30 active:bg-sky-600/40 text-sky-400 rounded-xl py-2.5 text-sm font-medium transition-colors"
        >
          +500ml
        </button>
      </div>
    </div>
  );
}
