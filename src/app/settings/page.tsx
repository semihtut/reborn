"use client";

import { MEDICAL_DISCLAIMER, FASTING_CONTRAINDICATIONS, REFEEDING_TIPS } from "@/constants/fasting";

export default function SettingsPage() {
  function clearDisclaimer() {
    localStorage.removeItem("waterfast_disclaimer_accepted");
    window.location.reload();
  }

  async function exportData() {
    const { db } = await import("@/lib/db");
    const sessions = await db.sessions.toArray();
    const hydration = await db.hydration.toArray();
    const data = JSON.stringify({ sessions, hydration }, null, 2);
    const blob = new Blob([data], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `waterfasting-export-${new Date().toISOString().split("T")[0]}.json`;
    a.click();
    URL.revokeObjectURL(url);
  }

  async function clearData() {
    if (!confirm("Tüm veriler silinecek. Emin misin?")) return;
    const { db } = await import("@/lib/db");
    await db.sessions.clear();
    await db.hydration.clear();
    alert("Tüm veriler silindi.");
  }

  return (
    <div className="flex flex-col gap-6 w-full">
      <h1 className="text-2xl font-bold text-sky-400">Ayarlar</h1>

      {/* Data management */}
      <section className="bg-slate-900 rounded-2xl p-4">
        <h2 className="font-semibold mb-3">Veri Yönetimi</h2>
        <div className="flex flex-col gap-2">
          <button
            onClick={exportData}
            className="w-full bg-slate-800 hover:bg-slate-700 rounded-xl py-3 text-sm font-medium transition-colors"
          >
            Verileri Dışa Aktar (JSON)
          </button>
          <button
            onClick={clearData}
            className="w-full bg-red-950/50 hover:bg-red-950 text-red-400 rounded-xl py-3 text-sm font-medium transition-colors"
          >
            Tüm Verileri Sil
          </button>
        </div>
      </section>

      {/* Refeeding guide */}
      <section className="bg-slate-900 rounded-2xl p-4">
        <h2 className="font-semibold mb-3">Orucu Nasıl Bozmalı</h2>
        <ul className="text-sm text-slate-400 space-y-2">
          {REFEEDING_TIPS.map((tip) => (
            <li key={tip} className="flex gap-2">
              <span className="text-sky-400">•</span>
              {tip}
            </li>
          ))}
        </ul>
      </section>

      {/* Medical info */}
      <section className="bg-slate-900 rounded-2xl p-4">
        <h2 className="font-semibold mb-3">Uygunluk Kontrolü</h2>
        <p className="text-sm text-slate-400 mb-3">{MEDICAL_DISCLAIMER}</p>
        <h3 className="text-sm font-medium mb-2 text-slate-300">
          Kimler oruç tutMAMALI:
        </h3>
        <ul className="text-sm text-slate-400 space-y-1">
          {FASTING_CONTRAINDICATIONS.map((item) => (
            <li key={item} className="flex gap-2">
              <span className="text-red-400">•</span>
              {item}
            </li>
          ))}
        </ul>
        <button
          onClick={clearDisclaimer}
          className="mt-3 text-xs text-slate-500 underline"
        >
          Uyarıyı tekrar göster
        </button>
      </section>

      {/* About */}
      <section className="bg-slate-900 rounded-2xl p-4 text-center">
        <p className="text-sm text-slate-500">Water Fasting v1.0.0</p>
        <p className="text-xs text-slate-600 mt-1">
          Veriler cihazında saklanır. Sunucuya gönderilmez.
        </p>
      </section>
    </div>
  );
}
