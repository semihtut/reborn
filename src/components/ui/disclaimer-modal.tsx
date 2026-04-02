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

  function accept() {
    localStorage.setItem(DISCLAIMER_KEY, "true");
    setShow(false);
  }

  if (!show) return null;

  return (
    <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-[100] flex items-center justify-center p-4">
      <div className="bg-slate-900 border border-slate-700 rounded-2xl max-w-md w-full max-h-[85vh] overflow-y-auto p-6">
        <h2 className="text-xl font-bold text-red-400 mb-4">Dikkat! Uygunluk Kontrolü</h2>

        <p className="text-sm text-slate-300 mb-4">{MEDICAL_DISCLAIMER}</p>

        <h3 className="text-sm font-semibold text-slate-200 mb-2">
          Kimler oruç tutMAMALI:
        </h3>
        <ul className="text-sm text-slate-400 space-y-1 mb-6">
          {FASTING_CONTRAINDICATIONS.map((item) => (
            <li key={item} className="flex gap-2">
              <span className="text-red-400">•</span>
              {item}
            </li>
          ))}
        </ul>

        <button
          onClick={accept}
          className="w-full bg-sky-600 hover:bg-sky-700 active:bg-sky-800 rounded-xl py-3 font-semibold transition-colors"
        >
          Ben bunlardan değilim, devam
        </button>
      </div>
    </div>
  );
}
