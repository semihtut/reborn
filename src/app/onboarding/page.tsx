"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

const ONBOARDING_KEY = "waterfast_onboarded";

const SLIDES = [
  {
    emoji: "💧",
    title: "Hoş geldin!",
    subtitle: "Leo & Hasan'ın 72 Saatlik Su Orucu Macerasına",
    body: "Bu uygulama sadece ikiniz için yapıldı. 72 saatlik su orucunda vücudunuzda neler olduğunu saat saat takip edeceksiniz.",
    bg: "from-sky-950 to-slate-950",
  },
  {
    emoji: "🔬",
    title: "Bilim Destekli",
    subtitle: "6 Aşamalı Oruç Takibi",
    body: "Sindirim → Metabolik Geçiş → Yağ Yakımı → Otofaji → Ketoz → Yenilenme. Her aşamada vücudunuzda ne olduğunu bileceksiniz.",
    bg: "from-purple-950 to-slate-950",
  },
  {
    emoji: "🧬",
    title: "Otofaji & Yenilenme",
    subtitle: "Hücresel Temizlik Aktif",
    body: "18. saatte otofaji başlıyor — hücreleriniz kendini temizliyor. 48. saatte bağışıklık sisteminiz sıfırlanmaya başlıyor. 72. saatte tam yenilenme.",
    bg: "from-blue-950 to-slate-950",
  },
  {
    emoji: "💪",
    title: "Birlikte Daha Güçlü",
    subtitle: "Su Takibi + Saat Saat Bilgi",
    body: "Su tüketimini takip edin, milestone'larda bildirim alın ve birbirinizi motive edin. 72 saat — yapabilirsiniz!",
    bg: "from-green-950 to-slate-950",
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
    <div className={`fixed inset-0 bg-gradient-to-b ${current.bg} flex flex-col z-[200]`}>
      <div className="flex-1 flex flex-col items-center justify-center px-8 text-center max-w-md mx-auto">
        {/* Emoji */}
        <div className="text-7xl mb-8 animate-bounce">{current.emoji}</div>

        {/* Title */}
        <h1 className="text-3xl font-bold mb-2">{current.title}</h1>
        <p className="text-sky-400 font-medium mb-6">{current.subtitle}</p>

        {/* Body */}
        <p className="text-slate-300 leading-relaxed">{current.body}</p>
      </div>

      {/* Bottom controls */}
      <div className="px-8 pb-12 max-w-md mx-auto w-full">
        {/* Dots */}
        <div className="flex justify-center gap-2 mb-6">
          {SLIDES.map((_, i) => (
            <div
              key={i}
              className={`h-2 rounded-full transition-all duration-300 ${
                i === slide ? "w-8 bg-sky-400" : "w-2 bg-slate-600"
              }`}
            />
          ))}
        </div>

        {/* Button */}
        <button
          onClick={next}
          className="w-full py-4 bg-sky-600 hover:bg-sky-500 active:bg-sky-700 rounded-2xl font-semibold text-lg transition-colors"
        >
          {isLast ? "Başlayalım! 🚀" : "Devam"}
        </button>

        {/* Skip */}
        {!isLast && (
          <button
            onClick={() => {
              localStorage.setItem(ONBOARDING_KEY, "true");
              router.push("/");
            }}
            className="w-full py-3 text-slate-500 text-sm mt-2"
          >
            Atla
          </button>
        )}
      </div>
    </div>
  );
}
