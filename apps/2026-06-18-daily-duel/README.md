# DailyDuel

Her gün yeni bir **5 harfli kelimeyi 6 hamlede** tahmin et. Sonucunu emoji grid olarak paylaş.

Wordle formatının rekabetçi, koyu-tema versiyonu. Pokemon Champions'ın başlattığı "her gün savaş" trendinden ilham alındı.

---

## Ekranlar

| Ekran | Açıklama |
|-------|----------|
| **Home** | İstatistikler (oyun sayısı, kazanma %, seri), "Bugünün Düellosu" butonu |
| **Game** | 6×5 harf ızgarası, renk kodlu klavye, canlı süre sayacı |
| **Result** | Kazandın/Kaybettin ekranı, emoji grid, sistem paylaşım diyaloğu |

### Oyun Kuralları
- Her gün sabit 1 kelime var (tarih bazlı, herkeste aynı)
- 6 deneme hakkın var
- Her tahminden sonra renkli geri bildirim:
  - 🟩 **Yeşil** — doğru harf, doğru konum
  - 🟨 **Sarı** — doğru harf, yanlış konum
  - ⬛ **Gri** — harf kelimede yok

---

## Kurulum

```bash
# 1. Bağımlılıkları kur
npm install

# 2. Expo geliştirme sunucusunu başlat
npx expo start

# 3. Telefonda QR kodu tarat (Expo Go uygulaması gerekli)
#    veya Android/iOS emülatöründe çalıştır:
#    npx expo start --android
#    npx expo start --ios
```

**Gereksinimler:** Node.js 18+, Expo Go (iOS/Android)

---

## Proje Yapısı

```
2026-06-18-daily-duel/
├── App.js                       # Navigasyon kökü
├── app.json                     # Expo config
├── package.json
├── babel.config.js
├── assets/                      # İkon & splash placeholder
└── src/
    ├── screens/
    │   ├── HomeScreen.js        # Ana ekran + istatistikler
    │   ├── GameScreen.js        # Oyun mantığı + klavye
    │   └── ResultScreen.js      # Sonuç + paylaş
    ├── components/
    │   ├── WordGrid.js          # 6×5 animasyonlu ızgara
    │   └── Keyboard.js          # Renkli QWERTY klavye
    └── utils/
        └── words.js             # Kelime listesi + günlük kelime + değerlendirme
```

---

## Ekran Görüntüleri

> Expo Go ile çalıştırıldıktan sonra eklenecek.

---

## Teknik Detaylar

- **Framework:** React Native (Expo SDK 52)
- **Navigasyon:** React Navigation v6 (Native Stack)
- **Kalıcı Veri:** AsyncStorage (istatistikler cihazda saklanır)
- **Animasyon:** React Native Animated API (tile bounce, satır sallama)
- **Paylaşım:** React Native Share API
- **UI:** Sadece StyleSheet — ekstra kütüphane yok

---

## İlham

- **Pokemon Champions** (Haziran 2026) → "her gün rekabetçi meydan okuma" trendini popüler yaptı
- **Wordle** → viral paylaşılabilir emoji grid formatı
- **Dark mode & neon accent** → 2026 mobil UI estetik trendi
