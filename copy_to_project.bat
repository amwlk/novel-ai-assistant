@echo off
echo ========================================
echo  Novel AI Platform - File Copy Script
echo ========================================
echo.

set SOURCE_DIR=c:\ai
set DEST_DIR=C:\长篇小说AI助手

echo Creating directory structure...
if not exist "%DEST_DIR%\docs\01-ProjectPlans" mkdir "%DEST_DIR%\docs\01-ProjectPlans"
if not exist "%DEST_DIR%\docs\02-TechnicalDocs" mkdir "%DEST_DIR%\docs\02-TechnicalDocs"
if not exist "%DEST_DIR%\docs\03-APIDocs" mkdir "%DEST_DIR%\docs\03-APIDocs"
if not exist "%DEST_DIR%\src\frontend" mkdir "%DEST_DIR%\src\frontend"
if not exist "%DEST_DIR%\src\backend" mkdir "%DEST_DIR%\src\backend"
if not exist "%DEST_DIR%\src\database" mkdir "%DEST_DIR%\src\database"
if not exist "%DEST_DIR%\src\ai" mkdir "%DEST_DIR%\src\ai"
if not exist "%DEST_DIR%\config" mkdir "%DEST_DIR%\config"
if not exist "%DEST_DIR%\scripts" mkdir "%DEST_DIR%\scripts"
if not exist "%DEST_DIR%\tests" mkdir "%DEST_DIR%\tests"
if not exist "%DEST_DIR%\backups" mkdir "%DEST_DIR%\backups"
if not exist "%DEST_DIR%\data" mkdir "%DEST_DIR%\data"
echo Directory structure created!
echo.

echo Copying documentation files...
copy /Y "%SOURCE_DIR%\长篇小说AI助手平台完整实施方案_20260319_终极版.md" "%DEST_DIR%\docs\01-ProjectPlans\01-CompleteImplementationPlan.md"
copy /Y "%SOURCE_DIR%\项目管理深度分析.md" "%DEST_DIR%\docs\01-ProjectPlans\02-ProjectManagementAnalysis.md"
copy /Y "%SOURCE_DIR%\项目完成总结.md" "%DEST_DIR%\docs\01-ProjectPlans\03-ProjectCompletionSummary.md"
copy /Y "%SOURCE_DIR%\项目快速参考.md" "%DEST_DIR%\docs\01-ProjectPlans\04-QuickReference.md"
copy /Y "%SOURCE_DIR%\整体方案.md" "%DEST_DIR%\docs\01-ProjectPlans\05-OverallPlan.md"
copy /Y "%SOURCE_DIR%\技术实现方案与开发计划.md" "%DEST_DIR%\docs\02-TechnicalDocs\01-TechnicalImplementationPlan.md"
copy /Y "%SOURCE_DIR%\长篇小说AI助手平台完整方案.md" "%DEST_DIR%\docs\01-ProjectPlans\06-FullSolution.md"
copy /Y "%SOURCE_DIR%\长篇小说AI助手平台完整方案_20260319.md" "%DEST_DIR%\docs\01-ProjectPlans\07-FullSolution20260319.md"
copy /Y "%SOURCE_DIR%\长篇小说AI助手平台完整实施方案_20260319.md" "%DEST_DIR%\docs\01-ProjectPlans\08-ImplementationPlan20260319.md"
copy /Y "%SOURCE_DIR%\长篇小说AI助手平台完整实施方案_20260319_深度版.md" "%DEST_DIR%\docs\01-ProjectPlans\09-DeepVersion.md"
copy /Y "%SOURCE_DIR%\长篇小说AI助手平台短期规划实施总结.md" "%DEST_DIR%\docs\01-ProjectPlans\10-ShortTermPlanSummary.md"
echo Documentation files copied!
echo.

echo Copying JavaScript files...
copy /Y "%SOURCE_DIR%\read_all_docs.js" "%DEST_DIR%\scripts\read_all_docs.js"
copy /Y "%SOURCE_DIR%\analyze_docs.js" "%DEST_DIR%\scripts\analyze_docs.js"
copy /Y "%SOURCE_DIR%\detailed_analysis.js" "%DEST_DIR%\scripts\detailed_analysis.js"
echo JavaScript files copied!
echo.

echo Copying JSON files...
if not exist "%DEST_DIR%\data" mkdir "%DEST_DIR%\data"
copy /Y "%SOURCE_DIR%\detailed_analysis.json" "%DEST_DIR%\data\detailed_analysis.json"
copy /Y "%SOURCE_DIR%\docs_analysis.json" "%DEST_DIR%\data\docs_analysis.json"
copy /Y "%SOURCE_DIR%\document_analysis.json" "%DEST_DIR%\data\document_analysis.json"
copy /Y "%SOURCE_DIR%\document_analysis.json" "%DEST_DIR%\data\read_all_docs.js"
echo JSON files copied!
echo.

echo ========================================
echo  Copy completed successfully!
echo ========================================
echo.
echo Project directory: %DEST_DIR%
echo.
echo Created directories:
echo   - docs/01-ProjectPlans
echo   - docs/02-TechnicalDocs
echo   - docs/03-APIDocs
echo   - src/frontend
echo   - src/backend
echo   - src/database
echo   - src/ai
echo   - config
echo   - scripts
echo   - tests
echo   - backups
echo   - data
echo.
echo Copied files:
echo   - Documentation files (11 files)
echo   - JavaScript files (3 files)
echo   - JSON files (4 files)
echo.
echo Next steps:
echo   1. Open %DEST_DIR% directory
echo   2. Read README.md for project structure
echo   3. Start development!
echo.

pause
