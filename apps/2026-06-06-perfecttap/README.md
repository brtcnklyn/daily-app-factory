# ◎ PerfectTap

> Genişleyen halka tam hedef halkaya denk geldiğinde dokun. Ne kadar mükemmelsin?

---

## Konsept

PerfectTap, tek bir mekanik üzerine kurulu hassas zamanlama oyunudur. Ekran merkezinden dışa doğru genişleyen bir halka var — o halka sabit küçük hedef halkayı geçtiği anda dokunman gerekiyor. 10 tur, 3 zorluk seviyesi, paylaşılabilir skor.

**Viralitenin sebebi:** "Mükemmel" anı yakalamak kolay görünür ama zordur. Skor paylaşımı emoji dizisiyle ("🟡🟢🔴🟡🟡...") Wordle tarzı viral döngü yaratır.

---

## Ekranlar

| Ekran | Açıklama |
|---|---|
| **Home** | Zorluk seçimi, kişisel rekorlar, nasıl oynanır |
| **Game** | Ana oyun döngüsü — 10 tur, anlık rating |
| **Result** | Skor, harf notu, tur-tur döküm, paylaş |

---

## Özellikler

- **3 zorluk:** Easy (2s), Medium (1.2s), Hard (0.65s) pulse süresi
- **Anlık puanlama:** PERFECT (+100) / GOOD (+50) / MISS (+0)
- **Harf notu:** S / A / B / C / D — maksimum 1000 puan üzerinden
- **Kişisel rekor:** Her zorluk için AsyncStorage'a kaydedilir
- **Paylaşım:** Native Share sheet ile emoji skor kartı

---

## Kurulum

```bash
# 1. Bağımlılıkları yükle
npm install

# 2. Expo uygulamasını başlat
npx expo start

# 3. QR kodu Expo Go (iOS/Android) ile tara
```

**Gereksinim:** Node 18+, Expo Go uygulaması

---

## Proje Yapısı

```
2026-06-06-perfecttap/
├── App.js                        # Navigation container
├── app.json                      # Expo config
├── package.json
├── assets/                       # Görseller için (placeholder)
└── src/
    ├── screens/
    │   ├── HomeScreen.js         # Zorluk seçimi + rekorlar
    │   ├── GameScreen.js         # Ana oyun döngüsü
    │   └── ResultScreen.js       # Skor + paylaşım
    ├── components/
    │   └── PulseRing.js          # Animasyonlu halka bileşeni
    └── utils/
        └── scoring.js            # Puan hesaplama + zorluk config
```

---

## Teknik Detaylar

- **Animasyon:** `Animated.timing` + `Easing.linear` (native driver)
- **Zamanlama:** `Date.now()` bazlı — frame bağımsız, deterministik
- **Mükemmellik penceresi:** ±120ms (Easy/Medium/Hard için aynı — oran değil, mutlak süre)
- **Kalıcı veri:** `@react-native-async-storage/async-storage`

---

## Ekran Görüntüleri

*(expo start sonrası cihazda çalıştır)*

---

## Geliştirme Fikirleri

- Çoklu oyuncu: aynı anda iki kişi, ilk mükemmeli yapan kazanır
- Günlük challenge: herkes aynı seed'le aynı turu oynar
- Ses efekti: perfect/good/miss için haptic feedback
