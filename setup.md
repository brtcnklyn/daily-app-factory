# Kurulum Rehberi

3 adımda kurulum: **Telegram Bot → GitHub → Task Scheduler**

---

## 1️⃣ Telegram Bot (5 dk)

### a) Bot oluştur
1. Telegram'da [@BotFather](https://t.me/BotFather)'ı aç
2. `/newbot` yaz
3. Bot adı sor: örn. `Daily App Factory`
4. Kullanıcı adı sor: örn. `daily_app_factory_bot` (sonu **bot** olmalı)
5. Sana verdiği **token**'ı kopyala (örn. `7123456789:AAH...`)

### b) Chat ID öğren
1. Yeni botuna `/start` mesajı at
2. Tarayıcıda aç: `https://api.telegram.org/bot<TOKEN>/getUpdates`
   - `<TOKEN>` yerine kendi token'ını yaz
3. JSON çıktısında `"chat":{"id":123456789` kısmındaki sayı senin **chat_id**'in

### c) config.json'a yaz
`C:\Users\user\daily-apps\config.json` dosyasını aç:
```json
{
  "telegram": {
    "token": "7123456789:AAH...",
    "chat_id": "123456789"
  }
}
```

---

## 2️⃣ GitHub Repo

### a) Repo aç
1. https://github.com/new
2. Repository name: **daily-app-factory**
3. Public veya Private (sen seç)
4. **README, .gitignore, license eklemeden** "Create repository"

### b) Local repo bağla
PowerShell aç:
```powershell
cd C:\Users\user\daily-apps
git init
git branch -M main
git remote add origin https://github.com/brtcnklyn/daily-app-factory.git
git add .
git commit -m "initial: daily app factory kurulumu"
git push -u origin main
```

### c) Git kimlik doğrulama
İlk push'ta GitHub kullanıcı adı + **Personal Access Token** isteyecek (parola değil).
- https://github.com/settings/tokens → "Generate new token (classic)"
- `repo` izni ver
- Token'ı kopyala, parola yerine yapıştır
- Windows Credential Manager kaydeder, bir daha sormaz

---

## 3️⃣ Manuel Test

```powershell
cd C:\Users\user\daily-apps
.\daily-app.ps1
```

Çalıştığını doğrula:
- ✅ `apps/2026-05-10-...` klasörü oluştu mu?
- ✅ GitHub'a push gitti mi?
- ✅ Telegram'a bildirim geldi mi?

Hata olursa `logs/` klasöründeki log dosyalarına bak.

---

## 4️⃣ Task Scheduler (Otomatik Çalıştır)

### a) Scheduler aç
- Win + R → `taskschd.msc` Enter

### b) Yeni görev oluştur
1. Sağ panelde **Create Task** tıkla
2. **General** sekmesi:
   - Name: `Daily App Factory`
   - "Run whether user is logged on or not" seç
   - "Run with highest privileges" işaretle

3. **Triggers** sekmesi → **New**:
   - Begin the task: `On a schedule`
   - Daily, Start: bugün **09:00:00**
   - Recur every: 1 days
   - OK

4. **Actions** sekmesi → **New**:
   - Action: `Start a program`
   - Program: `powershell.exe`
   - Add arguments:
     ```
     -NoProfile -ExecutionPolicy Bypass -File "C:\Users\user\daily-apps\daily-app.ps1"
     ```
   - Start in: `C:\Users\user\daily-apps`
   - OK

5. **Conditions** sekmesi:
   - "Start the task only if the computer is on AC power" → kapat (laptop ise)

6. **Settings** sekmesi:
   - "Allow task to be run on demand" ✓
   - "If the task fails, restart every: 15 minutes / up to 3 times" ✓

7. OK → Windows parolası iste, gir.

### c) Manuel test
Task Scheduler'da görevin üzerine sağ tık → **Run**. Birkaç dakika bekle, Telegram'a mesaj gelmeli.

---

## Sorun Giderme

| Sorun | Çözüm |
|---|---|
| `claude: command not found` | `where.exe claude` ile yolu bul, `daily-app.ps1`'de tam yol kullan |
| Git push hata veriyor | Personal Access Token süresi dolmuş olabilir, yenile |
| Telegram mesaj gelmedi | Token + chat_id doğru mu? Bot'a önce `/start` attın mı? |
| Task çalışmıyor | Task Scheduler → History sekmesi → hata kodunu Google'la |

---

## Günlük Logları Görme

```powershell
Get-Content C:\Users\user\daily-apps\logs\$(Get-Date -Format 'yyyy-MM-dd').log -Wait
```
