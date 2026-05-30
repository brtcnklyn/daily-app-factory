# NameForge ⚔️

> Adını gir. Kahramanını yak.

Her isim, benzersiz bir fantasy savaşçısına dönüşür. NameForge, girdiğin ismi deterministik bir algoritmaya işleyerek sana özel bir kahraman üretir — sınıfı, istatistikleri, özel yeteneği ve gücü tamamen senin adının içinde saklı.

---

## Konsept

İsmini yaz → **Anında kahraman kart üret** → Koleksiyonuna kaydet.

Aynı isim her zaman aynı kahramanı verir. Bu sayede arkadaşlarınla karşılaştırabilir, kimin daha güçlü olduğunu görebilirsin.

---

## Özellikler

- **6 Farklı Sınıf:** Warrior, Mage, Rogue, Paladin, Ranger, Necromancer
- **4 İstatistik:** STR · INT · DEX · VIT (ismin harflerinden türetilir)
- **26 Özel Yetenek:** İsminin ilk harfine göre belirlenir
- **Seviye & Güç Puanı:** İsim uzunluğundan hesaplanır
- **Koleksiyon:** Kahramanlarını kaydet, görüntüle, sil
- **Deterministik Üretim:** Aynı isim = her zaman aynı kahraman

---

## Ekranlar

| Ekran | Açıklama |
|-------|----------|
| **Home** | İsim giriş alanı, Forge butonu, son kahramanlar özeti |
| **Hero** | Tam kahraman kartı — sınıf, istatistikler, özel yetenek |
| **Collection** | Kaydedilmiş tüm kahramanların listesi |

---

## Kurulum

```bash
# Bağımlılıkları yükle
npm install

# Expo geliştirme sunucusunu başlat
npx expo start
```

QR kodu Expo Go uygulamasıyla tara (iOS / Android) veya web için `w` tuşuna bas.

**Gereksinimler:** Node.js 18+, Expo Go uygulaması

---

## Teknik Detaylar

**Hero Üretim Algoritması (`src/utils/heroGenerator.js`)**

- Sınıf: Tüm karakter ASCII değerlerinin toplamı mod 6
- STR / INT / DEX / VIT: Harfler 4'erli gruplara ayrılır, her grubun toplamı normalize edilir (15–100 arası)
- Özel Yetenek: İsmin ilk harfine göre sabit bir tablo
- Seviye: İsim uzunluğu × 3 + hash bazlı varyasyon
- Güç Puanı: 4 istatistiğin ortalaması

---

## Ekran Görüntüleri

_(Expo Go ile çalıştır ve kendi isminle dene!)_

---

## İlham

WamojiSword (Pocket Gamer, 28 Mayıs 2026 haftanın oyunu) — ismi Kanji kılıca dönüştüren viral mobil oyun. NameForge aynı "isim → karakter" fikrini Western fantasy temasıyla ve deterministik kahraman üretimi mekanikmiyle güçlendirir.

---

**Üretim tarihi:** 2026-05-30 · Daily App Factory
