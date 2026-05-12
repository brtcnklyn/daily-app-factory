# MoodPet 🐾

> Sanal evcil hayvanın, senin ne kadar iyi hissettiğinle büyür.

## Konsept

MoodPet, Finch ve benzeri self-care uygulamalarından ilham alan bir günlük ruh hali takip uygulamasıdır. Her gün ruh halini kaydet, günlük alışkanlıklarını tamamla ve evcil hayvanın sağlıklı kalsın. Alışkanlıklarını ihmal edersen evcil hayvanın mutsuzlaşır; ilgilenirsen seviye atlar.

**Tek cümle:** Günlük alışkanlıklarını tamamladıkça büyüyen ve mutlulanan bir sanal evcil hayvan.

## Özellikler

- **Ruh Hali Check-in** — Her gün 5 mood seçeneğinden birini seç (Amazing → Rough)
- **Günlük Alışkanlıklar** — 5 varsayılan alışkanlık, tamamlandıkça evcil hayvanın sağlığı artar
- **Sanal Evcil Hayvan** — Sağlık yüzdesine göre değişen emoji + zıplama animasyonu
- **Streak Takibi** — Arka arkaya check-in günleri sayılır, her 7 günde seviye atlanır
- **Haftalık Mood Grafiği** — Son 7 günün ruh hali renkli noktalarla gösterilir
- **İstatistikler** — Ortalama ruh hali, evcil hayvan seviyesi, sonraki seviye için kalan gün

## Ekranlar

| Ekran | Açıklama |
|-------|----------|
| **My Pet** | Evcil hayvan, sağlık barı, günlük check-in butonu |
| **Habits** | Alışkanlık listesi, tamamlama durumu, ilerleme barı |
| **Stats** | Streak, seviye, haftalık mood geçmişi, istatistikler |

## Kurulum

```bash
# Bağımlılıkları yükle
npm install

# Geliştirme sunucusunu başlat
npx expo start

# Expo Go uygulaması ile QR kodu tara veya emülatörde aç
```

### Gereksinimler

- Node.js 18+
- Expo CLI (`npm install -g @expo/cli`)
- iOS: Expo Go uygulaması veya Xcode Simulator
- Android: Expo Go uygulaması veya Android Emulator

## Proje Yapısı

```
moodpet/
├── App.js                    # Navigasyon ve provider kurulumu
├── app.json                  # Expo konfigürasyonu
├── package.json
├── babel.config.js
├── assets/                   # Uygulama ikonları (placeholder)
└── src/
    ├── store.js              # Global state (Context API)
    ├── screens/
    │   ├── HomeScreen.js     # Pet + mood check-in
    │   ├── HabitsScreen.js   # Günlük alışkanlıklar
    │   └── StatsScreen.js    # Streak ve istatistikler
    └── components/
        ├── PetAvatar.js      # Animasyonlu evcil hayvan
        ├── HabitItem.js      # Tıklanabilir alışkanlık satırı
        └── MoodPicker.js     # Bottom sheet mood seçici
```

## Teknik Detaylar

- **Framework:** React Native (Expo SDK 52)
- **Navigasyon:** React Navigation — Bottom Tabs
- **State:** React Context API (in-memory, restart'ta sıfırlanır)
- **UI:** React Native StyleSheet — ekstra UI kütüphanesi yok
- **Animasyon:** React Native Animated API (bounce loop)

## Ekran Görüntüleri

```
┌─────────────────┐  ┌─────────────────┐  ┌─────────────────┐
│    MoodPet      │  │  Daily Habits   │  │   Your Stats    │
│  Wednesday...   │  │                 │  │                 │
│  🔥 3 day streak│  │  💧 Water  [✓]  │  │  🔥 4  ⭐ Lv.1  │
│                 │  │  🏃 Exercise[ ] │  │                 │
│  "Doing okay"   │  │  😴 Sleep  [✓]  │  │  Mood Week:     │
│      😺         │  │  📚 Read   [ ]  │  │  ○ ● ○ ● ● ○ ● │
│                 │  │  🧘 Meditate[ ] │  │                 │
│  [Check In ✨]  │  │                 │  │  Habits: 2/5    │
└─────────────────┘  └─────────────────┘  └─────────────────┘
```

## İlham

**Finch: Self-Care Pet** — Google Play'de Mayıs 2026 trending listesinde yer alan, kullanıcıların günlük hedefler tamamlayarak sanal bir kuşu büyüttüğü uygulama. MoodPet bunun daha minimalist ve mood-odaklı bir yorumudur.

---

*2026-05-12 günün uygulaması — daily-apps serisinin bir parçası.*
