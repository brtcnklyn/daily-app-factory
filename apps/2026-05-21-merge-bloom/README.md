# 🌱 Merge & Bloom

**Bitkileri birleştir, bahçeni büyüt!**

Merge & Bloom, 5×5 ızgara üzerinde bitkileri birleştirerek puan kazandığın addictive bir mobil puzzle oyunudur. Aynı bitkiyi iki kez birleştirince daha yüksek seviyeli yeni bir bitki ortaya çıkar. Grid dolana kadar birleştirmeye devam et!

---

## Oynanış

1. Bir bitkiye dokun → seçilir (yeşil kenarlık)
2. Bitişiğindeki **aynı** bitkiye dokun → birleşir, puan kazanırsın!
3. Bitişiğindeki **boş hücreye** dokun → bitkiyi taşı
4. Grid tamamen dolduğunda ve hiç birleştirilebilir çift kalmadığında oyun biter

## Birleştirme Zinciri

```
🌱 → 🌿 → 🌳 → 🌸 → 🍎 → 🌟 → 💎 → 🏆 → 🔥 → ✨ → 🌈 → 👑
```

Her birleşim → bir üst seviye bitki + (2^level × 10) puan

---

## Ekranlar

| Ekran | Açıklama |
|---|---|
| **Ana Ekran** | En yüksek skor gösterimi, oyuna başlama, zincir önizleme |
| **Oyun Ekranı** | 5×5 grid, canlı skor, seçim/taşıma/birleştirme |
| **Skor Ekranı** | Final skor, kişisel rekor tebriği, tekrar oyna / ana menü |

---

## Kurulum

```bash
# Bağımlılıkları yükle
npm install

# Geliştirme sunucusunu başlat
npx expo start

# Android emülatöründe aç
npx expo start --android

# iOS simülatöründe aç
npx expo start --ios

# Tarayıcıda aç
npx expo start --web
```

**Gereksinimler:** Node.js 18+, Expo CLI, Android/iOS emülatör veya Expo Go uygulaması

---

## Proje Yapısı

```
merge-bloom/
├── App.js                    # Navigation container, Stack navigator
├── app.json                  # Expo konfigürasyonu
├── package.json
├── babel.config.js
├── assets/                   # Görseller (placeholder)
└── src/
    ├── store.js              # In-memory best score store
    ├── screens/
    │   ├── HomeScreen.js     # Ana menü, en yüksek skor
    │   ├── GameScreen.js     # Oyun mantığı, grid yönetimi
    │   └── ScoreScreen.js    # Oyun sonu ekranı
    └── components/
        ├── EmojiCell.js      # Tek hücre: emoji + renk + seçim efekti
        └── MergeGrid.js      # 5×5 grid, responsive genişlik
```

---

## Teknik Detaylar

- **Çerçeve:** React Native (Expo SDK 51)
- **Navigasyon:** React Navigation v6 (native stack)
- **State:** React `useState` / `useCallback` hooks
- **UI:** Tamamen StyleSheet — ekstra UI kütüphanesi yok
- **Skor Saklama:** In-memory (oturum içi, kapanınca sıfırlanır)

---

## İlham Kaynağı

*Cats & Soup: Magic Recipe* (2026 merge oyun trendi) — cosy, addictive, tek dokunuşla oynanabilir merge mekaniği.

---

## Ekran Görüntüleri

> `assets/` klasörüne `home.png`, `game.png`, `score.png` eklenecek.
