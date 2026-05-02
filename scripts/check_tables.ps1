$url = "https://iqkfcuiadhhmylhlpdsz.supabase.co"
$key = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imlxa2ZjdWlhZGhobXlsaGxwZHN6Iiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc3NTIzNjc4NCwiZXhwIjoyMDkwODEyNzg0fQ.625wGn4UFjzBwsUenFSAKGyQI87sOu8ZT6GXI03s8Ig"

$headers = @{
    "apikey" = $key
    "Authorization" = "Bearer $key"
    "Content-Type" = "application/json"
}

$tables = @("profiles", "athlete_profiles", "scout_profiles", "athlete_videos", "analysis_reports")

foreach ($table in $tables) {
    try {
        $response = Invoke-RestMethod -Uri "$url/rest/v1/$table`?limit=0" -Headers $headers -Method GET
        Write-Host "✅ $table - EXISTS (OK)"
    } catch {
        $errorMsg = $_.Exception.Message
        Write-Host "❌ $table - ERROR: $errorMsg"
    }
}
