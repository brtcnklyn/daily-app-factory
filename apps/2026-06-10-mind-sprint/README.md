# Mind Sprint

Günlük hız matematiği uygulaması. Her gün 10 soru, her soru 5 saniye. Ne kadar hızlı yanıtlarsan o kadar çok puan!

## Konsept

10 adet toplama, çıkarma ve çarpma sorusunu mümkün olduğunca hızlı çözün. Skor, hem doğruluk hem de hıza göre hesaplanır. Günlük seri sistemi ve yüksek skor kaydıyla her gün geri döndürür.

## Özellikler

- 10 rastgele matematik sorusu (toplama, çıkarma, çarpma)
- Soru başına 5 saniyelik animasyonlu zamanlayıcı
- Hız bonusu sistemi: maksimum +50 puan/soru
- Günlük seri takibi (AsyncStorage ile cihazda saklanır)
- Yüksek skor kaydı ve kişisel rekor bildirimi
- Rank sistemi: Starter → Learner → Pro → Expert → Genius
- Soru bazlı performans döküm ekranı

## Puan Sistemi

| Durum | Puan |
|-------|------|
| Doğru cevap | 100 |
| Hız bonusu | 0–50 (kalan süreye orantılı) |
| Yanlış / süre dolması | 0 |
| **Maksimum** | **1500** |

## Rank Skalası

| Rank | Puan Aralığı |
|------|-------------|
| 🧠 Genius | 1400+ |
| ⚡ Expert | 1100–1399 |
| 🎯 Pro | 800–1099 |
| 📈 Learner | 500–799 |
| 🌱 Starter | 0–499 |

## Kurulum

```bash
npm install
npx expo start
```

Expo Go uygulamasıyla QR kodu okutarak telefonunuzda çalıştırın veya emülatör kullanın.

## Ekranlar

### Ana Ekran (HomeScreen)
- Uygulama başlığı ve açıklaması
- Günlük seri rozeti (🔥)
- En yüksek skor ve bugünün skoru
- "Start Today's Sprint" butonu
- Nasıl oynanır ve rank bilgisi

### Oyun Ekranı (GameScreen)
- İlerleme göstergesi (1/10 ... 10/10)
- Canlı puan sayacı (puanlarda animasyon)
- Renkli animasyonlu zamanlayıcı çubuğu (yeşil → sarı → kırmızı)
- Büyük font matematik sorusu
- 4 seçenek butonu (yeşil = doğru, kırmızı = yanlış, anlık feedback)

### Sonuç Ekranı (ResultScreen)
- Rank rozeti ve toplam puan
- Doğru sayısı, doğruluk oranı, seri
- Tüm soruların puan döküm tablosu
- "Play Again" ve "Home" butonları

## Teknoloji

- React Native + Expo SDK 52
- React Navigation v6 (native stack)
- @react-native-async-storage/async-storage
- Expo StatusBar
- React Native Animated API

## Proje Yapısı

```
mind-sprint/
├── App.js                    # NavigationContainer + Stack.Navigator
├── app.json                  # Expo config
├── package.json
├── babel.config.js
├── assets/                   # Uygulama ikonları (placeholder)
└── src/
    ├── screens/
    │   ├── HomeScreen.js     # Ana sayfa, istatistikler
    │   ├── GameScreen.js     # Oyun akışı, zamanlayıcı
    │   └── ResultScreen.js   # Sonuç ve puan detayı
    ├── components/
    │   ├── TimerBar.js       # Animasyonlu zamanlayıcı çubuğu
    │   ├── ScoreCounter.js   # Animasyonlu puan göstergesi
    │   └── StreakBadge.js    # Günlük seri rozeti
    └── utils/
        ├── questions.js      # Rastgele soru üretici
        └── storage.js        # AsyncStorage CRUD (skor, seri)
```
