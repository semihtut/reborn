"use client";

import { MEDICAL_DISCLAIMER, FASTING_CONTRAINDICATIONS, REFEEDING_TIPS } from "@/constants/fasting";

export default function SettingsPage() {
  /* Reset disclaimer acceptance in localStorage */
  function clearDisclaimer() {
    localStorage.removeItem("waterfast_disclaimer_accepted");
    window.location.reload();
  }

  /* Export all data as JSON file */
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

  /* Clear all stored data after confirmation */
  async function clearData() {
    if (!confirm("Tüm veriler silinecek. Emin misin?")) return;
    const { db } = await import("@/lib/db");
    await db.sessions.clear();
    await db.hydration.clear();
    alert("Tüm veriler silindi.");
  }

  return (
    <div className="flex flex-col gap-6 w-full">
      <h1 className="text-2xl font-extralight tracking-ultra-wide uppercase text-white/90 glow-text">
        Ayarlar
      </h1>

      {/* Data management */}
      <section className="glass-card rounded-2xl p-5">
        <h2 className="text-sm font-light tracking-wider uppercase text-electric/80 mb-4">
          Veri Yönetimi
        </h2>
        <div className="flex flex-col gap-2">
          <button
            onClick={exportData}
            className="w-full rounded-xl py-3 text-[12px] font-light tracking-wider uppercase transition-all border border-obsidian-border text-white/60 hover:border-electric/20 hover:text-white/80 hover:bg-electric/5"
          >
            Verileri Dışa Aktar (JSON)
          </button>
          <button
            onClick={clearData}
            className="w-full rounded-xl py-3 text-[12px] font-light tracking-wider uppercase transition-all border border-red-500/15 text-red-400/60 hover:border-red-500/30 hover:text-red-400/80 hover:bg-red-500/5"
          >
            Tüm Verileri Sil
          </button>
        </div>
      </section>

      {/* Refeeding guide */}
      <section className="glass-card rounded-2xl p-5">
        <h2 className="text-sm font-light tracking-wider uppercase text-electric/80 mb-4">
          Orucu Nasıl Bozmalı
        </h2>
        <ul className="text-[13px] font-extralight text-white/50 space-y-2.5 leading-relaxed">
          {REFEEDING_TIPS.map((tip) => (
            <li key={tip} className="flex gap-3">
              <span className="text-electric/40 mt-0.5">•</span>
              {tip}
            </li>
          ))}
        </ul>
      </section>

      {/* Medical info */}
      <section className="glass-card rounded-2xl p-5">
        <h2 className="text-sm font-light tracking-wider uppercase text-electric/80 mb-4">
          Uygunluk Kontrolü
        </h2>
        <p className="text-[13px] font-extralight text-white/50 mb-4 leading-relaxed">
          {MEDICAL_DISCLAIMER}
        </p>
        <h3 className="text-[11px] font-light tracking-wider uppercase text-white/40 mb-3">
          Kimler oruç tutMAMALI:
        </h3>
        <ul className="text-[12px] font-extralight text-white/40 space-y-2 leading-relaxed">
          {FASTING_CONTRAINDICATIONS.map((item) => (
            <li key={item} className="flex gap-3">
              <span className="text-red-400/40 mt-0.5">•</span>
              {item}
            </li>
          ))}
        </ul>
        <button
          onClick={clearDisclaimer}
          className="mt-4 text-[11px] font-light tracking-wider text-slate-text/40 hover:text-slate-text/60 transition-colors underline underline-offset-4"
        >
          Uyarıyı tekrar göster
        </button>
      </section>

      {/* About */}
      <section className="glass-card rounded-2xl p-5 text-center">
        <p className="text-[12px] font-light tracking-wider text-slate-text/50">
          Water Fasting v1.0.0
        </p>
        <p className="text-[10px] font-light text-slate-text/30 mt-1.5 tracking-wide">
          Veriler cihazında saklanır. Sunucuya gönderilmez.
        </p>
      </section>
    </div>
  );
}
