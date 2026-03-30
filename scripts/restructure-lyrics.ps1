$root = "C:\Users\jehan\Documents\git\stanza-studio\lyrics"

Get-ChildItem "$root\[0-9]*.md" | ForEach-Object {
    $base = $_.BaseName
    $dir  = Join-Path $root $base
    New-Item -ItemType Directory -Path $dir -Force | Out-Null

    # Read before moving
    $lines = Get-Content $_.FullName -Encoding UTF8
    Move-Item $_.FullName (Join-Path $dir $_.Name)

    # 1. Prefer explicit Suno Tags; fall back to Genre field
    $style = ""
    foreach ($line in $lines) {
        if ($line -match '^\*\*Suno Tags:\*\*\s*`([^`]+)`') { $style = $Matches[1]; break }
    }
    if (-not $style) {
        foreach ($line in $lines) {
            if ($line -match '^\*\*Genre:\*\*\s*(.+)$') { $style = $Matches[1].Trim(); break }
        }
    }

    # 2. Find the two --- dividers (0-based index)
    $dashes = @()
    for ($i = 0; $i -lt $lines.Count; $i++) {
        if ($lines[$i] -match '^---\s*$') { $dashes += $i }
    }

    # 3. Extract lyrics between dividers and convert ### headings to [Section]
    $lyricsText = ""
    if ($dashes.Count -ge 2) {
        $slice = $lines[($dashes[0] + 1)..($dashes[1] - 1)]
        $formatted = $slice | ForEach-Object {
            if ($_ -match '^###\s+(.+)$') { "[$($Matches[1])]" } else { $_ }
        }
        $lyricsText = ($formatted -join "`n").Trim()
    }

    # 4. Write Suno-ready txt file: style on line 1, blank line, then lyrics
    $txtContent = "$style`n`n$lyricsText"
    $txtPath = Join-Path $dir "$base.txt"
    [System.IO.File]::WriteAllText($txtPath, $txtContent, [System.Text.Encoding]::UTF8)
    Write-Host "Done: $base"
}
