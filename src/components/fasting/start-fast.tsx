"use client";

import { useFastingStore } from "@/stores/fasting-store";
import { FAST_DURATION_HOURS } from "@/constants/fasting";

export function StartFast() {
  const { startFasting } = useFastingStore();

  return (
    <div className="flex flex-col items-center gap-8 w-full py-8">
      {/* Big circle start button */}
      <button
        onClick={() => startFasting(FAST_DURATION_HOURS)}
        className="relative w-52 h-52 rounded-full bg-gradient-to-br from-sky-500 to-sky-700 hover:from-sky-400 hover:to-sky-600 active:from-sky-600 active:to-sky-800 transition-all shadow-lg shadow-sky-500/20 hover:shadow-sky-500/40 flex flex-col items-center justify-center group"
      >
        <div className="absolute inset-2 rounded-full border-2 border-sky-300/20 group-hover:border-sky-300/40 transition-colors" />
        <span className="text-5xl mb-2">72h</span>
        <span className="text-sm text-sky-200 font-medium">Su Orucu Başlat</span>
      </button>

      {/* Phase preview */}
      <div className="w-full space-y-2">
        <p className="text-xs text-slate-500 text-center mb-3">72 saatte neler olacak?</p>
        <div className="flex gap-1 w-full">
          {[
            { color: "#f97316", label: "Sindirim", w: "5%" },
            { color: "#eab308", label: "Geçiş", w: "11%" },
            { color: "#22c55e", label: "Yağ Yakımı", w: "8%" },
            { color: "#3b82f6", label: "Otofaji", w: "8%" },
            { color: "#a855f7", label: "Ketoz", w: "34%" },
            { color: "#f59e0b", label: "Yenilenme", w: "34%" },
          ].map((phase) => (
            <div
              key={phase.label}
              className="h-2 rounded-full"
              style={{ backgroundColor: phase.color, width: phase.w }}
              title={phase.label}
            />
          ))}
        </div>
        <div className="flex justify-between text-[10px] text-slate-600 px-1">
          <span>0h</span>
          <span>12h</span>
          <span>24h</span>
          <span>48h</span>
          <span>72h</span>
        </div>
      </div>
    </div>
  );
}
