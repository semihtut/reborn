"use client";

import { useEffect, useState } from "react";
import { db } from "@/lib/db";
import type { FastingSession } from "@/types/fasting";
import { FASTING_PHASES } from "@/constants/fasting";

function getPhaseForDuration(hours: number) {
  let phase: (typeof FASTING_PHASES)[number] = FASTING_PHASES[0];
  for (const p of FASTING_PHASES) {
    if (hours >= p.hours) phase = p;
  }
  return phase;
}

function formatDuration(ms: number): string {
  const hours = Math.floor(ms / 3600000);
  const minutes = Math.floor((ms % 3600000) / 60000);
  return `${hours}s ${minutes}dk`;
}

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
    <div className="flex flex-col gap-4 w-full">
      <h1 className="text-2xl font-bold text-sky-400">Geçmiş</h1>

      {sessions.length === 0 ? (
        <div className="text-center py-12">
          <p className="text-slate-500 text-lg">Henüz oruç kaydı yok</p>
          <p className="text-slate-600 text-sm mt-1">
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
              className="bg-slate-900 rounded-2xl p-4 border-l-[3px]"
              style={{ borderColor: phase.color }}
            >
              <div className="flex justify-between items-start">
                <div>
                  <p className="font-semibold">{formatDuration(duration)}</p>
                  <p className="text-xs text-slate-400 mt-0.5">
                    {formatDate(session.startTime)}
                  </p>
                </div>
                <div className="flex items-center gap-2">
                  <span
                    className="text-xs px-2 py-0.5 rounded-full"
                    style={{ color: phase.color, backgroundColor: `${phase.color}20` }}
                  >
                    {phase.name}
                  </span>
                  {completed && reachedTarget && (
                    <span className="text-xs bg-green-600/20 text-green-400 px-2 py-0.5 rounded-full">
                      Tamamlandı
                    </span>
                  )}
                  {completed && !reachedTarget && (
                    <span className="text-xs bg-yellow-600/20 text-yellow-400 px-2 py-0.5 rounded-full">
                      Erken bitirildi
                    </span>
                  )}
                  {session.status === "cancelled" && (
                    <span className="text-xs bg-red-600/20 text-red-400 px-2 py-0.5 rounded-full">
                      İptal
                    </span>
                  )}
                </div>
              </div>
              <div className="mt-2 flex justify-between text-xs text-slate-500">
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
