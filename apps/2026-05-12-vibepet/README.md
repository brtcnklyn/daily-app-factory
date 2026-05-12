# VibePet 🐾

**Günlük ruh halin, evcil hayvanını büyütür.**

Finch uygulamasından ilham alınan VibePet; her gün nasıl hissettiğini kaydeden, süregelen streakine göre sanal evcil hayvanını evrimleştiren bir self-care uygulamasıdır.

---

## Konsept

Her gün bir "vibe check" yaparsın. Seçtiğin ruh halini kaydettikçe evcil hayvanın büyür. Streaki kesersen hayvanın büyümesi durur — ama yeniden başlayabilirsin!

**5 Evrim Aşaması:**

| Streak | Evcil Hayvan |
|--------|-------------|
| 0 gün  | 🥚 Egg — Henüz kuluçkada |
| 1–3 gün | 🐣 Hatchling — Uyanıyor |
| 4–7 gün | 🐥 Chick — Büyüyor |
| 8–14 gün | 🐓 Rooster — Gelişiyor |
| 15+ gün | 🦋 Butterfly — Dönüşüm tamamlandı! |

---

## Özellikler

- **Günlük Vibe Check** — 5 farklı ruh hali seçeneği (Great / Good / Okay / Low / Stressed) + isteğe bağlı not
- **Evrimleşen Evcil Hayvan** — Streak uzadıkça evcil hayvan emoji ile büyür
- **Streak Takibi** — Ardışık günlerin sayısı, kırılırsa sıfırdan başlar
- **Haftalık İstatistikler** — Son 7 günün ruh hali geçmişi ve dağılım grafiği
- **Offline-first** — Tüm veriler cihazda (AsyncStorage) saklanır, internet gerekmez
- **Minimalist UI** — Ekstra kütüphane yok, saf React Native StyleSheet

---

## Ekranlar

| Ekran | Açıklama |
|-------|----------|
| 🐾 **My Pet** | Evcil hayvanın, günün durumu, streak rozetleri |
| ✨ **Check In** | Günlük ruh hali seçimi ve not girişi |
| 📊 **Stats** | 7 günlük geçmiş, mood dağılım çubukları |

---

## Kurulum

```bash
npm install
npx expo start
```

Expo Go uygulamasıyla QR kodu tarat ya da emülatörde çalıştır.

### Gereksinimler

- Node.js 18+
- Expo CLI (`npm install -g expo-cli`)
- iOS Simulator / Android Emulator veya Expo Go uygulaması

---

## Teknik Detaylar

- **Framework**: React Native + Expo SDK 51
- **Navigasyon**: React Navigation 6 (Bottom Tabs)
- **Depolama**: `@react-native-async-storage/async-storage`
- **Stil**: React Native StyleSheet (ekstra UI kütüphanesi kullanılmadı)

### Proje Yapısı

```
2026-05-12-vibepet/
├── App.js                     # Navigation container + tab setup
├── app.json                   # Expo config
├── package.json
├── babel.config.js
├── assets/                    # Placeholder (görseller eklenecek)
└── src/
    ├── screens/
    │   ├── HomeScreen.js      # Pet görünümü + bugünün durumu
    │   ├── CheckInScreen.js   # Günlük ruh hali kaydı
    │   └── StatsScreen.js     # 7 günlük istatistikler
    ├── components/
    │   ├── PetAvatar.js       # Streak'e göre evcil hayvan bileşeni
    │   └── MoodBadge.js       # Ruh hali rozeti bileşeni
    └── utils/
        └── storage.js         # AsyncStorage CRUD + MOODS sabitleri
```

---

## Ekran Görüntüleri

_(Expo Start sonrası ekran görüntüleri eklenecek)_

---

## İlham

**Finch** (App Store'da trending self-care pet app) + 2026'nın AI wellness trendi. Evcil hayvan büyütme mekaniğini günlük mood tracking ile birleştiren basit, bağımlılık yapıcı bir döngü oluşturur.
