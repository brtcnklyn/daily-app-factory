# Daily App Factory - Her gün otomatik mobil uygulama üreticisi
$ErrorActionPreference = "Stop"

$ProjectRoot = "C:\Users\user\daily-apps"
$Date = Get-Date -Format "yyyy-MM-dd"
$LogsDir = Join-Path $ProjectRoot "logs"
$LogFile = Join-Path $LogsDir "$Date.log"
$ClaudeLogFile = Join-Path $LogsDir "$Date-claude.log"
$AppsDir = Join-Path $ProjectRoot "apps"
$ConfigPath = Join-Path $ProjectRoot "config.json"
$PromptPath = Join-Path $ProjectRoot "prompt.md"
$ClaudeExe = "$env:APPDATA\npm\claude.cmd"

New-Item -ItemType Directory -Force -Path $LogsDir | Out-Null
New-Item -ItemType Directory -Force -Path $AppsDir | Out-Null

function Log($msg) {
    $line = "[$(Get-Date -Format 'HH:mm:ss')] $msg"
    Write-Host $line
    Add-Content -Path $LogFile -Value $line -Encoding utf8
}

function Send-Telegram($text) {
    try {
        $url = "https://api.telegram.org/bot$($Config.telegram.token)/sendMessage"
        $body = @{
            chat_id = $Config.telegram.chat_id
            text = $text
            parse_mode = "Markdown"
        }
        Invoke-RestMethod -Uri $url -Method Post -Body $body | Out-Null
        Log "Telegram bildirimi gonderildi"
    } catch {
        Log "Telegram hatasi: $_"
    }
}

Log "=== Daily App Factory basliyor ==="

$Config = Get-Content $ConfigPath -Raw | ConvertFrom-Json

$PromptTemplate = Get-Content $PromptPath -Raw
$Prompt = $PromptTemplate.Replace("{DATE}", $Date).Replace("{APPS_DIR}", $AppsDir)

Set-Location $ProjectRoot

Log "Claude cagriliyor (bu birkac dakika surebilir)..."

try {
    $PromptFile = Join-Path $LogsDir "$Date-prompt.txt"
    $Prompt | Out-File -FilePath $PromptFile -Encoding utf8 -NoNewline

    # Pipe prompt via stdin to claude, redirect all output to log file
    $Prompt | & $ClaudeExe -p --output-format text --dangerously-skip-permissions --allowedTools "Read,Write,Edit,Glob,Grep,Bash,WebSearch,WebFetch" *> $ClaudeLogFile

    if ($LASTEXITCODE -ne 0) {
        $tail = Get-Content $ClaudeLogFile -Tail 20 -ErrorAction SilentlyContinue | Out-String
        throw "Claude CLI exit code: $LASTEXITCODE. Son satirlar:`n$tail"
    }
    Log "Claude tamamlandi"
} catch {
    Log "Claude hatasi: $_"
    Send-Telegram "❌ *Daily App Factory* hata verdi`n``$_``"
    exit 1
}

Log "Git islemleri..."
try {
    Set-Location $ProjectRoot
    git add .
    $status = git status --porcelain
    if ([string]::IsNullOrWhiteSpace($status)) {
        Log "Yeni degisiklik yok, commit atlanyor"
    } else {
        git commit -m "feat: $Date gunun uygulamasi"
        git push origin main
        Log "GitHub'a push edildi"
    }
} catch {
    Log "Git hatasi: $_"
    Send-Telegram "⚠️ *Daily App Factory* git hatasi`n``$_``"
    exit 1
}

# Telegram bildirimi
$todayDir = Get-ChildItem -Path $AppsDir -Directory | Where-Object { $_.Name -like "$Date*" } | Select-Object -First 1
$appName = if ($todayDir) { $todayDir.Name } else { "(klasor bulunamadi)" }

$msg = @"
🚀 *Bugunun Uygulamasi Hazir!*

📅 Tarih: $Date
📦 Uygulama: ``$appName``
🔗 Repo: https://github.com/$($Config.github.user)/$($Config.github.repo)
"@

Send-Telegram $msg

Log "=== Tamamlandi ==="
