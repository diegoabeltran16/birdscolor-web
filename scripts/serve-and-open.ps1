param(
  [int]$Port = 8080
)

# Resolve public folder relative to script
$publicPath = Join-Path -Path $PSScriptRoot -ChildPath "..\public"
try { $public = (Resolve-Path $publicPath).Path } catch { $public = $publicPath }

# Look for Python launcher (py) or python
$pyCmd = Get-Command py -ErrorAction SilentlyContinue
if (-not $pyCmd) { $pyCmd = Get-Command python -ErrorAction SilentlyContinue }

if ($pyCmd) {
  Write-Output "Starting static server at http://localhost:$Port serving: $public"
  Push-Location $public
  # Start python http.server in a new process so the script returns
  $psi = New-Object System.Diagnostics.ProcessStartInfo
  $psi.FileName = $pyCmd.Path
  $psi.Arguments = "-3 -m http.server $Port"
  $psi.WorkingDirectory = $public
  $psi.UseShellExecute = $true
  [System.Diagnostics.Process]::Start($psi) | Out-Null
  Start-Sleep -Milliseconds 600
  Start-Process "http://localhost:$Port"
  Pop-Location
} else {
  Write-Output "Python not found. Opening public/index.html directly."
  $index = Join-Path $public "index.html"
  if (Test-Path $index) { Start-Process $index } else { Write-Error "File not found: $index" }
}
