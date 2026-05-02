$url = "https://iqkfcuiadhhmylhlpdsz.supabase.co"
$key = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imlxa2ZjdWlhZGhobXlsaGxwZHN6Iiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc3NTIzNjc4NCwiZXhwIjoyMDkwODEyNzg0fQ.625wGn4UFjzBwsUenFSAKGyQI87sOu8ZT6GXI03s8Ig"

$headers = @{
    "apikey" = $key
    "Authorization" = "Bearer $key"
    "Content-Type" = "application/json"
}

# Check storage buckets
Write-Host "=== STORAGE BUCKETS ==="
try {
    $buckets = Invoke-RestMethod -Uri "$url/storage/v1/bucket" -Headers $headers -Method GET
    foreach ($b in $buckets) {
        Write-Host "Bucket: $($b.name) | Public: $($b.public)"
    }
} catch {
    Write-Host "Bucket check error: $($_.Exception.Message)"
}
