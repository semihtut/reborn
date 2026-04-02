"use client";

import { useEffect, useState } from "react";
import { db } from "@/lib/db";
import type { FastingStats } from "@/types/fasting";

function StatCard({ label, value, sub }: { label: string; value: string; sub?: string }) {
  return (
    <div className="bg-slate-900 rounded-2xl p-4 text-center">
      <p className="text-2xl font-bold text-sky-400">{value}</p>
      <p className="text-sm text-slate-300 mt-1">{label}</p>
      {sub && <p className="text-xs text-slate-500 mt-0.5">{sub}</p>}
    </div>
  );
}

export default function StatsPage() {
  const [stats, setStats] = useState<FastingStats>({
    totalFasts: 0,
    completedFasts: 0,
    longestFastHours: 0,
    currentStreak: 0,
    averageDurationHours: 0,
    totalHoursFasted: 0,
  });

  useEffect(() => {
    computeStats();
  }, []);

  async function computeStats() {
    const sessions = await db.sessions.toArray();
    const completed = sessions.filter((s) => s.status === "completed");

    if (completed.length === 0) {
      setStats({
        totalFasts: sessions.length,
        completedFasts: 0,
        longestFastHours: 0,
        currentStreak: 0,
        averageDurationHours: 0,
        totalHoursFasted: 0,
      });
      return;
    }

    const durations = completed.map((s) => {
      const end = s.endTime ? new Date(s.endTime).getTime() : Date.now();
      return (end - new Date(s.startTime).getTime()) / 3600000;
    });

    const totalHours = durations.reduce((a, b) => a + b, 0);
    const longest = Math.max(...durations);
    const avg = totalHours / durations.length;

    // Streak: count consecutive completed fasts (sorted by date, most recent first)
    const sorted = [...completed].sort(
      (a, b) => new Date(b.startTime).getTime() - new Date(a.startTime).getTime()
    );
    let streak = 0;
    for (const s of sorted) {
      const dur = s.endTime
        ? (new Date(s.endTime).getTime() - new Date(s.startTime).getTime()) / 3600000
        : 0;
      if (dur >= s.targetHours) {
        streak++;
      } else {
        break;
      }
    }

    setStats({
      totalFasts: sessions.length,
      completedFasts: completed.length,
      longestFastHours: longest,
      currentStreak: streak,
      averageDurationHours: avg,
      totalHoursFasted: totalHours,
    });
  }

  return (
    <div className="flex flex-col gap-4 w-full">
      <h1 className="text-2xl font-bold text-sky-400">İstatistikler</h1>

      {stats.totalFasts === 0 ? (
        <div className="text-center py-12">
          <p className="text-slate-500 text-lg">Henüz veri yok</p>
          <p className="text-slate-600 text-sm mt-1">
            İlk orucunu tamamladığında istatistikler burada görünecek
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-2 gap-3">
          <StatCard
            label="Toplam Oruç"
            value={stats.totalFasts.toString()}
            sub={`${stats.completedFasts} tamamlandı`}
          />
          <StatCard
            label="Seri"
            value={stats.currentStreak.toString()}
            sub="ardışık başarılı"
          />
          <StatCard
            label="En Uzun"
            value={`${stats.longestFastHours.toFixed(1)}h`}
          />
          <StatCard
            label="Ortalama"
            value={`${stats.averageDurationHours.toFixed(1)}h`}
          />
          <StatCard
            label="Toplam Süre"
            value={`${stats.totalHoursFasted.toFixed(0)}h`}
            sub={`${(stats.totalHoursFasted / 24).toFixed(1)} gün`}
          />
          <StatCard
            label="Başarı Oranı"
            value={`%${stats.totalFasts > 0 ? Math.round((stats.completedFasts / stats.totalFasts) * 100) : 0}`}
          />
        </div>
      )}
    </div>
  );
}
