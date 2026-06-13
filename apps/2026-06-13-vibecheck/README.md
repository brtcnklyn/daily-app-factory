# VibeCheck ✨

> Günlük ruh halini seç, kişiselleştirilmiş challenge al, tamamla ve paylaş.

## Konsept

VibeCheck, her gün nasıl hissettiğini sorarak sana özel kısa bir wellness görevi (challenge) öneren bir mobil uygulamadır. 6 farklı mood kategorisi (Mutlu, Üzgün, Endişeli, Heyecanlı, Yorgun, Sakin) ve 18 farklı görev içerir. Tamamladığın görevler geçmişe kaydedilir, sosyal medyada paylaşılabilir.

## Ekranlar

| Ekran | Açıklama |
|-------|----------|
| **Home** | Ruh hali seçimi (6 emoji kart) + "Get My Challenge" butonu |
| **Challenge** | Görev kartı, built-in stopwatch, "Mark as Done" |
| **Completion** | Kutlama ekranı + sosyal paylaşım |
| **History** | Geçmiş tüm challengelar, AsyncStorage'dan yüklenir |

## Teknolojiler

- **Expo SDK 51** (React Native 0.74)
- **React Navigation Stack** — ekran yönetimi
- **AsyncStorage** — lokal geçmiş saklama
- **Share API** — native paylaşım

## Kurulum

```bash
# Bağımlılıkları kur
npm install

# Uygulamayı başlat
npx expo start

# Telefonda aç: Expo Go uygulamasını indir → QR kodu tara
```

### Gereksinimler
- Node.js 18+
- Expo Go (iOS / Android)

## Proje Yapısı

```
vibecheck/
├── App.js                    # Ana entry point, navigation kurulumu
├── app.json                  # Expo konfigürasyonu
├── package.json
├── src/
│   ├── screens/
│   │   ├── HomeScreen.js     # Mood seçim ekranı
│   │   ├── ChallengeScreen.js# Görev + timer ekranı
│   │   └── HistoryScreen.js  # Geçmiş log ekranı
│   ├── components/
│   │   ├── MoodPicker.js     # 6-kart mood seçici
│   │   └── ChallengeCard.js  # Görev kartı UI
│   └── data/
│       └── challenges.js     # 18 görev verisi + getRandomChallenge()
└── assets/                   # İkon ve splash (placeholder)
```

## Özellikler

- Mood bazlı challenge eşleştirme (her mood için 3 seçenek, rastgele)
- Built-in stopwatch (başlat/duraklat)
- AsyncStorage ile persist edilen geçmiş (son 50 kayıt)
- Native Share API ile achievement paylaşımı
- Renk kodlu mood geçmişi

## Ekran Görüntüleri

> `expo start` sonrası Expo Go ile tarayarak görebilirsin.

**Home Screen:** Tarih başlığı → 6 emoji mood kartı → "Get My Challenge" butonu  
**Challenge Screen:** Görev kartı (emoji + açıklama + süre) → Stopwatch → "Mark as Done"  
**History Screen:** Renk kodlu mood daireleri → Görev adı, süre, tarih

## Geliştirme Fikirleri

- Push notification ile günlük ruh hali hatırlatması
- Streak sayacı (kaç gün üst üste challenge tamamladın)
- Mood trend grafiği (haftalık/aylık)
- Claude API entegrasyonu ile AI-generated kişisel challengelar
