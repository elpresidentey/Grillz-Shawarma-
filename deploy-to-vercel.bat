@echo off
echo 🚀 Deploying Lagos Shawarma App to Vercel...
echo.

REM Check if we're in the right directory
if not exist "package.json" (
    echo ❌ Error: package.json not found. Please run from project root.
    pause
    exit /b 1
)

echo 📦 Installing dependencies...
call npm install

if %ERRORLEVEL% NEQ 0 (
    echo ❌ npm install failed
    pause
    exit /b 1
)

echo 🔨 Building for production...
call npm run build

if %ERRORLEVEL% NEQ 0 (
    echo ❌ Build failed
    pause
    exit /b 1
)

echo 🚀 Deploying to Vercel...
call npx vercel --prod

if %ERRORLEVEL% NEQ 0 (
    echo ❌ Deployment failed
    pause
    exit /b 1
)

echo ✅ Deployment complete!
echo 🌐 Your app should be live at: https://lagos-shawarma-app-new.vercel.app
pause
