@echo off
cd /d "%~dp0"
echo Starting Techyguide Web App server...
npx webpack serve --open --mode development
pause
