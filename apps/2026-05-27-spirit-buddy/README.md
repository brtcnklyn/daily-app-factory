# Spirit Buddy 🌟

Günlük ruh hali check-in'leriyle evrilen, kişisel ruh arkadaşın.

Her gün nasıl hissettiğini seç → ruhun şekil değiştirsin → streak'ini koru.

---

## Konsept

Spirit Buddy, günlük mood (ruh hali) takibi yaparak sanal bir ruh varlığını büyüttüğün minimal bir wellness uygulamasıdır. Ruhun son 7 günlük mood ortalamanına göre 6 farklı forma bürünür:

| Form | Emoji | Tetikleyici |
|------|-------|-------------|
| Awakening Spirit | 🌱 | Hiç giriş yok |
| Sleeping Spirit  | 💤 | Ort. < 1.5   |
| Weary Spirit     | 🌧️ | Ort. 1.5–2.4  |
| Calm Spirit      | 🌿 | Ort. 2.5–3.4  |
| Happy Spirit     | 🌟 | Ort. 3.5–4.4  |
| Radiant Spirit   | ✨ | Ort. ≥ 4.5   |

---

## Özellikler

- **Günlük check-in** — 5 mood seçeneği (Exhausted → Amazing)
- **Opsiyonel not** — o günü 200 karakter ile belgele
- **Spirit evrimi** — 7 günlük ortalamaya göre ruhun değişir
- **Streak takibi** — kaç gün üst üste check-in yaptığını gör
- **Mood geçmişi** — tüm girişler, istatistikler, en sık mood
- **Yerel depolama** — tüm veriler cihazında, sunucu yok

---

## Ekranlar

### Ana Ekran
- Güncel Spirit Buddy avatarı (emoji tabanlı, renk halesi)
- Aktif streak rozeti
- 7 günlük mood ortalaması
- Bugün giriş yapılmadıysa "Check in today" butonu

### Check-In Ekranı
- 5 mood butonu (renk kodlu, emoji ile)
- Opsiyonel not alanı
- "Feed your spirit" kayıt butonu

### Geçmiş Ekranı
- Tüm girişlerin listesi (tarih + mood + not)
- Özet kart: toplam giriş, ortalama mood, en sık mood

---

## Kurulum

```bash
# 1. Bağımlılıkları yükle
npm install

# 2. Expo ile başlat
npx expo start

# 3. QR kodu tara (Expo Go uygulaması gerekli)
#    veya Android/iOS emülatörde aç
```

### Gereksinimler
- Node.js 18+
- Expo CLI (`npm install -g expo-cli`)
- Expo Go uygulaması (telefon) veya emülatör

---

## Teknik Stack

| Katman | Teknoloji |
|--------|-----------|
| Framework | React Native + Expo SDK 52 |
| Navigasyon | React Navigation v6 (Bottom Tabs) |
| Depolama | AsyncStorage (yerel) |
| UI | StyleSheet (saf RN, harici kütüphane yok) |
| Görseller | Emoji (asset dosyası gerektirmez) |

---

## Proje Yapısı

```
spirit-buddy/
├── App.js                      # Navigasyon + tab bar kurulumu
├── app.json                    # Expo config
├── package.json
├── babel.config.js
├── assets/                     # Görseller için placeholder
└── src/
    ├── screens/
    │   ├── HomeScreen.js       # Ana ekran, ruh avatarı
    │   ├── CheckInScreen.js    # Günlük mood girişi
    │   └── HistoryScreen.js    # Geçmiş ve istatistikler
    ├── components/
    │   ├── SpiritAvatar.js     # Mood'a göre şekil değiştiren ruh
    │   ├── MoodButton.js       # Mood seçim butonu
    │   └── StreakBadge.js      # Streak rozeti
    └── utils/
        └── storage.js          # AsyncStorage CRUD + hesaplamalar
```

---

## İlham

Netflix'in **Spirit Crossing** oyununun (Mayıs 2026'da viral olan) "chill companion" konseptinden + 2026'nın en büyük app trendi olan **AI mood/wellness uygulamalarından** ilham alınmıştır.

---

## Geliştirme Fikirleri

- Push notification ile günlük check-in hatırlatması
- Mood istatistikleri için grafik (Victory Native)
- Arkadaşlarla spirit karşılaştırması (social layer)
- AI ile kişiselleştirilmiş mood önerileri (Claude API)
- Widget desteği (Expo Widgets)
