@echo off
setlocal

:: --- CONFIGURATION ---
:: We use paths relative to the script location to avoid issues with spaces in user profiles
set "ROOT=%~dp0"
set "PORTABLE_NODE=%~dp0temp_node\node-v20.12.2-win-x64"
set "PYTHON_VENV=%~dp0DeepTutor\DeepTutor-main\venv\Scripts\python.exe"
set "PATH=%PORTABLE_NODE%;%PATH%"

echo ====================================================
echo   LANGY + DEEPTUTOR AI BOOTSTRAPPER
echo ====================================================
echo.

:: Check folders exist
if not exist "%PORTABLE_NODE%\node.exe" (
    echo [ERROR] Portable Node.js not found in temp_node.
    pause
    exit /b
)

if not exist "%PYTHON_VENV%" (
    echo [ERROR] Python Venv not found in DeepTutor-main.
    pause
    exit /b
)

:: --- START BACKEND ---
echo [1/2] Starting DeepTutor Backend (Port 8001)...
:: Simplified start command to avoid nested quote errors
start "DeepTutor_Backend" cmd /k "cd /d "%ROOT%DeepTutor\DeepTutor-main" && venv\Scripts\python.exe -m uvicorn deeptutor.api.main:app --port 8001 --host 0.0.0.0"

:: Wait for backend
timeout /t 5 >nul

:: --- START FRONTEND ---
echo [2/2] Starting Langy Frontend (Port 5173)...
start "Langy_Frontend" cmd /k "cd /d "%ROOT%" && npm run dev"

echo.
echo ====================================================
echo   STARTUP COMPLETE!
echo.
echo   Langy:   http://localhost:5173
echo.
pause
