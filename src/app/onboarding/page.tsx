"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

const ONBOARDING_KEY = "waterfast_onboarded";

const SLIDES = [
  {
    icon: "💧",
    title: "Hoş geldin",
    subtitle: "Leo, Hasan & Samet'in 72 Saatlik Su Orucu Macerasına",
    body: "Bu uygulama sadece üçünüz için yapıldı. 72 saatlik su orucunda vücudunuzda neler olduğunu saat saat takip edeceksiniz.",
    accent: "#00a0ff",
  },
  {
    icon: "🔬",
    title: "Bilim Destekli",
    subtitle: "6 Aşamalı Oruç Takibi",
    body: "Sindirim → Metabolik Geçiş → Yağ Yakımı → Otofaji → Ketoz → Yenilenme. Her aşamada vücudunuzda ne olduğunu bileceksiniz.",
    accent: "#a855f7",
  },
  {
    icon: "🧬",
    title: "Otofaji & Yenilenme",
    subtitle: "Hücresel Temizlik Aktif",
    body: "18. saatte otofaji başlıyor — hücreleriniz kendini temizliyor. 48. saatte bağışıklık sisteminiz sıfırlanmaya başlıyor. 72. saatte tam yenilenme.",
    accent: "#3b82f6",
  },
  {
    icon: "💪",
    title: "Birlikte Daha Güçlü",
    subtitle: "Su Takibi + Saat Saat Bilgi",
    body: "Su tüketimini takip edin, milestone'larda bildirim alın ve birbirinizi motive edin. Üçünüz birlikte — 72 saat yapabilirsiniz!",
    accent: "#22c55e",
  },
];

export default function OnboardingPage() {
  const [slide, setSlide] = useState(0);
  const router = useRouter();
  const current = SLIDES[slide];
  const isLast = slide === SLIDES.length - 1;

  function next() {
    if (isLast) {
      localStorage.setItem(ONBOARDING_KEY, "true");
      router.push("/");
    } else {
      setSlide((s) => s + 1);
    }
  }

  return (
    <div className="fixed inset-0 bg-obsidian flex flex-col z-[200]">
      {/* Subtle radial glow from accent color */}
      <div
        className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[600px] rounded-full transition-all duration-700"
        style={{
          background: `radial-gradient(circle, ${current.accent}08 0%, transparent 70%)`,
        }}
      />

      <div className="flex-1 flex flex-col items-center justify-center px-8 text-center max-w-md mx-auto relative z-10">
        {/* Icon */}
        <div className="text-6xl mb-10 animate-droplet-float">{current.icon}</div>

        {/* Title — thin, elegant */}
        <h1 className="text-3xl font-extralight tracking-wider mb-2">
          {current.title}
        </h1>
        <p
          className="text-sm font-light tracking-wider mb-8"
          style={{ color: current.accent }}
        >
          {current.subtitle}
        </p>

        {/* Body — generous line height */}
        <p className="text-white/60 font-extralight leading-loose text-[15px]">
          {current.body}
        </p>
      </div>

      {/* Bottom controls */}
      <div className="px-8 pb-12 max-w-md mx-auto w-full relative z-10">
        {/* LED dots */}
        <div className="flex justify-center gap-3 mb-8">
          {SLIDES.map((_, i) => (
            <div
              key={i}
              className={`led-dot ${i === slide ? "led-dot-active" : ""}`}
              style={
                i === slide
                  ? {
                      background: current.accent,
                      boxShadow: `0 0 4px ${current.accent}, 0 0 12px ${current.accent}60, 0 0 24px ${current.accent}20`,
                    }
                  : undefined
              }
            />
          ))}
        </div>

        {/* Button — minimal, premium */}
        <button
          onClick={next}
          className="w-full py-4 rounded-2xl font-light text-base tracking-wider uppercase transition-all border"
          style={{
            borderColor: `${current.accent}30`,
            color: current.accent,
            background: `${current.accent}08`,
          }}
        >
          {isLast ? "Başlayalım" : "Devam"}
        </button>

        {/* Skip */}
        {!isLast && (
          <button
            onClick={() => {
              localStorage.setItem(ONBOARDING_KEY, "true");
              router.push("/");
            }}
            className="w-full py-3 text-slate-text/50 text-[11px] font-light tracking-wider uppercase mt-2"
          >
            Atla
          </button>
        )}
      </div>
    </div>
  );
}
