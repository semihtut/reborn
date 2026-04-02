"use client";

import { useEffect, useState } from "react";
import { db } from "@/lib/db";
import type { FastingSession } from "@/types/fasting";
import { FASTING_PHASES } from "@/constants/fasting";

/* Determine which phase was reached based on duration */
function getPhaseForDuration(hours: number) {
  let phase: (typeof FASTING_PHASES)[number] = FASTING_PHASES[0];
  for (const p of FASTING_PHASES) {
    if (hours >= p.hours) phase = p;
  }
  return phase;
}

/* Format milliseconds as human-readable duration */
function formatDuration(ms: number): string {
  const hours = Math.floor(ms / 3600000);
  const minutes = Math.floor((ms % 3600000) / 60000);
  return `${hours}s ${minutes}dk`;
}

/* Format date for Turkish locale */
function formatDate(date: Date): string {
  return new Date(date).toLocaleDateString("tr-TR", {
    day: "numeric",
    month: "short",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });
}

export default function HistoryPage() {
  const [sessions, setSessions] = useState<FastingSession[]>([]);

  useEffect(() => {
    db.sessions
      .orderBy("startTime")
      .reverse()
      .toArray()
      .then(setSessions);
  }, []);

  return (
    <div className="flex flex-col gap-5 w-full">
      <h1 className="text-2xl font-extralight tracking-ultra-wide uppercase text-white/90 glow-text">
        Geçmiş
      </h1>

      {sessions.length === 0 ? (
        <div className="text-center py-16">
          <p className="text-slate-text text-base font-light">Henüz oruç kaydı yok</p>
          <p className="text-slate-text/50 text-[12px] font-light mt-2 tracking-wide">
            İlk orucunu başlatmak için ana sayfaya git
          </p>
        </div>
      ) : (
        sessions.map((session) => {
          const duration = session.endTime
            ? new Date(session.endTime).getTime() - new Date(session.startTime).getTime()
            : Date.now() - new Date(session.startTime).getTime();
          const hours = duration / 3600000;
          const phase = getPhaseForDuration(hours);
          const completed = session.status === "completed";
          const reachedTarget = hours >= session.targetHours;

          return (
            <div
              key={session.id}
              className="glass-card rounded-2xl p-4"
              style={{ borderLeft: `2px solid ${phase.color}40` }}
            >
              <div className="flex justify-between items-start">
                <div>
                  <p className="font-light tracking-wide text-white/90">{formatDuration(duration)}</p>
                  <p className="text-[11px] font-light text-slate-text mt-1 tracking-wide">
                    {formatDate(session.startTime)}
                  </p>
                </div>
                <div className="flex items-center gap-2">
                  <span
                    className="text-[10px] font-light tracking-wider uppercase px-2.5 py-1 rounded-full"
                    style={{ color: phase.color, backgroundColor: `${phase.color}12` }}
                  >
                    {phase.name}
                  </span>
                  {completed && reachedTarget && (
                    <span className="text-[10px] font-light tracking-wider uppercase px-2.5 py-1 rounded-full bg-green-500/10 text-green-400/80">
                      Tamamlandı
                    </span>
                  )}
                  {completed && !reachedTarget && (
                    <span className="text-[10px] font-light tracking-wider uppercase px-2.5 py-1 rounded-full bg-yellow-500/10 text-yellow-400/80">
                      Erken
                    </span>
                  )}
                  {session.status === "cancelled" && (
                    <span className="text-[10px] font-light tracking-wider uppercase px-2.5 py-1 rounded-full bg-red-500/10 text-red-400/80">
                      İptal
                    </span>
                  )}
                </div>
              </div>
              <div className="mt-3 flex justify-between text-[11px] font-light text-slate-text/60 tracking-wide">
                <span>Hedef: {session.targetHours}h</span>
                <span>Gerçekleşen: {hours.toFixed(1)}h</span>
              </div>
            </div>
          );
        })
      )}
    </div>
  );
}
