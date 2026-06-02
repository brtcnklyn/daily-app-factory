# ✨ DailyVibes

Ruh halinizi seçin, kişiselleştirilmiş "vibe" okumanızı alın, günlük serinizi koruyun.

## Konsept

DailyVibes, her sabah 8 ruh hali seçeneğinden birini seçmenizi sağlar. Seçiminize göre özel bir "vibe" ismi, afirmasyon ve günün görevi verir. Sonucu paylaşabilir, gün serisi (streak) oluşturarak motivasyonunuzu yüksek tutabilirsiniz.

## Özellikler

- **8 farklı ruh hali** — Happy, Excited, Calm, Thoughtful, Tired, Stressed, Sad, Energized
- **Kişiselleştirilmiş vibe okuması** — her mood için benzersiz isim, renk paleti ve afirmasyon
- **Günlük görev** — "Today's Challenge" ile küçük ama anlamlı bir eylem önerisi
- **Streak takibi** — AsyncStorage ile yerel kayıt, günlük seri takibi
- **Paylaşım** — vibe'ınızı sosyal medyada paylaşmaya hazır metin
- **Dinamik renk temaları** — her vibe kendi arka plan ve vurgu rengini getirir
- **Akıcı animasyonlar** — React Native Animated API ile spring/fade geçişler

## Kurulum

```bash
# Bağımlılıkları yükle
npm install

# Expo geliştirici sunucusunu başlat
npx expo start
```

Expo Go uygulamasıyla QR kodu okutun veya emülatörde açın.

```bash
npx expo start --android   # Android
npx expo start --ios       # iOS
npx expo start --web       # Tarayıcı
```

## Gereksinimler

- Node.js 18+
- [Expo Go](https://expo.dev/client) (telefonda test için)

## Proje Yapısı

```
2026-06-02-daily-vibes/
├── App.js                       # Navigation container, stack tanımı
├── app.json                     # Expo yapılandırması
├── package.json
├── babel.config.js
├── src/
│   ├── screens/
│   │   ├── HomeScreen.js        # Ana ekran — streak, tarih, başlat butonu
│   │   ├── MoodPickerScreen.js  # 8 mood'dan seçim ekranı
│   │   └── VibeResultScreen.js  # Vibe sonuç ekranı — animasyonlu reveal
│   ├── components/
│   │   ├── StreakBadge.js       # Seri sayacı rozeti
│   │   ├── MoodCard.js          # Seçilebilir mood kartı bileşeni
│   │   └── VibeCard.js          # Vibe sonuç kartı bileşeni
│   └── data/
│       └── vibes.js             # Mood listesi ve vibe okumaları
└── assets/                      # Görseller (placeholder)
```

## Ekran Akışı

```
HomeScreen
    ↓ "Get My Vibe" butonu
MoodPickerScreen
    ↓ Mood seçimi + "Reveal" butonu
VibeResultScreen
    ↓ "Done" butonu
HomeScreen (streak güncellendi)
```

## Vibe'lar

| Mood       | Vibe Adı       | Renk    |
|------------|---------------|---------|
| Happy      | Golden Hour   | Sarı    |
| Excited    | Electric Surge| Kırmızı |
| Calm       | Still Waters  | Mavi    |
| Thoughtful | Deep Cosmos   | Mor     |
| Tired      | Quiet Storm   | Gri     |
| Stressed   | Phoenix Flame | Kırmızı |
| Sad        | Gentle Rain   | Lacivert|
| Energized  | Solar Flare   | Turuncu |

## İlham

ChatGPT, 2026 Ocak ayında 55.9M indirmeyle app store'ların zirvesine oturdu. AI-kişiselleştirme + günlük alışkanlık + viral paylaşım üçgeninin patlama yaptığı bu dönemde DailyVibes, "AI vibe coach" formatını mobil günlük rutine taşıyor.
