# Daily App Factory - Son kurulum: Git + GitHub repo + Task Scheduler
$ErrorActionPreference = "Stop"
$ProjectRoot = "C:\Users\user\daily-apps"

Write-Host "=== Daily App Factory final kurulum ===" -ForegroundColor Cyan
Set-Location $ProjectRoot

# 1) Git repo init (yoksa)
if (-not (Test-Path ".git")) {
    Write-Host "`n[1/5] Git repo baslatiliyor..." -ForegroundColor Yellow
    git init -b main | Out-Null
    Write-Host "  OK" -ForegroundColor Green
} else {
    Write-Host "`n[1/5] Git repo zaten var, atlanyor" -ForegroundColor Gray
}

# 2) GitHub repo olustur
Write-Host "`n[2/5] GitHub repo olusturuluyor..." -ForegroundColor Yellow
$repoExists = $false
try {
    gh repo view brtcnklyn/daily-app-factory 2>&1 | Out-Null
    if ($LASTEXITCODE -eq 0) { $repoExists = $true }
} catch {}

if ($repoExists) {
    Write-Host "  Repo zaten var: github.com/brtcnklyn/daily-app-factory" -ForegroundColor Gray
} else {
    gh repo create daily-app-factory --public --description "Her gun otomatik trend mobil uygulama uretici" --source . --remote origin
    Write-Host "  OK - Repo olusturuldu" -ForegroundColor Green
}

# Remote'u dogrula
$remotes = git remote 2>&1
if ($remotes -notcontains "origin") {
    git remote add origin "https://github.com/brtcnklyn/daily-app-factory.git"
}

# 3) Ilk commit + push
Write-Host "`n[3/5] Ilk commit + push..." -ForegroundColor Yellow
git add .
$staged = git diff --cached --name-only
if ($staged) {
    git commit -m "initial: daily app factory kurulumu" | Out-Null
    git push -u origin main
    Write-Host "  OK - GitHub'a yuklendi" -ForegroundColor Green
} else {
    Write-Host "  Commit edilecek bir sey yok" -ForegroundColor Gray
}

# 4) Task Scheduler gorevi
Write-Host "`n[4/5] Windows Task Scheduler gorevi olusturuluyor..." -ForegroundColor Yellow
$taskName = "DailyAppFactory"

# Eski gorevi sil (varsa)
$existing = Get-ScheduledTask -TaskName $taskName -ErrorAction SilentlyContinue
if ($existing) {
    Unregister-ScheduledTask -TaskName $taskName -Confirm:$false
    Write-Host "  Eski gorev silindi" -ForegroundColor Gray
}

$action = New-ScheduledTaskAction -Execute "powershell.exe" -Argument "-NoProfile -ExecutionPolicy Bypass -File `"$ProjectRoot\daily-app.ps1`"" -WorkingDirectory $ProjectRoot
$trigger = New-ScheduledTaskTrigger -Daily -At 9:00am
$settings = New-ScheduledTaskSettingsSet -StartWhenAvailable -DontStopIfGoingOnBatteries -AllowStartIfOnBatteries -RestartCount 3 -RestartInterval (New-TimeSpan -Minutes 15) -ExecutionTimeLimit (New-TimeSpan -Hours 2)
$principal = New-ScheduledTaskPrincipal -UserId "$env:USERDOMAIN\$env:USERNAME" -LogonType Interactive -RunLevel Highest

Register-ScheduledTask -TaskName $taskName -Action $action -Trigger $trigger -Settings $settings -Principal $principal -Description "Her gun trend mobil uygulama uretir, GitHub'a push eder, Telegram'a bildirir" | Out-Null

Write-Host "  OK - Gorev kayitli (her gun 09:00)" -ForegroundColor Green

# 5) Test mesaji
Write-Host "`n[5/5] Telegram test mesaji..." -ForegroundColor Yellow
$config = Get-Content "$ProjectRoot\config.json" -Raw | ConvertFrom-Json
$body = @{
    chat_id = $config.telegram.chat_id
    text = "✅ Daily App Factory kurulum tamamlandi! Her gun 09:00'da otomatik calisacak. Manuel test icin: .\daily-app.ps1"
}
Invoke-RestMethod -Uri "https://api.telegram.org/bot$($config.telegram.token)/sendMessage" -Method Post -Body $body | Out-Null
Write-Host "  OK - Telegram'a bildirim gonderildi" -ForegroundColor Green

Write-Host "`n=== TUM KURULUM BITTI ===" -ForegroundColor Cyan
Write-Host ""
Write-Host "Repo:     https://github.com/brtcnklyn/daily-app-factory" -ForegroundColor White
Write-Host "Gorev:    Windows Task Scheduler -> DailyAppFactory" -ForegroundColor White
Write-Host "Calisma:  Her gun 09:00" -ForegroundColor White
Write-Host ""
Write-Host "Manuel test icin:" -ForegroundColor Yellow
Write-Host "  cd C:\Users\user\daily-apps" -ForegroundColor Gray
Write-Host "  .\daily-app.ps1" -ForegroundColor Gray
