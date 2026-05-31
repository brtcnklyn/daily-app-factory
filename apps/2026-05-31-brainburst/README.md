# BrainBurst ⚡

60 saniyede 10 soru — beynini test et, skorunu geliştir, serisini kır.

## Konsept

BrainBurst, hızlı tempolu günlük trivia quiz uygulamasıdır. Her oyunda 30 soruluk havuzdan rastgele seçilen 10 soru gelir ve 60 saniye sayaç başlar. Ne kadar çok doğru cevap verirsen, sıralaman yükselir. Her gün oyna, serisini devam ettir.

## Özellikler

- **60 Saniyelik Geri Sayım** — Renkli zamanlayıcı bar ile hız baskısı
- **10 Rastgele Soru** — Coğrafya, bilim, matematik, kültür ve daha fazlası
- **Skor Sıralaması** — Beginner → Learning → Sharp → Expert → Legend
- **Günlük Seri** — Her gün oynayarak serisini sürdür
- **Kişisel Rekor** — En yüksek skorunu takip et
- **Anlık Geri Bildirim** — Doğru/yanlış animasyonu

## Kurulum

```bash
npm install
expo start
```

Expo Go uygulamasıyla QR kodu tara veya simülatörde çalıştır.

## Ekranlar

| Ekran | Açıklama |
|-------|----------|
| **Home** | Seri, rekor, sıralama rozeti ve başlat butonu |
| **Quiz** | Aktif oyun — soru, 4 seçenek, geri sayım |
| **Result** | Skor özeti, yeni rekor bildirimi, tekrar oyna |

## Soru Kategorileri

- Coğrafya (başkentler, okyanuslar, kıtalar)
- Bilim (elementler, gezegenler, biyoloji)
- Matematik (aritmetik, geometri)
- Kültür (sanat, spor, teknoloji)
- Tarih (uzay yarışı, önemli isimler)

## Teknik Yığın

- React Native + Expo ~52
- React Navigation (Native Stack)
- AsyncStorage — skor ve seri kalıcılığı
- React Native Animated API — geçiş animasyonları

## Ekran Görüntüleri

```
┌─────────────────┐   ┌─────────────────┐   ┌─────────────────┐
│   BrainBurst ⚡  │   │  [████████░░] 42s│   │       🏆        │
│                 │   │  3 / 10  Score:2 │   │     8/10        │
│       ⚡        │   │                 │   │     80%         │
│   BrainBurst   │   │ What is the     │   │  Excellent! ⚡   │
│                │   │ capital of      │   │                 │
│  Best: 8/10    │   │ Japan?          │   │ Time: 38s       │
│  🔥 5 streak   │   │                 │   │ 🔥 6 streak     │
│  Games: 12     │   │ [Seoul]         │   │                 │
│                │   │ [Beijing]       │   │ [Play Again ⚡]  │
│ [Start Quiz ⚡] │   │ [✓ Tokyo]       │   │ [Back to Home]  │
│                │   │ [Bangkok]       │   │                 │
└─────────────────┘   └─────────────────┘   └─────────────────┘
```
