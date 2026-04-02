// Fixed 72-hour water fast
export const FAST_DURATION_HOURS = 72;

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

// Medical disclaimer
export const MEDICAL_DISCLAIMER =
  "Bu uygulamayı kullanabilmen için aşağıdaki şartları sağlaman gerekir. Aksi takdirde 72 saat oruç tutmak yerine 72 saat aim practice yapmanı öneririz.";

// Who should NOT fast
export const FASTING_CONTRAINDICATIONS = [
  "CS2'de aimi olmayanlar (crosshair placement nedir bilmeyenler)",
  "Kulaksızlar — footstep duyamıyorsan oruç da tutamazsın",
  "Kolsuzlar — spray transfer yapamayan eli titreyen tipler",
  "Info vermeyi bilmeyenler — 'bi yerde' diye callout verenler",
  "Sadece kendi istatistikleri için oynayanlar — baitçiler",
  "Her round force buy atanlar — ekonomi bilmeyenler",
  "Öldükten sonra rage quit atanlar — sabırsızlar oruç tutamaz",
  "Smoke'un içinden peek atanlar — karar verme yetisi sıfır",
  "Rush B dışında strateji bilmeyenler",
  "Clutch anında konuşmaya devam edenler — sus da oruç tut",
  "AWP miss edip 'lag var' diyenler",
  "Fake flash atmayı bilmeyenler — temel yaşam becerisi",
] as const;

// Re-feeding guidance
export const REFEEDING_TIPS = [
  "Orucu yavaş ve hafif yiyeceklerle boz",
  "Kemik suyu veya sebze çorbası ile başla",
  "Küçük porsiyonlarla başla, 30 dakika bekle",
  "İlk 2 saat ağır yiyeceklerden kaçın",
  "Bol su içmeye devam et",
] as const;
