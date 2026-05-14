# 🎲 DiceForge

**Zar tabanlı roguelike savaş oyunu.** 5 zarı at, Yahtzee tarzı combolar oluştur ve her raundda güçlenen düşmanları yen.

---

## Konsept

Gambonanza ve Balatro'nun viral "multiplier roguelike" trendinden ilham alan DiceForge, zar mekaniklerini turn-based savaşla birleştiriyor. Basit ama derin: her raund daha fazla hasar almak için en iyi combo'yu kurgulamaya çalışıyorsun.

---

## Oynanış

| Adım | Açıklama |
|------|-----------|
| 🎲 Roll | 5 zarı at (tur başına maksimum 3 kez) |
| 🔒 Hold | İstediğin zarları kilitle, geri kalanları yeniden at |
| ⚔️ Attack | Elindeki combo ile düşmana saldır |
| 💀 Survive | Düşman seni öldürmeden önce kaç raundu geçebilirsin? |

### Combo Tablosu

| Combo | Hasar |
|-------|-------|
| High Card | 1–6 |
| Pair | 15 |
| Two Pair | 30 |
| Three of a Kind | 45 |
| Straight | 60 |
| Full House | 80 |
| Four of a Kind | 100 |
| Five of a Kind | 150 |

### Savaş Dengesi

- Oyuncu: 100 HP ile başlar, her raund arası +20 HP iyileşir
- Düşman HP: `40 + round × 20`
- Düşman saldırısı: `8 + round × 3` hasar/tur

---

## Kurulum

```bash
cd apps/2026-05-14-diceforge
npm install
npx expo start
```

QR kodu ile Expo Go uygulamasında aç veya web için `w` tuşuna bas.

---

## Teknik Stack

- **Expo SDK 52** + React Native 0.76.3
- Ekstra UI kütüphanesi yok — saf StyleSheet
- State yönetimi: React `useState` hooks
- Navigasyon: tek `App.js` üzerinden screen state

---

## Dosya Yapısı

```
diceforge/
├── App.js                    # Ana entry, screen router
├── src/
│   ├── screens/
│   │   ├── HomeScreen.js     # Başlangıç ekranı + combo tablosu
│   │   ├── GameScreen.js     # Ana oyun döngüsü
│   │   └── GameOverScreen.js # Skor & rank ekranı
│   └── components/
│       ├── DiceRoller.js     # 5 zar + hold mekanizması
│       ├── EnemyBar.js       # Düşman HP çubuğu
│       └── ComboDisplay.js   # Aktif combo göstergesi
└── assets/                   # Görsel placeholder'lar
```

---

## Ekran Görüntüleri

> `expo start` sonrası Expo Go veya web tarayıcısında görüntülenebilir.

- **HomeScreen** — Karşılama, kurallar ve combo tablosu
- **GameScreen** — Zar atma, hold/reroll, saldırı, battle log
- **GameOverScreen** — Final skoru, round sayısı, rank rozeti (Novice → Legendary)

---

## Geliştirme Fikirleri

- Güç yükselticileri (raundlar arası: +hasar, +HP, ekstra reroll)
- Boss düşmanlar (her 5 raundda)
- Günlük challenge modu
- Yüksek skor tablosu (AsyncStorage)
- Animasyonlu zar atma efekti
