@echo off
echo 🏗️ Building Lagos Shawarma App for Production...
echo.

REM Set environment variable
set REACT_APP_ENVIRONMENT=production

echo 📦 Running React build...
call npx react-scripts build

if %ERRORLEVEL% NEQ 0 (
    echo ❌ Build failed
    pause
    exit /b 1
)

echo ✅ Build completed successfully!
echo 📁 Build directory created: build/
echo 🚀 Ready for deployment!
pause
