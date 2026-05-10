# Günün Uygulaması — Otomatik Üretim Görevi

Bugün: {DATE}
Çalışma klasörü: {APPS_DIR}

Senin görevin **bir mobil uygulama fikri bulup React Native scaffold'u üretmek**. Şu adımları sırayla izle:

## Adım 1: Trend Araştırması
WebSearch kullanarak şu sorgulardan **en az 3 tanesini** çalıştır:
- "top trending apps {DATE}"
- "viral mobile games this week"
- "google play top free apps"
- "app store trending apps today"

Çıktıyı **özet** olarak işle: 5–10 popüler uygulamayı not al (isim, kategori, ne yapıyor).

## Adım 2: Fikir Seçimi
Bulduğun listeden **indirme potansiyeli en yüksek** olanı seç. Kriter:
- Basit konsept (1 cümleyle anlatılabilir)
- 1 günde scaffold edilebilir karmaşıklık
- Viral olma potansiyeli (eğlence, sosyal, AI, oyun)

Seçimini **kısa gerekçeyle** açıkla.

## Adım 3: Uygulama Üretimi
`{APPS_DIR}/{DATE}-uygulama-adi/` klasörü aç. İçine **çalışan bir React Native (Expo) projesi** kur:

Gerekli dosyalar:
- `package.json` — Expo bağımlılıkları
- `app.json` — Expo config
- `App.js` — ana giriş noktası
- `src/screens/` — en az 2-3 ekran
- `src/components/` — yeniden kullanılabilir bileşenler
- `assets/` — placeholder görseller (oluşturma, sadece klasör)
- `README.md` — uygulama açıklaması, kurulum, ekran görüntüleri kısmı

**Önemli:**
- Kod **gerçekten çalışır** olmalı (npm install + expo start sonrası açılmalı)
- Sade ve modern UI (StyleSheet ile, ekstra UI kütüphanesi gerekmesin)
- En az 1 işlevsel özellik (sadece tasarım değil)
- Türkçe yorum satırı yok, kod İngilizce; README Türkçe

## Adım 4: Üst Düzey README
`{APPS_DIR}/INDEX.md` dosyasına bugünün girdisini ekle (yoksa oluştur):

```
## {DATE} — [Uygulama Adı]
**Konsept:** Tek cümle özet
**İlham:** Hangi trend uygulamadan
**Klasör:** ./{DATE}-uygulama-adi/
```

## Adım 5: Bitir
Tamamlandığında bana **2 satır özet** yaz:
1. Bugünün uygulamasının adı ve konsepti
2. Klasör yolu

Hatırlatma: Sadece scaffold üret, gerçek görseller ekleme. Çalışan kod + güzel README en önemli çıktı.
