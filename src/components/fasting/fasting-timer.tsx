"use client";

import { useEffect } from "react";
import { useFastingStore } from "@/stores/fasting-store";
import { FASTING_PHASES, MILESTONE_MESSAGES } from "@/constants/fasting";
import { PhaseCard } from "./phase-card";

/* Format seconds as HH:MM:SS */
function formatTime(totalSeconds: number): string {
  const hours = Math.floor(totalSeconds / 3600);
  const minutes = Math.floor((totalSeconds % 3600) / 60);
  const seconds = totalSeconds % 60;
  return `${hours.toString().padStart(2, "0")}:${minutes
    .toString()
    .padStart(2, "0")}:${seconds.toString().padStart(2, "0")}`;
}

/* Determine current fasting phase from elapsed hours */
function getCurrentPhase(elapsedHours: number) {
  let current: (typeof FASTING_PHASES)[number] = FASTING_PHASES[0];
  for (const phase of FASTING_PHASES) {
    if (elapsedHours >= phase.hours) {
      current = phase;
    }
  }
  return current;
}

/* Get the next upcoming phase */
function getNextPhase(elapsedHours: number) {
  for (const phase of FASTING_PHASES) {
    if (elapsedHours < phase.hours) {
      return phase;
    }
  }
  return null;
}

/* Get the most recently achieved milestone */
function getLatestMilestone(elapsedHours: number) {
  let latest = null;
  for (const m of MILESTONE_MESSAGES) {
    if (elapsedHours >= m.hours) {
      latest = m;
    }
  }
  return latest;
}

/* Calculate progress percentage */
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
    <div className="flex flex-col items-center gap-6 w-full">
      {/* Circular timer with glow */}
      <div className="relative w-60 h-60 flex items-center justify-center">
        {/* Background glow */}
        <div
          className="absolute inset-0 rounded-full animate-droplet-pulse"
          style={{
            background: `radial-gradient(circle, ${phase.color}10 0%, transparent 70%)`,
            transform: "scale(1.2)",
          }}
        />

        <svg className="absolute w-full h-full -rotate-90" viewBox="0 0 100 100">
          {/* Background track */}
          <circle
            cx="50" cy="50" r="45"
            fill="none"
            stroke="#1a1d2e"
            strokeWidth="3"
          />
          {/* Progress arc with glow */}
          <circle
            cx="50" cy="50" r="45"
            fill="none"
            stroke={phase.color}
            strokeWidth="3"
            strokeLinecap="round"
            strokeDasharray={`${(progress / 100) * circumference} ${circumference}`}
            className="transition-all duration-1000"
            style={{
              filter: `drop-shadow(0 0 6px ${phase.color}60)`,
            }}
          />
        </svg>

        <div className="text-center z-10">
          <p
            className="text-4xl font-extralight tracking-wider"
            style={{ textShadow: `0 0 30px ${phase.color}30` }}
          >
            {formatTime(elapsedSeconds)}
          </p>
          <p className="text-[11px] font-light tracking-wider text-slate-text mt-2 uppercase">
            / {currentSession.targetHours}h hedef
          </p>
        </div>
      </div>

      {/* Current phase */}
      <PhaseCard phase={phase} />

      {/* Next phase countdown */}
      {nextPhase && (
        <div className="w-full glass-card rounded-xl px-4 py-3 flex justify-between items-center">
          <span className="text-[11px] font-light tracking-wider text-slate-text uppercase">
            Sonraki aşama
          </span>
          <span
            className="text-[12px] font-light tracking-wide"
            style={{ color: nextPhase.color }}
          >
            {nextPhase.name} — {Math.max(0, Math.ceil(nextPhase.hours - elapsedHours))}h kaldı
          </span>
        </div>
      )}

      {/* Latest milestone */}
      {milestone && (
        <div className="w-full glass-card rounded-xl px-4 py-3 text-center">
          <p className="text-sm font-light tracking-wide text-electric">
            {milestone.title}
          </p>
          <p className="text-[11px] font-light text-slate-text mt-1 leading-relaxed">
            {milestone.message}
          </p>
        </div>
      )}

      {/* Danger warning for 48h+ */}
      {elapsedHours >= 48 && (
        <div className="w-full rounded-xl px-4 py-3 text-center border border-red-500/20" style={{ background: "rgba(220, 38, 38, 0.06)" }}>
          <p className="text-sm font-light tracking-wide text-red-400">Dikkat</p>
          <p className="text-[11px] font-light text-red-400/60 mt-1 leading-relaxed">
            48+ saat oruç tıbbi gözetim altında yapılmalıdır.
          </p>
        </div>
      )}

      {/* Stop button — minimal, elegant */}
      <button
        onClick={stopFasting}
        className="w-full py-4 rounded-2xl font-light text-base tracking-wider uppercase transition-all border border-red-500/20 text-red-400/80 hover:bg-red-500/10 hover:text-red-400 active:bg-red-500/20"
      >
        Orucu Bitir
      </button>
    </div>
  );
}
