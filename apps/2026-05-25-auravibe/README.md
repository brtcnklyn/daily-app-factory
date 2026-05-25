# ✨ AuraVibe

> Günlük auranı keşfet — 3 soruda enerji rengin ortaya çıksın.

## Konsept

AuraVibe, kullanıcının o anki enerji, duygu ve bağlantı durumunu 3 hızlı soruyla analiz eden ve buna karşılık gelen bir **aura rengi + kişilik tanımı** döndüren günlük check-in uygulamasıdır. TikTok'taki "aura culture" trendi + mood tracking + streak gamification kombinasyonudur.

## Ekranlar

| Ekran | Açıklama |
|-------|----------|
| **Home** | Streak sayacı, son aura önizlemesi, "Check My Aura" butonu |
| **Quiz** | 3 soruluk quiz (enerji / duygu / bağlantı), animasyonlu geçişler |
| **Result** | Aura rengi reveal animasyonu, açıklama metni, paylaşım butonu |
| **History** | Tüm geçmiş aura kayıtları, renkli kart listesi |

## Aura Sistemi

8 farklı aura mevcut:

| Aura | Renk | Temsil |
|------|------|--------|
| ☀️ Golden Sun | `#FFD700` | Yüksek enerji + neşe |
| 🔮 Violet Dream | `#7c3aed` | Sezgi + yaratıcılık |
| 🌊 Ocean Blue | `#0ea5e9` | Sakinlik + denge |
| 🌸 Rose Quartz | `#f472b6` | Empati + sevgi |
| 🌿 Forest Green | `#22c55e` | Köklülük + şifa |
| 🔥 Crimson Flame | `#ef4444` | Tutku + yoğunluk |
| 🌫️ Silver Mist | `#94a3b8` | İçe dönüklük + yansıma |
| 🌌 Cosmic Indigo | `#4338ca` | Gizemlilik + sezgi |

## Teknik Yapı

```
auravibe/
├── App.js                  # Navigation container
├── app.json                # Expo config
├── package.json
├── babel.config.js
├── assets/                 # İkon ve splash (placeholder)
└── src/
    ├── screens/
    │   ├── HomeScreen.js   # Ana sayfa
    │   ├── QuizScreen.js   # 3 soruluk quiz
    │   ├── ResultScreen.js # Aura reveal
    │   └── HistoryScreen.js # Geçmiş kayıtlar
    ├── components/
    │   └── AuraCircle.js   # Animasyonlu aura bileşeni
    └── utils/
        └── auraEngine.js   # Aura hesaplama motoru
```

## Kurulum

```bash
# Bağımlılıkları yükle
npm install

# Uygulamayı başlat
npx expo start

# Android / iOS
npx expo start --android
npx expo start --ios
```

**Gereksinimler:** Node.js 18+, Expo CLI, Android Studio veya iOS Simulator

## Özellikler

- Günlük aura kontrolü (3 soru, ~20 saniye)
- 8 farklı aura sonucu, her biri unique renk + açıklama
- AsyncStorage ile yerel geçmiş kaydı
- Streak sayacı
- Animasyonlu aura reveal (spring + glow animasyonu)
- Geçmişi listele ve temizle

## İlham

Netflix'in **Spirit Crossing** (mood + bağlantı teması) ve TikTok'ta viral olan "aura color" trend içeriklerinden ilham alındı. Günlük habit loop + paylaşılabilir sonuç = viral potansiyeli yüksek format.

---

*Üretildi: 2026-05-25*
