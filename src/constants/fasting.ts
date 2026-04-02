// 6-phase fasting system based on scientific research
export const FASTING_PHASES = [
  {
    id: "digestion",
    hours: 0,
    name: "Sindirim",
    nameEn: "Digestion",
    color: "#f97316",
    description: "Vücut son yemeği sindiriyor. Kan şekeri ve insülin yüksek.",
    tip: "Bol su iç, vücudun geçişe hazırlanıyor.",
  },
  {
    id: "metabolic-switch",
    hours: 4,
    name: "Geçiş",
    nameEn: "Metabolic Switch",
    color: "#eab308",
    description: "Glikojen depoları azalıyor, vücut yağ yakımına geçiş sinyalleri veriyor.",
    tip: "Açlık dalgaları normal — geçici, su iç ve bekle.",
  },
  {
    id: "fat-burning",
    hours: 12,
    name: "Yağ Yakımı",
    nameEn: "Fat Burning",
    color: "#22c55e",
    description: "Metabolik geçiş başladı! Vücut yağları birincil yakıt olarak kullanıyor. Keton üretimi başlıyor.",
    tip: "Ketonlar yükseliyor, hafif enerji artışı hissedebilirsin.",
  },
  {
    id: "autophagy",
    hours: 18,
    name: "Otofaji",
    nameEn: "Autophagy",
    color: "#3b82f6",
    description: "Hücreler hasarlı proteinleri temizlemeye başladı. BDNF artar, nöroplastisite desteklenir.",
    tip: "Hücresel temizlik aktif — bu saatler altın değerinde.",
  },
  {
    id: "ketosis",
    hours: 24,
    name: "Ketoz",
    nameEn: "Ketosis",
    color: "#a855f7",
    description: "Derin ketoz. Büyüme hormonu 5 katına kadar artabilir. Bağışıklık yenilenmesi başlıyor.",
    tip: "Elektrolit dengesi önemli: tuz, potasyum, magnezyum.",
  },
  {
    id: "renewal",
    hours: 48,
    name: "Yenilenme",
    nameEn: "Renewal",
    color: "#f59e0b",
    description: "Kök hücre üretimi artıyor. Bağışıklık sistemi sıfırlanma sürecinde. IGF-1 düşmüş.",
    tip: "48+ saat oruç tıbbi gözetim altında yapılmalı. Orucu yavaş boz.",
  },
] as const;

export type FastingPhaseId = (typeof FASTING_PHASES)[number]["id"];

// Fasting presets
export const FASTING_PRESETS = [
  { label: "16:8", hours: 16, description: "Intermittent fasting — başlangıç" },
  { label: "18:6", hours: 18, description: "Otofaji başlangıcı" },
  { label: "20:4", hours: 20, description: "Warrior diet" },
  { label: "OMAD", hours: 24, description: "Günde tek öğün — derin ketoz" },
  { label: "36 Saat", hours: 36, description: "Uzatılmış oruç" },
  { label: "48 Saat", hours: 48, description: "Bağışıklık yenilenmesi" },
  { label: "72 Saat", hours: 72, description: "Tam yenilenme — doktor kontrolünde" },
] as const;

// Milestone messages shown at specific hours
export const MILESTONE_MESSAGES = [
  { hours: 4, title: "Sindirim Tamamlandı", message: "Vücudun enerji kaynağını değiştirmeye hazırlanıyor." },
  { hours: 8, title: "Glikojen Azalıyor", message: "Yağ yakımı yaklaşıyor! Az kaldı." },
  { hours: 12, title: "Metabolik Geçiş!", message: "Artık yağ yakıyorsun. Tebrikler!" },
  { hours: 14, title: "HGH Yükseliyor", message: "Büyüme hormonu artıyor — kasların korunuyor." },
  { hours: 16, title: "Otofaji Başlıyor", message: "Hücreler kendini temizlemeye başladı." },
  { hours: 18, title: "Ketonlar Yükseliyor", message: "Beynin yeni yakıtıyla tanışıyor." },
  { hours: 20, title: "Derin Yağ Yakımı", message: "Harika gidiyorsun! İnsülin duyarlılığı artıyor." },
  { hours: 24, title: "24 Saat!", message: "İltihaplanma düşüyor, insülin duyarlılığı artıyor." },
  { hours: 30, title: "Otofaji Dorukta", message: "Hücrelerin kapsamlı onarımda." },
  { hours: 36, title: "HGH Zirvede", message: "Büyüme hormonu zirve yapıyor. Vücudun yenilenme modunda." },
  { hours: 48, title: "48 Saat!", message: "Bağışıklık sistemi sıfırlanmaya başlıyor." },
  { hours: 60, title: "Kök Hücre", message: "Kök hücre üretimi artıyor. Vücudun yeniden inşa ediyor." },
  { hours: 72, title: "72 Saat!", message: "İnanılmaz bir başarı. Vücudun tamamen yenilenmiş." },
] as const;

// Water tracking
export const WATER_GOAL_ML = 2500;
export const WATER_GLASS_ML = 250;
export const WATER_REMINDERS_HOURS = [2, 4, 6, 8, 10, 12] as const;

// Medical disclaimer
export const MEDICAL_DISCLAIMER =
  "Bu uygulama yalnızca bilgilendirme amaçlıdır ve tıbbi tavsiye yerine geçmez. Herhangi bir oruç programına başlamadan önce doktorunuza danışın. Özellikle mevcut sağlık sorunlarınız varsa veya ilaç kullanıyorsanız, mutlaka tıbbi onay alın.";

// Who should NOT fast
export const FASTING_CONTRAINDICATIONS = [
  "Hamile veya emziren kadınlar",
  "18 yaş altı bireyler",
  "Tip 1 diyabet hastaları",
  "Yeme bozukluğu geçmişi olanlar",
  "BMI 18.5 altında olanlar",
  "Aktif enfeksiyonu olanlar",
  "İnsülin veya kan sulandırıcı kullananlar",
] as const;

// Re-feeding guidance
export const REFEEDING_TIPS = [
  "Orucu yavaş ve hafif yiyeceklerle boz",
  "Kemik suyu veya sebze çorbası ile başla",
  "Küçük porsiyonlarla başla, 30 dakika bekle",
  "İlk 2 saat ağır yiyeceklerden kaçın",
  "Bol su içmeye devam et",
] as const;
