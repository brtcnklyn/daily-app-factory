# ⚔️ NameBlade

> **İsmin senin silahın.** — Adını gir, savaşçını oluştur, düşmanları yen.

## Konsept

NameBlade, kullanıcının adını savaş istatistiklerine dönüştüren turn-based bir mobil dövüş oyunudur. Her harf farklı bir güç katkısı sağlar:

- **Sesli harfler (a, e, i, o, u)** → Saldırı gücü
- **Ünsüz harfler** → Savunma
- **HP** → Tüm harflerin ASCII değerleri toplamı
- **Hız** → İsmin kısalığı (kısa isim = hızlı savaşçı)

Örnek: **"Alex"** → A(sesli)+E(sesli) = yüksek ATK, L+X = iyi DEF

## Ekranlar

| Ekran | Açıklama |
|-------|----------|
| **Home** | İsim girişi + anlık stat önizlemesi |
| **Battle** | Turn-based savaş, saldır butonuna bas, animasyonlu battle log |
| **Result** | Zafer/yenilgi ekranı, ismin güç puanı |
| **Leaderboard** | En güçlü isimler listesi (AsyncStorage) |

## Kurulum

```bash
cd 2026-06-07-nameblade
npm install
npx expo start
```

Ardından Expo Go uygulamasıyla QR kodu tara veya emülatör/simülatör aç.

## Gereksinimler

- Node.js 18+
- Expo Go (iOS/Android)
- `npm install` sonrası hazır

## Teknik Yapı

```
App.js                    # NavigationContainer + Stack Navigator
src/
  screens/
    HomeScreen.js         # İsim girişi, stat önizleme
    BattleScreen.js       # Savaş mekaniği, shake animasyon
    ResultScreen.js       # Sonuç, AsyncStorage kayıt
    LeaderboardScreen.js  # Kazanan isimler sıralaması
  components/
    HeroCard.js           # Savaşçı stat kartı
    StatBar.js            # HP/ATK/DEF/SPD gösterge çubuğu
    BattleLog.js          # Scrollable savaş günlüğü
  utils/
    nameEngine.js         # İsim → stat algoritması, düşman üretici
```

## Oyun Mekaniği

1. İsim gir → anlık olarak HP, ATK, DEF, SPD hesaplanır
2. "Enter Battle" → rastgele düşman üretilir
3. "Attack" butonuna her basışta bir round oynanır
4. Hız yüksek olan taraf önce vurur
5. Kazananlar Leaderboard'a kaydedilir

## İlham

WamojiSword (Haziran 2026'da trend olan, kullanıcının adını silaha dönüştüren Japon mobil oyunu)

---

**Geliştirici:** Daily Apps Project · 2026-06-07
