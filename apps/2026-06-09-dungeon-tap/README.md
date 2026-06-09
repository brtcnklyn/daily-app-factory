# ⚔️ DungeonTap — Kart Tabanlı Roguelike

Canavar öldür. Kata ilerle. Ne kadar derine inebilirsin?

## Konsept

DungeonTap, her turda 3 kart arasından seçim yaparak canavarlarla dövüştüğün bir roguelike kart oyunudur. Kazanmak için saldır, savun, iyileş — ama karar hızlı ver, canavar her turda saldırıyor.

## Özellikler

- **12 farklı kart** — Saldırı, savunma, iyileştirme ve özel kart tipleri
- **6 benzersiz canavar** — Slime'dan Dragon'a kadar artan zorluk
- **Sonsuz katlar** — 6. kattan sonra Demon Lord sonsuz güçlenerek devam eder
- **Kişisel rekor** — Oturum boyunca en derin kat takip edilir
- **Anlık geri bildirim** — Canavar saldırısı 900ms gecikmeli animasyon

## Kart Tipleri

| Tip | Renk | Efekt |
|-----|------|-------|
| ⚔️ Saldırı | Kırmızı | Canavara hasar verir |
| 🛡️ Savunma | Mavi | Kalkan ekler, o turdaki hasarı azaltır |
| 💚 İyileştirme | Yeşil | HP yeniler |
| 🔄 Özel | Mor | Hasar + kalkan kombinasyonu |

## Canavar Listesi

1. 🟢 Slime — 30 HP, 8 ATK
2. 👺 Goblin — 50 HP, 12 ATK
3. 💀 Skeleton — 65 HP, 16 ATK
4. 👹 Orc — 85 HP, 20 ATK
5. 🧛 Vampire — 110 HP, 25 ATK
6. 🐉 Dragon — 150 HP, 30 ATK
7+ 😈 Demon Lord — ∞ güçlenen

## Kurulum

```bash
# 1. Bağımlılıkları yükle
npm install

# 2. Expo ile başlat
npx expo start

# 3. Telefonda Expo Go uygulamasıyla QR kodu tara
#    veya Android/iOS simülatörde aç
```

**Gereksinimler:** Node.js 18+, Expo Go (mobil) veya Android/iOS simülatörü

## Proje Yapısı

```
dungeon-tap/
├── App.js                    # Ana uygulama, ekran yönetimi
├── src/
│   ├── screens/
│   │   ├── HomeScreen.js     # Ana menü + nasıl oynanır
│   │   ├── GameScreen.js     # Oyun döngüsü ve kart mekanikleri
│   │   └── GameOverScreen.js # Sonuç ekranı + sıralama
│   ├── components/
│   │   ├── CardComponent.js  # Tekil kart bileşeni
│   │   ├── HeroStats.js      # Kahraman HP + kalkan göstergesi
│   │   └── MonsterDisplay.js # Canavar emoji + HP çubuğu
│   └── data/
│       ├── cards.js          # Kart tanımları + rastgele seçim
│       └── monsters.js       # Canavar verileri + kat üretici
└── assets/                   # Görsel varlıklar (placeholder)
```

## Ekran Görüntüleri

```
┌──────────────────────────┐
│ 🧙 Hero         Floor 3  │
│ ❤️ ████████░░  75/100   │
├──────────────────────────┤
│                          │
│        👹  Orc           │
│  ❤️ ████░░░  40/85      │
│     ⚔️ 20 damage/turn   │
│                          │
├──────────────────────────┤
│  Monster attacks for 20! │
├──────────────────────────┤
│ ┌────┐  ┌────┐  ┌─────┐ │
│ │ ⚔️ │  │ 🛡️ │  │ 🔥  │ │
│ │Str │  │Def │  │Fire │ │
│ │15  │  │10  │  │ 30  │ │
│ └────┘  └────┘  └─────┘ │
└──────────────────────────┘
```

## İlham

Google Play Haziran 2026 trend listesinden **God Rivals: RPG Roguelike** ilham kaynağıdır. Slay the Spire tarzı kart seçimi mekaniği mobil formatla birleştirilmiştir.

---

*Günün uygulaması — 2026-06-09*
