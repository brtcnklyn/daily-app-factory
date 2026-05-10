# CardRogue ⚔️🃏

> **Günlük Uygulama Fabrikası — 10 Mayıs 2026**

## Konsept

Zindanda kat kat ilerle, her turda sana rastgele verilen 3 karttan birini seç, düşmanları yen. Kat geçtikçe düşmanlar güçleniyor, ama her zaferden sonra biraz iyileşiyorsun. Ne kadar ileri gidebilirsin?

**İlham:** Gambonanza (chess roguelike) + Balatro — Mayıs 2026'nın viral kart roguelike trendi

---

## Kurulum

```bash
cd 2026-05-10-cardrogue
npm install
npx expo start
```

Expo Go uygulamasını telefonuna yükle, QR kodu okut ve oyna.

---

## Ekranlar

| Ekran | Açıklama |
|-------|----------|
| **Ana Menü** | Kart önizleme, kurallar, dungeon'a giriş butonu |
| **Savaş** | Düşman HP, oyuncu HP, 3 kart seçeneği, battle log |
| **Oyun Sonu** | Rank sistemi, istatistikler, tekrar oyna |

---

## Kart Listesi

| Kart | Tür | Etki |
|------|-----|------|
| ⚔️ Strike | Saldırı | 10–18 hasar |
| 🛡️ Block | Savunma | Kalkan kaldır + 5 hasar |
| 🔥 Fireball | Saldırı | 22–30 hasar |
| 💚 Heal | İyileşme | 12–18 HP yenile |
| ☠️ Poison | Saldırı | 8 hasar + 3 tur zehir (6/tur) |
| ⚡ Double Strike | Saldırı | 8+8 hasar |

---

## Düşmanlar

| Düşman | Kat | HP | Saldırı |
|--------|-----|----|---------|
| 👺 Goblin | 1–2 | 25–35 | 6–10 |
| 💀 Skeleton | 3–4 | 32–46 | 8–13 |
| 👹 Orc | 5–6 | 45–60 | 12–17 |
| 🧛 Vampire | 7–8 | 55–72 | 14–20 |
| 🐉 Dragon | 9+ | 70–90 | 18–25 |

---

## Rank Sistemi

- 🌱 **Novice** — Kat 1–3
- ⚔️ **Warrior** — Kat 4–6
- ⭐ **Hero** — Kat 7–9
- 👑 **Legend** — Kat 10+

---

## Teknolojiler

- **React Native** + **Expo SDK 51**
- **React Navigation** (Native Stack)
- Saf **StyleSheet** ile koyu tema UI — ekstra UI kütüphanesi yok
- Tüm oyun mantığı client-side, state ile yönetiliyor
- Animated API ile kart press + düşman shake efektleri
