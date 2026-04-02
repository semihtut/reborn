"use client";

import { useState } from "react";
import { useFastingStore } from "@/stores/fasting-store";
import { FASTING_PRESETS } from "@/constants/fasting";

export function PresetSelector() {
  const { startFasting } = useFastingStore();
  const [customHours, setCustomHours] = useState<number | null>(null);

  return (
    <div className="w-full flex flex-col gap-3">
      <p className="text-slate-400 text-center mb-1">Oruç süresini seç</p>

      {FASTING_PRESETS.map((preset) => (
        <button
          key={preset.hours}
          onClick={() => startFasting(preset.hours)}
          className="w-full flex items-center justify-between bg-slate-900 hover:bg-slate-800 active:bg-slate-700 rounded-2xl p-4 transition-colors"
        >
          <div className="text-left">
            <p className="font-semibold text-lg">{preset.label}</p>
            <p className="text-sm text-slate-400">{preset.description}</p>
          </div>
          <span className="text-slate-500 text-sm">{preset.hours}h</span>
        </button>
      ))}

      {/* Custom duration */}
      <div className="flex gap-2 mt-2">
        <input
          type="number"
          min={1}
          max={168}
          placeholder="Özel süre (saat)"
          className="flex-1 bg-slate-900 rounded-xl px-4 py-3 text-white placeholder-slate-500 outline-none focus:ring-2 focus:ring-sky-500"
          onChange={(e) => setCustomHours(Number(e.target.value) || null)}
        />
        <button
          onClick={() => customHours && startFasting(customHours)}
          disabled={!customHours}
          className="bg-sky-600 hover:bg-sky-700 disabled:bg-slate-700 disabled:text-slate-500 rounded-xl px-6 py-3 font-semibold transition-colors"
        >
          Başla
        </button>
      </div>
    </div>
  );
}
