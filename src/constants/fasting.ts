export const FASTING_PRESETS = [
  { label: "16 Saat", hours: 16, description: "16:8 intermittent fasting" },
  { label: "24 Saat", hours: 24, description: "OMAD — günde tek öğün" },
  { label: "36 Saat", hours: 36, description: "Uzatılmış oruç" },
  { label: "48 Saat", hours: 48, description: "2 günlük oruç" },
  { label: "72 Saat", hours: 72, description: "3 günlük su orucu" },
] as const;

export const FASTING_PHASES = [
  { hours: 0, name: "Başlangıç", description: "Kan şekeri düşmeye başlar" },
  { hours: 12, name: "Ketoz Geçişi", description: "Vücut yağ yakmaya başlar" },
  { hours: 18, name: "Yağ Yakımı", description: "Keton üretimi artıyor" },
  { hours: 24, name: "Otofaji", description: "Hücresel temizlik başlıyor" },
  { hours: 48, name: "Derin Otofaji", description: "Büyüme hormonu artışı" },
  { hours: 72, name: "Bağışıklık Yenilenmesi", description: "Kök hücre rejenerasyonu" },
] as const;

export const WATER_GOAL_ML = 2500;
export const WATER_GLASS_ML = 250;
