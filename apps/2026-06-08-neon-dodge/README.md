# Neon Dodge

> 3 şeritli neon engel kaçma oyunu — ne kadar uzun hayatta kalabilirsin?

## Konsept

Aşağı düşen parlak neon bloklardan ◀ ▶ butonlarıyla kaçın. Her 10 saniyede hız artar, kaç saniye hayatta kalabilirsin?

## Ekranlar

| Ekran | Açıklama |
|---|---|
| **Ana Ekran** | Oyuna başla, en yüksek skor, nasıl oynanır |
| **Oyun Ekranı** | 3 şeritli gerçek zamanlı dodge oyunu |
| **Liderboard** | AsyncStorage ile saklanan top 10 skor |

## Özellikler

- Gerçek zamanlı 3 şeritli engel kaçma (50ms game loop, ~20fps)
- Artan zorluk: her 10 saniyede hız +2 (başlangıç: 10, maksimum: 26 px/tick)
- Yerel liderboard (AsyncStorage) — top 10 skor kaydedilir
- Neon glow efektli karanlık tema (iOS shadow + Android elevation)
- Renkli obstacle sistemi: kırmızı / turuncu / sarı renk rotasyonu
- Oyun bitti overlay → Retry / Leaderboard / Home

## Kurulum

```bash
# Bağımlılıkları yükle
npm install

# Expo ile başlat
npx expo start
```

Expo Go uygulamasıyla (iOS/Android) ya da simülatörde aç.

### Gereksinimler

- Node.js 18+
- Expo CLI (`npm install -g @expo/cli`)
- iOS Simulator / Android Emulator veya Expo Go uygulaması

## Proje Yapısı

```
neon-dodge/
├── App.js                    # Navigation state (home/game/leaderboard)
├── app.json                  # Expo konfigürasyonu
├── src/
│   ├── screens/
│   │   ├── HomeScreen.js     # Ana menü + best score
│   │   ├── GameScreen.js     # Oyun döngüsü + collision detection
│   │   └── LeaderboardScreen.js  # AsyncStorage top 10
│   └── components/
│       ├── Player.js         # Neon oyuncu dairesi
│       ├── Obstacle.js       # Renkli neon engeller
│       └── ScoreDisplay.js   # HUD (skor + seviye)
└── assets/                   # Görseller buraya eklenir
```

## Oyun Mekaniği

- **3 şerit** — sola/sağa geçiş sınırsız
- **Engel hızı** — 10 px/tick başlar, 200 tick'te (10s) +2 artar
- **Spawn sıklığı** — her 25 tick'te (1.25s) rastgele bir şeritte engel çıkar
- **Skor** — her 20 tick'te (1 saniyede) +1 artar
- **Çarpışma** — oyuncu dikey konumunda engel üst/alt sınırını aşarsa game over

## Ekran Görüntüleri

> Expo Go ile açıldıktan sonra buraya eklenecek.

## İlham

Haziran 2026 trendlerinden: **Sonic Rumble** (hızlı arcade + artan zorluk) ve **Fruit Ninja Adventures** (klasik mekanik + skor progressionu).
