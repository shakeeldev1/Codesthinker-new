# Update duration values in ProjectsData.tsx from strings to numbers
$path = "D:\Projects(C.T)\Codesthinker-new\src\components\projects\ProjectsData.tsx"
$content = Get-Content $path -Raw

# Fix any remaining string duration values
$content = $content -replace '\"duration\": \"1000\"', '\"duration\": 1000'
$content = $content -replace "duration: \"1000\"", "duration: 1000"

# Write back the updated content
Set-Content $path -Value $content -NoNewline

Write-Host "Updated all duration values from strings to numbers";
