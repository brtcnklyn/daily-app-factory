# ✨ Aura Points

**Aura Puanlarını Takip Et, Hayatını Gamifiye Et**

Gen Z'nin viral "aura" kültüründen ilham alan günlük puan takip uygulaması. Her gün yaptığın şeyleri logla — spor, erken kalkma, gece yarısı pizzası, yabancıya yardım — ve aura puanı kazan. Ne kadar "aura sahibisin"?

---

## Özellikler

| Özellik | Açıklama |
|---------|----------|
| **Ana Ekran** | Toplam aura puanı, günlük değişim (+/-), streak sayacı |
| **Event Ekle** | 18 hazır etkinlik + sınırsız özel etkinlik desteği |
| **Leaderboard** | Mock rakiplerle + kendi puanınla karşılaştır |
| **Kalıcı Veri** | AsyncStorage ile veriler cihazda saklanır, uygulama kapansa da kaybolmaz |
| **Streak Sistemi** | Her gün en az bir event logla, ateşini sürdür! |
| **Aura Seviyeleri** | 5 seviye: Padawan → God |

## Aura Seviyeleri

| Seviye | Puan Aralığı | Renk |
|--------|-------------|------|
| Aura Padawan | 0 – 499 | Gri |
| Aura Awakening | 500 – 999 | Mavi |
| Aura Rising | 1,000 – 1,999 | Mor |
| Aura Legend | 2,000 – 3,499 | Altın |
| Aura God | 3,500+ | Kırmızı |

## Kurulum

```bash
# 1. Bağımlılıkları yükle
npm install

# 2. Expo geliştirme sunucusunu başlat
npx expo start
```

Expo Go uygulamasını (iOS veya Android) indir, terminalden çıkan QR kodu tara ve uygulama açılsın.

> **Web için:** `npx expo start --web` komutunu kullan.

## Ekran Açıklamaları

### Ana Ekran (Home)
- Büyük aura sayacı — toplam puanın ve günlük değişim
- Sağ üst: 🔥 streak sayacı
- Alt: bugün logladığın eventlerin listesi (en yeni üstte)
- Sağ alt: mor `+` butonu ile hızlıca event ekle

### Event Ekle (Add Event)
- **Aura Gains** — 14 olumlu etkinlik kartı (spor, meditasyon, kitap okuma…)
- **Aura Drains** — 4 olumsuz etkinlik kartı (doomscroll, idman kaçırmak…)
- **Custom Event** — kendi emoji + açıklama + puan gir

### Leaderboard
- 7 mock rakip + senin puanın sıralanır
- Senin sıran ve toplam puanın banner'da gösterilir

## Teknik Detaylar

- **Framework:** React Native (Expo SDK 52)
- **Navigasyon:** React Navigation v6 — Bottom Tabs
- **Depolama:** `@react-native-async-storage/async-storage`
- **UI:** %100 custom `StyleSheet` — dış UI kütüphanesi yok
- **Tema:** Dark mode — arka plan `#0a0a1a`, vurgu: mor `#7c3aed` / altın `#f59e0b`

## Proje Yapısı

```
aura-points/
├── App.js                        # NavigationContainer + Tab.Navigator
├── app.json                      # Expo config
├── package.json
├── babel.config.js
├── assets/                       # Placeholder (icon, splash)
└── src/
    ├── screens/
    │   ├── HomeScreen.js         # Ana sayfa
    │   ├── AddEventScreen.js     # Event loglama
    │   └── LeaderboardScreen.js  # Sıralama tablosu
    ├── components/
    │   ├── AuraCard.js           # Puan göstergesi kartı
    │   └── EventItem.js          # Tek event satırı
    └── utils/
        ├── auraData.js           # Preset eventler + seviye hesaplama
        └── storage.js            # AsyncStorage CRUD + streak mantığı
```

## İlham

- **Kaynak trend:** ChatGPT ve AI uygulamaları 2026'da uygulama mağazalarına hakim (55.9M indirme/ay)
- **Viral mekanik:** Gen Z "aura" kültürü — her eylem için mistik bir değer atfetme trendi
- **Gamification:** Streak + seviye sistemi → günlük kullanım alışkanlığı yaratır → paylaşılabilir içerik
