# Find and replace all string duration values (\"duration\": \"1000\") with numbers (\"duration\": 1000)
$path = "D:\\Projects(C.T)\\Codesthinker-new\\src\\components\\projects\\ProjectsData.tsx"
$content = Get-Content $path -Raw

# Count how many string duration values exist
$count = [System.Text.RegularExpressions.Regex]::Matches($content, '\\"duration\\": \"1000\"').Count
Write-Host "Found $count string duration values that need to be converted to numbers"

if ($count -gt 0) {
    # Replace all occurrences of \"duration\": \"1000\" with \"duration\": 1000
    $newContent = $content -replace '\\"duration\\": \"1000\"', '\\"duration\\": 1000'
    Set-Content $path -Value $newContent -NoNewline
    Write-Host "Replaced $count string duration values with numbers"
    
    # Also check for any other string duration values
    $otherCount = [System.Text.RegularExpressions.Regex]::Matches($newContent, '\\"duration\\": \"\\d+\"').Count
    if ($otherCount -gt 0) {
        Write-Host "WARNING: Found $otherCount other string duration values"
    }
} else {
    Write-Host "All duration values are already numbers"
}