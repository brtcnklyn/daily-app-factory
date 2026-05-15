# DungeonSlide ⚔️

> Günün uygulaması — 15 Mayıs 2026

Kaydır, altın topla, düşmanlardan kaç. Basit roguelike — sadece parmağın yeter.

---

## Nasıl Oynanır?

| Hareket | Etki |
|---------|------|
| Kaydır (↑↓←→) | Oyuncu 1 adım hareket eder |
| 💰 Altına bas | +10 puan, altın kaybolur |
| 💀 Düşmana çarp | Oyun biter |
| Tüm altınlar bitti | Yeni zindan, daha fazla düşman |

**Kritik kural:** Her hamlenin ardından düşmanlar sana **bir adım** yaklaşır. Köşeye sıkışırsan kurtulmak zor!

---

## Kurulum

```bash
# Bağımlılıkları kur
npm install

# Expo başlat
npx expo start
```

Expo Go uygulamasıyla QR kodu tarat ya da emülatörde çalıştır.

### Gereksinimler
- Node.js 18+
- Expo CLI (`npm install -g expo-cli`) veya `npx expo`
- iOS Simulator / Android Emulator / Expo Go

---

## Ekranlar

### 🏠 Ana Ekran
Oyunu başlat, en yüksek skoru görüntüle, oyun kurallarına bak.

### ⚔️ Oyun Ekranı
5×5 zindan ızgarası. Üstte skor, seviye ve kalan altın sayısı. Kaydırarak oyna.

### 💀 Oyun Bitti Ekranı
Final skoru, kişisel rekor, "Tekrar Oyna" ve "Ana Menü" seçenekleri.

---

## Proje Yapısı

```
2026-05-15-dungeonslide/
├── App.js                    # Ekran yöneticisi (home / game / gameover)
├── app.json                  # Expo konfigürasyonu
├── package.json
├── assets/
└── src/
    ├── screens/
    │   ├── HomeScreen.js     # Ana ekran
    │   ├── GameScreen.js     # Oyun mantığı + PanResponder
    │   └── GameOverScreen.js # Skor ekranı
    └── components/
        ├── GameGrid.js       # 5×5 ızgara renderer
        ├── Tile.js           # Bireysel karo (boş / oyuncu / düşman / altın)
        └── HUD.js            # Skor / seviye / kalan altın göstergesi
```

---

## Teknik Detaylar

- **React Native** (Expo SDK 51) — saf StyleSheet, ekstra UI kütüphanesi yok
- **PanResponder** — kaydırma kontrolü
- **useRef pattern** — PanResponder'ın eski closure sorununu aşmak için
- Tüm oyun state'i tek atomik `gs` objesi ile yönetilir
- Düşman hareketi: dominant eksende en yakın adım (Manhattan mesafesi)

---

## İlham

- **RogueSlide** — Pocket Gamer, 14 Mayıs 2026 "Bu haftanın oyunu" listesi
- **Wordle** — Basit günlük bulmaca formatının viral gücü
- **Classic roguelikes** — Turn-based hareket, tehlike-ödül dengesi
