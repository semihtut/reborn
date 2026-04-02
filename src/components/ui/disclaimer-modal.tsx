"use client";

import { useState, useEffect } from "react";
import { MEDICAL_DISCLAIMER, FASTING_CONTRAINDICATIONS } from "@/constants/fasting";

const DISCLAIMER_KEY = "waterfast_disclaimer_accepted";

export function DisclaimerModal() {
  const [show, setShow] = useState(false);

  useEffect(() => {
    const accepted = localStorage.getItem(DISCLAIMER_KEY);
    if (!accepted) {
      setShow(true);
    }
  }, []);

  /* Accept disclaimer and persist to localStorage */
  function accept() {
    localStorage.setItem(DISCLAIMER_KEY, "true");
    setShow(false);
  }

  if (!show) return null;

  return (
    <div className="fixed inset-0 bg-obsidian/90 backdrop-blur-xl z-[100] flex items-center justify-center p-4">
      <div className="glass-card border-obsidian-border rounded-2xl max-w-md w-full max-h-[85vh] overflow-y-auto p-6">
        <h2 className="text-lg font-light tracking-wider uppercase text-red-400/80 mb-5">
          Dikkat! Uygunluk Kontrolü
        </h2>

        <p className="text-[13px] font-extralight text-white/50 mb-5 leading-relaxed">
          {MEDICAL_DISCLAIMER}
        </p>

        <h3 className="text-[11px] font-light tracking-wider uppercase text-white/40 mb-3">
          Kimler oruç tutMAMALI:
        </h3>
        <ul className="text-[12px] font-extralight text-white/40 space-y-2 mb-6 leading-relaxed">
          {FASTING_CONTRAINDICATIONS.map((item) => (
            <li key={item} className="flex gap-3">
              <span className="text-red-400/40 mt-0.5">•</span>
              {item}
            </li>
          ))}
        </ul>

        <button
          onClick={accept}
          className="w-full py-4 rounded-2xl font-light text-[13px] tracking-wider uppercase transition-all border border-electric/20 text-electric/80 hover:bg-electric/5 hover:border-electric/30 active:bg-electric/10"
        >
          Ben bunlardan değilim, devam
        </button>
      </div>
    </div>
  );
}
