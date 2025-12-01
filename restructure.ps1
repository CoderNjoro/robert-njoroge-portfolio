# Restructure script - Move Next.js app from app/ to root

Write-Host "Starting project restructure..." -ForegroundColor Green

# Step 1: Create backup
Write-Host "`n1. Creating backup..." -ForegroundColor Yellow
$backupPath = "app_backup_$(Get-Date -Format 'yyyyMMdd_HHmmss')"
Copy-Item -Path "app" -Destination $backupPath -Recurse -Force
Write-Host "   Backup created: $backupPath" -ForegroundColor Gray

# Step 2: Move files from app/ to root (excluding conflicts)
Write-Host "`n2. Moving files from app/ to root..." -ForegroundColor Yellow

$itemsToMove = @(
    ".gitignore",
    "eslint.config.mjs",
    "next-env.d.ts",
    "next.config.ts",
    "package-lock.json",
    "package.json",
    "postcss.config.mjs",
    "tsconfig.json"
)

$foldersToMove = @(
    "app",
    "components",
    "lib",
    "public",
    "types"
)

# Move files
foreach ($item in $itemsToMove) {
    $source = Join-Path "app" $item
    if (Test-Path $source) {
        Write-Host "   Moving $item..." -ForegroundColor Gray
        Move-Item -Path $source -Destination "." -Force
    }
}

# Move folders
foreach ($folder in $foldersToMove) {
    $source = Join-Path "app" $folder
    if (Test-Path $source) {
        Write-Host "   Moving $folder/..." -ForegroundColor Gray
        Move-Item -Path $source -Destination "." -Force
    }
}

# Step 3: Handle the data folder conflict
Write-Host "`n3. Handling data folder..." -ForegroundColor Yellow
if (Test-Path "app\data") {
    Write-Host "   Merging app/data with root data..." -ForegroundColor Gray
    # Keep the app/data/projects.json (it's larger and has your actual data)
    Copy-Item -Path "app\data\projects.json" -Destination "data\projects.json" -Force
}

# Step 4: Clean up old app directory
Write-Host "`n4. Cleaning up..." -ForegroundColor Yellow
if (Test-Path "app") {
    $remaining = Get-ChildItem "app" -Force
    if ($remaining.Count -eq 0 -or ($remaining.Count -eq 1 -and $remaining[0].Name -eq "data")) {
        Write-Host "   Removing empty app directory..." -ForegroundColor Gray
        Remove-Item -Path "app" -Recurse -Force
    } else {
        Write-Host "   Warning: app directory still has files:" -ForegroundColor Red
        $remaining | ForEach-Object { Write-Host "     - $($_.Name)" -ForegroundColor Red }
    }
}

# Step 5: Update vercel.json
Write-Host "`n5. Removing vercel.json (no longer needed)..." -ForegroundColor Yellow
if (Test-Path "vercel.json") {
    Remove-Item "vercel.json" -Force
    Write-Host "   Removed vercel.json" -ForegroundColor Gray
}

Write-Host "`n✅ Restructure complete!" -ForegroundColor Green
Write-Host "`nNext steps:" -ForegroundColor Cyan
Write-Host "1. Run: npm install" -ForegroundColor White
Write-Host "2. Run: npm run dev (to test locally)" -ForegroundColor White
Write-Host "3. Commit changes: git add . && git commit -m 'Restructure: Move Next.js to root'" -ForegroundColor White
Write-Host "4. Push: git push origin main" -ForegroundColor White
Write-Host "5. Deploy to Vercel (no Root Directory config needed!)" -ForegroundColor White
