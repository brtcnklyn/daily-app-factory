# AuraPoints ✨

Günlük aura skorunu gir, vibe'larını etiketle, serini koru.

## Konsept

Her gün 0–100 arası bir **aura skoru** giriyorsun. Duolingo tarzı **streak** mekanikleri ile her gün giriş yapman için seni motive eder. Gen-Z "aura" kültürü + AI/sosyal uygulama trend dinamiklerinden ilham alındı.

## Özellikler

| Ekran | Ne Yapıyor |
|-------|------------|
| **Today** | Aura skorunu ayarla (−10/−1/+1/+10), vibe etiketleri seç, günlük check-in yap |
| **History** | Tüm geçmiş check-in'leri renk kodlu puanlarla listele |
| **Stats** | Mevcut seri, en uzun seri, ortalama aura, en yüksek gün, en sık vibe |

### Vibe Etiketleri
`🔥 Productive` · `💫 Main Character` · `🌀 Chaotic` · `😴 Low Battery`
`✨ Glowing Up` · `😎 Sigma Mode` · `🌸 Cozy Era` · `🖤 Villain Arc`

### Aura Seviyeleri
| Skor | Seviye |
|------|--------|
| 90–100 | Transcendent |
| 75–89 | Radiant |
| 60–74 | Elevated |
| 45–59 | Balanced |
| 30–44 | Dim |
| 0–29 | Depleted |

## Kurulum

```bash
npm install
expo start
```

Expo Go uygulamasını telefonuna indir ve terminaldeki QR kodu tara.

## Teknik Detaylar

- **Framework**: React Native + Expo SDK 51
- **Depolama**: `@react-native-async-storage/async-storage` — veriler cihazda yerel olarak saklanır
- **Navigasyon**: `@react-navigation/bottom-tabs`
- **UI**: Saf `StyleSheet`, ek UI kütüphanesi yok — koyu tema (#0D0D1A)

## Proje Yapısı

```
src/
├── screens/
│   ├── HomeScreen.js      # Günlük check-in
│   ├── HistoryScreen.js   # Geçmiş listesi
│   └── StatsScreen.js     # İstatistikler
├── components/
│   ├── AuraDisplay.js     # Skor gösterimi + renk fonksiyonları
│   ├── VibeTag.js         # Seçilebilir etiket
│   └── StreakBadge.js     # Seri rozeti
└── utils/
    └── storage.js         # AsyncStorage CRUD + streak hesaplama
```

## İlham

- **ChatGPT** — 2026'nın #1 indirilme sayısına sahip uygulaması
- **Duolingo** — streak mekaniği ile günlük bağlılık yaratma
- **TikTok** — Gen-Z "aura" trendi ve viral paylaşım kültürü
