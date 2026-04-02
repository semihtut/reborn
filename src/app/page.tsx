"use client";

import { useEffect } from "react";
import { useFastingStore } from "@/stores/fasting-store";
import { FASTING_PRESETS, FASTING_PHASES } from "@/constants/fasting";

function formatTime(totalSeconds: number): string {
  const hours = Math.floor(totalSeconds / 3600);
  const minutes = Math.floor((totalSeconds % 3600) / 60);
  const seconds = totalSeconds % 60;
  return `${hours.toString().padStart(2, "0")}:${minutes
    .toString()
    .padStart(2, "0")}:${seconds.toString().padStart(2, "0")}`;
}

function getCurrentPhase(elapsedHours: number) {
  let current: (typeof FASTING_PHASES)[number] = FASTING_PHASES[0];
  for (const phase of FASTING_PHASES) {
    if (elapsedHours >= phase.hours) {
      current = phase;
    }
  }
  return current;
}

function getProgress(elapsedSeconds: number, targetHours: number): number {
  const targetSeconds = targetHours * 3600;
  return Math.min((elapsedSeconds / targetSeconds) * 100, 100);
}

export default function Home() {
  const { currentSession, isRunning, elapsedSeconds, startFasting, stopFasting, tick } =
    useFastingStore();

  useEffect(() => {
    if (!isRunning) return;
    const interval = setInterval(tick, 1000);
    return () => clearInterval(interval);
  }, [isRunning, tick]);

  const elapsedHours = elapsedSeconds / 3600;
  const phase = getCurrentPhase(elapsedHours);
  const progress = currentSession ? getProgress(elapsedSeconds, currentSession.targetHours) : 0;

  return (
    <main className="flex flex-col items-center min-h-screen px-4 py-8 max-w-md mx-auto">
      <h1 className="text-2xl font-bold text-sky-400 mb-8">Water Fasting</h1>

      {isRunning && currentSession ? (
        <div className="w-full flex flex-col items-center gap-6">
          {/* Timer circle */}
          <div className="relative w-56 h-56 flex items-center justify-center">
            <svg className="absolute w-full h-full -rotate-90" viewBox="0 0 100 100">
              <circle
                cx="50"
                cy="50"
                r="45"
                fill="none"
                stroke="#1e293b"
                strokeWidth="6"
              />
              <circle
                cx="50"
                cy="50"
                r="45"
                fill="none"
                stroke="#0ea5e9"
                strokeWidth="6"
                strokeLinecap="round"
                strokeDasharray={`${progress * 2.827} ${282.7 - progress * 2.827}`}
                className="transition-all duration-1000"
              />
            </svg>
            <div className="text-center">
              <p className="text-3xl font-mono font-bold">{formatTime(elapsedSeconds)}</p>
              <p className="text-sm text-slate-400 mt-1">
                / {currentSession.targetHours}h hedef
              </p>
            </div>
          </div>

          {/* Current phase */}
          <div className="w-full bg-slate-900 rounded-2xl p-4 text-center">
            <p className="text-sky-400 font-semibold">{phase.name}</p>
            <p className="text-sm text-slate-400 mt-1">{phase.description}</p>
          </div>

          {/* Stop button */}
          <button
            onClick={stopFasting}
            className="w-full py-4 bg-red-600 hover:bg-red-700 rounded-2xl font-semibold text-lg transition-colors"
          >
            Orucu Bitir
          </button>
        </div>
      ) : (
        <div className="w-full flex flex-col gap-4">
          <p className="text-slate-400 text-center mb-2">Oruç süresini seç</p>
          {FASTING_PRESETS.map((preset) => (
            <button
              key={preset.hours}
              onClick={() => startFasting(preset.hours)}
              className="w-full flex items-center justify-between bg-slate-900 hover:bg-slate-800 rounded-2xl p-4 transition-colors"
            >
              <div className="text-left">
                <p className="font-semibold text-lg">{preset.label}</p>
                <p className="text-sm text-slate-400">{preset.description}</p>
              </div>
              <span className="text-sky-400 text-2xl">&#8250;</span>
            </button>
          ))}
        </div>
      )}
    </main>
  );
}
