# DeckDungeon ⚔️

> Kart çekerek zindan düşmanlarını yen — roguelike bir kart savaş oyunu.

## Konsept

Her turda 4 karttan birini seçersin: **Saldır**, **Kalkan** veya **İyileştir**. Düşman her tur sana vurur. 6 kattan sağ çıkarsan kazanırsın. Her koşu farklıdır.

**İlham:** Balatro ve Gambonanza'nın 2026'daki roguelike kart oyunu trendinden doğdu.

---

## Ekranlar

| Ekran | Açıklama |
|-------|----------|
| **Ana Menü** | Oyun kuralları ve "Zindana Gir" butonu |
| **Oyun** | Düşman HP, oyuncu HP, 4 kartlık el, tur mesajı |
| **Sonuç** | Temizlenen kat sayısı, kazandı/kaybetti, ipucu |

## Mekanikler

- **Saldır (⚔️):** Düşmana 6–14 hasar verir
- **Kalkan (🛡️):** Bir sonraki düşman saldırısını engeller
- **İyileştir (💚):** 5–10 HP yeniler
- Her kat geçildikçe düşman daha güçlü çıkar (Goblin → Dragon)
- Oyuncu 30 HP ile başlar, yenileme yok

## Kurulum

```bash
cd 2026-05-16-deck-dungeon
npm install
npx expo start
```

Ardından Expo Go uygulamasıyla QR kodu tara ya da simülatörde aç.

## Proje Yapısı

```
deck-dungeon/
├── App.js                     # Navigation kökü
├── app.json                   # Expo config
├── package.json
├── assets/                    # Görsel placeholder (icon, splash ekle)
└── src/
    ├── screens/
    │   ├── HomeScreen.js      # Ana menü
    │   ├── GameScreen.js      # Oyun döngüsü
    │   └── ResultScreen.js    # Sonuç ekranı
    └── components/
        ├── Card.js            # Oynanabilir kart bileşeni
        └── HealthBar.js       # HP çubuğu bileşeni
```

## Ekran Görüntüleri

> `assets/` klasörüne `icon.png` (1024×1024) ve `splash.png` (1284×2778) ekleyerek Expo varsayılanlarını değiştirebilirsin.

## Geliştirme Fikirleri

- AsyncStorage ile en iyi koşu kaydı
- Özel kart deskleri (başlangıçta seçim)
- Boss özel yetenekleri (zırh, çoğaltma)
- Animasyonlar (Animated API ile kart çekme)
- Ses efektleri (expo-av)
