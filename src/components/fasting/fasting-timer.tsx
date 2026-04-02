"use client";

import { useEffect } from "react";
import { useFastingStore } from "@/stores/fasting-store";
import { FASTING_PHASES, MILESTONE_MESSAGES } from "@/constants/fasting";
import { PhaseCard } from "./phase-card";

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

function getNextPhase(elapsedHours: number) {
  for (const phase of FASTING_PHASES) {
    if (elapsedHours < phase.hours) {
      return phase;
    }
  }
  return null;
}

function getLatestMilestone(elapsedHours: number) {
  let latest = null;
  for (const m of MILESTONE_MESSAGES) {
    if (elapsedHours >= m.hours) {
      latest = m;
    }
  }
  return latest;
}

function getProgress(elapsedSeconds: number, targetHours: number): number {
  const targetSeconds = targetHours * 3600;
  return Math.min((elapsedSeconds / targetSeconds) * 100, 100);
}

export function FastingTimer() {
  const { currentSession, isRunning, elapsedSeconds, tick, stopFasting } =
    useFastingStore();

  useEffect(() => {
    if (!isRunning) return;
    const interval = setInterval(tick, 1000);
    return () => clearInterval(interval);
  }, [isRunning, tick]);

  if (!currentSession) return null;

  const elapsedHours = elapsedSeconds / 3600;
  const phase = getCurrentPhase(elapsedHours);
  const nextPhase = getNextPhase(elapsedHours);
  const milestone = getLatestMilestone(elapsedHours);
  const progress = getProgress(elapsedSeconds, currentSession.targetHours);
  const circumference = 2 * Math.PI * 45;

  return (
    <div className="flex flex-col items-center gap-5 w-full">
      {/* Circular timer */}
      <div className="relative w-60 h-60 flex items-center justify-center">
        <svg className="absolute w-full h-full -rotate-90" viewBox="0 0 100 100">
          {/* Background track */}
          <circle
            cx="50" cy="50" r="45"
            fill="none"
            stroke="#1e293b"
            strokeWidth="5"
          />
          {/* Progress arc */}
          <circle
            cx="50" cy="50" r="45"
            fill="none"
            stroke={phase.color}
            strokeWidth="5"
            strokeLinecap="round"
            strokeDasharray={`${(progress / 100) * circumference} ${circumference}`}
            className="transition-all duration-1000"
          />
        </svg>
        <div className="text-center z-10">
          <p className="text-4xl font-mono font-bold tracking-tight">
            {formatTime(elapsedSeconds)}
          </p>
          <p className="text-sm text-slate-400 mt-1">
            / {currentSession.targetHours}h hedef
          </p>
        </div>
      </div>

      {/* Current phase */}
      <PhaseCard phase={phase} />

      {/* Next phase countdown */}
      {nextPhase && (
        <div className="w-full bg-slate-900/50 rounded-xl px-4 py-3 flex justify-between items-center">
          <span className="text-sm text-slate-400">Sonraki aşama</span>
          <span className="text-sm font-medium" style={{ color: nextPhase.color }}>
            {nextPhase.name} — {Math.max(0, Math.ceil(nextPhase.hours - elapsedHours))}h kaldı
          </span>
        </div>
      )}

      {/* Latest milestone */}
      {milestone && (
        <div className="w-full bg-slate-900/50 border border-slate-800 rounded-xl px-4 py-3 text-center">
          <p className="text-sm font-semibold text-sky-400">{milestone.title}</p>
          <p className="text-xs text-slate-400 mt-1">{milestone.message}</p>
        </div>
      )}

      {/* Danger warning for 48h+ */}
      {elapsedHours >= 48 && (
        <div className="w-full bg-red-950/50 border border-red-800 rounded-xl px-4 py-3 text-center">
          <p className="text-sm font-semibold text-red-400">Dikkat</p>
          <p className="text-xs text-red-300/80 mt-1">
            48+ saat oruç tıbbi gözetim altında yapılmalıdır.
          </p>
        </div>
      )}

      {/* Stop button */}
      <button
        onClick={stopFasting}
        className="w-full py-4 bg-red-600 hover:bg-red-700 active:bg-red-800 rounded-2xl font-semibold text-lg transition-colors"
      >
        Orucu Bitir
      </button>
    </div>
  );
}
