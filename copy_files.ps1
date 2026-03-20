# 批量拷贝文件到目标目录
$sourceDir = "c:\ai"
$destDir = "C:\长篇小说AI助手"

# 拷贝文档文件
$docs = @(
    "长篇小说AI助手平台完整实施方案_20260319_终极版.md",
    "项目管理深度分析.md",
    "项目完成总结.md",
    "项目快速参考.md",
    "整体方案.md",
    "技术实现方案与开发计划.md",
    "长篇小说AI助手平台完整方案.md",
    "长篇小说AI助手平台完整方案_20260319.md",
    "长篇小说AI助手平台完整实施方案_20260319.md",
    "长篇小说AI助手平台完整实施方案_20260319_深度版.md",
    "长篇小说AI助手平台短期规划实施总结.md"
)

foreach ($doc in $docs) {
    $src = Join-Path $sourceDir $doc
    $dst = Join-Path $destDir "docs\$doc"
    if (Test-Path $src) {
        Copy-Item $src $dst -Force
        Write-Host "Copied: $doc"
    }
}

# 拷贝JavaScript文件
$scripts = @(
    "read_all_docs.js",
    "analyze_docs.js",
    "detailed_analysis.js"
)

foreach ($script in $scripts) {
    $src = Join-Path $sourceDir $script
    $dst = Join-Path $destDir "scripts\$script"
    if (Test-Path $src) {
        Copy-Item $src $dst -Force
        Write-Host "Copied: $script"
    }
}

# 拷贝JSON文件
$jsonFiles = @(
    "detailed_analysis.json",
    "docs_analysis.json",
    "document_analysis.json",
    "read_all_docs.js"
)

foreach ($json in $jsonFiles) {
    $src = Join-Path $sourceDir $json
    $dst = Join-Path $destDir "data\$json"
    if (Test-Path $src) {
        Copy-Item $src $dst -Force
        Write-Host "Copied: $json"
    }
}

Write-Host "Copy completed!"
