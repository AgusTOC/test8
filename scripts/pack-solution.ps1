# pack-solution.ps1
# ─────────────────────────────────────────────────────────────────────────────
# Packs the three solution files into a zip that can be imported directly into
# Dataverse / D365 CRM via:
#   make.powerapps.com → Solutions → Import Solution
#
# Run from any directory:
#   powershell -ExecutionPolicy Bypass -File .\scripts\pack-solution.ps1
# ─────────────────────────────────────────────────────────────────────────────

$ErrorActionPreference = "Stop"

$ScriptDir   = Split-Path -Parent $MyInvocation.MyCommand.Path
$RepoRoot    = Split-Path -Parent $ScriptDir
$SolutionDir = Join-Path $RepoRoot "solution"
$OutputFile  = Join-Path $RepoRoot "QuoteModelDrivenApp.zip"

Write-Host "Packing solution from: $SolutionDir"

# Remove old zip if present
if (Test-Path $OutputFile) {
    Remove-Item $OutputFile -Force
}

# Collect the three required files
$files = @(
    Join-Path $SolutionDir "[Content_Types].xml",
    Join-Path $SolutionDir "solution.xml",
    Join-Path $SolutionDir "customizations.xml"
)

# Use Compress-Archive (built-in, PowerShell 5+)
Compress-Archive -Path $files -DestinationPath $OutputFile

Write-Host "Done → $OutputFile"
Write-Host ""
Write-Host "Import steps:"
Write-Host "  1. Go to https://make.powerapps.com and select your environment."
Write-Host "  2. Navigate to Solutions → Import solution."
Write-Host "  3. Upload QuoteModelDrivenApp.zip and follow the wizard."
Write-Host "  4. After import, select the solution and click 'Publish all customizations'."
Write-Host "  5. The 'Quote Management' app will appear in the app list / D365 nav bar."
