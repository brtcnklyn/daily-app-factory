# FitFlash ⚡

> Her gün yeni bir antrenman. Streakini kırma.

## Konsept

FitFlash, her gün rastgele 4 vücut ağırlığı egzersizi üreten minimalist bir fitness uygulaması. Egzersizleri tamamla, streakini büyüt, geçmişini takip et. Ekipman yok, üyelik yok — sadece sen ve 60 saniye.

## İlham

Google Play fitness kategorisinin sürekli büyümesi ve "don't break the chain" (zinciri kırma) psikolojisinden ilham alındı. Wordle'ın her gün yeni içerik sunarak yarattığı bağımlılık modelini fitness'a uyarladı.

## Özellikler

- ⚡ **Günlük Rastgele Antrenman** — 18 egzersizlik havuzdan her gün farklı 4'lü kombinasyon
- 🔥 **Streak Sistemi** — Ardışık günleri takip et, rekorunu kır
- ⏱️ **Zamanlayıcı** — Her egzersiz için 15 saniyelik görsel sayaç + 5 saniyelik dinlenme
- 📊 **İlerleme Ekranı** — Toplam antrenman, egzersiz sayısı, en uzun streak
- 📱 **AsyncStorage** — Tüm veriler cihazda saklanır, internet bağlantısı gerekmez

## Ekranlar

| Ekran | Açıklama |
|-------|----------|
| **Home** | Günün antrenmanı, streak göstergesi, başlat butonu |
| **Workout** | Egzersiz sayacı, tamamla / sonraki geçişleri, dinlenme ekranı |
| **History** | Geçmiş antrenmanlar, istatistik kartları |

## Kurulum

```bash
# Bağımlılıkları yükle
npm install

# Expo geliştirme sunucusunu başlat
npx expo start
```

Telefonunda **Expo Go** uygulaması ile QR kod tarayarak test edebilirsin.

> Gereksinimler: Node.js 18+, Expo CLI (`npm i -g expo-cli`)

## Proje Yapısı

```
fitflash/
├── App.js                        # Navigation container (3 ekran)
├── app.json                      # Expo konfigürasyonu
├── package.json                  # Bağımlılıklar
├── src/
│   ├── screens/
│   │   ├── HomeScreen.js         # Günlük antrenman + streak
│   │   ├── WorkoutScreen.js      # Aktif antrenman + sayaç
│   │   └── HistoryScreen.js      # İstatistikler + geçmiş
│   ├── components/
│   │   ├── ExerciseCard.js       # Egzersiz kartı bileşeni
│   │   └── TimerCircle.js        # Dairesel zamanlayıcı bileşeni
│   └── utils/
│       └── workoutEngine.js      # Egzersiz havuzu + rastgele seçici
└── assets/                       # Görseller (placeholder)
```

## Teknolojiler

- **React Native** via Expo ~51
- **React Navigation** — Native Stack
- **AsyncStorage** — Yerel veri saklama (streak, geçmiş, günlük antrenman)
- **React Native Animated** — Pulse animasyonu

## Ekran Görüntüleri

> `npx expo start` ile önizleme yapabilirsin.

---

*FitFlash — Basit tut. Her gün yap.*
