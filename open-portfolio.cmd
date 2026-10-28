@echo off
cd /d "%~dp0"
node "%~dp0scripts\preview.mjs" --open
if errorlevel 1 (
  echo.
  echo Could not open the portfolio. Check that Node.js and dist exist.
  pause
)
