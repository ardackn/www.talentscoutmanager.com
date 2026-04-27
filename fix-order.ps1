$files = Get-ChildItem -Path "C:\Users\lenovo\www.talentscoutmanager.com\app" -Include "page.tsx","route.ts" -Recurse
foreach ($file in $files) {
    $content = Get-Content $file.FullName -Encoding UTF8
    if ($content.Count -ge 2 -and $content[0] -eq "export const dynamic = 'force-dynamic'" -and ($content[1] -match "use client")) {
        # Swap: put use client first, then force-dynamic
        $newContent = @($content[1]) + @("export const dynamic = 'force-dynamic'") + $content[2..($content.Count-1)]
        Set-Content $file.FullName -Value $newContent -Encoding UTF8
        Write-Host "Fixed order: $($file.FullName)"
    }
}
Write-Host "Done."
