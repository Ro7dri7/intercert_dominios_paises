param(
    [string]$Host = "192.168.3.146",
    [int]$Port = 2222,
    [string]$User = "icltmits173",
    [string]$RemotePath = "/var/www/intercert-landing"
)

# Fuera de oficina usa la IP pública:
#   .\deploy\deploy-manual.ps1 -Host 179.43.89.146

$ErrorActionPreference = "Stop"
$ProjectRoot = Split-Path $PSScriptRoot -Parent

Set-Location $ProjectRoot
npm run build

Write-Host "Subiendo dist/ a ${User}@${Host}:${RemotePath} ..." -ForegroundColor Cyan
scp -P $Port -r "$ProjectRoot\dist\*" "${User}@${Host}:${RemotePath}/"
Write-Host "Deploy manual completado." -ForegroundColor Green
