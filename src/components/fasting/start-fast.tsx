"use client";

import { useFastingStore } from "@/stores/fasting-store";
import { FAST_DURATION_HOURS } from "@/constants/fasting";
import { WaterDroplet } from "./water-droplet";

export function StartFast() {
  const { startFasting } = useFastingStore();

  return (
    <div className="flex flex-col items-center gap-10 w-full py-4">
      {/* Central water droplet — tap to start */}
      <button
        onClick={() => startFasting(FAST_DURATION_HOURS)}
        className="relative group focus:outline-none"
        aria-label="Su orucu başlat"
      >
        <WaterDroplet size={200} variant="dna" />

        {/* Overlay text on the droplet */}
        <div className="absolute inset-0 flex flex-col items-center justify-center z-10">
          <span className="text-4xl font-extralight tracking-wider text-white/90">
            72h
          </span>
          <span className="text-[11px] font-light tracking-ultra-wide uppercase text-electric/70 mt-1">
            Başlat
          </span>
        </div>

        {/* Hover ring */}
        <div className="absolute inset-0 rounded-full border border-electric/0 group-hover:border-electric/20 transition-all duration-700" />
      </button>

      {/* Phase journey bar */}
      <div className="w-full space-y-3">
        <p className="text-[11px] font-light tracking-wider text-slate-text text-center uppercase">
          72 saatte neler olacak?
        </p>

        {/* Phase bar with LED-style segments */}
        <div className="flex gap-1.5 w-full">
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
              className="h-1.5 rounded-full"
              style={{
                backgroundColor: phase.color,
                width: phase.w,
                opacity: 0.6,
                boxShadow: `0 0 8px ${phase.color}40`,
              }}
              title={phase.label}
            />
          ))}
        </div>

        {/* Timeline labels */}
        <div className="flex justify-between text-[10px] font-light text-slate-text/60 px-0.5 tracking-wide">
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
