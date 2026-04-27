$utf8NoBom = New-Object System.Text.UTF8Encoding($false)
$files = Get-ChildItem -Path "C:\Users\lenovo\www.talentscoutmanager.com\app" -Include "page.tsx","route.ts" -Recurse
foreach ($file in $files) {
    try {
        $content = Get-Content $file.FullName
        if ($content -eq $null) { continue }
        
        $lines = @()
        $isClient = $false
        $hasDynamic = $false
        
        foreach ($line in $content) {
            $trimmed = $line.Trim()
            if ($trimmed -match '^["'']use client["'']') {
                $isClient = $true
                continue
            }
            if ($trimmed -match '^export const dynamic = ["'']force-dynamic["'']') {
                $hasDynamic = $true
                continue
            }
            $lines += $line
        }
        
        # Determine final content
        $finalLines = @()
        if ($isClient) {
            $finalLines += '"use client"'
            # For client components, we DON'T add force-dynamic as it's causing ReferenceErrors during build
        } else {
            # For server components/routes, we keep force-dynamic to avoid build-time Supabase errors
            if ($hasDynamic -or ($file.FullName -match "route.ts") -or ($file.FullName -match "\[slug\]")) {
                $finalLines += "export const dynamic = 'force-dynamic'"
            }
        }
        
        $finalLines += ""
        $finalLines += $lines
        
        $text = [string]::Join("`r`n", $finalLines)
        [System.IO.File]::WriteAllText($file.FullName, $text, $utf8NoBom)
        Write-Host "Cleaned: $($file.FullName) (Client: $isClient)"
    } catch {
        Write-Warning "Failed to process $($file.FullName): $($_.Exception.Message)"
    }
}
Write-Host "Done."
