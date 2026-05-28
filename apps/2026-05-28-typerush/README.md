# TypeRush ⌨️

**Günlük Hız Yazma Meydan Okuma Uygulaması**

## Konsept

Her gün yeni bir metin çıkar, mümkün olduğunca hızlı ve doğru yaz. WPM (Words Per Minute — dakika başı kelime) skorunu takip et, günlük zincirini koru ve kendi rekorunu kır!

## Özellikler

- ⌨️ **Günlük Meydan Okuma** — Her gün farklı bir metin (14 gün döngüsü)
- 📊 **Canlı WPM Sayacı** — Yazarken anlık hız ve süre gösterimi
- 🎨 **Renkli Karakter Takibi** — Doğru harfler yeşil, yanlışlar kırmızı renk kodlu
- 🏆 **Not Sistemi** — D / C / B / A / S performans değerlendirmesi
- 🔥 **Günlük Zincir** — Kaç gün üst üste oynandığını takip eder
- 📈 **İstatistik Grafiği** — Son 7 oturumun WPM grafiği
- 💾 **Yerel Depolama** — Tüm veriler AsyncStorage ile cihazda saklanır
- 📋 **Paylaşılabilir Skor** — Skoru kopyalayıp sosyal medyada paylaş

## Ekranlar

| Ekran | Açıklama |
|-------|----------|
| **Ana Ekran** | Günlük zincir, en yüksek WPM, bugünün skoru veya başlat butonu |
| **Oyun Ekranı** | Metin önizleme → Canlı WPM + timer + renkli karakter takibi + yazı alanı |
| **İstatistik Ekranı** | Özet istatistikler + haftalık grafik + tüm geçmiş oturumlar |

## Kurulum

### Gereksinimler
- Node.js 18+
- Expo Go uygulaması (iOS/Android) **veya** emülatör/simülatör

### Adımlar

```bash
cd 2026-05-28-typerush
npm install
npx expo start
```

Ardından:
- **Expo Go ile:** QR kodu telefonunuzla tarayın
- **Android emülatör:** `a` tuşuna basın
- **iOS simülatör:** `i` tuşuna basın

## Nasıl Oynanır?

1. **Play** sekmesine git
2. Günün metnini oku
3. **Start Challenge** butonuna bas
4. Yukarıdaki metni **aşağıdaki yazı alanına** olabildiğince hızlı yaz
5. Metin tamamlandığında sonuç otomatik gösterilir
6. Skorunu paylaş, yarın tekrar dön!

## Not Sistemi

| Not | WPM | Açıklama |
|-----|-----|----------|
| S | 80+ | Speed Demon |
| A | 60+ | Fast Typer |
| B | 40+ | Above Average |
| C | 20+ | Warming Up |
| D | <20 | Keep Practicing |

## Ekran Görüntüleri

> *Buraya ekran görüntüleri eklenecek*

## Teknik Stack

- **React Native** (Expo SDK 52)
- **React Navigation** (Bottom Tabs v6)
- **AsyncStorage** — yerel veri saklama, internet bağlantısı gerekmez
- **StyleSheet** — saf RN styling, ekstra UI kütüphanesi yok

## İlham

ChatGPT'nin 2026 Ocak'ta 55.9M aylık indirme ile en çok indirilen uygulama olması ve "AI + üretkenlik" trendinden ilham alındı. Klavye hızı, motor beceri geliştirme ve günlük alışkanlık oluşturmanın birleşimi; TikTok tarzı kısa oturumlar ve paylaşılabilir skor kartı ile viral potansiyel taşıyor.
