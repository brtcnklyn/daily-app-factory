# Daily App Factory

Her gün otomatik olarak trend uygulamaları araştırıp benzer bir React Native scaffold üreten otomasyon.

## Nasıl Çalışır?

1. **Windows Task Scheduler** her gün belirli saatte `daily-app.ps1` çalıştırır
2. Script **Claude Code CLI**'ı çağırır
3. Claude:
   - Web'de trend uygulamaları araştırır
   - En yüksek potansiyelli fikri seçer
   - `apps/YYYY-MM-DD-uygulama-adi/` klasörüne React Native projesi üretir
4. Script GitHub'a push eder
5. Telegram'a bildirim gönderir

## Klasör Yapısı

```
daily-apps/
├── daily-app.ps1       # Ana otomasyon scripti
├── prompt.md            # Claude'a verilen talimat
├── config.json          # GitHub + Telegram ayarları
├── setup.md             # Kurulum rehberi
├── logs/                # Günlük loglar
└── apps/                # Üretilen uygulamalar
    ├── INDEX.md
    └── 2026-05-10-fooapp/
```

## Kurulum

`setup.md` dosyasını oku.

## Manuel Çalıştırma

```powershell
cd C:\Users\user\daily-apps
.\daily-app.ps1
```
