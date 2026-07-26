$path = "D:\Projects(C.T)\Codesthinker-new\src\components\projects\ProjectsData.tsx"
$content = Get-Content $path -Raw

if ($content -match '\"duration\": \"1000\"') {
    Write-Host "Found string duration values - replacing with numbers..."
    $content = $content.Replace('"duration": "1000"', '"duration": 1000')
    Set-Content $path -Value $content
    Write-Host "Duration values updated to numbers"
} else {
    Write-Host "Duration values are already numbers"
}